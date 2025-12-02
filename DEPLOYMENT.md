# Deployment Instructions - Weather & Clothes App

Complete guide for running, testing, and deploying the Weather & Clothes App on various platforms.

---

## Table of Contents

1. [Local Development](#local-development)
2. [Expo Go Testing](#expo-go-testing)
3. [Development Builds](#development-builds)
4. [Production Deployment](#production-deployment)
   - [Google Play Store (Android)](#google-play-store-android)
   - [Apple TestFlight & App Store (iOS)](#apple-testflight--app-store-ios)
5. [Environment Configuration](#environment-configuration)
6. [Troubleshooting](#troubleshooting)

---

## Local Development

### Prerequisites

- **Node.js**: v18 or later (LTS recommended)
- **npm**: v9 or later (comes with Node.js)
- **Expo CLI**: Installed globally or via npx
- **Physical device or emulator**:
  - Android: Android Studio with emulator OR physical Android device
  - iOS: Xcode with iOS Simulator (macOS only) OR physical iOS device

### Setup

```bash
# 1. Clone the repository (if not already done)
git clone <repository-url>
cd vaderochklader

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

### Running on Specific Platforms

```bash
# Start and open in Android emulator
npm run android

# Start and open in iOS simulator (macOS only)
npm run ios

# Start and open in web browser
npm run web
```

**Note**: The first Android/iOS build may take several minutes as it sets up the development environment.

---

## Expo Go Testing

Expo Go is the fastest way to test on physical devices without building native apps.

### Install Expo Go

- **Android**: [Google Play Store - Expo Go](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store - Expo Go](https://apps.apple.com/app/expo-go/id982107779)

### Testing with Expo Go

1. **Start the development server**:
   ```bash
   npm start
   ```

2. **Connect your device**:
   - Ensure your phone and computer are on the **same Wi-Fi network**
   - **Android**: Scan the QR code with the Expo Go app
   - **iOS**: Scan the QR code with the built-in Camera app, then tap the notification

3. **Test app features**:
   - Location services (grant permissions when prompted)
   - Weather fetching
   - Outfit selection
   - Custom clothing photos (camera/gallery access)
   - Language switching

### Limitations of Expo Go

- Some native modules may not work (though all features in this app should work)
- Custom native code requires development builds
- Production app icon/splash screen not visible

---

## Development Builds

For testing with custom native configurations or modules not supported by Expo Go.

### Prerequisites

- **EAS CLI**: `npm install -g eas-cli`
- **Expo account**: Sign up at [expo.dev](https://expo.dev)

### Setup EAS

```bash
# 1. Login to Expo
eas login

# 2. Configure the project
eas build:configure
```

This creates an `eas.json` configuration file.

### Build Development Versions

```bash
# Build for Android (APK for local testing)
eas build --profile development --platform android

# Build for iOS (requires Apple Developer account)
eas build --profile development --platform ios
```

**Install on device**:
- **Android**: Download the APK from the build URL and install
- **iOS**: Install via the provided link (device must be registered in your Apple Developer account)

---

## Production Deployment

### Prerequisites for Production

1. **Expo/EAS account** (free tier available)
2. **Google Play Console account** ($25 one-time fee)
3. **Apple Developer Program** ($99/year)
4. **App assets ready**:
   - App icon (1024x1024 PNG)
   - Splash screen
   - App store screenshots
   - Privacy policy (required for children's apps)

---

### Google Play Store (Android)

#### Step 1: Configure App Metadata

Update `app.json`:

```json
{
  "expo": {
    "name": "Weather & Clothes",
    "slug": "weather-clothes-app",
    "version": "1.0.0",
    "android": {
      "package": "com.yourcompany.weatherclothes",
      "versionCode": 1,
      "permissions": [
        "ACCESS_COARSE_LOCATION",
        "ACCESS_FINE_LOCATION",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ],
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    }
  }
}
```

#### Step 2: Build Production AAB

```bash
# Build Android App Bundle for Google Play
eas build --platform android --profile production
```

**EAS Build Configuration** (`eas.json`):

```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

#### Step 3: Create Google Play Console Listing

1. Go to [Google Play Console](https://play.google.com/console)
2. Click **Create app**
3. Fill in app details:
   - **App name**: Weather & Clothes
   - **Default language**: Swedish (or English)
   - **App type**: Application
   - **Category**: Education
   - **Target audience**: Children (specify age 3-5)

#### Step 4: Complete Store Listing

- **Short description** (80 chars max)
- **Full description** (4000 chars max)
- **Screenshots**: At least 2 for phone, tablet recommended
- **Feature graphic**: 1024x500 PNG
- **App icon**: 512x512 PNG

#### Step 5: Content Rating

Complete the content rating questionnaire:
- Target age group: 3-5 years
- No violence, mature content, or ads
- Permissions explained (location for weather, camera for custom clothing)

#### Step 6: Privacy Policy

**Required for children's apps**. Must include:
- What data is collected (location, photos stored locally)
- How data is used (weather fetching, outfit customization)
- Data retention (local storage only, not transmitted)
- COPPA compliance (if targeting US children)

Host the privacy policy online and add the URL to the Play Console.

#### Step 7: Upload AAB and Release

1. Navigate to **Production** → **Create new release**
2. Upload the `.aab` file from EAS build
3. Add release notes
4. Review and **Start rollout to Production**

**Review time**: 1-7 days (faster for updates)

---

### Apple TestFlight & App Store (iOS)

#### Step 1: Apple Developer Account Setup

1. Enroll in [Apple Developer Program](https://developer.apple.com/programs/) ($99/year)
2. Create **App ID** in [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/)
   - **Bundle ID**: `com.yourcompany.weatherclothes`
   - **Capabilities**: Enable required permissions

#### Step 2: Configure App Metadata

Update `app.json`:

```json
{
  "expo": {
    "ios": {
      "bundleIdentifier": "com.yourcompany.weatherclothes",
      "buildNumber": "1",
      "supportsTablet": true,
      "infoPlist": {
        "NSLocationWhenInUseUsageDescription": "We need your location to provide accurate weather forecasts for your area.",
        "NSCameraUsageDescription": "We need camera access so you can add photos of your own clothes.",
        "NSPhotoLibraryUsageDescription": "We need photo library access so you can add photos of your own clothes."
      }
    }
  }
}
```

#### Step 3: Build for TestFlight

```bash
# Build iOS production version
eas build --platform ios --profile production
```

**Note**: EAS handles provisioning profiles and certificates automatically.

#### Step 4: Create App in App Store Connect

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Click **My Apps** → **+** → **New App**
3. Fill in:
   - **Platform**: iOS
   - **Name**: Weather & Clothes
   - **Primary Language**: Swedish (or English)
   - **Bundle ID**: Select the one you created
   - **SKU**: Unique identifier (e.g., `weather-clothes-001`)

#### Step 5: Upload Build to TestFlight

After EAS build completes:
1. Download the `.ipa` file (or let EAS submit automatically)
2. **Automatic submission**:
   ```bash
   eas submit --platform ios --latest
   ```
3. Build appears in **TestFlight** tab after processing (10-30 minutes)

#### Step 6: TestFlight Testing

1. Add internal testers (up to 100, no review required)
2. External testing (up to 10,000, requires Beta App Review)
3. Share TestFlight link with testers
4. Collect feedback and iterate

#### Step 7: App Store Submission

1. Complete **App Information**:
   - Category: Education
   - Age Rating: 4+ (Children's app)
   - Privacy Policy URL (required)

2. **Version Information**:
   - Screenshots (6.5", 6.7", 12.9" displays required)
   - App Preview videos (optional but recommended)
   - Promotional text
   - Description (4000 chars max)
   - Keywords
   - Support URL

3. **Age Rating**:
   - Use Age Rating questionnaire
   - Mark as "Made for Kids" if applicable

4. **App Privacy**:
   - Data collection details (location: used for weather)
   - Photos: stored locally, not collected
   - Privacy practices

5. **Submit for Review**:
   - Select the TestFlight build
   - Add review notes (test account if needed)
   - Submit

**Review time**: 1-3 days (can be longer for children's apps)

---

## Environment Configuration

### Production Environment Variables

Create `.env.production`:

```bash
# API Configuration (if using backend in future)
API_URL=https://your-backend-api.com

# Analytics (optional)
ANALYTICS_ENABLED=true

# Feature flags (optional)
ENABLE_CUSTOM_CLOTHING=true
ENABLE_MAP_FEATURES=true
```

Load environment variables in `app.config.js`:

```javascript
export default {
  expo: {
    // ... existing config
    extra: {
      apiUrl: process.env.API_URL,
      analyticsEnabled: process.env.ANALYTICS_ENABLED === 'true',
    }
  }
}
```

Access in code:
```javascript
import Constants from 'expo-constants';
const apiUrl = Constants.expoConfig.extra.apiUrl;
```

---

## Build Profiles (eas.json)

Recommended `eas.json` configuration:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "ios": {
        "simulator": true
      }
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "autoIncrement": true,
      "android": {
        "buildType": "app-bundle"
      },
      "ios": {
        "autoIncrement": "buildNumber"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-service-account.json"
      },
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "1234567890",
        "appleTeamId": "ABCDE12345"
      }
    }
  }
}
```

---

## Troubleshooting

### Common Issues

#### Location not working
- **Expo Go**: Ensure permissions granted in device settings
- **Production**: Check `NSLocationWhenInUseUsageDescription` in iOS, `ACCESS_FINE_LOCATION` in Android

#### Camera/gallery not accessible
- **iOS**: Verify usage descriptions in `infoPlist`
- **Android**: Check permissions in `app.json` and runtime permission requests

#### Build fails
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules
npm install
eas build --clear-cache --platform <android|ios>
```

#### App crashes on launch
- Check console logs: `npx react-native log-android` or `npx react-native log-ios`
- Verify all dependencies are compatible with React Native 0.79.5
- Ensure AsyncStorage is properly linked

### Getting Help

- **Expo Forums**: [forums.expo.dev](https://forums.expo.dev)
- **EAS Build Docs**: [docs.expo.dev/build/introduction/](https://docs.expo.dev/build/introduction/)
- **Submit to Stores**: [docs.expo.dev/submit/introduction/](https://docs.expo.dev/submit/introduction/)

---

## Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `npm start` |
| Run on Android | `npm run android` |
| Run on iOS | `npm run ios` |
| Build for Android (dev) | `eas build --profile development --platform android` |
| Build for iOS (dev) | `eas build --profile development --platform ios` |
| Build for production (Android) | `eas build --profile production --platform android` |
| Build for production (iOS) | `eas build --profile production --platform ios` |
| Submit to Google Play | `eas submit --platform android` |
| Submit to App Store | `eas submit --platform ios` |

---

## App Store Compliance Notes

### Children's Apps (COPPA/GDPR-K)

Since this app targets kindergarten children:

1. **No data collection**: Emphasize that location and photos are local-only
2. **No third-party ads**: Ensure no advertising SDKs
3. **No social features**: No sharing or communication between users (unless anonymous map feature added)
4. **Parental consent**: May require parental gate for certain features
5. **Privacy policy**: Must be clear and accessible

### Required Assets Checklist

- [ ] App icon (1024x1024)
- [ ] Adaptive icon (Android, 1024x1024 + background color)
- [ ] Splash screen
- [ ] Privacy policy (hosted online)
- [ ] Screenshots (multiple device sizes)
- [ ] App description (child-friendly language)
- [ ] Support email
- [ ] Terms of service (optional but recommended)

---

**Last Updated**: December 2025
**App Version**: 1.0.0
