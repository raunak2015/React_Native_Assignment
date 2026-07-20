import React from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSurvey } from "../../context/SurveyContext";
import CustomButton from "../../components/CustomButton";

export default function Settings() {
  const { history, resetAllData } = useSurvey();

  // Clear all data with confirmation
  const handleClearData = () => {
    Alert.alert(
      "Clear All Data",
      "This will delete all survey history and current draft. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await resetAllData();
            Alert.alert("✅ Done", "All survey data has been cleared.");
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>⚙️ Settings</Text>

      {/* App Info Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons
            name="information-circle-outline"
            size={22}
            color="#2563EB"
          />
          <Text style={styles.cardTitle}>App Information</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>App Name</Text>
          <Text style={styles.infoValue}>Smart Survey App</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Framework</Text>
          <Text style={styles.infoValue}>React Native + Expo</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Assignment</Text>
          <Text style={styles.infoValue}>Assignment 02</Text>
        </View>
      </View>

      {/* Data Management Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="server-outline" size={22} color="#EF4444" />
          <Text style={styles.cardTitle}>Data Management</Text>
        </View>

        <View style={styles.dataInfo}>
          <View style={styles.dataRow}>
            <Ionicons name="folder-outline" size={18} color="#6B7280" />
            <Text style={styles.dataText}>
              Total surveys stored: {history.length}
            </Text>
          </View>
        </View>

        <CustomButton
          title="🗑️ Clear All Survey Data"
          onPress={handleClearData}
          type="danger"
          style={styles.clearBtn}
        />

        <Text style={styles.warningText}>
          ⚠️ This will permanently delete all saved surveys and the current
          draft.
        </Text>
      </View>

      {/* Developer Info Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Ionicons name="code-slash-outline" size={22} color="#10B981" />
          <Text style={styles.cardTitle}>Developer</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>Raunak Shahu</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ID</Text>
          <Text style={styles.infoValue}>SUK2500CE063</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Branch</Text>
          <Text style={styles.infoValue}>Computer Engineering</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#F9FAFB",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
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
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
  },
  infoValue: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  dataInfo: {
    marginBottom: 14,
  },
  dataRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  dataText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4B5563",
    fontWeight: "500",
  },
  clearBtn: {
    marginTop: 4,
  },
  warningText: {
    fontSize: 12,
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 18,
  },
});