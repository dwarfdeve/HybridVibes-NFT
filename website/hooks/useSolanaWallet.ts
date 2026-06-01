import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";

import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplCandyMachine, fetchCandyMachine, mintV2 } from "@metaplex-foundation/mpl-candy-machine";
import { mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { generateSigner, publicKey as umiPublicKey, transactionBuilder } from "@metaplex-foundation/umi";

import { CANDY_MACHINE_ID, MINT_PRICE_SOL } from "@/lib/solana-config";

// ─── SOL balance hook ────────────────────────────────────────────────────────

export function useSolBalance() {
  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!publicKey) { setBalance(null); return; }
    let cancelled = false;
    connection.getBalance(publicKey).then((lamports) => {
      if (!cancelled) setBalance(lamports / LAMPORTS_PER_SOL);
    }).catch(() => {});
    const id = connection.onAccountChange(publicKey, (info) => {
      if (!cancelled) setBalance(info.lamports / LAMPORTS_PER_SOL);
    });
    return () => { cancelled = true; connection.removeAccountChangeListener(id); };
  }, [publicKey, connection]);

  return balance;
}

// ─── Candy Machine state hook ────────────────────────────────────────────────

export type CandyMachineState =
  | { ready: false; reason: "placeholder" | "loading" | "error" }
  | { ready: true; itemsRemaining: number; itemsRedeemed: number; itemsAvailable: number };

export function useCandyMachineState(): CandyMachineState {
  const { connection } = useConnection();
  const [state, setState] = useState<CandyMachineState>({ ready: false, reason: "loading" });

  useEffect(() => {
    if (CANDY_MACHINE_ID === "YOUR_CANDY_MACHINE_ID") {
      setState({ ready: false, reason: "placeholder" });
      return;
    }

    const umi = createUmi(connection.rpcEndpoint)
      .use(mplCandyMachine())
      .use(mplTokenMetadata());

    let cancelled = false;
    fetchCandyMachine(umi, umiPublicKey(CANDY_MACHINE_ID))
      .then((cm) => {
        if (cancelled) return;
        setState({
          ready: true,
          itemsAvailable: Number(cm.data.itemsAvailable),
          itemsRedeemed: Number(cm.itemsRedeemed),
          itemsRemaining: Number(cm.data.itemsAvailable) - Number(cm.itemsRedeemed),
        });
      })
      .catch(() => {
        if (!cancelled) setState({ ready: false, reason: "error" });
      });

    return () => { cancelled = true; };
  }, [connection.rpcEndpoint]);

  return state;
}

// ─── Mint hook ───────────────────────────────────────────────────────────────

export type MintStatus = "idle" | "pending" | "confirming" | "success" | "error";

export function useMint() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [status, setStatus] = useState<MintStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [txSig, setTxSig] = useState<string | null>(null);

  const mint = useCallback(async () => {
    if (!wallet.publicKey || !wallet.signTransaction) return;

    if (CANDY_MACHINE_ID === "YOUR_CANDY_MACHINE_ID") {
      setError("Candy Machine not deployed yet. Run `sugar deploy` and paste your CM ID into solana-config.ts.");
      setStatus("error");
      return;
    }

    setStatus("pending");
    setError(null);
    setTxSig(null);

    try {
      // Build UMI instance wired to the user's connected wallet
      const umi = createUmi(connection.rpcEndpoint)
        .use(mplCandyMachine())
        .use(mplTokenMetadata())
        .use(walletAdapterIdentity(wallet));

      // Fetch CM to validate it exists
      const candyMachineKey = umiPublicKey(CANDY_MACHINE_ID);
      const cm = await fetchCandyMachine(umi, candyMachineKey);

      if (cm.itemsRedeemed >= cm.data.itemsAvailable) {
        throw new Error("Sold out! All NFTs have been minted.");
      }

      // Each mint requires a fresh NFT mint signer
      const nftMintSigner = generateSigner(umi);

      // Build and send the mintV2 transaction
      const builder = transactionBuilder().add(
        await mintV2(umi, {
          candyMachine: candyMachineKey,
          nftMint: nftMintSigner,
          collectionMint: cm.collectionMint,
          collectionUpdateAuthority: cm.authority,
        })
      );

      setStatus("confirming");
      const { signature } = await builder.sendAndConfirm(umi, {
        confirm: { commitment: "confirmed" },
        send: { skipPreflight: false },
      });

      // Convert UMI Uint8Array signature → base58 string for Solscan
      const sig58 = Buffer.from(signature).toString("base64");
      setTxSig(sig58);
      setStatus("success");
    } catch (err: any) {
      setStatus("error");
      const msg: string = err?.message ?? "Transaction failed";
      // Friendlier messages for common errors
      if (msg.includes("0x1")) setError(`Insufficient SOL. You need at least ${MINT_PRICE_SOL} SOL.`);
      else if (msg.includes("SoldOut") || msg.includes("sold out")) setError("Sold out! All NFTs have been minted.");
      else if (msg.includes("NotEligible") || msg.includes("Guard")) setError("Mint guard check failed — check whitelist eligibility.");
      else setError(msg);
    }
  }, [wallet, connection]);

  const reset = useCallback(() => {
    setStatus("idle");
    setError(null);
    setTxSig(null);
  }, []);

  return { mint, status, error, txSig, reset };
}
