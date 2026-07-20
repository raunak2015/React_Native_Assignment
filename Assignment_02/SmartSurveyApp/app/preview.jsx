import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSurvey } from "../context/SurveyContext";
import CustomButton from "../components/CustomButton";

export default function PreviewScreen() {
  const { currentSurvey, submitCurrentSurvey } = useSurvey();

  // Handle Edit - go back to survey form
  const handleEdit = () => {
    router.back();
  };

  // Handle Submit - save survey to history
  const handleSubmit = () => {
    // Check if minimum required fields are present
    if (!currentSurvey.siteName || !currentSurvey.clientName) {
      Alert.alert(
        "Incomplete Survey",
        "Please fill in site name and client name before submitting."
      );
      return;
    }

    Alert.alert(
      "Submit Survey",
      "Are you sure you want to submit this survey?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Submit",
          style: "default",
          onPress: async () => {
            const id = await submitCurrentSurvey();
            Alert.alert(
              "✅ Success!",
              `Survey submitted successfully.\nID: ${id}`,
              [
                {
                  text: "OK",
                  onPress: () => router.replace("/(drawer)/(tabs)/history"),
                },
              ]
            );
          },
        },
      ]
    );
  };

  // Get priority color styling
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return { bg: "#FEE2E2", text: "#EF4444" };
      case "Low":
        return { bg: "#E0F2FE", text: "#0284C7" };
      default:
        return { bg: "#FEF3C7", text: "#D97706" };
    }
  };

  const priorityColors = getPriorityColor(currentSurvey.priority);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Survey ID */}
        <View style={styles.idBadge}>
          <Text style={styles.idText}>
            {currentSurvey.id || "New Survey"}
          </Text>
        </View>

        {/* Site Details Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="business-outline" size={20} color="#2563EB" />
            <Text style={styles.cardTitle}>Site Details</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Site Name</Text>
            <Text style={styles.detailValue}>
              {currentSurvey.siteName || "Not set"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Client Name</Text>
            <Text style={styles.detailValue}>
              {currentSurvey.clientName || "Not set"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Description</Text>
            <Text style={styles.detailValue}>
              {currentSurvey.description || "Not set"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Priority</Text>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: priorityColors.bg },
              ]}
            >
              <Text
                style={[
                  styles.priorityBadgeText,
                  { color: priorityColors.text },
                ]}
              >
                {currentSurvey.priority}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>
              {currentSurvey.date || "Not set"}
            </Text>
          </View>
        </View>

        {/* Photo Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="camera-outline" size={20} color="#10B981" />
            <Text style={styles.cardTitle}>Photo</Text>
          </View>

          {currentSurvey.photo ? (
            <>
              <Image
                source={{ uri: currentSurvey.photo }}
                style={styles.image}
              />
              <Text style={styles.captureTime}>
                📸 Captured: {currentSurvey.captureTime}
              </Text>
            </>
          ) : (
            <View style={styles.notSetContainer}>
              <Ionicons name="image-outline" size={40} color="#D1D5DB" />
              <Text style={styles.notSetText}>No photo captured</Text>
            </View>
          )}
        </View>

        {/* Contact Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="person-outline" size={20} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Contact</Text>
          </View>

          {currentSurvey.contact ? (
            <>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name</Text>
                <Text style={styles.detailValue}>
                  {currentSurvey.contact.name}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone</Text>
                <Text style={styles.detailValue}>
                  {currentSurvey.contact.phone}
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.notSetContainer}>
              <Ionicons name="person-outline" size={40} color="#D1D5DB" />
              <Text style={styles.notSetText}>No contact linked</Text>
            </View>
          )}
        </View>

        {/* Location Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={20} color="#EF4444" />
            <Text style={styles.cardTitle}>Location</Text>
          </View>

          {currentSurvey.location ? (
            <>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Latitude</Text>
                <Text style={styles.detailValue}>
                  {currentSurvey.location.latitude?.toFixed(6)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Longitude</Text>
                <Text style={styles.detailValue}>
                  {currentSurvey.location.longitude?.toFixed(6)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Accuracy</Text>
                <Text style={styles.detailValue}>
                  {currentSurvey.location.accuracy?.toFixed(1)} meters
                </Text>
              </View>
            </>
          ) : (
            <View style={styles.notSetContainer}>
              <Ionicons name="location-outline" size={40} color="#D1D5DB" />
              <Text style={styles.notSetText}>No location captured</Text>
            </View>
          )}
        </View>

        {/* Notes Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="document-text-outline" size={20} color="#D97706" />
            <Text style={styles.cardTitle}>Notes</Text>
          </View>

          {currentSurvey.notes && currentSurvey.notes.trim().length > 0 ? (
            <Text style={styles.notesText}>{currentSurvey.notes}</Text>
          ) : (
            <View style={styles.notSetContainer}>
              <Ionicons
                name="document-text-outline"
                size={40}
                color="#D1D5DB"
              />
              <Text style={styles.notSetText}>No notes added</Text>
            </View>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <CustomButton
            title="✏️ Edit Survey"
            onPress={handleEdit}
            type="secondary"
            style={styles.actionBtn}
          />
          <CustomButton
            title="✅ Submit Survey"
            onPress={handleSubmit}
            type="success"
            style={styles.actionBtn}
          />
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
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  idBadge: {
    alignSelf: "center",
    backgroundColor: "#EFF6FF",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  idText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
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
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    flex: 1,
  },
  detailValue: {
    fontSize: 14,
    color: "#1F2937",
    flex: 2,
    textAlign: "right",
    fontWeight: "500",
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityBadgeText: {
    fontSize: 13,
    fontWeight: "600",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 12,
    marginBottom: 8,
  },
  captureTime: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
    fontWeight: "500",
  },
  notSetContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  notSetText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
  },
  notesText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
  },
  actionButtons: {
    marginTop: 10,
  },
  actionBtn: {
    marginVertical: 6,
  },
});
