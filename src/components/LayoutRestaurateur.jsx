import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

// Exemple de slider vertical à gauche
const Sidebar = () => (
  <aside className="w-56 min-h-screen bg-gradient-to-b from-pink-600 to-pink-400 text-white fixed left-0 top-0 z-40 flex flex-col shadow-lg">
    <div className="flex items-center justify-center h-20 border-b border-pink-300">
      <i className="fas fa-utensils text-2xl mr-2"></i>
      <span className="font-bold text-xl">GastroManager</span>
    </div>
    <nav className="flex-1 py-6 space-y-2">
      <a href="/dashboard" className="block px-6 py-3 hover:bg-pink-700 rounded transition">Dashboard</a>
      <a href="/menu" className="block px-6 py-3 hover:bg-pink-700 rounded transition">Menu</a>
      <a href="/commandes" className="block px-6 py-3 hover:bg-pink-700 rounded transition">Commandes</a>
      <a href="/avis" className="block px-6 py-3 hover:bg-pink-700 rounded transition">Avis & Sentiment</a>
      <a href="/tables" className="block px-6 py-3 hover:bg-pink-700 rounded transition">Tables</a>
    </nav>
  </aside>
);

// Navbar simple en haut
const Topbar = () => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="fixed left-56 top-0 right-0 h-16 bg-white shadow flex items-center px-8 z-30">
      <span className="font-bold text-lg text-pink-600">Espace Restaurateur</span>
      <div className="ml-auto">
        <button
          className="text-pink-600 hover:text-pink-800"
          onClick={() => {
            handleLogout();
            navigate('/login');
          }}
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
};

const LayoutRestaurateur = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 ml-56">
      <Topbar />
      <main className="pt-20 px-8">{children}</main>
    </div>
  </div>
);

export default LayoutRestaurateur;
