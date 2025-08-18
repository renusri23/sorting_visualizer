function quickSortHelper(arr, low, high, steps, stats) {
  if (low < high) {
    let pi = partition(arr, low, high, steps, stats);
    quickSortHelper(arr, low, pi - 1, steps, stats);
    quickSortHelper(arr, pi + 1, high, steps, stats);
  }
}

function partition(arr, low, high, steps, stats) {
  let pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {
    stats.comparisons++;
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      stats.swaps++;
      steps.push([...arr]);
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  stats.swaps++;
  steps.push([...arr]);
  return i + 1;
}

export default function quickSort(arr) {
  let steps = [];
  let stats = { swaps: 0, comparisons: 0 };
  const start = performance.now();

  quickSortHelper(arr, 0, arr.length - 1, steps, stats);

  const end = performance.now();
  stats.time = (end - start).toFixed(2) + " ms";

  return { steps, stats };
}
