import { StatusBar } from 'expo-status-bar';
import { WeatherOutfitProvider } from './src/context/WeatherOutfitContext';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <WeatherOutfitProvider>
      <HomeScreen />
      <StatusBar style="auto" />
    </WeatherOutfitProvider>
  );
}
