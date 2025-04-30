import React from "react";
import "./Button.css";

export default function Button({ handleClick }) {
  return (
    <div>
      <button className="button-container" type="button" onClick={handleClick}>
        Search
      </button>
    </div>
  );
}
