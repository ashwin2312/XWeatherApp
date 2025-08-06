import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Button from "./components/Button";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [city, setCity] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [displayWeatherData, setDisplayWeatherData] = useState({});
  const [displayData, setDisplayData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let API = `https://api.weatherapi.com/v1/current.json?key=a67979409d354878a62161041253101&q=${debouncedValue}&aqi=yes`;

  const getCityData = async () => {
    console.log("getcitydata function entry");
    try {
      console.log("try");
      const response = await fetch(API);
      console.log("response::", response);
      if (!response.ok) {
        alert("Failed to fetch weather data");
        setIsLoading(true);
        displayData(false);
      }
      const data = await response.json();
      console.log("data::", data);
      setWeatherData(data.current);
    } catch (error) {
      console.log("catch");
      console.error("Error while fetching data::", error);
      // alert("Failed to fetch weather data");
      // setIsLoading(true);
      // displayData(false);
    }
   
  };

  const { temp_c, humidity, wind_kph } = displayWeatherData;

  const handleClick = () => {
    // e.preventDefault();
    setDisplayData(true);
    setDisplayWeatherData(weatherData);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(city);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [city]);

  useEffect(() => {
    if (debouncedValue) {
      setIsLoading(true);
      getCityData();
      setIsLoading(false);
      console.log("get city data::", getCityData());
    } else {
      setIsLoading(false);
      setDisplayData(false);
    }
  }, [debouncedValue]);

  return (
    <div>
      <div className="searchbar-section">
        <div className="searchbar-section">
          <SearchBar
            city={city}
            setCity={setCity}
            debouncedValue={debouncedValue}
            setDebouncedValue={setDebouncedValue}
          />
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
