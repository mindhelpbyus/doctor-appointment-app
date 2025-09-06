export interface PaymentMethod {
  name: string;
  icon: string; // Could be an SVG path or a component name
}

export const paymentMethodsByCountry: Record<string, PaymentMethod[]> = {
  US: [
    { name: 'Visa', icon: 'visa' },
    { name: 'Mastercard', icon: 'mastercard' },
    { name: 'American Express', icon: 'amex' },
    { name: 'PayPal', icon: 'paypal' },
  ],
  GB: [
    { name: 'Visa', icon: 'visa' },
    { name: 'Mastercard', icon: 'mastercard' },
    { name: 'PayPal', icon: 'paypal' },
  ],
  DE: [
    { name: 'Visa', icon: 'visa' },
    { name: 'Mastercard', icon: 'mastercard' },
    { name: 'PayPal', icon: 'paypal' },
    { name: 'Giropay', icon: 'giropay' },
  ],
  IN: [
    { name: 'Visa', icon: 'visa' },
    { name: 'Mastercard', icon: 'mastercard' },
    { name: 'UPI', icon: 'upi' },
    { name: 'Paytm', icon: 'paytm' },
  ],
  // Default fallback
  default: [
    { name: 'Visa', icon: 'visa' },
    { name: 'Mastercard', icon: 'mastercard' },
    { name: 'PayPal', icon: 'paypal' },
  ],
};

// A placeholder for insurance providers by country
export const insuranceProvidersByCountry: Record<string, string[]> = {
    US: ['Aetna', 'BlueCross', 'Cigna', 'UnitedHealthcare', 'Humana', 'Kaiser Permanente'],
    GB: ['Bupa', 'AXA PPP', 'Aviva', 'VitalityHealth'],
    DE: ['Techniker Krankenkasse', 'AOK', 'Barmer', 'DAK-Gesundheit'],
    IN: ['HDFC Ergo', 'Star Health', 'ICICI Lombard', 'Bajaj Allianz'],
    default: ['Major Insurer A', 'National Health Plan', 'Global Insurance Co.'],
};