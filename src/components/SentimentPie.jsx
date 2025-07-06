import React from 'react';

export default function SentimentPie({ avis }) {
  // Placeholder camembert (à remplacer par un vrai graphique si besoin)
  const total = avis.length;
  const pos = avis.filter(a => (a.sentiment === 'positif' || a.sentiment_label === 'positif')).length;
  const neu = avis.filter(a => (a.sentiment === 'neutre' || a.sentiment_label === 'neutre')).length;
  const neg = avis.filter(a => (a.sentiment === 'negatif' || a.sentiment_label === 'négatif')).length;
  return (
    <div className="w-full max-w-md mx-auto py-8">
      
      <div className="space-y-6">
        {/* Positif */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>Positif</span>
            <span className="font-semibold">{total ? Math.round((pos / total) * 100) : 0}% <span className="text-gray-400 text-xs">({pos})</span></span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="h-4 rounded-full bg-green-500 transition-all duration-500" style={{width: `${total ? (pos / total) * 100 : 0}%`}}></div>
          </div>
        </div>
        {/* Neutre */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></span>Neutre</span>
            <span className="font-semibold">{total ? Math.round((neu / total) * 100) : 0}% <span className="text-gray-400 text-xs">({neu})</span></span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="h-4 rounded-full bg-yellow-500 transition-all duration-500" style={{width: `${total ? (neu / total) * 100 : 0}%`}}></div>
          </div>
        </div>
        {/* Négatif */}
        <div>
          <div className="flex justify-between mb-1">
            <span className="flex items-center"><span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>Négatif</span>
            <span className="font-semibold">{total ? Math.round((neg / total) * 100) : 0}% <span className="text-gray-400 text-xs">({neg})</span></span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div className="h-4 rounded-full bg-red-500 transition-all duration-500" style={{width: `${total ? (neg / total) * 100 : 0}%`}}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
