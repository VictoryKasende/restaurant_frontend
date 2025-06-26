import React from 'react';

export default function ConfirmModal({ open, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 animate-fade-in">
      <div className="rounded-lg shadow-xl px-8 py-6 min-w-[280px] flex flex-col items-center bg-white animate-pop-in">
        <div className="mb-2">
          <i className="fas fa-exclamation-triangle text-yellow-500 text-3xl animate-bounce-in"></i>
        </div>
        <div className="text-lg font-semibold text-gray-800 text-center mb-4">{message}</div>
        <div className="flex gap-4 mt-2">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 transition">Annuler</button>
          <button onClick={onConfirm} className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition">Supprimer</button>
        </div>
      </div>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.2s; }
        .animate-pop-in { animation: popIn 0.25s; }
        .animate-bounce-in { animation: bounceIn 0.4s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes bounceIn { 0% { transform: scale(0.7); } 60% { transform: scale(1.1); } 100% { transform: scale(1); } }
      `}</style>
    </div>
  );
}
