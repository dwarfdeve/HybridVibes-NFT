import React, { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import { Zap, ExternalLink, AlertCircle, CheckCircle2, Lock, ShieldCheck, Settings } from "lucide-react";
import { useMint, useSolBalance, useCandyMachineState } from "@/hooks/useSolanaWallet";
import { useWhitelist } from "@/hooks/useWhitelist";
import { WalletButton } from "./WalletButton";
import { PhaseIndicator } from "./PhaseIndicator";
import {
  MINT_PRICE_SOL,
  COLLECTION_SIZE,
  CURRENT_PHASE,
  CANDY_MACHINE_ID,
} from "@/lib/solana-config";
import { useToast } from "@/hooks/use-toast";

export function MintWidget() {
  const { connected } = useWallet();
  const { setVisible } = useWalletModal();
  const balance = useSolBalance();
  const { mint, status, error, txSig, reset } = useMint();
  const { status: wlStatus, canMint } = useWhitelist();
  const cmState = useCandyMachineState();
  const { toast } = useToast();
  const [localMinted, setLocalMinted] = React.useState(0);

  useEffect(() => {
    if (status === "success") {
      setLocalMinted((p) => p + 1);
      toast({
        title: "🎉 Mint Successful!",
        description: "Your HybridVibes NFT is on its way to your wallet.",
      });
    }
    if (status === "error" && error) {
      toast({ title: "Mint Failed", description: error, variant: "destructive" });
    }
  }, [status, error]);

  const isPaused       = CURRENT_PHASE === "paused";
  const isPlaceholder  = CANDY_MACHINE_ID === "YOUR_CANDY_MACHINE_ID";

  // Use live CM data if available, fall back to placeholder numbers
  const totalMinted   = cmState.ready ? cmState.itemsRedeemed  + localMinted : 4892 + localMinted;
  const totalSupply   = cmState.ready ? cmState.itemsAvailable : COLLECTION_SIZE;
  const progressPct   = (totalMinted / totalSupply) * 100;
  const isSoldOut     = cmState.ready && cmState.itemsRemaining <= 0;
  const hasEnoughSol  = balance !== null && balance >= MINT_PRICE_SOL;

  // ── Not yet deployed notice ──────────────────────────────────────────────
  if (isPlaceholder) {
    return (
      <div className="space-y-5 relative z-10">
        <PhaseIndicator />
        <div className="p-6 border border-yellow-500/30 bg-yellow-500/5 space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-yellow-400 uppercase tracking-widest font-bold">
            <Settings className="w-4 h-4" /> Candy Machine Not Deployed Yet
          </div>
          <p className="font-mono text-xs text-muted-foreground leading-relaxed">
            The mint is ready to go live. Deploy your Candy Machine and paste the ID into{" "}
            <code className="text-yellow-300 bg-black/40 px-1">solana-config.ts</code>.
          </p>
          <div className="border border-white/10 bg-black/40 p-3 font-mono text-[11px] text-white/60 space-y-1">
            <p className="text-white/30">— Deploy steps —</p>
            <p><span className="text-primary">1.</span> sugar upload  <span className="text-white/30"># push images + metadata to Arweave</span></p>
            <p><span className="text-primary">2.</span> sugar deploy  <span className="text-white/30"># creates Candy Machine, outputs CM ID</span></p>
            <p><span className="text-primary">3.</span> paste CM ID → <span className="text-yellow-300">CANDY_MACHINE_ID</span> in solana-config.ts</p>
          </div>
        </div>
        <p className="font-mono text-xs text-muted-foreground text-center uppercase tracking-widest">
          Phantom · Solflare supported
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5 relative z-10">
      {/* Phase indicator */}
      <PhaseIndicator />

      {/* Info rows */}
      {[
        {
          label: "Phase",
          value: CURRENT_PHASE === "presale"
            ? <span className="text-primary flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-primary animate-pulse" />Presale</span>
            : CURRENT_PHASE === "public"
            ? <span className="text-green-400 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />Public</span>
            : <span className="text-yellow-400">Paused</span>,
        },
        { label: "Chain",   value: <span className="text-white">Solana Mainnet</span> },
        { label: "Price",   value: <span className="text-white font-bold">{MINT_PRICE_SOL} SOL</span> },
        { label: "Royalty", value: <span className="text-white">5%</span> },
        {
          label: "Minted",
          value: (
            <span className={`font-bold ${isSoldOut ? "text-yellow-400" : "text-white"}`}>
              {totalMinted.toLocaleString()} / {totalSupply.toLocaleString()}
              {isSoldOut && " · SOLD OUT"}
            </span>
          ),
        },
      ].map((row, i) => (
        <div key={i} className="flex justify-between items-center font-mono text-sm uppercase border-b border-white/10 pb-4">
          <span className="text-muted-foreground">{row.label}</span>
          {row.value}
        </div>
      ))}

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="w-full h-1.5 bg-white/10 rounded-none overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${isSoldOut ? "bg-yellow-400" : CURRENT_PHASE === "presale" ? "bg-primary" : "bg-green-400"}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="font-mono text-xs text-muted-foreground text-right">{progressPct.toFixed(1)}% minted</p>
      </div>

      {/* Whitelist status badge */}
      {connected && CURRENT_PHASE === "presale" && (
        <div className={`flex items-center gap-2 p-3 border font-mono text-xs ${
          wlStatus === "whitelisted" || wlStatus === "open_presale"
            ? "border-green-500/30 bg-green-500/5 text-green-400"
            : wlStatus === "not_whitelisted"
            ? "border-red-500/30 bg-red-500/5 text-red-400"
            : "border-white/10 text-muted-foreground"
        }`}>
          {wlStatus === "whitelisted" ? (
            <><ShieldCheck className="w-4 h-4 shrink-0" /> Wallet verified — you're on the whitelist.</>
          ) : wlStatus === "open_presale" ? (
            <><ShieldCheck className="w-4 h-4 shrink-0" /> Open presale — early access at {MINT_PRICE_SOL} SOL.</>
          ) : wlStatus === "not_whitelisted" ? (
            <><Lock className="w-4 h-4 shrink-0" /> This wallet is not on the whitelist. Public mint opens next.</>
          ) : null}
        </div>
      )}

      {/* Low balance warning */}
      {connected && canMint && balance !== null && !hasEnoughSol && (
        <div className="flex items-center gap-2 p-3 border border-yellow-500/30 bg-yellow-500/5 font-mono text-xs text-yellow-400">
          <AlertCircle className="w-4 h-4 shrink-0" />
          Need {MINT_PRICE_SOL} SOL · Current balance: {balance.toFixed(3)} SOL
        </div>
      )}

      {/* Success confirmation */}
      {status === "success" && txSig && (
        <div className="flex items-start gap-3 p-4 border border-green-500/30 bg-green-500/5">
          <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
          <div className="font-mono text-xs space-y-1">
            <p className="text-green-400 font-bold uppercase tracking-wider">NFT Minted!</p>
            <p className="text-muted-foreground">Your HybridVibes specimen is in your wallet.</p>
            <a
              href={`https://solscan.io/tx/${txSig}?cluster=mainnet-beta`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white flex items-center gap-1 transition-colors"
            >
              View on Solscan <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* ── CTA BUTTONS ── */}
      <div className="pt-2 space-y-3">
        {isSoldOut ? (
          <Button disabled className="w-full h-16 font-mono uppercase tracking-widest rounded-none opacity-60">
            Sold Out
          </Button>

        ) : isPaused ? (
          <Button disabled className="w-full h-16 font-mono uppercase tracking-widest rounded-none opacity-50">
            Mint Paused
          </Button>

        ) : !connected ? (
          <Button
            onClick={() => setVisible(true)}
            className="w-full h-16 text-lg font-mono uppercase tracking-widest bg-primary hover:bg-primary/90 text-white rounded-none relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-5 h-5" /> Connect Wallet to Mint
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </Button>

        ) : !canMint ? (
          <div className="space-y-2">
            <Button
              disabled
              className="w-full h-16 text-base font-mono uppercase tracking-widest rounded-none bg-white/5 border border-white/10 text-white/30 cursor-not-allowed"
            >
              <Lock className="w-4 h-4 mr-2" /> Presale Access Required
            </Button>
            <p className="font-mono text-xs text-muted-foreground text-center uppercase tracking-wider">
              Not on the whitelist · Public mint opens soon
            </p>
          </div>

        ) : status === "success" ? (
          <div className="space-y-3">
            <Button
              onClick={mint}
              className="w-full h-14 font-mono uppercase tracking-widest bg-primary hover:bg-primary/90 text-white rounded-none"
            >
              <Zap className="w-4 h-4 mr-2" /> Mint Another
            </Button>
            <Button
              onClick={reset}
              variant="ghost"
              className="w-full h-9 font-mono text-xs uppercase text-muted-foreground hover:text-white rounded-none"
            >
              Reset
            </Button>
          </div>

        ) : (
          <Button
            data-testid="button-execute-mint"
            onClick={mint}
            disabled={status === "pending" || status === "confirming" || !hasEnoughSol}
            className="w-full h-16 text-lg font-mono uppercase tracking-widest bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-none relative overflow-hidden group"
          >
            {status === "pending" ? (
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 animate-bounce" /> Signing Transaction…
              </span>
            ) : status === "confirming" ? (
              <span className="flex items-center gap-2">
                <Zap className="w-5 h-5 animate-pulse" /> Confirming on-chain…
              </span>
            ) : (
              <>
                <span className="relative z-10">
                  {CURRENT_PHASE === "presale" ? "🔐 " : ""}Mint NFT — {MINT_PRICE_SOL} SOL
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </>
            )}
          </Button>
        )}

        {connected && (
          <div className="flex items-center justify-center">
            <WalletButton className="h-8 text-xs px-3" />
          </div>
        )}

        <p className="font-mono text-xs text-muted-foreground text-center uppercase tracking-widest">
          Phantom · Solflare supported
        </p>
      </div>
    </div>
  );
}
