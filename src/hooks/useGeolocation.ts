import { useState } from 'react';

// In a real application, you would use a service like Google Maps, Mapbox, or OpenStreetMap for reverse geocoding.
// For this demo, we'll use the browser's Geolocation API and simulate the reverse geocode lookup.
const SIMULATED_REVERSE_GEOCODE = {
  city: 'Central City',
  country: 'US',
  countryName: 'United States',
};

export const useGeolocation = () => {
  const [location, setLocation] = useState<{ city: string; country: string; countryName: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Simulate reverse geocoding API call with the coordinates
        console.log('Geolocation success:', position.coords);
        setTimeout(() => {
          setLocation(SIMULATED_REVERSE_GEOCODE);
          setLoading(false);
        }, 500); // Simulate network latency
      },
      (err) => {
        console.error('Geolocation error:', err);
        setError(`Failed to get location: ${err.message}`);
        setLoading(false);
      }
    );
  };

  return { location, loading, error, fetchLocation };
};