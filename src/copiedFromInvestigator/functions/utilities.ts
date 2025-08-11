import * as constants from "../../constants";

type LoggerFn = (...args: any[]) => void;

function brand(fn: LoggerFn) {
  return fn.bind(
    null,
    `%c[${constants.systemId}]`,
    "color: white; background: #1d5d5d; padding: 2px 4px; border-radius: 2px",
  );
}

export const systemLogger = {
  log: brand(console.log),
  info: brand(console.info),
  warn: brand(console.warn),
  error: brand(console.error),
};

/**
 * Simple throttle function handling user inputs.
 *
 * The returned function always returns void, so it's not suitable for functions
 * where you need the return value.
 *
 * Some calls *will* be dropped in a throttling scenario. When the target
 * function is eventually called, it will be called with the most recent
 * arguments. This fits with a user input scenario where you don't care about
 * intermediate values, i.e. the "f", "fr", "fre" on the way to "fred" .
 */
export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  period: number,
): (...args: Parameters<T>) => void {
  let startAt = 0;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    const now = Date.now();
    if (now - startAt > period) {
      startAt = now;
    }
    const delay = startAt + period - now;
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      fn(...args);
      timeout = null;
      startAt = Date.now();
    }, delay);
  };
}

/**
 * Check that `game` has been initialised
 */
export function isGame(game: any): game is foundry.Game {
  return game instanceof foundry.Game;
}

/**
 * Throw if `game` has not been initialized. This is hyper unlikely at runtime
 * but technically possible during a calamitous upfuckage to TS keeps us honest
 * and requires a check.
 */
export function assertGame(game: any): asserts game is foundry.Game {
  if (!isGame(game)) {
    throw new Error("game used before init hook");
  }
}

export function assertNotNull<T>(t: T | undefined | null): asserts t is T {
  if (t === undefined) {
    throw new Error("t was undefined");
  }
}

export async function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
