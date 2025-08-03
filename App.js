import { StatusBar } from 'expo-status-bar';
import { WeatherOutfitProvider } from './src/context/WeatherOutfitContext';
import { LanguageProvider } from './src/context/LanguageContext';
import MainNavigator from './src/navigation/MainNavigator';

export default function App() {
  return (
    <LanguageProvider>
      <WeatherOutfitProvider>
        <MainNavigator />
        <StatusBar style="auto" />
      </WeatherOutfitProvider>
    </LanguageProvider>
  );
}
