import WeatherConditions from '../constants/WeatherConditions';

// SMHI Weather Symbol Mapping
const SMHI_WEATHER_SYMBOLS = {
  1: 'clear sky',
  2: 'nearly clear sky',
  3: 'variable cloudiness',
  4: 'halfclear sky',
  5: 'cloudy sky',
  6: 'overcast',
  7: 'fog',
  8: 'light rain showers',
  9: 'moderate rain showers',
  10: 'heavy rain showers',
  11: 'thunderstorm',
  12: 'light sleet showers',
  13: 'moderate sleet showers',
  14: 'heavy sleet showers',
  15: 'light snow showers',
  16: 'moderate snow showers',
  17: 'heavy snow showers',
  18: 'light rain',
  19: 'moderate rain',
  20: 'heavy rain',
  21: 'thunder',
  22: 'light sleet',
  23: 'moderate sleet',
  24: 'heavy sleet',
  25: 'light snowfall',
  26: 'moderate snowfall',
  27: 'heavy snowfall',
};

function findNearestSMHIPoint(latitude, longitude) {
  const points = [
    { lon: 18.0649, lat: 59.3293, name: 'Stockholm' },
    { lon: 11.9746, lat: 57.7089, name: 'Göteborg' },
    { lon: 13.0007, lat: 55.6050, name: 'Malmö' },
    { lon: 17.6389, lat: 59.8586, name: 'Uppsala' },
    { lon: 20.2253, lat: 67.8558, name: 'Kiruna' },
    { lon: 16.1542, lat: 58.5877, name: 'Linköping' },
    { lon: 15.6271, lat: 56.1612, name: 'Växjö' },
    { lon: 14.1618, lat: 60.6749, name: 'Karlstad' },
    { lon: 16.0000, lat: 59.7000, name: 'Västerås' }, // Closer to Kolsva area
    { lon: 15.2134, lat: 59.2741, name: 'Örebro' },
    { lon: 13.1910, lat: 55.7058, name: 'Lund' },
    { lon: 12.6945, lat: 56.0465, name: 'Helsingborg' },
    { lon: 16.3528, lat: 56.8777, name: 'Kalmar' },
    { lon: 18.2948, lat: 57.6348, name: 'Visby' },
    { lon: 21.0225, lat: 65.5848, name: 'Luleå' },
    { lon: 17.9410, lat: 62.3875, name: 'Sundsvall' },
  ];

  let nearest = points[0];
  let minDistance = calculateDistance(latitude, longitude, nearest.lat, nearest.lon);

  for (const point of points) {
    const distance = calculateDistance(latitude, longitude, point.lat, point.lon);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = point;
    }
  }

  return nearest;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function simplifyWeatherCondition(rawCondition) {
  const lowercaseCondition = rawCondition.toLowerCase();
  
  if (lowercaseCondition.includes('clear') || lowercaseCondition.includes('nearly clear')) {
    return 'sunny';
  }
  if (lowercaseCondition.includes('rain') && !lowercaseCondition.includes('thunder')) {
    return 'rainy';
  }
  if (lowercaseCondition.includes('snow') || lowercaseCondition.includes('sleet')) {
    return 'snowy';
  }
  if (lowercaseCondition.includes('thunder') || lowercaseCondition.includes('storm')) {
    return 'stormy';
  }
  if (lowercaseCondition.includes('cloud') || lowercaseCondition.includes('overcast') || lowercaseCondition.includes('fog')) {
    return 'cloudy';
  }
  
  return WeatherConditions[lowercaseCondition] || 'cloudy';
}

