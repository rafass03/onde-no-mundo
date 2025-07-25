// src/pages/HomePage.jsx

import React from "react";
import SearchForm from "../components/SearchForm";
import CountryCard from "../components/CountryCard";

const HomePage = ({
  countries,
  isLoading,
  error,
  onSearchSubmit,
  onSearchQueryChange,
  searchQuery,
  isFavorite,
  addFavorite,
  removeFavorite,
  isFavoritesFilterActive,
  onToggleFavoritesFilter,
}) => {
  return (
    <>
      <SearchForm
        onSearch={onSearchSubmit}
        query={searchQuery}
        onQueryChange={onSearchQueryChange}
        onToggleFavoritesFilter={onToggleFavoritesFilter}
        isFilterActive={isFavoritesFilterActive}
      />
      {isLoading && <p className="text-center mt-8">Carregando...</p>}
      {error && <p className="text-center text-red-500 mt-8">{error}</p>}
      {!isLoading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8">
          {countries && countries.length > 0 ? (
            countries.map((country) => (
              <CountryCard
                key={country.cca3}
                country={country}
                isFavorite={isFavorite(country.cca3)}
                onToggleFavorite={() => {
                  isFavorite(country.cca3)
                    ? removeFavorite(country.cca3)
                    : addFavorite(country.cca3);
                }}
              />
            ))
          ) : (
            <p className="col-span-full text-center mt-8">
              Nenhum país para exibir.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default HomePage;
