import React from 'react';

export default function MenuSearchBar({ value, onChange }) {
  return (
    <div className="relative flex-1">
      <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
      <input
        type="text"
        placeholder="Rechercher un plat..."
        className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  );
}
