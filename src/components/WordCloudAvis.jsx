import React from 'react';

export default function WordCloudAvis({ avis }) {
  // Extraction simple des mots-clés (à améliorer selon l'API ou NLP)
  const mots = {};
  avis.forEach(a => {
    // Prend en compte commentaire, texte, et tout champ textuel utile
    const contenu = [a.commentaire, a.texte, a.text, a.message].filter(Boolean).join(' ');
    contenu.split(/\s+/).forEach(mot => {
      const m = mot.toLowerCase().replace(/[^a-zàâçéèêëîïôûùüÿñæœ-]/gi, '');
      if (m.length > 3) mots[m] = (mots[m] || 0) + 1;
    });
  });
  // Plus de mots, taille dynamique, couleurs variées
  const sorted = Object.entries(mots).sort((a, b) => b[1] - a[1]).slice(0, 30);
  const palette = [
    'text-blue-600', 'text-pink-600', 'text-purple-600', 'text-green-600', 'text-yellow-600', 'text-red-600', 'text-indigo-600', 'text-teal-600', 'text-orange-600', 'text-fuchsia-600', 'text-cyan-600', 'text-emerald-600', 'text-amber-600', 'text-violet-600', 'text-rose-600'
  ];
  const getSize = freq => freq > 10 ? 'text-4xl' : freq > 6 ? 'text-3xl' : freq > 3 ? 'text-2xl' : 'text-lg';
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <h2 className="title-font text-xl font-bold text-gray-800 mb-6">Mots-clés des Avis</h2>
      <div className="flex flex-wrap justify-center gap-3 p-8 bg-gray-50 rounded-lg">
        {sorted.length === 0 && <span className="text-gray-400">Aucun mot-clé trouvé.</span>}
        {sorted.map(([mot, freq], i) => (
          <span
            key={mot}
            className={`font-bold ${getSize(freq)} ${palette[i % palette.length]} transition-all duration-200`}
            style={{
              transform: `rotate(${(i % 2 === 0 ? 1 : -1) * (Math.random() * 8)}deg) scale(${1 + freq / 18})`,
              margin: '0.2em',
              cursor: 'pointer',
              opacity: 0.85
            }}
            title={`${mot} (${freq} occurrence${freq > 1 ? 's' : ''})`}
          >
            {mot}
          </span>
        ))}
      </div>
    </div>
  );
}
