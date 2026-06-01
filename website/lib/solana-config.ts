import { clusterApiUrl } from "@solana/web3.js";

export const NETWORK = "mainnet-beta" as const;
export const RPC_ENDPOINT = clusterApiUrl(NETWORK);

// ─── Candy Machine ──────────────────────────────────────────────────────────
// Paste your CM ID here after running `sugar deploy` or deploying via iMintify
export const CANDY_MACHINE_ID = "YOUR_CANDY_MACHINE_ID";

// ─── Collection ─────────────────────────────────────────────────────────────
export const COLLECTION_SIZE   = 10_000;
export const COLLECTION_NAME   = "HybridVibes";
export const SYMBOL            = "HYBRD";
export const TREASURY          = "HTZKRgPveaNk4EH7XXuq243rUv2DTAFbZkcadjWkhc7";

// ─── Mint Phases ─────────────────────────────────────────────────────────────
// Set CURRENT_PHASE to "presale" or "public" to control what's live.
// "presale" → only WHITELIST addresses can mint at PRESALE_PRICE_SOL
// "public"  → anyone can mint at PUBLIC_PRICE_SOL
export type MintPhase = "presale" | "public" | "paused";
export const CURRENT_PHASE: MintPhase = "presale";

export const PRESALE_PRICE_SOL = 1;        // discounted early-access price
export const PUBLIC_PRICE_SOL  = 2;        // standard public price
export const PRESALE_MAX_PER_WALLET = 2;   // max mints per wallet during presale
export const PUBLIC_MAX_PER_WALLET  = 5;   // max mints per wallet during public

// Derived helper — always use this in mint logic
export const MINT_PRICE_SOL =
  CURRENT_PHASE === "presale" ? PRESALE_PRICE_SOL : PUBLIC_PRICE_SOL;

// ─── Whitelist ───────────────────────────────────────────────────────────────
// Add wallet addresses (base58) that are allowed to mint during presale.
// After deploying CM, you can also enforce this via Metaplex Allow List guard.
export const WHITELIST: string[] = [
  // "AbcD...XYZ",   ← paste presale addresses here, one per line
  // "EfgH...123",
];

// Set to true to skip whitelist check (open presale to all).
// Useful for testing or if you're managing the list on-chain instead.
export const WHITELIST_OPEN = WHITELIST.length === 0;
