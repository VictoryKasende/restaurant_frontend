import React from 'react';

export default function AvisCard({ avis, onRepondre }) {
  // Détermination des couleurs et classes selon le sentiment
  let sentimentClass = '';
  let badgeBg = '';
  let badgeText = '';
  let sentimentLabel = 'Neutre';
  if (avis.sentiment_label === 'positif') {
    sentimentClass = 'sentiment-positive bg-green-50 hover:shadow-lg';
    badgeBg = 'bg-green-100';
    badgeText = 'text-green-800';
    sentimentLabel = 'Positif';
  } else if (avis.sentiment_label === 'négatif') {
    sentimentClass = 'sentiment-negative bg-red-50 hover:shadow-lg';
    badgeBg = 'bg-red-100';
    badgeText = 'text-red-800';
    sentimentLabel = 'Négatif';
  } else {
    sentimentClass = 'sentiment-neutral bg-yellow-50 hover:shadow-lg';
    badgeBg = 'bg-yellow-100';
    badgeText = 'text-yellow-800';
    sentimentLabel = 'Neutre';
  }

  // Formatage de la date
  let dateStr = '';
  if (avis.date) {
    const d = new Date(avis.date);
    dateStr = d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  return (
    <div className={`review-card p-6 rounded-xl transition duration-300 ease-in-out ${sentimentClass} mb-2`}>
      <div className="flex items-start">
        <img src={avis.user_avatar || 'https://randomuser.me/api/portraits/men/32.jpg'} alt="User" className="h-10 w-10 rounded-full mr-4 border-2 border-white shadow" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-800">{avis.client_username || avis.user_nom || 'Client'}</h4>
              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star${i < (avis.score_sentiment || 0) ? '' : ' text-gray-300'}`}></i>
                  ))}
                </div>
                <span className="text-gray-500 text-sm ml-2">{dateStr}</span>
              </div>
            </div>
            <span className={`px-2 py-1 ${badgeBg} ${badgeText} text-xs font-medium rounded-full`}>
              {sentimentLabel}
            </span>
          </div>
          <p className="mt-3 text-gray-700">"{avis.texte || avis.commentaire || ''}"</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Commande n° : {avis.commande}</span>
          </div>
          <div className="mt-4 flex space-x-3">
            <button className="text-blue-600 text-sm font-medium flex items-center" onClick={onRepondre}>
              <i className="fas fa-reply mr-1"></i> Répondre
            </button>
            <button className="text-gray-500 text-sm font-medium flex items-center">
              <i className="fas fa-flag mr-1"></i> Signaler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}