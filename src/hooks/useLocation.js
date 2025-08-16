import { useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { useWeatherOutfit } from '../context/WeatherOutfitContext';
import { useLanguage } from '../context/LanguageContext';

export function useLocation() {
  const { state, actions } = useWeatherOutfit();
  const { t } = useLanguage();

  const requestLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    try {
      actions.setLocationLoading();
      
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        throw new Error(t('locationAccessDenied'));
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 60000, // Cache location for 1 minute
        timeout: 15000,    // 15 second timeout
      });

      const locationData = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      actions.setLocationSuccess(locationData);
      return locationData;
    } catch (error) {
      console.error('Error getting current location:', error);
      actions.setLocationError(error.message);
      return null;
    }
  }, [actions, requestLocationPermission, t]);

  useEffect(() => {
    if (!state.location.latitude && !state.location.loading) {
      getCurrentLocation();
    }
  }, [getCurrentLocation, state.location.latitude, state.location.loading]);

  return {
    location: state.location,
    getCurrentLocation,
    requestLocationPermission,
    isLoading: state.location.loading,
    error: state.location.error,
    hasLocation: !!(state.location.latitude && state.location.longitude),
  };
}

export default useLocation;