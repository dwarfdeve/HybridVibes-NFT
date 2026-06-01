import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ChevronRight, Droplets, Zap, Shield, Hexagon, ArrowRight } from "lucide-react";
import { WalletButton } from "@/components/WalletButton";
import { MintWidget } from "@/components/MintWidget";

import heroImg    from "../assets/nft-hero.png";
import img63      from "../assets/nft-dog-alien.png";
import img64      from "../assets/nft-penguin-cosmos.png";
import img65      from "../assets/nft-bear-hongkong.png";
import img66      from "../assets/nft-ape-mirror.png";
import img57      from "../assets/nft-penguin-tiara.png";
import img58      from "../assets/nft-dog-temple.png";
import img59      from "../assets/nft-hybrid-island.png";
import img60      from "../assets/nft-bear-reef.png";
import img61      from "../assets/nft-ape-tokyo.png";
import img67      from "../assets/nft-venice-carnival.png";
import img68      from "../assets/nft-deep-sea-penguin.png";
import img69      from "../assets/nft-arctic-aurora-ape.png";
import img70      from "../assets/nft-volcano-bear.png";
import img71      from "../assets/nft-matrix-hacker.png";
import iphoneKing from "../assets/nft-iphone-king.png";
import iphoneDog  from "../assets/nft-iphone-dog-crown.png";

const FADE_UP = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const STAGGER = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

const GALLERY = [
  { src: heroImg,    id: "#0062", label: "Kyoto Oni Ape",          trait: "Ape · Crimson Haori · Torii Night" },
  { src: img63,      id: "#0063", label: "Alien Ocean Dog",         trait: "Dog · Holographic · Twin Moons" },
  { src: img64,      id: "#0064", label: "Cosmos Penguin",          trait: "Penguin · Galaxy Fur · Nebula" },
  { src: img65,      id: "#0065", label: "HK Night Bear",           trait: "Bear · Neon Candy · Cyberpunk" },
  { src: img66,      id: "#0066", label: "Mirror Samurai",          trait: "Ape · Mercury · Shattered Dimension" },
  { src: img57,      id: "#0057", label: "Crystal Penguin",         trait: "Penguin · Tiara · Celestial" },
  { src: img58,      id: "#0058", label: "Temple Dog",              trait: "Dog · Jade · Ancient Temple" },
  { src: img59,      id: "#0059", label: "Island Hybrid",           trait: "Hybrid · Tropical · Volcanic" },
  { src: img60,      id: "#0060", label: "Reef Bear",               trait: "Bear · Coral · Deep Sea" },
  { src: img61,      id: "#0061", label: "Tokyo Ape",               trait: "Ape · Neon · Tokyo Skyline" },
  { src: img67,      id: "#0067", label: "Venice Carnival",          trait: "Dog-Bird · Gold Feathers · Carnevale" },
  { src: img68,      id: "#0068", label: "Deep Sea Penguin",         trait: "Penguin · Bioluminescent · Midnight Zone" },
  { src: img69,      id: "#0069", label: "Arctic Aurora Ape",        trait: "Ape · Tie-Dye · Aurora Borealis" },
  { src: img70,      id: "#0070", label: "Volcano Bear",             trait: "Bear · Lava Armor · Supervolcano" },
  { src: img71,      id: "#0071", label: "Matrix Hacker",            trait: "Ape-Penguin · Digital Code · Server Farm" },
  { src: iphoneKing, id: "#0046", label: "King Hybrid",             trait: "Hybrid · Royal · Throne" },
  { src: iphoneDog,  id: "#0047", label: "Crown Dog",               trait: "Dog · Crown · Street King" },
];

const TICKER = [...GALLERY, ...GALLERY];

