export default function generateArray(size = 20, max = 30) {
  let arr = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * max) + 1);
  }
  return arr;
}
