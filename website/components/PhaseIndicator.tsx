import React from "react";
import { motion } from "framer-motion";
import { Lock, Unlock, Globe, PauseCircle } from "lucide-react";
import {
  CURRENT_PHASE,
  PRESALE_PRICE_SOL,
  PUBLIC_PRICE_SOL,
  PRESALE_MAX_PER_WALLET,
  PUBLIC_MAX_PER_WALLET,
  WHITELIST,
  WHITELIST_OPEN,
} from "@/lib/solana-config";

const PHASES = [
  { key: "presale", label: "Presale", sublabel: "Whitelist only" },
  { key: "public",  label: "Public",  sublabel: "Open mint" },
] as const;

export function PhaseIndicator() {
  return (
    <div className="mb-8">
      {/* Phase stepper */}
      <div className="flex items-stretch gap-0 mb-5">
        {PHASES.map((phase, i) => {
          const isActive  = CURRENT_PHASE === phase.key;
          const isDone    = CURRENT_PHASE === "public" && phase.key === "presale";
          const isPaused  = CURRENT_PHASE === "paused";

          return (
            <React.Fragment key={phase.key}>
              <div
                className={`flex-1 p-3 border transition-colors ${
                  isActive && !isPaused
                    ? "border-primary bg-primary/10"
                    : isDone
                    ? "border-green-500/30 bg-green-500/5"
                    : "border-white/10 bg-black/20"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {isDone ? (
                    <Unlock className="w-3.5 h-3.5 text-green-400" />
                  ) : isActive ? (
                    <motion.div
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {phase.key === "presale"
                        ? <Lock className="w-3.5 h-3.5 text-primary" />
                        : <Globe className="w-3.5 h-3.5 text-primary" />}
                    </motion.div>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-white/20" />
                  )}
                  <span
                    className={`font-mono text-xs uppercase tracking-widest font-bold ${
                      isActive && !isPaused ? "text-primary" : isDone ? "text-green-400" : "text-white/30"
                    }`}
                  >
                    {phase.label}
                  </span>
                  {isActive && !isPaused && (
                    <span className="ml-auto font-mono text-[10px] text-primary border border-primary/40 px-1.5 py-0.5">
                      LIVE
                    </span>
                  )}
                  {isDone && (
                    <span className="ml-auto font-mono text-[10px] text-green-400 border border-green-500/30 px-1.5 py-0.5">
                      DONE
                    </span>
                  )}
                </div>
                <p className={`font-mono text-[11px] ${isActive && !isPaused ? "text-white/70" : "text-white/25"}`}>
                  {phase.sublabel}
                </p>
                <p className={`font-mono text-xs font-bold mt-1 ${isActive && !isPaused ? "text-white" : "text-white/25"}`}>
                  {phase.key === "presale" ? PRESALE_PRICE_SOL : PUBLIC_PRICE_SOL} SOL
                </p>
              </div>
              {i < PHASES.length - 1 && (
                <div className="w-px bg-white/10 self-stretch" />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Phase detail banner */}
      {CURRENT_PHASE === "presale" && (
        <div className="p-3 border border-primary/20 bg-primary/5 font-mono text-xs space-y-1">
          <p className="text-primary uppercase tracking-widest font-bold flex items-center gap-2">
            <Lock className="w-3 h-3" />
            Presale Phase Active
          </p>
          <p className="text-muted-foreground">
            {WHITELIST_OPEN
              ? "Open presale — all wallets may mint early at the discounted rate."
              : `Whitelist-gated — ${WHITELIST.length} wallet${WHITELIST.length !== 1 ? "s" : ""} eligible. Max ${PRESALE_MAX_PER_WALLET} per wallet.`}
          </p>
          <p className="text-white/50">
            Public mint opens next at <span className="text-white">{PUBLIC_PRICE_SOL} SOL</span>.
          </p>
        </div>
      )}

      {CURRENT_PHASE === "public" && (
        <div className="p-3 border border-green-500/20 bg-green-500/5 font-mono text-xs space-y-1">
          <p className="text-green-400 uppercase tracking-widest font-bold flex items-center gap-2">
            <Globe className="w-3 h-3" />
            Public Mint Live
          </p>
          <p className="text-muted-foreground">
            Open to all — max {PUBLIC_MAX_PER_WALLET} per wallet. {PUBLIC_PRICE_SOL} SOL per mint.
          </p>
        </div>
      )}

      {CURRENT_PHASE === "paused" && (
        <div className="p-3 border border-yellow-500/20 bg-yellow-500/5 font-mono text-xs space-y-1">
          <p className="text-yellow-400 uppercase tracking-widest font-bold flex items-center gap-2">
            <PauseCircle className="w-3 h-3" />
            Mint Paused
          </p>
          <p className="text-muted-foreground">The mint is temporarily paused. Check back soon.</p>
        </div>
      )}
    </div>
  );
}
