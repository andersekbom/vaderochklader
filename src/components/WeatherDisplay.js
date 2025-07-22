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


  return (
    <Card style={[styles.container, style]} padding="lg">
      <View style={styles.weatherHeader}>
        <View style={styles.weatherMainInfo}>
          {showLocation && weather.location && (
            <>
              <Text style={styles.locationText}>I </Text>
              <TouchableOpacity
                onPress={() => setShowMapModal(true)}
                activeOpacity={0.7}
                style={styles.locationButton}
              >
                <Text style={styles.locationButtonText}>
                  {weather.location.split(',')[0]}
                </Text>
              </TouchableOpacity>
              <Text style={styles.locationText}> är det{' '}</Text>
            </>
          )}
          <Text style={[styles.weatherEmoji, { 
            color: getWeatherColor(),
            fontSize: isSmallScreen ? screenWidth * 0.04 : isMediumScreen ? screenWidth * 0.045 : screenWidth * 0.05,
          }]}>
            {weatherEmoji}
          </Text>
          <Text style={[styles.condition, { 
            color: getWeatherColor(),
            fontSize: isSmallScreen ? screenWidth * 0.032 : isMediumScreen ? screenWidth * 0.035 : screenWidth * 0.04,
          }]}>
            {WeatherConditionsSwedish[weather.condition] || weather.condition.charAt(0).toUpperCase() + weather.condition.slice(1)}
          </Text>
          {showTemperature && (
            <Text style={[styles.temperature, {
              fontSize: isSmallScreen ? screenWidth * 0.032 : isMediumScreen ? screenWidth * 0.035 : screenWidth * 0.04,
            }]}> {weather.temperature}°C</Text>
          )}
        </View>
        
        <View style={styles.headerActions}>
          {onRefresh && (
            <Button 
              title="↻" 
              onPress={onRefresh}
              variant="secondary"
              size="small"
              style={styles.refreshButton}
              textStyle={{
                fontSize: isSmallScreen ? 20 : isMediumScreen ? 24 : 28,
                color: Colors.primary,
              }}
            />
          )}
        </View>
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
  
  weatherHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.margin.xs,
    paddingBottom: Sizes.padding.xs,
  },
  
  weatherMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    flexWrap: 'wrap',
  },
  
  weatherEmoji: {
    fontSize: Fonts.size.large,
    marginRight: Sizes.margin.xs,
  },
  
  condition: {
    fontSize: Fonts.size.medium,
    fontWeight: Fonts.weight.bold,
    marginRight: Sizes.margin.xs,
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
  
  locationButtonText: {
    fontSize: Fonts.size.medium,
    color: Colors.primary,
    fontWeight: Fonts.weight.bold,
  },
  
  message: {
    fontSize: Fonts.size.medium,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Sizes.margin.sm,
    lineHeight: Fonts.lineHeight.medium,
  },
  
  
  
  
  
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
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
});

export default WeatherDisplay;