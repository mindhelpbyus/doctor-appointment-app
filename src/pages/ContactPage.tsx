import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-recoleta font-bold text-center text-foreground mb-8">Contact Us</h1>
      <p className="text-center text-lg text-muted-foreground font-averta max-w-3xl mx-auto mb-12">
        We're here to help! Whether you have a question, feedback, or need support, please don't hesitate to reach out.
      </p>

      <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
        <div className="space-y-6">
          <h2 className="text-3xl font-recoleta font-semibold text-foreground">Get in Touch</h2>
          <p className="text-lg text-muted-foreground font-averta">
            Our team is available to assist you. Fill out the form or use the contact details below.
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-foreground font-averta">support@healthconnect.com</span>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span className="text-foreground font-averta">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-foreground font-averta">123 Health St, Wellness City, HC 90210</span>
            </div>
          </div>
        </div>

        <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Your Name</label>
              <Input id="name" type="text" placeholder="John Doe" className="w-full" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Your Email</label>
              <Input id="email" type="email" placeholder="john.doe@example.com" className="w-full" />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">Subject</label>
              <Input id="subject" type="text" placeholder="Inquiry about services" className="w-full" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Your Message</label>
              <Textarea id="message" placeholder="How can we help you?" className="w-full min-h-[120px]" />
            </div>
            <Button type="submit" className="w-full btn-custom-primary">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;