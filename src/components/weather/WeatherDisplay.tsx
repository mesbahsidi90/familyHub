import React from 'react';
import { Cloud, Loader } from 'lucide-react';
import { useWeather } from '../../hooks/useWeather';
import { useTranslation } from '../../hooks/useTranslation';

export default function WeatherDisplay() {
  const { weather, loading, error } = useWeather();
  const { t, dir } = useTranslation();

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-lg" dir={dir}>
        <Loader className="animate-spin icon-md" />
        <span>{t('loadingWeather')}</span>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="flex items-center gap-2 text-gray-500 text-lg" dir={dir}>
        <Cloud className="icon-md" />
        <span>{t('weatherUnavailable')}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 text-gray-600" dir={dir}>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        className="w-12 h-12"
      />
      <div>
        <div className="text-lg font-medium">{weather.city}</div>
        <div className="text-2xl font-bold">
          {weather.temp}°C
          <span className="text-lg font-normal mx-2 capitalize">
            {weather.description}
          </span>
        </div>
      </div>
    </div>
  );
}