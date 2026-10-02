/** Two-sided 95% Wilson score interval for independent Bernoulli trials. */
export function wilsonInterval(successes: number, trials: number) {
  if (
    !Number.isInteger(successes) ||
    !Number.isInteger(trials) ||
    trials < 1 ||
    successes < 0 ||
    successes > trials
  ) {
    return null;
  }
  const z = 1.959963984540054;
  const p = successes / trials;
  const denominator = 1 + (z * z) / trials;
  const center = (p + (z * z) / (2 * trials)) / denominator;
  const half =
    (z * Math.sqrt((p * (1 - p)) / trials + (z * z) / (4 * trials * trials))) / denominator;
  return { rate: p, lower: Math.max(0, center - half), upper: Math.min(1, center + half) };
}
