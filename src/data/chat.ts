export interface Message {
  id: string;
  conversationId: string;
  senderId: string; // Can be patientId or doctorId
  receiverId: string; // Can be patientId or doctorId
  content: string;
  timestamp: string; // ISO 8601 string
  read: boolean;
}

export interface Conversation {
  id: string;
  participantIds: string[]; // [patientId, doctorId]
  lastMessageContent: string;
  lastMessageTimestamp: string; // ISO 8601 string
  unreadCount: number;
}

// Initial mock data for conversations
export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    participantIds: ['pat-1', 'doc-3'],
    lastMessageContent: 'Looking forward to my appointment!',
    lastMessageTimestamp: '2024-11-05T10:30:00Z',
    unreadCount: 0,
  },
  {
    id: 'conv-2',
    participantIds: ['pat-1', 'doc-4'],
    lastMessageContent: 'Thanks for the follow-up.',
    lastMessageTimestamp: '2024-11-04T15:00:00Z',
    unreadCount: 1,
  },
  {
    id: 'conv-3',
    participantIds: ['pat-2', 'doc-5'],
    lastMessageContent: 'Is the clinic open on holidays?',
    lastMessageTimestamp: '2024-11-03T09:15:00Z',
    unreadCount: 0,
  },
];

// Initial mock data for messages
export const messages: Message[] = [
  { id: 'msg-1', conversationId: 'conv-1', senderId: 'pat-1', receiverId: 'doc-3', content: 'Hi Dr. Smith, just confirming my appointment for tomorrow.', timestamp: '2024-11-05T10:00:00Z', read: true },
  { id: 'msg-2', conversationId: 'conv-1', senderId: 'doc-3', receiverId: 'pat-1', content: 'Hello! Yes, your appointment is confirmed. See you then!', timestamp: '2024-11-05T10:15:00Z', read: true },
  { id: 'msg-3', conversationId: 'conv-1', senderId: 'pat-1', receiverId: 'doc-3', content: 'Looking forward to my appointment!', timestamp: '2024-11-05T10:30:00Z', read: true },

  { id: 'msg-4', conversationId: 'conv-2', senderId: 'pat-1', receiverId: 'doc-4', content: 'Hi Dr. Johnson, I had a quick question about my prescription.', timestamp: '2024-11-04T14:00:00Z', read: true },
  { id: 'msg-5', conversationId: 'conv-2', senderId: 'doc-4', receiverId: 'pat-1', content: 'Certainly, what can I help you with?', timestamp: '2024-11-04T14:30:00Z', read: false },
  { id: 'msg-6', conversationId: 'conv-2', senderId: 'pat-1', receiverId: 'doc-4', content: 'Thanks for the follow-up.', timestamp: '2024-11-04T15:00:00Z', read: false },

  { id: 'msg-7', conversationId: 'conv-3', senderId: 'pat-2', receiverId: 'doc-5', content: 'Hello Dr. White, I need to reschedule my appointment.', timestamp: '2024-11-03T09:00:00Z', read: true },
  { id: 'msg-8', conversationId: 'conv-3', senderId: 'doc-5', receiverId: 'pat-2', content: 'Please call the front desk to reschedule. Thanks!', timestamp: '2024-11-03T09:10:00Z', read: true },
  { id: 'msg-9', conversationId: 'conv-3', senderId: 'pat-2', receiverId: 'doc-5', content: 'Is the clinic open on holidays?', timestamp: '2024-11-03T09:15:00Z', read: true },
];