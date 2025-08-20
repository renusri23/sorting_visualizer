import React from "react";

export default function TimeComplexities() {
  return (
    <div style={{ padding: 100, maxWidth: 900 }}>
      <h2>Time & Space Complexity</h2>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={th}>Algorithm</th>
            <th style={th}>Best</th>
            <th style={th}>Average</th>
            <th style={th}>Worst</th>
            <th style={th}>Space</th>
            <th style={th}>Stable</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Bubble Sort", "Ω(n)", "Θ(n²)", "O(n²)", "O(1)", "Yes"],
            ["Insertion Sort", "Ω(n)", "Θ(n²)", "O(n²)", "O(1)", "Yes"],
            ["Selection Sort", "Ω(n²)", "Θ(n²)", "O(n²)", "O(1)", "No"],
            ["Quick Sort", "Ω(n log n)", "Θ(n log n)", "O(n²)", "O(log n)", "No"],
            ["Merge Sort", "Ω(n log n)", "Θ(n log n)", "O(n log n)", "O(n)", "Yes"],
          ].map((row) => (
            <tr key={row[0]}>
              {row.map((cell, i) => (
                <td key={i} style={td}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = {
  textAlign: "left",
  borderBottom: "1px solid #ccc",
  padding: "8px",
};
const td = {
  borderBottom: "1px solid #eee",
  padding: "8px",
};
