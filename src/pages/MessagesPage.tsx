import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ChatLayout from '@/components/chat/ChatLayout';
import ConversationList from '@/components/chat/ConversationList';
import ChatWindow from '@/components/chat/ChatWindow';
import { getConversationsForUser, getDoctorById, getPatientById, getConversationById } from '@/services/localApi';
import { Conversation } from '@/data/chat';
import { Separator } from '@/components/ui/separator';

const MessagesPage: React.FC = () => {
  // --- Mock User Context ---
  // In a real application, currentUserId and currentUserType would come from an authentication context.
  // For demonstration, we'll hardcode a patient user.
  const currentUserId = 'pat-1'; // Example: 'pat-1' for a patient, 'doc-3' for a doctor
  const currentUserType: 'patient' | 'doctor' = 'patient'; // 'patient' or 'doctor'
  // --- End Mock User Context ---

  const { conversationId } = useParams<{ conversationId: string }>();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | undefined>(undefined);

  const loadConversations = useCallback(() => {
    const fetchedConversations = getConversationsForUser(currentUserId);
    setConversations(fetchedConversations);
  }, [currentUserId]);

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);

  useEffect(() => {
    if (conversationId) {
      const conv = getConversationById(conversationId);
      setActiveConversation(conv);
    } else {
      setActiveConversation(undefined);
    }
  }, [conversationId, conversations]); // Re-evaluate active conversation if conversations change

  const handleNewMessage = () => {
    loadConversations(); // Refresh conversation list to update last message/unread count
  };

  const getParticipantName = (id: string) => {
    const patient = getPatientById(id);
    if (patient) return patient.name;
    const doctor = getDoctorById(id);
    if (doctor) return doctor.fullName;
    return 'Unknown';
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-center">My Messages</h1>
      <ChatLayout>
        <div className="w-full md:w-1/3 lg:w-1/4 border-r flex flex-col">
          <div className="p-4 border-b">
            <h2 className="text-xl font-semibold">Conversations</h2>
          </div>
          <ConversationList
            conversations={conversations}
            currentUserId={currentUserId}
            currentUserType={currentUserType}
            activeConversationId={conversationId}
          />
        </div>
        <div className="flex-grow">
          {activeConversation ? (
            <ChatWindow
              conversation={activeConversation}
              currentUserId={currentUserId}
              currentUserType={currentUserType}
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

export default MessagesPage;