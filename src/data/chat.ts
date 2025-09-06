export interface Message {
  id: string;
  conversationId: string;
  senderId: string; // Can be patientId or doctorId
  receiverId: string; // Can be patientId or doctorId
  content: string;
  timestamp: string; // ISO 8601 string
  read: boolean;
}

export type ConversationTopic = 'medication' | 'medical_query' | 'general' | 'appointment_booking';

export interface Conversation {
  id: string;
  participantIds: string[]; // [patientId, doctorId]
  lastMessageContent: string;
  lastMessageTimestamp: string; // ISO 8601 string
  unreadCount: number;
  topic?: ConversationTopic; // New optional field for conversation topic
}

// Initial mock data for conversations
export const conversations: Conversation[] = [
  {
    id: 'conv-1',
    participantIds: ['pat-1', 'doc-3'],
    lastMessageContent: 'Looking forward to my appointment!',
    lastMessageTimestamp: '2024-11-05T10:30:00Z',
    unreadCount: 0,
    topic: 'appointment_booking',
  },
  {
    id: 'conv-2',
    participantIds: ['pat-1', 'doc-4'],
    lastMessageContent: 'Thanks for the follow-up.',
    lastMessageTimestamp: '2024-11-04T15:00:00Z',
    unreadCount: 1,
    topic: 'medical_query',
  },
  {
    id: 'conv-3',
    participantIds: ['pat-2', 'doc-5'],
    lastMessageContent: 'Is the clinic open on holidays?',
    lastMessageTimestamp: '2024-11-03T09:15:00Z',
    unreadCount: 0,
    topic: 'general',
  },
  // New conversations
  {
    id: 'conv-4',
    participantIds: ['pat-demo', 'doc-1'],
    lastMessageContent: 'Hello Dr. Reed, I have a question about my skin condition.',
    lastMessageTimestamp: '2024-11-08T11:00:00Z',
    unreadCount: 1, // Unread for doc-1
    topic: 'medical_query',
  },
  {
    id: 'conv-5',
    participantIds: ['pat-demo', 'doc-3'],
    lastMessageContent: 'Confirming my appointment for next week.',
    lastMessageTimestamp: '2024-11-09T14:00:00Z',
    unreadCount: 0,
    topic: 'appointment_booking',
  },
  {
    id: 'conv-6',
    participantIds: ['pat-6', 'doc-5'],
    lastMessageContent: 'Regarding my heart check-up results.',
    lastMessageTimestamp: '2024-11-07T16:00:00Z',
    unreadCount: 0,
    topic: 'medical_query',
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

  // New messages for conv-4 (pat-demo, doc-1)
  { id: 'msg-10', conversationId: 'conv-4', senderId: 'pat-demo', receiverId: 'doc-1', content: 'Hello Dr. Reed, I have a question about my skin condition.', timestamp: '2024-11-08T10:00:00Z', read: true },
  { id: 'msg-11', conversationId: 'conv-4', senderId: 'doc-1', receiverId: 'pat-demo', content: 'Hi! Please describe your symptoms in more detail.', timestamp: '2024-11-08T10:30:00Z', read: false },
  { id: 'msg-12', conversationId: 'conv-4', senderId: 'pat-demo', receiverId: 'doc-1', content: 'It\'s a persistent rash on my arm.', timestamp: '2024-11-08T11:00:00Z', read: false },

  // New messages for conv-5 (pat-demo, doc-3)
  { id: 'msg-13', conversationId: 'conv-5', senderId: 'pat-demo', receiverId: 'doc-3', content: 'Hi Dr. Smith, just confirming my appointment for next week.', timestamp: '2024-11-09T13:00:00Z', read: true },
  { id: 'msg-14', conversationId: 'conv-5', senderId: 'doc-3', receiverId: 'pat-demo', content: 'Confirmed! Looking forward to seeing you.', timestamp: '2024-11-09T13:30:00Z', read: true },
  { id: 'msg-15', conversationId: 'conv-5', senderId: 'pat-demo', receiverId: 'doc-3', content: 'Thank you!', timestamp: '2024-11-09T14:00:00Z', read: true },
];