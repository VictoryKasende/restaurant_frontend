import React from 'react';

export default function TableCard({ table, onEdit, onDelete }) {
  let statusClass = '';
  if (table.statut === 'disponible') statusClass = 'table-available border-green-500';
  else if (table.statut === 'occupée') statusClass = 'table-occupied border-red-500';
  else if (table.statut === 'réservée') statusClass = 'table-reserved border-yellow-500';
  else if (table.statut === 'maintenance') statusClass = 'table-maintenance border-blue-500';

  return (
    <div className={`table-card h-24 rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer hover:shadow-md ${statusClass}`}>
      <span className="font-bold text-lg">{table.nom}</span>
      <span className="text-xs text-gray-600">{table.capacite} personnes</span>
      {table.statut === 'occupée' && table.commande && (
        <span className="text-xs text-red-600 mt-1">#{table.commande.numero} - {table.commande.montant}€</span>
      )}
      {table.statut === 'réservée' && table.reservation && (
        <span className="text-xs text-yellow-600 mt-1">Réservé {table.reservation.heure}</span>
      )}
      <div className="flex space-x-2 mt-2">
        <button className="text-blue-600 hover:text-blue-800" onClick={onEdit}><i className="fas fa-edit"></i></button>
        <button className="text-red-600 hover:text-red-800" onClick={onDelete}><i className="fas fa-trash"></i></button>
      </div>
    </div>
  );
}
