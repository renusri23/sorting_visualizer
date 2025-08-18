import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";

export default function Controls({ onSort, onGenerate }) {
  return (
    <div className="text-center">
      <Button variant="secondary" className="m-2" onClick={onGenerate}>
        Generate New Array
      </Button>
      <ButtonGroup className="m-2">
        <Button onClick={() => onSort("bubble")}>Bubble Sort</Button>
        <Button onClick={() => onSort("insertion")}>Insertion Sort</Button>
        <Button onClick={() => onSort("selection")}>Selection Sort</Button>
        <Button onClick={() => onSort("quick")}>Quick Sort</Button>
        <Button onClick={() => onSort("merge")}>Merge Sort</Button>
      </ButtonGroup>
    </div>
  );
}
