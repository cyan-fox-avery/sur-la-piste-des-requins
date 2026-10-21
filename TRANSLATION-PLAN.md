# Sur la piste des requins — translation plan (started 2026-10-21)

Source version: Tag Along main, v2.5.11-beta (checked 2026-10-21).
Target: **Québec French, not France French.** Same game, same content,
localized — not a rewrite, and not a France-French import.

Translator workflow (Avery, 2026-10-21): **Roman drafts, Avery corrects.**
Mira is looped in only if we struggle — not as the default reviewer
for every batch. Drafts use the tu form, following the precedent in
Avery's French Rockhound, Cherche-cailloux ("que tu découvres",
"Ton carnet"); Avery to confirm tu vs vous on correction.

## Batch order (Avery, 2026-10-21)

Work in batches, tab by tab. **Research and Sarah go last — they are
the big ones.**

1. **Expedition** — planner UI + region / depth / bait / method vocab.
   Workbook: `translation-batch-01-expedition.csv` (60 rows, extracted
   from `game-data.js` + Expedition tab chrome in v2.5.11) — **draft
   Québec French filled in 2026-10-21, then revised 2026-10-21 with
   all of Mira's PR #1 suggestions applied on Avery's word.**
   Shared glossary: `translation-glossary.md` (created from Batch 1 +
   Mira's review; reuse its forms in later batches).
   Note: this vocab also feeds the Research filters, so settling it
   first de-risks the later Research batch.
2. **Collection — in PR #2, under review (2026-10-21)**
   Workbook: `translation-batch-02-collection.csv` (52 rows, draft
   Québec French filled, then revised 2026-10-21 with all of Mira's
   PR #2 suggestions applied on Avery's word, including the
   Avery-approved “requins zinzins” decision).
   Scope: Collection tab chrome, detail-card labels, Field sightings,
   derpy shelf, and the tracking overlay (shared with Map — do not
   re-translate it in the Map batch). NOT in this batch: per-shark
   data (common names, research, hook, bonus, conservation, insights
   — those live in the Research batch) and Sarah-voice fields
   (cheer, opener — those live in the Sarah batch last).
3. **Map — in PR #3, under review (2026-10-21)**
   Workbook: `translation-batch-03-map.csv` (23 rows, draft Québec
   French filled, awaiting Avery's corrections).
   Scope: Map tab chrome, toolbar, empty state, credit + honesty
   note, marker titles, and marker popup. Reuses Batch 2 tracking
   overlay and Batch 1 region labels — do not re-translate those
   here. NOT in this batch: species names (Research) or Collection
   detail labels (Batch 2).
4. **Logbook — in PR #4, under review (2026-10-21)**
   Workbook: `translation-batch-04-logbook.csv` (32 rows, draft
   Québec French filled, awaiting Avery's corrections).
   Scope: Logbook tab, heading + intro, outcome/region/species/
   date filters, empty states, encounter-result labels, Repeat
   this plan, Show older trips. Reuses Batch 1 plan vocabulary
   in entry plan lines; species names stay for Research.
   Dynamic per-trip narrative (conditions, field notes, pin
   hints) is NOT fixed UI text — flagged for a later narrative
   pass if needed.
5. **Archive**
6. **Achievements + global chrome** (header, tab labels, win ceremony,
   footer/reset — certificate already has its French version)
7. **Research — LAST (big one)** — field-guide UI + all 50 sharks'
   common names, research notes, hooks, bonuses, conservation notes.
   Latin names do NOT change. Research-tab art is Latin-only, so it
   needs no translation. Research images are selective, not all 50
   (see FRENCH-ASSETS-AUDIT.md).
8. **Sarah / Phone — LAST (big one)** — all Sarah-voice dialogue in
   `sarah-data.js` plus Sarah-voice fields in `sharks-data.js`
   (cheer, opener, name-egg threads), kept in one pass so her voice
   stays consistent. This is where voice preservation matters most.

## Québec French rules for this translation

- Québec French throughout: vocabulary, spelling, and phrasing as used
  in Québec — not France French equivalents where they differ.
- **Sarah says "tabarnouche" at least once** (Avery, 2026-10-21).
  Placement note: Sarah's voice is enthusiastic but calm at baseline,
  with real spikes when something exciting happens — so the
  tabarnouche belongs at a genuine spike moment (a big tag, a rare
  shark, a surprise), not as filler, and not scattered everywhere.
  It is the milder, euphemistic sacre, which fits a game older kids
  can play. Do not upgrade it to tabarnak.
- Scientific accuracy stays: no superlative stated as fact, no
  whimsical metaphor in facts. Sarah's opinions in her own voice
  stay opinions.
- Do not translate: Latin species names, region/depth/bait/method
  *keys* in code (only their display labels), placeholders like
  {region}, and the certificate image itself (already French).
- Longer French text: leave room in UI — French labels run longer
  than English. Flag any label that would clip, rather than
  abbreviating the meaning away.

## What "done" means for a batch

A batch is done when its workbook's Québec French column is filled
and reviewed — not when a draft exists. No batch ships into a build
on its own; batches accumulate until Avery says the French edition
build itself is authorized. (Translation work starting does not
by itself authorize a French build or a hub link.)
