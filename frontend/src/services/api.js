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