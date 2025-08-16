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
        console.log('Loaded saved language from AsyncStorage:', savedLanguage);
        if (savedLanguage) {
          setLanguage(savedLanguage);
          console.log('Set language to:', savedLanguage);
        } else {
          console.log('No saved language found, using default:', DEFAULT_LANGUAGE);
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
      console.log('Changing language to:', newLanguage);
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, newLanguage);
      setLanguage(newLanguage);
      console.log('Language changed and saved to:', newLanguage);
      
      // Note: Avatar reaction will be cleared by the SettingsScreen
      // when it closes, so we don't need to do it here
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  // Get translation for a key with variable substitution
  const t = (key, variables = {}) => {
    console.log('Translation requested for key:', key, 'language:', language);
    let translation;
    if (!translations[language] || !translations[language][key]) {
      // Fallback to Swedish if translation is missing
      console.log('Translation not found for language:', language, 'falling back to Swedish');
      translation = translations.sv[key] || key;
    } else {
      console.log('Translation found for language:', language);
      translation = translations[language][key];
    }
    
    // Replace variables in the format {variableName}
    Object.keys(variables).forEach(varName => {
      const regex = new RegExp(`{${varName}}`, 'g');
      translation = translation.replace(regex, variables[varName]);
    });
    
    console.log('Final translation:', translation);
    return translation;
  };

  // Get random reaction message based on reaction type
  const getReactionMessage = (reactionType) => {
    console.log('getReactionMessage called with:', reactionType, 'current language:', language);
    const keys = reactionTranslationKeys[reactionType];
    if (!keys || keys.length === 0) return '';
    
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    console.log('Selected translation key:', randomKey, 'for language:', language);
    const translation = t(randomKey);
    console.log('Translation result:', translation);
    return translation;
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