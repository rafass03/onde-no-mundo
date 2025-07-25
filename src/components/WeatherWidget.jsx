// src/components/WeatherWidget.jsx

import { useState, useEffect } from "react";
import WeatherData from "./WeatherData";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { weatherAPI } from "../services/weatherAPI";

const WeatherWidget = ({ capital }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!capital) return;

    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);
      setWeatherData(null);

      try {
        const data = await weatherAPI.getWeatherByCity(capital);
        setWeatherData(data);
      } catch (err) {
        setError("Não foi possível encontrar o clima para esta capital.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [capital]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (weatherData) return <WeatherData data={weatherData} />;

  return null;
};

export default WeatherWidget;