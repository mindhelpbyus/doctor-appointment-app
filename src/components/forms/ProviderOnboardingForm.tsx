"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addAgency } from '@/services/localApi';
import { showError, showSuccess } from '@/utils/toast';
import { Link } from 'react-router-dom';
import { Agency } from '@/data/agencies'; // Import Agency type

const agencySchema = z.object({
  name: z.string().min(3, 'Agency name must be at least 3 characters.'),
  websiteUrl: z.string().url('Please enter a valid URL.'),
  address: z.string().min(10, 'Please enter a complete address.'),
  phone: z.string().min(10, 'Please enter a valid phone number.'),
  type: z.enum(['Clinic', 'Hospital', 'Health System']),
});

const ProviderOnboardingForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof agencySchema>>({
    resolver: zodResolver(agencySchema),
    defaultValues: {
      name: '',
      websiteUrl: '',
      address: '',
      phone: '',
      type: 'Clinic',
    },
  });

  function onSubmit(values: z.infer<typeof agencySchema>) {
    try {
      // Explicitly cast values to the expected type
      const agencyData: Omit<Agency, 'id' | 'slug' | 'isActive' | 'theme' | 'logo' | 'headerImage'> = values as z.infer<typeof agencySchema>;
      addAgency(agencyData);
      showSuccess('Application submitted for review!');
      setIsSubmitted(true);
    } catch (error) {
      showError('Failed to submit application.');
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4 p-8">
        <h3 className="text-2xl font-semibold">Thank You!</h3>
        <p className="text-muted-foreground">Your application has been submitted. An administrator will review your information and activate your account shortly.</p>
        <Button asChild>
          <Link to="/">Return to Homepage</Link>
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Practice Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Evergreen Hospital" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, Anytown, USA" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="(555) 123-4567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Practice Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Clinic">Clinic</SelectItem>
                    <SelectItem value="Hospital">Hospital</SelectItem>
                    <SelectItem value="Health System">Health System</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">Submit for Review</Button>
      </form>
    </Form>
  );
};

export default ProviderOnboardingForm;