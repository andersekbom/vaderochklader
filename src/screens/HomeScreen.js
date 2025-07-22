import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import { useWeatherOutfit } from '../context/WeatherOutfitContext';
import { useLocation } from '../hooks/useLocation';
import { useWeather } from '../hooks/useWeather';
import { useOutfitLogic } from '../hooks/useOutfitLogic';
import Button from '../components/ui/Button';
import WeatherDisplay from '../components/WeatherDisplay';
import Avatar from '../components/Avatar';
import OutfitSelectionModal from '../components/OutfitSelectionModal';
import MessageBubble from '../components/MessageBubble';

const HomeScreen = () => {
  const { state } = useWeatherOutfit();
  const { isLoading: locationLoading, error: locationError } = useLocation();
  const { weather, isLoading: weatherLoading, error: weatherError, refetchWeather, getForecastText } = useWeather();
  const { avatarReaction } = useOutfitLogic();
  
  const [showOutfitModal, setShowOutfitModal] = useState(false);
  const [selectedBodyPart, setSelectedBodyPart] = useState(null);
  
  // Get screen dimensions for responsive design
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const isSmallScreen = screenHeight < 700;
  const isMediumScreen = screenHeight < 800; // Fairphone 4 and similar
  
  const bodyParts = {
    head: { name: 'Head', emoji: '🎩', icon: { name: 'face-man', library: 'MaterialCommunityIcons', color: Colors.primary } },
    torso: { name: 'Torso', emoji: '👕', icon: { name: 'tshirt-crew', library: 'MaterialCommunityIcons', color: Colors.primary } },
    legs: { name: 'Legs', emoji: '👖', icon: { name: 'human-male-boy', library: 'MaterialCommunityIcons', color: Colors.primary } },
    feet: { name: 'Feet', emoji: '👟', icon: { name: 'shoe-sneaker', library: 'MaterialCommunityIcons', color: Colors.primary } },
  };
  
  const handleOutfitIconPress = (bodyPart) => {
    setSelectedBodyPart(bodyPart);
    setShowOutfitModal(true);
  };
  
  const getForecastMessage = () => {
    const forecastText = getForecastText();
    if (forecastText) {
      return `${forecastText} Vilka kläder tror du är bra för det här vädret?`;
    }
    return "Välj dina kläder för dagens väder! Vad tror du skulle vara bäst?";
  };

  const renderLoadingState = () => {
    if (locationLoading || weatherLoading) {
      return (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            {locationLoading ? 'Hämtar din plats...' : 'Laddar väder...'}
          </Text>
        </View>
      );
    }
    return null;
  };

  const renderErrorState = () => {
    if (locationError || weatherError) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {locationError || weatherError}
          </Text>
          <Button 
            title="Försök igen" 
            onPress={refetchWeather}
            size="small"
            style={styles.retryButton}
          />
        </View>
      );
    }
    return null;
  };

  if (locationLoading || weatherLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Väder & Kläder</Text>
          {renderLoadingState()}
        </View>
      </SafeAreaView>
    );
  }

  if ((locationError || weatherError) && !weather.condition) {
    return (
      <SafeAreaView style={styles.containWeather & Clotheser}>
        <View style={styles.centerContent}>
          <Text style={styles.title}>Väder & Kläder</Text>
          {renderErrorState()}
        </View>
      </SafeAreaView>
    );
  }

  // Create responsive styles
  const getResponsiveStyles = () => ({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    
    scrollView: {
      flex: 1,
    },
    
    scrollContent: {
      padding: isSmallScreen ? screenWidth * 0.025 : isMediumScreen ? screenWidth * 0.03 : screenWidth * 0.04,
      paddingTop: isSmallScreen ? screenHeight * 0.015 : isMediumScreen ? screenHeight * 0.02 : screenHeight * 0.03,
      paddingBottom: isSmallScreen ? screenHeight * 0.01 : isMediumScreen ? screenHeight * 0.015 : screenHeight * 0.02,
    },
    
    title: {
      fontSize: isSmallScreen ? screenWidth * 0.055 : isMediumScreen ? screenWidth * 0.06 : screenWidth * 0.07,
      fontWeight: Fonts.weight.bold,
      color: Colors.text,
      marginBottom: isSmallScreen ? screenHeight * 0.005 : isMediumScreen ? screenHeight * 0.008 : screenHeight * 0.015,
      marginTop: isSmallScreen ? screenHeight * 0.005 : isMediumScreen ? screenHeight * 0.008 : screenHeight * 0.02,
      textAlign: 'center',
    },
    
    subtitle: {
      fontSize: isSmallScreen ? screenWidth * 0.035 : isMediumScreen ? screenWidth * 0.038 : screenWidth * 0.045,
      fontWeight: Fonts.weight.medium,
      color: Colors.primary,
      marginBottom: isSmallScreen ? screenHeight * 0.01 : isMediumScreen ? screenHeight * 0.012 : screenHeight * 0.025,
      textAlign: 'center',
    },
    
    weatherDisplay: {
      width: '100%',
      marginBottom: isSmallScreen ? screenHeight * 0.008 : isMediumScreen ? screenHeight * 0.01 : screenHeight * 0.02,
    },
    
    avatarSection: {
      marginBottom: isSmallScreen ? screenHeight * 0.008 : isMediumScreen ? screenHeight * 0.01 : screenHeight * 0.02,
    },
    
    avatarRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
    },
    
    avatarsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    arrow: {
      marginHorizontal: screenWidth * 0.02,
    },

    forecastAvatar: {
      transform: [{ scale: 0.7 }],
    },
    
    avatarMessage: {
      marginLeft: screenWidth * 0.03,
      flex: 1,
    },
    
    outfitSection: {
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      marginBottom: isSmallScreen ? screenHeight * 0.008 : isMediumScreen ? screenHeight * 0.01 : screenHeight * 0.02,
    },
    
    outfitIconButton: {
      padding: isSmallScreen ? screenWidth * 0.02 : isMediumScreen ? screenWidth * 0.025 : screenWidth * 0.03,
      borderRadius: Sizes.borderRadius.large,
      backgroundColor: Colors.lightBackground,
      marginBottom: isSmallScreen ? screenHeight * 0.006 : isMediumScreen ? screenHeight * 0.008 : screenHeight * 0.015,
      borderWidth: 2,
      borderColor: Colors.border,
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: isSmallScreen ? screenWidth * 0.16 : isMediumScreen ? screenWidth * 0.18 : screenWidth * 0.2,
      minHeight: isSmallScreen ? screenWidth * 0.16 : isMediumScreen ? screenWidth * 0.18 : screenWidth * 0.2,
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
  });

  const responsiveStyles = getResponsiveStyles();

  return (
    <SafeAreaView style={responsiveStyles.container}>
      <ScrollView 
        style={responsiveStyles.scrollView}
        contentContainerStyle={responsiveStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={responsiveStyles.title}>Väder & Kläder</Text>
        <Text style={responsiveStyles.subtitle}>Hitta kläder för rätt väder!</Text>

        {weather.condition && (
          <WeatherDisplay 
            weather={weather} 
            style={responsiveStyles.weatherDisplay}
            onRefresh={refetchWeather}
          />
        )}

        <View style={responsiveStyles.avatarSection}>
          <View style={responsiveStyles.avatarRow}>
            <View style={responsiveStyles.avatarsContainer}>
              <Avatar 
                size="small" 
                showOutfitItems={false} 
                weather={weather}
              />
              {weather.forecast4h && (
                <>
                  <MaterialIcons 
                    name="arrow-forward" 
                    size={isSmallScreen ? 14 : isMediumScreen ? 16 : 20} 
                    color={Colors.primary} 
                    style={responsiveStyles.arrow}
                  />
                  <Avatar 
                    size="small" 
                    showOutfitItems={false} 
                    weather={weather.forecast4h}
                    style={responsiveStyles.forecastAvatar}
                  />
                </>
              )}
            </View>
            <MessageBubble
              message={getForecastMessage()}
              type="default"
              visible={true}
              style={responsiveStyles.avatarMessage}
            />
          </View>
        </View>

        <View style={responsiveStyles.outfitSection}>
          <TouchableOpacity
            style={responsiveStyles.outfitIconButton}
            onPress={() => handleOutfitIconPress('head')}
          >
            {state.outfit.head ? (
              state.outfit.head.emoji ? (
                <Text style={responsiveStyles.outfitIcon}>{state.outfit.head.emoji}</Text>
              ) : (() => {
                const iconData = state.outfit.head.icon;
                const IconComponent = iconData.library === 'Ionicons' ? Ionicons : MaterialCommunityIcons;
                return (
                  <IconComponent
                    name={iconData.name}
                    size={isSmallScreen ? screenWidth * 0.08 : isMediumScreen ? screenWidth * 0.09 : screenWidth * 0.12}
                    color={iconData.color}
                  />
                );
              })()
            ) : (
              <Text style={responsiveStyles.outfitIcon}>{bodyParts.head.emoji}</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={responsiveStyles.outfitIconButton}
            onPress={() => handleOutfitIconPress('torso')}
          >
            {state.outfit.torso ? (
              state.outfit.torso.emoji ? (
                <Text style={responsiveStyles.outfitIcon}>{state.outfit.torso.emoji}</Text>
              ) : (() => {
                const iconData = state.outfit.torso.icon;
                const IconComponent = iconData.library === 'Ionicons' ? Ionicons : MaterialCommunityIcons;
                return (
                  <IconComponent
                    name={iconData.name}
                    size={isSmallScreen ? screenWidth * 0.08 : isMediumScreen ? screenWidth * 0.09 : screenWidth * 0.12}
                    color={iconData.color}
                  />
                );
              })()
            ) : (
              <Text style={responsiveStyles.outfitIcon}>{bodyParts.torso.emoji}</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={responsiveStyles.outfitIconButton}
            onPress={() => handleOutfitIconPress('legs')}
          >
            {state.outfit.legs ? (
              state.outfit.legs.emoji ? (
                <Text style={responsiveStyles.outfitIcon}>{state.outfit.legs.emoji}</Text>
              ) : (() => {
                const iconData = state.outfit.legs.icon;
                const IconComponent = iconData.library === 'Ionicons' ? Ionicons : MaterialCommunityIcons;
                return (
                  <IconComponent
                    name={iconData.name}
                    size={isSmallScreen ? screenWidth * 0.08 : isMediumScreen ? screenWidth * 0.09 : screenWidth * 0.12}
                    color={iconData.color}
                  />
                );
              })()
            ) : (
              <Text style={responsiveStyles.outfitIcon}>{bodyParts.legs.emoji}</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={responsiveStyles.outfitIconButton}
            onPress={() => handleOutfitIconPress('feet')}
          >
            {state.outfit.feet ? (
              state.outfit.feet.emoji ? (
                <Text style={responsiveStyles.outfitIcon}>{state.outfit.feet.emoji}</Text>
              ) : (() => {
                const iconData = state.outfit.feet.icon;
                const IconComponent = iconData.library === 'Ionicons' ? Ionicons : MaterialCommunityIcons;
                return (
                  <IconComponent
                    name={iconData.name}
                    size={isSmallScreen ? screenWidth * 0.08 : isMediumScreen ? screenWidth * 0.09 : screenWidth * 0.12}
                    color={iconData.color}
                  />
                );
              })()
            ) : (
              <Text style={responsiveStyles.outfitIcon}>{bodyParts.feet.emoji}</Text>
            )}
          </TouchableOpacity>
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
          bodyPartName={selectedBodyPart ? bodyParts[selectedBodyPart].name : ''}
          bodyPartIcon={selectedBodyPart ? bodyParts[selectedBodyPart].icon : null}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    padding: Sizes.padding.md,
    paddingTop: Sizes.padding.lg,
    paddingBottom: Sizes.padding.xl,
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
  
  subtitle: {
    fontSize: Fonts.size.large,
    fontWeight: Fonts.weight.medium,
    color: Colors.primary,
    marginBottom: Sizes.margin.lg,
    textAlign: 'center',
  },
  
  weatherDisplay: {
    width: '100%',
    marginBottom: Sizes.margin.sm,
  },
  
  avatarSection: {
    marginBottom: Sizes.margin.sm,
  },
  
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  
  outfitSection: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: Sizes.margin.lg,
  },
  
  outfitIconButton: {
    padding: Sizes.padding.md,
    borderRadius: Sizes.borderRadius.large,
    backgroundColor: Colors.lightBackground,
    marginBottom: Sizes.margin.md,
    borderWidth: 2,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    minHeight: 80,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  outfitIcon: {
    fontSize: 48,
    textAlign: 'center',
  },
  
  outfitFeedback: {
    width: '100%',
    maxWidth: '100%',
    marginTop: Sizes.margin.md,
    marginBottom: Sizes.margin.sm,
  },
  
  avatarMessage: {
    marginLeft: Sizes.margin.md,
    flex: 1,
  },
  
  avatarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  arrow: {
    marginHorizontal: Sizes.margin.xs,
  },

  forecastAvatar: {
    transform: [{ scale: 0.7 }],
  },
  
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  loadingText: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    textAlign: 'center',
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