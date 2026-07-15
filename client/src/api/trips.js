import api from './axios';

export const fetchTrips = () => api.get('/trips');
export const fetchTripById = (id) => api.get(`/trips/${id}`);
export const createTrip = (data) => api.post('/trips', data);
