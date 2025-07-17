// Hook personnalisé pour la gestion de l’authentification
import { useState, useEffect } from 'react';
import { login, logout, getMe } from '../services/authService';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Charger le user au démarrage si token présent
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token && !user) {
      getMe().then(setUser).catch(() => setUser(null));
    }
  }, [user]);

  const handleLogin = async (username, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(username, password);
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      const userData = await getMe();
      setUser(userData);
      return userData;
    } catch (err) {
      setError('Identifiants invalides');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return { user, loading, error, handleLogin, handleLogout };
}
