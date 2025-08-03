/**
 * HomeScreen Component
 * 
 * Main screen of the weather clothes app for kindergarten children.
 * Displays weather information and allows outfit selection based on conditions.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import { BODY_PARTS } from '../constants/BodyParts';
import { useWeatherOutfit } from '../context/WeatherOutfitContext';
import { useLocation } from '../hooks/useLocation';
import { useWeather } from '../hooks/useWeather';
import { useOutfitLogic } from '../hooks/useOutfitLogic';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/ui/Button';
import WeatherDisplay from '../components/WeatherDisplay';
import OutfitSelectionModal from '../components/OutfitSelectionModal';
import MessageBubble from '../components/MessageBubble';
import OutfitIcon from '../components/OutfitIcon';

const HomeScreen = ({ onSettingsPress }) => {
  // Context and hooks
  const { state } = useWeatherOutfit();
  const { isLoading: locationLoading, error: locationError } = useLocation();
  const { weather, isLoading: weatherLoading, error: weatherError, refetchWeather } = useWeather();
  const { avatarReaction } = useOutfitLogic();
  const { t } = useLanguage();
  
  // Local state
  const [showOutfitModal, setShowOutfitModal] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  
  // Memoized screen dimensions for performance
  const screenDimensions = useMemo(() => {
    const { width, height } = Dimensions.get('window');
    return {
      width,
      height,
      isSmallScreen: height < 700,
      isMediumScreen: height < 800
    };
  }, []);
  
  const { width: screenWidth, height: screenHeight, isSmallScreen, isMediumScreen } = screenDimensions;

  // Memoized responsive styles for performance - MOVED BEFORE EARLY RETURNS
  const responsiveStyles = useMemo(() => ({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    
    scrollView: {
      flex: 1,
    },
    
    scrollContent: {
      padding: isSmallScreen ? screenWidth * 0.015 : isMediumScreen ? screenWidth * 0.02 : screenWidth * 0.03,
      paddingTop: isSmallScreen ? screenHeight * 0.01 : isMediumScreen ? screenHeight * 0.015 : screenHeight * 0.02,
      paddingBottom: isSmallScreen ? screenHeight * 0.008 : isMediumScreen ? screenHeight * 0.01 : screenHeight * 0.015,
    },
    
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      width: '100%',
      marginBottom: isSmallScreen ? screenHeight * 0.002 : isMediumScreen ? screenHeight * 0.003 : screenHeight * 0.005,
      marginTop: isSmallScreen ? screenHeight * 0.005 : isMediumScreen ? screenHeight * 0.015 : screenHeight * 0.01,
    },
    
    settingsButton: {
      position: 'absolute',
      right: 0,
      padding: Sizes.padding.xs,
    },
    
    title: {
      fontSize: isSmallScreen ? screenWidth * 0.042 : isMediumScreen ? screenWidth * 0.048 : screenWidth * 0.055,
      fontWeight: Fonts.weight.bold,
      color: Colors.text,
      textAlign: 'center',
    },
    
    subtitle: {
      fontSize: isSmallScreen ? screenWidth * 0.028 : isMediumScreen ? screenWidth * 0.03 : screenWidth * 0.035,
      fontWeight: Fonts.weight.medium,
      color: Colors.primary,
      marginBottom: isSmallScreen ? screenHeight * 0.003 : isMediumScreen ? screenHeight * 0.005 : screenHeight * 0.008,
      textAlign: 'center',
    },
    
    weatherDisplay: {
      width: '100%',
      marginBottom: isSmallScreen ? screenHeight * 0.003 : isMediumScreen ? screenHeight * 0.005 : screenHeight * 0.008,
    },
    
    clothingQuestionSection: {
      alignItems: 'center',
      marginBottom: isSmallScreen ? screenHeight * 0.005 : isMediumScreen ? screenHeight * 0.008 : screenHeight * 0.01,
      marginTop: isSmallScreen ? screenHeight * 0.003 : isMediumScreen ? screenHeight * 0.005 : screenHeight * 0.008,
    },
    
    clothingQuestion: {
      fontSize: isSmallScreen ? screenWidth * 0.03 : isMediumScreen ? screenWidth * 0.032 : screenWidth * 0.035,
      fontWeight: Fonts.weight.medium,
      color: Colors.text,
      textAlign: 'center',
      marginHorizontal: screenWidth * 0.04,
    },
    
    outfitSection: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginBottom: isSmallScreen ? screenHeight * 0.008 : isMediumScreen ? screenHeight * 0.01 : screenHeight * 0.02,
    },
    
    outfitIconButton: {
      padding: isSmallScreen ? screenWidth * 0.01 : isMediumScreen ? screenWidth * 0.015 : screenWidth * 0.02,
      borderRadius: Sizes.borderRadius.large,
      backgroundColor: Colors.lightBackground,
      marginBottom: isSmallScreen ? screenHeight * 0.006 : isMediumScreen ? screenHeight * 0.008 : screenHeight * 0.015,
      borderWidth: 2,
      borderColor: Colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: isSmallScreen ? screenWidth * 0.18 : isMediumScreen ? screenWidth * 0.20 : screenWidth * 0.22,
      minHeight: isSmallScreen ? screenWidth * 0.18 : isMediumScreen ? screenWidth * 0.20 : screenWidth * 0.22,
      shadowColor: Colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    
    outfitIcon: {
      fontSize: isSmallScreen ? screenWidth * 0.08 : isMediumScreen ? screenWidth * 0.09 : screenWidth * 0.12,
      textAlign: 'center',
    },
    
    outfitFeedback: {
      width: '100%',
      maxWidth: '100%',
      marginTop: isSmallScreen ? screenHeight * 0.005 : isMediumScreen ? screenHeight * 0.008 : screenHeight * 0.015,
      marginBottom: isSmallScreen ? screenHeight * 0.005 : isMediumScreen ? screenHeight * 0.008 : screenHeight * 0.015,
    },
    
    customOutfitImage: {
      width: isSmallScreen ? screenWidth * 0.08 : isMediumScreen ? screenWidth * 0.09 : screenWidth * 0.12,
      height: isSmallScreen ? screenWidth * 0.08 : isMediumScreen ? screenWidth * 0.09 : screenWidth * 0.12,
      borderRadius: Sizes.borderRadius.small,
    },
  }), [isSmallScreen, isMediumScreen, screenWidth, screenHeight]);

  // Calculate icon size for consistent usage
  const iconSize = isSmallScreen ? screenWidth * 0.08 : isMediumScreen ? screenWidth * 0.09 : screenWidth * 0.12;
  
  /**
   * Handles outfit icon press - opens selection modal for specific body part
   * @param {string} bodyPart - The body part key (head, torso, legs, feet)
   */
  const handleOutfitIconPress = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    setShowOutfitModal(true);
  };
  

  /**
   * Animated Loading Component with weather-themed animations
   */
  const AnimatedLoadingState = () => {
    const bounceValue = useRef(new Animated.Value(0)).current;
    const rotateValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      // Bouncing animation for weather icons
      const bounceAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(bounceValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(bounceValue, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );

      // Rotating animation for loading
      const rotateAnimation = Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        })
      );

      bounceAnimation.start();
      rotateAnimation.start();

      return () => {
        bounceAnimation.stop();
        rotateAnimation.stop();
      };
    }, [bounceValue, rotateValue]);

    const bounceInterpolate = bounceValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -20],
    });

    const rotateInterpolate = rotateValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    const weatherEmojis = locationLoading ? ['📍', '🗺️'] : ['☀️', '☁️', '🌧️'];
    const message = locationLoading ? t('fetchingLocation') : t('fetchingWeather');

    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingEmojis}>
          {weatherEmojis.map((emoji, index) => (
            <Animated.Text
              key={index}
              style={[
                styles.loadingEmoji,
                {
                  transform: [
                    { translateY: bounceInterpolate },
                    { rotate: index === 0 ? rotateInterpolate : '0deg' }
                  ],
                  opacity: bounceValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.3, 1, 0.3],
                  }),
                },
              ]}
            >
              {emoji}
            </Animated.Text>
          ))}
        </View>
        <Text style={styles.loadingText}>{message}</Text>
      </View>
    );
  };

  /**
   * Renders loading state with appropriate message
   */
  const renderLoadingState = () => <AnimatedLoadingState />;

  /**
   * Renders error state with retry button
   */
  const renderErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>
        {locationError ? t('locationError') : t('weatherError')}
      </Text>
      <Button 
        title={t('retry')}
        onPress={refetchWeather}
        size="small"
        style={styles.retryButton}
      />
    </View>
  );

  // Early returns for loading and error states
  if (locationLoading || weatherLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>{t('appTitle')}</Text>
          {renderLoadingState()}
        </View>
      </SafeAreaView>
    );
  }

  if ((locationError || weatherError) && !weather.condition) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>{t('appTitle')}</Text>
          {renderErrorState()}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={responsiveStyles.container}>
      <ScrollView 
        style={responsiveStyles.scrollView}
        contentContainerStyle={responsiveStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={responsiveStyles.headerContainer}>
          <Text style={responsiveStyles.title}>{t('appTitle')}</Text>
          <TouchableOpacity 
            style={responsiveStyles.settingsButton}
            onPress={onSettingsPress}
          >
            <MaterialIcons name="settings" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <Text style={responsiveStyles.subtitle}>{t('appSubtitle')}</Text>

        {weather.condition && (
          <WeatherDisplay 
            weather={weather} 
            style={responsiveStyles.weatherDisplay}
            onRefresh={refetchWeather}
          />
        )}

        <View style={responsiveStyles.clothingQuestionSection}>
          <Text style={responsiveStyles.clothingQuestion}>
            {t('clothingQuestion')}
          </Text>
        </View>

        <View style={responsiveStyles.outfitSection}>
          {Object.keys(BODY_PARTS).map((bodyPartKey) => (
            <OutfitIcon
              key={bodyPartKey}
              outfitItem={state.outfit[bodyPartKey]}
              fallbackEmoji={BODY_PARTS[bodyPartKey].emoji}
              size={iconSize}
              buttonStyle={responsiveStyles.outfitIconButton}
              imageStyle={responsiveStyles.customOutfitImage}
              textStyle={responsiveStyles.outfitIcon}
              onPress={() => handleOutfitIconPress(bodyPartKey)}
            />
          ))}
        </View>

        {/* Outfit feedback message */}
        {avatarReaction.message && (
          <MessageBubble
            message={avatarReaction.message}
            type={avatarReaction.reaction === 'poor' ? 'warning' : 'default'}
            visible={true}
            style={responsiveStyles.outfitFeedback}
          />
        )}

        <OutfitSelectionModal
          visible={showOutfitModal}
          onClose={() => setShowOutfitModal(false)}
          bodyPart={selectedBodyPart}
          bodyPartName={selectedBodyPart ? t(selectedBodyPart) : ''}
          bodyPartIcon={selectedBodyPart ? BODY_PARTS[selectedBodyPart].icon : null}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Static styles for loading and error states
 * These don't need responsive sizing as they're only used in simple loading/error screens
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizes.padding.md,
  },
  
  title: {
    fontSize: Fonts.size.title,
    fontWeight: Fonts.weight.bold,
    color: Colors.text,
    marginBottom: Sizes.margin.sm,
    marginTop: Sizes.margin.lg,
    textAlign: 'center',
  },
  
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.padding.lg,
  },

  loadingEmojis: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.margin.lg,
    gap: Sizes.margin.md,
  },

  loadingEmoji: {
    fontSize: 32,
    textAlign: 'center',
  },
  
  loadingText: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: Fonts.weight.medium,
  },
  
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  errorText: {
    fontSize: Fonts.size.medium,
    color: Colors.feedback.error,
    textAlign: 'center',
    marginBottom: Sizes.margin.md,
  },
  
  retryButton: {
    width: '60%',
  },
});

export default HomeScreen;