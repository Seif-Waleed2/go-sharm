import api from './axios';

export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);
export const fetchProfile = () => api.get('/auth/profile');
export const updateProfile = (data) => api.put('/auth/profile', data);
