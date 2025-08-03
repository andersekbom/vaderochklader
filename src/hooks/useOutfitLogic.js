/**
 * useOutfitLogic Hook
 * 
 * Provides outfit selection logic and management functionality.
 * Handles both default and custom clothing items, outfit evaluation,
 * suggestions based on weather, and avatar reactions.
 * 
 * @returns {Object} Outfit logic functions and state
 */

import { useCallback, useEffect, useState } from 'react';
import { useWeatherOutfit } from '../context/WeatherOutfitContext';
import { useWeather } from './useWeather';
import { useLanguage } from '../context/LanguageContext';
import { 
  suggestOutfitForWeather, 
  evaluateCompleteOutfit, 
  evaluateOutfitChoice,
  OutfitItems 
} from '../utils/outfitMatcher';
import { getCustomClothingItems } from '../utils/customClothingManager';

export function useOutfitLogic() {
  const { state, actions } = useWeatherOutfit();
  const { weather } = useWeather();
  const { getReactionMessage, t } = useLanguage();
  const [customItems, setCustomItems] = useState({});
  
  // Load custom items on mount
  useEffect(() => {
    loadCustomItems();
  }, []);
  
  const loadCustomItems = async () => {
    try {
      const items = await getCustomClothingItems();
      setCustomItems(items);
    } catch (error) {
      console.error('Error loading custom clothing items:', error);
    }
  };

  /**
   * Updates a single outfit item and evaluates the choice
   * @param {string} bodyPart - The body part to update (head, torso, legs, feet)
   * @param {Object|null} item - The clothing item to set, or null to clear
   */
  const updateOutfitItem = useCallback((bodyPart, item) => {
    actions.updateOutfit({ [bodyPart]: item });
    
    // Evaluate the new outfit choice
    if (weather.condition && weather.temperature !== null) {
      const evaluation = evaluateOutfitChoice(item, weather.condition, weather.temperature);
      
      // Set avatar reaction based on the evaluation
      let reactionType = 'good';
      if (evaluation.rating === 'perfect') reactionType = 'happy';
      else if (evaluation.rating === 'poor') {
        if (item?.id === 'sandals' && weather.condition === 'rainy') reactionType = 'wet';
        else if (weather.temperature < 10) reactionType = 'cold';
        else if (weather.temperature > 25 && item?.id === 'winter_coat') reactionType = 'hot';
        else reactionType = 'sad';
      }
      else if (evaluation.rating === 'warning') reactionType = 'warning';
      
      // Use the translated reaction message
      const message = getReactionMessage(evaluation.rating);
      actions.setAvatarReaction(reactionType, message);
    }
  }, [state.outfit, actions, weather.condition, weather.temperature, getReactionMessage]);

  /**
   * Generates outfit suggestions based on current weather
   * @returns {Object|null} Suggested outfit items or null if no weather data
   */
  const suggestOutfit = useCallback(() => {
    if (!weather.condition || weather.temperature === null) {
      return null;
    }
    
    const suggestions = suggestOutfitForWeather(weather.condition, weather.temperature);
    
    return suggestions;
  }, [weather.condition, weather.temperature]);

  /**
   * Applies weather-based outfit suggestions to the current outfit
   */
  const applySuggestedOutfit = useCallback(() => {
    const suggestions = suggestOutfit();
    if (suggestions) {
      actions.updateOutfit(suggestions);
      actions.setAvatarReaction('happy', getReactionMessage('perfect'));
    }
  }, [suggestOutfit, actions, getReactionMessage]);

  const evaluateCurrentOutfit = useCallback(() => {
    if (!weather.condition || weather.temperature === null) {
      return null;
    }
    
    return evaluateCompleteOutfit(state.outfit, weather.condition, weather.temperature);
  }, [state.outfit, weather.condition, weather.temperature]);

  const clearOutfit = useCallback(() => {
    actions.updateOutfit({
      head: null,
      torso: null,
      legs: null,
      feet: null,
      accessories: [],
    });
    actions.clearAvatarReaction();
  }, [actions]);

  /**
   * Gets all available clothing items for a specific body part
   * Combines default items with custom user-uploaded items
   * @param {string} bodyPart - The body part to get items for
   * @returns {Object} Combined object of available items
   */
  const getAvailableItems = useCallback((bodyPart) => {
    const defaultItems = OutfitItems[bodyPart] || {};
    const customBodyPartItems = customItems[bodyPart] || {};
    
    // Add translated names to default items
    const translatedDefaultItems = {};
    Object.entries(defaultItems).forEach(([key, item]) => {
      translatedDefaultItems[key] = {
        ...item,
        name: item.nameKey ? t(item.nameKey) : item.name || key
      };
    });
    
    // Combine default and custom items
    return { ...translatedDefaultItems, ...customBodyPartItems };
  }, [customItems, t]);

  const getOutfitSummary = useCallback(() => {
    const { outfit } = state;
    const wornItems = [];
    
    Object.keys(outfit).forEach(bodyPart => {
      if (outfit[bodyPart] && outfit[bodyPart].name) {
        wornItems.push(outfit[bodyPart].name);
      }
    });
    
    return wornItems.length > 0 ? wornItems.join(', ') : t('noItemsAvailable');
  }, [state.outfit]);

  // Auto-suggest outfit when weather data becomes available
  useEffect(() => {
    if (weather.condition && weather.temperature !== null) {
      // Only auto-suggest if no outfit is currently selected
      const hasOutfit = Object.values(state.outfit).some(item => item !== null);
      if (!hasOutfit) {
        const suggestions = suggestOutfit();
        if (suggestions) {
          actions.updateOutfit(suggestions);
        }
      }
    }
  }, [weather.condition, weather.temperature, state.outfit, suggestOutfit, actions]);

  return {
    outfit: state.outfit,
    avatarReaction: state.avatar,
    updateOutfitItem,
    suggestOutfit,
    applySuggestedOutfit,
    evaluateCurrentOutfit,
    clearOutfit,
    getAvailableItems,
    getOutfitSummary,
    loadCustomItems,
    hasWeatherData: !!(weather.condition && weather.temperature !== null),
  };
}

export default useOutfitLogic;