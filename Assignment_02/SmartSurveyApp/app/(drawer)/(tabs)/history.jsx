import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { FlatList } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSurvey } from "../../../context/SurveyContext";
import SurveyCard from "../../../components/SurveyCard";
import EmptyState from "../../../components/EmptyState";

export default function History() {
  const { history, deleteSurvey } = useSurvey();

  const [search, setSearch] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");

  const filters = ["All", "High", "Medium", "Low"];

  // Apply search and priority filter
  const filteredHistory = history.filter((item) => {
    // Priority filter
    const matchesPriority =
      selectedFilter === "All" || item.priority === selectedFilter;

    // Search filter (search by site name or client name)
    const matchesSearch =
      search.trim() === "" ||
      item.siteName?.toLowerCase().includes(search.toLowerCase()) ||
      item.clientName?.toLowerCase().includes(search.toLowerCase());

    return matchesPriority && matchesSearch;
  });

  // Delete survey with confirmation
  const handleDelete = (id) => {
    Alert.alert(
      "Delete Survey",
      "Are you sure you want to delete this survey? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteSurvey(id),
        },
      ]
    );
  };

  // Navigate to survey detail
  const handleViewDetails = (item) => {
    router.push({
      pathname: "/details",
      params: { id: item.id },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📜 Survey History</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="Search by site or client name..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
          placeholderTextColor="#9CA3AF"
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch("")}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </Pressable>
        )}
      </View>

      {/* Priority Filter Tabs */}
      <View style={styles.filterRow}>
        {filters.map((filter) => (
          <Pressable
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && styles.filterTabActive,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive,
              ]}
            >
              {filter}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Results Count */}
      <Text style={styles.resultCount}>
        {filteredHistory.length} survey{filteredHistory.length !== 1 ? "s" : ""}{" "}
        found
      </Text>

      {/* Survey List */}
      {filteredHistory.length === 0 ? (
        <EmptyState
          icon="folder-open-outline"
          title="No Surveys Found"
          description={
            search || selectedFilter !== "All"
              ? "Try adjusting your search or filter criteria."
              : "Start by creating a new survey from the Survey tab."
          }
          actionTitle={
            search || selectedFilter !== "All" ? "Clear Filters" : undefined
          }
          onAction={
            search || selectedFilter !== "All"
              ? () => {
                  setSearch("");
                  setSelectedFilter("All");
                }
              : undefined
          }
        />
      ) : (
        <FlatList
          data={filteredHistory}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SurveyCard
              item={item}
              onPress={() => handleViewDetails(item)}
              onDelete={handleDelete}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
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
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: "#1F2937",
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 8,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterTabActive: {
    backgroundColor: "#2563EB",
    borderColor: "#2563EB",
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },
  filterTextActive: {
    color: "#ffffff",
  },
  resultCount: {
    fontSize: 13,
    fontWeight: "500",
    color: "#9CA3AF",
    marginBottom: 8,
  },
});