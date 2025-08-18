import React from "react";

function SidePanel({ steps = [], stats, arraySize, setArraySize }) {
  return (
    <aside className="side-panel">
      <h3 className="panel-heading">Steps</h3>
      <div className="steps-container">
        {steps.length ? (
          steps.map((s, i) => (
            <div className="step" key={i}>
              {s}
            </div>
          ))
        ) : (
          <div style={{ opacity: 0.7, fontSize: 13 }}>No steps yet. Click “Play” to visualize.</div>
        )}
      </div>

      <h3 className="panel-heading">Array Size</h3>
      <input
        className="slider"
        type="range"
        min="5"
        max="100"
        value={arraySize}
        onChange={(e) => setArraySize(Number(e.target.value))}
      />
      <div className="stat">{arraySize} elements</div>

      <h3 className="panel-heading">Stats</h3>
      <div className="stat">Comparisons: {stats?.comparisons ?? 0}</div>
      <div className="stat">Swaps/Moves: {stats?.swaps ?? 0}</div>
      <div className="stat">Time: {stats?.timeMs ? `${stats.timeMs} ms` : "-"}</div>
    </aside>
  );
}

export default SidePanel;
