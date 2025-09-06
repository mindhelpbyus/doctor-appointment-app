"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PlusCircle, Edit, Trash2, BookOpen, Tag, Calendar } from 'lucide-react';
import { storageManager } from '@/utils/dataStorage';
import { JournalEntry } from '@/data/journal';
import { showSuccess, showError } from '@/utils/toast';
import { Badge } from '@/components/ui/badge'; // Import Badge component

interface PatientJournalTabProps {
  patientId: string;
}

const PatientJournalTab: React.FC<PatientJournalTabProps> = ({ patientId }) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(5); // Default mood
  const [tags, setTags] = useState(''); // New state for tags
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);

  const loadJournalEntries = () => {
    const entries = storageManager.getUserJournalEntries(patientId);
    setJournalEntries(entries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  };

  useEffect(() => {
    loadJournalEntries();
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

    const newEntry: Omit<JournalEntry, 'id' | 'createdAt'> = {
      title: title.trim(),
      content: content.trim(),
      mood: mood,
      patientId: patientId,
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
    };

    storageManager.addJournalEntry(newEntry, patientId);
    showSuccess('Journal entry added!');
    resetForm();
    loadJournalEntries(); // Refresh entries
  };

  const handleEditEntry = (entry: JournalEntry) => {
    setEditingEntryId(entry.id);
    setTitle(entry.title);
    setContent(entry.content);
    setMood(entry.mood);
    setTags(entry.tags.join(', ')); // Convert array back to string for editing
    setIsWriting(true); // Open the writing form
  };

  const handleUpdateEntry = () => {
    if (!editingEntryId || !title.trim() || !content.trim()) {
      showError('Title and content cannot be empty.');
      return;
    }

    const updatedEntry: JournalEntry = {
      id: editingEntryId,
      patientId: patientId,
      title: title.trim(),
      content: content.trim(),
      mood: mood,
      createdAt: journalEntries.find(e => e.id === editingEntryId)?.createdAt || new Date().toISOString(), // Keep original creation date
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0),
    };

    storageManager.updateJournalEntry(updatedEntry);
    
    showSuccess('Journal entry updated!');
    resetForm();
    loadJournalEntries(); // Refresh entries
  };

  const handleDeleteEntry = (entryId: string) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      storageManager.deleteJournalEntry(entryId);
      
      showSuccess('Journal entry deleted!');
      loadJournalEntries(); // Refresh entries
    }
  };

  const getMoodColor = (moodValue: number) => {
    if (moodValue >= 8) return 'text-green-600';
    if (moodValue >= 6) return 'text-yellow-600';
    if (moodValue >= 4) return 'text-orange-600';
    return 'text-red-600';
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
        <Button onClick={() => setIsWriting(true)} disabled={isWriting}>
          <PlusCircle className="w-4 h-4 mr-2" />
          New Entry
        </Button>
      </div>

      {isWriting && (
        <Card>
          <CardHeader>
            <CardTitle>{editingEntryId ? 'Edit Journal Entry' : 'New Journal Entry'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="entry-title">Title</Label>
              <Input
                id="entry-title"
                placeholder="Give your entry a title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="entry-mood">
                Mood (1-10): {mood} - {getMoodLabel(mood)}
              </Label>
              <Input
                id="entry-mood"
                type="range"
                min="1"
                max="10"
                value={mood}
                onChange={(e) => setMood(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div>
              <Label htmlFor="entry-content">Content</Label>
              <Textarea
                id="entry-content"
                placeholder="Write about your thoughts, feelings, experiences..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
              />
            </div>

            <div>
              <Label htmlFor="entry-tags">Tags (comma-separated)</Label>
              <Input
                id="entry-tags"
                placeholder="gratitude, anxiety, progress, therapy..."
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={editingEntryId ? handleUpdateEntry : handleSaveEntry}>
                {editingEntryId ? 'Update Entry' : 'Save Entry'}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {journalEntries.map((entry) => (
          <Card key={entry.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{entry.title}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </div>
                    <div className={`font-medium ${getMoodColor(entry.mood)}`}>
                      Mood: {entry.mood}/10 ({getMoodLabel(entry.mood)})
                    </div>
                  </div>
                </div>
                <BookOpen className="w-5 h-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 whitespace-pre-wrap">
                {entry.content}
              </p>
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-1">
                    {entry.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={() => handleEditEntry(entry)}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteEntry(entry.id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {journalEntries.length === 0 && !isWriting && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Start Your Journey</h3>
            <p className="text-muted-foreground mb-4">
              Journaling can help you process thoughts and track your mental health journey.
            </p>
            <Button onClick={() => setIsWriting(true)}>
              <PlusCircle className="w-4 h-4 mr-2" />
              Write Your First Entry
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PatientJournalTab;