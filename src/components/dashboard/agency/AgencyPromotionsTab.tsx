"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar as UiCalendar } from '@/components/ui/calendar';
import { Promotion } from '@/data/promotions';
import { addPromotion } from '@/services/localApi';
import { showError, showSuccess } from '@/utils/toast';

interface AgencyPromotionsTabProps {
  agencyId: string;
  promotions: Promotion[];
  onPromotionsUpdated: () => void; // Callback to refresh parent's promotions state
}

const AgencyPromotionsTab: React.FC<AgencyPromotionsTabProps> = ({ agencyId, promotions, onPromotionsUpdated }) => {
  const [newPromotionTitle, setNewPromotionTitle] = useState('');
  const [newPromotionDescription, setNewPromotionDescription] = useState('');
  const [newPromotionDiscountType, setNewPromotionDiscountType] = useState<'percent' | 'flat'>('percent');
  const [newPromotionDiscountValue, setNewPromotionDiscountValue] = useState<number>(0);
  const [newPromotionValidFrom, setNewPromotionValidFrom] = useState<Date | undefined>(undefined);
  const [newPromotionValidTo, setNewPromotionValidTo] = useState<Date | undefined>(undefined);

  const handleAddPromotion = () => {
    if (!newPromotionTitle || !newPromotionDescription || newPromotionDiscountValue <= 0 || !newPromotionValidFrom || !newPromotionValidTo) {
      showError('Please fill in all promotion fields correctly.');
      return;
    }
    if (newPromotionValidFrom > newPromotionValidTo) {
      showError('Start date cannot be after end date.');
      return;
    }

    const newPromo: Omit<Promotion, 'id' | 'status'> = {
      title: newPromotionTitle,
      description: newPromotionDescription,
      discountType: newPromotionDiscountType,
      discountValue: newPromotionDiscountValue,
      validFrom: newPromotionValidFrom.toISOString(),
      validTo: newPromotionValidTo.toISOString(),
      targetAgencyId: agencyId,
    };

    addPromotion(newPromo);
    showSuccess('Promotion added successfully! Awaiting admin approval.');
    // Clear form
    setNewPromotionTitle('');
    setNewPromotionDescription('');
    setNewPromotionDiscountType('percent');
    setNewPromotionDiscountValue(0);
    setNewPromotionValidFrom(undefined);
    setNewPromotionValidTo(undefined);
    // Refresh promotions list in parent
    onPromotionsUpdated();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Promotion</CardTitle>
          <CardDescription>Create a new promotional offer for your agency's doctors.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="promo-title">Title</Label>
              <Input id="promo-title" value={newPromotionTitle} onChange={(e) => setNewPromotionTitle(e.target.value)} placeholder="e.g., 10% Off First Session" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="promo-description">Description</Label>
              <Textarea id="promo-description" value={newPromotionDescription} onChange={(e) => setNewPromotionDescription(e.target.value)} placeholder="Brief description of the promotion" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="promo-discount-type">Discount Type</Label>
              <Select value={newPromotionDiscountType} onValueChange={(value: 'percent' | 'flat') => setNewPromotionDiscountType(value)}>
                <SelectTrigger id="promo-discount-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percent">Percentage (%)</SelectItem>
                  <SelectItem value="flat">Flat Rate ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="promo-discount-value">Discount Value</Label>
              <Input
                id="promo-discount-value"
                type="number"
                value={newPromotionDiscountValue}
                onChange={(e) => setNewPromotionDiscountValue(parseFloat(e.target.value) || 0)}
                placeholder="e.g., 10 or 50"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="promo-valid-from">Valid From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newPromotionValidFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newPromotionValidFrom ? format(newPromotionValidFrom, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <UiCalendar
                    mode="single"
                    selected={newPromotionValidFrom}
                    onSelect={setNewPromotionValidFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="promo-valid-to">Valid To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newPromotionValidTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newPromotionValidTo ? format(newPromotionValidTo, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <UiCalendar
                    mode="single"
                    selected={newPromotionValidTo}
                    onSelect={setNewPromotionValidTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Button onClick={handleAddPromotion} className="w-full">
            <PlusCircle className="h-4 w-4 mr-2" /> Submit Promotion for Approval
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Promotions ({promotions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {promotions.length > 0 ? (
            <div className="relative w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Offer</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {promotions.map((promo) => (
                    <TableRow key={promo.id}>
                      <TableCell className="font-medium">{promo.title}</TableCell>
                      <TableCell>
                        {promo.discountType === 'percent' ? `${promo.discountValue}% off` : `$${promo.discountValue} off`}
                      </TableCell>
                      <TableCell>{format(new Date(promo.validFrom), 'MMM d')} - {format(new Date(promo.validTo), 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Badge variant={promo.status === 'approved' ? 'default' : promo.status === 'pending' ? 'secondary' : 'destructive'}>
                          {promo.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-muted-foreground">No promotions created for your agency yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgencyPromotionsTab;