import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

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

  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );

  return (
      <LinearGradient
        colors={['#E9F1F7', '#E7DFC6']}
        style={styles.container}
      >      
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
      <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('stormReports');
            setReports([]);
          }}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>Clear All Reports</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  title: { 
    fontSize: 24, fontWeight: 'bold', marginBottom: 16 
  },
  card: { 
    marginBottom: 12,
    padding: 12, 
    borderWidth: 1, 
    borderColor: '#ccc',
    borderRadius: 8, 
    backgroundColor: '#e9f1f7',
  },
    clearButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#623CEA',
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
