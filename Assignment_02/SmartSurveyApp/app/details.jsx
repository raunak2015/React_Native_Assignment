import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSurvey } from "../context/SurveyContext";
import CustomButton from "../components/CustomButton";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const { history } = useSurvey();

  // Find the survey in history by ID
  const survey = history.find((item) => item.id === id);

  // If survey is not found, show a message
  if (!survey) {
    return (
      <View style={styles.notFound}>
        <Ionicons name="alert-circle-outline" size={64} color="#D1D5DB" />
        <Text style={styles.notFoundTitle}>Survey Not Found</Text>
        <Text style={styles.notFoundDesc}>
          This survey may have been deleted.
        </Text>
        <CustomButton title="Go Back" onPress={() => router.back()} />
      </View>
    );
  }

  // Get priority color
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

  const priorityColors = getPriorityColor(survey.priority);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Survey ID Badge */}
        <View style={styles.idBadge}>
          <Text style={styles.idText}>{survey.id}</Text>
        </View>

        {/* Site Details */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="business-outline" size={20} color="#2563EB" />
            <Text style={styles.cardTitle}>Site Details</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Site Name</Text>
            <Text style={styles.detailValue}>{survey.siteName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Client</Text>
            <Text style={styles.detailValue}>{survey.clientName}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Description</Text>
            <Text style={styles.detailValue}>{survey.description}</Text>
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
                {survey.priority}
              </Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date</Text>
            <Text style={styles.detailValue}>{survey.date}</Text>
          </View>
        </View>

        {/* Photo Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="camera-outline" size={20} color="#10B981" />
            <Text style={styles.cardTitle}>Photo</Text>
          </View>

          {survey.photo ? (
            <>
              <Image source={{ uri: survey.photo }} style={styles.image} />
              {survey.captureTime && (
                <Text style={styles.captureTime}>
                  📸 {survey.captureTime}
                </Text>
              )}
            </>
          ) : (
            <View style={styles.emptySection}>
              <Ionicons name="image-outline" size={40} color="#D1D5DB" />
              <Text style={styles.emptyText}>No photo attached</Text>
            </View>
          )}
        </View>

        {/* Contact Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="person-outline" size={20} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Contact</Text>
          </View>

          {survey.contact ? (
            <>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Name</Text>
                <Text style={styles.detailValue}>{survey.contact.name}</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Phone</Text>
                <Text style={styles.detailValue}>{survey.contact.phone}</Text>
              </View>
            </>
          ) : (
            <View style={styles.emptySection}>
              <Ionicons name="person-outline" size={40} color="#D1D5DB" />
              <Text style={styles.emptyText}>No contact linked</Text>
            </View>
          )}
        </View>

        {/* Location Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={20} color="#EF4444" />
            <Text style={styles.cardTitle}>Location</Text>
          </View>

          {survey.location ? (
            <>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Latitude</Text>
                <Text style={styles.detailValue}>
                  {survey.location.latitude?.toFixed(6)}
                </Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Longitude</Text>
                <Text style={styles.detailValue}>
                  {survey.location.longitude?.toFixed(6)}
                </Text>
              </View>
              {survey.location.accuracy && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Accuracy</Text>
                  <Text style={styles.detailValue}>
                    {survey.location.accuracy?.toFixed(1)} meters
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.emptySection}>
              <Ionicons name="location-outline" size={40} color="#D1D5DB" />
              <Text style={styles.emptyText}>No location data</Text>
            </View>
          )}
        </View>

        {/* Notes Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons
              name="document-text-outline"
              size={20}
              color="#D97706"
            />
            <Text style={styles.cardTitle}>Notes</Text>
          </View>

          {survey.notes && survey.notes.trim().length > 0 ? (
            <Text style={styles.notesText}>{survey.notes}</Text>
          ) : (
            <View style={styles.emptySection}>
              <Ionicons
                name="document-text-outline"
                size={40}
                color="#D1D5DB"
              />
              <Text style={styles.emptyText}>No notes</Text>
            </View>
          )}
        </View>

        {/* Back Button */}
        <CustomButton
          title="← Back to History"
          onPress={() => router.back()}
          type="secondary"
          style={{ marginBottom: 30 }}
        />
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
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#F9FAFB",
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  notFoundDesc: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 24,
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
  emptySection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 8,
  },
  notesText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
  },
});
