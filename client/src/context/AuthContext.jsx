import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import api from '../api/axios';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('goSharmUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  const persistSession = useCallback((data) => {
    localStorage.setItem('goSharmToken', data.token);
    localStorage.setItem('goSharmUser', JSON.stringify(data.user));
    setUser(data.user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('goSharmToken');
    localStorage.removeItem('goSharmUser');
    setUser(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('goSharmToken');
    if (!token) {
      setLoading(false);
      return;
    }

    api.get('/auth/profile')
      .then(({ data }) => {
        setUser(data.user);
        localStorage.setItem('goSharmUser', JSON.stringify(data.user));
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, [logout]);

  const login = async (credentials) => {
    const { data } = await api.post('/auth/login', credentials);
    persistSession(data);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    persistSession(data);
    return data.user;
  };

  const updateProfile = async (payload) => {
    const { data } = await api.put('/auth/profile', payload);
    setUser(data.user);
    localStorage.setItem('goSharmUser', JSON.stringify(data.user));
    return data.user;
  };

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    updateProfile,
  }), [user, loading, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