export async function fetchWeatherData(latitude, longitude) {
  try {
    // Find the nearest SMHI weather station point
    const nearestPoint = findNearestSMHIPoint(latitude, longitude);
    
    // SMHI Point Weather API - get current weather
    const weatherUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${nearestPoint.lon}/lat/${nearestPoint.lat}/data.json`;
    
    console.log('Hämtar SMHI väderdata från:', weatherUrl);
    
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error(`SMHI API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Get the most recent forecast (first item in the timeSeries)
    const currentForecast = data.timeSeries[0];
    
    if (!currentForecast) {
      throw new Error('Ingen väderdata tillgänglig från SMHI');
    }
    
    // Extract temperature (parameter "t" - air temperature in Celsius)
    const temperatureParam = currentForecast.parameters.find(p => p.name === 't');
    const temperature = temperatureParam ? Math.round(temperatureParam.values[0]) : null;
    
    // Extract weather symbol (parameter "Wsymb2" - weather symbol)
    const weatherSymbolParam = currentForecast.parameters.find(p => p.name === 'Wsymb2');
    const weatherSymbolCode = weatherSymbolParam ? weatherSymbolParam.values[0] : 1;
    
    // Convert SMHI weather symbol to readable condition
    const rawCondition = SMHI_WEATHER_SYMBOLS[weatherSymbolCode] || 'okända väderförhållanden';
    const condition = simplifyWeatherCondition(rawCondition);
    
    // Get 4-hour forecast
    let forecast4h = null;
    if (data.timeSeries.length >= 5) {
      const forecast4hData = data.timeSeries[4]; // 4 hours from now (each entry is 1 hour)
      const forecast4hTempParam = forecast4hData.parameters.find(p => p.name === 't');
      const forecast4hSymbolParam = forecast4hData.parameters.find(p => p.name === 'Wsymb2');
      
      if (forecast4hSymbolParam) {
        const forecast4hSymbol = forecast4hSymbolParam.values[0];
        const forecast4hRawCondition = SMHI_WEATHER_SYMBOLS[forecast4hSymbol] || 'okända väderförhållanden';
        
        forecast4h = {
          condition: simplifyWeatherCondition(forecast4hRawCondition),
          temperature: forecast4hTempParam ? Math.round(forecast4hTempParam.values[0]) : null,
        };
      }
    }
    
    const weatherData = {
      condition: condition,
      temperature: temperature,
      location: `${nearestPoint.name}, Sweden`,
      forecast4h: forecast4h,
      raw: {
        smhiData: currentForecast,
        weatherSymbol: weatherSymbolCode,
        rawCondition: rawCondition,
        nearestPoint: nearestPoint,
      },
    };

    console.log('SMHI väderdata bearbetad:', weatherData);
    return weatherData;
    
  } catch (error) {
    console.error('SMHI Weather API error:', error);
    
    // Fallback to basic weather if SMHI fails
    throw new Error(`Vädertjänstfel: ${error.message}`);
  }
}

export async function fetchForecastData(latitude, longitude) {
  try {
    const nearestPoint = findNearestSMHIPoint(latitude, longitude);
    
    // Same SMHI API endpoint for forecast data
    const weatherUrl = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${nearestPoint.lon}/lat/${nearestPoint.lat}/data.json`;
    
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      throw new Error(`SMHI API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Get forecast for the next 5 days (take every 24th hour approximately)
    const forecast = [];
    const hoursPerDay = 24;
    
    for (let i = 0; i < 5 && i * hoursPerDay < data.timeSeries.length; i++) {
      const forecastIndex = i * hoursPerDay;
      const dayForecast = data.timeSeries[forecastIndex];
      
      if (dayForecast) {
        const temperatureParam = dayForecast.parameters.find(p => p.name === 't');
        const temperature = temperatureParam ? Math.round(temperatureParam.values[0]) : null;
        
        const weatherSymbolParam = dayForecast.parameters.find(p => p.name === 'Wsymb2');
        const weatherSymbolCode = weatherSymbolParam ? weatherSymbolParam.values[0] : 1;
        const rawCondition = SMHI_WEATHER_SYMBOLS[weatherSymbolCode] || 'okända väderförhållanden';
        
        forecast.push({
          day: i + 1,
          condition: simplifyWeatherCondition(rawCondition),
          temperature: temperature,
          raw: {
            smhiData: dayForecast,
            weatherSymbol: weatherSymbolCode,
            rawCondition: rawCondition,
          },
        });
      }
    }
    
    return forecast;
    
  } catch (error) {
    console.error('SMHI Forecast API error:', error);
    throw error;
  }
}

export default {
  fetchWeatherData,
  fetchForecastData,
};