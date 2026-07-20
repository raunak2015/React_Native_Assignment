import React, { useState } from "react";
import {
    View, Text, TextInput, StyleSheet, Pressable, Alert, ScrollView,
} from "react-native";
import { router } from "expo-router";

export default function Survey() {
    const [siteName, setSiteName] = useState("");
    const [clientName, setClientName] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");

    const date = new Date().toLocaleDateString();

    const handleNext = () => {
        if (!siteName || !clientName || !description) {
            Alert.alert("Validation", "Please fill all required fields.");
            return;
        }

        Alert.alert("Success", "Survey details saved!");
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Create New Survey</Text>

            <Text style={styles.label}>Site Name</Text>

            <TextInput
                placeholder="Enter Site Name"
                value={siteName}
                onChangeText={setSiteName}
                style={styles.input}
            />

            <Text style={styles.label}>Client Name</Text>

            <TextInput
                placeholder="Enter Client Name"
                value={clientName}
                onChangeText={setClientName}
                style={styles.input}
            />

            <Text style={styles.label}>Description</Text>

            <TextInput
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
                multiline
                style={[styles.input, { height: 100 }]}
            />

            <Text style={styles.label}>Priority</Text>

            <View style={styles.priorityContainer}>
                {["High", "Medium", "Low"].map((item) => (
                    <Pressable
                        key={item}
                        style={[
                            styles.priorityButton,
                            priority === item && styles.selected,
                        ]}
                        onPress={() => setPriority(item)}
                    >
                        <Text>{item}</Text>
                    </Pressable>
                ))}
            </View>

            <Text style={styles.label}>Date</Text>

            <Text style={styles.date}>{date}</Text>

            <Pressable style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>Next</Text>
            </Pressable>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        padding: 20,
    },

    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
    },

    label: {
        fontWeight: "600",
        marginTop: 15,
        marginBottom: 8,
    },

    input: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },

    priorityContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    priorityButton: {
        width: "30%",
        padding: 15,
        backgroundColor: "#ddd",
        alignItems: "center",
        borderRadius: 10,
    },

    selected: {
        backgroundColor: "#4CAF50",
    },

    date: {
        fontSize: 16,
        marginVertical: 15,
    },

    button: {
        backgroundColor: "#2563EB",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
    },

    buttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
    },
});