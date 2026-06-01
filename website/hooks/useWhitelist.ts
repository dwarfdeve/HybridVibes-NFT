import { useWallet } from "@solana/wallet-adapter-react";
import {
  CURRENT_PHASE,
  WHITELIST,
  WHITELIST_OPEN,
} from "@/lib/solana-config";

export type WhitelistStatus =
  | "not_connected"    // wallet not connected
  | "public_phase"     // presale check not needed — public mint is live
  | "paused"           // mint is paused
  | "whitelisted"      // wallet is on the list
  | "not_whitelisted"  // wallet is connected but NOT on the list
  | "open_presale";    // WHITELIST_OPEN=true — anyone can mint in presale

export function useWhitelist(): {
  status: WhitelistStatus;
  canMint: boolean;
} {
  const { publicKey } = useWallet();

  if (CURRENT_PHASE === "paused") {
    return { status: "paused", canMint: false };
  }

  if (CURRENT_PHASE === "public") {
    return { status: "public_phase", canMint: !!publicKey };
  }

  // presale
  if (!publicKey) {
    return { status: "not_connected", canMint: false };
  }

  if (WHITELIST_OPEN) {
    return { status: "open_presale", canMint: true };
  }

  const address = publicKey.toBase58();
  const isListed = WHITELIST.includes(address);

  return {
    status: isListed ? "whitelisted" : "not_whitelisted",
    canMint: isListed,
  };
}
