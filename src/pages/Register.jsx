import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [establishment, setEstablishment] = useState('');
  const [terms, setTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  // Découper le nom complet en prénom/nom
  const getFirstAndLastName = (fullname) => {
    const parts = fullname.trim().split(' ');
    return {
      first_name: parts[0] || '',
      last_name: parts.slice(1).join(' ') || '',
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    if (!terms) {
      setError('Vous devez accepter les conditions d\'utilisation');
      return;
    }
    setLoading(true);
    const { first_name, last_name } = getFirstAndLastName(fullname);
    try {
      await api.post('register/', {
        username,
        email,
        first_name,
        last_name,
        is_staff: false,
        role: 'client',
        password,
        establishment,
      });
      setSuccess('Inscription réussie ! Vous pouvez vous connecter.');
      setFullname('');
      setEmail('');
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setEstablishment('');
      setTerms(false);
    } catch (err) {
      setError("Erreur lors de l'inscription. Vérifiez vos informations ou réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="register-card bg-white rounded-xl p-8 w-full max-w-md mx-4">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <div className="gradient-bg text-white p-3 rounded-lg inline-flex">
              <i className="fas fa-utensils text-2xl"></i>
            </div>
          </div>
          <h1 className="title-font text-3xl font-bold text-gray-800 mb-2">GastroManager</h1>
          <p className="text-gray-600">Créez votre compte professionnel</p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-user text-gray-400"></i>
              </div>
              <input id="fullname" name="fullname" type="text" autoComplete="name" required
                className="input-field pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
                value={fullname} onChange={e => setFullname(e.target.value)} />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-gray-400"></i>
              </div>
              <input id="email" name="email" type="email" autoComplete="email" required
                className="input-field pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
                value={email} onChange={e => setEmail(e.target.value)} />
            </div>
          </div>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400"></i>
              </div>
              <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" required
                className="input-field pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
                value={password} onChange={e => setPassword(e.target.value)} />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => setShowPassword(v => !v)}>
                  <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>
            <p className="mt-1 text-xs text-gray-500">8 caractères minimum avec au moins un chiffre</p>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-lock text-gray-400"></i>
              </div>
              <input id="confirm-password" name="confirm-password" type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" required
                className="input-field pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-0"
                value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button type="button" className="text-gray-400 hover:text-gray-500" onClick={() => setShowConfirmPassword(v => !v)}>
                  <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="establishment" className="block text-sm font-medium text-gray-700 mb-1">Type d'établissement</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-store text-gray-400"></i>
              </div>
              <select id="establishment" name="establishment" required
                className="input-field pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-0 appearance-none bg-white"
                value={establishment} onChange={e => setEstablishment(e.target.value)}>
                <option value="" disabled>Sélectionnez...</option>
                <option value="restaurant">Restaurant</option>
                <option value="bar">Bar</option>
                <option value="hotel">Hôtel</option>
                <option value="cafe">Café</option>
                <option value="other">Autre</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <i className="fas fa-chevron-down text-gray-400"></i>
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input id="terms" name="terms" type="checkbox" required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                checked={terms} onChange={e => setTerms(e.target.checked)} />
            </div>
            <div className="ml-2">
              <label htmlFor="terms" className="block text-sm text-gray-700">
                J'accepte les <a href="#" className="text-primary hover:text-opacity-80">conditions d'utilisation</a> et la <a href="#" className="text-primary hover:text-opacity-80">politique de confidentialité</a>
              </label>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <div className="pt-2">
            <button type="submit" className="btn-primary w-full py-3 px-4 rounded-lg text-white font-medium" disabled={loading}>
              <i className="fas fa-user-plus mr-2"></i> {loading ? "Inscription..." : "S'inscrire"}
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
                Ou inscrivez-vous avec
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
            Vous avez déjà un compte?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-opacity-80">Se connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
