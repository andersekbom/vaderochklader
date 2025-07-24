/**
 * Icon utilities for consistent icon rendering across the app
 * Handles both MaterialCommunityIcons and Ionicons with fallbacks
 */

import React from 'react';
import { Text, Image } from 'react-native';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

/**
 * Gets the appropriate icon component based on library specification
 * @param {Object} iconData - Icon configuration object
 * @param {string} iconData.library - Library name ('Ionicons' or 'MaterialCommunityIcons')
 * @returns {Component} The appropriate icon component
 */
export const getIconComponent = (iconData) => {
  return iconData?.library === 'Ionicons' ? Ionicons : MaterialCommunityIcons;
};

/**
 * Renders an icon component with the provided configuration
 * @param {Object} iconData - Icon configuration object
 * @param {string} iconData.name - Icon name
 * @param {string} iconData.library - Library name
 * @param {string} iconData.color - Icon color
 * @param {number} size - Icon size
 * @param {string} color - Override color (optional)
 * @param {Object} style - Additional styles (optional)
 * @returns {JSX.Element|null} Rendered icon component or null if no iconData
 */
export const renderIcon = (iconData, size, color, style) => {
  if (!iconData) return null;
  
  const IconComponent = getIconComponent(iconData);
  return (
    <IconComponent
      name={iconData.name}
      size={size}
      color={color || iconData.color}
      style={style}
    />
  );
};

/**
 * Renders an outfit item's visual representation (custom image, emoji, or icon)
 * @param {Object} outfitItem - The outfit item to render
 * @param {string} fallbackEmoji - Emoji to show if no item selected
 * @param {number} size - Size for the visual element
 * @param {Object} imageStyle - Style for custom images
 * @param {Object} textStyle - Style for emoji text
 * @returns {JSX.Element} Rendered visual element
 */
export const renderOutfitItemVisual = (outfitItem, fallbackEmoji, size, imageStyle, textStyle) => {
  // No item selected - show fallback
  if (!outfitItem) {
    return (
      <Text style={[textStyle, { fontSize: size }]}>
        {fallbackEmoji}
      </Text>
    );
  }

  // Custom image
  if (outfitItem.isCustom && outfitItem.imageUri) {
    return (
      <Image 
        source={{ uri: outfitItem.imageUri }} 
        style={[imageStyle, { width: size, height: size }]}
        resizeMode="cover"
      />
    );
  }

  // Emoji
  if (outfitItem.emoji) {
    return (
      <Text style={[textStyle, { fontSize: size }]}>
        {outfitItem.emoji}
      </Text>
    );
  }

  // Icon
  return renderIcon(outfitItem.icon, size);
};