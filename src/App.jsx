// src/App.jsx

import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import DetailsPage from "./pages/DetailsPage";
import { countriesAPI } from "./services/countriesAPI";
import { useFavorites } from "./hooks/useFavorites";

function App() {
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [isFavoritesFilterActive, setIsFavoritesFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAllCountries();
  }, []);

  const fetchAllCountries = async () => {
    try {
      setIsLoading(true);
      const data = await countriesAPI.getAllCountries();

      const sortedData = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setCountries(sortedData);
      setError(null);
    } catch (err) {
      setError("Falha ao carregar os países. Tente novamente mais tarde.");
      setCountries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsFavoritesFilterActive(false);
    if (!searchQuery) {
      fetchAllCountries();
      return;
    }
    try {
      setIsLoading(true);
      const data = await countriesAPI.searchCountryByName(searchQuery);
      setCountries(data);
      setError(null);
    } catch (err) {
      setError(`Nenhum país encontrado para "${searchQuery}".`);
      setCountries([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsFavoritesFilterActive(false);
    fetchAllCountries();
    setSearchQuery("");
  };

  const toggleFavoritesFilter = () => {
    setIsFavoritesFilterActive((prevState) => !prevState);
  };

  const favoriteCountries = countries.filter((country) =>
    favorites.includes(country.cca3)
  );
  const displayedCountries = isFavoritesFilterActive
    ? favoriteCountries
    : countries;

  return (
    <Router>
      <div className="bg-gray-100 dark:bg-gray-800 min-h-screen text-gray-900 dark:text-gray-100">
        <Header onReset={handleReset} />
        <main className="container mx-auto p-4 md:p-8">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  countries={displayedCountries}
                  isLoading={isLoading}
                  error={error}
                  searchQuery={searchQuery}
                  onSearchQueryChange={setSearchQuery}
                  onSearchSubmit={handleSearch}
                  isFavorite={isFavorite}
                  addFavorite={addFavorite}
                  removeFavorite={removeFavorite}
                  isFavoritesFilterActive={isFavoritesFilterActive}
                  onToggleFavoritesFilter={toggleFavoritesFilter}
                />
              }
            />
            <Route path="/country/:countryName" element={<DetailsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
