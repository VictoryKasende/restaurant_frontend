import React from 'react';

export default function TableStats({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">Total tables</p>
        <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">Occupées</p>
        <p className="text-2xl font-bold text-red-600">{stats.occupees}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">Réservées</p>
        <p className="text-2xl font-bold text-yellow-600">{stats.reservees}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">Disponibles</p>
        <p className="text-2xl font-bold text-green-600">{stats.disponibles}</p>
      </div>
    </div>
  );
}
