// Service d’authentification pour gérer le login, logout et le refresh token
import api from './api';

export const login = async (username, password) => {
  const response = await api.post('login/', { username, password });
  return response.data;
};

export const refresh = async (refreshToken) => {
  const response = await api.post('auth/refresh/', { refresh: refreshToken });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

export const getMe = async () => {
  const response = await api.get('me/');
  return response.data;
};
