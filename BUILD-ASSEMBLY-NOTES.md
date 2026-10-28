# Build assembly notes — generated data files (2026-10-25, WIP, no deployment)

Generator: /tmp/fr-out/generate.js (kept outside the repo; rerun after any workbook change).
Generated from English main 4144d89d (v2.7.15) + French build-branch CSVs, by exact key match
(sharks/chats/nudges/media) or exact English-string match (bigday/achievements).

## Files generated (on branch root, valid JS — node --check passes)
- sharks-data.js: 50 sharks — name/research/hook/bonus/conservation/cheer/opener in French;
  status kept English (code key) + statusFr French display name. Latin, code, combo, depths,
  methods, sizeRange preserved.
- sarah-data.js: COUSIN_CHATS 300 messages + COUSIN_NUDGES 50, all French.
- bigday-data.js: BIG_DAY 122 messages, placeholders {speciesList}/{count} preserved.
- archive-data.js: 50 species, 93 assets, French captions; credits/license IDs/page links
  preserved exactly; sawshark-1 asset type changed photo -> illustration (Mira gate).
- secret-facts.js: SECRET_FACTS 101 entries (Batch 7 secret rows) — to be merged into French script.js.
- achievements-data.js: 21 achievements translated; see gap below.

## Audit: mismatches are CSV-English staleness, NOT French errors (verified)
- salmon research: CSV English column has the old mojibake (â for em dashes); French text is fine.
- megamouth-3 / greenland-3 / velvetbelly-2 chats: CSV English is pre-v2.7.15 wording, but the
  French texts already carry the corrected science (reflection, regional copepod data, Vulnérable).
  No re-translation needed; the CSV English columns are stale, not the French.

## Gaps (block shipping, not assembly)
- 5 achievements untranslated (v2.7.14 additions, Batch 6 predates them): On the Brink,
  Maiden Voyage, Twilight Zone, Midnight Zone, Fieldwork (+ descriptions). Left English, flagged.
  Needs a small Batch 6b + Mira review.
- nameIdeas untranslated (50 sharks x ~4 nickname suggestions): player-facing — used as the
  nickname input placeholder (script.js). Needs a small batch + Mira review.
- sketchCap: NOT player-facing anymore (field sketches removed; only a test-suite presence check
  references it). Left English; non-blocking.
- script.js UI strings (Batches 1–6, 9, 9b, 08e–08h, pronoun-pool variants), index.html, game-data.js,
  archive-ui.js chrome, art-data.js aria-labels, map-data.js geo labels: NOT yet assembled.
  script.js assembly must also port v2.7.15 code (chum-aware sea conditions, method-mismatch hint),
  suppress What's New, and use the French builder rules in BUILD-PLAN.md.
