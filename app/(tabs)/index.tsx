import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { fetchVelibData, VelibStation } from '@/app/(tabs)/api/velibApi';
import { useRouter } from 'expo-router';

const index: React.FC = () => {
  const [stations, setStations] = useState<VelibStation[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchVelibData();
      setStations(data);
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚲 Stations Vélib' 🚲</Text>
      <FlatList
        data={stations}
        keyExtractor={(item) => String(item.stationcode)} // Assure-toi que 'stationcode' est une chaîne
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.station}
            onPress={() => router.push(`/StationDetails/${item.stationcode}`)} // La navigation dynamique
          >
            <Text style={styles.stationName}>{item.name}</Text>
            <Text>Status: {item.is_renting ? '🟢 Ouvert' : '🔴 Fermé'}</Text>
            <Text>💳 Paiement sur place: {item.payment_terminal ? 'Oui' : 'Non'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  station: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8 },
  stationName: { fontSize: 18, fontWeight: 'bold' },
});

export default index;
