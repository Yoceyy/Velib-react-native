/* ================================================================
$$\     $$\                                                           
\$$\   $$  |                                                          
 \$$\ $$  /$$$$$$\   $$$$$$\   $$$$$$$\  $$$$$$\  $$\   $$\ $$\   $$\ 
  \$$$$  /$$  __$$\ $$  __$$\ $$  _____|$$  __$$\ $$ |  $$ |$$ |  $$ |
   \$$  / $$ /  $$ |$$ /  $$ |$$ /      $$$$$$$$ |$$ |  $$ |$$ |  $$ |
    $$ |  $$ |  $$ |$$ |  $$ |$$ |      $$   ____|$$ |  $$ |$$ |  $$ |
    $$ |  \$$$$$$  |\$$$$$$  |\$$$$$$$\ \$$$$$$$\ \$$$$$$$ |\$$$$$$$ |
    \__|   \______/  \______/  \_______| \_______| \____$$ | \____$$ |
                                                  $$\   $$ |$$\   $$ |
                                                  \$$$$$$  |\$$$$$$  |
                                                   \______/  \______/  
           🔗 github.com/Yoceyy | 💻 By Yooceyy
================================================================ */
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#0fe954', 
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
        name="StationDetails/[stationcode]"  // Détails de la station
        options={{
          title: 'Informations', // Titre de l'onglet
          tabBarIcon: ({ color }) => <Icon size={28} name="search-outline" color={color} />, // Icône de l'onglet
        }}
      />
    </Tabs>
  );
}
