import assert from "node:assert/strict";
import { wilsonInterval } from "../src/lib/evaluation-statistics.ts";

// These numerical checks do not establish that a study's trials are independent.
// Independence is a study-design assumption, not a property of the interval code.
const tolerance = 1e-12;
function close(actual, expected, label) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${label}: ${actual} differs from ${expected}`,
  );
}

// A single observed outcome must retain substantial uncertainty.
const noSuccess = wilsonInterval(0, 1);
assert.ok(noSuccess);
assert.equal(noSuccess.rate, 0);
close(noSuccess.lower, 0, "0/1 lower bound");
close(noSuccess.upper, 0.7934506856227626, "0/1 upper bound");

const oneSuccess = wilsonInterval(1, 1);
assert.ok(oneSuccess);
assert.equal(oneSuccess.rate, 1);
close(oneSuccess.lower, 0.20654931437723745, "1/1 lower bound");
close(oneSuccess.upper, 1, "1/1 upper bound");

const eightyOfHundred = wilsonInterval(80, 100);
assert.ok(eightyOfHundred);
assert.equal(eightyOfHundred.rate, 0.8);
close(eightyOfHundred.lower, 0.7111708344068411, "80/100 lower bound");
close(eightyOfHundred.upper, 0.8666330666689676, "80/100 upper bound");

// Bounds stay in the probability range and mirror under success/failure exchange.
for (const trials of [1, 2, 5, 10, 100]) {
  for (let successes = 0; successes <= trials; successes += 1) {
    const interval = wilsonInterval(successes, trials);
    const complement = wilsonInterval(trials - successes, trials);
    assert.ok(interval && complement);
    assert.ok(interval.lower >= 0 && interval.upper <= 1);
    assert.ok(
      interval.lower <= interval.rate + tolerance && interval.rate <= interval.upper + tolerance,
    );
    close(interval.lower, 1 - complement.upper, `${successes}/${trials} complementary lower bound`);
    close(interval.upper, 1 - complement.lower, `${successes}/${trials} complementary upper bound`);
  }
}

// More independent observations at the same observed rate reduce uncertainty.
const smallSample = wilsonInterval(4, 5);
assert.ok(smallSample);
assert.ok(eightyOfHundred.upper - eightyOfHundred.lower < smallSample.upper - smallSample.lower);

// Invalid counts and an empty study have no estimable interval.
for (const [successes, trials] of [
  [0, 0],
  [1, 0],
  [-1, 10],
  [11, 10],
  [0, -1],
  [0.5, 10],
  [1, 2.5],
  [NaN, 10],
  [1, NaN],
  [Infinity, 10],
  [1, Infinity],
  ["1", 10],
  [1, "10"],
]) {
  assert.equal(wilsonInterval(successes, trials), null, `invalid counts: ${successes}/${trials}`);
}

console.log("Evaluation statistics checks passed.");
