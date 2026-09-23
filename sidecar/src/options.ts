/**
 * Small pure helpers extracted from index.ts so they can be unit tested in
 * isolation, without importing index.ts itself (which runs `main()` and
 * attaches stdio listeners as a side effect of module load).
 */

/**
 * Resolve `options.pathToClaudeCodeExecutable` for the SDK. An explicit
 * value already present in the client-supplied session options always
 * wins. Otherwise fall back to `CLAUDE_CODE_EXECUTABLE` so deployments
 * where the SDK's bundled native CLI binary isn't available (e.g.
 * installed with `--omit=optional`) can point at a system `claude`
 * without patching `node_modules` or hardcoding a path in source.
 *
 * Returns `undefined` when neither is set, which preserves the SDK's
 * existing default (its own bundled/discovered executable).
 */
export function resolvePathToClaudeCodeExecutable(
  explicit: unknown,
  env: NodeJS.ProcessEnv,
): string | undefined {
  if (explicit !== undefined) return explicit as string;
  const fromEnv = env.CLAUDE_CODE_EXECUTABLE;
  return fromEnv ? fromEnv : undefined;
}
