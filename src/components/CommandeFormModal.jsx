import React, { useState } from 'react';

export default function CommandeFormModal({ open, onClose, onSubmit, plats, tables }) {
  const [form, setForm] = useState({
    table: '',
    items: [],
    note: '',
  });
  const [selectedPlat, setSelectedPlat] = useState('');
  const [quantite, setQuantite] = useState(1);

  const handleAddItem = () => {
    if (!selectedPlat || quantite < 1) return;
    const plat = plats.find(p => p.id === selectedPlat);
    setForm(f => ({
      ...f,
      items: [...f.items, { plat: plat.id, nom: plat.nom, quantite }],
    }));
    setSelectedPlat('');
    setQuantite(1);
  };

  const handleRemoveItem = idx => {
    setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));
  };

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Nouvelle Commande</h3>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Table</label>
            <select name="table" value={form.table} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="">Choisir une table...</option>
              {tables.map(t => (
                <option key={t.id} value={t.id}>{t.nom}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Ajouter un plat</label>
            <div className="flex space-x-2">
              <select value={selectedPlat} onChange={e => setSelectedPlat(e.target.value)} className="border rounded px-2 py-1 flex-1">
                <option value="">Sélectionner...</option>
                {plats.map(p => (
                  <option key={p.id} value={p.id}>{p.nom}</option>
                ))}
              </select>
              <input type="number" min="1" value={quantite} onChange={e => setQuantite(Number(e.target.value))} className="w-16 border rounded px-2 py-1" />
              <button type="button" onClick={handleAddItem} className="bg-blue-600 text-white px-3 py-1 rounded">Ajouter</button>
            </div>
          </div>
          <div className="mb-4">
            <h4 className="font-bold mb-2">Articles de la commande</h4>
            <ul>
              {form.items.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center mb-1">
                  <span>{item.nom} x{item.quantite}</span>
                  <button type="button" onClick={() => handleRemoveItem(idx)} className="text-red-500">Supprimer</button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Note</label>
            <textarea name="note" value={form.note} onChange={handleChange} rows={2} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
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
