import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-charcoal text-background py-12 shadow-inner">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Info */}
        <div className="space-y-4">
          <Link to="/">
            <span className="text-3xl font-recoleta font-bold text-primary">Medixy</span>
          </Link>
          <p className="text-sm text-muted-foreground font-averta">
            Connecting you to better health.
          </p>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-3 font-averta text-primary">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/search" className="text-muted-foreground hover:text-primary transition-colors font-averta">Find a Provider</Link></li>
            <li><Link to="/agencies" className="text-muted-foreground hover:text-primary transition-colors font-averta">Our Agencies</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-averta">About Medixy</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors font-averta">Contact Support</Link></li>
          </ul>
        </div>

        {/* For Providers */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-3 font-averta text-primary">For Providers</h3>
          <ul className="space-y-2">
            <li><Link to="/provider-login" className="text-muted-foreground hover:text-primary transition-colors font-averta">Provider Login</Link></li>
            <li><Link to="/onboard-provider" className="text-muted-foreground hover:text-primary transition-colors font-averta">List Your Practice</Link></li>
            <li><Link to="/provider-resources" className="text-muted-foreground hover:text-primary transition-colors font-averta">Resources</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold mb-3 font-averta text-primary">Legal</h3>
          <ul className="space-y-2">
            <li><Link to="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors font-averta">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors font-averta">Terms of Service</Link></li>
            <li><Link to="/cookie-policy" className="text-muted-foreground hover:text-primary transition-colors font-averta">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16 border-t border-gray-700 mt-8 pt-8 text-center text-sm text-muted-foreground font-averta">
        &copy; {new Date().getFullYear()} Medixy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;