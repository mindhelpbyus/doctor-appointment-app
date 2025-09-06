import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, X } from 'lucide-react';
import { JournalEntry } from '@/data/journal';
import { getJournalEntries, addJournalEntry } from '@/services/localApi'; // Corrected import
import { showError, showSuccess } from '@/utils/toast';

interface PatientJournalTabProps {
  patientId: string;
}

const moodEmojis = ['😔', '😟', '😐', '🙂', '😄'];

const PatientJournalTab: React.FC<PatientJournalTabProps> = ({ patientId }) => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: '',
    content: '',
    mood: 3,
    tags: [] as string[],
  });
  const [currentTag, setCurrentTag] = useState('');

  useEffect(() => {
    setEntries(getJournalEntries(patientId)); // Corrected function call
  }, [patientId]);

  const handleAddTag = () => {
    if (currentTag && !newEntry.tags.includes(currentTag)) {
      setNewEntry(prev => ({ ...prev, tags: [...prev.tags, currentTag] }));
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewEntry(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  const handleAddEntry = () => {
    if (!newEntry.title || !newEntry.content) {
      showError('Please fill in both title and content.');
      return;
    }

    const newEntryData = {
      patientId,
      title: newEntry.title,
      content: newEntry.content,
      mood: newEntry.mood,
      tags: newEntry.tags,
    };
    addJournalEntry(newEntryData, patientId); // Corrected function call and added patientId
    showSuccess('Journal entry added!');
    setEntries(getJournalEntries(patientId)); // Corrected function call
    setNewEntry({ title: '', content: '', mood: 3, tags: [] });
    setIsAdding(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Wellness Journal</CardTitle>
        {!isAdding && (
          <Button onClick={() => setIsAdding(true)}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Entry
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {isAdding && (
          <div className="space-y-4 p-4 border rounded-lg mb-6">
            <h3 className="text-lg font-semibold">New Journal Entry</h3>
            <Input
              placeholder="Entry Title"
              value={newEntry.title}
              onChange={e => setNewEntry({ ...newEntry, title: e.target.value })}
            />
            <Textarea
              placeholder="Write about your day..."
              value={newEntry.content}
              onChange={e => setNewEntry({ ...newEntry, content: e.target.value })}
            />
            <div>
              <label className="block text-sm font-medium mb-2">Mood: {moodEmojis[newEntry.mood - 1]}</label>
              <Slider
                min={1}
                max={5}
                step={1}
                value={[newEntry.mood]}
                onValueChange={value => setNewEntry({ ...newEntry, mood: value[0] })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="e.g., grateful, stressed"
                  value={currentTag}
                  onChange={e => setCurrentTag(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleAddTag()}
                />
                <Button onClick={handleAddTag}>Add Tag</Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {newEntry.tags.map(tag => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                    <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button onClick={handleAddEntry}>Save Entry</Button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {entries.length > 0 ? (
            entries.map(entry => (
              <div key={entry.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold">{entry.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-2xl">{moodEmojis[entry.mood - 1]}</span>
                </div>
                <p className="mt-2">{entry.content}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {entry.tags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground text-center">No journal entries yet. Add one to get started!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientJournalTab;