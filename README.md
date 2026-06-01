# HybridVibes NFT Collection

> 10,000 premium cinematic 3D hybrid NFTs on Solana — blending BAYC, Doodles, Lost Dogs & Pudgy Penguins into one legendary collection.

---

## 🌐 Minting Website

The live minting site is built with **React + Vite + Solana Wallet Adapter**.

**Features:**
- 🔌 **Connect Wallet** — Phantom & Solflare supported (nav bar)
- 💎 **Live SOL Balance** — shown next to connected wallet address
- 🚀 **Execute Mint** — sends a real on-chain transaction (2 SOL to treasury)
- 📊 **Progress Bar** — minted count + % live
- 🔗 **Solscan Link** — every confirmed mint links to the tx on-chain
- 🎨 **26 Real NFT Images** — full gallery with scrolling ticker strip

**After Candy Machine deployment:** paste your CM address into `artifacts/hybrid-vibes/src/lib/solana-config.ts` → `CANDY_MACHINE_ID` to activate the real `mintV2` instruction.

---

## Collection Overview

| Detail | Value |
|---|---|
| **Project Name** | HybridVibes |
| **Symbol** | HYBRD |
| **Supply** | 10,000 |
| **Mint Price** | 2 SOL |
| **Royalties** | 5% (500 basis points) |
| **Blockchain** | Solana |
| **Standard** | Metaplex Candy Machine V3 |
| **Treasury Wallet** | `HTZKRgPveaNk4EH7XXuq243rUv2DTAFbZkcadjWkhc7` |

---

## Folder Structure

```
HybridVibes-NFT/
├── README.md                  ← This file
├── config.json                ← Sugar CLI / iMintify config
├── prompts/
│   └── master-prompt.txt      ← Full AI generation style prompt
├── images/                    ← 26 NFT images (0046.png → 0071.png)
└── metadata/                  ← Matching JSON files (0046.json → 0071.json)
```

---

## Current Specimens (26 generated)

| ID | Name | Background |
|---|---|---|
| #0046–0056 | iPhone Collection | Studio / street |
| #0057 | Crystal Penguin | Celestial tiara |
| #0058 | Temple Dog | Ancient jade temple |
| #0059 | Island Hybrid | Tropical volcanic |
| #0060 | Reef Bear | Deep sea coral |
| #0061 | Tokyo Ape | Neon Tokyo skyline |
| **#0062** | **Kyoto Oni Ape** | **Vermillion torii · Cherry blossom night** |
| #0063 | Alien Ocean Dog | Twin moons · Bioluminescent waves |
| #0064 | Cosmos Penguin | Nebula Pillars of Creation |
| #0065 | HK Night Bear | Cyberpunk Hong Kong night market |
| #0066 | Mirror Samurai | Shattered mirror dimension |
| #0067 | Venice Carnival | Grand Canal Carnevale night |
| #0068 | Deep Sea Penguin | Midnight Zone 3000m depth |
| #0069 | Arctic Aurora Ape | Crystal ice palace + aurora borealis |
| #0070 | Volcano Bear | Supervolcano eruption caldera |
| #0071 | Matrix Hacker | Living digital server cathedral |

---

## Traits

Each HybridVibes NFT has **8 trait categories**:

| Trait | Description |
|---|---|
| **Base Hybrid** | Core animal type (Ape, Dog, Penguin, Bear…) |
| **Fur/Texture** | Coat color/pattern with subsurface scattering detail |
| **Eyes** | Pupil style, glow, and expression |
| **Expression** | Overall facial mood |
| **Headwear** | Hat, crown, visor, goggles, or none |
| **Clothing** | Top, jacket, or shirt |
| **Accessories** | Chains, pendants, skateboards… |
| **Background** | Scene/environment (each one unique) |

---

## Mint Instructions (iMintify — Easiest)

1. Go to [iMintify.com](https://imintify.com) and connect your Phantom wallet
2. Click **"Create Collection"** → **"Upload Assets"**
3. Upload all files from `/images/` and `/metadata/` (drag & drop)
4. Set mint price to **2 SOL**, royalties to **5%**, supply to **10,000**
5. Set treasury to `HTZKRgPveaNk4EH7XXuq243rUv2DTAFbZkcadjWkhc7`
6. Click **"Deploy Candy Machine"** and sign the transaction
7. Copy the **Candy Machine ID** and paste it into `solana-config.ts`

---

## Mint Instructions (Sugar CLI / Metaplex Candy Machine V3)

### Prerequisites
```bash
# Install Sugar CLI
bash <(curl -sSf https://sugar.metaplex.com/install.sh)

# Install Solana CLI
sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
```

### Steps

```bash
# 1. Clone this repo
git clone https://github.com/dwarfdeve/HybridVibes-NFT.git
cd HybridVibes-NFT

# 2. Set your Solana wallet
solana config set --keypair ~/.config/solana/id.json
solana config set --url mainnet-beta

# 3. Verify your wallet has enough SOL (need ~5-10 SOL for deployment)
solana balance

# 4. Upload assets to Arweave via Bundlr
sugar upload

# 5. Deploy Candy Machine
sugar deploy

# 6. Verify
sugar verify

# 7. Launch
sugar launch

# 8. Paste the Candy Machine ID into the website config:
#    artifacts/hybrid-vibes/src/lib/solana-config.ts → CANDY_MACHINE_ID
```

> **After `sugar upload`:** Replace `"https://arweave.net/YOUR_LINK/XXXX.png"` in all metadata JSONs with the real Arweave URLs from the upload output.

---

## License

All HybridVibes artwork is protected. Holders receive a full commercial license to their specific minted NFT.

Treasury: `HTZKRgPveaNk4EH7XXuq243rUv2DTAFbZkcadjWkhc7`