export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    return () => document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-hidden">
      {/* Ambient blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-violet-900/10 blur-[100px]" />
      </div>

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md border-b border-white/5 bg-background/60">
        <div className="font-mono text-xl font-bold tracking-tighter uppercase text-white flex items-center gap-2">
          <Hexagon className="w-5 h-5 text-primary" />
          HYBRD
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-mono text-muted-foreground uppercase tracking-widest">
          <a href="#vision"  className="hover:text-white transition-colors">Vision</a>
          <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
          <a href="#specs"   className="hover:text-white transition-colors">Specs</a>
          <a href="#faq"     className="hover:text-white transition-colors">FAQ</a>
        </nav>
        <WalletButton />
      </header>

      <main className="relative z-10">
        {/* ── HERO ── */}
        <section className="min-h-screen flex items-center justify-center pt-20 pb-20 px-6 relative">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" animate="visible" variants={STAGGER} className="flex flex-col items-start gap-8">
              <motion.div variants={FADE_UP} className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-xs font-mono uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Live on Solana · 10,000 Supply
              </motion.div>
              <motion.h1 variants={FADE_UP} className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
                Art<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-400 to-blue-500">Collides.</span>
              </motion.h1>
              <motion.p variants={FADE_UP} className="text-lg md:text-xl text-muted-foreground max-w-md leading-relaxed">
                10,000 premium cinematic 3D hybrids — each one born from the DNA of BAYC, Doodles, Lost Dogs, and Pudgy Penguins. No two are alike. All are legendary.
              </motion.p>
              <motion.div variants={FADE_UP} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <Button
                  size="lg"
                  data-testid="button-hero-mint"
                  className="w-full sm:w-auto font-mono uppercase tracking-widest text-lg h-14 px-10 bg-white text-black hover:bg-gray-200 rounded-none"
                  onClick={() => document.getElementById("mint")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Enter the Mint <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="font-mono text-sm text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                  <span className="text-white font-bold text-lg">2 SOL</span> / HYBRD
                </div>
              </motion.div>
              {/* Mini trait badges */}
              <motion.div variants={FADE_UP} className="flex flex-wrap gap-2 mt-2">
                {["BAYC DNA", "Doodles DNA", "Lost Dogs DNA", "Pudgy DNA", "Candy Machine V3"].map(t => (
                  <span key={t} className="font-mono text-xs px-2 py-1 border border-white/10 text-muted-foreground uppercase tracking-wider">
                    {t}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Hero NFT — featured card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, rotateY: 12 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="relative max-w-[520px] w-full mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-blue-500/10 blur-3xl scale-110" />
              <div className="relative border border-white/10 shadow-2xl shadow-primary/20">
                <img src={heroImg} alt="HybridVibes #0062 — Kyoto Oni Ape" className="w-full aspect-square object-cover" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex justify-between items-end">
                  <div>
                    <p className="font-mono text-xs text-primary uppercase tracking-widest">Featured Specimen</p>
                    <p className="font-mono text-white font-bold text-lg">#0062 — Kyoto Oni Ape</p>
                  </div>
                  <span className="font-mono text-xs text-white/60 border border-white/10 px-2 py-1">Ape · Rare</span>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary translate-x-[-8px] translate-y-[-8px]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500 translate-x-[8px] translate-y-[8px]" />
            </motion.div>
          </div>
        </section>

        {/* ── SCROLLING TICKER ── */}
        <div className="overflow-hidden border-y border-white/5 bg-black/50 py-4">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {TICKER.map((item, i) => (
              <div key={i} className="flex items-center gap-3 shrink-0">
                <img src={item.src} alt={item.id} className="w-10 h-10 object-cover border border-white/10" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest whitespace-nowrap">
                  {item.id} {item.label}
                </span>
                <span className="text-primary/40 font-mono text-xs">◆</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── VISION ── */}
        <section id="vision" className="py-32 px-6 border-b border-white/5 bg-black/40 relative">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={STAGGER}>
              <motion.p variants={FADE_UP} className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-6">The Vision</motion.p>
              <motion.h2 variants={FADE_UP} className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-10">
                The <span className="text-primary">Laboratory</span>
              </motion.h2>
              <motion.p variants={FADE_UP} className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                HybridVibes is an experiment in extreme aesthetics. We took the DNA of the space's most iconic characters — Apes, Doodles, Dogs, and Penguins — and ran them through a cinematic 3D engine with custom handcrafted backgrounds. Every specimen exists in its own world: ancient temples, alien oceans, volcanic calderas, mirror dimensions, deep-sea midnight zones.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section id="gallery" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div>
                <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-3">The Collection</p>
                <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Specimens</h2>
              </div>
              <div className="hidden md:flex items-center gap-2 font-mono text-sm text-primary uppercase">
                10,000 Total <ChevronRight className="w-4 h-4" />
              </div>
            </div>

            {/* Featured row — 3 large */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {GALLERY.slice(0, 3).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: i * 0.15 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden border border-white/10 mb-4">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                    <img src={item.src} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
                      <p className="font-mono text-xs text-primary uppercase tracking-widest">{item.id}</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start font-mono uppercase">
                    <div>
                      <h3 className="text-base font-bold text-white tracking-wider">{item.label}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.trait}</p>
                    </div>
                    <div className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/40 group-hover:bg-white group-hover:text-black transition-all shrink-0 mt-1">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Secondary row — 4 smaller */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {GALLERY.slice(3, 7).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden border border-white/10 mb-3">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                    <img src={item.src} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108" />
                  </div>
                  <p className="font-mono text-xs text-white uppercase tracking-wider truncate">{item.label}</p>
                  <p className="font-mono text-xs text-muted-foreground mt-0.5">{item.id}</p>
                </motion.div>
              ))}
            </div>

            {/* Third row — 5 tiny */}
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {GALLERY.slice(7, 12).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-square overflow-hidden border border-white/10">
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 mix-blend-overlay" />
                    <img src={item.src} alt={item.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  <p className="font-mono text-xs text-muted-foreground mt-2 truncate">{item.id}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SPECS ── */}
        <section id="specs" className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-primary/5">
          <div className="max-w-6xl mx-auto">
            <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] text-center mb-4">On-Chain Protocol</p>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-16 text-center">The Protocol</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Hexagon, value: "10,000", label: "Unique Hybrids" },
                { icon: Zap,     value: "2 SOL",  label: "Mint Price" },
                { icon: Droplets,value: "4 DNA",  label: "Base Styles" },
                { icon: Shield,  value: "5%",      label: "Royalties" },
              ].map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-8 border border-white/10 bg-black/40 backdrop-blur-sm flex flex-col items-center text-center group hover:border-primary/50 transition-colors"
                >
                  <spec.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <div className="text-4xl font-black uppercase tracking-widest mb-2">{spec.value}</div>
                  <div className="font-mono text-sm text-muted-foreground uppercase tracking-wider">{spec.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Extra detail row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {[
                { label: "Blockchain",  value: "Solana" },
                { label: "Standard",   value: "Candy Machine V3" },
                { label: "Treasury",   value: "HTZKRg…khc7" },
              ].map((d, i) => (
                <div key={i} className="flex justify-between items-center p-6 border border-white/10 bg-black/20 font-mono uppercase">
                  <span className="text-muted-foreground text-sm tracking-widest">{d.label}</span>
                  <span className="text-white font-bold text-sm tracking-wider">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── MINT ── */}
        <section id="mint" className="py-40 px-6 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.18)_0%,transparent_70%)] pointer-events-none" />
          <div className="max-w-xl mx-auto relative z-10">
            <div className="border border-white/10 bg-black/70 backdrop-blur-xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-20" />
              <div className="text-center mb-10 relative z-10">
                <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] mb-4">Candy Machine V3 · Solana Mainnet</p>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest mb-4 text-white">Presale Now Live</h2>
                <p className="font-mono text-muted-foreground text-sm">Whitelist early access at 1 SOL · Public mint opens at 2 SOL.</p>
              </div>
              <MintWidget />
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="py-32 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <p className="font-mono text-xs text-primary uppercase tracking-[0.3em] text-center mb-4">Got Questions</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter mb-16 text-center">Intel</h2>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                {
                  q: "What is HybridVibes?",
                  a: "HybridVibes is a premium collection of 10,000 cinematic 3D characters — each one a unique genetic fusion of BAYC, Doodles, Lost Dogs, and Pudgy Penguins, placed inside a custom-crafted world: ancient temples, alien oceans, volcanic calderas, mirror dimensions, and more. Built on Solana using Candy Machine V3."
                },
                {
                  q: "How much does it cost to mint?",
                  a: "Each specimen costs 2 SOL. We use Candy Machine V3 for a secure, optimized minting experience. Phantom and Backpack wallets are fully supported."
                },
                {
                  q: "What rights do I get with my NFT?",
                  a: "Full commercial rights are granted to the holder of each NFT. You own the IP of your minted character — including any commercial use, derivative works, and licensing."
                },
                {
                  q: "What are the royalties?",
                  a: "Secondary sales carry a 5% creator royalty, enforced on-chain. This funds continued development of the HybridVibes universe."
                },
                {
                  q: "When is the reveal?",
                  a: "Artwork and metadata are revealed 24 hours after the public mint concludes. All 10,000 specimens are pre-generated with unique traits."
                },
                {
                  q: "How do I upload to Arweave?",
                  a: "After final art sign-off, use Sugar CLI: `sugar upload` points at collection/images/ and collection/metadata/ to upload everything to Arweave permanently before deploying the Candy Machine."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border border-white/10 bg-black/20 px-6">
                  <AccordionTrigger className="font-mono text-left text-sm md:text-base hover:text-primary transition-colors py-6 uppercase tracking-wider data-[state=open]:text-primary">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t border-white/5 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-mono text-xl font-bold tracking-tighter uppercase text-white flex items-center gap-2">
            <Hexagon className="w-5 h-5 text-primary" />
            HYBRD
          </div>
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
            © {new Date().getFullYear()} HybridVibes. All Rights Reserved. · Solana · 10,000 Supply
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-primary text-muted-foreground hover:text-primary transition-colors cursor-pointer font-mono text-sm">X</div>
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-primary text-muted-foreground hover:text-primary transition-colors cursor-pointer font-mono text-sm">DC</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
