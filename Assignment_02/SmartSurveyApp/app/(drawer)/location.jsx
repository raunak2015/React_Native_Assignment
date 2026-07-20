import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import * as Clipboard from "expo-clipboard";

export default function LocationScreen() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    try {
      setLoading(true);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Denied",
          "Location permission is required."
        );
        setLoading(false);
        return;
      }

      const currentLocation =
        await Location.getCurrentPositionAsync({});

      setLocation(currentLocation.coords);
    } catch (error) {
      Alert.alert("Error", "Unable to fetch location.");
    }

    setLoading(false);
  };

  useEffect(() => {
    getLocation();
  }, []);

  const copyLocation = async () => {
    if (!location) return;

    const text = `Latitude: ${location.latitude}
Longitude: ${location.longitude}`;

    await Clipboard.setStringAsync(text);

    Alert.alert("Success", "Location copied to clipboard.");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Location Module</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2563EB" />
      ) : location ? (
        <>
          <View style={styles.card}>
            <Text style={styles.label}>
              Latitude
            </Text>

            <Text>{location.latitude}</Text>

            <Text style={styles.label}>
              Longitude
            </Text>

            <Text>{location.longitude}</Text>

            <Text style={styles.label}>
              Accuracy
            </Text>

            <Text>{location.accuracy} meters</Text>
          </View>

          <Pressable
            style={styles.button}
            onPress={getLocation}
          >
            <Text style={styles.buttonText}>
              Refresh Location
            </Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={copyLocation}
          >
            <Text style={styles.buttonText}>
              Copy Location
            </Text>
          </Pressable>
        </>
      ) : (
        <Text>No Location Found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 4,
  },

  label: {
    fontWeight: "bold",
    marginTop: 10,
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});