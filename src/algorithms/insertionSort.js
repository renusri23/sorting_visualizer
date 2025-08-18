export default function insertionSort(arr) {
  let steps = [];
  let swaps = 0, comparisons = 0;
  const start = performance.now();

  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      comparisons++;
      arr[j + 1] = arr[j];
      swaps++;
      steps.push([...arr]);
      j--;
    }
    arr[j + 1] = key;
    steps.push([...arr]);
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
