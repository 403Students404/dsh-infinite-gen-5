/** Bound interactive native continuation separately from trace/solver budgets. */
export function debugTimeout(args, cfg) {
  const maximum = args.op === 'cont' && args.backend === 'x64dbg' ? 120 : 60;
  const seconds = args.timeout ?? (args.record_trace ? 45 : ['start', 'cont'].includes(args.op) ? 30 : 15);
  if (typeof seconds !== 'number' || !Number.isFinite(seconds) || seconds <= 0 || seconds > maximum) throw new Error(`Debugger timeout must be positive and at most ${maximum} seconds; only explicit x64dbg cont supports 120`);
  if (seconds * 1000 + 5000 > cfg.requestTimeoutMs) throw new Error('Configured debugger RPC deadline is shorter than the requested wait plus cleanup; reduce timeout or raise requestTimeoutMs');
  return { seconds, rpcTimeoutMs: Math.min(cfg.requestTimeoutMs, Math.max(75000, seconds * 1000 + 15000)) };
}
