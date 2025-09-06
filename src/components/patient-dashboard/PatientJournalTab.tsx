"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { storageManager } from '@/utils/dataStorage';
import { JournalEntry } from '@/data/journal';
import { showSuccess, showError } from '@/utils/toast';

interface PatientJournalTabProps {
  patientId: string;
}

const PatientJournalTab: React.FC<PatientJournalTabProps> = ({ patientId }) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [newEntryTitle, setNewEntryTitle] = useState('');
  const [newEntryContent, setNewEntryContent] = useState('');
  const [newEntryMood, setNewEntryMood] = useState<number>(5); // Default mood
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

  const loadJournalEntries = () => {
    const entries = storageManager.getUserJournalEntries(patientId);
    setJournalEntries(entries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  useEffect(() => {
    loadJournalEntries();
  }, [patientId]);

  const handleAddEntry = () => {
    if (!newEntryTitle.trim() || !newEntryContent.trim()) {
      showError('Title and content cannot be empty.');
      return;
    }

    const newEntry: Omit<JournalEntry, 'id' | 'createdAt'> = {
      title: newEntryTitle.trim(),
      content: newEntryContent.trim(),
      mood: newEntryMood,
      patientId: patientId,
    };

    storageManager.addJournalEntry(newEntry, patientId);
    showSuccess('Journal entry added!');
    setNewEntryTitle('');
    setNewEntryContent('');
    setNewEntryMood(5);
    loadJournalEntries(); // Refresh entries
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntryId(entry.id);
    setNewEntryTitle(entry.title);
    setNewEntryContent(entry.content);
    setNewEntryMood(entry.mood);
  };

  const handleUpdateEntry = () => {
    if (!editingEntryId || !newEntryTitle.trim() || !newEntryContent.trim()) {
      showError('Title and content cannot be empty.');
      return;
    }

    const updatedEntry: JournalEntry = {
      id: editingEntryId,
      patientId: patientId,
      title: newEntryTitle.trim(),
      content: newEntryContent.trim(),
      mood: newEntryMood,
      createdAt: journalEntries.find(e => e.id === editingEntryId)?.createdAt || new Date().toISOString(), // Keep original creation date
    };

    storageManager.updateJournalEntry(updatedEntry);
    
    showSuccess('Journal entry updated!');
    setEditingEntryId(null);
    setNewEntryTitle('');
    setNewEntryContent('');
    setNewEntryMood(5);
    loadJournalEntries(); // Refresh entries
  };

  const handleDeleteEntry = (entryId: string) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      storageManager.deleteJournalEntry(entryId);
      
      showSuccess('Journal entry deleted!');
      loadJournalEntries(); // Refresh entries
    }
  };

  const getMoodEmoji = (mood: number) => {
    if (mood >= 8) return '😊';
    if (mood >= 6) return '🙂';
    if (mood >= 4) return '😐';
    if (mood >= 2) return '😔';
    return '😢';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{editingEntryId ? 'Edit Journal Entry' : 'Add New Journal Entry'}</CardTitle>
          <CardDescription>Reflect on your day and track your mood.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="entry-title">Title</Label>
            <Input
              id="entry-title"
              placeholder="What's on your mind?"
              value={newEntryTitle}
              onChange={(e) => setNewEntryTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="entry-content">Content</Label>
            <Textarea
              id="entry-content"
              placeholder="Write about your thoughts and feelings..."
              value={newEntryContent}
              onChange={(e) => setNewEntryContent(e.target.value)}
              rows={5}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="entry-mood">Mood (1-10)</Label>
            <Input
              id="entry-mood"
              type="range"
              min="1"
              max="10"
              value={newEntryMood}
              onChange={(e) => setNewEntryMood(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>1 (😢)</span>
              <span>{newEntryMood} {getMoodEmoji(newEntryMood)}</span>
              <span>10 (😊)</span>
            </div>
          </div>
          <Button onClick={editingEntryId ? handleUpdateEntry : handleAddEntry} className="w-full">
            {editingEntryId ? (
              <>
                <Edit className="h-4 w-4 mr-2" /> Update Entry
              </>
            ) : (
              <>
                <PlusCircle className="h-4 w-4 mr-2" /> Add Entry
              </>
            )}
          </Button>
          {editingEntryId && (
            <Button variant="outline" onClick={() => {
              setEditingEntryId(null);
              setNewEntryTitle('');
              setNewEntryContent('');
              setNewEntryMood(5);
            }} className="w-full mt-2">
              Cancel Edit
            </Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Journal Entries ({journalEntries.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {journalEntries.length > 0 ? (
            journalEntries.map((entry) => (
              <Card key={entry.id} className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-semibold">{entry.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    <span className="font-medium">{entry.mood}/10</span>
                  </div>
                </div>
                <p className="text-gray-700 mb-3">{entry.content}</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEditEntry(entry)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteEntry(entry.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No journal entries yet. Start by adding one above!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientJournalTab;