import React from 'react';

export default function ToastModal({ open, type = 'success', message = '', onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 animate-fade-in">
      <div className={`rounded-lg shadow-xl px-8 py-6 min-w-[280px] flex flex-col items-center bg-white animate-pop-in border-t-4 ${type === 'success' ? 'border-green-500' : type === 'error' ? 'border-red-500' : 'border-blue-500'}`}>
        <div className="mb-2">
          {type === 'success' && <i className="fas fa-check-circle text-green-500 text-3xl animate-bounce-in"></i>}
          {type === 'error' && <i className="fas fa-times-circle text-red-500 text-3xl animate-bounce-in"></i>}
          {type === 'info' && <i className="fas fa-info-circle text-blue-500 text-3xl animate-bounce-in"></i>}
        </div>
        <div className="text-lg font-semibold text-gray-800 text-center mb-2">{message}</div>
        <button onClick={onClose} className="mt-2 px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700 transition">Fermer</button>
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
