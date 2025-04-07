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

import axios from 'axios';

// API URL for Vélib data

const API_URL = 'https://opendata.paris.fr/api/explore/v2.1/catalog/datasets/velib-disponibilite-en-temps-reel/records';


// Declation de variables
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

// Fetch Vélib data from the API

export const fetchVelibData = async (): Promise<VelibStation[]> => {
  try {
    
    const response = await axios.get(API_URL);
    return response.data.results;
  } catch (error) {
    console.error('Erreur API Vélib :', error);
    return [];
  }
};
