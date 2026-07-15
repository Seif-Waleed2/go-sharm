import api from './axios';

export const fetchRideOptions = (pickup, destination) =>
  api.get('/rides', { params: { pickup, destination } });

export const bookRide = (data) => api.post('/rides', data);
