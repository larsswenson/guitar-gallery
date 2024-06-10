import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const fetchGuitars = async () => {
  const response = await api.get('/guitars');
  return response.data;
};

export const fetchGuitar = async (id) => {
  const response = await api.get(`/guitars/${id}`);
  return response.data;
};

export const createGuitar = async (data) => {
  const response = await api.post('/guitars', data);
  return response.data;
};

export const updateGuitar = async (id, data) => {
  const response = await api.put(`/guitars/${id}`, data);
  return response.data;
};

export const deleteGuitar = async (id) => {
  const response = await api.delete(`/guitars/${id}`);
  return response.data;
};












