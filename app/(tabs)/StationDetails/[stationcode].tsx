import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';  // Récupère les paramètres de l'URL
import { fetchVelibData } from '@/app/(tabs)/api/velibApi';  // Assure-toi d'utiliser le bon chemin pour ton API

const StationDetails: React.FC = () => {
  const { stationcode } = useLocalSearchParams();  // Récupère le paramètre stationcode depuis l'URL
  const [station, setStation] = useState(null); // Initialise la station à null

  // Récupère les données de la station en fonction du stationcode
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchVelibData();
      const selectedStation = data.find((station) => station.stationcode === stationcode);  // Recherche de la station par stationcode
      setStation(selectedStation);
    };
    loadData();
  }, [stationcode]);

  if (!station) {
    return <Text>Station non trouvée...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{station.name}</Text>
      <Text>📍 Localisation: {station.nom_arrondissement_communes}</Text>
      <Text>🚲 Vélos disponibles: {station.numbikesavailable}</Text>
      <Text>🅿️ Docks disponibles: {station.numdocksavailable}</Text>
      <Text>💳 Paiement sur place: {station.payment_terminal ? 'Oui' : 'Non'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});

export default StationDetails;
