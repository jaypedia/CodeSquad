function solution(numbers) {
  const set = new Set();

  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      const sum = numbers[i] + numbers[j];
      set.add(sum);
    }
  }

  return Array.from(set).sort((a, b) => a - b);
}
