import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Sizes from '../constants/Sizes';
import { WeatherEmojis, WeatherConditionsSwedish } from '../constants/WeatherConditions';
import Card from './ui/Card';
import Button from './ui/Button';
import MapModal from './MapModal';
import { useLocation } from '../hooks/useLocation';

const WeatherDisplay = ({ weather, style, showLocation = true, showTemperature = true, onRefresh }) => {
  const { location } = useLocation();
  const [showMapModal, setShowMapModal] = useState(false);
  
  // Get screen dimensions for responsive sizing
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const isSmallScreen = screenHeight < 700;
  const isMediumScreen = screenHeight < 800;
  
  if (!weather.condition) {
    return (
      <Card style={[styles.container, style]}>
        <Text style={styles.loadingText}>Laddar väder...</Text>
      </Card>
    );
  }

  const weatherEmoji = WeatherEmojis[weather.condition] || '🌤️';
  
  const getWeatherColor = () => {
    switch (weather.condition) {
      case 'sunny':
        return Colors.weather.sunny;
      case 'rainy':
        return Colors.weather.rainy;
      case 'cloudy':
        return Colors.weather.cloudy;
      case 'snowy':
        return Colors.weather.snowy;
      case 'stormy':
        return Colors.weather.stormy;
      default:
        return Colors.primary;
    }
  };


  const getTemperatureDescription = (temperature) => {
    if (temperature < -10) return "väldigt kallt";
    if (temperature < 0) return "kallt";
    if (temperature < 10) return "lite kallt";
    if (temperature < 20) return "ljummet";
    if (temperature < 25) return "varmt";
    if (temperature < 30) return "ganska varmt";
    return "väldigt varmt";
  };

  const getForecastText = () => {
    if (!weather.forecast4h) return null;
    
    const forecastConditionText = {
      sunny: "soligt",
      cloudy: "molnigt", 
      rainy: "regna",
      snowy: "snöa",
      stormy: "storma"
    }[weather.forecast4h.condition] || "fint väder";
    
    const forecastTempDescription = getTemperatureDescription(weather.forecast4h.temperature);
    
    return `Senare: ${forecastConditionText} och ${forecastTempDescription}`;
  };

  return (
    <Card style={[styles.container, style]} padding="sm">
      {/* Weather Icons Row */}
      <View style={styles.weatherIconsRow}>
        <View style={styles.mainWeatherIcons}>
          <View style={styles.currentWeatherIcon}>
            <Text style={[styles.weatherEmoji, { 
              color: getWeatherColor(),
              fontSize: isSmallScreen ? screenWidth * 0.12 : isMediumScreen ? screenWidth * 0.14 : screenWidth * 0.16,
            }]}>
              {weatherEmoji}
            </Text>
          </View>
          
          {weather.forecast4h && (
            <View style={styles.forecastTemperature}>
              <Text style={[styles.temperatureNumber, { 
                fontSize: isSmallScreen ? screenWidth * 0.12 : isMediumScreen ? screenWidth * 0.14 : screenWidth * 0.16,
              }]}>
                {weather.forecast4h.temperature}°
              </Text>
            </View>
          )}
        </View>
        
        {onRefresh && (
          <View style={styles.refreshButtonContainer}>
            <Button 
              title="↻" 
              onPress={onRefresh}
              variant="secondary"
              size="small"
              style={styles.refreshButton}
              textStyle={{
                fontSize: isSmallScreen ? 16 : isMediumScreen ? 18 : 20,
                color: Colors.primary,
              }}
            />
          </View>
        )}
      </View>
      
      {/* Current Weather Text */}
      <View style={styles.currentWeatherText}>
        {showLocation && weather.location && (
          <View>
            <Text style={styles.weatherDescription}>
              Nu i{' '}
              <Text 
                style={styles.locationButtonText}
                onPress={() => setShowMapModal(true)}
              >
                {weather.location.split(',')[0]}
              </Text>
              :
            </Text>
            <Text style={styles.weatherDescription}>
              <Text style={[styles.condition, { 
                color: getWeatherColor(),
              }]}>
                {WeatherConditionsSwedish[weather.condition] || weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)}
              </Text>
              {showTemperature && (
                <Text style={styles.temperature}> och {getTemperatureDescription(weather.temperature)}</Text>
              )}
            </Text>
          </View>
        )}
      </View>
      
      
      <MapModal
        visible={showMapModal}
        onClose={() => setShowMapModal(false)}
        userLocation={location}
        locationName={weather.location}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.lightBackground,
  },
  
  weatherIconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.margin.xs,
    width: '100%',
    paddingHorizontal: Sizes.padding.md,
  },
  
  mainWeatherIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: Sizes.margin.lg,
  },
  
  currentWeatherIcon: {
    alignItems: 'center',
  },
  
  forecastTemperature: {
    alignItems: 'center',
  },
  
  temperatureNumber: {
    fontWeight: Fonts.weight.bold,
    color: Colors.primary,
  },
  
  weatherTextInfo: {
    alignItems: 'center',
    marginBottom: Sizes.margin.xs,
  },
  
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  
  weatherEmoji: {
    fontSize: Fonts.size.large,
    marginRight: Sizes.margin.xs,
  },
  
  condition: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
  },
  
  temperature: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.medium,
    color: Colors.text,
  },
  
  locationText: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    fontWeight: Fonts.weight.medium,
  },
  
  locationButton: {
    paddingHorizontal: Sizes.padding.xs,
    paddingVertical: 2,
    borderRadius: Sizes.borderRadius.small,
    backgroundColor: Colors.primary + '20',
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  
  currentWeatherText: {
    alignItems: 'center',
    marginBottom: Sizes.margin.sm,
    paddingHorizontal: Sizes.padding.md,
  },
  
  weatherDescription: {
    fontSize: Fonts.size.large,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: Fonts.weight.semibold,
    lineHeight: Fonts.lineHeight.large,
    flexWrap: 'wrap',
  },
  
  forecastText: {
    alignItems: 'center',
    marginBottom: Sizes.margin.md,
    paddingHorizontal: Sizes.padding.md,
  },
  
  forecastDescription: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    textAlign: 'center',
    fontWeight: Fonts.weight.medium,
    lineHeight: Fonts.lineHeight.medium,
  },
  
  inlineLocationButton: {
    paddingHorizontal: 2,
  },
  
  locationButtonText: {
    fontSize: Fonts.size.large,
    color: Colors.primary,
    fontWeight: Fonts.weight.bold,
    textDecorationLine: 'underline',
  },
  
  message: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Sizes.margin.sm,
    lineHeight: Fonts.lineHeight.medium,
  },
  
  
  
  
  
  refreshButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
  },
  
  refreshButton: {
    minWidth: 32,
    paddingHorizontal: Sizes.padding.xs,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  
  loadingText: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    opacity: 0.7,
    textAlign: 'center',
  },

  weatherTimeline: {
    alignItems: 'center',
    marginBottom: Sizes.margin.sm,
    paddingHorizontal: Sizes.padding.md,
  },

  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightBackground,
    paddingHorizontal: Sizes.padding.md,
    paddingVertical: Sizes.padding.sm,
    borderRadius: Sizes.borderRadius.medium,
    borderWidth: 1,
    borderColor: Colors.border,
  },

  timelineItem: {
    alignItems: 'center',
    flex: 1,
  },

  timelineLabel: {
    fontSize: Fonts.size.tiny,
    fontWeight: Fonts.weight.semibold,
    color: Colors.text,
    marginBottom: 2,
    lineHeight: Fonts.lineHeight.tiny,
  },

  timelineTemp: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    color: Colors.primary,
    marginTop: 2,
    lineHeight: Fonts.lineHeight.medium,
  },

  timelineArrow: {
    paddingHorizontal: Sizes.padding.sm,
  },

  arrowText: {
    fontSize: Fonts.size.medium,
    color: Colors.primary,
    fontWeight: Fonts.weight.bold,
  },
});

