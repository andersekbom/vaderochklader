import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Svg, { Path, Circle, Text as SvgText } from 'react-native-svg';
import Colors from '../constants/Colors';
import { useLanguage } from '../context/LanguageContext';

const { width } = Dimensions.get('window');

const SwedenMap = ({ userLocation, style }) => {
  const { t } = useLanguage();
  const [selectedCity, setSelectedCity] = useState(null);

  // Simple Sweden outline path (simplified)
  const swedenPath = "M150,50 L170,45 L185,60 L190,80 L185,120 L180,160 L170,200 L160,240 L150,280 L140,320 L130,340 L120,320 L110,280 L100,240 L90,200 L85,160 L80,120 L85,80 L95,60 L110,45 L130,50 Z";

  // City positions on our custom map (relative to SVG coordinates)
  const cities = [
    { name: 'Stockholm', x: 165, y: 140, emoji: '🏛️', lat: 59.3293, lng: 18.0649 },
    { name: 'Göteborg', x: 110, y: 180, emoji: '🚢', lat: 57.7089, lng: 11.9746 },
    { name: 'Malmö', x: 125, y: 220, emoji: '🌉', lat: 55.6050, lng: 13.0007 },
    { name: 'Uppsala', x: 160, y: 120, emoji: '🎓', lat: 59.8586, lng: 17.6389 },
    { name: 'Linköping', x: 150, y: 170, emoji: '✈️', lat: 58.5877, lng: 16.1542 },
    { name: 'Västerås', x: 145, y: 130, emoji: '⚡', lat: 59.6099, lng: 16.5448 },
    { name: 'Örebro', x: 140, y: 150, emoji: '🏰', lat: 59.2741, lng: 15.2066 },
  ];

  // Convert lat/lng to SVG coordinates (simple approximation for Sweden)
  const latLngToSvg = (lat, lng) => {
    // Sweden bounds: lat 55-69, lng 11-24
    const x = ((lng - 11) / (24 - 11)) * 120 + 80; // Map to x: 80-200
    const y = ((69 - lat) / (69 - 55)) * 300 + 50;  // Map to y: 50-350 (inverted)
    return { x, y };
  };

  const userPosition = userLocation && userLocation.latitude && userLocation.longitude 
    ? latLngToSvg(userLocation.latitude, userLocation.longitude)
    : null;

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.title}>{t('swedenMap')}</Text>
      
      <Svg width="100%" height="400" viewBox="0 0 280 400">
        {/* Sweden outline */}
        <Path
          d={swedenPath}
          fill="#b8e6b8"
          stroke="#4a90e2"
          strokeWidth="3"
        />
        
        {/* Water around Sweden */}
        <Circle cx="50" cy="100" r="8" fill="#a2d2ff" />
        <Circle cx="60" cy="150" r="6" fill="#a2d2ff" />
        <Circle cx="40" cy="200" r="10" fill="#a2d2ff" />
        <Circle cx="220" cy="120" r="12" fill="#a2d2ff" />
        <Circle cx="230" cy="180" r="8" fill="#a2d2ff" />
        
        {/* Cities */}
        {cities.map((city, index) => (
          <React.Fragment key={index}>
            <Circle
              cx={city.x}
              cy={city.y}
              r="15"
              fill={Colors.background}
              stroke={Colors.primary}
              strokeWidth="2"
              onPress={() => setSelectedCity(city)}
            />
            <SvgText
              x={city.x}
              y={city.y + 5}
              fontSize="12"
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
              r="20"
              fill={Colors.primary}
              stroke={Colors.background}
              strokeWidth="3"
            />
            <SvgText
              x={userPosition.x}
              y={userPosition.y + 6}
              fontSize="16"
              textAnchor="middle"
              fill="white"
            >
              📍
            </SvgText>
          </>
        )}
      </Svg>
      
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
        Tap the city icons to learn more! 🏛️🚢🌉
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