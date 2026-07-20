import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSurvey } from "../../../context/SurveyContext";

export default function Profile() {
  const { history } = useSurvey();

  const todayStr = new Date().toLocaleDateString();
  const todayCount = history.filter((s) => s.date === todayStr).length;
  const highPriorityCount = history.filter(
    (s) => s.priority === "High"
  ).length;

  const stats = [
    {
      label: "Total Surveys",
      value: history.length,
      icon: "document-text",
      color: "#2563EB",
      bg: "#EFF6FF",
    },
    {
      label: "Today's Surveys",
      value: todayCount,
      icon: "today",
      color: "#10B981",
      bg: "#ECFDF5",
    },
    {
      label: "High Priority",
      value: highPriorityCount,
      icon: "alert-circle",
      color: "#EF4444",
      bg: "#FEF2F2",
    },
    {
      label: "With Photos",
      value: history.filter((s) => s.photo).length,
      icon: "camera",
      color: "#8B5CF6",
      bg: "#F5F3FF",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>RS</Text>
        </View>
        <Text style={styles.name}>Raunak Shahu</Text>
        <Text style={styles.subtitle}>Field Survey Inspector</Text>
      </View>

      {/* Student Details Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="school-outline" size={20} color="#2563EB" />
          <Text style={styles.cardTitle}>Student Details</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Full Name</Text>
          <Text style={styles.detailValue}>Raunak Shahu</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Student ID</Text>
          <Text style={styles.detailValue}>SUK2500CE063</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Batch</Text>
          <Text style={styles.detailValue}>Computer Engineering</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Assignment</Text>
          <Text style={styles.detailValue}>Assignment 02</Text>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="stats-chart-outline" size={20} color="#10B981" />
          <Text style={styles.cardTitle}>Survey Statistics</Text>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <View style={[styles.statIcon, { backgroundColor: stat.bg }]}>
                <Ionicons name={stat.icon} size={22} color={stat.color} />
              </View>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* App Info Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons
            name="information-circle-outline"
            size={20}
            color="#6B7280"
          />
          <Text style={styles.cardTitle}>App Info</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>App Name</Text>
          <Text style={styles.detailValue}>Smart Survey App</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Version</Text>
          <Text style={styles.detailValue}>1.0.0</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Built With</Text>
          <Text style={styles.detailValue}>React Native + Expo</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "#2563EB",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563EB",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 14,
    color: "#BFDBFE",
    marginTop: 4,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginLeft: 8,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  detailValue: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    paddingVertical: 14,
    marginBottom: 8,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
    fontWeight: "500",
  },
});