export default WeatherDisplay;

/*
Weather Timeline code - Hidden for now, may re-add later:

{weather.forecast4h && (
  <View style={styles.weatherTimeline}>
    <View style={styles.timelineContainer}>
      <View style={styles.timelineItem}>
        <Text style={styles.timelineLabel}>Nu</Text>
        <Text style={[styles.weatherEmoji, { 
          color: getWeatherColor(),
          fontSize: isSmallScreen ? screenWidth * 0.06 : isMediumScreen ? screenWidth * 0.07 : screenWidth * 0.08,
        }]}>
          {weatherEmoji}
        </Text>
        <Text style={styles.timelineTemp}>{weather.temperature}°</Text>
      </View>
      
      <View style={styles.timelineArrow}>
        <Text style={styles.arrowText}>→</Text>
      </View>
      
      <View style={styles.timelineItem}>
        <Text style={styles.timelineLabel}>+4h</Text>
        <Text style={[styles.weatherEmoji, { 
          color: getWeatherColor(),
          fontSize: isSmallScreen ? screenWidth * 0.06 : isMediumScreen ? screenWidth * 0.07 : screenWidth * 0.08,
        }]}>
          {WeatherEmojis[weather.forecast4h.condition] || '🌤️'}
        </Text>
        <Text style={styles.timelineTemp}>{weather.forecast4h.temperature}°</Text>
      </View>
    </View>
  </View>
)}
*/