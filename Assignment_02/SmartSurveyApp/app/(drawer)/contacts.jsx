import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Pressable,
  RefreshControl,
  Alert,
} from "react-native";
import * as Contacts from "expo-contacts";
import * as Clipboard from "expo-clipboard";

export default function ContactsScreen() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const loadContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission Denied", "Contacts permission is required.");
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

  const searchContact = (text) => {
    setSearch(text);

    const filtered = contacts.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredContacts(filtered);
  };

  const refresh = async () => {
    setRefreshing(true);
    await loadContacts();
    setRefreshing(false);
  };

  const copyNumber = async (number) => {
    if (!number) {
      Alert.alert("No Number", "This contact has no phone number.");
      return;
    }

    await Clipboard.setStringAsync(number);

    Alert.alert("Copied", "Phone number copied.");
  };

  const renderItem = ({ item }) => {
    const phone =
      item.phoneNumbers?.length > 0
        ? item.phoneNumbers[0].number
        : null;

    return (
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.name}</Text>

          <Text>
            {phone ? phone : "No Number"}
          </Text>
        </View>

        <Pressable
          style={styles.copyButton}
          onPress={() => copyNumber(phone)}
        >
          <Text style={{ color: "#fff" }}>Copy</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Contacts</Text>

      <Text style={styles.counter}>
        Total Contacts: {filteredContacts.length}
      </Text>

      <TextInput
        placeholder="Search Contact"
        value={search}
        onChangeText={searchContact}
        style={styles.input}
      />

      {filteredContacts.length === 0 ? (
        <View style={styles.empty}>
          <Text>No Contacts Found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredContacts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={refresh}
            />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#F5F5F5",
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  counter: {
    marginBottom: 10,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
  },

  copyButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});