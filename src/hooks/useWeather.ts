import { useState, useEffect } from 'react';
import { fetchWeather, type WeatherData } from '../utils/weather';

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getWeather() {
      try {
        setLoading(true);
        setError(null);
        
        // Get user's location
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const data = await fetchWeather(latitude, longitude);
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch weather');
      } finally {
        setLoading(false);
      }
    }

    getWeather();
    
    // Refresh weather every 5 minutes
    const interval = setInterval(getWeather, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { weather, loading, error };
}