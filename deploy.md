# Deployment Guide for HybridVibes on Solana

## Prerequisites
- Phantom or Backpack wallet
- SOL balance
- Sugar CLI installed (`npm install -g @metaplex-foundation/sugar`)

## Steps

1. **Install Sugar**
   ```bash
   npm install -g @metaplex-foundation/sugar
   ```

2. **Create config.json**
   ```json
   {
     "price": 1.0,
     "number": 1000,
     "symbol": "HYBRD",
     "sellerFeeBasisPoints": 500,
     "creators": [{"address": "YOUR_WALLET", "share": 100}]
   }
   ```

3. **Upload Assets**
   ```bash
   sugar upload
   ```

4. **Create Candy Machine**
   ```bash
   sugar create-candy-machine
   ```

See full Metaplex docs for advanced guards and royalties.
