import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SurveyCard({ item, onPress, onDelete }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return { bg: "#FEE2E2", text: "#EF4444" };
      case "Low":
        return { bg: "#E0F2FE", text: "#0284C7" };
      case "Medium":
      default:
        return { bg: "#FEF3C7", text: "#D97706" };
    }
  };

  const priorityColors = getPriorityColor(item.priority);

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.siteName} numberOfLines={1}>
            {item.siteName}
          </Text>
          <Text style={styles.clientName} numberOfLines={1}>
            Client: {item.clientName}
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            { backgroundColor: priorityColors.bg },
          ]}
        >
          <Text style={[styles.badgeText, { color: priorityColors.text }]}>
            {item.priority}
          </Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <View style={styles.infoRow}>
          <Ionicons name="calendar-outline" size={14} color="#6B7280" />
          <Text style={styles.dateText}>{item.date}</Text>

          {/* Asset Attachment Indicators */}
          <View style={styles.assetsContainer}>
            {item.photo && (
              <Ionicons
                name="image"
                size={14}
                color="#10B981"
                style={styles.assetIcon}
              />
            )}
            {item.location && (
              <Ionicons
                name="pin"
                size={14}
                color="#EF4444"
                style={styles.assetIcon}
              />
            )}
            {item.contact && (
              <Ionicons
                name="person"
                size={14}
                color="#3B82F6"
                style={styles.assetIcon}
              />
            )}
            {item.notes && item.notes.trim().length > 0 && (
              <Ionicons
                name="document-text"
                size={14}
                color="#8B5CF6"
                style={styles.assetIcon}
              />
            )}
          </View>
        </View>

        {onDelete && (
          <Pressable
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.deletePressed,
            ]}
            onPress={(e) => {
              e.stopPropagation(); // Avoid triggering onPress
              onDelete(item.id);
            }}
          >
            <Ionicons name="trash-outline" size={18} color="#EF4444" />
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    marginRight: 10,
  },
  siteName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 2,
  },
  clientName: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#4B5563",
    lineHeight: 20,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginBottom: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dateText: {
    fontSize: 13,
    color: "#6B7280",
    marginLeft: 4,
    fontWeight: "500",
  },
  assetsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  assetIcon: {
    marginLeft: 6,
  },
  deleteButton: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: "#FEE2E2",
  },
  deletePressed: {
    backgroundColor: "#FCA5A5",
  },
});
