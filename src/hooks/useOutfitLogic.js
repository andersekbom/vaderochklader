import { useCallback, useEffect, useState } from 'react';
import { useWeatherOutfit } from '../context/WeatherOutfitContext';
import { useWeather } from './useWeather';
import { 
  suggestOutfitForWeather, 
  evaluateCompleteOutfit, 
  evaluateOutfitChoice,
  OutfitItems 
} from '../utils/outfitMatcher';
import { getCustomClothingItems } from '../utils/customClothingManager';

export function useOutfitLogic() {
  const { state, actions } = useWeatherOutfit();
  const { weather, getCurrentTimeOfDay } = useWeather();
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
      console.error('Fel vid laddning av anpassade klädesplagg:', error);
    }
  };

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
      
      actions.setAvatarReaction(reactionType, evaluation.message);
    }
  }, [state.outfit, actions, weather.condition, weather.temperature]);

  const suggestOutfit = useCallback(() => {
    if (!weather.condition || weather.temperature === null) {
      return null;
    }
    
    const timeOfDay = getCurrentTimeOfDay();
    const suggestions = suggestOutfitForWeather(weather.condition, weather.temperature, timeOfDay);
    
    return suggestions;
  }, [weather.condition, weather.temperature, getCurrentTimeOfDay]);

  const applySuggestedOutfit = useCallback(() => {
    const suggestions = suggestOutfit();
    if (suggestions) {
      actions.updateOutfit(suggestions);
      actions.setAvatarReaction('happy', 'Perfekt! Den här outfiten är fantastisk för dagens väder!');
    }
  }, [suggestOutfit, actions]);

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

  const getAvailableItems = useCallback((bodyPart) => {
    const defaultItems = OutfitItems[bodyPart] || {};
    const customBodyPartItems = customItems[bodyPart] || {};
    
    // Combine default and custom items
    return { ...defaultItems, ...customBodyPartItems };
  }, [customItems]);

  const getOutfitSummary = useCallback(() => {
    const { outfit } = state;
    const wornItems = [];
    
    Object.keys(outfit).forEach(bodyPart => {
      if (outfit[bodyPart] && outfit[bodyPart].name) {
        wornItems.push(outfit[bodyPart].name);
      }
    });
    
    return wornItems.length > 0 ? wornItems.join(', ') : 'Inga kläder valda';
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