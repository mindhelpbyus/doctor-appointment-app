"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Calendar, Smile } from 'lucide-react';
import { storageManager } from '@/utils/dataStorage';
import { JournalEntry } from '@/data/journal';

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
      }));
      
      setMoodData(moodEntries);
      
      const today = new Date().toDateString();
      const todayEntry = moodEntries.find(entry => entry.date === today);
      if (todayEntry) {
        setTodayMood(todayEntry.mood);
      } else {
        setTodayMood(null);
      }

      // Calculate entries this week
      const now = new Date();
      const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay())); // Sunday
      startOfWeek.setHours(0, 0, 0, 0); // Set to beginning of the day

      const weekEntries = moodEntries.filter(entry => new Date(entry.timestamp) >= startOfWeek);
      setEntriesThisWeek(weekEntries.length);
    }
  }, [patientId]);

  const getMoodEmoji = (mood: number) => {
    if (mood >= 8) return '😊';
    if (mood >= 6) return '🙂';
    if (mood >= 4) return '😐';
    if (mood >= 2) return '😔';
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
          <CardContent>
            {todayMood !== null ? (
              <div className="text-center">
                <div className="text-4xl mb-2">{getMoodEmoji(todayMood)}</div>
                <div className="text-2xl font-bold">{todayMood}/10</div>
              </div>
            ) : (
              <p className="text-muted-foreground">Log a journal entry to track mood</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Mood</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageMood.toFixed(1)}/10</div>
            <p className="text-xs text-muted-foreground">
              Based on {moodData.length} entries
            </p>
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
            <p className="text-muted-foreground text-center py-8">
              Start journaling to see your mood history here.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientMoodTrackerTab;