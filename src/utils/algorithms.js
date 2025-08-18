/**
 * Each algorithm returns frames for animation:
 * frame: { array: number[], highlight: number[] (indexes), done?: number[] }
 * logs: string[] human-readable steps
 * stats: { comparisons, swaps }
 */

export function computeFrames(name, input) {
  const arr = [...input];
  switch (name) {
    case "Insertion Sort": return insertionFrames(arr);
    case "Selection Sort": return selectionFrames(arr);
    case "Quick Sort":     return quickFrames(arr);
    case "Merge Sort":     return mergeFrames(arr);
    default:               return bubbleFrames(arr);
  }
}

function bubbleFrames(a) {
  const frames = [{ array: [...a], highlight: [] }];
  const logs = ["Start Bubble Sort"];
  let comparisons = 0, swaps = 0;
  for (let i = 0; i < a.length - 1; i++) {
    let swapped = false;
    for (let j = 0; j < a.length - i - 1; j++) {
      comparisons++;
      frames.push({ array: [...a], highlight: [j, j + 1] });
      logs.push(`Compare a[${j}]=${a[j]} and a[${j+1}]=${a[j+1]}`);
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
        frames.push({ array: [...a], highlight: [j, j + 1] });
        logs.push(`Swap → ${a.join(", ")}`);
        swapped = true;
      }
    }
    frames.push({ array: [...a], highlight: [], done: [a.length - 1 - i] });
  }
  frames.push({ array: [...a], highlight: [], done: a.map((_, i) => i) });
  logs.push("Sorted!");
  return { frames, logs, stats: { comparisons, swaps } };
}

function insertionFrames(a) {
  const frames = [{ array: [...a], highlight: [] }];
  const logs = ["Start Insertion Sort"];
  let comparisons = 0, swaps = 0;
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    logs.push(`Pick key a[${i}]=${key}`);
    while (j >= 0 && a[j] > key) {
      comparisons++;
      a[j + 1] = a[j];
      swaps++;
      frames.push({ array: [...a], highlight: [j, j + 1] });
      logs.push(`Move a[${j}] to a[${j+1}] → ${a.join(", ")}`);
      j--;
    }
    a[j + 1] = key;
    frames.push({ array: [...a], highlight: [j + 1] });
    logs.push(`Insert key at ${j + 1} → ${a.join(", ")}`);
  }
  frames.push({ array: [...a], highlight: [], done: a.map((_, i) => i) });
  logs.push("Sorted!");
  return { frames, logs, stats: { comparisons, swaps } };
}

function selectionFrames(a) {
  const frames = [{ array: [...a], highlight: [] }];
  const logs = ["Start Selection Sort"];
  let comparisons = 0, swaps = 0;
  for (let i = 0; i < a.length; i++) {
    let min = i;
    for (let j = i + 1; j < a.length; j++) {
      comparisons++;
      frames.push({ array: [...a], highlight: [min, j] });
      logs.push(`Compare min a[${min}]=${a[min]} with a[${j}]=${a[j]}`);
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      swaps++;
      frames.push({ array: [...a], highlight: [i, min] });
      logs.push(`Swap indices ${i} & ${min} → ${a.join(", ")}`);
    }
    frames.push({ array: [...a], highlight: [], done: [i] });
  }
  frames.push({ array: [...a], highlight: [], done: a.map((_, i) => i) });
  logs.push("Sorted!");
  return { frames, logs, stats: { comparisons, swaps } };
}

function quickFrames(a) {
  const frames = [{ array: [...a], highlight: [] }];
  const logs = ["Start Quick Sort"];
  let comparisons = 0, swaps = 0;

  function swap(i, j) {
    [a[i], a[j]] = [a[j], a[i]];
    swaps++; frames.push({ array: [...a], highlight: [i, j] });
    logs.push(`Swap a[${i}] & a[${j}] → ${a.join(", ")}`);
  }

  function partition(low, high) {
    const pivot = a[high];
    logs.push(`Partition low=${low}, high=${high}, pivot=${pivot}`);
    let i = low - 1;
    for (let j = low; j < high; j++) {
      comparisons++;
      frames.push({ array: [...a], highlight: [j, high] });
      logs.push(`Compare a[${j}]=${a[j]} with pivot ${pivot}`);
      if (a[j] < pivot) {
        i++;
        if (i !== j) swap(i, j);
      }
    }
    if (i + 1 !== high) swap(i + 1, high);
    return i + 1;
  }

  function qs(low, high) {
    if (low < high) {
      const p = partition(low, high);
      qs(low, p - 1);
      qs(p + 1, high);
    }
  }

  qs(0, a.length - 1);
  frames.push({ array: [...a], highlight: [], done: a.map((_, i) => i) });
  logs.push("Sorted!");
  return { frames, logs, stats: { comparisons, swaps } };
}

function mergeFrames(a) {
  const frames = [{ array: [...a], highlight: [] }];
  const logs = ["Start Merge Sort"];
  let comparisons = 0, swaps = 0;

  function merge(l, m, r) {
    const left = a.slice(l, m + 1);
    const right = a.slice(m + 1, r + 1);
    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      comparisons++;
      frames.push({ array: [...a], highlight: [k] });
      logs.push(`Compare ${left[i]} vs ${right[j]} at k=${k}`);
      if (left[i] <= right[j]) {
        a[k] = left[i]; i++; swaps++;
      } else {
        a[k] = right[j]; j++; swaps++;
      }
      frames.push({ array: [...a], highlight: [k] });
      k++;
    }
    while (i < left.length) {
      a[k] = left[i]; i++; k++; swaps++;
      frames.push({ array: [...a], highlight: [k - 1] });
    }
    while (j < right.length) {
      a[k] = right[j]; j++; k++; swaps++;
      frames.push({ array: [...a], highlight: [k - 1] });
    }
  }

  function sort(l, r) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    sort(l, m);
    sort(m + 1, r);
    merge(l, m, r);
  }

  sort(0, a.length - 1);
  frames.push({ array: [...a], highlight: [], done: a.map((_, i) => i) });
  logs.push("Sorted!");
  return { frames, logs, stats: { comparisons, swaps } };
}
