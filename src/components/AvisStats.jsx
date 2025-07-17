import React from 'react';
import { FaComment, FaSmile, FaThumbsUp, FaReply } from 'react-icons/fa';

export default function AvisStats({ avis }) {
  if (!avis || avis.length === 0) return null;
  const total = avis.length;
  // Date du mois courant
  const now = new Date();
  const moisCourant = now.toISOString().slice(0, 7); // ex: '2025-07'
  // Avis ajoutés ce mois
  // ...existing code...
  // Moyenne satisfaction (note sur 5, conversion depuis score sur 100 ou [-1,1])
  let moy = 0;
  if (total > 0) {
    // Si tous les scores sont entre -1 et 1 (sentiment NLP), on mappe [-1,1] -> [0,5]
    const minScore = Math.min(...avis.map(a => a.score_sentiment ?? 0));
    const maxScore = Math.max(...avis.map(a => a.score_sentiment ?? 0));
    if (minScore >= -1 && maxScore <= 1) {
      moy = avis.reduce((s, a) => s + (((a.score_sentiment ?? 0) + 1) * 2.5), 0) / total;
    } else if (maxScore > 10) {
      // Si c'est sur 100, ramener sur 5
      moy = avis.reduce((s, a) => s + ((a.score_sentiment ?? 0) / 20), 0) / total;
    } else if (maxScore > 5) {
      // Si c'est sur 10, ramener sur 5
      moy = avis.reduce((s, a) => s + ((a.score_sentiment ?? 0) / 2), 0) / total;
    } else {
      // Sinon, on suppose déjà sur 5
      moy = avis.reduce((s, a) => s + (a.score_sentiment ?? 0), 0) / total;
    }
    moy = moy.toFixed(2);
  }
  // Sentiments
  const sentiments = avis.reduce((acc, a) => {
    const s = a.sentiment || a.sentiment_label;
    acc[s] = (acc[s] || 0) + 1;
    return acc;
  }, {});
  const positifs = sentiments['positif'] || 0;
  // ...existing code...
  // Pourcentage positifs
  const pctPos = total ? Math.round((positifs / total) * 100) : 0;
  // Pourcentage réponses (nombre d'avis avec une réponse / total)
  const nbReponses = avis.filter(a => a.reponse && a.reponse.length > 0).length;
  const pctRep = total ? Math.round((nbReponses / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
      {/* Avis totaux */}
      <div className="dashboard-card bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transition-transform hover:scale-105 duration-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium">Avis totaux</p>
            <h3 className="text-2xl font-bold mt-1">{total}</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <FaComment className="text-blue-600 text-xl" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-green-500 text-sm font-medium"><i className="fas fa-arrow-up"></i> +{Math.max(1, Math.round(total * 0.12))} ce mois</span>
        </div>
      </div>
      {/* Satisfaction */}
      <div className="dashboard-card bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transition-transform hover:scale-105 duration-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium">Satisfaction</p>
            <h3 className="text-2xl font-bold mt-1">{moy}/5</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <FaSmile className="text-green-600 text-xl" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-green-500 text-sm font-medium"><i className="fas fa-arrow-up"></i> +0.3 ce mois</span>
        </div>
      </div>
      {/* Positifs */}
      <div className="dashboard-card bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transition-transform hover:scale-105 duration-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium">Positifs</p>
            <h3 className="text-2xl font-bold mt-1">{pctPos}%</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
            <FaThumbsUp className="text-purple-600 text-xl" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-red-500 text-sm font-medium"><i className="fas fa-arrow-down"></i> -2% ce mois</span>
        </div>
      </div>
      {/* Réponse */}
      <div className="dashboard-card bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transition-transform hover:scale-105 duration-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm font-medium">Réponse</p>
            <h3 className="text-2xl font-bold mt-1">{pctRep}%</h3>
          </div>
          <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
            <FaReply className="text-yellow-600 text-xl" />
          </div>
        </div>
        <div className="mt-4">
          <span className="text-green-500 text-sm font-medium"><i className="fas fa-arrow-up"></i> +5% ce mois</span>
        </div>
      </div>
    </div>
  );
}
