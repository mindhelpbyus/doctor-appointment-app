"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Send, Phone, Video, MoreVertical } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  getConversationsForUser,
  getConversationById,
  getMessagesForConversation,
  addMessage,
  updateConversation,
  updateMessage,
  getDoctorById,
  getPatientById,
} from '@/services/localApi';
import { Conversation, Message } from '@/data/chat';
import { showError, showSuccess } from '@/utils/toast';

interface PatientMessagingTabProps {
  patientId: string;
  initialConversationId?: string;
}

const PatientMessagingTab: React.FC<PatientMessagingTabProps> = ({ patientId, initialConversationId }) => {
  const navigate = useNavigate();
  const { conversationId: urlConversationId } = useParams<{ conversationId?: string }>();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageContent, setNewMessageContent] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const defaultAvatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const currentConversationId = urlConversationId || initialConversationId;

  const loadConversations = useCallback(() => {
    const fetchedConversations = getConversationsForUser(patientId);
    // Enrich conversations with participant details and sort
    const enrichedConversations = fetchedConversations.map(conv => {
      const otherParticipantId = conv.participantIds.find(id => id !== patientId);
      let otherParticipantName: string = 'Unknown User';
      let otherParticipantPhotoUrl: string = defaultAvatarUrl; // Default placeholder

      if (otherParticipantId) {
        const doctor = getDoctorById(otherParticipantId);
        if (doctor) {
          otherParticipantName = doctor.fullName;
          otherParticipantPhotoUrl = doctor.photoUrl || defaultAvatarUrl;
        }
      }
      return { ...conv, otherParticipantName, otherParticipantPhotoUrl };
    }).sort((a, b) => new Date(b.lastMessageTimestamp).getTime() - new Date(a.lastMessageTimestamp).getTime());

    setConversations(enrichedConversations);
  }, [patientId]);

  const loadMessages = useCallback((convId: string) => {
    const fetchedMessages = getMessagesForConversation(convId);
    setMessages(fetchedMessages);

    // Mark messages as read if the current user is the receiver
    const unreadMessages = fetchedMessages.filter(msg => !msg.read && msg.receiverId === patientId);
    unreadMessages.forEach(msg => {
      updateMessage({ ...msg, read: true });
    });

    // Reset unread count for the current conversation
    const currentConv = getConversationById(convId);
    if (currentConv && currentConv.unreadCount > 0) {
      updateConversation({ ...currentConv, unreadCount: 0 });
      loadConversations(); // Trigger refresh of conversation list to update unread count badge
    }
  }, [patientId, loadConversations]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (currentConversationId) {
      const conv = getConversationById(currentConversationId);
      if (conv && conv.participantIds.includes(patientId)) {
        setSelectedConversationId(currentConversationId);
        loadMessages(currentConversationId);
      } else {
        showError('Conversation not found or you do not have access.');
        setSelectedConversationId(null);
        setMessages([]);
        // Optionally navigate away if the conversation is invalid
        // navigate('/dashboard/messages');
      }
    } else {
      setSelectedConversationId(null);
      setMessages([]);
    }
  }, [currentConversationId, patientId, loadMessages]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessageContent.trim() === '' || !selectedConversationId) return;

    const activeConv = conversations.find(c => c.id === selectedConversationId);
    if (!activeConv) return;

    const otherParticipantId = activeConv.participantIds.find(id => id !== patientId);
    if (!otherParticipantId) return;

    const newMessageData: Omit<Message, 'id'> = {
      conversationId: selectedConversationId,
      senderId: patientId,
      receiverId: otherParticipantId,
      content: newMessageContent.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    addMessage(newMessageData);
    setNewMessageContent('');
    loadMessages(selectedConversationId); // Reload messages to show the new one and update conversation
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const selectedConversation = conversations.find(c => c.id === selectedConversationId);
  const selectedParticipantName = selectedConversation?.otherParticipantName || 'Unknown User';
  const selectedParticipantPhotoUrl = selectedConversation?.otherParticipantPhotoUrl || defaultAvatarUrl;

  if (conversations.length === 0 && !selectedConversationId) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Conversations Yet</h3>
            <p className="text-muted-foreground">
              Start a conversation with a doctor to begin your messaging experience.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Messages</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Conversations List */}
        <Card className="lg:col-span-1 flex flex-col">
          <CardHeader className="border-b p-4">
            <div className="flex items-center gap-2">
              <img src="/medxiy_chat.jpeg" alt="Medixy Chat" className="h-8 w-8" /> {/* Increased size */}
              <CardTitle className="text-lg">Conversations</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-grow overflow-y-auto">
            <div className="space-y-1">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 border-b cursor-pointer hover:bg-muted/50 transition-colors ${
                    selectedConversationId === conversation.id ? 'bg-muted' : ''
                  }`}
                  onClick={() => setSelectedConversationId(conversation.id)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.otherParticipantPhotoUrl} />
                      <AvatarFallback>
                        {conversation.otherParticipantName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm truncate">
                          {conversation.otherParticipantName}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {conversation.lastMessageContent}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(conversation.lastMessageTimestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedParticipantPhotoUrl} />
                      <AvatarFallback>
                        {selectedParticipantName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedParticipantName}</h3>
                      <p className="text-sm text-muted-foreground">Doctor</p> {/* Assuming patient chats with doctors */}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0 flex-grow flex flex-col">
                {/* Messages */}
                <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === patientId ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg shadow-md ${
                          message.senderId === patientId
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted text-muted-foreground rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === patientId ? 'text-primary-foreground/70' : 'text-muted-foreground/70'
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex items-center gap-2">
                    <Input
                      value={newMessageContent}
                      onChange={(e) => setNewMessageContent(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={handleKeyPress}
                    />
                    <Button onClick={handleSendMessage} disabled={!newMessageContent.trim()}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a conversation to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default PatientMessagingTab;