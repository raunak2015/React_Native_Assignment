import { View, Text, StyleSheet, ScrollView } from "react-native";
import Header from "../../../components/Header";
import Card from "../../../components/Card";

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.content}>
        <Card>
          <Text style={styles.heading}>Today's Surveys</Text>
          <Text style={styles.count}>12</Text>
        </Card>

        <Card>
          <Text style={styles.heading}>Quick Actions</Text>

          <View style={styles.actions}>
            <View style={styles.action}>
              <Text style={styles.icon}>📷</Text>
              <Text>Camera</Text>
            </View>

            <View style={styles.action}>
              <Text style={styles.icon}>📍</Text>
              <Text>Location</Text>
            </View>

            <View style={styles.action}>
              <Text style={styles.icon}>👥</Text>
              <Text>Contacts</Text>
            </View>

            <View style={styles.action}>
              <Text style={styles.icon}>📋</Text>
              <Text>Clipboard</Text>
            </View>
          </View>
        </Card>

        <Card>
          <Text style={styles.heading}>Recent Surveys</Text>

          <Text>• Site Inspection A</Text>
          <Text>• Factory Visit</Text>
          <Text>• Building Survey</Text>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  content: {
    padding: 15,
  },

  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  count: {
    fontSize: 42,
    color: "#2563EB",
    fontWeight: "bold",
  },

  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  action: {
    width: "45%",
    backgroundColor: "#E5E7EB",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },

  icon: {
    fontSize: 30,
    marginBottom: 8,
  },
});