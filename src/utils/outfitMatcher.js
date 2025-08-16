/**
 * Outfit Matcher Utility
 * 
 * Provides clothing item data and logic for matching outfits to weather conditions.
 * Includes outfit suggestions, evaluation, and feedback messages using the i18n system.
 */

/**
 * Default clothing items organized by body part
 * Each item includes display info, weather suitability, and temperature ranges
 */
export const OutfitItems = {
  head: {
    cap: { id: 'cap', nameKey: 'cap', emoji: '🧢', icon: { name: 'hat-cap', library: 'MaterialCommunityIcons', color: '#2196F3' }, weather: ['sunny'], temperature: [15, 35] },
    beanie: { id: 'beanie', nameKey: 'beanie', emoji: '🧶', icon: { name: 'hat-winter', library: 'MaterialCommunityIcons', color: '#607D8B' }, weather: ['cloudy', 'snowy'], temperature: [-10, 10] },
    hood: { id: 'hood', nameKey: 'hood', emoji: '🧥', icon: { name: 'hoodie', library: 'MaterialCommunityIcons', color: '#795548' }, weather: ['rainy', 'stormy'], temperature: [0, 20] },
  },
  
  torso: {
    t_shirt: { id: 't_shirt', nameKey: 'tShirt', emoji: '👕', icon: { name: 'tshirt-crew-outline', library: 'MaterialCommunityIcons', color: '#4CAF50' }, weather: ['sunny'], temperature: [20, 35] },
    long_sleeve: { id: 'long_sleeve', nameKey: 'longSleeve', emoji: '👕', icon: { name: 'tshirt-crew-outline', library: 'MaterialCommunityIcons', color: '#FF9800' }, weather: ['cloudy', 'sunny'], temperature: [15, 25] },
    sweater: { id: 'sweater', nameKey: 'sweater', emoji: '🧥', icon: { name: 'sweater-outline', library: 'MaterialCommunityIcons', color: '#9C27B0' }, weather: ['cloudy', 'rainy'], temperature: [5, 15] },
    jacket: { id: 'jacket', nameKey: 'jacket', emoji: '🧥', icon: { name: 'jacket', library: 'MaterialCommunityIcons', color: '#3F51B5' }, weather: ['rainy', 'stormy', 'snowy'], temperature: [-5, 15] },
    rain_coat: { id: 'rain_coat', nameKey: 'rainCoat', emoji: '🧥', icon: { name: 'raincoat', library: 'MaterialCommunityIcons', color: '#2196F3' }, weather: ['rainy', 'stormy'], temperature: [5, 20] },
    winter_coat: { id: 'winter_coat', nameKey: 'winterCoat', emoji: '🧥', icon: { name: 'coat', library: 'MaterialCommunityIcons', color: '#607D8B' }, weather: ['snowy'], temperature: [-20, 5] },
  },
  
  legs: {
    shorts: { id: 'shorts', nameKey: 'shorts', emoji: '🩳', icon: { name: 'shorts', library: 'MaterialCommunityIcons', color: '#FF5722' }, weather: ['sunny'], temperature: [20, 35] },
    pants: { id: 'pants', nameKey: 'pants', emoji: '👖', icon: { name: 'human-male-boy', library: 'MaterialCommunityIcons', color: '#795548' }, weather: ['cloudy', 'rainy', 'sunny'], temperature: [10, 25] },
    jeans: { id: 'jeans', nameKey: 'jeans', emoji: '👖', icon: { name: 'human-male-boy', library: 'MaterialCommunityIcons', color: '#3F51B5' }, weather: ['cloudy', 'rainy'], temperature: [5, 20] },
    warm_pants: { id: 'warm_pants', nameKey: 'warmPants', emoji: '👖', icon: { name: 'human-male-boy', library: 'MaterialCommunityIcons', color: '#607D8B' }, weather: ['snowy', 'stormy'], temperature: [-10, 10] },
  },
  
  feet: {
    sandals: { id: 'sandals', nameKey: 'sandals', emoji: '🩴', icon: { name: 'flip-flops', library: 'MaterialCommunityIcons', color: '#FF9800' }, weather: ['sunny'], temperature: [22, 35] },
    sneakers: { id: 'sneakers', nameKey: 'sneakers', emoji: '👟', icon: { name: 'shoe-sneaker', library: 'MaterialCommunityIcons', color: '#4CAF50' }, weather: ['sunny', 'cloudy'], temperature: [15, 30] },
    shoes: { id: 'shoes', nameKey: 'shoes', emoji: '👞', icon: { name: 'shoe-formal', library: 'MaterialCommunityIcons', color: '#795548' }, weather: ['cloudy', 'rainy'], temperature: [10, 25] },
    rain_boots: { id: 'rain_boots', nameKey: 'rainBoots', emoji: '🥾', icon: { name: 'boot', library: 'MaterialCommunityIcons', color: '#2196F3' }, weather: ['rainy', 'stormy'], temperature: [5, 20] },
    winter_boots: { id: 'winter_boots', nameKey: 'winterBoots', emoji: '🥾', icon: { name: 'snowshoe', library: 'MaterialCommunityIcons', color: '#607D8B' }, weather: ['snowy'], temperature: [-20, 5] },
  },
};

/**
 * Evaluates a single outfit item choice for weather appropriateness
 * @param {Object} outfitItem - The clothing item to evaluate
 * @param {string} condition - Current weather condition
 * @param {number} temperature - Current temperature in Celsius
 * @returns {Object} Evaluation with rating, message, and reasons
 */
