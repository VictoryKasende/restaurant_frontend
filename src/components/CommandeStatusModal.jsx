import React, { useState } from 'react';

const STATUTS = [
  { key: 'pending', label: 'En attente' },
  { key: 'preparing', label: 'En préparation' },
  { key: 'ready', label: 'Prêtes à servir' },
  { key: 'delivered', label: 'Servies' },
  { key: 'cancelled', label: 'Annulées' },
];

export default function CommandeStatusModal({ open, commande, onClose, onSave }) {
  const [statut, setStatut] = useState(commande?.statut || 'pending');
  if (!open || !commande) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 animate-fade-in">
      <div className="rounded-lg shadow-xl px-8 py-6 min-w-[320px] flex flex-col items-center bg-white animate-pop-in">
        <h3 className="text-lg font-bold mb-4">Modifier le statut de la commande #{commande.id}</h3>
        <select
          className="mb-6 px-4 py-2 border rounded w-full"
          value={statut}
          onChange={e => setStatut(e.target.value)}
        >
          {STATUTS.map(s => (
            <option key={s.key} value={s.key}>{s.label}</option>
          ))}
        </select>
        <div className="flex gap-4 mt-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Annuler</button>
          <button onClick={() => onSave(statut)} className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition">Enregistrer</button>
        </div>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.2s; }
        .animate-pop-in { animation: popIn 0.25s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>
    </div>
  );
}
