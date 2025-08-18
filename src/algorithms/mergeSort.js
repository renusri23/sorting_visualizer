function merge(arr, l, m, r, steps, stats) {
  let n1 = m - l + 1;
  let n2 = r - m;

  let L = arr.slice(l, m + 1);
  let R = arr.slice(m + 1, r + 1);

  let i = 0, j = 0, k = l;

  while (i < n1 && j < n2) {
    stats.comparisons++;
    if (L[i] <= R[j]) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    stats.swaps++;
    steps.push([...arr]);
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    i++; k++;
    stats.swaps++;
    steps.push([...arr]);
  }

  while (j < n2) {
    arr[k] = R[j];
    j++; k++;
    stats.swaps++;
    steps.push([...arr]);
  }
}

function mergeSortHelper(arr, l, r, steps, stats) {
  if (l < r) {
    let m = Math.floor((l + r) / 2);
    mergeSortHelper(arr, l, m, steps, stats);
    mergeSortHelper(arr, m + 1, r, steps, stats);
    merge(arr, l, m, r, steps, stats);
  }
}

export default function mergeSort(arr) {
  let steps = [];
  let stats = { swaps: 0, comparisons: 0 };
  const start = performance.now();

  mergeSortHelper(arr, 0, arr.length - 1, steps, stats);

  const end = performance.now();
  stats.time = (end - start).toFixed(2) + " ms";

  return { steps, stats };
}
