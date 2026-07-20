import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { useSurvey } from "../../../context/SurveyContext";
import Input from "../../../components/Input";
import CustomButton from "../../../components/CustomButton";

export default function Survey() {
  const { currentSurvey, updateCurrentSurvey } = useSurvey();

  // Local form state (initialized from context)
  const [siteName, setSiteName] = useState(currentSurvey.siteName || "");
  const [clientName, setClientName] = useState(currentSurvey.clientName || "");
  const [description, setDescription] = useState(
    currentSurvey.description || ""
  );
  const [priority, setPriority] = useState(currentSurvey.priority || "Medium");

  // Validation error messages
  const [errors, setErrors] = useState({});

  const date = new Date().toLocaleDateString();

  // Validate required fields
  const validate = () => {
    const newErrors = {};

    if (!siteName.trim()) {
      newErrors.siteName = "Site name is required";
    }
    if (!clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }
    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next button press
  const handleNext = async () => {
    if (!validate()) {
      Alert.alert("Validation Error", "Please fill all required fields.");
      return;
    }

    // Save form data to global context
    await updateCurrentSurvey({
      id: currentSurvey.id || `SURVEY-${Date.now()}`,
      siteName: siteName.trim(),
      clientName: clientName.trim(),
      description: description.trim(),
      priority,
      date,
    });

    // Navigate to preview screen
    router.push("/preview");
  };

  const priorities = ["High", "Medium", "Low"];

  const getPriorityStyle = (item) => {
    const isSelected = priority === item;
    switch (item) {
      case "High":
        return {
          bg: isSelected ? "#EF4444" : "#FEE2E2",
          text: isSelected ? "#fff" : "#EF4444",
        };
      case "Low":
        return {
          bg: isSelected ? "#0284C7" : "#E0F2FE",
          text: isSelected ? "#fff" : "#0284C7",
        };
      case "Medium":
      default:
        return {
          bg: isSelected ? "#D97706" : "#FEF3C7",
          text: isSelected ? "#fff" : "#D97706",
        };
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerSection}>
        <Text style={styles.title}>Create New Survey</Text>
        <Text style={styles.subtitle}>
          Fill in the details below to start a new field survey
        </Text>
      </View>

      <View style={styles.formContainer}>
        {/* Site Name Input */}
        <Input
          label="Site Name *"
          placeholder="Enter site name"
          value={siteName}
          onChangeText={(text) => {
            setSiteName(text);
            if (errors.siteName) {
              setErrors({ ...errors, siteName: null });
            }
          }}
          error={errors.siteName}
        />

        {/* Client Name Input */}
        <Input
          label="Client Name *"
          placeholder="Enter client name"
          value={clientName}
          onChangeText={(text) => {
            setClientName(text);
            if (errors.clientName) {
              setErrors({ ...errors, clientName: null });
            }
          }}
          error={errors.clientName}
        />

        {/* Description Input */}
        <Input
          label="Description *"
          placeholder="Describe the survey purpose..."
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            if (errors.description) {
              setErrors({ ...errors, description: null });
            }
          }}
          multiline
          numberOfLines={4}
          error={errors.description}
        />

        {/* Priority Selector */}
        <Text style={styles.label}>Priority</Text>
        <View style={styles.priorityContainer}>
          {priorities.map((item) => {
            const colorStyle = getPriorityStyle(item);
            return (
              <Pressable
                key={item}
                style={[
                  styles.priorityButton,
                  { backgroundColor: colorStyle.bg },
                ]}
                onPress={() => setPriority(item)}
              >
                <Text
                  style={[styles.priorityText, { color: colorStyle.text }]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Date Display */}
        <View style={styles.dateRow}>
          <Text style={styles.label}>Date</Text>
          <View style={styles.dateBadge}>
            <Text style={styles.dateText}>{date}</Text>
          </View>
        </View>

        {/* Next Button */}
        <CustomButton
          title="Next →"
          onPress={handleNext}
          style={styles.nextButton}
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
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
    marginTop: 10,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  priorityText: {
    fontWeight: "600",
    fontSize: 14,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 10,
  },
  dateBadge: {
    backgroundColor: "#EFF6FF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DBEAFE",
  },
  dateText: {
    fontSize: 15,
    color: "#2563EB",
    fontWeight: "600",
  },
  nextButton: {
    marginTop: 20,
    marginBottom: 40,
  },
});