import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, } from "react-native";
import * as Location from "expo-location";
import { router } from "expo-router";


export default function HomeScreen() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [address, setAddress] = useState("");

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });

    if (!reverseGeocode || reverseGeocode.length === 0) {
      setAddress("Address unavailable");
      return;
    }

    const place = reverseGeocode[0];
    setAddress(
      `${place.street ?? ""}${place.street ? ", " : ""}${place.city ?? ""}${place.city ? ", " : ""}${place.region ?? ""}${place.country ? ", " : ""}${place.country ?? ""}`
    );
  };

  useEffect(() => {
    getLocation();
  }, []);
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Admin</Text>
        <Text style={styles.subtitle}>Employee Attendance</Text>
      </View>

      {/* Date & Time */}
      <View style={styles.card}>
        <Text style={styles.heading}>📅 -Date</Text>
        <Text>19/07/2026</Text>

        <Text style={[styles.heading, { marginTop: 15 }]}>🕒 Time</Text>
        <Text>08:45 PM</Text>
      </View>

      {/* Location */}
      <View style={styles.card}>
        <Text style={styles.heading}>📍 Current Location</Text>

        <Text style={styles.label}>Latitude</Text>
        <Text style={styles.value}>{latitude !== null ? latitude : "Loading..."}</Text>

        <Text style={styles.label}>Longitude</Text>
        <Text style={styles.value}>{longitude !== null ? longitude : "Loading..."}</Text>

        <Text style={styles.label}>Address</Text>
        <Text style={styles.value}>{address || "Waiting for location..."}</Text>
      </View>

      {/* Selfie */}
      <View style={styles.card}>
        <Text style={styles.heading}>📷 Selfie</Text>

        <View style={styles.imagePlaceholder}>
          <Text>No Image</Text>
        </View>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Take Selfie</Text>
        </Pressable>
      </View>

      {/* Map */}
      <View style={styles.card}>
        <Text style={styles.heading}>🗺️ Map</Text>

        <View style={styles.mapPlaceholder}>
          <Text>Map will appear here</Text>
        </View>
      </View>

      {/* Submit */}
      <Pressable style={styles.submitButton}>
        <Text style={styles.submitText}>Submit Attendance</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },

  header: {
    padding: 20,
    alignItems: "center",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E3A8A",
  },

  subtitle: {
    fontSize: 18,
    color: "#666",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginBottom: 18,
    borderRadius: 12,
    padding: 15,
    elevation: 3,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1E3A8A",
  },

  label: {
    fontWeight: "600",
    marginTop: 8,
  },

  value: {
    color: "#555",
    marginTop: 3,
  },

  imagePlaceholder: {
    height: 180,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  mapPlaceholder: {
    height: 220,
    borderWidth: 1,
    borderColor: "#ccc",
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  submitButton: {
    backgroundColor: "#16A34A",
    marginHorizontal: 15,
    marginBottom: 30,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});