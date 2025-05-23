import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

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

export default function StormCard({ report }: { report: StormReport }) {
  return (
    <View style={styles.card}>
      {report.photoUri && (
        <Image source={{ uri: report.photoUri }} style={styles.image} />
      )}
      <Text>Date: {report.date}</Text>
      <Text>
        Location: {report.location?.latitude}, {report.location?.longitude}
      </Text>
      <Text>
        Weather: {report.weather?.temperature}°C, Wind {report.weather?.windspeed} km/h
      </Text>
      <Text>Storm Type: {report.stormType}</Text>
      <Text>Notes: {report.notes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#623cea',
    borderRadius: 8,
  },
  image: {
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
});
