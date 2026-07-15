import api from './axios';

export const generateVacationPlan = (data) => api.post('/ai/generate', data);
export const fetchVacationPlans = () => api.get('/ai/plans');
