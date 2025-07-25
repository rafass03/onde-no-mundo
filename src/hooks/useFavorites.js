// src/hooks/useFavorites.js

import { useState, useEffect } from "react";

const STORAGE_KEY = "favoriteCountries";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const storedFavorites = window.localStorage.getItem(STORAGE_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error("Erro ao ler do localStorage", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error("Erro ao salvar no localStorage", error);
    }
  }, [favorites]);

  const addFavorite = (countryCode) => {
    if (!favorites.includes(countryCode)) {
      setFavorites([...favorites, countryCode]);
    }
  };

  const removeFavorite = (countryCode) => {
    setFavorites(favorites.filter((code) => code !== countryCode));
  };

  const isFavorite = (countryCode) => {
    return favorites.includes(countryCode);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
};
