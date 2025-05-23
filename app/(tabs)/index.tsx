import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


type Weather = {
  temperature: number;
  windSpeed: number;
  precipitation: number;
};

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  // fetch weather data
  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError('');
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      const { latitude, longitude } = currentLocation.coords;

      // Fetch weather data from Open Meteo API
      // Use the latitude and longitude from the location object
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,windspeed_10m&current_weather=true&timezone=auto`
      );
      const data = await response.json();

      // Check if the response is ok
      // If the response is ok, set the weather data
      if (response.ok && data.current_weather && data.hourly) {
        const currentTime = data.current_weather.time; // e.g., "2025-05-23T17:00"
        const index = data.hourly.time.indexOf(currentTime);
        const precipitation = index !== -1 ? data.hourly.precipitation[index] : 0;
        setWeather({
          temperature: data.current_weather.temperature,
          windSpeed: data.current_weather.windspeed,
          precipitation,
        });
      }

      setLoading(false);
      // If the response is not ok, set the error message
      if (!response.ok) {
        setError('Error fetching weather data');
      }

    } catch (error) { 
      setError('Error fetching location');
      console.error('Error fetching location:', error);
      return;
    }
  };

  // Call the fetchWeather function when the component mounts
  useEffect(() => {
    fetchWeather();
  }, []);

  // Fade in animation
  useEffect(() => {
  if (!loading && !error) {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  } else {
    fadeAnim.setValue(0); // Reset for re-run
  }
}, [loading, error]);

    if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#623CEA" />
        <Text style={styles.loadingText}>Fetching weather data...</Text>
      </View>
    );
  }




  return (
    <LinearGradient
      colors={['#E9F1F7', '#E7DFC6']}
      style={styles.container}
    >      
    <Animated.View style={{ opacity: fadeAnim, width: '100%', alignItems: 'center' }}>
        <Text style={styles.title}>Storm Chaser</Text>
        <Text style={styles.header}>Current Weather</Text>
        {weather ? (
          <>
            <Text style={styles.label}>Temperature: {weather.temperature}°C</Text>
            <Text style={styles.label}>Wind Speed: {weather.windSpeed} km/h</Text>
            <Text style={styles.label}>Precipitation: {weather.precipitation} mm</Text>
          </>
        ) : (
          <Text style={styles.label}>No weather data available.</Text>
        )}
        <TouchableOpacity style={styles.refreshButton} onPress={fetchWeather}>
          <Text style={styles.refreshText}>Refresh</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#623CEA',
    marginBottom: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '600', // updated from 400
    marginBottom: 20,
    color: '#54426B',  // use palette
  },
  label: {
    fontSize: 18,
    marginVertical: 6,
    color: '#333',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
  },
  refreshButton: {
  backgroundColor: '#623CEA',
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderRadius: 8,
  marginTop: 24,
},
refreshText: {
  color: '#E9F1F7',
  fontWeight: '600',
  fontSize: 16,
},
});
