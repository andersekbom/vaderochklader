/**
 * LanguageContext
 * 
 * Provides language selection and translation functionality.
 * Manages the current language and provides translation functions.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, reactionTranslationKeys } from '../translations';

// Default language
const DEFAULT_LANGUAGE = 'sv';
const LANGUAGE_STORAGE_KEY = 'app_language';

// Create context
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved language preference on mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLanguage) {
          setLanguage(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguage();
  }, []);

  // Change language and save preference
  const changeLanguage = async (newLanguage) => {
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
      setLanguage(newLanguage);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  // Get translation for a key with variable substitution
  const t = (key, variables = {}) => {
    let translation;
    if (!translations[language] || !translations[language][key]) {
      // Fallback to Swedish if translation is missing
      translation = translations.sv[key] || key;
    } else {
      translation = translations[language][key];
    }
    
    // Replace variables in the format {variableName}
    Object.keys(variables).forEach(varName => {
      const regex = new RegExp(`{${varName}}`, 'g');
      translation = translation.replace(regex, variables[varName]);
    });
    
    return translation;
  };

  // Get random reaction message based on reaction type
  const getReactionMessage = (reactionType) => {
    const keys = reactionTranslationKeys[reactionType];
    if (!keys || keys.length === 0) return '';
    
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    return t(randomKey);
  };

  // Get weather condition translation
  const getWeatherCondition = (condition) => {
    return t(condition);
  };

  const value = {
    language,
    changeLanguage,
    t,
    getReactionMessage,
    getWeatherCondition,
    isLoading,
    availableLanguages: ['sv', 'en', 'de', 'fi', 'se'],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;