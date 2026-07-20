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
import { Ionicons } from "@expo/vector-icons";
import { useSurvey } from "../../context/SurveyContext";
import CustomButton from "../../components/CustomButton";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const { currentSurvey, updateCurrentSurvey } = useSurvey();

  const cameraRef = useRef(null);

  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get photo and captureTime from context
  const photo = currentSurvey.photo;
  const captureTime = currentSurvey.captureTime;

  // Show loading spinner then open camera
  const openCamera = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowCamera(true);
    }, 800);
  };

  // Capture photo and save to context
  const takePicture = async () => {
    if (!cameraRef.current) return;

    try {
      const picture = await cameraRef.current.takePictureAsync();
      const time = new Date().toLocaleString();

      // Save photo to global context
      await updateCurrentSurvey({
        photo: picture.uri,
        captureTime: time,
      });

      setShowCamera(false);
    } catch (error) {
      Alert.alert("Error", "Failed to capture photo.");
    }
  };

  // Delete photo with confirmation alert
  const deletePhoto = () => {
    Alert.alert(
      "Delete Photo",
      "Are you sure you want to delete this photo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await updateCurrentSurvey({
              photo: null,
              captureTime: "",
            });
          },
        },
      ]
    );
  };

  // Loading while checking permission
  if (!permission) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Checking camera permissions...</Text>
      </View>
    );
  }

  // Permission request screen
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <View style={styles.permissionIcon}>
          <Ionicons name="camera-outline" size={64} color="#9CA3AF" />
        </View>
        <Text style={styles.permissionTitle}>Camera Permission Required</Text>
        <Text style={styles.permissionDesc}>
          We need camera access to capture site photos for the survey.
        </Text>
        <CustomButton title="Allow Camera" onPress={requestPermission} />
      </View>
    );
  }

  // Full-screen camera view
  if (showCamera) {
    return (
      <View style={{ flex: 1 }}>
        <CameraView style={{ flex: 1 }} ref={cameraRef} />

        <View style={styles.cameraButtons}>
          <Pressable
            style={[styles.cameraBtn, { backgroundColor: "#10B981" }]}
            onPress={takePicture}
          >
            <Ionicons name="camera" size={28} color="#fff" />
          </Pressable>

          <Pressable
            style={[styles.cameraBtn, { backgroundColor: "#EF4444" }]}
            onPress={() => setShowCamera(false)}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </Pressable>
        </View>
      </View>
    );
  }

  // Main preview screen
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📷 Camera Module</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Opening camera...</Text>
        </View>
      ) : photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.image} />

          <View style={styles.timeContainer}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={styles.timeText}>Captured: {captureTime}</Text>
          </View>

          <View style={styles.actionRow}>
            <CustomButton
              title="Retake Photo"
              onPress={openCamera}
              type="secondary"
              style={styles.halfButton}
            />
            <CustomButton
              title="Delete Photo"
              onPress={deletePhoto}
              type="danger"
              style={styles.halfButton}
            />
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="image-outline" size={64} color="#D1D5DB" />
          </View>
          <Text style={styles.noPhotoText}>No photo captured yet</Text>
          <Text style={styles.noPhotoDesc}>
            Take a photo of the survey site
          </Text>
          <CustomButton title="Open Camera" onPress={openCamera} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#F9FAFB",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 20,
    textAlign: "center",
  },
  permissionIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
    textAlign: "center",
  },
  permissionDesc: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#6B7280",
    fontSize: 14,
  },
  previewContainer: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 380,
    borderRadius: 16,
    marginBottom: 16,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  timeText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 12,
  },
  halfButton: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIcon: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  noPhotoText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  noPhotoDesc: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 24,
  },
  cameraButtons: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  cameraBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
});