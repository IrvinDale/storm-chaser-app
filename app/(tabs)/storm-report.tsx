import { CameraView as Camera, CameraType, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { useRef, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function StormReportScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [stormType, setStormType] = useState('');
  const cameraRef = useRef<Camera | null>(null);

  const getWeather = async (lat: number, lon: number) => {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const data = await res.json();
      setWeather(data.current_weather);
    } catch (err) {
      Alert.alert("Weather API failed");
    }
  };
 
  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);

      await getWeather(loc.coords.latitude, loc.coords.longitude);
    }
  };

  const submitReport = () => {
    if (!photoUri) return Alert.alert("No photo taken");

    const report = {
      photoUri,
      location,
      weather,
      notes,
      stormType,
      timestamp: new Date().toISOString()
    };

    console.log("📤 Submitted report:", report);
    Alert.alert("Report submitted successfully!");

    // Reset form
    setPhotoUri(null);
    setNotes('');
    setStormType('');
    setLocation(null);
    setWeather(null);
  };

  if (!permission) return <Text>Loading permissions...</Text>;
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Camera permission needed</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {!photoUri ? (
        <Camera style={styles.camera} facing={facing} ref={cameraRef}>
          <TouchableOpacity style={styles.flipButton} onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}>
            <Text style={styles.text}>Flip</Text>
          </TouchableOpacity>
        </Camera>
      ) : (
        <Image source={{ uri: photoUri }} style={styles.image} />
      )}

      <TouchableOpacity style={styles.button} onPress={takePhoto}>
        <Text style={styles.text}>Take Photo</Text>
      </TouchableOpacity>

      {photoUri && (
     <View style={styles.metadata}>
          <TextInput
            placeholder="Notes about the storm..."
            value={notes}
            onChangeText={setNotes}
            style={styles.input}
          />
          <TextInput
            placeholder="Storm Type (e.g., Thunderstorm)"
            value={stormType}
            onChangeText={setStormType}
            style={styles.input}
          />
          <Text style={styles.label}>Date: {new Date().toLocaleString()}</Text>
          {location && <Text>Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</Text>}
          {weather && (
            <Text>
              Temp: {weather.temperature}°C | Wind: {weather.windspeed} km/h
            </Text>
          )}
          <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
            <Text style={styles.text}>Submit Report</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40
  },
  camera: {
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12
  },
  image: {
    height: 400,
    borderRadius: 12,
    marginBottom: 12
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: '#34C759',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  flipButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#00000088',
    padding: 10,
    borderRadius: 8
  },
  text: {
    color: '#fff',
    fontWeight: 'bold'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 6
  },
  metadata: {
    marginTop: 10
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10
  }
});