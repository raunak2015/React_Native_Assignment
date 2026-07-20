import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Header({
  title = "Smart Survey",
  subtitle = "Field Inspection App",
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2563EB",
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  subtitle: {
    color: "#E0F2FE",
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
    opacity: 0.9,
  },
});