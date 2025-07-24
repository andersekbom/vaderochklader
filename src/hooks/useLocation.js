import { useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { useWeatherOutfit } from '../context/WeatherOutfitContext';

export function useLocation() {
  const { state, actions } = useWeatherOutfit();

  const requestLocationPermission = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Fel vid begäran av platsåtkomst:', error);
      return false;
    }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    try {
      actions.setLocationLoading();
      
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        throw new Error('Platsåtkomst nekad');
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
      console.error('Fel vid hämtning av aktuell plats:', error);
      actions.setLocationError(error.message);
      return null;
    }
  }, [actions, requestLocationPermission]);

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