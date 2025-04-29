import React from "react";
import "./Searchbar.css";

export default function SearchBar({ city, setCity, debouncedValue, setDebouncedValue }) {
  return (
    <div>
      <input
        className="searchBar-container"
        type="input"
        name=""
        id=""
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </div>
  );
}
