import axios from 'axios';

const API_URL = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records';

export interface VelibStation {
  stationcode: string;
  name: string;
  is_renting: number;
  is_returning: number;
  capacity: number;
  numbikesavailable: number;
  numdocksavailable: number;
  nom_arrondissement_communes: string;
  payment_terminal: boolean;
}

export const fetchVelibData = async (): Promise<VelibStation[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.results;
  } catch (error) {
    console.error('Erreur API Vélib :', error);
    return [];
  }
};
