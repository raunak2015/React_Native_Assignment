import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  const cameraRef = useRef(null);

  const [showCamera, setShowCamera] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [captureTime, setCaptureTime] = useState("");
  const [loading, setLoading] = useState(false);

  // Camera Loading
  const openCamera = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowCamera(true);
    }, 800);
  };

  // Capture Photo
  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const picture = await cameraRef.current.takePictureAsync();

      setPhoto(picture.uri);
      setCaptureTime(new Date().toLocaleString());

      setShowCamera(false);
    } catch (error) {
      Alert.alert("Error", "Failed to capture photo.");
    }
  };

  // Delete Photo
  const deletePhoto = () => {
    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this photo?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setPhoto(null);
            setCaptureTime("");
          },
        },
      ]
    );
  };

  // Loading while checking permission
  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Permission Screen
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Camera Permission Required</Text>

        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow Camera</Text>
        </Pressable>
      </View>
    );
  }

  // Camera Screen
  if (showCamera) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView
          style={{ flex: 1 }}
          ref={cameraRef}
        />

        <View style={styles.cameraButtons}>
          <Pressable
            style={[styles.button, { backgroundColor: "green" }]}
            onPress={takePicture}
          >
            <Text style={styles.buttonText}>Capture</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={() => setShowCamera(false)}
          >
            <Text style={styles.buttonText}>Close</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Preview Screen
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Camera Module</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" />
      ) : photo ? (
        <>
          <Image
            source={{ uri: photo }}
            style={styles.image}
          />

          <Text style={styles.time}>
            Captured: {captureTime}
          </Text>

          <Pressable
            style={styles.button}
            onPress={openCamera}
          >
            <Text style={styles.buttonText}>Retake Photo</Text>
          </Pressable>

          <Pressable
            style={[styles.button, { backgroundColor: "red" }]}
            onPress={deletePhoto}
          >
            <Text style={styles.buttonText}>Delete Photo</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.noPhoto}>
            No photo captured
          </Text>

          <Pressable
            style={styles.button}
            onPress={openCamera}
          >
            <Text style={styles.buttonText}>Open Camera</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  noPhoto: {
    fontSize: 18,
    marginBottom: 20,
    color: "gray",
  },

  image: {
    width: 320,
    height: 420,
    borderRadius: 15,
    marginBottom: 20,
  },

  time: {
    marginBottom: 20,
    fontSize: 15,
    fontWeight: "500",
  },

  button: {
    backgroundColor: "#2563EB",
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
    minWidth: 180,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  cameraButtons: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});