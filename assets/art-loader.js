/* assets/art-loader.js — v0.26.0: raster art loading for the approved illustration set.
   The game was SVG-only until v0.26.0; this module introduces the first
   external image assets (WebP illustrations + silhouettes from the Mira-approved
   art pass). All functions degrade gracefully: if an image fails to load,
   the caller falls back to the inline SVG in ART[species.id]. */

"use strict";

/* v0.26.0: art slug mapping. Most species IDs map directly to their art
   filename slug, but twelve use more specific common names in the art set:
   - blacktip (Blacktip Reef Shark) -> blacktip-reef
   - greatwhite (Great White Shark) -> great-white
   - oceanic (Oceanic Whitetip) -> oceanic-whitetip
   - whitetip (Whitetip Reef Shark) -> whitetip-reef
   - scalloped (Scalloped Hammerhead) -> scalloped-hammerhead
   - smooth (Smooth Hammerhead) -> smooth-hammerhead
   - greyreef (Grey Reef Shark) -> grey-reef
   - caribbean (Caribbean Reef Shark) -> caribbean-reef
   - portjackson (Port Jackson Shark) -> port-jackson
   - velvetbelly (Velvet Belly Lanternshark) -> velvet-belly
   - pacificsleeper (Pacific Sleeper Shark) -> pacific-sleeper
   - spinydogfish (Spiny Dogfish) -> spiny-dogfish
   The pygmy art exists but has no game ID (bonus species) — it is skipped. */
const ART_SLUG_MAP = {
  "blacktip": "blacktip-reef",
  "greatwhite": "great-white",
  "oceanic": "oceanic-whitetip",
  "whitetip": "whitetip-reef",
  "scalloped": "scalloped-hammerhead",
  "smooth": "smooth-hammerhead",
  "greyreef": "grey-reef",
  "caribbean": "caribbean-reef",
  "portjackson": "port-jackson",
  "velvetbelly": "velvet-belly",
  "pacificsleeper": "pacific-sleeper",
  "spinydogfish": "spiny-dogfish"
};

function artSlug(id) {
  return ART_SLUG_MAP[id] || id;
}

/* Returns the URL for a shark's illustration or silhouette WebP. */
function ART_URL(id, type) {
  return `assets/sharks-webp/${artSlug(id)}-${type}.webp`;
}

/* Returns the URL for a background creature shadow WebP. */
function BG_URL(name) {
  return `assets/backgrounds-webp/${name}.webp`;
}

/* Preloads the illustration for a species so the tap-to-reveal encounter
   is instant. v1.6.6-beta: silhouettes are no longer separate images — the
   shadow uses the illustration with a dark CSS overlay. Safe to call
   repeatedly. */
const _preloaded = new Set();
function preloadSharkArt(id) {
  if (_preloaded.has(id)) return;
  _preloaded.add(id);
  const img = new Image();
  img.src = ART_URL(id, "illustration");
}

/* Returns an <img> HTML string for a shark's art, with onerror fallback
   to the inline SVG. The fallback keeps the game playable if an asset
   is missing or fails to load (offline, CDN hiccup, etc.). */
/* v1.7.0-beta: derpy mode — the win-unlocked completion award. When the
   player has finished the full roster, they can toggle the original derpy
   SVG art. Checked via localStorage directly so this works regardless of
   script.js load order. */
function derpyModeOn() {
  try { return localStorage.getItem("tyi-derpy-mode") === "1"; } catch { return false; }
}
function derpyUnlocked() {
  try { return localStorage.getItem("tyi-derpy-unlocked") === "1"; } catch { return false; }
}

function sharkArtImg(id, type, alt) {
  /* v1.7.0-beta: derpy mode shows the original derpy SVG art instead of
     the WebP illustration.
     v1.7.20-beta: in derpy mode the expedition mystery silhouette is a
     darkened derpy SVG — the same CSS darkening trick as v1.6.6
     (.shark-shadow svg { filter: brightness(0); }) — so the mystery
     stays suspenseful in derpy style, revealed on tap to the full
     derpy art. */
  if (type === "illustration" && derpyModeOn() && typeof ART !== "undefined" && ART[id]) {
    return ART[id];
  }
  const url = ART_URL(id, type);
  const safeAlt = (alt || id).replace(/"/g, "&quot;");
  /* The onerror swaps in the SVG from ART[id] if it exists; otherwise
     hides the broken image. The data attribute lets us find the element. */
  return `<img src="${url}" alt="${safeAlt}" loading="lazy" ` +
    `data-shark-art="${id}" data-art-type="${type}" ` +
    `onerror="sharkArtFallback(this)" />`;
}

/* Generic steel-blue mystery silhouette (RGB 52,80,125), used when a
   silhouette image fails to load. A failed silhouette must NOT fall back
   to the full-colour SVG — that would spoil the mystery by revealing the
   species. This neutral shape keeps the encounter mysterious. */
const MYSTERY_SILHOUETTE_SVG =
  `<svg viewBox="0 0 220 110" role="img" aria-label="Mystery shark silhouette" class="mystery-silhouette">` +
  `<path fill="#344E7D" d="M10,64 C28,52 55,45 88,45 L100,26 L113,44 ` +
  `C136,46 158,52 176,60 L204,46 L191,61 L205,76 L178,68 ` +
  `C158,77 132,82 106,81 L98,98 L89,80 C60,79 32,73 12,68 Z"/></svg>`;

/* Global fallback handler (called from the inline onerror above). */
function sharkArtFallback(img) {
  const id = img.getAttribute("data-shark-art");
  const type = img.getAttribute("data-art-type");
  /* Silhouette failure: show the generic mystery shape, never the
     species' full-colour SVG. */
  if (type === "silhouette") {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = MYSTERY_SILHOUETTE_SVG;
    img.replaceWith(wrapper.firstChild);
    return;
  }
  /* ART is defined in art-data.js, loaded before this module's callers. */
  if (typeof ART !== "undefined" && ART[id]) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = ART[id];
    img.replaceWith(wrapper.firstChild);
  } else {
    img.style.display = "none";
  }
}

/* Returns an <img> HTML string for a background creature shadow.
   Background creatures are ambient decoration — if a sprite fails to
   load, hide it gracefully rather than showing a broken image. */
function bgCreatureImg(name, alt) {
  const url = BG_URL(name);
  const safeAlt = (alt || name).replace(/"/g, "&quot;");
  return `<img src="${url}" alt="${safeAlt}" loading="lazy" class="bg-creature-img" ` +
    `onerror="this.style.display='none'" />`;
}
