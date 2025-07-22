# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Weather & Clothes App** is a React Native application built with Expo, designed for kindergarten children to help them choose appropriate clothing based on weather conditions. The app provides child-friendly weather forecasts and outfit recommendations with emoji-based interactions.

## Development Commands

```bash
# Start development server
npm start

# Run on specific platforms
npm run android    # Android device/emulator
npm run ios        # iOS device/simulator  
npm run web        # Web browser

# Install dependencies
npm install
```

## Architecture Overview

### Core Technologies
- **React Native 0.79.5** with **Expo ~53.0.20**
- **Context API** with useReducer for state management
- **SMHI API** (Swedish Meteorological Institute) for weather data
- **expo-location** for GPS positioning with high accuracy mode
- **Hybrid icon system**: Emoji-first with MaterialCommunityIcons fallback

### Key Directory Structure
```
src/
├── context/WeatherOutfitContext.js    # Global state management
├── hooks/                             # Business logic abstraction
│   ├── useWeather.js                 # Weather API integration
│   ├── useLocation.js                # GPS location handling
│   └── useOutfitLogic.js             # Clothing recommendations
├── services/weatherApi.js             # SMHI weather service
├── utils/outfitMatcher.js            # Outfit matching algorithm
├── components/Avatar.js              # Weather-reactive avatar system
└── screens/HomeScreen.js             # Main application screen
```

### State Management Pattern
- Single `WeatherOutfitContext` managing global state
- Custom hooks abstract complex logic (`useWeather`, `useLocation`, `useOutfitLogic`)
- Reducer pattern for predictable state transitions

## Responsive Design System

Three-tier screen size detection for optimal child accessibility:
- **Small screens**: height < 700px
- **Medium screens**: height < 800px (Fairphone 4, etc.)
- **Large screens**: height ≥ 800px

Dynamic sizing using percentage-based calculations:
```javascript
const isSmallScreen = screenHeight < 700;
const isMediumScreen = screenHeight < 800;

// Text sizes: 3.2-7% of screen width
fontSize: isSmallScreen ? screenWidth * 0.035 : isMediumScreen ? screenWidth * 0.04 : screenWidth * 0.05

// Interactive elements: minimum 16-20% screen width for child accessibility
minWidth: isSmallScreen ? screenWidth * 0.16 : screenWidth * 0.2
```

## Key Technical Considerations

### Weather Integration
- **SMHI API**: 16 weather stations across Sweden with automatic nearest station detection
- **Location accuracy**: Uses `Location.Accuracy.High` for precise weather matching
- **4-hour forecasting**: Current + future weather conditions
- **Robust error handling**: Retry mechanisms for failed requests

### Child-Friendly Design Requirements
- **Large touch targets**: Minimum 44px, typically 16-20% screen width
- **Emoji-first icons**: More engaging than vector icons for children
- **Persistent feedback**: Outfit recommendations stay visible until new selection
- **Simple language**: Age-appropriate feedback messages
- **Single-screen layout**: No scrolling required on any device

### Icon System Evolution
The app uses a hybrid approach:
1. **Emoji-first**: More kid-friendly and engaging
2. **Vector fallback**: MaterialCommunityIcons for reliability
3. **Weather-reactive**: Avatar expressions change based on conditions

### Location Services
- High accuracy GPS positioning for precise weather station matching
- Graceful permission handling with user-friendly error messages
- Automatic retry logic when location services fail
- No persistent storage of location data for privacy

## Production Notes

The app has been extensively tested and is production-ready with:
- Single-screen responsive layout working on all device sizes
- Accurate location detection (tested in Kolsva, Sweden area)
- Weather-aware avatar system with current + forecast display
- Smart outfit recommendations with persistent feedback
- Child-optimized UI with large, colorful, intuitive design

When making changes, maintain the child-friendly design principles and responsive sizing system throughout all components.