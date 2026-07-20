import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  RefreshControl,
  Alert,
} from "react-native";
import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useSurvey } from "../../context/SurveyContext";
import ContactItem from "../../components/ContactItem";
import EmptyState from "../../components/EmptyState";

export default function ContactsScreen() {
  const { currentSurvey, updateCurrentSurvey } = useSurvey();

  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState(
    currentSurvey.contact?.id || null
  );

  // Load contacts from the device
  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Contacts permission is required to use this feature."
      );
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });

    setContacts(data);
    setFilteredContacts(data);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  // Search/filter contacts by name
  const searchContact = (text) => {
    setSearch(text);

    if (text.trim() === "") {
      setFilteredContacts(contacts);
      return;
    }

    const filtered = contacts.filter((item) =>
      item.name?.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  // Pull to refresh contacts list
  const refresh = async () => {
    setRefreshing(true);
    await loadContacts();
    setSearch("");
    setRefreshing(false);
  };

  // Copy phone number to clipboard
  const copyNumber = async (number) => {
    if (!number) {
      Alert.alert("No Number", "This contact has no phone number.");
      return;
    }

    await Clipboard.setStringAsync(number);
    Alert.alert("✅ Copied!", "Phone number copied to clipboard.");
  };

  // Select a contact and save to survey context
  const selectContact = async (item) => {
    const phone =
      item.phoneNumbers?.length > 0 ? item.phoneNumbers[0].number : null;

    setSelectedId(item.id);

    await updateCurrentSurvey({
      contact: {
        id: item.id,
        name: item.name,
        phone: phone || "No Number",
      },
    });

    Alert.alert(
      "Contact Selected",
      `${item.name} has been linked to this survey.`
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👥 Contacts</Text>

      {/* Contact Counter */}
      <View style={styles.counterRow}>
        <View style={styles.counterBadge}>
          <Ionicons name="people" size={16} color="#2563EB" />
          <Text style={styles.counterText}>
            {filteredContacts.length} contacts
          </Text>
        </View>
        {selectedId && (
          <View style={styles.selectedBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#10B981" />
            <Text style={styles.selectedText}>Contact linked</Text>
          </View>
        )}
      </View>

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#9CA3AF" />
        <TextInput
          placeholder="Search contacts..."
          value={search}
          onChangeText={searchContact}
          style={styles.searchInput}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Contacts List or Empty State */}
      {filteredContacts.length === 0 ? (
        <EmptyState
          icon="people-outline"
          title="No Contacts Found"
          description={
            search
              ? `No contacts match "${search}"`
              : "Pull down to refresh the contacts list."
          }
        />
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ContactItem
              item={item}
              onCopy={copyNumber}
              onSelect={() => selectContact(item)}
              isSelected={selectedId === item.id}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
              tintColor="#2563EB"
            />
          }
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
    marginBottom: 12,
  },
  counterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  counterBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EFF6FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  counterText: {
    marginLeft: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#2563EB",
  },
  selectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ECFDF5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  selectedText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "600",
    color: "#10B981",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
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
    fontSize: 16,
    color: "#1F2937",
  },
});