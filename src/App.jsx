import React, { useEffect, useState } from "react";

import "./App.css";
import Button from "./components/Button";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [city, setCity] = useState("");
  // const [debouncedValue, setDebouncedValue] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [displayWeatherData, setDisplayWeatherData] = useState({});
  const [displayData, setDisplayData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { temp_c, humidity, wind_kph } = displayWeatherData;

  const handleClick = async () => {
    if (!city) return;
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=a67979409d354878a62161041253101&q=${city}&aqi=yes`
      );
      if (!response.ok) {
        alert("City not found or invalid input");
        setDisplayData(false);
        setIsLoading(false);
        return;
      }
      const data = await response.json();
      setWeatherData(data.current);
      setDisplayWeatherData(data.current);
      setDisplayData(true);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data");
      setDisplayData(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="searchbar-section">
        <div className="searchbar-section">
          <SearchBar city={city} setCity={setCity} />
          <Button handleClick={handleClick} />
        </div>
      </div>
      {isLoading && <p>Loading data...</p>}
      {displayData && !isLoading ? (
        <div className="weather-cards">
          {[
            { title: "Temperature", value: `${temp_c}℃` },
            { title: "Humidity", value: `${humidity}%` },
            { title: "Condition", value: displayWeatherData.condition?.text },
            { title: "Wind Speed", value: `${wind_kph} kph` },
          ].map((card, index) => (
            <WeatherCard key={index} title={card.title} value={card.value} />
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
