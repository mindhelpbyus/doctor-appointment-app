"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatLayout from '@/components/chat/ChatLayout';
import ConversationList from '@/components/chat/ConversationList';
import ChatWindow from '@/components/chat/ChatWindow';
import { getConversationsForUser, getConversationById, getDoctorById, getPatientById, updateConversation, updateMessage, getMessagesForConversation } from '@/services/localApi';
import { Conversation, Message } from '@/data/chat';
import { getLoggedInUser } from '@/utils/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageBubble from '@/components/chat/MessageBubble';

interface MessagingSectionProps {
  currentDoctorId: string;
}

const MessagingSection: React.FC<MessagingSectionProps> = ({ currentDoctorId }) => {
  const navigate = useNavigate();
  const { conversationId: urlConversationId } = useParams<{ conversationId: string }>();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageContent, setNewMessageContent] = useState('');
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const loadConversations = useCallback(() => {
    const fetchedConversations = getConversationsForUser(currentDoctorId);
    setConversations(fetchedConversations);
  }, [currentDoctorId]);

  const loadMessages = useCallback((convId: string) => {
    const fetchedMessages = getMessagesForConversation(convId);
    setMessages(fetchedMessages);

    // Mark messages as read if the current user is the receiver
    const unreadMessages = fetchedMessages.filter(msg => !msg.read && msg.receiverId === currentDoctorId);
    unreadMessages.forEach(msg => {
      updateMessage({ ...msg, read: true });
    });

    // Reset unread count for the current conversation
    const currentConv = getConversationById(convId);
    if (currentConv && currentConv.unreadCount > 0) {
      updateConversation({ ...currentConv, unreadCount: 0 });
      loadConversations(); // Trigger refresh of conversation list
    }
  }, [currentDoctorId, loadConversations]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (urlConversationId) {
      const conv = getConversationById(urlConversationId);
      setActiveConversation(conv);
      if (conv) {
        loadMessages(conv.id);
      }
    } else {
      setActiveConversation(undefined);
      setMessages([]);
    }
  }, [urlConversationId, loadMessages]);

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
    if (newMessageContent.trim() === '' || !activeConversation) return;

    const otherParticipantId = activeConversation.participantIds.find(id => id !== currentDoctorId);
    if (!otherParticipantId) return;

    const newMessage: Omit<Message, 'id'> = {
      conversationId: activeConversation.id,
      senderId: currentDoctorId,
      receiverId: otherParticipantId,
      content: newMessageContent.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    // Add message and then reload messages and conversations
    const addedMessage = getDoctorById(currentDoctorId) ? getMessagesForConversation(activeConversation.id).concat(newMessage) : []; // Simulate addMessage
    setMessages(addedMessage); // Optimistic update
    setNewMessageContent('');
    
    // In a real app, addMessage would update local storage and then trigger a reload
    // For this demo, we'll manually update the conversation and then reload
    const updatedConversation = {
      ...activeConversation,
      lastMessageContent: newMessage.content,
      lastMessageTimestamp: newMessage.timestamp,
      unreadCount: activeConversation.unreadCount + 1, // Increment for the other participant
    };
    updateConversation(updatedConversation);
    loadConversations(); // Refresh conversation list
    loadMessages(activeConversation.id); // Reload messages to ensure consistency
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const otherParticipantName = activeConversation?.participantIds.find(id => id !== currentDoctorId) ? getPatientById(activeConversation.participantIds.find(id => id !== currentDoctorId)!)?.name || 'Unknown Patient' : 'Unknown';
  const otherParticipantPhotoUrl = 'https://via.placeholder.com/40'; // Patients don't have photos in mock data

  return (
    <ChatLayout>
      <div className="w-full md:w-1/3 lg:w-1/4 border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Conversations</h2>
        </div>
        <ConversationList
          conversations={conversations}
          currentUserId={currentDoctorId}
          currentUserType="doctor"
          activeConversationId={urlConversationId}
        />
      </div>
      <div className="flex-grow">
        {activeConversation ? (
          <div className="flex flex-col h-full">
            <div className="border-b p-4 flex items-center gap-3">
              <img
                src={otherParticipantPhotoUrl}
                alt={otherParticipantName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <h3 className="text-lg font-semibold">{otherParticipantName}</h3>
            </div>
            <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} isSender={msg.senderId === currentDoctorId} />
              ))}
            </ScrollArea>
            <div className="border-t p-4 flex items-center gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessageContent}
                onChange={(e) => setNewMessageContent(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-grow"
              />
              <Button onClick={handleSendMessage} disabled={newMessageContent.trim() === ''}>
                <SendIcon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </ChatLayout>
  );
};

export default MessagingSection;