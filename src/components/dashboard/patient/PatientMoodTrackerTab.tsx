"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Calendar, Smile } from 'lucide-react';
import { storageManager } from '@/utils/dataStorage';

interface PatientMoodTrackerTabProps {
  patientId: string;
}

const PatientMoodTrackerTab: React.FC<PatientMoodTrackerTabProps> = ({ patientId }) => {
  const [moodData, setMoodData] = useState<{ date: string; mood: number; timestamp: number }[]>([]);
  const [todayMood, setTodayMood] = useState<number | null>(null);
  const [entriesThisWeek, setEntriesThisWeek] = useState(0);

  useEffect(() => {
    if (patientId) {
      const entries = storageManager.getUserJournalEntries(patientId);
      const moodEntries = entries.map(entry => ({
        date: new Date(entry.createdAt).toDateString(),
        mood: entry.mood,
        timestamp: new Date(entry.createdAt).getTime(),
      })).sort((a, b) => b.timestamp - a.timestamp); // Sort by most recent
      
      setMoodData(moodEntries);
      
      const today = new Date().toDateString();
      const todayEntry = moodEntries.find(entry => entry.date === today);
      setTodayMood(todayEntry ? todayEntry.mood : null);

      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
      startOfWeek.setHours(0, 0, 0, 0);
      const weekEntries = moodEntries.filter(entry => entry.timestamp >= startOfWeek.getTime());
      setEntriesThisWeek(weekEntries.length);
    }
  }, [patientId]);

  const getMoodEmoji = (mood: number | null) => {
    if (mood === null) return '🤔';
    if (mood >= 9) return '😄';
    if (mood >= 7) return '😊';
    if (mood >= 5) return '😐';
    if (mood >= 3) return '😔';
    return '😢';
  };

  const averageMood = moodData.length > 0 
    ? moodData.reduce((sum, entry) => sum + entry.mood, 0) / moodData.length
    : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Mood Tracker</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Mood</CardTitle>
            <Smile className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-5xl my-2">{getMoodEmoji(todayMood)}</div>
            <div className="text-2xl font-bold">{todayMood !== null ? `${todayMood}/10` : 'N/A'}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageMood.toFixed(1)}/10</div>
            <p className="text-xs text-muted-foreground">Based on {moodData.length} entries</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Entries This Week</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entriesThisWeek}</div>
            <p className="text-xs text-muted-foreground">Keep tracking!</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Mood History</CardTitle>
        </CardHeader>
        <CardContent>
          {moodData.length > 0 ? (
            <div className="space-y-3">
              {moodData.slice(0, 7).map((entry, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm text-muted-foreground">{entry.date}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getMoodEmoji(entry.mood)}</span>
                    <span className="font-medium">{entry.mood}/10</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">Start journaling to see your mood history here.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientMoodTrackerTab;