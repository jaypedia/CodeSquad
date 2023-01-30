function solution(arr, divisor) {
  const filtered = arr.filter((v) => v % divisor === 0);
  return filtered.length ? filtered.sort((a, b) => a - b) : [-1];
}
