import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView, Image, Alert } from "react-native";
import * as Location from "expo-location";
import MapComponent from "@/components/MapComponent";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  // useState hooks manage variables that reactively update the UI when they change.
  // 1. region stores latitude, longitude, and zoom details for the MapView.
  const [region, setRegion] = useState(null);
  // 2. get the username passed from the Login screen (or default to "Admin").
  const { user } = useLocalSearchParams();
  // 3. address stores the reverse geocoded human-readable address.
  const [address, setAddress] = useState("Fetching address...");
  // 4. dateTime stores the current date and time (updated every second).
  const [dateTime, setDateTime] = useState(new Date());
  const name = typeof user === "string" && user ? user : "Admin";
  // 5. image stores the file path (URI) of the selfie captured.
  const [image, setImage] = useState(null);

  // useEffect hook to fetch current GPS location and update the date/time clock.
  useEffect(() => {
    (async () => {
      try {
        // Request GPS location permission from the device
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission to access location was denied");
          return;
        }

        // Get actual current GPS coordinates (high accuracy)
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;

        // Set the map region coordinates
        setRegion({ latitude: lat, longitude: lon, latitudeDelta: 0.01, longitudeDelta: 0.01 });

        // Convert GPS latitude & longitude into a readable physical address
        const geocode = await Location.reverseGeocodeAsync({ latitude: lat, longitude: lon });
        const place = geocode[0] || {};
        setAddress(`${place.street ?? ""}${place.street ? ", " : ""}${place.city ?? ""}${place.city ? ", " : ""}${place.region ?? ""}${place.country ? ", " : ""}${place.country ?? ""}`);
      } catch (error) {
        Alert.alert("Error fetching location", error.message);
      }
    })();

    // Set an interval timer to update the date & time clock every 1 second (1000ms)
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    
    // Clear the timer when the screen is closed to prevent memory leaks
    return () => clearInterval(timer);
  }, []);

  // useEffect hook to load the captured selfie image when the screen is shown
  useEffect(() => {
    const loadImage = async () => {
      try {
        // Fetch saved photo URI from device AsyncStorage memory
        const uri = await AsyncStorage.getItem("selfie");
        if (uri) {
          setImage(uri);
        }
      } catch (error) {
        console.error("Error loading image", error);
      }
    };

    // Reload the image every time this screen gains focus (e.g. returning from Camera)
    const unsubscribe = router.addListener?.("focus", loadImage);

    loadImage();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // handleSubmit runs when the employee clicks the "Submit Attendance" button
  const handleSubmit = () => {
    // 1. Validation: check if location has loaded and selfie has been taken
    if (!region || !image) {
      Alert.alert("Incomplete", "Please make sure you have allowed location and taken a selfie.");
      return;
    }

    // 2. Prepare the details message containing Name, Location Address, and Current Time
    const details = `Name: ${name}\nLocation: ${address}\nDate: ${dateTime.toLocaleDateString()}\nTime: ${dateTime.toLocaleTimeString()}`;

    // 3. Show the submission popup with the details
    Alert.alert("Attendance Submitted Successfully", details);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Employee Field Visit</Text>
        <Text style={styles.subtitle}>{`Hello ${name}`}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.value}>{dateTime.toLocaleDateString()}</Text>
        <Text style={[styles.label, styles.gapTop]}>Time</Text>
        <Text style={styles.value}>{dateTime.toLocaleTimeString()}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Latitude</Text>
        <Text style={styles.value}>{region ? region.latitude : "Loading..."}</Text>
        <Text style={[styles.label, styles.gapTop]}>Longitude</Text>
        <Text style={styles.value}>{region ? region.longitude : "Loading..."}</Text>
        <Text style={[styles.label, styles.gapTop]}>Address</Text>
        <Text style={styles.value}>{address}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Selfie</Text>
        <View style={styles.selfieBox}>
          {image ? (
            <Image source={{ uri: image }} style={styles.selfie} />
          ) : (
            <Text style={styles.placeholder}>No selfie yet</Text>
          )}
        </View>
        <Pressable
          style={styles.button}
          onPress={() => router.push("/camera")}
        >
          <Text style={styles.buttonText}>
            {image ? "Retake Selfie" : "Take Selfie"}
          </Text>
        </Pressable>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Map</Text>
        {region ? (
          <MapComponent region={region} style={styles.map} />
        ) : (
          <Text style={styles.placeholder}>Loading map...</Text>
        )}
      </View>

      <Pressable style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Attendance</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },
  contentContainer: {
    paddingBottom: 30,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1E3A8A",
  },
  subtitle: {
    marginTop: 4,
    color: "#475569",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 18,
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },
  value: {
    marginTop: 8,
    fontSize: 16,
    color: "#0F172A",
  },
  gapTop: {
    marginTop: 14,
  },
  selfieBox: {
    height: 220,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    marginTop: 12,
    marginBottom: 12,
  },
  selfie: {
    width: 200,
    height: 200,
    borderRadius: 14,
  },
  placeholder: {
    color: "#94A3B8",
  },
  map: {
    height: 220,
    borderRadius: 14,
  },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#16A34A",
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
