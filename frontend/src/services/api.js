import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api'
});

export const fetchMetiers = async () => {
  const response = await api.get('/metiers');
  return response.data;
};

export const fetchThematiques = async () => {
  const response = await api.get('/thematiques');
  return response.data;
};

export const fetchComposantes = async () => {
  const response = await api.get('/composantes');
  return response.data;
};

export const fetchImpacts = async (filters) => {
  const response = await api.get('/impacts', { params: filters });
  return response.data;
};

export const inscriptionUtilisateur = async (formData) => {
  try {
    const response = await api.post('/auth/inscription', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de l\'inscription.' };
  }
};

export const connexionUtilisateur = async (formData) => {
  try {
    const response = await api.post('/auth/connexion', formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Erreur lors de la connexion.' };
  }
};

export const fetchUserChecklists = async (utilisateurId) => {
  console.log("fetchUserChecklists appelé avec :", utilisateurId);
  try {
      const response = await axios.get(`http://localhost:3000/api/checklists?utilisateurId=${utilisateurId}`);
      console.log("Données reçues par fetchUserChecklists :", response.data);
      return response.data;
  } catch (error) {
      console.error("Erreur dans fetchUserChecklists :", error);
      throw error;
  }
};

