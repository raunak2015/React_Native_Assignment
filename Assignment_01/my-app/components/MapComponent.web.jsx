import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MapComponent({ region, style }) {
  return (
    <View style={[style, styles.placeholderContainer]}>
      <Text style={styles.title}>Map View Placeholder (Web)</Text>
      <Text style={styles.subtitle}>
        Coordinates: {region?.latitude?.toFixed(6)}, {region?.longitude?.toFixed(6)}
      </Text>
      <Text style={styles.info}>
        React Native Maps is only supported on native devices (Android/iOS). On the web, this placeholder is shown to prevent crashes.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholderContainer: {
    backgroundColor: "#E2E8F0",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#334155",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#475569",
    marginBottom: 8,
  },
  info: {
    fontSize: 12,
    color: "#64748B",
    textAlign: "center",
  },
});
