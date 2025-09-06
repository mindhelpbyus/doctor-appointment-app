import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CreditCard, ReceiptText, ShieldCheck, DollarSign } from 'lucide-react';

const PaymentsFeaturePage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-recoleta font-bold text-center text-foreground mb-8">Streamlined Payments & Billing with Medixy</h1>
      <p className="text-center text-lg text-muted-foreground font-averta max-w-3xl mx-auto mb-12">
        Optimize your revenue cycle with Medixy's secure and integrated payment solutions, providing a seamless financial experience for both your practice and your patients.
      </p>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="flex justify-center order-2 md:order-1">
          <img
            src="/images/payment-processing.jpg"
            alt="Payment Processing"
            className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="space-y-6 order-1 md:order-2">
          <h2 className="text-3xl font-recoleta font-semibold text-foreground">Key Payments & Billing Features</h2>
          <ul className="space-y-4 text-lg text-muted-foreground font-averta">
            <li className="flex items-start gap-3">
              <CreditCard className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Online payment processing for easy patient transactions.</span>
            </li>
            <li className="flex items-start gap-3">
              <ReceiptText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Automated invoicing and billing reminders to improve cash flow.</span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Secure and compliant payment processing to protect sensitive data.</span>
            </li>
            <li className="flex items-start gap-3">
              <DollarSign className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <span>Transparent billing for patients, reducing confusion and disputes.</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-recoleta font-semibold text-foreground mb-6">Ready to Streamline Your Finances?</h2>
        <Button asChild size="lg" variant="custom-primary">
          <Link to="/onboard-provider">Explore Medixy Payments</Link>
        </Button>
      </div>
    </div>
  );
};

export default PaymentsFeaturePage;