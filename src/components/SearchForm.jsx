// src/components/SearchForm.jsx (arquivo completo atualizado)

import React, { useState } from "react";

const SearchForm = ({
  onSearch,
  query,
  onQueryChange,
  onToggleFavoritesFilter,
  isFilterActive,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center my-4">
      <button
        type="button"
        onClick={onToggleFavoritesFilter}
        className="bg-blue-600 text-white px-4 py-3 rounded-l-md hover:bg-blue-700 transition-colors flex items-center"
        aria-label="Filtrar favoritos"
      >
        {isFilterActive ? (
          <i className="fa-solid fa-star text-yellow-400"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </button>
      <input
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Digite o nome de um país..."
        className="w-full max-w-md p-3 border-0 outline-none text-gray-800"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-r-md hover:bg-blue-700 transition-colors"
      >
        Buscar
      </button>
    </form>
  );
};

export default SearchForm;
