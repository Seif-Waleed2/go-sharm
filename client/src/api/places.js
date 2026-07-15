import api from './axios';

export const fetchPlaces = (params = {}) => api.get('/places', { params });
export const fetchPlaceById = (id) => api.get(`/places/${id}`);
