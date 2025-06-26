import React from 'react';

export default function WordCloudAvis({ avis }) {
  // Extraction simple des mots-clés (à améliorer selon l'API ou NLP)
  const mots = {};
  avis.forEach(a => {
    (a.commentaire || '').split(/\s+/).forEach(mot => {
      const m = mot.toLowerCase().replace(/[^a-zàâçéèêëîïôûùüÿñæœ-]/gi, '');
      if (m.length > 3) mots[m] = (mots[m] || 0) + 1;
    });
  });
  const sorted = Object.entries(mots).sort((a, b) => b[1] - a[1]).slice(0, 12);
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="title-font text-xl font-bold text-gray-800 mb-6">Mots-clés des Avis</h2>
      <div className="flex flex-wrap justify-center gap-3 p-8 bg-gray-50 rounded-lg">
        {sorted.map(([mot, freq], i) => (
          <span key={mot} className={`text-${freq > 5 ? '2xl' : freq > 2 ? 'xl' : 'lg'} font-bold text-blue-600`}>{mot}</span>
        ))}
      </div>
    </div>
  );
}
