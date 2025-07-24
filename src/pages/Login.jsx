import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ open: false, type: 'success', message: '' });
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await handleLogin(username, password);
      setToast({ open: true, type: 'success', message: 'Connexion réussie !' });
      if (user.role === 'restaurateur') {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError("Identifiants invalides ou erreur serveur");
      setToast({ open: true, type: 'error', message: 'Échec de la connexion' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="login-card bg-white rounded-xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <img src="/public/vite.svg" alt="Logo Tabor" className="h-12 w-12 rounded-full shadow mx-auto mb-2" />
          </div>
          <h1 className="title-font text-3xl font-bold text-gray-800 mb-2">Tabor Restaurant</h1>
          <p className="text-gray-600 text-center">Connectez-vous</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Nom d'utilisateur</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-user text-gray-400"></i>
              </div>
              <input id="username" name="username" type="text" autoComplete="username" required
                className="input-field pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
                value={username} onChange={e => setUsername(e.target.value)} />
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe</label>
              <a href="#" className="text-sm text-primary hover:text-opacity-80">Mot de passe oublié?</a>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400"></i>
              </div>
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="current-password" required
                className="input-field pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
                value={password} onChange={e => setPassword(e.target.value)} />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => setShowPassword(v => !v)}>
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              checked={remember} onChange={e => setRemember(e.target.checked)} />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
              Se souvenir de moi
            </label>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <div>
            <button type="submit" className="btn-primary w-full py-3 px-4 rounded-lg text-white font-medium" disabled={loading}>
              <i className="fas fa-sign-in-alt mr-2"></i> {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Ou connectez-vous avec
              </span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3">
            <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <i className="fab fa-google text-red-500 mr-2 mt-0.5"></i> Google
            </a>
            <a href="#" className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <i className="fab fa-facebook-f text-blue-600 mr-2 mt-0.5"></i> Facebook
            </a>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Nouveau chez Tabor Restaurant ?{' '}
            <Link to="/register" className="font-medium text-primary hover:text-opacity-80">Créer un compte</Link>
          </p>
        </div>
      </div>
      {/* ToastModal */}
      <ToastModal open={toast.open} type={toast.type} message={toast.message} onClose={() => setToast({ ...toast, open: false })} />
    </div>
  );
};

import ToastModal from '../components/ToastModal';
export default Login;
