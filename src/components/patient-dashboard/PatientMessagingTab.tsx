"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChatLayout from '@/components/chat/ChatLayout';
import ConversationList from '@/components/chat/ConversationList';
import ChatWindow from '@/components/chat/ChatWindow';
import { getConversationsForUser, getConversationById } from '@/services/localApi';
import { Conversation } from '@/data/chat';
import { getLoggedInUser } from '@/utils/auth';
import { showError } from '@/utils/toast';

interface PatientMessagingTabProps {
  patientId: string;
  initialConversationId?: string;
}

const PatientMessagingTab: React.FC<PatientMessagingTabProps> = ({ patientId, initialConversationId }) => {
  const navigate = useNavigate();
  const { conversationId: urlConversationId } = useParams<{ conversationId?: string }>();

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | undefined>(undefined);

  const currentConversationId = urlConversationId || initialConversationId;

  const loadConversations = useCallback(() => {
    const fetchedConversations = getConversationsForUser(patientId);
    setConversations(fetchedConversations);
  }, [patientId]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (currentConversationId) {
      const conv = getConversationById(currentConversationId);
      if (conv && conv.participantIds.includes(patientId)) {
        setActiveConversation(conv);
      } else {
        showError('Conversation not found or you do not have access.');
        setActiveConversation(undefined);
        // Optionally navigate away if the conversation is invalid
        // navigate('/dashboard/messages');
      }
    } else {
      setActiveConversation(undefined);
    }
  }, [currentConversationId, conversations, patientId, navigate]);

  const handleNewMessage = () => {
    loadConversations(); // Refresh conversation list to update last message/unread count
  };

  return (
    <div className="space-y-6">
      <ChatLayout>
        <div className="w-full md:w-1/3 lg:w-1/4 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Conversations</h2>
          </div>
          <ConversationList
            conversations={conversations}
            currentUserId={patientId}
            currentUserType="patient"
            activeConversationId={activeConversation?.id}
          />
        </div>
        <div className="flex-grow">
          {activeConversation ? (
            <ChatWindow
              conversation={activeConversation}
              currentUserId={patientId}
              currentUserType="patient"
              onNewMessage={handleNewMessage}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              Select a conversation to start chatting.
            </div>
          )}
        </div>
      </ChatLayout>
    </div>
  );
};

export default PatientMessagingTab;