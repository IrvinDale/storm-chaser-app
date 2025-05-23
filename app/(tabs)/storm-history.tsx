import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';

type StormReport = {
  photoUri?: string;
  date?: string;
  location?: {
    latitude?: number;
    longitude?: number;
  };
  weather?: {
    temperature?: number;
    windspeed?: number;
  };
  stormType?: string;
  notes?: string;
};

export default function StormHistoryScreen() {
  const [reports, setReports] = useState<StormReport[]>([]);

  useEffect(() => {
    const loadReports = async () => {
      try {
        const stored = await AsyncStorage.getItem('stormReports');
        console.log('Stored reports:', stored);
        if (!stored) {
          console.warn('stormReports in AsyncStorage is empty or not found');
          setReports([]); // No data yet
          return;
        }
        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed)) {
          console.warn('stormReports in AsyncStorage is not an array:', parsed);
          setReports([]);
          return;
        }
        setReports(parsed.reverse()); // Safely reverse if it's an array
      } catch (e) {
        console.error('Failed to load reports', e);
        setReports([]); // Fallback to empty array
      }
    };

    loadReports();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storm History</Text>
      {reports.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#888' }}>
          No storm reports saved yet.
        </Text>
      )}
      <FlatList
        data={reports}
        keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
          <View style={styles.card}>
            {item.photoUri && (
              <Image source={{ uri: item.photoUri }} style={{ height: 200, borderRadius: 8, marginBottom: 8 }} />
            )}
            <Text>Date: {item.date}</Text>
            <Text>Location: {item.location?.latitude}, {item.location?.longitude}</Text>
            <Text>Weather: {item.weather?.temperature}°C, Wind {item.weather?.windspeed} km/h</Text>
            <Text>Storm Type: {item.stormType}</Text>
            <Text>Notes: {item.notes}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  card: { marginBottom: 12, padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8 }
});
