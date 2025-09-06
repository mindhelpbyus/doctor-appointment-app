"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { addPromotion } from '@/services/localApi';
import { showError, showSuccess } from '@/utils/toast';
import { Promotion } from '@/data/promotions'; // Import Promotion type

const promotionSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  discountType: z.enum(['percent', 'flat']),
  discountValue: z.coerce.number().positive('Discount value must be a positive number.'),
  validFrom: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
  validTo: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
});

interface CreatePromotionFormProps {
  agencyId: string;
  onSuccess: () => void;
}

const CreatePromotionForm: React.FC<CreatePromotionFormProps> = ({ agencyId, onSuccess }) => {
  const form = useForm<z.infer<typeof promotionSchema>>({
    resolver: zodResolver(promotionSchema),
    defaultValues: {
      title: '',
      description: '',
      discountType: 'percent',
      discountValue: 10,
      validFrom: new Date().toISOString().split('T')[0],
      validTo: new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0],
    },
  });

  function onSubmit(values: z.infer<typeof promotionSchema>) {
    try {
      // Explicitly cast the entire resulting object to the target Omit type
      const promotionData = {
        ...values,
        targetAgencyId: agencyId,
      } as Omit<Promotion, 'id' | 'status'>;
      addPromotion(promotionData);
      showSuccess('Promotion submitted for approval!');
      onSuccess();
    } catch (error) {
      showError('Failed to create promotion.');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 20% Off Annual Check-ups" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the promotion..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="discountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="percent">Percentage (%)</SelectItem>
                    <SelectItem value="flat">Flat Rate ($)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="discountValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discount Value</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="e.g., 20" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="validFrom"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valid From</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="validTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valid To</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full">Create Promotion</Button>
      </form>
    </Form>
  );
};

export default CreatePromotionForm;