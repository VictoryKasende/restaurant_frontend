import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CommandeCard from '../components/CommandeCard';
import CommandeStats from '../components/CommandeStats';
import CommandeFormModal from '../components/CommandeFormModal';

const STATUTS = [
  { key: 'pending', label: 'En attente', color: 'blue' },
  { key: 'preparing', label: 'En préparation', color: 'yellow' },
  { key: 'ready', label: 'Prêtes à servir', color: 'green' },
  { key: 'delivered', label: 'Servies', color: 'gray' },
  { key: 'cancelled', label: 'Annulées', color: 'red' },
];

export default function CommandesGestion() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [plats, setPlats] = useState([]);
  const [tables, setTables] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCommandes();
    fetchPlats();
    fetchTables();
  }, []);

  const fetchCommandes = async () => {
    setLoading(true);
    try {
      const res = await api.get('/commandes/');
      setCommandes(res.data);
    } catch (e) {
      // TODO: gestion d'erreur
    }
    setLoading(false);
  };

  const fetchPlats = async () => {
    try {
      const res = await api.get('/plats/');
      setPlats(res.data);
    } catch {}
  };
  const fetchTables = async () => {
    try {
      const res = await api.get('/tables/');
      setTables(res.data);
    } catch {}
  };

  const handleAdd = () => setModalOpen(true);
  const handleSubmit = async form => {
    try {
      await api.post('/commandes/', {
        table: form.table,
        items: form.items.map(i => ({ plat: i.plat, quantite: i.quantite })),
        note: form.note,
      });
      setModalOpen(false);
      fetchCommandes();
    } catch {
      alert('Erreur lors de la création de la commande');
    }
  };

  const commandesFiltrees = (filtre
    ? commandes.filter(c => c.statut === filtre)
    : commandes
  ).filter(cmd => {
    if (!search) return true;
    const num = String(cmd.id);
    const client = cmd.client_username || '';
    const plats = (cmd.lignes || []).map(i => i.nom_plat || '').join(' ').toLowerCase();
    return (
      num.includes(search) ||
      client.toLowerCase().includes(search.toLowerCase()) ||
      plats.includes(search.toLowerCase())
    );
  });

  // Statistiques par statut
  const stats = STATUTS.map(s => ({
    ...s,
    count: commandes.filter(c => c.statut === s.key).length,
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="title-font text-3xl font-bold text-gray-800">Gestion des Commandes</h1>
        <div className="flex space-x-3">
          <button className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
            <i className="fas fa-filter mr-2"></i> Filtres
          </button>
          <button className="gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90" onClick={handleAdd}>
            <i className="fas fa-plus mr-2"></i> Nouvelle commande
          </button>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher par numéro, table ou plat..."
          className="pl-4 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <CommandeStats stats={stats} commandes={commandes} />
      {loading ? (
        <div className="text-center py-10">Chargement...</div>
      ) : (
        <div className="space-y-4 mt-6">
          {commandesFiltrees.map(cmd => (
            <CommandeCard key={cmd.id} commande={cmd} onStatusChange={fetchCommandes} />
          ))}
        </div>
      )}
      <CommandeFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} plats={plats} tables={tables} />
    </div>
  );
}
