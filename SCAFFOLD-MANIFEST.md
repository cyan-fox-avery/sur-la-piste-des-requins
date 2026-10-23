# French build scaffold — manifest (2026-10-23)

Staged from English Tag Along main (checked 2026-10-23) for the French
edition, sur-la-piste-des-requins. This is preparation only: nothing
here is merged to French main, nothing is published, and no hub link
has been changed.

## Copied as-is — no player-facing text (155 files)
- assets/sharks-webp/*.webp — shark illustrations + silhouettes, text-free
- assets/backgrounds-webp/*.webp — ambient background wildlife, text-free
- assets/expedition-backgrounds/*.webp — location backgrounds, text-free
- assets/logo.png — logo, no words (per FRENCH-ASSETS-AUDIT.md)
- assets/porthole/drafts/*.png — wave/splash art actually referenced by
  style.css for the dive scene, despite the "drafts" folder name
- assets/art-loader.js — slug mapping + loading logic; only code comments
  are in English, no player-facing strings
- style.css — styling only; no user-facing strings (its `content:` list is empty)
- underwater-landscape.mp4 / underwater-portrait.mp4 + posters — ocean video, text-free

## French replacement, not an English copy (1 file)
- assets/master-tagger-certificate.jpg — Avery's French certificate
  ("Maître du marquage des requins"), copied from the local archive at
  the same path the English build references, so it slots in when the
  build is assembled. The English certificate was NOT copied.

## Held back — needs translation or verification first
- index.html, script.js — all UI strings (Batches 1–8 workbooks)
- sharks-data.js — common names, research notes, hooks, bonuses, Sarah
  cheer/opener fields (Batches 7 + 8)
- game-data.js, achievements-data.js, archive-ui.js — Batch 1 / 6 / 5 vocab
- archive-data.js — media captions + credits (required media-data gate)
- sarah-data.js, bigday-data.js — Sarah dialogue (Batch 8)
- map-data.js — HELD for verification: tracking envelopes contain English
  geographic area labels; not yet confirmed whether any surface in the UI
- art-data.js — HELD for a small aria-label pass: derpy SVG shapes are
  language-neutral, but all 100 aria-labels are English common names;
  those follow Batch 7 common names
- sketches/*.svg — HELD: aria-labels are English, and these files are not
  referenced by script.js; Avery's Latin-only research sketches are the
  intended research art
- test-suite.js, README.md, NEXT-UP.md, roster-catalogue.md,
  docs/research-text-pass-audit.md, qa/*, assets/porthole/drafts/README.md
  — English docs/tests/QA, not shipped game files

## Still gated (unchanged by this scaffold)
- Batches 7 (Research) and 8 (Sarah/Phone) are not translated yet, and
  the English research-text final pass comes before French Batch 7.
- No French build, deployment, or Games Hub link is authorized by this
  scaffold. A build still needs: all batches, the media-data pass,
  tour slides, What's New content, and the final source-delta audit.
