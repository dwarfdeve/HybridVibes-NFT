import React, { useCallback, useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import { Wallet, ChevronDown, LogOut, Copy } from "lucide-react";
import { useSolBalance } from "@/hooks/useSolanaWallet";
import { useToast } from "@/hooks/use-toast";

function shortenAddress(addr: string) {
  return addr.slice(0, 4) + "..." + addr.slice(-4);
}

export function WalletButton({ className = "" }: { className?: string }) {
  const { publicKey, disconnect, connected, connecting } = useWallet();
  const { setVisible } = useWalletModal();
  const balance = useSolBalance();
  const { toast } = useToast();

  const handleConnect = useCallback(() => setVisible(true), [setVisible]);

  const handleCopy = useCallback(() => {
    if (!publicKey) return;
    navigator.clipboard.writeText(publicKey.toBase58());
    toast({ title: "Address copied", description: publicKey.toBase58() });
  }, [publicKey, toast]);

  if (!connected) {
    return (
      <Button
        onClick={handleConnect}
        disabled={connecting}
        className={`font-mono uppercase tracking-wider rounded-none border border-primary/50 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all ${className}`}
      >
        <Wallet className="w-4 h-4 mr-2" />
        {connecting ? "Connecting…" : "Connect Wallet"}
      </Button>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {balance !== null && (
        <span className="font-mono text-xs text-muted-foreground border border-white/10 px-2 py-1 hidden sm:block">
          {balance.toFixed(3)} SOL
        </span>
      )}
      <Button
        onClick={handleCopy}
        variant="ghost"
        className="font-mono text-xs text-white border border-white/20 rounded-none px-3 py-1 h-auto hover:bg-white/5 flex items-center gap-1"
      >
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
        {shortenAddress(publicKey!.toBase58())}
        <Copy className="w-3 h-3 ml-1 opacity-50" />
      </Button>
      <Button
        onClick={disconnect}
        variant="ghost"
        size="icon"
        className="border border-white/10 rounded-none w-8 h-8 hover:bg-red-500/10 hover:border-red-500/30 hover:text-red-400"
      >
        <LogOut className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}
