import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TableCard from '../components/TableCard';
import TableStats from '../components/TableStats';
import TableFormModal from '../components/TableFormModal';

const ZONES = ['Toutes les zones', 'Terrasse', 'Salle principale', 'Bar', 'Espace VIP'];
const STATUTS = [
  { key: '', label: 'Toutes' },
  { key: 'disponible', label: 'Disponibles' },
  { key: 'occupée', label: 'Occupées' },
  { key: 'réservée', label: 'Réservées' },
];

export default function TablesGestion() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtreStatut, setFiltreStatut] = useState('');
  const [filtreZone, setFiltreZone] = useState('Toutes les zones');
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editTable, setEditTable] = useState(null);

  useEffect(() => {
    fetchTables();
  }, []);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tables/');
      setTables(res.data);
    } catch {}
    setLoading(false);
  };

  const handleAdd = () => {
    setEditTable(null);
    setModalOpen(true);
  };
  const handleEdit = table => {
    setEditTable(table);
    setModalOpen(true);
  };
  const handleDelete = async table => {
    if (window.confirm('Supprimer cette table ?')) {
      try {
        await api.delete(`/tables/${table.id}/`);
        fetchTables();
      } catch {
        alert('Erreur lors de la suppression');
      }
    }
  };
  const handleSubmit = async form => {
    try {
      if (editTable) {
        await api.put(`/tables/${editTable.id}/`, form);
      } else {
        await api.post('/tables/', form);
      }
      setModalOpen(false);
      fetchTables();
    } catch {
      alert("Erreur lors de l'enregistrement");
    }
  };

  const tablesFiltrees = tables.filter(t => {
    const matchStatut = !filtreStatut || t.statut === filtreStatut;
    const matchZone = filtreZone === 'Toutes les zones' || t.zone === filtreZone;
    const matchSearch = t.nom.toLowerCase().includes(search.toLowerCase());
    return matchStatut && matchZone && matchSearch;
  });

  // Statistiques
  const stats = {
    total: tables.length,
    occupees: tables.filter(t => t.statut === 'occupée').length,
    reservees: tables.filter(t => t.statut === 'réservée').length,
    disponibles: tables.filter(t => t.statut === 'disponible').length,
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="title-font text-3xl font-bold text-gray-800">Gestion des Tables</h1>
        <div className="flex space-x-3">
          <button className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50">
            <i className="fas fa-calendar-alt mr-2"></i> Planning
          </button>
          <button className="gradient-bg text-white px-4 py-2 rounded-lg hover:opacity-90" onClick={handleAdd}>
            <i className="fas fa-plus mr-2"></i> Ajouter une table
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="flex space-x-2">
            {STATUTS.map(s => (
              <button
                key={s.key}
                className={`px-4 py-2 rounded-lg font-medium ${filtreStatut === s.key ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                onClick={() => setFiltreStatut(s.key)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              <input
                type="text"
                placeholder="Rechercher une table..."
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <select
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filtreZone}
              onChange={e => setFiltreZone(e.target.value)}
            >
              {ZONES.map(z => (
                <option key={z}>{z}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <TableStats stats={stats} />
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-lg">Plan de salle</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {loading ? (
            <div className="col-span-6 text-center py-10">Chargement...</div>
          ) : tablesFiltrees.length === 0 ? (
            <div className="col-span-6 text-center py-10">Aucune table trouvée</div>
          ) : (
            tablesFiltrees.map(table => (
              <TableCard key={table.id} table={table} onEdit={() => handleEdit(table)} onDelete={() => handleDelete(table)} />
            ))
          )}
        </div>
      </div>
      <TableFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} initialData={editTable} />
    </div>
  );
}
