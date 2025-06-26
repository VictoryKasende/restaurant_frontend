import React from 'react';

export default function AvisCard({ avis, onRepondre }) {
  const sentimentClass = avis.sentiment === 'positif' ? 'bg-green-100' : avis.sentiment === 'negatif' ? 'bg-red-100' : 'bg-yellow-100';

  return (
    <div className={`review-card p-6 transition duration-300 ease-in-out ${sentimentClass}`}>
      <div className="flex items-start">
        <img src={avis.user_avatar || 'https://randomuser.me/api/portraits/men/32.jpg'} alt="User" className="h-10 w-10 rounded-full mr-4" />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-bold">{avis.user_nom || 'Client'}</h4>
              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className={`fas fa-star${i < avis.note ? '' : ' text-gray-300'}`}></i>
                  ))}
                </div>
                <span className="text-gray-500 text-sm ml-2">{avis.date || ''}</span>
              </div>
            </div>
            <span className={`px-2 py-1 bg-${avis.sentiment === 'positif' ? 'green' : avis.sentiment === 'negatif' ? 'red' : 'yellow'}-100 text-${avis.sentiment === 'positif' ? 'green' : avis.sentiment === 'negatif' ? 'red' : 'yellow'}-800 text-xs font-medium rounded-full`}>
              {avis.sentiment === 'positif' ? 'Positif' : avis.sentiment === 'negatif' ? 'Négatif' : 'Neutre'}
            </span>
          </div>
          <p className="mt-3 text-gray-700">{avis.commentaire}</p>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-500">Commandé : {avis.commande_items?.join(', ')}</span>
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