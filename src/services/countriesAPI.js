// src/services/countriesAPI.js

import axios from "axios";

// REST Countries API

const BASE_URL = "https://restcountries.com/v3.1";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const countriesAPI = {
  getAllCountries: async () => {
    const response = await apiClient.get(
      "/all?fields=name,cca3,flags,population,region,capital"
    );
    return response.data;
  },

  searchCountryByName: async (name) => {
    try {
      const response = await apiClient.get(`/name/${name}`);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  },

  getCountryDetails: async (name) => {
    try {
      const response = await apiClient.get(`/name/${name}?fullText=true`);
      return response.data[0];
    } catch (error) {
      console.error("API Error fetching details:", error);
      throw error;
    }
  },
};
