# HybridVibes NFT Collection

> 10,000 premium cinematic 3D hybrid NFTs on Solana — blending BAYC, Doodles, Lost Dogs & Pudgy Penguins into one legendary collection.

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
├── images/                    ← NFT images (0001.png → 10000.png)
└── metadata/                  ← Matching JSON files (0001.json → 10000.json)
```

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
| **Background** | Scene/environment |

---

## Metadata Format

```json
{
  "name": "HybridVibes #0001",
  "symbol": "HYBRD",
  "description": "Premium cinematic 3D hybrid blending BAYC, Doodles, Lost Dogs & Pudgy Penguins",
  "image": "https://arweave.net/YOUR_LINK/0001.png",
  "attributes": [
    {"trait_type": "Base Hybrid", "value": "Ape"},
    {"trait_type": "Fur/Texture", "value": "Golden Honey"},
    {"trait_type": "Eyes", "value": "Bored Brown"},
    {"trait_type": "Expression", "value": "Bored"},
    {"trait_type": "Headwear", "value": "Gray Knit Beanie"},
    {"trait_type": "Clothing", "value": "Dark Hoodie"},
    {"trait_type": "Accessories", "value": "Gold Chain"},
    {"trait_type": "Background", "value": "Dark Studio God Rays"}
  ]
}
```

---

## Mint Instructions (iMintify)

1. Go to [iMintify.com](https://imintify.com) and connect your Phantom wallet
2. Click **"Create Collection"** → **"Upload Assets"**
3. Upload all files from `/images/` and `/metadata/` (drag & drop)
4. Set mint price to **2 SOL**, royalties to **5%**, supply to **10,000**
5. Set treasury to `HTZKRgPveaNk4EH7XXuq243rUv2DTAFbZkcadjWkhc7`
6. Click **"Deploy Candy Machine"** and sign the transaction

---

## Mint Instructions (Sugar CLI / Metaplex Candy Machine V3)

### Prerequisites
```bash
# Install Sugar CLI
bash <(curl -sSf https://sugar.metaplex.com/install.sh)

# Install Solana CLI (if not installed)
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

# 6. Verify everything looks correct
sugar verify

# 7. Launch the mint
sugar launch
```

> **Note:** After `sugar upload`, update the `image` URLs in all metadata JSONs from `https://arweave.net/YOUR_LINK/XXXX.png` to the actual Arweave links provided in the upload output.

---

## How to Upload Your iPhone Images (Least Clicks)

### Method 1: GitHub Web UI (Recommended for iPhone)
1. Open this repo on Safari: `github.com/dwarfdeve/HybridVibes-NFT`
2. Tap **`images/`** folder
3. Tap **`Add file`** → **`Upload files`**
4. Tap **`Choose files`** → select all your images from Photos at once (long-press to multi-select)
5. Scroll down → tap **`Commit changes`**
6. Repeat for **`metadata/`** folder with the JSON files

### Method 2: GitHub Desktop (Mac/PC, fastest overall)
1. Clone the repo in GitHub Desktop
2. Drag all PNG files into the `images/` folder
3. Drag all JSON files into the `metadata/` folder
4. Click **Commit to main** → **Push origin**

---

## License

All HybridVibes artwork is protected. Holders receive a commercial license to their specific NFT.

Treasury Wallet: `HTZKRgPveaNk4EH7XXuq243rUv2DTAFbZkcadjWkhc7`
