function primenumber(n: number): boolean {
  if (n <= 1) return false;

  for (let i = 2; i < n; i += 1) {
    if (n % i === 0) return false;
  }

  return true;
}

export default primenumber;
