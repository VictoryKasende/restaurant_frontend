import React, { useEffect, useState } from 'react';
import api from '../services/api';
import MenuItemCard from '../components/MenuItemCard';
import MenuCategoryTabs from '../components/MenuCategoryTabs';
import MenuSearchBar from '../components/MenuSearchBar';
import MenuFormModal from '../components/MenuFormModal';
import ToastModal from '../components/ToastModal';
import ConfirmModal from '../components/ConfirmModal';

const categories = [
  'Tous les plats',
  'Entrées',
  'Plats principaux',
  'Desserts',
  'Boissons',
  'Menus spéciaux',
];

export default function MenuGestion() {
  const [plats, setPlats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tous les plats');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editPlat, setEditPlat] = useState(null);
  const [toast, setToast] = useState({ open: false, type: 'success', message: '' });
  const [confirm, setConfirm] = useState({ open: false, plat: null });

  useEffect(() => {
    fetchPlats();
  }, []);

  const fetchPlats = async () => {
    setLoading(true);
    try {
      const res = await api.get('/plats/');
      setPlats(res.data);
    } catch {
      // TODO: gestion d'erreur
    }
    setLoading(false);
  };

  const platsFiltres = plats.filter(plat => {
    const matchCat = selectedCategory === 'Tous les plats' || plat.categorie === selectedCategory;
    const matchSearch = plat.nom.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAdd = () => {
    setEditPlat(null);
    setModalOpen(true);
  };

  const handleEdit = plat => {
    setEditPlat(plat);
    setModalOpen(true);
  };

  const handleDelete = plat => {
    setConfirm({ open: true, plat });
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/plats/${confirm.plat.id}/`);
      setToast({ open: true, type: 'success', message: 'Plat supprimé avec succès !' });
      setConfirm({ open: false, plat: null });
      fetchPlats();
    } catch (e) {
      setToast({ open: true, type: 'error', message: "Erreur lors de la suppression" });
      setConfirm({ open: false, plat: null });
    }
  };

  const handleSubmit = async form => {
    try {
      const data = new FormData();
      data.append('nom', form.nom);
      data.append('description', form.description);
      data.append('prix', form.prix);
      data.append('disponible', form.disponible);
      data.append('categorie', form.categorie);
      if (form.image && typeof form.image !== 'string') data.append('image', form.image);
      data.append('restaurateur', form.restaurateur);
      if (editPlat) {
        await api.put(`/plats/${editPlat.id}/`, data);
        setToast({ open: true, type: 'success', message: 'Plat modifié avec succès !' });
      } else {
        await api.post('/plats/', data);
        setToast({ open: true, type: 'success', message: 'Plat ajouté avec succès !' });
      }
      setModalOpen(false);
      fetchPlats();
    } catch (e) {
      setToast({ open: true, type: 'error', message: "Erreur lors de l'enregistrement" });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="title-font text-3xl font-bold text-gray-800">Gestion du Menu</h1>
        <button className="gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90 transition" onClick={handleAdd}>
          <i className="fas fa-plus mr-2"></i> Ajouter un plat
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <MenuCategoryTabs categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <MenuSearchBar value={search} onChange={setSearch} />
      </div>
      {loading ? (
        <div className="text-center py-10">Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platsFiltres.map(plat => (
            <MenuItemCard key={plat.id} plat={plat} onEdit={() => handleEdit(plat)} onDelete={() => handleDelete(plat)} />
          ))}
        </div>
      )}
      <MenuFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} initialData={editPlat} />
      <ConfirmModal open={confirm.open} message="Confirmer la suppression de ce plat ?" onConfirm={confirmDelete} onCancel={() => setConfirm({ open: false, plat: null })} />
      <ToastModal open={toast.open} type={toast.type} message={toast.message} onClose={() => setToast(t => ({ ...t, open: false }))} />
    </div>
  );
}
