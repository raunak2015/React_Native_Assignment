import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@expo/vector-icons";
import { useSurvey } from "../../context/SurveyContext";
import CustomButton from "../../components/CustomButton";

export default function ClipboardScreen() {
  const { currentSurvey, updateCurrentSurvey } = useSurvey();

  const [notes, setNotes] = useState(currentSurvey.notes || "");

  // Get values from context (use fallbacks for display)
  const surveyId = currentSurvey.id || "No Survey ID";
  const contactNumber = currentSurvey.contact?.phone || "No Contact Selected";
  const location = currentSurvey.location
    ? `${currentSurvey.location.latitude?.toFixed(6)}, ${currentSurvey.location.longitude?.toFixed(6)}`
    : "No Location Set";

  // Copy text to clipboard
  const copyText = async (text, label) => {
    if (text.startsWith("No ")) {
      Alert.alert("Not Available", `${label} is not set yet.`);
      return;
    }

    await Clipboard.setStringAsync(text);
    Alert.alert("✅ Copied!", `${label} copied to clipboard.`);
  };

  // Paste from clipboard into notes
  const pasteClipboard = async () => {
    const text = await Clipboard.getStringAsync();

    if (!text) {
      Alert.alert("Empty", "Nothing in clipboard to paste.");
      return;
    }

    setNotes(text);
    await updateCurrentSurvey({ notes: text });
  };

  // Save notes to context
  const saveNotes = async () => {
    await updateCurrentSurvey({ notes: notes.trim() });
    Alert.alert("✅ Saved!", "Notes saved to survey draft.");
  };

  // Clear notes
  const clearNotes = async () => {
    setNotes("");
    await updateCurrentSurvey({ notes: "" });
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>📋 Clipboard Module</Text>
      <Text style={styles.subheading}>
        Copy survey data or paste notes from clipboard
      </Text>

      {/* Copy Section */}
      <Text style={styles.sectionTitle}>Copy to Clipboard</Text>

      <View style={styles.copyCard}>
        <View style={styles.copyRow}>
          <View style={styles.copyInfo}>
            <Ionicons name="document-text" size={20} color="#2563EB" />
            <View style={styles.copyTextContainer}>
              <Text style={styles.copyLabel}>Survey ID</Text>
              <Text style={styles.copyValue} numberOfLines={1}>
                {surveyId}
              </Text>
            </View>
          </View>
          <CustomButton
            title="Copy"
            onPress={() => copyText(surveyId, "Survey ID")}
            style={styles.copyBtn}
            textStyle={styles.copyBtnText}
          />
        </View>
      </View>

      <View style={styles.copyCard}>
        <View style={styles.copyRow}>
          <View style={styles.copyInfo}>
            <Ionicons name="call" size={20} color="#10B981" />
            <View style={styles.copyTextContainer}>
              <Text style={styles.copyLabel}>Contact Number</Text>
              <Text style={styles.copyValue} numberOfLines={1}>
                {contactNumber}
              </Text>
            </View>
          </View>
          <CustomButton
            title="Copy"
            onPress={() => copyText(contactNumber, "Contact Number")}
            style={styles.copyBtn}
            textStyle={styles.copyBtnText}
          />
        </View>
      </View>

      <View style={styles.copyCard}>
        <View style={styles.copyRow}>
          <View style={styles.copyInfo}>
            <Ionicons name="location" size={20} color="#EF4444" />
            <View style={styles.copyTextContainer}>
              <Text style={styles.copyLabel}>Location</Text>
              <Text style={styles.copyValue} numberOfLines={1}>
                {location}
              </Text>
            </View>
          </View>
          <CustomButton
            title="Copy"
            onPress={() => copyText(location, "Location")}
            style={styles.copyBtn}
            textStyle={styles.copyBtnText}
          />
        </View>
      </View>

      {/* Notes Section */}
      <Text style={styles.sectionTitle}>Survey Notes</Text>

      <TextInput
        style={styles.notesInput}
        placeholder="Type or paste notes here..."
        placeholderTextColor="#9CA3AF"
        multiline
        value={notes}
        onChangeText={setNotes}
        textAlignVertical="top"
      />

      <View style={styles.notesActions}>
        <CustomButton
          title="📥 Paste from Clipboard"
          onPress={pasteClipboard}
          type="secondary"
          style={styles.notesBtn}
        />
        <CustomButton
          title="💾 Save Notes"
          onPress={saveNotes}
          type="success"
          style={styles.notesBtn}
        />
        <CustomButton
          title="🗑️ Clear Notes"
          onPress={clearNotes}
          type="danger"
          style={styles.notesBtn}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  subheading: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 10,
    marginTop: 10,
  },
  copyCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 2,
  },
  copyRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  copyInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  copyTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  copyLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  copyValue: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1F2937",
    marginTop: 2,
  },
  copyBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginVertical: 0,
    minWidth: 0,
  },
  copyBtnText: {
    fontSize: 13,
  },
  notesInput: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 16,
    minHeight: 140,
    fontSize: 15,
    color: "#1F2937",
    lineHeight: 22,
  },
  notesActions: {
    marginTop: 16,
    marginBottom: 40,
  },
  notesBtn: {
    marginVertical: 5,
  },
});