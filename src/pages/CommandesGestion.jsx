import React, { useEffect, useState } from 'react';
import api from '../services/api';
import CommandeCard from '../components/CommandeCard';
import CommandeStats from '../components/CommandeStats';
import CommandeFormModal from '../components/CommandeFormModal';
import CommandeStatusModal from '../components/CommandeStatusModal';
import ToastModal from '../components/ToastModal';

const STATUTS = [
  { key: 'pending', label: 'En attente', color: 'blue' },
  { key: 'preparing', label: 'En préparation', color: 'yellow' },
  { key: 'ready', label: 'Prêtes à servir', color: 'green' },
  { key: 'delivered', label: 'Servies', color: 'gray' },
  { key: 'cancelled', label: 'Annulées', color: 'red' },
];

export default function CommandesGestion() {
  // Pagination
  const [page, setPage] = useState(1);
  const commandesParPage = 10;
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [plats, setPlats] = useState([]);
  const [tables, setTables] = useState([]);
  const [search, setSearch] = useState('');
  const [statusModal, setStatusModal] = useState({ open: false, commande: null });
  const [toast, setToast] = useState({ open: false, type: 'success', message: '' });
  const [showFilters, setShowFilters] = useState(false);

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
      setToast({ open: true, type: 'success', message: 'Commande créée avec succès !' });
      fetchCommandes();
    } catch {
      setToast({ open: true, type: 'error', message: 'Erreur lors de la création de la commande' });
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

  // Pagination : découpage des commandes filtrées
  const totalPages = Math.ceil(commandesFiltrees.length / commandesParPage) || 1;
  const commandesPage = commandesFiltrees.slice((page - 1) * commandesParPage, page * commandesParPage);

  // Remettre à la page 1 si filtre ou recherche change
  useEffect(() => { setPage(1); }, [filtre, search]);

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
          <div className="relative">
            <button className="bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50" onClick={() => setShowFilters(f => !f)}>
              <i className="fas fa-filter mr-2"></i> Filtres
            </button>
            {showFilters && (
              <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg z-10 animate-pop-in">
                {STATUTS.map(s => (
                  <button
                    key={s.key}
                    className={`block w-full text-left px-4 py-2 hover:bg-gray-100 ${filtre === s.key ? 'bg-blue-50 font-bold text-blue-700' : ''}`}
                    onClick={() => { setFiltre(s.key); setShowFilters(false); }}
                  >
                    {s.label}
                  </button>
                ))}
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setFiltre(''); setShowFilters(false); }}>Tous</button>
              </div>
            )}
          </div>
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
        <>
          <div className="space-y-4 mt-6">
            {commandesPage.length === 0 ? (
              <div className="text-center text-gray-500">Aucune commande à afficher.</div>
            ) : (
              commandesPage.map(cmd => (
                <div key={cmd.id} onClick={() => setStatusModal({ open: true, commande: cmd })} className="cursor-pointer">
                  <CommandeCard commande={cmd} />
                </div>
              ))
            )}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                className="px-3 py-1 rounded bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 text-white font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                Précédent
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                <button
                  key={num}
                  className={`px-3 py-1 rounded font-bold shadow transition-all duration-150 mx-0.5 ${num === page
                    ? 'bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 text-white scale-110 border-2 border-yellow-400'
                    : 'bg-white text-blue-700 border border-blue-200 hover:bg-blue-50'}
                  `}
                  onClick={() => setPage(num)}
                >
                  {num}
                </button>
              ))}
              <button
                className="px-3 py-1 rounded bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 text-white font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                Suivant
              </button>
            </div>
          )}
        </>
      )}
      <CommandeFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={handleSubmit} plats={plats} tables={tables} />
      <CommandeStatusModal
        open={statusModal.open}
        commande={statusModal.commande}
        onClose={() => setStatusModal({ open: false, commande: null })}
        onSave={async (newStatut) => {
          try {
            await api.patch(`/commandes/${statusModal.commande.id}/`, { statut: newStatut });
            setToast({ open: true, type: 'success', message: 'Statut modifié avec succès !' });
            setStatusModal({ open: false, commande: null });
            fetchCommandes();
          } catch {
            setToast({ open: true, type: 'error', message: 'Erreur lors de la modification du statut' });
          }
        }}
      />
      <ToastModal open={toast.open} type={toast.type} message={toast.message} onClose={() => setToast(t => ({ ...t, open: false }))} />
    </div>
  );
}
