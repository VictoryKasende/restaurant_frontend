import React from 'react';

export default function MenuItemCard({ plat, onEdit, onDelete }) {
  return (
    <div className="menu-item-card bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img src={plat.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=60'} alt={plat.nom} className="w-full h-48 object-cover" />
        {plat.disponible === 'Promotion' && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Promotion
          </div>
        )}
        {plat.disponible === 'Disponible' && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Disponible
          </div>
        )}
        {plat.disponible === 'Épuisé' && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Épuisé
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-lg">{plat.nom}</h3>
          <span className="font-bold text-gray-800">{plat.prix} €</span>
        </div>
        <p className="text-gray-600 text-sm mt-1">{plat.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xs text-gray-500">
            <i className="fas fa-star text-yellow-400 mr-1"></i>
            {plat.note ? plat.note.toFixed(1) : '—'} ({plat.nb_avis || 0})
          </span>
          <div className="flex space-x-2">
            <button className="text-blue-500 hover:text-blue-700" onClick={onEdit}>
              <i className="fas fa-edit"></i>
            </button>
            <button className="text-red-500 hover:text-red-700" onClick={onDelete}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
