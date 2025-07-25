// src/pages/DetailsPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { countriesAPI } from "../services/countriesAPI";
import WeatherWidget from "../components/WeatherWidget";

const DetailsPage = () => {
  const { countryName } = useParams();
  const navigate = useNavigate();

  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!countryName) {
      return;
    }

    const fetchCountryData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await countriesAPI.getCountryDetails(countryName);
        setCountry(data);
      } catch (err) {
        console.error("Erro ao buscar dados do país:", err);
        setError("Não foi possível encontrar os dados para este país.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryData();
  }, [countryName]);

  if (loading) {
    return (
      <div className="p-8 text-center">Carregando detalhes do país...</div>
    );
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">{error}</div>;
  }

  if (!country) {
    return <div className="p-8 text-center">País não encontrado.</div>;
  }

  const capitalName = country.capital ? country.capital[0] : null;

  return (
    <div className="p-4 md:p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 bg-white dark:bg-gray-700 shadow-md px-8 py-2 rounded-md flex items-center gap-2 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <i className="fa-solid fa-arrow-left"></i>
        Voltar
      </button>

      <div className="flex flex-col md:flex-row md:items-center md:gap-16">
        <div className="w-full md:w-5/12">
          <img
            src={country.flags.svg}
            alt={`Bandeira de ${country.name.common}`}
            className="w-full h-auto rounded-md shadow-lg"
          />
        </div>
        <div className="w-full md:w-7/12 mt-8 md:mt-0">
          <h1 className="text-3xl font-bold mb-6">{country.name.common}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-md">
            <p>
              <span className="font-semibold">Nome Nativo:</span>{" "}
              {country.name?.nativeName
                ? Object.values(country.name.nativeName)[0].common
                : "N/A"}
            </p>
            <p>
              <span className="font-semibold">População:</span>{" "}
              {country.population.toLocaleString("pt-BR")}
            </p>
            <p>
              <span className="font-semibold">Região:</span> {country.region}
            </p>
            <p>
              <span className="font-semibold">Sub-região:</span>{" "}
              {country.subregion || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Capital:</span>{" "}
              {capitalName || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Domínio:</span>{" "}
              {country.tld ? country.tld[0] : "N/A"}
            </p>
            <p>
              <span className="font-semibold">Moedas:</span>{" "}
              {country.currencies
                ? Object.values(country.currencies)
                    .map((c) => c.name)
                    .join(", ")
                : "N/A"}
            </p>
            <p>
              <span className="font-semibold">Línguas:</span>{" "}
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-lg mx-auto">
        {capitalName && <WeatherWidget capital={capitalName} />}
      </div>
    </div>
  );
};

export default DetailsPage;
