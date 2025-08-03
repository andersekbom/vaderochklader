/**
 * Body parts configuration for outfit selection
 * Defines the display names, default emojis, and icons for each body part
 */

import Colors from './Colors';

/**
 * Body parts configuration object
 * Used throughout the app for consistent body part definitions
 */
export const BODY_PARTS = {
  head: { 
    name: 'Huvud', 
    emoji: '❓', 
    icon: { 
      name: 'face-man', 
      library: 'MaterialCommunityIcons', 
      color: Colors.primary 
    } 
  },
  torso: { 
    name: 'Kropp', 
    emoji: '❓', 
    icon: { 
      name: 'tshirt-crew', 
      library: 'MaterialCommunityIcons', 
      color: Colors.primary 
    } 
  },
  legs: { 
    name: 'Ben', 
    emoji: '❓', 
    icon: { 
      name: 'human-male-boy', 
      library: 'MaterialCommunityIcons', 
      color: Colors.primary 
    } 
  },
  feet: { 
    name: 'Fötter', 
    emoji: '❓', 
    icon: { 
      name: 'shoe-sneaker', 
      library: 'MaterialCommunityIcons', 
      color: Colors.primary 
    } 
  },
};

