import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ContactItem({
  item,
  onCopy,
  onSelect,
  isSelected = false,
}) {
  const phone =
    item.phoneNumbers?.length > 0 ? item.phoneNumbers[0].number : null;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        isSelected && styles.selectedCard,
        pressed && styles.pressed,
      ]}
      onPress={onSelect}
    >
      <View style={[styles.avatar, isSelected && styles.selectedAvatar]}>
        {isSelected ? (
          <Ionicons name="checkmark" size={20} color="#fff" />
        ) : (
          <Text style={styles.avatarText}>
            {item.name ? item.name.charAt(0).toUpperCase() : "?"}
          </Text>
        )}
      </View>

      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.phone} numberOfLines={1}>
          {phone ? phone : "No Number"}
        </Text>
      </View>

      <View style={styles.actions}>
        {phone && onCopy && (
          <Pressable
            style={styles.copyButton}
            onPress={(e) => {
              e.stopPropagation(); // Avoid triggering selection
              onCopy(phone);
            }}
          >
            <Ionicons name="copy-outline" size={16} color="#2563EB" />
            <Text style={styles.copyButtonText}>Copy</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  selectedCard: {
    borderColor: "#3B82F6",
    backgroundColor: "#EFF6FF",
  },
  pressed: {
    opacity: 0.9,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#3B82F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  selectedAvatar: {
    backgroundColor: "#10B981",
  },
  avatarText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  details: {
    flex: 1,
    justifyContent: "center",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    color: "#1F2937",
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: "#6B7280",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  copyButtonText: {
    color: "#2563EB",
    fontWeight: "600",
    fontSize: 12,
    marginLeft: 4,
  },
});
