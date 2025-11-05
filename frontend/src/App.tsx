import { useCallback, useEffect, useMemo, useState } from "react";

type Upgrade = {
  id: string;
  name: string;
  level: number;
  cost: number;
  bonusPerLevel: number;
};

type GameState = {
  cash: number;
  cashPerClick: number;
  upgrades: Upgrade[];
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

const numberFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2
});

const API_BASE = "/api/game";

export default function App() {
  const [state, setState] = useState<GameState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isClicking, setIsClicking] = useState(false);

  const loadState = useCallback(async () => {
    const response = await fetch(API_BASE);
    if (!response.ok) {
      throw new Error("Unable to load game state");
    }
    const body: GameState = await response.json();
    setState(body);
  }, []);

  useEffect(() => {
    loadState().catch((err) => setError(err.message));
  }, [loadState]);

  const handleClick = useCallback(async () => {
    setIsClicking(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/click`, {
        method: "POST"
      });
      if (!response.ok) {
        throw new Error("Unable to register click");
      }
      const body: GameState = await response.json();
      setState(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setTimeout(() => setIsClicking(false), 120);
    }
  }, []);

  const purchaseUpgrade = useCallback(async (upgradeId: string) => {
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/upgrades/${upgradeId}/purchase`, {
        method: "POST"
      });
      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Unable to purchase upgrade");
      }
      const body: GameState = await response.json();
      setState(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    }
  }, []);

  const cashProgress = useMemo(() => {
    if (!state) {
      return 0;
    }
    const cheapestUpgrade = state.upgrades.reduce(
      (min, current) => Math.min(min, current.cost),
      Number.MAX_VALUE
    );
    return Math.min(1, state.cash / cheapestUpgrade);
  }, [state]);

  const hasPassiveIncome = useMemo(() => {
        if (!state) {
            return false;
        }
        return state.upgrades.some(
            (upgrade) => upgrade.id === "auto-tap" && upgrade.level > 0
        );
    }, [state]);

  useEffect(() => {
        if (!hasPassiveIncome) {
            return;
        }

        const interval = setInterval(() => {
            loadState().catch((err) =>
                setError(err instanceof Error ? err.message : "Unexpected error")
            );
        }, 1000);

        return () => clearInterval(interval);
  }, [hasPassiveIncome, loadState]);

  if (!state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-tr from-brand-500 to-brand-700 animate-pulse" />
          <p className="text-slate-300 text-lg tracking-wide">Bootstrapping...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute right-10 top-32 h-80 w-80 rounded-full bg-brand-700/20 blur-3xl" />
        </div>
        <header className="px-6 py-10 sm:px-16">
          <div className="mx-auto max-w-5xl">
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white">
              Tycoon
            </h1>
            <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-300">
              Grow your futuristic conglomerate by investing in strategic upgrades. Earn cash, unlock automation, and
              watch your empire expand in real time.
            </p>
          </div>
        </header>

        <main className="px-6 pb-20 sm:px-16">
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <section className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-glow">
              <div className="space-y-8 p-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-brand-200/70">Treasury</p>
                  <p className="mt-3 text-5xl font-semibold text-white drop-shadow-sm">
                    {currency.format(state.cash)}
                  </p>
                  <p className="mt-2 text-sm text-slate-300">
                    +{numberFormatter.format(state.cashPerClick)} cash / click
                  </p>
                </div>

                <div>
                  <button
                    onClick={handleClick}
                    className={`group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-brand-500 to-brand-700 py-5 text-lg font-medium text-white shadow-lg shadow-brand-700/40 transition-transform duration-150 hover:scale-[1.015] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ${
                      isClicking ? "scale-95" : ""
                    }`}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 5v14m7-7H5"
                        />
                      </svg>
                      Collect Profits
                    </span>
                    <div className="absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </button>
                  <div className="mt-4 h-2 w-full rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700 transition-all"
                      style={{ width: `${Math.max(8, cashProgress * 100)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs text-slate-400">
                    Progress toward your next upgrade opportunity.
                  </p>
                </div>

                {error && (
                  <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                    {error}
                  </div>
                )}
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-display text-2xl font-semibold text-white">Upgrades</h2>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Invest to accelerate</span>
              </div>

              <div className="grid gap-4">
                {state.upgrades.map((upgrade) => {
                  const affordable = state.cash >= upgrade.cost;
                  return (
                    <article
                      key={upgrade.id}
                      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-lg transition hover:border-brand-500/60"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{upgrade.name}</h3>
                          <p className="mt-1 text-sm text-slate-300">
                            Level {upgrade.level} · +{numberFormatter.format(upgrade.bonusPerLevel)} cash / level
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm uppercase tracking-widest text-slate-400">Investment</p>
                          <p className="text-xl font-semibold text-white">
                            {currency.format(upgrade.cost)}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => purchaseUpgrade(upgrade.id)}
                        disabled={!affordable}
                        className={`mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold uppercase tracking-wide transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400 ${
                          affordable
                            ? "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-700/30 hover:from-brand-400 hover:to-brand-600"
                            : "cursor-not-allowed border border-white/10 bg-white/5 text-slate-400"
                        }`}
                      >
                        {affordable ? "Purchase Upgrade" : "Insufficient Funds"}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