export function evaluateOutfitChoice(outfitItem, condition, temperature) {
  if (!outfitItem) {
    return { rating: 'good', message: null, reasons: [] };
  }

  let rating = 'good';
  const reasons = [];

  // Get temperature range for this item
  const itemTempRange = outfitItem.temperature;

  // Check weather condition appropriateness
  if (outfitItem.weather && !outfitItem.weather.includes(condition)) {
    if ((condition === 'rainy' && outfitItem.id === 'sandals') ||
        (condition === 'snowy' && outfitItem.id === 'sandals') ||
        (condition === 'rainy' && outfitItem.id === 't_shirt')) {
      rating = 'poor';
      reasons.push(`not suitable for ${condition} weather`);
    } else {
      rating = 'warning';
      reasons.push(`might not be ideal for ${condition} weather`);
    }
  }

  // Check temperature appropriateness
  if (itemTempRange && (temperature < itemTempRange[0] || temperature > itemTempRange[1])) {
    if (temperature < itemTempRange[0] - 10 || temperature > itemTempRange[1] + 10) {
      rating = 'poor';
      reasons.push(`temperature is too ${temperature < itemTempRange[0] ? 'cold' : 'hot'}`);
    } else {
      if (rating === 'good') rating = 'warning';
      reasons.push(`temperature might be uncomfortable`);
    }
  }

  // If no issues, it's perfect
  if (reasons.length === 0) {
    rating = 'perfect';
  }

  // Return rating and reasons - the actual message will be handled by the translation system
  // in the useOutfitLogic hook using getReactionMessage()
  return { rating, message: null, reasons };
}

/**
 * Suggests appropriate clothing items based on weather conditions
 * @param {string} condition - Weather condition (sunny, cloudy, rainy, snowy, stormy)
 * @param {number} temperature - Temperature in Celsius
 * @param {string} timeOfDay - Time of day (currently unused, defaults to 'day')
 * @returns {Object} Suggested outfit with items for each body part
 */
export function suggestOutfitForWeather(condition, temperature) {
  const suggestions = {
    head: null,
    torso: null,
    legs: null,
    feet: null,
  };

  // Head suggestions
  if (temperature < 10) {
    suggestions.head = OutfitItems.head.beanie;
  } else if (condition === 'rainy' || condition === 'stormy') {
    suggestions.head = OutfitItems.head.hood;
  } else if (condition === 'sunny' && temperature > 20) {
    suggestions.head = OutfitItems.head.cap;
  } else {
    suggestions.head = null; // No head covering needed
  }

  // Torso suggestions
  if (condition === 'rainy' || condition === 'stormy') {
    suggestions.torso = OutfitItems.torso.rain_coat;
  } else if (condition === 'snowy' || temperature < 0) {
    suggestions.torso = OutfitItems.torso.winter_coat;
  } else if (temperature < 15) {
    suggestions.torso = OutfitItems.torso.jacket;
  } else if (temperature < 20) {
    suggestions.torso = OutfitItems.torso.sweater;
  } else if (temperature < 25) {
    suggestions.torso = OutfitItems.torso.long_sleeve;
  } else {
    suggestions.torso = OutfitItems.torso.t_shirt;
  }

  // Legs suggestions
  if (temperature < 5) {
    suggestions.legs = OutfitItems.legs.warm_pants;
  } else if (temperature < 20 || condition === 'rainy') {
    suggestions.legs = OutfitItems.legs.jeans;
  } else if (temperature < 22) {
    suggestions.legs = OutfitItems.legs.pants;
  } else {
    suggestions.legs = OutfitItems.legs.shorts;
  }

  // Feet suggestions
  if (condition === 'snowy') {
    suggestions.feet = OutfitItems.feet.winter_boots;
  } else if (condition === 'rainy' || condition === 'stormy') {
    suggestions.feet = OutfitItems.feet.rain_boots;
  } else if (temperature > 25 && condition === 'sunny') {
    suggestions.feet = OutfitItems.feet.sandals;
  } else if (temperature > 15) {
    suggestions.feet = OutfitItems.feet.sneakers;
  } else {
    suggestions.feet = OutfitItems.feet.shoes;
  }

  return suggestions;
}

/**
 * Evaluates a complete outfit (all body parts) for weather appropriateness
 * @param {Object} outfit - Complete outfit object with items for each body part
 * @param {string} condition - Current weather condition
 * @param {number} temperature - Current temperature in Celsius
 * @returns {Object} Complete evaluation with overall and individual ratings
 */
export function evaluateCompleteOutfit(outfit, condition, temperature) {
  const evaluations = {};
  let overallRating = 'perfect';

  // Evaluate each piece
  Object.keys(outfit).forEach(bodyPart => {
    if (outfit[bodyPart]) {
      evaluations[bodyPart] = evaluateOutfitChoice(outfit[bodyPart], condition, temperature);
      
      // Determine overall rating (worst piece determines overall rating)
      const partRating = evaluations[bodyPart].rating;
      if (partRating === 'poor') overallRating = 'poor';
      else if (partRating === 'warning' && overallRating !== 'poor') overallRating = 'warning';
      else if (partRating === 'good' && overallRating === 'perfect') overallRating = 'good';
    }
  });

  // Return evaluations without messages - messages are handled by the translation system
  // in the useOutfitLogic hook using getReactionMessage()
  return {
    overall: { rating: overallRating, message: null },
    individual: evaluations,
  };
}

export default {
  OutfitItems,
  suggestOutfitForWeather,
  evaluateOutfitChoice,
  evaluateCompleteOutfit,
};