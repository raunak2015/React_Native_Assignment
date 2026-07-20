import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useSurvey } from "../../context/SurveyContext";
import CustomButton from "../../components/CustomButton";

export default function LocationScreen() {
  const { currentSurvey, updateCurrentSurvey } = useSurvey();

  const [location, setLocation] = useState(currentSurvey.location || null);
  const [loading, setLoading] = useState(false);

  // Fetch current location
  const getLocation = async () => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required to use this feature."
        );
        setLoading(false);
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const coords = currentLocation.coords;

      setLocation(coords);

      // Save location to global context
      await updateCurrentSurvey({
        location: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
        },
      });
    } catch (error) {
      Alert.alert("Error", "Unable to fetch location. Please try again.");
    }

    setLoading(false);
  };

  // Load location on screen mount
  useEffect(() => {
    if (!location) {
      getLocation();
    }
  }, []);

  // Copy location coordinates to clipboard
  const copyLocation = async () => {
    if (!location) return;

    const text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;

    await Clipboard.setStringAsync(text);

    Alert.alert("✅ Copied!", "Location coordinates copied to clipboard.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📍 Location Module</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2563EB" />
          <Text style={styles.loadingText}>Fetching your location...</Text>
        </View>
      ) : location ? (
        <View style={styles.contentContainer}>
          {/* Location Card */}
          <View style={styles.card}>
            <View style={styles.coordRow}>
              <View style={styles.coordItem}>
                <Ionicons name="navigate-outline" size={20} color="#2563EB" />
                <Text style={styles.coordLabel}>Latitude</Text>
                <Text style={styles.coordValue}>
                  {location.latitude?.toFixed(6)}
                </Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.coordItem}>
                <Ionicons name="compass-outline" size={20} color="#EF4444" />
                <Text style={styles.coordLabel}>Longitude</Text>
                <Text style={styles.coordValue}>
                  {location.longitude?.toFixed(6)}
                </Text>
              </View>
            </View>

            {/* Accuracy */}
            <View style={styles.accuracyRow}>
              <View style={styles.accuracyBadge}>
                <Ionicons name="radio-outline" size={16} color="#10B981" />
                <Text style={styles.accuracyText}>
                  Accuracy: {location.accuracy?.toFixed(1)} meters
                </Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <CustomButton
            title="🔄 Refresh Location"
            onPress={getLocation}
            type="secondary"
          />

          <CustomButton
            title="📋 Copy Location to Clipboard"
            onPress={copyLocation}
            type="primary"
          />
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIcon}>
            <Ionicons name="location-outline" size={64} color="#D1D5DB" />
          </View>
          <Text style={styles.emptyTitle}>Location Not Available</Text>
          <Text style={styles.emptyDesc}>
            Tap below to fetch your current location
          </Text>
          <CustomButton title="Get Location" onPress={getLocation} />
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
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 24,
    textAlign: "center",
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
  contentContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  coordRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  coordItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  coordLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    marginTop: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  coordValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 60,
    backgroundColor: "#E5E7EB",
  },
  accuracyRow: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 14,
    alignItems: "center",
  },
  accuracyBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  accuracyText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#10B981",
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
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 4,
  },
  emptyDesc: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 24,
  },
});