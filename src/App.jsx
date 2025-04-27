import React, { useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import { useState } from "react";

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [displayData, setDisplayData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cityName, setCityName] = useState("");

  let API = `http://api.weatherapi.com/v1/current.json?key=a67979409d354878a62161041253101&q=${city}&aqi=yes`;

  const getCityData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(API);
      const data = await response.json();
      setWeatherData(data.current);
      setCityName(data.location.name);
      setIsLoading(false);
    } catch (error) {
      console.error("Error while fetching data::", error);
      if (!cityName) {
        alert("Failed to fetch weather data");
        setIsLoading(true);
        displayData(false);
      }
    }
  };

  console.log("cityname::", cityName);

  const { temp_c, humidity, wind_kph } = weatherData;

  const handleSubmit = (e) => {
    e.preventDefault();
    getCityData();
    setDisplayData(true);
  };

  // useEffect(() => {}, []);

  return (
    <div>
      <div className="searchbar-section">
        <form className="searchbar-section" action="" onSubmit={handleSubmit}>
          <SearchBar city={city} setCity={setCity} />
          <Button />
        </form>
      </div>
      {isLoading && <p>Loading...</p>}
      {displayData && !isLoading ? (
        <div className="weather-cards">
          {[
            { title: "Temperature", value: `${temp_c}℃` },
            { title: "Humidity", value: `${humidity}%` },
            { title: "Condition", value: weatherData.condition?.text },
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
