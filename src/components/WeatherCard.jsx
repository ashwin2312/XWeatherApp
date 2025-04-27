import React from "react";
import "./Weathercard.css";

export default function WeatherCard({ title, value }) {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
}
