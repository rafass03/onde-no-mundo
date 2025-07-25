// src/components/WeatherData.jsx

import React from "react";

const WeatherData = ({ data }) => {
  const { name, main, weather, sys, wind } = data;

  return (
    <div className="border-t border-white/30 dark:border-white/30 mt-6 pt-6 text-center">
      <h2 className="flex justify-center items-center gap-2 mb-3 text-xl font-bold">
        <i className="fa-solid fa-location-dot"></i>
        <span>{name}</span>
        <img
          src={`https://flagsapi.com/${sys.country}/flat/64.png`}
          className="h-4"
          alt={`Bandeira do país ${sys.country}`}
        />
      </h2>

      <p className="text-5xl my-3">
        <span>{Math.round(main.temp)}</span>&deg;C
      </p>

      <div className="flex justify-center items-center gap-2 my-3">
        <p className="capitalize font-bold">{weather[0].description}</p>
        <img
          src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`}
          alt="Condições atuais"
          className="w-10"
        />
      </div>
      <div className="flex justify-center items-center">
        <p className="flex items-center gap-2 px-3 py-2">
          <i className="fa-solid fa-droplet"></i>
          <span>{main.humidity}%</span>
        </p>
        <div className="bg-white/50 dark:bg-white/50 h-6 w-[1px]"></div>
        <p className="flex items-center gap-2 px-3 py-2">
          <i className="fa-solid fa-wind"></i>
          <span>{wind.speed}km/h</span>
        </p>
      </div>
    </div>
  );
};

export default WeatherData;
