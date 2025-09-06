import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import ChatLayout from '@/components/chat/ChatLayout';
import ConversationList from '@/components/chat/ConversationList';
import ChatWindow from '@/components/chat/ChatWindow';
import { getConversationsForUser, getConversationById } from '@/services/localApi';
import { Conversation } from '@/data/chat';
import { getLoggedInUser } from '@/utils/auth'; // Import getLoggedInUser

const MessagesPage: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate(); // Initialize useNavigate
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | undefined>(undefined);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);
  const [currentUserType, setCurrentUserType] = useState<'patient' | 'doctor' | 'agencyUser' | 'admin' | undefined>(undefined);

  useEffect(() => {
    const loggedInUser = getLoggedInUser();
    // Only allow 'patient' or 'doctor' types to access this page
    if (loggedInUser && (loggedInUser.type === 'patient' || loggedInUser.type === 'doctor')) {
      setCurrentUserId(loggedInUser.id);
      setCurrentUserType(loggedInUser.type);
    } else {
      // If no user is logged in or not a patient/doctor, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  const loadConversations = useCallback(() => {
    if (currentUserId) {
      const fetchedConversations = getConversationsForUser(currentUserId);
      setConversations(fetchedConversations);
    }
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
  }, [conversationId, conversations]);

  const handleNewMessage = () => {
    loadConversations(); // Refresh conversation list to update last message/unread count
  };

  // Ensure currentUserId and currentUserType are valid before rendering chat components
  if (!currentUserId || !(currentUserType === 'patient' || currentUserType === 'doctor')) {
    return <div className="text-center py-10">Please log in as a patient or doctor to view messages.</div>;
  }

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
            currentUserType={currentUserType} // Now guaranteed to be 'patient' | 'doctor'
            activeConversationId={conversationId}
          />
        </div>
        <div className="flex-grow">
          {activeConversation && currentUserId && currentUserType ? (
            <ChatWindow
              conversation={activeConversation}
              currentUserId={currentUserId}
              currentUserType={currentUserType} // Now guaranteed to be 'patient' | 'doctor'
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