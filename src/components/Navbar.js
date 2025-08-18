import React from "react";
import { Link } from "react-router-dom";

const algos = ["Bubble Sort", "Insertion Sort", "Selection Sort", "Quick Sort", "Merge Sort"];

function Navbar({ darkMode, setDarkMode, selectedAlgo, setSelectedAlgo }) {
  return (
    <div className="navbar">
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <strong>3D Sorting Visualizer</strong>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/description">Description</Link>
          <Link to="/time-complexities">Time Complexities</Link>
        </div>
      </div>

      <div className="nav-right">
        <select
          className="select"
          value={selectedAlgo}
          onChange={(e) => setSelectedAlgo(e.target.value)}
        >
          {algos.map((a) => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>

        <button
          className="mode-btn"
          onClick={() => setDarkMode(!darkMode)}
          title="Toggle dark/light"
        >
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;
