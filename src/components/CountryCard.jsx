// src/components/CountryCard.jsx (arquivo completo atualizado)

import React from "react";
import { Link } from "react-router-dom";

const CountryCard = ({ country, isFavorite, onToggleFavorite }) => {
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <Link
      to={`/country/${country.name.common}`}
      className="block relative transform hover:-translate-y-2 transition-transform duration-300 h-full"
    >
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden h-full">
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 text-2xl text-yellow-400 z-10 p-1 bg-black/20 hover:bg-black/30 transition-colors"
          aria-label="Adicionar aos favoritos"
        >
          {isFavorite ? (
            <i className="fa-solid fa-star"></i>
          ) : (
            <i className="fa-regular fa-star"></i>
          )}
        </button>

        <img
          src={country.flags.svg}
          alt={`Bandeira de ${country.name.common}`}
          className="w-full h-40 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2">{country.name.common}</h3>
          <p>
            <span className="font-semibold">População:</span>{" "}
            {country.population.toLocaleString("pt-BR")}
          </p>
          <p>
            <span className="font-semibold">Região:</span> {country.region}
          </p>
          <p>
            <span className="font-semibold">Capital:</span>{" "}
            {country.capital ? country.capital[0] : "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
