import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SidePanel from "./components/SidePanel";
import SortingVisualizer from "./components/SortingVisualizer";
import Description from "./pages/Description";
import TimeComplexities from "./pages/TimeComplexities";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [steps, setSteps] = useState([]);            // log lines
  const [stats, setStats] = useState(null);          // { comparisons, swaps, timeMs }
  const [arraySize, setArraySize] = useState(25);
  const [selectedAlgo, setSelectedAlgo] = useState("Bubble Sort");

  return (
    <Router>
      <div className={darkMode ? "app dark" : "app"}>
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          selectedAlgo={selectedAlgo}
          setSelectedAlgo={setSelectedAlgo}
        />

        <div className="app-body">
          <SidePanel
            steps={steps}
            stats={stats}
            arraySize={arraySize}
            setArraySize={setArraySize}
          />

          <div className="content">
            <Routes>
              <Route
                path="/"
                element={
                  <SortingVisualizer
                    selectedAlgo={selectedAlgo}
                    arraySize={arraySize}
                    setSteps={setSteps}
                    setStats={setStats}
                    darkMode={darkMode}
                  />
                }
              />
              <Route path="/description" element={<Description />} />
              <Route path="/time-complexities" element={<TimeComplexities />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
