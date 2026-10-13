import test from "node:test";
import assert from "node:assert/strict";
import { grade, normalize, tasks } from "../src/grading.mjs";
test("normalization and zero score", () => {
  assert.equal(normalize("  WASM  "), "wasm");
  assert.equal(grade({ q1: "", q2: "", q3: "" }).scoreGiven, 0);
});
test("maximum and partial result", () => {
  const answers = Object.fromEntries(tasks.map((t) => [t.id, t.answer[0]]));
  assert.equal(grade(answers).scoreGiven, 10);
  assert.equal(grade(answers).scoreMaximum, 10);
  answers.q2 = "__wrong__";
  assert.equal(grade(answers).scoreGiven, 7);
});
test("invalid answers cannot become grades", () => {
  assert.throws(() => grade({ q1: "", q2: "wat" }));
  assert.throws(() => grade({ q1: [], q2: "wat", q3: "instantiate" }));
  assert.throws(() =>
    grade({ q1: "x".repeat(201), q2: "wat", q3: "instantiate" }),
  );
});
