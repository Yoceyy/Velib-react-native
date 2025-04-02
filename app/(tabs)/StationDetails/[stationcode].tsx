import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchVelibData } from '@/app/(tabs)/api/velibApi';


const StationDetails: React.FC = () => {
  // Récupération du paramètre de recherche
  const { stationcode } = useLocalSearchParams();
  // Déclaration de l'état pour stocker les données de la station
  const [station, setStation] = useState(null);

  // Fonction pour récupérer les données de la station
  useEffect(() => {
    const loadData = async () => {
      // Appel de l'API pour récupérer les données
      const data = await fetchVelibData();
      // Filtrage des données pour trouver la station correspondante
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
