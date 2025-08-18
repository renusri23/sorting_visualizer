export function bubbleSort(arr) {
  let a = [...arr];
  let steps = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push(`Swapped ${a[j]} and ${a[j + 1]}`);
      }
    }
  }
  return steps;
}
