import { CameraView as Camera, CameraType, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import React, { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function StormReportScreen() {
  const cameraRef = useRef<Camera | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [notes, setNotes] = useState('');
  const [stormType, setStormType] = useState('');

  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');

 if (!permission) {
    // Permissions are loading
    return <Text>Loading permissions...</Text>;
  }

  if (!permission.granted) {
    // Prompt the user to grant permission
    return (
      <View style={styles.container}>
        <Text style={styles.text}>We need your permission to use the camera</Text>
        <Button title="Grant Permission" onPress={requestPermission} />
      </View>
    );
  }

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
    }
  };


  return (
    <View style={styles.container}>
      {!photoUri ? (
        <Camera style={styles.camera} ref={cameraRef} facing={facing}/>
      ) : (
        <Image source={{ uri: photoUri }} style={styles.photo} />
      )}
      <Button title="Take Photo" onPress={takePhoto} />
      
      {photoUri && (
        <>
          <TextInput
            placeholder="Notes"
            value={notes}
            onChangeText={setNotes}
            style={styles.input}
          />
          <TextInput
            placeholder="Storm Type"
            value={stormType}
            onChangeText={setStormType}
            style={styles.input}
          />
          <View style={styles.metadata}>
            <Text>Date: {new Date().toLocaleString()}</Text>
            {location && (
              <Text>
                Location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </Text>
            )}
            <Text>Notes: {notes}</Text>
            <Text>Storm Type: {stormType}</Text>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  camera: { flex: 1, borderRadius: 8 },
  photo: { width: '100%', height: 400, borderRadius: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
  },
  metadata: { marginTop: 10 },
  text: {
    textAlign: 'center',
    padding: 10,
  },
});
