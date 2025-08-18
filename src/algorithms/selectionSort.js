export default function selectionSort(arr) {
  let steps = [];
  let swaps = 0, comparisons = 0;
  const start = performance.now();

  for (let i = 0; i < arr.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < arr.length; j++) {
      comparisons++;
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      swaps++;
      steps.push([...arr]);
    }
  }

  const end = performance.now();
  return {
    steps,
    stats: {
      time: (end - start).toFixed(2) + " ms",
      swaps,
      comparisons
    }
  };
}
