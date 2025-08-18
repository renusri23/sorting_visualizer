import React from "react";

export default function Description() {
  return (
    <div style={{ padding: 18, maxWidth: 900 }}>
      <h2>About This Visualizer</h2>
      <p>
        This 3D Sorting Visualizer shows how classic algorithms rearrange an array,
        step by step. Use the controls to shuffle the data, pick an algorithm,
        adjust speed, and play/pause the animation. Drag to rotate, scroll to zoom.
      </p>
      <ul>
        <li><strong>Bubble Sort</strong>: Repeatedly swaps adjacent out-of-order elements.</li>
        <li><strong>Insertion Sort</strong>: Inserts elements into a growing sorted prefix.</li>
        <li><strong>Selection Sort</strong>: Picks the minimum and places it at the front.</li>
        <li><strong>Quick Sort</strong>: Partitions around a pivot and recurses.</li>
        <li><strong>Merge Sort</strong>: Recursively divides and merges sorted halves.</li>
      </ul>
    </div>
  );
}
