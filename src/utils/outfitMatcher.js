/**
 * Outfit Matcher Utility
 * 
 * Provides clothing item data and logic for matching outfits to weather conditions.
 * Includes outfit suggestions, evaluation, and feedback messages in Swedish for
 * kindergarten children.
 */

/**
 * Default clothing items organized by body part
 * Each item includes display info, weather suitability, and temperature ranges
 */
export const OutfitItems = {
  head: {
    cap: { id: 'cap', name: 'Keps', emoji: '🧢', icon: { name: 'hat-cap', library: 'MaterialCommunityIcons', color: '#2196F3' }, weather: ['sunny'], temperature: [15, 35] },
    beanie: { id: 'beanie', name: 'Mössa', emoji: '🧶', icon: { name: 'hat-winter', library: 'MaterialCommunityIcons', color: '#607D8B' }, weather: ['cloudy', 'snowy'], temperature: [-10, 10] },
    hood: { id: 'hood', name: 'Luva', emoji: '🧥', icon: { name: 'hoodie', library: 'MaterialCommunityIcons', color: '#795548' }, weather: ['rainy', 'stormy'], temperature: [0, 20] },
  },
  
  torso: {
    t_shirt: { id: 't_shirt', name: 'T-shirt', emoji: '👕', icon: { name: 'tshirt-crew-outline', library: 'MaterialCommunityIcons', color: '#4CAF50' }, weather: ['sunny'], temperature: [20, 35] },
    long_sleeve: { id: 'long_sleeve', name: 'Långärmad', emoji: '👕', icon: { name: 'tshirt-crew-outline', library: 'MaterialCommunityIcons', color: '#FF9800' }, weather: ['cloudy', 'sunny'], temperature: [15, 25] },
    sweater: { id: 'sweater', name: 'Tjöja', emoji: '🧥', icon: { name: 'sweater-outline', library: 'MaterialCommunityIcons', color: '#9C27B0' }, weather: ['cloudy', 'rainy'], temperature: [5, 15] },
    jacket: { id: 'jacket', name: 'Jacka', emoji: '🧥', icon: { name: 'jacket', library: 'MaterialCommunityIcons', color: '#3F51B5' }, weather: ['rainy', 'stormy', 'snowy'], temperature: [-5, 15] },
    rain_coat: { id: 'rain_coat', name: 'Regnjacka', emoji: '🧥', icon: { name: 'raincoat', library: 'MaterialCommunityIcons', color: '#2196F3' }, weather: ['rainy', 'stormy'], temperature: [5, 20] },
    winter_coat: { id: 'winter_coat', name: 'Vinterjacka', emoji: '🧥', icon: { name: 'coat', library: 'MaterialCommunityIcons', color: '#607D8B' }, weather: ['snowy'], temperature: [-20, 5] },
  },
  
  legs: {
    shorts: { id: 'shorts', name: 'Shorts', emoji: '🩳', icon: { name: 'shorts', library: 'MaterialCommunityIcons', color: '#FF5722' }, weather: ['sunny'], temperature: [20, 35] },
    pants: { id: 'pants', name: 'Byxor', emoji: '👖', icon: { name: 'human-male-boy', library: 'MaterialCommunityIcons', color: '#795548' }, weather: ['cloudy', 'rainy', 'sunny'], temperature: [10, 25] },
    jeans: { id: 'jeans', name: 'Jeans', emoji: '👖', icon: { name: 'human-male-boy', library: 'MaterialCommunityIcons', color: '#3F51B5' }, weather: ['cloudy', 'rainy'], temperature: [5, 20] },
    warm_pants: { id: 'warm_pants', name: 'Varma byxor', emoji: '👖', icon: { name: 'human-male-boy', library: 'MaterialCommunityIcons', color: '#607D8B' }, weather: ['snowy', 'stormy'], temperature: [-10, 10] },
  },
  
  feet: {
    sandals: { id: 'sandals', name: 'Sandaler', emoji: '🩴', icon: { name: 'flip-flops', library: 'MaterialCommunityIcons', color: '#FF9800' }, weather: ['sunny'], temperature: [22, 35] },
    sneakers: { id: 'sneakers', name: 'Skor', emoji: '👟', icon: { name: 'shoe-sneaker', library: 'MaterialCommunityIcons', color: '#4CAF50' }, weather: ['sunny', 'cloudy'], temperature: [15, 30] },
    shoes: { id: 'shoes', name: 'Finskor', emoji: '👞', icon: { name: 'shoe-formal', library: 'MaterialCommunityIcons', color: '#795548' }, weather: ['cloudy', 'rainy'], temperature: [10, 25] },
    rain_boots: { id: 'rain_boots', name: 'Regnstövlar', emoji: '🥾', icon: { name: 'boot', library: 'MaterialCommunityIcons', color: '#2196F3' }, weather: ['rainy', 'stormy'], temperature: [5, 20] },
    winter_boots: { id: 'winter_boots', name: 'Vinterstövlar', emoji: '🥾', icon: { name: 'snowshoe', library: 'MaterialCommunityIcons', color: '#607D8B' }, weather: ['snowy'], temperature: [-20, 5] },
  },
};

