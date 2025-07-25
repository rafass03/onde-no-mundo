// src/services/weatherApi.js

import axios from "axios";

// OpenWeatherMap API

const apiKey = "b1b9996070edf4009d2bbf327ea6571c";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const apiClient = axios.create({
  baseURL: BASE_URL,
});

const getWeatherByCity = async (city) => {
  try {
    const response = await apiClient.get("/weather", {
      params: {
        q: city,
        units: "metric",
        appid: apiKey,
        lang: "pt_br",
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Erro na API de Clima:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export const weatherAPI = {
  getWeatherByCity,
};
