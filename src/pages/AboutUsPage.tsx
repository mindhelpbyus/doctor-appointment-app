import React from 'react';

const AboutUsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-recoleta font-bold text-center text-foreground mb-8">About Medixy™</h1>
      <p className="text-center text-lg text-muted-foreground font-averta max-w-3xl mx-auto mb-12">
        Medixy™ is a flagship product of Bedrock Health Solution™, designed to revolutionize how patients connect with healthcare providers. We are committed to building a healthier future by making quality care accessible, efficient, and compassionate for everyone.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-recoleta font-semibold text-foreground">Our Vision for Medixy™</h2>
          <p className="text-lg text-muted-foreground font-averta">
            Medixy™ envisions a world where finding the right healthcare provider is simple, transparent, and stress-free. We aim to be the leading platform for integrated healthcare, empowering individuals to take control of their health journey and fostering a vibrant community of dedicated medical professionals. Through innovative technology, Medixy™ streamlines appointment booking, communication, and patient management, ensuring a seamless experience for both patients and providers.
          </p>
        </div>
        <div className="flex justify-center">
          <div className="w-full max-w-md h-64 bg-gradient-to-br from-primary to-accent rounded-lg shadow-lg flex items-center justify-center text-white text-xl font-bold">
            <span className="font-recoleta">Medixy™: Connecting Care</span>
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-recoleta font-semibold text-foreground mb-6">About Bedrock Health Solution™</h2>
        <p className="text-lg text-muted-foreground font-averta max-w-3xl mx-auto mb-12">
          Bedrock Health Solution™ is a pioneering company dedicated to developing cutting-edge technology solutions for the healthcare industry. With a focus on innovation, reliability, and user-centric design, we strive to create products that enhance patient care, optimize operational efficiency for providers, and ultimately contribute to a healthier global community. Medixy™ is a testament to our commitment to transforming healthcare delivery.
        </p>
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