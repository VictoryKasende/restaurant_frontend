import React from 'react';

export default function MenuCategoryTabs({ categories, selected, onSelect }) {
  return (
    <div className="flex overflow-x-auto pb-2 space-x-4">
      {categories.map(cat => (
        <button
          key={cat}
          className={`menu-category px-4 py-2 font-medium whitespace-nowrap ${selected === cat ? 'active border-b-4 border-pink-500 text-pink-600' : 'text-gray-700'}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
