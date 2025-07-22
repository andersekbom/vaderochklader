import { useEffect, useCallback } from 'react';
import { useWeatherOutfit } from '../context/WeatherOutfitContext';
import { useLocation } from './useLocation';
import { fetchWeatherData } from '../services/weatherApi';

export function useWeather() {
  const { state, actions } = useWeatherOutfit();
  const { location, hasLocation, getCurrentLocation } = useLocation();

  const fetchWeather = useCallback(async (latitude, longitude) => {
    try {
      actions.setWeatherLoading();
      
      const weatherData = await fetchWeatherData(latitude, longitude);
      actions.setWeatherSuccess(weatherData);
      
      return weatherData;
    } catch (error) {
      console.error('Error fetching weather:', error);
      actions.setWeatherError(error.message);
      return null;
    }
  }, [actions]);

  const refetchWeather = useCallback(async () => {
    if (hasLocation) {
      return fetchWeather(location.latitude, location.longitude);
    }
    
    // If we don't have location, try to get it first
    const locationData = await getCurrentLocation();
    
    if (locationData) {
      return fetchWeather(locationData.latitude, locationData.longitude);
    }
    
    return null;
  }, [fetchWeather, hasLocation, location.latitude, location.longitude, getCurrentLocation]);

  useEffect(() => {
    if (hasLocation && !state.weather.condition && !state.weather.loading) {
      fetchWeather(location.latitude, location.longitude);
    }
  }, [hasLocation, location.latitude, location.longitude, fetchWeather, state.weather.condition, state.weather.loading]);

  const getCurrentTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 22) return 'evening';
    return 'night';
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  const isWeatherSuitable = (outfitType) => {
    const { condition, temperature } = state.weather;
    
    if (!condition || temperature === null) return true;

    switch (outfitType) {
      case 'light':
        return condition === 'sunny' && temperature > 20;
      case 'medium':
        return (condition === 'cloudy' || condition === 'sunny') && temperature > 10;
      case 'warm':
        return temperature < 15;
      case 'rain_gear':
        return condition === 'rainy';
      case 'snow_gear':
        return condition === 'snowy';
      default:
        return true;
    }
  };

  const getForecastText = () => {
    const { condition, forecast4h } = state.weather;
    
    if (!condition || !forecast4h) {
      return null;
    }

    const currentWeatherText = {
      sunny: "Det är soligt ute",
      cloudy: "Det är molnigt ute",
      rainy: "Det regnar ute",
      snowy: "Det snöar ute",
      stormy: "Det är en storm ute"
    }[condition] || "Vädret är fint ute";

    const futureWeatherText = {
      sunny: "det kommer att vara soligt senare",
      cloudy: "det kommer att vara molnigt senare",
      rainy: "det kommer troligen att regna lite senare",
      snowy: "det kan snöa senare",
      stormy: "det kan bli en storm senare"
    }[forecast4h.condition] || "vädret kommer att förbli fint senare";

    if (condition === forecast4h.condition) {
      return `${currentWeatherText}, och det kommer att förbli detsamma senare.`;
    }

    return `${currentWeatherText}, och ${futureWeatherText}.`;
  };

  return {
    weather: state.weather,
    fetchWeather,
    refetchWeather,
    isLoading: state.weather.loading,
    error: state.weather.error,
    hasWeatherData: !!(state.weather.condition && state.weather.temperature !== null),
    getCurrentTimeOfDay,
    getCurrentSeason,
    isWeatherSuitable,
    getForecastText,
  };
}

export default useWeather;