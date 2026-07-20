import { Tabs, router } from 'expo-router';
import React from 'react';
import { Pressable, Text } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const handleLogout = () => {
    router.replace('/login');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: true,
        tabBarButton: HapticTab,
        tabBarStyle: { display: 'none' }, // Hides the bottom navigation bar since there is only one screen now
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          headerRight: () => (
            <Pressable onPress={handleLogout} style={{ marginRight: 16 }}>
              <Text style={{ color: '#E11D48', fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}
