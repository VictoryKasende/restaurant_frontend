import React from 'react';

export default function SentimentPie({ avis }) {
  // Placeholder camembert (à remplacer par un vrai graphique si besoin)
  const total = avis.length;
  const pos = avis.filter(a => a.sentiment === 'positif').length;
  const neu = avis.filter(a => a.sentiment === 'neutre').length;
  const neg = avis.filter(a => a.sentiment === 'negatif').length;
  return (
    <div className="h-80 flex flex-col items-center justify-center">
      <div className="relative w-40 h-40 mb-6">
        <div className="absolute inset-0 rounded-full bg-green-100 flex items-center justify-center">
          <div className="h-32 w-32 rounded-full bg-white flex items-center justify-center">
            <span className="text-xl font-bold">{total ? Math.round((pos / total) * 100) : 0}%</span>
          </div>
        </div>
        {/* Camembert visuel simplifié */}
        <div className="absolute inset-0 rounded-full" style={{clipPath:'polygon(0 0, 100% 0, 100% 50%, 0 50%)', background:`conic-gradient(#10B981 ${pos/total*100||0}%, #F59E0B ${(pos/total*100||0)+(neu/total*100||0)}%, #EF4444 100%)`}}></div>
      </div>
      <div className="w-full space-y-3">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm">Positif</span>
          <span className="ml-auto font-medium">{total ? Math.round((pos / total) * 100) : 0}%</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
          <span className="text-sm">Neutre</span>
          <span className="ml-auto font-medium">{total ? Math.round((neu / total) * 100) : 0}%</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
          <span className="text-sm">Négatif</span>
          <span className="ml-auto font-medium">{total ? Math.round((neg / total) * 100) : 0}%</span>
        </div>
      </div>
    </div>
  );
}
