import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-recoleta font-bold text-center text-foreground mb-8">About HealthConnect</h1>
      <p className="text-center text-lg text-muted-foreground font-averta max-w-3xl mx-auto mb-12">
        At HealthConnect, we believe in a healthier future for everyone. Our mission is to seamlessly connect patients with trusted healthcare providers and agencies, making quality care accessible, efficient, and compassionate.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-recoleta font-semibold text-foreground">Our Vision</h2>
          <p className="text-lg text-muted-foreground font-averta">
            To be the leading platform for integrated healthcare, empowering individuals to take control of their health journey and fostering a community of dedicated medical professionals. We envision a world where finding the right care is simple, transparent, and stress-free.
          </p>
        </div>
        <div className="flex justify-center">
          {/* Placeholder for an image or illustration */}
          <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg flex items-center justify-center text-white text-xl font-bold">
            {/* Image Placeholder */}
            <span className="font-recoleta">Connecting Care</span>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-recoleta font-semibold text-foreground mb-6">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="p-6 bg-card rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-averta font-semibold text-primary mb-2">Compassion</h3>
            <p className="text-muted-foreground">We approach every interaction with empathy and understanding, prioritizing the well-being of our users.</p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-averta font-semibold text-primary mb-2">Integrity</h3>
            <p className="text-muted-foreground">We uphold the highest standards of honesty, transparency, and ethical conduct in all our operations.</p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow-sm border border-border">
            <h3 className="text-xl font-averta font-semibold text-primary mb-2">Innovation</h3>
            <p className="text-muted-foreground">We continuously seek new ways to improve healthcare access and delivery through technology and thoughtful design.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;