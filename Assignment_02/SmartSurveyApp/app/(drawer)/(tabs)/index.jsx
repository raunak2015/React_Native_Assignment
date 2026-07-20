import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  FlatList,
} from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSurvey } from "../../../context/SurveyContext";
import Header from "../../../components/Header";
import Card from "../../../components/Card";

export default function Dashboard() {
  const { history } = useSurvey();

  // Get Today's date string
  const todayStr = new Date().toLocaleDateString();

  // Filter history for today's surveys
  const todaysSurveys = history.filter((s) => s.date === todayStr);
  const todayCount = todaysSurveys.length;

  // Get last 3 surveys
  const recentSurveys = history.slice(0, 3);

  const quickActions = [
    {
      id: "camera",
      title: "Camera",
      icon: "camera",
      color: "#3B82F6",
      route: "/camera",
    },
    {
      id: "location",
      title: "Location",
      icon: "location",
      color: "#EF4444",
      route: "/location",
    },
    {
      id: "contacts",
      title: "Contacts",
      icon: "people",
      color: "#10B981",
      route: "/contacts",
    },
    {
      id: "clipboard",
      title: "Clipboard",
      icon: "clipboard",
      color: "#8B5CF6",
      route: "/clipboard",
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header title="Smart Survey" subtitle="Field Inspection & Log" />

      <View style={styles.content}>
        {/* Welcome & Student Details */}
        <Card>
          <View style={styles.studentHeader}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarText}>RS</Text>
            </View>
            <View style={styles.studentInfo}>
              <Text style={styles.studentWelcome}>Welcome Back 👋</Text>
              <Text style={styles.studentName}>Raunak Shahu</Text>
              <Text style={styles.studentMeta}>ID: SUK2500CE063</Text>
              <Text style={styles.studentMeta}>Batch: Computer Engineering</Text>
            </View>
          </View>
        </Card>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { marginRight: 10 }]}>
            <Text style={styles.statLabel}>Today's Surveys</Text>
            <Text style={styles.statCount}>{todayCount}</Text>
          </View>
          <View style={[styles.statBox, { marginLeft: 10 }]}>
            <Text style={styles.statLabel}>Total Surveys</Text>
            <Text style={[styles.statCount, { color: "#10B981" }]}>
              {history.length}
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action) => (
            <Pressable
              key={action.id}
              style={({ pressed }) => [
                styles.actionCard,
                pressed && styles.pressed,
              ]}
              onPress={() => router.push(action.route)}
            >
              <View
                style={[
                  styles.actionIconContainer,
                  { backgroundColor: action.color + "1A" },
                ]}
              >
                <Ionicons name={action.icon} size={28} color={action.color} />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </Pressable>
          ))}
        </View>

        {/* Recent Survey Summary */}
        <Text style={styles.sectionTitle}>Recent Surveys</Text>
        <Card>
          {recentSurveys.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons
                name="document-text-outline"
                size={40}
                color="#9CA3AF"
              />
              <Text style={styles.emptyText}>No surveys submitted yet.</Text>
              <Pressable
                style={styles.createButton}
                onPress={() => router.push("/survey")}
              >
                <Text style={styles.createButtonText}>Start New Survey</Text>
              </Pressable>
            </View>
          ) : (
            recentSurveys.map((item, index) => (
              <Pressable
                key={item.id}
                style={({ pressed }) => [
                  styles.surveyItem,
                  pressed && styles.pressed,
                  index < recentSurveys.length - 1 && styles.borderBottom,
                ]}
                onPress={() =>
                  router.push({
                    pathname: "/details",
                    params: { id: item.id },
                  })
                }
              >
                <View style={styles.surveyItemDetails}>
                  <Text style={styles.surveySiteName} numberOfLines={1}>
                    {item.siteName}
                  </Text>
                  <Text style={styles.surveyClientName} numberOfLines={1}>
                    Client: {item.clientName}
                  </Text>
                </View>
                <View style={styles.surveyItemMeta}>
                  <View
                    style={[
                      styles.priorityBadge,
                      {
                        backgroundColor:
                          item.priority === "High"
                            ? "#FEE2E2"
                            : item.priority === "Low"
                            ? "#E0F2FE"
                            : "#FEF3C7",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityBadgeText,
                        {
                          color:
                            item.priority === "High"
                              ? "#EF4444"
                              : item.priority === "Low"
                              ? "#0284C7"
                              : "#D97706",
                        },
                      ]}
                    >
                      {item.priority}
                    </Text>
                  </View>
                  <Text style={styles.surveyDate}>{item.date}</Text>
                </View>
              </Pressable>
            ))
          )}
        </Card>
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
  studentHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  studentInfo: {
    flex: 1,
  },
  studentWelcome: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  studentName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginVertical: 2,
  },
  studentMeta: {
    fontSize: 13,
    color: "#4B5563",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  statLabel: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "600",
  },
  statCount: {
    fontSize: 32,
    color: "#2563EB",
    fontWeight: "bold",
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginTop: 18,
    marginBottom: 10,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 2,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
  actionIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  emptyState: {
    paddingVertical: 30,
    alignItems: "center",
  },
  emptyText: {
    color: "#6B7280",
    fontSize: 14,
    marginTop: 8,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  surveyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  surveyItemDetails: {
    flex: 1,
    marginRight: 10,
  },
  surveySiteName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#1F2937",
  },
  surveyClientName: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  surveyItemMeta: {
    alignItems: "flex-end",
  },
  priorityBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  priorityBadgeText: {
    fontSize: 10,
    fontWeight: "600",
  },
  surveyDate: {
    fontSize: 11,
    color: "#9CA3AF",
  },
});