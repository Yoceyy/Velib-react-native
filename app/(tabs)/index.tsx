import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchVelibData, VelibStation } from '@/app/(tabs)/api/velibApi';
import { useRouter } from 'expo-router';

const IndexScreen: React.FC = () => {
  const [stations, setStations] = useState<VelibStation[]>([]);
  const [filteredStations, setFilteredStations] = useState<VelibStation[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  useEffect(() => { // 🎯 Récupération des données Velib
    const loadData = async () => {
      const data = await fetchVelibData();
      setStations(data);
      setFilteredStations(data);
    };
    loadData();
  }, []);

  // 🎯 Fonction de filtrage selon l'arrondissement, département ou "Autre"
  useEffect(() => {
    let filteredData = stations;

    if (selectedCategory !== 'Tout') {
      if (selectedCategory === 'Paris') {
        filteredData = stations.filter(station =>
          station.nom_arrondissement_communes.startsWith('Paris')
        );
      } else if (selectedCategory === 'Hors Paris') {
        filteredData = stations.filter(station =>
          !station.nom_arrondissement_communes.startsWith('Paris')
        );
      } else if (selectedCategory === 'Autre') {
        filteredData = stations.filter(station =>
          !station.nom_arrondissement_communes.includes('Paris') &&
          !station.nom_arrondissement_communes.includes('Hors Paris')
        );
      }
    }

    // 🎯 Recherche par nom ou numéro de station
    if (searchText) {
      filteredData = filteredData.filter(station =>
        station.name.toLowerCase().includes(searchText.toLowerCase()) ||
        station.stationcode.includes(searchText)
      );
    }

    setFilteredStations(filteredData);
  }, [selectedCategory, searchText, stations]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🚲 Stations Vélib' 🚲</Text>

      {/* Sélecteur d'arrondissement / catégorie */}
      <Picker
        selectedValue={selectedCategory}
        onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        // 🎯 Options du Picker
        <Picker.Item label="Toutes les stations" value="Tout" />
        <Picker.Item label="Paris" value="Paris" />
        <Picker.Item label="Hors Paris" value="Hors Paris" />
        <Picker.Item label="Autre" value="Autre" />
      </Picker>

      {/* Barre de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher par nom ou numéro..."
        onChangeText={setSearchText}
        value={searchText}
      />

      {/* Liste des stations filtrées */}
      <FlatList
        data={filteredStations}
        keyExtractor={(item) => item.stationcode}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.station}
            onPress={() => router.push(`/StationDetails/${item.stationcode}`)}
          >
            <Text style={styles.Time}>{item.duedate}</Text>
            <Text style={styles.stationName}>{item.name}</Text>
            <Text>📍 Arrondissement: {item.nom_arrondissement_communes}</Text>
            <Text>🏙️ Ville: {item.nom_arrondissement_communes}</Text>
            <Text>🚲 Vélos dispos: {item.numbikesavailable}</Text>
            <Text>🏘 Commune: {item.code_insee_commune}</Text>
            <Text>🅿️ Attaches dispos: {item.numdocksavailable}</Text>
            <Text>💳 Paiement: {item.payment_terminal ? 'Oui' : 'Non'}</Text>
            <Text>Status: {item.is_renting ? '🟢 Ouvert' : '🔴 Fermé'}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

//css 

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  picker: { height: 50, marginBottom: 10 },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  station: { backgroundColor: '#fff', padding: 15, marginBottom: 10, borderRadius: 8 },
  stationName: { fontSize: 18, fontWeight: 'bold' },

  Time: { fontSize: 15, fontWeight: 'bold', textAlign: 'right' },
});

export default IndexScreen;
