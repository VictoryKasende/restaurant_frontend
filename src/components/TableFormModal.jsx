import React, { useState } from 'react';

export default function TableFormModal({ open, onClose, onSubmit, initialData }) {
  const [form, setForm] = useState(
    initialData || {
      nom: '',
      capacite: '',
      zone: '',
      statut: 'disponible',
    }
  );

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {initialData ? 'Modifier la table' : 'Ajouter une nouvelle table'}
          </h3>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
            <input name="nom" value={form.nom} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Capacité (personnes)</label>
            <input name="capacite" type="number" value={form.capacite} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Zone</label>
            <select name="zone" value={form.zone} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Choisir...</option>
              <option>Terrasse</option>
              <option>Salle principale</option>
              <option>Bar</option>
              <option>Espace VIP</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Statut</label>
            <select name="statut" value={form.statut} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="disponible">Disponible</option>
              <option value="occupée">Occupée</option>
              <option value="réservée">Réservée</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div className="flex justify-end mt-6">
            <button type="button" onClick={onClose} className="bg-white hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 border border-gray-300 rounded-lg shadow-sm mr-2">Annuler</button>
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 border border-transparent rounded-lg shadow-sm">Enregistrer</button>
          </div>
        </form>
      </div>
    </div>
  );
}
