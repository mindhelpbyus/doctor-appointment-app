import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StarIcon } from 'lucide-react';
import { Review } from '@/data/reviews';

interface DoctorReviewsProps {
  reviews: Review[];
}

const DoctorReviews: React.FC<DoctorReviewsProps> = ({ reviews }) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`h-5 w-5 ${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <Card className="shadow-medium rounded-2xl border-none bg-background">
      <CardHeader>
        <CardTitle className="text-2xl font-recoleta font-semibold text-foreground">Patient Reviews</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div key={review.id} className="flex flex-col sm:flex-row gap-4 border-b border-granite pb-4 last:border-b-0 last:pb-0">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{review.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-foreground">{review.patientName}</h4>
                  <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center my-1">{renderStars(review.rating)}</div>
                <p className="text-muted-foreground font-averta">{review.comment}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground text-center py-8">No reviews yet for this doctor.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DoctorReviews;