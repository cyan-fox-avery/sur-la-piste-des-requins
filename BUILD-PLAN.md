# French build — plan (started 2026-10-25, Avery's build word; NO deployment, NO Pages, NO Games Hub link authorized)

Branch: roman-french-build, from French main 98ecc1ea (all workbooks merged: Batches 1–10) + scaffold merged (7503688f: 155 art/code files + French certificate, no text). 196 files on branch.

## Source-version delta (English main moved since the workbooks)
English main is now 4144d89d (v2.7.15, PR #162 "final English fixes"), up from 3ee6220c (v2.7.14). Diff 3ee6220c..4144d89d touches: script.js, sarah-data.js, sharks-data.js, test-suite.js, README.
- ALREADY ALIGNED in French (no re-translation needed, keep French wording): megamouth reflection (Batch 8), Greenland regional parasite data (Batch 8 B12), velvetbelly Vulnerable (Batch 7), Tour Archive honesty (Batch 9 tour-8), sea-tropical-7 physical sense (Batch 9).
- CODE PORTS REQUIRED (logic, not text): chum-aware sea-condition filter (eligibleSeaConditions + pickSeaCondition(regionId, plan)), method-mismatch hint firing (methodMismatch + pinHintForTrip method branch). French PIN_HINTS.method translation exists (Batch 9) and now has a live firing path.
- NOT CARRIED: English WHATS_NEW v2.7.15 entry. French edition launches with NO What's New dialog (Avery decision 2026-10-25); suppression is a build requirement.
- Bukangi: English script.js still holds only the dated historical correction lines + RESET_KEYS (deliberate). French build carries no Bukangi content anywhere.

## Assembly order
1. French data files generated from merged CSVs (never hand-edited English copies): sharks-data (Batch 7 names/research/hooks/bonus), game vocab (Batches 1–6), achievements (Batch 6), archive-data (Batch 10 captions + preserved credits/licenses/links), sarah-data + bigday-data (Batch 8 + pronoun-pool variants), narrative/tour (Batch 9), persisted pools (Batch 9b).
2. French builder code: species-list gender builder (CORRECTED map: 49 masculine, 1 feminine — petite roussette only; sagre commun is masculine), {pron} mapping (female→elle, male→lui, unknown→ce requin), closer-variant trigger accepting either reunion-5 variant, fr-CA logbook dates, English encounter keys with enum→label lookup, Archive search/sort on French names with fr-CA collation, chum filter on "nappe de mélange attractif", exact-English-to-key saved-string mapping with fallback, What's New suppressed.
3. Sawshark-1 illustration: source data types it as photo; build MUST render/classify it as illustration, never as a photograph (Mira build gate, Batch 10).
4. Saved-language migration + recorded-sex persistence + {speciesList}/{pron} tests + mobile wrapping + desktop/mobile article checks (petite roussette + ange de mer commun).

## Gaps still open (block a shippable build, not assembly work)
- art-data.js: 100 English aria-labels → Batch 7 French names (small pass).
- map-data.js: English geo labels in tracking envelopes — confirm which surface in UI, translate those.
- Archive UI chrome: "Your shark", "tagged", "at", "coming soon" + "trimmed from original" build string ("raccourci par rapport à l'original") — small batch, not yet drafted.
- French version number: SETTLED 2026-10-25 (Avery): French edition launches as v1.0.0, independent of the English v2.7.15-beta number.
- Final localization audit + iPad playtest + Mira review of the assembled build.

## Decisions already settled (do not re-open without Avery)
- Québec French, tu throughout. No What's New. No Pages deployment, no Hub link until separately authorized. Bukangi excluded until confirmed safe out to sea.
