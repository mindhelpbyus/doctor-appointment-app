"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PlusCircle, Edit, Trash2, BookOpen, Tag, Calendar } from 'lucide-react';
import { storageManager } from '@/utils/dataStorage';
import { JournalEntry } from '@/data/journal';
import { showSuccess, showError } from '@/utils/toast';
import { Badge } from '@/components/ui/badge';

interface PatientJournalTabProps {
  patientId: string;
}

const PatientJournalTab: React.FC<PatientJournalTabProps> = ({ patientId }) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(5);
  const [tags, setTags] = useState('');
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

  const loadJournalEntries = () => {
    const entries = storageManager.getUserJournalEntries(patientId);
    setJournalEntries(entries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  useEffect(() => {
    if (patientId) {
      loadJournalEntries();
    }
  }, [patientId]);

  const resetForm = () => {
    setTitle('');
    setContent('');
    setMood(5);
    setTags('');
    setEditingEntryId(null);
    setIsWriting(false);
  };

  const handleSaveEntry = () => {
    if (!title.trim() || !content.trim()) {
      showError('Title and content cannot be empty.');
      return;
    }
    const newEntryData = {
      title: title.trim(),
      content: content.trim(),
      mood,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };
    storageManager.addJournalEntry(newEntryData, patientId);
    showSuccess('Journal entry added!');
    resetForm();
    loadJournalEntries();
  };

  const handleEditClick = (entry: JournalEntry) => {
    setEditingEntryId(entry.id);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood);
    setTags(entry.tags.join(', '));
    setIsWriting(true);
  };

  const handleUpdateEntry = () => {
    if (!editingEntryId) return;
    const originalEntry = journalEntries.find(e => e.id === editingEntryId);
    if (!originalEntry) return;

    const updatedEntry: JournalEntry = {
      ...originalEntry,
      title: title.trim(),
      content: content.trim(),
      mood,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
    };
    storageManager.updateJournalEntry(updatedEntry);
    showSuccess('Journal entry updated!');
    resetForm();
    loadJournalEntries();
  };

  const handleDeleteEntry = (entryId: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      storageManager.deleteJournalEntry(entryId);
      showSuccess('Journal entry deleted.');
      loadJournalEntries();
    }
  };

  const getMoodLabel = (moodValue: number) => {
    if (moodValue >= 9) return 'Excellent';
    if (moodValue >= 7) return 'Good';
    if (moodValue >= 5) return 'Neutral';
    if (moodValue >= 3) return 'Low';
    return 'Very Low';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Journal</h2>
        {!isWriting && (
          <Button onClick={() => setIsWriting(true)}>
            <PlusCircle className="w-4 h-4 mr-2" /> New Entry
          </Button>
        )}
      </div>

      {isWriting && (
        <Card>
          <CardHeader>
            <CardTitle>{editingEntryId ? 'Edit Entry' : 'New Entry'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <Textarea placeholder="Write about your day..." value={content} onChange={e => setContent(e.target.value)} rows={5} />
            <div className="space-y-2">
              <Label>Mood: {mood}/10 - {getMoodLabel(mood)}</Label>
              <Input type="range" min="1" max="10" value={mood} onChange={e => setMood(Number(e.target.value))} />
            </div>
            <Input placeholder="Tags (e.g., gratitude, work, stress)" value={tags} onChange={e => setTags(e.target.value)} />
            <div className="flex gap-2">
              <Button onClick={editingEntryId ? handleUpdateEntry : handleSaveEntry}>
                {editingEntryId ? 'Update' : 'Save'}
              </Button>
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {journalEntries.length > 0 ? (
        <div className="space-y-4">
          {journalEntries.map(entry => (
            <Card key={entry.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{entry.title}</CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Calendar className="w-4 h-4" /> {new Date(entry.createdAt).toLocaleDateString()}
                      <span className="font-medium">· Mood: {entry.mood}/10</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(entry)}><Edit className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteEntry(entry.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-wrap mb-4">{entry.content}</p>
                {entry.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : !isWriting && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No journal entries yet.</h3>
            <p className="text-muted-foreground">Click "New Entry" to start writing.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientJournalTab;