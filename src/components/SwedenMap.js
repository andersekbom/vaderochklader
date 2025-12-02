import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Circle, Text as SvgText, G } from 'react-native-svg';
import Colors from '../constants/Colors';
import { useLanguage } from '../context/LanguageContext';
import SwedenSvg from '../../assets/se.svg';

const { width } = Dimensions.get('window');

const SwedenMap = ({ userLocation, style }) => {
  const { t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState(null);

  // City positions based on actual Swedish geography
  // Using viewBox 0 0 1000 1000 from the SVG file
  const cities = [
    { name: 'Stockholm', x: 720, y: 450, emoji: '🏛️', lat: 59.3293, lng: 18.0649 },
    { name: 'Göteborg', x: 280, y: 650, emoji: '🚢', lat: 57.7089, lng: 11.9746 },
    { name: 'Malmö', x: 350, y: 920, emoji: '🌉', lat: 55.6050, lng: 13.0007 },
    { name: 'Uppsala', x: 680, y: 390, emoji: '🎓', lat: 59.8586, lng: 17.6389 },
    { name: 'Linköping', x: 595, y: 540, emoji: '✈️', lat: 58.5877, lng: 16.1542 },
    { name: 'Västerås', x: 615, y: 420, emoji: '⚡', lat: 59.6099, lng: 16.5448 },
    { name: 'Örebro', x: 575, y: 480, emoji: '🏰', lat: 59.2741, lng: 15.2066 },
  ];

  // Convert lat/lng to SVG coordinates for 1000x1000 viewBox
  const latLngToSvg = (lat, lng) => {
    // Sweden geographical bounds from the SVG
    // Approximate mapping to 1000x1000 viewBox
    const x = ((lng - 10.9) / (24.2 - 10.9)) * 500 + 250;
    const y = ((69.1 - lat) / (69.1 - 55.3)) * 900 + 50;
    return { x, y };
  };

  const userPosition = userLocation && userLocation.latitude && userLocation.longitude 
    ? latLngToSvg(userLocation.latitude, userLocation.longitude)
    : null;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{t('swedenMap')}</Text>

      <View style={styles.mapContainer}>
        <Svg width="100%" height="100%" viewBox="0 0 1000 1000">
          {/* Sweden map from SVG file */}
          <SwedenSvg width="1000" height="1000" />

          {/* Overlay with cities and user location */}
          <G>
            {/* Cities */}
            {cities.map((city, index) => (
              <React.Fragment key={index}>
                <Circle
                  cx={city.x}
                  cy={city.y}
                  r="40"
                  fill={Colors.background}
                  stroke={Colors.primary}
                  strokeWidth="4"
                  onPress={() => setSelectedCity(city)}
                />
                <SvgText
                  x={city.x}
                  y={city.y + 12}
                  fontSize="28"
                  textAnchor="middle"
                  fill={Colors.text}
                  onPress={() => setSelectedCity(city)}
                >
                  {city.emoji}
                </SvgText>
              </React.Fragment>
            ))}

            {/* User location */}
            {userPosition && (
              <>
                <Circle
                  cx={userPosition.x}
                  cy={userPosition.y}
                  r="50"
                  fill={Colors.primary}
                  stroke={Colors.background}
                  strokeWidth="6"
                />
                <SvgText
                  x={userPosition.x}
                  y={userPosition.y + 15}
                  fontSize="36"
                  textAnchor="middle"
                  fill="white"
                >
                  📍
                </SvgText>
              </>
            )}
          </G>
        </Svg>
      </View>
      
      {selectedCity && (
        <View style={styles.cityInfo}>
          <Text style={styles.cityName}>
            {selectedCity.emoji} {selectedCity.name}
          </Text>
          <TouchableOpacity
            style={styles.closeInfo}
            onPress={() => setSelectedCity(null)}
          >
            <Text style={styles.closeInfoText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <Text style={styles.instructions}>
        {t('tapCityIcons')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBackground,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },

  mapContainer: {
    width: '100%',
    height: 400,
  },
  
  cityInfo: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 120,
  },
  
  cityName: {
    color: Colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  closeInfo: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  
  closeInfoText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
  },
  
  instructions: {
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 12,
    opacity: 0.8,
  },
});

export default SwedenMap;