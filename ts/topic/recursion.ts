function factorial(n: number, sum = 1):number {
  if (n === 1) {
    return sum;
  }
  return factorial(n - 1, n * sum);
}

console.log(factorial(5)); // 120
export {};
