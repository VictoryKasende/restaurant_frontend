import React from 'react';

export default function CommandeStats({ stats, commandes }) {
  const totalMontant = commandes ? commandes.reduce((a, c) => a + (c.total || 0), 0) : 0;
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {stats.map(s => (
        <div key={s.key} className={`bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center`}>
          <p className="text-gray-500">{s.label}</p>
          <p className={`text-2xl font-bold text-${s.color}-600`}>{s.count}</p>
        </div>
      ))}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">Total commandes</p>
        <p className="text-2xl font-bold text-gray-800">{stats.reduce((a, s) => a + s.count, 0)}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 text-center">
        <p className="text-gray-500">Montant total</p>
        <p className="text-2xl font-bold text-green-700">{totalMontant.toFixed(2)} €</p>
      </div>
    </div>
  );
}
