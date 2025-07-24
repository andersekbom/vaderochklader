/**
 * OutfitIcon Component
 * 
 * Reusable component for rendering outfit items consistently across the app.
 * Handles custom images, emojis, vector icons, and fallback states.
 */

import React, { useState } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';
import { renderOutfitItemVisual } from '../utils/iconUtils';

/**
 * OutfitIcon - Renders an outfit item in a touchable button
 * 
 * @param {Object} props - Component props
 * @param {Object} props.outfitItem - The selected outfit item (null if none selected)
 * @param {string} props.fallbackEmoji - Emoji to show when no item is selected
 * @param {number} props.size - Size for the visual element
 * @param {Object} props.buttonStyle - Style for the touchable button
 * @param {Object} props.imageStyle - Style for custom images
 * @param {Object} props.textStyle - Style for emoji text
 * @param {Function} props.onPress - Callback when button is pressed
 * @param {boolean} props.disabled - Whether the button is disabled
 * @returns {JSX.Element} Rendered outfit icon button
 */
const OutfitIcon = ({
  outfitItem,
  fallbackEmoji,
  size,
  buttonStyle,
  imageStyle,
  textStyle,
  onPress,
  disabled = false,
  ...touchableProps
}) => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    // Light haptic feedback on press
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  };

  const handlePress = () => {
    // Success haptic feedback
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    
    // Add success animation
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.05,
        useNativeDriver: true,
        speed: 25,
        bounciness: 8,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 25,
        bounciness: 8,
      })
    ]).start();
    
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      activeOpacity={0.8}
      {...touchableProps}
    >
      <Animated.View
        style={[
          buttonStyle,
          {
            transform: [{ scale: scaleValue }],
          },
        ]}
      >
        {renderOutfitItemVisual(
          outfitItem,
          fallbackEmoji,
          size,
          imageStyle,
          textStyle
        )}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default OutfitIcon;