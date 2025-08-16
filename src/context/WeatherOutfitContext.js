import React, { createContext, useContext, useReducer } from 'react';
import { useLanguage } from './LanguageContext';

const WeatherOutfitContext = createContext();

const initialState = {
  weather: {
    condition: null,
    temperature: null,
    location: null,
    forecast4h: null,
    loading: false,
    error: null,
  },
  outfit: {
    head: null,
    torso: null,
    legs: null,
    feet: null,
    accessories: [],
  },
  avatar: {
    reaction: null,
    message: null,
  },
  location: {
    latitude: null,
    longitude: null,
    loading: false,
    error: null,
  },
  ui: {
    currentScreen: 'home',
  },
};

const actionTypes = {
  SET_WEATHER_LOADING: 'SET_WEATHER_LOADING',
  SET_WEATHER_SUCCESS: 'SET_WEATHER_SUCCESS',
  SET_WEATHER_ERROR: 'SET_WEATHER_ERROR',
  SET_LOCATION_LOADING: 'SET_LOCATION_LOADING',
  SET_LOCATION_SUCCESS: 'SET_LOCATION_SUCCESS',
  SET_LOCATION_ERROR: 'SET_LOCATION_ERROR',
  UPDATE_OUTFIT: 'UPDATE_OUTFIT',
  SET_AVATAR_REACTION: 'SET_AVATAR_REACTION',
  CLEAR_AVATAR_REACTION: 'CLEAR_AVATAR_REACTION',
  SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN',
  RESET_STATE: 'RESET_STATE',
};

function weatherOutfitReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_WEATHER_LOADING:
      return {
        ...state,
        weather: {
          ...state.weather,
          loading: true,
          error: null,
        },
      };

    case actionTypes.SET_WEATHER_SUCCESS:
      return {
        ...state,
        weather: {
          ...state.weather,
          condition: action.payload.condition,
          temperature: action.payload.temperature,
          location: action.payload.location,
          forecast4h: action.payload.forecast4h,
          loading: false,
          error: null,
        },
      };

    case actionTypes.SET_WEATHER_ERROR:
      return {
        ...state,
        weather: {
          ...state.weather,
          loading: false,
          error: action.payload,
        },
      };

    case actionTypes.SET_LOCATION_LOADING:
      return {
        ...state,
        location: {
          ...state.location,
          loading: true,
          error: null,
        },
      };

    case actionTypes.SET_LOCATION_SUCCESS:
      return {
        ...state,
        location: {
          ...state.location,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          loading: false,
          error: null,
        },
      };

    case actionTypes.SET_LOCATION_ERROR:
      return {
        ...state,
        location: {
          ...state.location,
          loading: false,
          error: action.payload,
        },
      };

    case actionTypes.UPDATE_OUTFIT:
      return {
        ...state,
        outfit: {
          ...state.outfit,
          ...action.payload,
        },
      };

    case actionTypes.SET_AVATAR_REACTION:
      return {
        ...state,
        avatar: {
          ...state.avatar,
          reaction: action.payload.reaction,
          message: action.payload.message,
        },
      };

    case actionTypes.CLEAR_AVATAR_REACTION:
      return {
        ...state,
        avatar: {
          ...state.avatar,
          reaction: null,
          message: null,
        },
      };

    case actionTypes.SET_CURRENT_SCREEN:
      return {
        ...state,
        ui: {
          ...state.ui,
          currentScreen: action.payload,
        },
      };

    case actionTypes.RESET_STATE:
      return initialState;

    default:
      return state;
  }
}

export function WeatherOutfitProvider({ children }) {
  const [state, dispatch] = useReducer(weatherOutfitReducer, initialState);

  const actions = {
    setWeatherLoading: () => {
      dispatch({ type: actionTypes.SET_WEATHER_LOADING });
    },

    setWeatherSuccess: (weatherData) => {
      dispatch({ 
        type: actionTypes.SET_WEATHER_SUCCESS, 
        payload: weatherData 
      });
    },

    setWeatherError: (error) => {
      dispatch({ 
        type: actionTypes.SET_WEATHER_ERROR, 
        payload: error 
      });
    },

    setLocationLoading: () => {
      dispatch({ type: actionTypes.SET_LOCATION_LOADING });
    },

    setLocationSuccess: (locationData) => {
      dispatch({ 
        type: actionTypes.SET_LOCATION_SUCCESS, 
        payload: locationData 
      });
    },

    setLocationError: (error) => {
      dispatch({ 
        type: actionTypes.SET_LOCATION_ERROR, 
        payload: error 
      });
    },

    updateOutfit: (outfitChanges) => {
      dispatch({ 
        type: actionTypes.UPDATE_OUTFIT, 
        payload: outfitChanges 
      });
    },

    setAvatarReaction: (reaction, message) => {
      dispatch({ 
        type: actionTypes.SET_AVATAR_REACTION, 
        payload: { reaction, message } 
      });
    },

    clearAvatarReaction: () => {
      dispatch({ type: actionTypes.CLEAR_AVATAR_REACTION });
    },

    setCurrentScreen: (screen) => {
      dispatch({ 
        type: actionTypes.SET_CURRENT_SCREEN, 
        payload: screen 
      });
    },

    resetState: () => {
      dispatch({ type: actionTypes.RESET_STATE });
    },
  };

  const value = {
    state,
    actions,
  };

  return (
    <WeatherOutfitContext.Provider value={value}>
      {children}
    </WeatherOutfitContext.Provider>
  );
}

export function useWeatherOutfit() {
  const context = useContext(WeatherOutfitContext);
  if (context === undefined) {
    throw new Error('useWeatherOutfit must be used within a WeatherOutfitProvider');
  }
  return context;
}

export { actionTypes };
export default WeatherOutfitContext;