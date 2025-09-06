import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { testimonials } from '@/data/testimonials';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Testimonials: React.FC = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 font-recoleta text-foreground">
          What Our Users Have to Say
        </h2>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="h-full flex flex-col justify-between p-6 shadow-subtle border-none">
                    <CardContent className="p-0 space-y-4">
                      <p className="text-muted-foreground font-averta">"{testimonial.comment}"</p>
                      <div className="flex items-center gap-4 pt-4">
                        <Avatar>
                          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;