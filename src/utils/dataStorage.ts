import { JournalEntry, journalEntries as initialJournalEntries } from '@/data/journal';

// Simulate localStorage for journal entries
const JOURNAL_ENTRIES_KEY = 'journalEntries';

const getStoredJournalEntries = (): JournalEntry[] => {
  const storedData = localStorage.getItem(JOURNAL_ENTRIES_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      console.error("Failed to parse journal entries from localStorage", e);
      return [];
    }
  }
  // Seed initial data if not in localStorage
  localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(initialJournalEntries));
  return initialJournalEntries;
};

const updateAllJournalEntries = (entries: JournalEntry[]): void => {
  localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(entries));
};

export const storageManager = {
  getUserJournalEntries: (patientId: string): JournalEntry[] => {
    const allEntries = getStoredJournalEntries();
    return allEntries.filter(entry => entry.patientId === patientId);
  },
  addJournalEntry: (newEntry: Omit<JournalEntry, 'id' | 'createdAt'>, patientId: string): JournalEntry => {
    const allEntries = getStoredJournalEntries();
    const entryWithId: JournalEntry = {
      ...newEntry,
      id: `journal-${Date.now()}`,
      patientId: patientId,
      createdAt: new Date().toISOString(),
    };
    const updatedEntries = [...allEntries, entryWithId];
    updateAllJournalEntries(updatedEntries);
    return entryWithId;
  },
  updateJournalEntry: (updatedEntry: JournalEntry): void => {
    const allEntries = getStoredJournalEntries();
    const newEntries = allEntries.map(entry =>
      entry.id === updatedEntry.id ? updatedEntry : entry
    );
    updateAllJournalEntries(newEntries);
  },
  deleteJournalEntry: (entryId: string): void => {
    const allEntries = getStoredJournalEntries();
    const newEntries = allEntries.filter(entry => entry.id !== entryId);
    updateAllJournalEntries(newEntries);
  },
};