/**
 * Feedback messages for outfit choices in Swedish
 * Organized by rating level for appropriate responses to children
 */
export const OutfitReactions = {
  perfect: [
    "Perfekt val! Du kommer att vara bekväm utomhus!",
    "Bra outfit för det här vädret!",
    "Du är helt redo för dagens väder!",
    "Det är precis vad jag skulle välja!",
  ],
  
  good: [
    "Det är ett bra val!",
    "Bra outfitval!",
    "Du kommer att vara bekväm i det!",
  ],
  
  warning: [
    "Hmm, det kanske inte är det bästa valet...",
    "Är du säker på den här outfiten?",
    "Det kan bli lite obekvämt...",
  ],
  
  poor: [
    "Oops! Dina fötter kan bli blöta med de sandalerna i regnet!",
    "Brrr! Du kan bli kall utan jacka!",
    "Du kan bli för varm i den vinterjackan en solig dag!",
    "De shortsen kanske inte håller dig tillräckligt varm!",
  ],
};

/**
 * Gets a random message from an array of messages
 * @param {Array<string>} messageArray - Array of possible messages
 * @returns {string} Random message from the array
 */
function getRandomMessage(messageArray) {
  return messageArray[Math.floor(Math.random() * messageArray.length)];
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
 * Evaluates how appropriate a single clothing item is for the weather
 * @param {Object|null} outfitItem - The clothing item to evaluate
 * @param {string} condition - Current weather condition
 * @param {number} temperature - Current temperature in Celsius
 * @returns {Object} Evaluation result with rating, message, and reasons
 */
export function evaluateOutfitChoice(outfitItem, condition, temperature) {
  if (!outfitItem) return { rating: 'good', message: getRandomMessage(OutfitReactions.good) };

  const { weather: itemWeather, temperature: itemTempRange } = outfitItem;
  
  let rating = 'good';
  let reasons = [];

  // Check weather appropriateness
  if (itemWeather && !itemWeather.includes(condition)) {
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

  const reactionMessages = OutfitReactions[rating];
  let message = getRandomMessage(reactionMessages);

  // Add specific feedback for poor choices
  if (rating === 'poor') {
    if (condition === 'rainy' && outfitItem.id === 'sandals') {
      message = "Oj, det blir kanske blött om fötterna med de sandalerna i regnet!";
    } else if (condition === 'snowy' && ['sandals', 't_shirt', 'shorts'].includes(outfitItem.id)) {
      message = "Brrr! Du kan bli kall med det valet i snön!";
    } else if (temperature > 25 && outfitItem.id === 'winter_coat') {
      message = "Du kan bli för varm i den vinterjackan en så varm dag!";
    }
  }

  return { rating, message, reasons };
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

  // Create overall message
  let overallMessage;
  switch (overallRating) {
    case 'perfect':
      overallMessage = getRandomMessage(OutfitReactions.perfect);
      break;
    case 'good':
      overallMessage = getRandomMessage(OutfitReactions.good);
      break;
    case 'warning':
      overallMessage = getRandomMessage(OutfitReactions.warning);
      break;
    case 'poor':
      overallMessage = getRandomMessage(OutfitReactions.poor);
      break;
    default:
      overallMessage = getRandomMessage(OutfitReactions.good);
  }

  return {
    overall: { rating: overallRating, message: overallMessage },
    individual: evaluations,
  };
}

export default {
  OutfitItems,
  suggestOutfitForWeather,
  evaluateOutfitChoice,
  evaluateCompleteOutfit,
};