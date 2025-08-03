import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import { useWeatherOutfit } from '../context/WeatherOutfitContext';

const Avatar = ({ size = 'large', style, showLabels = false, showOutfitItems = true, weather = null }) => {
  const { state } = useWeatherOutfit();
  const { outfit } = state;
  
  // Get screen dimensions for responsive avatar sizing
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const isSmallScreen = screenHeight < 700;
  const isMediumScreen = screenHeight < 800;
  
  const getAvatarSize = () => {
    const baseSize = isSmallScreen ? screenWidth * 0.10 : isMediumScreen ? screenWidth * 0.12 : screenWidth * 0.15;
    
    switch (size) {
      case 'small':
        return baseSize * 0.8;
      case 'medium':
        return baseSize;
      case 'large':
        return baseSize * 1.2;
      case 'huge':
        return baseSize * 1.5;
      default:
        return baseSize;
    }
  };

  const avatarSize = getAvatarSize();
  
  const renderOutfitLayer = (bodyPart, item) => {
    if (!item || (!item.emoji && !item.icon)) return null;
    
    const layerStyle = [
      styles.outfitLayer,
      {
        width: avatarSize,
        height: avatarSize,
      }
    ];

    return (
      <View key={bodyPart} style={layerStyle}>
        {item.emoji ? (
          <Text style={[styles.outfitIcon, { fontSize: avatarSize * 0.15 }]}>
            {item.emoji}
          </Text>
        ) : (() => {
          const iconData = item.icon;
          const IconComponent = iconData.library === 'Ionicons' ? Ionicons : MaterialCommunityIcons;
          return (
            <IconComponent
              name={iconData.name}
              size={avatarSize * 0.15}
              color={iconData.color}
              style={styles.outfitIcon}
            />
          );
        })()}
        {showLabels && (
          <Text style={styles.outfitLabel}>{item.name}</Text>
        )}
      </View>
    );
  };

  const getWeatherIcon = (weatherCondition, temperature) => {
    if (!weatherCondition) return { emoji: '☀️', backup: { name: 'weather-sunny', library: 'MaterialCommunityIcons', color: '#FFA726' } };
    
    switch (weatherCondition) {
      case 'sunny':
        return temperature > 25 
          ? { emoji: '😎☀️', backup: { name: 'weather-sunny', library: 'MaterialCommunityIcons', color: '#FF9800' } }
          : { emoji: '☀️', backup: { name: 'weather-sunny', library: 'MaterialCommunityIcons', color: '#FFC107' } };
      case 'cloudy':
        return { emoji: '☁️', backup: { name: 'weather-cloudy', library: 'MaterialCommunityIcons', color: '#90A4AE' } };
      case 'rainy':
        return { emoji: '🌧️', backup: { name: 'weather-rainy', library: 'MaterialCommunityIcons', color: '#42A5F5' } };
      case 'snowy':
        return { emoji: '❄️', backup: { name: 'weather-snowy', library: 'MaterialCommunityIcons', color: '#E1F5FE' } };
      case 'stormy':
        return { emoji: '⛈️', backup: { name: 'weather-lightning', library: 'MaterialCommunityIcons', color: '#7E57C2' } };
      default:
        return { emoji: '☀️', backup: { name: 'weather-sunny', library: 'MaterialCommunityIcons', color: '#FFC107' } };
    }
  };

  const getAvatarIcon = () => {
    // If weather data is provided, use weather-based icon
    if (weather && weather.condition) {
      return getWeatherIcon(weather.condition, weather.temperature);
    }
    
    // Fallback to outfit reaction if available
    if (state.avatar.reaction) {
      switch (state.avatar.reaction) {
        case 'happy':
        case 'perfect':
          return { emoji: '😊', backup: { name: 'emoticon-happy-outline', library: 'MaterialCommunityIcons', color: Colors.feedback.success } };
        case 'good':
          return { emoji: '🙂', backup: { name: 'emoticon-outline', library: 'MaterialCommunityIcons', color: Colors.primary } };
        case 'warning':
          return { emoji: '😐', backup: { name: 'emoticon-neutral-outline', library: 'MaterialCommunityIcons', color: Colors.feedback.warning } };
        case 'poor':
        case 'sad':
          return { emoji: '😟', backup: { name: 'emoticon-sad-outline', library: 'MaterialCommunityIcons', color: Colors.feedback.error } };
        case 'cold':
          return { emoji: '🥶', backup: { name: 'snowflake', library: 'MaterialCommunityIcons', color: Colors.weather.snowy } };
        case 'hot':
          return { emoji: '🥵', backup: { name: 'fire', library: 'MaterialCommunityIcons', color: Colors.feedback.error } };
        case 'wet':
          return { emoji: '💧', backup: { name: 'water', library: 'MaterialCommunityIcons', color: Colors.weather.rainy } };
        default:
          return { emoji: '😊', backup: { name: 'emoticon-happy-outline', library: 'MaterialCommunityIcons', color: Colors.primary } };
      }
    }
    return { emoji: '😊', backup: { name: 'emoticon-happy-outline', library: 'MaterialCommunityIcons', color: Colors.primary } };
  };

  return (
    <View style={[styles.container, style]}>
      {/* Avatar base */}
      <View style={[styles.avatarBase, { width: avatarSize, height: avatarSize }]}>
        {(() => {
          const iconData = getAvatarIcon();
          
          // Use emoji if available (more kid-friendly), otherwise use icon backup
          if (iconData.emoji) {
            return (
              <Text style={[styles.avatarFace, { fontSize: avatarSize * 0.5 }]}>
                {iconData.emoji}
              </Text>
            );
          } else {
            // Fallback to icon
            const IconComponent = iconData.library === 'Ionicons' ? Ionicons : MaterialCommunityIcons;
            return (
              <IconComponent
                name={iconData.name}
                size={avatarSize * 0.4}
                color={iconData.color}
              />
            );
          }
        })()}
      </View>
      
      {/* Outfit layers */}
      {showOutfitItems && (
        <View style={styles.outfitContainer}>
          {renderOutfitLayer('head', outfit.head)}
          {renderOutfitLayer('torso', outfit.torso)}
          {renderOutfitLayer('legs', outfit.legs)}
          {renderOutfitLayer('feet', outfit.feet)}
        </View>
      )}
      
      {/* Accessories */}
      {showOutfitItems && outfit.accessories && outfit.accessories.map((accessory, index) => (
        renderOutfitLayer(`accessory_${index}`, accessory)
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  avatarBase: {
    backgroundColor: Colors.lightBackground,
    borderRadius: Sizes.borderRadius.circle,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: Sizes.borderWidth.medium,
    borderColor: Colors.primary,
    shadowColor: Colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  
  avatarFace: {
    textAlign: 'center',
  },
  
  outfitContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  outfitLayer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  outfitIcon: {
    textAlign: 'center',
    textShadowColor: Colors.shadow,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  
  outfitLabel: {
    fontSize: Fonts.size.small,
    color: Colors.text,
    marginTop: Sizes.margin.xs,
    textAlign: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: Sizes.padding.xs,
    borderRadius: Sizes.borderRadius.small,
    overflow: 'hidden',
  },
});

export default Avatar;