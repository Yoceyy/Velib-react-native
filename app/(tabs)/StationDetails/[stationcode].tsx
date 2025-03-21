import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchVelibData } from '@/app/(tabs)/api/velibApi';

const StationDetails: React.FC = () => {
  const { stationcode } = useLocalSearchParams();
  const [station, setStation] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchVelibData();
      const selectedStation = data.find((s) => s.stationcode === stationcode);
      setStation(selectedStation);
    };
    loadData();
  }, [stationcode]);

  if (!station) return <Text>Chargement...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{station.name}</Text>
      <Text>📍 Arrondissement: {station.nom_arrondissement_communes}</Text>
      <Text>🏙️ Ville: {station.nom_arrondissement_communes}</Text>
      <Text>🚲 Vélos dispos: {station.numbikesavailable}</Text>
      <Text>🏘 Commune: {station.code_insee_commune}</Text>
      <Text>🅿️ Attaches dispos: {station.numdocksavailable}</Text>
      <Text>💳 Paiement: {station.payment_terminal ? 'Oui' : 'Non'}</Text>
      <Text>Status: {station.is_renting ? '🟢 Ouvert' : '🔴 Fermé'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({ container: { flex: 1, padding: 20 } });

export default StationDetails;
