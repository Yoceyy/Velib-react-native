import axios from 'axios';

// API URL Vélib en JSON
const API_URL = 'https://opendata.paris.fr/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel&rows=1000';

// Interface des données d'une station Vélib

// Déclaration de l'interface pour les données de la station
export interface VelibStation {
  stationcode: string;
  name: string;
  is_renting: number;
  is_returning: number;
  capacity: number;
  duedate: string;
  code_insee_commune: string;
  numbikesavailable: number;
  numdocksavailable: number;
  nom_arrondissement_communes: string;
  payment_terminal: boolean;
}

// Fonction pour récupérer les données Vélib
export const fetchVelibData = async (): Promise<VelibStation[]> => {
  try {
    // Appel de l'API pour récupérer les données
    const response = await axios.get(API_URL);
    // Vérification de la réponse
    const stations: VelibStation[] = response.data.records.map((record: any) => record.fields);

    return stations;
  } catch (error) {
    // Gestion des erreurs
    // Affichage d'un message d'erreur dans la console
    console.error('Erreur lors de la récupération des données Vélib :', error);
    return [];
  }
};
