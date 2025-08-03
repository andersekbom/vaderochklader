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


  return {
    weather: state.weather,
    fetchWeather,
    refetchWeather,
    isLoading: state.weather.loading,
    error: state.weather.error,
    hasWeatherData: !!(state.weather.condition && state.weather.temperature !== null),
  };
}

export default useWeather;