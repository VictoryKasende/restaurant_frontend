import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function MenuFormModal({ open, onClose, onSubmit, initialData }) {
  const { user } = useAuth();
  const [form, setForm] = useState(
    initialData || {
      nom: '',
      description: '',
      prix: '',
      disponible: true,
      categorie: 'Tous les plats',
      image: '',
      restaurateur: user ? user.id : '',
    }
  );

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFile = e => {
    setForm(f => ({ ...f, image: e.target.files[0] }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ ...form, restaurateur: user ? user.id : '' });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            {initialData ? 'Modifier le plat' : 'Ajouter un nouveau plat'}
          </h3>
        </div>
        <form className="p-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Nom</label>
            <input name="nom" value={form.nom} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Prix (€)</label>
            <input name="prix" type="number" step="0.01" value={form.prix} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Disponible</label>
            <select name="disponible" value={form.disponible} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value={true}>Oui</option>
              <option value={false}>Non</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Catégorie</label>
            <select name="categorie" value={form.categorie} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
              <option value="Tous les plats">Tous les plats</option>
              <option value="Entrées">Entrées</option>
              <option value="Plats principaux">Plats principaux</option>
              <option value="Desserts">Desserts</option>
              <option value="Boissons">Boissons</option>
              <option value="Menus spéciaux">Menus spéciaux</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
            <input name="image" type="file" accept="image/*" onChange={handleFile} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
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
