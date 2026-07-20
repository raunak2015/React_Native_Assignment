import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: true }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: "Dashboard",
        }}
      />

      <Drawer.Screen name="camera" />
      <Drawer.Screen name="contacts" />
      <Drawer.Screen name="location" />
      <Drawer.Screen name="clipboard" />
      <Drawer.Screen name="settings" />
    </Drawer>
  );
}