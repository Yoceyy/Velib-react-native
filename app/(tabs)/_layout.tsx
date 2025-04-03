import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0072CE', // Bleu Vélib'
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Accueil', // Titre de l'onglet
          tabBarIcon: ({ color }) => <Icon size={28} name="home-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="StationDetails/[stationcode]"
        options={{
          title: 'Informations', // Titre de l'onglet
          tabBarIcon: ({ color }) => <Icon size={28} name="search-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}
