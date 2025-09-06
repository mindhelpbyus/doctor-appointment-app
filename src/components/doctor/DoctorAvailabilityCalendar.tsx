"use client";

import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Plus, Trash2, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { IAvailability, ITimeRange } from '@/models/Doctor';
import { generateTimeOptions } from '@/utils/time';
import { format, isSameDay, parseISO, isValid } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils'; // Import cn for styling

interface DoctorAvailabilityCalendarProps {
  initialAvailability: IAvailability[];
  onSave: (availability: IAvailability[]) => void;
}

const DoctorAvailabilityCalendar = ({ initialAvailability, onSave }: DoctorAvailabilityCalendarProps) => {
  const { toast } = useToast();
  const [availability, setAvailability] = useState<IAvailability[]>(initialAvailability);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const timeOptions = generateTimeOptions(30);

  useEffect(() => {
    // Ensure initialAvailability is always an array
    setAvailability(initialAvailability || []);
    // Ensure selectedDate is valid on initial load or when availability changes
    if (!selectedDate || !isValid(selectedDate)) {
      setSelectedDate(new Date());
    }
  }, [initialAvailability]);

  const getAvailabilityForSelectedDay = () => {
    if (!selectedDate || !isValid(selectedDate)) {
      return null;
    }
    const dayOfWeek = selectedDate.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const found = availability.find(avail => avail.dayOfWeek === dayOfWeek);
    return found;
  };

  const updateAvailabilityForDay = (updatedDayAvailability: IAvailability) => {
    setAvailability(prev => {
      const updated = prev.map(avail =>
        avail.dayOfWeek === updatedDayAvailability.dayOfWeek ? updatedDayAvailability : avail
      );
      // If the day doesn't exist in prev, add it
      if (!prev.some(avail => avail.dayOfWeek === updatedDayAvailability.dayOfWeek)) {
        updated.push(updatedDayAvailability);
      }
      return updated;
    });
  };

  const handleDayToggle = (checked: boolean) => {
    if (!selectedDate || !isValid(selectedDate)) {
      toast({
        title: "Error",
        description: "Please select a valid date first.",
        variant: "destructive",
      });
      return;
    }
    const dayOfWeek = selectedDate.getDay();
    const currentDayAvail = getAvailabilityForSelectedDay() || { dayOfWeek, isAvailable: false, time_ranges: [] };
    updateAvailabilityForDay({ ...currentDayAvail, isAvailable: checked });
  };

  const handleAddTimeRange = () => {
    if (!selectedDate || !isValid(selectedDate)) {
      toast({
        title: "Error",
        description: "Please select a valid date first.",
        variant: "destructive",
      });
      return;
    }
    const dayOfWeek = selectedDate.getDay();
    const currentDayAvail = getAvailabilityForSelectedDay() || { dayOfWeek, isAvailable: true, time_ranges: [] };

    const now = new Date();
    const isToday = selectedDate && isSameDay(selectedDate, now);

    let newStartTime = '09:00';
    let newEndTime = '10:00';

    if (isToday) {
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const nextSlotStartMinutes = Math.ceil((currentMinutes + 1) / 30) * 30;
        
        const startHours = Math.floor(nextSlotStartMinutes / 60);
        const startMins = nextSlotStartMinutes % 60;

        if (startHours < 24) {
            newStartTime = `${String(startHours).padStart(2, '0')}:${String(startMins).padStart(2, '0')}`;
            
            const nextSlotEndMinutes = nextSlotStartMinutes + 60;
            const endHours = Math.floor(nextSlotEndMinutes / 60);
            const endMins = nextSlotEndMinutes % 60;

            if (endHours < 24) {
                newEndTime = `${String(endHours).padStart(2, '0')}:${String(endMins).padStart(2, '0')}`;
            } else {
                newEndTime = '23:59';
            }
        } else {
            toast({
                title: "Cannot Add Slot",
                description: "It's too late in the day to add a new availability slot.",
                variant: "destructive",
            });
            return;
        }
    }

    const newTimeRange: ITimeRange = { start: newStartTime, end: newEndTime };
    updateAvailabilityForDay({
      ...currentDayAvail,
      isAvailable: true,
      time_ranges: [...currentDayAvail.time_ranges, newTimeRange],
    });
  };

  const handleRemoveTimeRange = (indexToRemove: number) => {
    if (!selectedDate || !isValid(selectedDate)) return;
    const dayOfWeek = selectedDate.getDay();
    const currentDayAvail = getAvailabilityForSelectedDay();
    if (currentDayAvail) {
      const updatedTimeRanges = currentDayAvail.time_ranges.filter((_, index) => index !== indexToRemove);
      updateAvailabilityForDay({ ...currentDayAvail, time_ranges: updatedTimeRanges });
    }
  };

  const handleTimeRangeChange = (index: number, type: 'start' | 'end', value: string) => {
    if (!selectedDate || !isValid(selectedDate)) return;
    const dayOfWeek = selectedDate.getDay();
    const currentDayAvail = getAvailabilityForSelectedDay();
    if (currentDayAvail) {
      const updatedTimeRanges = currentDayAvail.time_ranges.map((range, idx) =>
        idx === index ? { ...range, [type]: value } : range
      );
      updateAvailabilityForDay({ ...currentDayAvail, time_ranges: updatedTimeRanges });
    }
  };

  const handleSave = () => {
    const allTimeRangesValid = availability.every(dayAvail =>
      dayAvail.time_ranges.every(range => {
        if (!range.start || !range.end) { // Check for empty strings
          return false;
        }
        const startTime = parseISO(`2000-01-01T${range.start}:00`);
        const endTime = parseISO(`2000-01-01T${range.end}:00`);
        
        // Explicitly check if dates are valid before comparison
        if (!isValid(startTime) || !isValid(endTime)) {
          return false;
        }
        return startTime < endTime;
      })
    );

    if (!allTimeRangesValid) {
      toast({
        title: "Validation Error",
        description: "Please ensure all time slots have valid start and end times, and end times are after their respective start times.",
        variant: "destructive",
      });
      return;
    }

    onSave(availability);
    toast({
      title: "Availability Saved",
      description: "Your availability settings have been updated.",
    });
  };

  const currentDayAvailability = getAvailabilityForSelectedDay();
  const isDayAvailable = currentDayAvailability?.isAvailable ?? false;
  const timeRangesForDay = currentDayAvailability?.time_ranges || [];
  
  const now = new Date();
  const isToday = selectedDate ? isSameDay(selectedDate, now) : false;
  const currentTime = format(now, 'HH:mm');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Select Day</span>
          </CardTitle>
          <CardDescription>Choose a day to manage its availability</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
            className="rounded-md border w-full"
            initialFocus
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Manage Time Slots</span>
          </CardTitle>
          <CardDescription>
            {selectedDate && isValid(selectedDate) ? format(selectedDate, 'EEEE, MMMM d, yyyy') : 'Select a date'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedDate && isValid(selectedDate) ? (
            <>
              <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                <Label htmlFor="day-available-toggle" className="font-medium">
                  Available on this day
                </Label>
                <Switch
                  id="day-available-toggle"
                  checked={isDayAvailable}
                  onCheckedChange={handleDayToggle}
                />
              </div>

              {isDayAvailable && (
                <div className="space-y-3">
                  {timeRangesForDay.length === 0 && (
                    <p className="text-muted-foreground text-sm text-center py-4">
                      No time slots added for this day. Click '+' to add one.
                    </p>
                  )}
                  {timeRangesForDay.map((range, index) => {
                    const startTimeOptions = isToday
                      ? timeOptions.filter(time => time >= currentTime)
                      : timeOptions;
                    
                    const endTimeOptions = timeOptions.filter(time => time > range.start);

                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <Select
                          value={range.start}
                          onValueChange={(value) => handleTimeRangeChange(index, 'start', value)}
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Start" />
                          </SelectTrigger>
                          <SelectContent>
                            {startTimeOptions.map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <span>-</span>
                        <Select
                          value={range.end}
                          onValueChange={(value) => handleTimeRangeChange(index, 'end', value)}
                        >
                          <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="End" />
                          </SelectTrigger>
                          <SelectContent>
                            {endTimeOptions.map(time => (
                              <SelectItem key={time} value={time}>{time}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleRemoveTimeRange(index)}
                          className="flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                  <Button
                    variant="outline"
                    onClick={handleAddTimeRange}
                    className="w-full mt-4"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Time Slot
                  </Button>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Please select a date on the calendar to manage its availability.
            </p>
          )}
        </CardContent>
      </Card>

      <div className="lg:col-span-2 pt-4">
        <Button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          size="lg"
        >
          Save All Availability Settings
        </Button>
      </div>
    </div>
  );
};

export default DoctorAvailabilityCalendar;