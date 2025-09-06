import { useState, useEffect } from 'react';

// In a real application, you would use a service like MaxMind, IPinfo, or the browser's geolocation API.
// For this demo, we'll simulate it and allow for easy extension.
const MOCK_GEOLOCATION_DATA = {
  country: 'US', // Default to US
  countryName: 'United States',
};

export const useGeolocation = () => {
  const [location, setLocation] = useState<{ country: string; countryName: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocation = () => {
      try {
        // Simulate an API call
        setTimeout(() => {
          setLocation(MOCK_GEOLOCATION_DATA);
          setLoading(false);
        }, 500);
      } catch (err) {
        setError('Could not determine location.');
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, loading, error };
};