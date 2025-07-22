export const OutfitItems = {
  head: {
    cap: { id: 'cap', name: 'Keps', emoji: '🧢', icon: { name: 'hat-cap', library: 'MaterialCommunityIcons', color: '#2196F3' }, weather: ['sunny'], temperature: [15, 35] },
    beanie: { id: 'beanie', name: 'Mössa', emoji: '🧤', icon: { name: 'winter-hat', library: 'MaterialCommunityIcons', color: '#607D8B' }, weather: ['cloudy', 'snowy'], temperature: [-10, 10] },
    hood: { id: 'hood', name: 'Luva', emoji: '🩴', icon: { name: 'hoodie', library: 'MaterialCommunityIcons', color: '#795548' }, weather: ['rainy', 'stormy'], temperature: [0, 20] },
    none: { id: 'none', name: 'Ingen huvudbonad', emoji: '🚫', icon: { name: 'cancel', library: 'MaterialCommunityIcons', color: '#9E9E9E' }, weather: ['sunny', 'cloudy'], temperature: [20, 35] },
  },
  
  torso: {
    t_shirt: { id: 't_shirt', name: 'T-shirt', emoji: '👕', icon: { name: 'tshirt-crew-outline', library: 'MaterialCommunityIcons', color: '#4CAF50' }, weather: ['sunny'], temperature: [20, 35] },
    long_sleeve: { id: 'long_sleeve', name: 'Långärmad', emoji: '👔', icon: { name: 'tshirt-v-outline', library: 'MaterialCommunityIcons', color: '#FF9800' }, weather: ['cloudy', 'sunny'], temperature: [15, 25] },
    sweater: { id: 'sweater', name: 'Tjöja', emoji: '🧥', icon: { name: 'sweater-outline', library: 'MaterialCommunityIcons', color: '#9C27B0' }, weather: ['cloudy', 'rainy'], temperature: [5, 15] },
    jacket: { id: 'jacket', name: 'Jacka', emoji: '🧥', icon: { name: 'coat-rack', library: 'MaterialCommunityIcons', color: '#3F51B5' }, weather: ['rainy', 'stormy', 'snowy'], temperature: [-5, 15] },
    rain_coat: { id: 'rain_coat', name: 'Regnjacka', emoji: '🌧️', icon: { name: 'umbrella', library: 'MaterialCommunityIcons', color: '#2196F3' }, weather: ['rainy', 'stormy'], temperature: [5, 20] },
    winter_coat: { id: 'winter_coat', name: 'Vinterjacka', emoji: '🧥', icon: { name: 'coat-rack', library: 'MaterialCommunityIcons', color: '#607D8B' }, weather: ['snowy'], temperature: [-20, 5] },
  },
  
  legs: {
    shorts: { id: 'shorts', name: 'Shorts', emoji: '🩳', icon: { name: 'human-male', library: 'MaterialCommunityIcons', color: '#FF5722' }, weather: ['sunny'], temperature: [20, 35] },
    pants: { id: 'pants', name: 'Byxor', emoji: '👖', icon: { name: 'human-male-boy', library: 'MaterialCommunityIcons', color: '#795548' }, weather: ['cloudy', 'rainy', 'sunny'], temperature: [10, 25] },
    jeans: { id: 'jeans', name: 'Jeans', emoji: '👖', icon: { name: 'human-male-boy', library: 'MaterialCommunityIcons', color: '#3F51B5' }, weather: ['cloudy', 'rainy'], temperature: [5, 20] },
    warm_pants: { id: 'warm_pants', name: 'Varma byxor', emoji: '👖', icon: { name: 'human-male-boy', library: 'MaterialCommunityIcons', color: '#607D8B' }, weather: ['snowy', 'stormy'], temperature: [-10, 10] },
  },
  
  feet: {
    sandals: { id: 'sandals', name: 'Sandals', emoji: '🩴', icon: { name: 'shoe-heel', library: 'MaterialCommunityIcons', color: '#FF9800' }, weather: ['sunny'], temperature: [22, 35] },
    sneakers: { id: 'sneakers', name: 'Sneakers', emoji: '👟', icon: { name: 'shoe-sneaker', library: 'MaterialCommunityIcons', color: '#4CAF50' }, weather: ['sunny', 'cloudy'], temperature: [15, 30] },
    shoes: { id: 'shoes', name: 'Shoes', emoji: '👞', icon: { name: 'shoe-formal', library: 'MaterialCommunityIcons', color: '#795548' }, weather: ['cloudy', 'rainy'], temperature: [10, 25] },
    rain_boots: { id: 'rain_boots', name: 'Rain Boots', emoji: '🥾', icon: { name: 'boot', library: 'MaterialCommunityIcons', color: '#2196F3' }, weather: ['rainy', 'stormy'], temperature: [5, 20] },
    winter_boots: { id: 'winter_boots', name: 'Winter Boots', emoji: '🥾', icon: { name: 'snowshoe', library: 'MaterialCommunityIcons', color: '#607D8B' }, weather: ['snowy'], temperature: [-20, 5] },
  },
};

export const OutfitReactions = {
  perfect: [
    "Perfect choice! You'll be comfortable outside!",
    "Great outfit for this weather!",
    "You're all set for today's weather!",
    "That's exactly what I would choose!",
  ],
  
  good: [
    "That's a good choice!",
    "Nice outfit selection!",
    "You'll be comfortable in that!",
  ],
  
  warning: [
    "Hmm, that might not be the best choice...",
    "Are you sure about that outfit?",
    "That might be a bit uncomfortable...",
  ],
  
  poor: [
    "Oops! Your feet might get wet with those sandals in the rain!",
    "Brrr! You might get cold without a jacket!",
    "You might get too hot in that winter coat on a sunny day!",
    "Those shorts might not keep you warm enough!",
  ],
};

function getRandomMessage(messageArray) {
  return messageArray[Math.floor(Math.random() * messageArray.length)];
}

export function suggestOutfitForWeather(condition, temperature, timeOfDay = 'day') {
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
    suggestions.head = OutfitItems.head.none;
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
      message = "Oops! Your feet might get wet with those sandals in the rain!";
    } else if (condition === 'snowy' && ['sandals', 't_shirt', 'shorts'].includes(outfitItem.id)) {
      message = "Brrr! You might get cold with that choice in the snow!";
    } else if (temperature > 25 && outfitItem.id === 'winter_coat') {
      message = "You might get too hot in that winter coat on such a warm day!";
    }
  }

  return { rating, message, reasons };
}

export function evaluateCompleteOutfit(outfit, condition, temperature) {
  const evaluations = {};
  let overallRating = 'perfect';
  const messages = [];

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