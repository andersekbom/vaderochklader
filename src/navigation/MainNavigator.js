/**
 * MainNavigator Component
 * 
 * Handles navigation between screens in the app.
 * Uses a simple state-based navigation approach rather than a navigation library
 * to keep the app simple for kindergarten children.
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useWeatherOutfit } from '../context/WeatherOutfitContext';
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const MainNavigator = () => {
  const { state, actions } = useWeatherOutfit();
  const { currentScreen } = state.ui;

  const handleNavigate = (screen) => {
    actions.setCurrentScreen(screen);
  };

  // Render the appropriate screen based on currentScreen state
  const renderScreen = () => {
    switch (currentScreen) {
      case 'settings':
        return <SettingsScreen onClose={() => handleNavigate('home')} />;
      case 'home':
      default:
        return <HomeScreen onSettingsPress={() => handleNavigate('settings')} />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainNavigator;