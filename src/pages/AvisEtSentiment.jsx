import { useState, useEffect } from 'react';
import api from '../services/api'; // Assurez-vous que le chemin d'importation est correct
import AvisCard from '../components/AvisCard';

export default function AvisEtSentiment() {
  const [avis, setAvis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [repondreAvis, setRepondreAvis] = useState(null);

  const fetchAvis = async () => {
    setLoading(true);
    try {
      const response = await api.get('/avis/');
      setAvis(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des avis:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvis();
  }, []);

  const avisPage = avis.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(avis.length / pageSize);

  const handleRepondre = avis => setRepondreAvis(avis);
  const handleSendReponse = async reponse => {
    try {
      await api.post(`/avis/${repondreAvis.id}/repondre/`, { reponse });
      setRepondreAvis(null);
      fetchAvis();
    } catch {
      alert('Erreur lors de l\'envoi de la réponse');
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="title-font text-xl font-bold text-gray-800">Derniers Avis</h2>
            <button className="text-blue-600 text-sm font-medium">Voir tout</button>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="text-center py-10">Chargement...</div>
          ) : (
            avisPage.map(a => <AvisCard key={a.id} avis={a} onRepondre={() => handleRepondre(a)} />)
          )}
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded border ${page === i + 1 ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
      {repondreAvis && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Répondre à l'avis de {repondreAvis.user_nom || 'Client'}</h3>
            <textarea className="w-full border rounded p-2 mb-4" rows={3} placeholder="Votre réponse..." id="reponseAvisInput" />
            <div className="flex justify-end">
              <button className="bg-gray-100 px-4 py-2 rounded mr-2" onClick={() => setRepondreAvis(null)}>Annuler</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => handleSendReponse(document.getElementById('reponseAvisInput').value)}>Envoyer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}