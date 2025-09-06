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
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {conversations.length === 0 ? (
        <p className="p-4 text-muted-foreground text-center">No conversations yet.</p>
      ) : (
        conversations.map((conv) => {
          const otherParticipantId = conv.participantIds.find(id => id !== currentUserId);
          const otherParticipant = currentUserType === 'patient' 
            ? getDoctorById(otherParticipantId!) 
            : getPatientById(otherParticipantId!);

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
                <AvatarImage src={otherParticipant?.photoUrl || 'https://via.placeholder.com/40'} />
                <AvatarFallback>{otherParticipant?.fullName?.charAt(0) || '?'}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold">{otherParticipant?.fullName || 'Unknown User'}</h4>
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