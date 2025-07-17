import React from 'react';
import api from '../services/api';

const STATUS_LABELS = {
  pending: { label: 'En attente', badge: 'bg-blue-100 text-blue-800' },
  preparing: { label: 'En préparation', badge: 'bg-yellow-100 text-yellow-800' },
  ready: { label: 'Prête à servir', badge: 'bg-green-100 text-green-800' },
  delivered: { label: 'Servie', badge: 'bg-gray-100 text-gray-800' },
  cancelled: { label: 'Annulée', badge: 'bg-red-100 text-red-800' },
};

export default function CommandeCard({ commande, onStatusChange }) {
  const handleStatus = async (newStatus) => {
    try {
      await api.patch(`/commandes/${commande.id}/`, { statut: newStatus });
      onStatusChange && onStatusChange();
    } catch {
      alert("Erreur lors du changement de statut");
    }
  };

  return (
    <div className={`order-card order-status-${commande.statut} bg-white rounded-lg shadow-sm p-4`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-3 md:mb-0">
          <div className="flex items-center space-x-3">
            <h3 className="font-bold">Commande #{commande.id}</h3>
            <span className={`text-xs px-2 py-1 rounded ${STATUS_LABELS[commande.statut]?.badge || ''}`}>{STATUS_LABELS[commande.statut]?.label || commande.statut}</span>
          </div>
          <p className="text-sm text-gray-600">Client : {commande.client_username || '—'}</p>
          <p className="text-sm text-gray-600">Date : {commande.date_commande ? new Date(commande.date_commande).toLocaleString('fr-FR') : '—'}</p>
        </div>
        <div className="flex items-center space-x-3">
          <span className="font-bold">Total: {commande.total} €</span>
          {commande.statut === 'ready' && (
            <button className="text-green-600 hover:text-green-800" onClick={() => handleStatus('delivered')} title="Marquer comme servie">
              <i className="fas fa-check-circle text-xl"></i>
            </button>
          )}
          {commande.statut === 'pending' && (
            <button className="text-yellow-600 hover:text-yellow-800" onClick={() => handleStatus('preparing')} title="Passer en préparation">
              <i className="fas fa-utensils text-xl"></i>
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <h4 className="font-medium mb-2">Articles :</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {commande.lignes?.map((l, idx) => (
            <div key={idx} className="flex items-start space-x-3">
              <div className="bg-gray-100 text-gray-800 rounded-lg p-2">
                <i className="fas fa-utensils"></i>
              </div>
              <div>
                <p className="font-medium">{l.nom_plat}</p>
                <p className="text-sm text-gray-500">x{l.quantite} • {l.prix_unitaire_fige} €</p>
                <p className="text-xs text-gray-400">Sous-total : {l.sous_total} €</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
