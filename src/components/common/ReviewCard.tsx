import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StarIcon } from 'lucide-react';
import { Review } from '@/data/reviews';

interface ReviewCardProps {
  review: Review;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={`h-5 w-5 ${index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );
};

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <Card className="bg-light-grey border-none shadow-subtle">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar>
          <AvatarFallback>{review.patientName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">{review.patientName}</p>
          <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
        </div>
        <div className="ml-auto">
          <StarRating rating={review.rating} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{review.comment}</p>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;