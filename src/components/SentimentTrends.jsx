

import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

export default function SentimentTrends({ avis }) {
  if (!avis || avis.length === 0) return null;
  // Regroupe les avis par date (jour)
  const byDay = avis.reduce((acc, a) => {
    const d = a.date ? a.date.slice(0, 10) : 'inconnu';
    acc[d] = acc[d] || { date: d, positif: 0, neutre: 0, negatif: 0 };
    const s = a.sentiment || a.sentiment_label;
    if (s === 'positif' || s === 'neutre' || s === 'negatif' || s === 'négatif') {
      const key = s === 'négatif' ? 'negatif' : s;
      acc[d][key] = (acc[d][key] || 0) + 1;
    }
    return acc;
  }, {});
  const data = Object.values(byDay).sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h4 className="font-bold mb-4">Tendance des sentiments</h4>
      <div className="w-full" style={{ minHeight: 220 }}>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => [value, 'Nombre']} />
            <Legend verticalAlign="top" height={36} iconType="circle"/>
            <Line type="monotone" dataKey="positif" name="Positif" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="neutre" name="Neutre" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="negatif" name="Négatif" stroke="#EF4444" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
