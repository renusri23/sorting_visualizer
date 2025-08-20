import React from "react";
import "../App.css"
export default function Description() {
  return (
    <div  style={{
        padding: "20px 20px 40px 40px", 
        marginLeft: "40px",            
        marginBottom: "100px",          
        maxWidth: 900,}}>
      <h2>About This Visualizer</h2>
      <p>
        This 3D Sorting Visualizer shows how classic algorithms rearrange an
        array, step by step. Use the controls to shuffle the data, pick an
        algorithm, adjust speed, and play/pause the animation. Drag to rotate,
        scroll to zoom.
      </p>
      <ul>
        <li>
          <strong>Bubble Sort</strong>: A simple algorithm that repeatedly steps
          through the list, compares adjacent elements, and swaps them if they
          are in the wrong order. <br />
          <em>Steps:</em>
          <ol>
            <li>Start at the beginning of the array.</li>
            <li>Compare the first two elements.</li>
            <li>If the first is larger, swap them.</li>
            <li>Move to the next pair and repeat until the end.</li>
            <li>Each pass "bubbles up" the largest element to its correct place.</li>
            <li>Repeat passes until no swaps are needed (array is sorted).</li>
          </ol>
        </li>

        <li>
          <strong>Insertion Sort</strong>: Builds the sorted array one element
          at a time by inserting each element into its correct position. <br />
          <em>Steps:</em>
          <ol>
            <li>Start with the first element (already sorted).</li>
            <li>Pick the next element.</li>
            <li>Compare it with elements in the sorted part (to the left).</li>
            <li>Shift larger elements one position to the right.</li>
            <li>Insert the picked element into the correct gap.</li>
            <li>Repeat until the whole array is sorted.</li>
          </ol>
        </li>

        <li>
          <strong>Selection Sort</strong>: Finds the minimum element from the
          unsorted part and places it at the beginning. <br />
          <em>Steps:</em>
          <ol>
            <li>Start with the full array.</li>
            <li>Find the smallest element in the unsorted section.</li>
            <li>Swap it with the first unsorted element.</li>
            <li>Now consider the remaining part as unsorted.</li>
            <li>Repeat until the array is fully sorted.</li>
          </ol>
        </li>

        <li>
          <strong>Quick Sort</strong>: A divide-and-conquer algorithm that
          partitions the array around a pivot. <br />
          <em>Steps:</em>
          <ol>
            <li>Pick a pivot element (commonly first, last, or random).</li>
            <li>Rearrange elements so that smaller ones go left and larger ones go right of pivot.</li>
            <li>Now pivot is in its correct sorted place.</li>
            <li>Recursively apply Quick Sort to left and right subarrays.</li>
            <li>Continue until all subarrays are size 1 (base case).</li>
          </ol>
        </li>

        <li>
          <strong>Merge Sort</strong>: A divide-and-conquer algorithm that
          splits the array and merges sorted halves. <br />
          <em>Steps:</em>
          <ol>
            <li>Divide the array into two halves.</li>
            <li>Recursively split each half until only single-element arrays remain.</li>
            <li>Merge two small sorted arrays into one sorted array.</li>
            <li>Repeat merging until the entire array is rebuilt in sorted order.</li>
          </ol>
        </li>
      </ul>
    </div>
  );
}
