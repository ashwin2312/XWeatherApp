import React, { useState } from "react";

import "./App.css";
import Button from "./components/Button";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [displayWeatherData, setDisplayWeatherData] = useState({});
  const [displayData, setDisplayData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { temp_c, humidity, wind_kph } = displayWeatherData;

  const handleClick = async () => {
    if (!city.trim()) {
      setErrorMessage("Please enter a city name");
      setDisplayData(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(""); // Clear previous errors
    setDisplayData(false); // Reset display before new fetch

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=a67979409d354878a62161041253101&q=${city}&aqi=yes`
      );

      if (!response.ok) {
        setErrorMessage("Failed to fetch weather data");
        return;
      }

      const data = await response.json();
      setWeatherData(data.current);
      setDisplayWeatherData(data.current);
      setDisplayData(true);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setErrorMessage("Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="searchbar-section">
        <SearchBar city={city} setCity={setCity} />
        <Button handleClick={handleClick} />
      </div>

      {isLoading && <p className="loading">Loading data...</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      {displayData && !isLoading && (
        <div className="weather-cards">
          {[
            { title: "Temperature", value: `${temp_c}℃` },
            { title: "Humidity", value: `${humidity}%` },
            {
              title: "Condition",
              value: displayWeatherData.condition?.text || "N/A",
            },
            { title: "Wind Speed", value: `${wind_kph} kph` },
          ].map((card, index) => (
            <WeatherCard key={index} title={card.title} value={card.value} />
          ))}
        </div>
      )}
    </div>
  );
}
