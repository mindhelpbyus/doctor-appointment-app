import { agencies, Agency } from '@/data/agencies';
import { appointments, Appointment } from '@/data/appointments';
import { doctors, Doctor } from '@/data/doctors';
import { patients, Patient } from '@/data/patients';
import { promotions, Promotion } from '@/data/promotions';
import { specialties, Specialty } from '@/data/specialties';
import { admins, Admin } from '@/data/admins';
import { agencyUsers, AgencyUser } from '@/data/agencyUsers';
import { conversations, messages, Conversation, Message } from '@/data/chat';
import { agencyPerformanceReport, doctorPerformanceReports, promotionReports, AgencyPerformanceReport, DoctorPerformanceReport, PromotionReport } from '@/data/reports'; // Import new report data and interfaces

// --- Seeding Logic ---
const seedEntity = (key: string, data: unknown[]) => {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

const seedAllData = () => {
  seedEntity('agencies', agencies);
  seedEntity('appointments', appointments);
  seedEntity('doctors', doctors);
  seedEntity('patients', patients);
  seedEntity('promotions', promotions);
  seedEntity('admins', admins);
  seedEntity('agencyUsers', agencyUsers);
  seedEntity('conversations', conversations);
  seedEntity('messages', messages);
  // No need to seed reports as they are static mock data for now.
};

// Initialize data on first load
seedAllData();

// --- Generic Getter ---
const getEntity = <T>(key: string): T[] => {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
};

// --- Generic Updater ---
const updateEntity = <T extends { id: string }>(key: string, updatedItem: T): void => {
  const items = getEntity<T>(key);
  const newItems = items.map(item => (item.id === updatedItem.id ? updatedItem : item));
  localStorage.setItem(key, JSON.stringify(newItems));
};

// --- Specific Getters ---
export const getAgencies = (): Agency[] => getEntity<Agency>('agencies');
export const getAppointments = (): Appointment[] => getEntity<Appointment>('appointments');
export const getDoctors = (): Doctor[] => getEntity<Doctor>('doctors');
export const getPatients = (): Patient[] => getEntity<Patient>('patients');
export const getPromotions = (): Promotion[] => getEntity<Promotion>('promotions');
export const getSpecialties = (): Specialty[] => specialties;
export const getAdmins = (): Admin[] => getEntity<Admin>('admins');
export const getAgencyUsers = (): AgencyUser[] => getEntity<AgencyUser>('agencyUsers');
export const getConversations = (): Conversation[] => getEntity<Conversation>('conversations');
export const getMessages = (): Message[] => getEntity<Message>('messages');

// New report getters
export const getAgencyPerformanceReport = (): AgencyPerformanceReport => agencyPerformanceReport;
export const getDoctorPerformanceReports = (agencyId?: string): DoctorPerformanceReport[] => {
  if (agencyId) {
    const agencyDoctors = getDoctorsByAgencyId(agencyId);
    const agencyDoctorIds = new Set(agencyDoctors.map(d => d.id));
    return doctorPerformanceReports.filter(report => agencyDoctorIds.has(report.doctorId));
  }
  return doctorPerformanceReports;
};
export const getPromotionReports = (agencyId?: string): PromotionReport[] => {
  if (agencyId) {
    const agencyPromotions = getPromotionsByAgencyId(agencyId);
    const agencyPromotionIds = new Set(agencyPromotions.map(p => p.id));
    return promotionReports.filter(report => agencyPromotionIds.has(report.promotionId));
  }
  return promotionReports;
};

// New patient-specific appointment getter
export const getAppointmentsForPatient = (patientId: string): Appointment[] => {
  // Filter for appointments belonging to the patient and that are 'booked' (upcoming)
  return getAppointments().filter(a => a.patientId === patientId && a.status === 'booked');
};


// --- Specific Updaters ---
export const updateAgency = (agency: Agency): void => updateEntity<Agency>('agencies', agency);
export const updateDoctor = (doctor: Doctor): void => updateEntity<Doctor>('doctors', doctor);
export const updatePromotion = (promotion: Promotion): void => updateEntity<Promotion>('promotions', promotion);
export const updateConversation = (conversation: Conversation): void => updateEntity<Conversation>('conversations', conversation);
export const updateMessage = (message: Message): void => updateEntity<Message>('messages', message);


export const addAppointment = (appointment: Omit<Appointment, 'id'>): Appointment => {
  const items = getEntity<Appointment>('appointments');
  const newAppointment = { ...appointment, id: `appt-${Date.now()}` };
  const newItems = [...items, newAppointment];
  localStorage.setItem('appointments', JSON.stringify(newItems));
  return newAppointment;
};

export const addPromotion = (promotion: Omit<Promotion, 'id' | 'status'>): void => {
  const items = getEntity<Promotion>('promotions');
  const newPromotion: Promotion = {
    ...promotion,
    id: `promo-${Date.now()}`,
    status: 'pending',
  };
  const newItems = [...items, newPromotion];
  localStorage.setItem('promotions', JSON.stringify(newItems));
};

export const addAgency = (agencyData: Omit<Agency, 'id' | 'slug' | 'isActive' | 'theme' | 'logo' | 'headerImage'>): void => {
  const items = getEntity<Agency>('agencies');
  const slug = agencyData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  const newAgency: Agency = {
    ...agencyData,
    id: `agency-${Date.now()}`,
    slug,
    logo: `https://via.placeholder.com/150/9CA3AF/FFFFFF?text=${agencyData.name.substring(0, 3).toUpperCase()}`,
    headerImage: `https://via.placeholder.com/1200x300/E5E7EB/4B5563?text=${agencyData.name}`,
    theme: {
      primaryColor: 'hsl(215 28% 17%)',
      secondaryColor: 'hsl(220 13% 91%)',
    },
    isActive: false,
  };

  const newItems = [...items, newAgency];
  localStorage.setItem('agencies', JSON.stringify(newItems));
};

export const addMessage = (message: Omit<Message, 'id'>): Message => {
  const items = getEntity<Message>('messages');
  const newMessage = { ...message, id: `msg-${Date.now()}` };
  const newItems = [...items, newMessage];
  localStorage.setItem('messages', JSON.stringify(newItems));

  const conversation = getConversationById(message.conversationId);
  if (conversation) {
    const updatedConversation = {
      ...conversation,
      lastMessageContent: message.content,
      lastMessageTimestamp: message.timestamp,
      unreadCount: conversation.unreadCount + 1,
    };
    updateConversation(updatedConversation);
  }
  return newMessage;
};

export const createConversation = (patientId: string, doctorId: string): Conversation => {
  const items = getEntity<Conversation>('conversations');
  const newConversation: Conversation = {
    id: `conv-${Date.now()}`,
    participantIds: [patientId, doctorId],
    lastMessageContent: 'New conversation started.',
    lastMessageTimestamp: new Date().toISOString(),
    unreadCount: 0,
  };
  const newItems = [...items, newConversation];
  localStorage.setItem('conversations', JSON.stringify(newItems));
  return newConversation;
};


// --- Complex Getters ---
export const getDoctorById = (id: string): Doctor | undefined => getDoctors().find(d => d.id === id);
export const getSpecialtyById = (id: string): Specialty | undefined => getSpecialties().find(s => s.id === id);
export const getAgencyBySlug = (slug: string): Agency | undefined => getAgencies().find(a => a.slug === slug);
export const getAgencyById = (id: string): Agency | undefined => getAgencies().find(a => a.id === id);
export const getPatientById = (id: string): Patient | undefined => getPatients().find(p => p.id === id);
export const getAgencyUserById = (id: string): AgencyUser | undefined => getAgencyUsers().find(u => u.id === id);
export const getDoctorsByAgencyId = (agencyId: string): Doctor[] => getDoctors().filter(d => d.agencyId === agencyId);
export const getPromotionsByAgencyId = (agencyId: string): Promotion[] => getPromotions().filter(p => p.targetAgencyId === agencyId);
export const getAppointmentsForDoctors = (doctorIds: string[]): Appointment[] => {
  const doctorIdSet = new Set(doctorIds);
  return getAppointments().filter(a => doctorIdSet.has(a.doctorId) && a.status === 'booked');
};
export const getConversationsForUser = (userId: string): Conversation[] => {
  return getConversations().filter(conv => conv.participantIds.includes(userId));
};
export const getMessagesForConversation = (conversationId: string): Message[] => {
  return getMessages().filter(msg => msg.conversationId === conversationId).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
};
export const getConversationById = (id: string): Conversation | undefined => getConversations().find(c => c.id === id);
export const getOrCreateConversation = (patientId: string, doctorId: string): Conversation => {
  let conversation = getConversations().find(
    c => (c.participantIds.includes(patientId) && c.participantIds.includes(doctorId))
  );
  if (!conversation) {
    conversation = createConversation(patientId, doctorId);
  }
  return conversation;
};