import { test } from "node:test";
import assert from "node:assert/strict";
import { resolvePathToClaudeCodeExecutable } from "./options.js";

test("env var unset, no explicit value -> undefined (SDK default unchanged)", () => {
  const result = resolvePathToClaudeCodeExecutable(undefined, {});
  assert.equal(result, undefined);
});

test("env var set, no explicit value -> env var value reaches the SDK options", () => {
  const result = resolvePathToClaudeCodeExecutable(undefined, {
    CLAUDE_CODE_EXECUTABLE: "/opt/homebrew/bin/claude",
  });
  assert.equal(result, "/opt/homebrew/bin/claude");
});

test("explicit value takes precedence over env var", () => {
  const result = resolvePathToClaudeCodeExecutable("/explicit/path/claude", {
    CLAUDE_CODE_EXECUTABLE: "/opt/homebrew/bin/claude",
  });
  assert.equal(result, "/explicit/path/claude");
});

test("explicit value used as-is when env var is unset", () => {
  const result = resolvePathToClaudeCodeExecutable("/explicit/path/claude", {});
  assert.equal(result, "/explicit/path/claude");
});

test("empty env var is treated as unset", () => {
  const result = resolvePathToClaudeCodeExecutable(undefined, {
    CLAUDE_CODE_EXECUTABLE: "",
  });
  assert.equal(result, undefined);
});
