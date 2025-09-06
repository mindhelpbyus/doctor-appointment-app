"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react'; // Import useRef
import { useParams, useNavigate } from 'react-router-dom';
import ChatLayout from '@/components/chat/ChatLayout';
import ConversationList from '@/components/chat/ConversationList';
import ChatWindow from '@/components/chat/ChatWindow';
import { getConversationsForUser, getConversationById, getDoctorById, getPatientById, updateConversation, updateMessage, getMessagesForConversation, addMessage } from '@/services/localApi'; // Ensure addMessage is imported
import { Conversation, Message } from '@/data/chat';
import { getLoggedInUser } from '@/utils/auth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MessageBubble from '@/components/chat/MessageBubble';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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
  const scrollAreaRef = useRef<HTMLDivElement>(null); // Corrected type for useRef

  const defaultAvatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

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

    const newMessageData: Omit<Message, 'id'> = {
      conversationId: activeConversation.id,
      senderId: currentDoctorId,
      receiverId: otherParticipantId,
      content: newMessageContent.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    const addedMessage = addMessage(newMessageData); // Use the actual addMessage function
    setMessages(prevMessages => [...prevMessages, addedMessage]); // Update state with the new message
    setNewMessageContent('');
    
    loadConversations(); // Refresh conversation list to update last message/unread count
    // No need to call loadMessages(activeConversation.id) here as setMessages already updated the state.
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  const otherParticipantName = activeConversation?.participantIds.find(id => id !== currentDoctorId) ? getPatientById(activeConversation.participantIds.find(id => id !== currentDoctorId)!)?.name || 'Unknown Patient' : 'Unknown';
  const otherParticipantPhotoUrl = defaultAvatarUrl; // Patients don't have photos in mock data

  return (
    <ChatLayout>
      <div className="w-full md:w-1/3 lg:w-1/4 border-r flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Conversations</h2>
        </div>
        <ConversationList
          conversations={conversations}
          currentUserId={currentDoctorId}
          currentUserType="doctor" // This component is specifically for doctors
          activeConversationId={urlConversationId}
        />
      </div>
      <div className="flex-grow">
        {activeConversation ? (
          <div className="flex flex-col h-full">
            <div className="border-b p-4 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={otherParticipantPhotoUrl} />
                <AvatarFallback>{otherParticipantName.charAt(0) || '?'}</AvatarFallback>
              </Avatar>
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