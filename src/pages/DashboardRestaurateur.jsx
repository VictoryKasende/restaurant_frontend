import React, { useEffect, useState } from 'react';
import api from '../services/api';

const DashboardRestaurateur = () => {
  // Statistiques
  // ...existing code...
  // Menu
  const [plats, setPlats] = useState([]);
  const [loadingPlats, setLoadingPlats] = useState(true);
  const [errorPlats, setErrorPlats] = useState(null);
  // Commandes
  const [commandes, setCommandes] = useState([]);
  const [loadingCommandes, setLoadingCommandes] = useState(true);
  const [errorCommandes, setErrorCommandes] = useState(null);

  // Récupérer les plats et commandes à l'initialisation
  useEffect(() => {
    api.get('plats/')
      .then(res => setPlats(res.data))
      .catch(() => setErrorPlats('Erreur lors du chargement du menu.'))
      .finally(() => setLoadingPlats(false));
    api.get('commandes/')
      .then(res => setCommandes(res.data))
      .catch(() => setErrorCommandes('Erreur lors du chargement des commandes.'))
      .finally(() => setLoadingCommandes(false));
    // TODO: Récupérer les stats globales si endpoint disponible
  }, []);

  // Fonction pour rafraîchir les commandes
  const refreshCommandes = () => {
    setLoadingCommandes(true);
    setErrorCommandes(null);
    api.get('commandes/')
      .then(res => setCommandes(res.data))
      .catch(() => setErrorCommandes('Erreur lors du chargement des commandes.'))
      .finally(() => setLoadingCommandes(false));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <main className="p-6 max-w-7xl mx-auto">
        {/* Statistiques */}
        <section className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="dashboard-card bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm font-medium">Chiffre d'affaires</p>
            <h3 className="text-2xl font-bold mt-1">1,245€</h3>
            <span className="text-green-500 text-sm font-medium"><i className="fas fa-arrow-up"></i> 15% hier</span>
          </div>
          <div className="dashboard-card bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm font-medium">Commandes</p>
            <h3 className="text-2xl font-bold mt-1">{commandes.length}</h3>
            <span className="text-green-500 text-sm font-medium"><i className="fas fa-arrow-up"></i> +3 hier</span>
          </div>
          <div className="dashboard-card bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm font-medium">Nouvelles réservations</p>
            <h3 className="text-2xl font-bold mt-1">5</h3>
            <span className="text-red-500 text-sm font-medium"><i className="fas fa-arrow-down"></i> 2 hier</span>
          </div>
          <div className="dashboard-card bg-white rounded-xl shadow-md p-6">
            <p className="text-gray-500 text-sm font-medium">Plats au menu</p>
            <h3 className="text-2xl font-bold mt-1">{plats.length}</h3>
            <span className="text-gray-500 text-sm font-medium">à jour</span>
          </div>
        </section>

        {/* Gestion du menu */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="title-font text-2xl font-bold">Les 3 derniers plats ajoutés</h2>
          </div>
          {loadingPlats ? (
            <div className="text-center text-gray-500">Chargement du menu...</div>
          ) : errorPlats ? (
            <div className="text-center text-red-500">{errorPlats}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plats.slice(-3).map(plat => (
                <div key={plat.id} className="bg-white rounded-xl shadow-md p-4">
                  <img src={plat.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'} alt={plat.nom} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h3 className="text-lg font-bold">{plat.nom}</h3>
                  <p className="text-gray-600 mt-1">{plat.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-gray-800 font-semibold">{plat.prix.toFixed(2)}€</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Gestion des commandes */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="title-font text-2xl font-bold">Commandes en cours</h2>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center" onClick={refreshCommandes}><i className="fas fa-sync-alt mr-2"></i>Rafraîchir</button>
          </div>
          {loadingCommandes ? (
            <div className="text-center text-gray-500">Chargement des commandes...</div>
          ) : errorCommandes ? (
            <div className="text-center text-red-500">{errorCommandes}</div>
          ) : (
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N°</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plats</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {commandes.map(cmd => (
                    <tr key={cmd.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{cmd.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {cmd.lignes && cmd.lignes.map((l, idx) => (
                          <span key={idx} className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-1">{l.quantite}x {l.nom_plat}</span>
                        ))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cmd.total ? cmd.total.toFixed(2) : '0.00'}€</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">{cmd.statut || 'En attente'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DashboardRestaurateur;
