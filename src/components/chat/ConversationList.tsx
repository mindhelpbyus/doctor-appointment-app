import React from 'react';
import { Link } from 'react-router-dom';
import { Conversation } from '@/data/chat';
import { getDoctorById, getPatientById } from '@/services/localApi';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ConversationListProps {
  conversations: Conversation[];
  currentUserId: string;
  currentUserType: 'patient' | 'doctor';
  activeConversationId?: string;
}

const ConversationList: React.FC<ConversationListProps> = ({ conversations, currentUserId, currentUserType, activeConversationId }) => {
  const defaultAvatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Conversations</h2>
      </div>
      {conversations.length === 0 ? (
        <p className="p-4 text-muted-foreground text-center">No conversations yet.</p>
      ) : (
        conversations.map((conv) => {
          const otherParticipantId = conv.participantIds.find(id => id !== currentUserId);
          
          let otherParticipantName: string = 'Unknown User';
          let otherParticipantPhotoUrl: string = defaultAvatarUrl; // Default placeholder

          if (otherParticipantId) {
            if (currentUserType === 'patient') {
              const doctor = getDoctorById(otherParticipantId);
              if (doctor) {
                otherParticipantName = doctor.fullName;
                otherParticipantPhotoUrl = doctor.photoUrl || defaultAvatarUrl;
              }
            } else { // currentUserType === 'doctor'
              const patient = getPatientById(otherParticipantId);
              if (patient) {
                otherParticipantName = patient.name;
                // Patients don't have photoUrl in the current data, use default
              }
            }
          }

          const lastMessageTime = new Date(conv.lastMessageTimestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

          return (
            <Link
              key={conv.id}
              to={`/messages/${conv.id}`}
              className={cn(
                'flex items-center gap-3 p-4 border-b hover:bg-muted transition-colors',
                activeConversationId === conv.id && 'bg-accent'
              )}
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={otherParticipantPhotoUrl} />
                <AvatarFallback>{otherParticipantName.charAt(0) || '?'}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{otherParticipantName}</h4>
                  <span className="text-xs text-muted-foreground">{lastMessageTime}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conv.lastMessageContent}</p>
              </div>
              {conv.unreadCount > 0 && (
                <span className="ml-auto px-2 py-1 text-xs font-bold text-primary-foreground bg-primary rounded-full">
                  {conv.unreadCount}
                </span>
              )}
            </Link>
          );
        })
      )}
    </div>
  );
};

export default ConversationList;