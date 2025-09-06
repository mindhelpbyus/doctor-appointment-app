import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getMessagesForConversation, addMessage, getDoctorById, getPatientById, getConversationById, updateConversation, updateMessage } from '@/services/localApi'; // Imported updateMessage
import { Message, Conversation } from '@/data/chat';
import MessageBubble from './MessageBubble';
import { Doctor } from '@/data/doctors';
import { Patient } from '@/data/patients';

interface ChatWindowProps {
  conversation: Conversation;
  currentUserId: string;
  currentUserType: 'patient' | 'doctor';
  onNewMessage: () => void; // Callback to refresh conversation list
}

const ChatWindow: React.FC<ChatWindowProps> = ({ conversation, currentUserId, currentUserType, onNewMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessageContent, setNewMessageContent] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const defaultAvatarUrl = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const otherParticipantId = conversation.participantIds.find(id => id !== currentUserId);
  
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

  const loadMessages = () => {
    const fetchedMessages = getMessagesForConversation(conversation.id);
    setMessages(fetchedMessages);

    // Mark messages as read if the current user is the receiver
    const unreadMessages = fetchedMessages.filter(msg => !msg.read && msg.receiverId === currentUserId);
    unreadMessages.forEach(msg => {
      updateMessage({ ...msg, read: true });
    });

    // Reset unread count for the current conversation
    if (conversation.unreadCount > 0) {
      updateConversation({ ...conversation, unreadCount: 0 });
      onNewMessage(); // Trigger refresh of conversation list
    }
  };

  useEffect(() => {
    loadMessages();
    // Scroll to bottom on initial load and when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [conversation.id]); // Reload messages when conversation changes

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
    if (newMessageContent.trim() === '' || !otherParticipantId) return;

    const newMessage: Omit<Message, 'id'> = {
      conversationId: conversation.id,
      senderId: currentUserId,
      receiverId: otherParticipantId,
      content: newMessageContent.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };

    addMessage(newMessage);
    setNewMessageContent('');
    loadMessages(); // Reload messages to show the new one and update conversation
    onNewMessage(); // Notify parent to refresh conversation list
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4 flex items-center gap-3">
        <img
          src={otherParticipantPhotoUrl}
          alt={otherParticipantName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <h3 className="text-lg font-semibold">{otherParticipantName}</h3>
        <img src="/medxiy_chat.jpeg" alt="Medixy Chat" className="h-8 w-8 ml-auto" /> {/* Increased size */}
      </div>
      <ScrollArea className="flex-grow p-4 space-y-4" ref={scrollAreaRef}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} isSender={msg.senderId === currentUserId} />
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
  );
};

export default ChatWindow;