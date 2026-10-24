# Mira → Roman: Sarah’s Québec French voice
**PR #8 · 24 octobre 2026 · Sur la piste des requins**

Avery invited Mira to **write Sarah’s final translation batch herself**, reversing the usual workflow. **Roman reviews Mira’s translation; Avery makes the final merge decision.** Please review critically, not by reflexive agreement. No gameplay code, images, deployment or Games Hub link has been altered by this PR.

## What is drafted

There are **734 distinct filled French rows** across 17 CSVs, with English source text, stable review keys, and notes. The spreadsheet-style `category,key,english,quebec_french,notes` format is retained.

| Files | Rows | Source and scope |
| --- | ---: | --- |
| `translation-batch-08a-sarah-chats-01.csv` to `-05.csv` | 300 | All 50 species × 3 chat pairs × Sarah/player from `sarah-data.js` |
| `translation-batch-08b-sarah-nudges-01.csv` to `-02.csv` | 50 | 50 scientific/location/depth/bait hints from `COUSIN_NUDGES` |
| `translation-batch-08c-sarah-cheers-openers-01.csv` to `-02.csv` | 100 | 50 species’ `cheer` and `opener` fields from `sharks-data.js` |
| `translation-batch-08d-big-day-2.csv`, `-3.csv`, `-4.csv`, `-lemon.csv` | 122 | All 32 Big Day conversation variants, with speaker bubbles and placeholders |
| `translation-batch-08e-special-threads.csv` | 60 | The Sarah-named-shark threads, lemon-Sarah Easter egg, Mary Lee, Nicole, Bukangi and follow-up, all 5 Bruce stages, Deep-Sea Unicorn, and **requins zinzins** reward |
| `translation-batch-08f-resighting-reactions.csv` | 28 | Reunion closers, 2nd/3rd/4th+ tiers, fallback, and the special `RESIGHT_LIKES_US_LINE` |
| `translation-batch-08g-script-chats.csv` | 43 | 4 region-unlock threads, generic chats, 8 named-shark check-ins (3 branches per template) |
| `translation-batch-08h-dynamic-phone-finale.csv` | 31 | Sarah’s full win thread, shorter win thread, first Archive introduction, failure support, and dynamic re-sighting templates |

**Review reminder:** In 08a there are 300 lines, not 150: every two-person conversation includes a Sarah bubble and a player bubble. Check *both* sides for authentic rhythm. None of the CSV rows modifies the runtime dialogue logic; it is a localization workbook.

## Voice model

The target is natural, affectionate **Québec French**, not French-from-France and not a performative barrage of Québec slang. Sarah is an autistic adult with a rich interest in sharks. Her normal register is thoughtful, calm, warm, specific and unexpectedly funny. She goes loud **only** for earned peaks: a first tag, multiple species, her favourite lemon shark, or an extraordinary encounter.

- Preserve the *tu* register and the affectionate, non-romantic cousin relationship, with playful scientific precision.
- Do not have Sarah become a caricature; a quiet line should be allowed to stay quiet.
- For jokes, preserve comic intent rather than English word order. A species-specific pun may need a different image in French.
- Use the established PR #7 species names and terms, not literal translations: **requin-taureau** (sand tiger), **requin-bouledogue** (bull), **requin tisserand**, **requin corail**, **requin griset**, **sagre commun**, **squale liche**, **squalelet féroce**, etc. Confirm proper synonyms and match the final Batch 7 roster.
- `requins zinzins` and `mode zinzin` are Avery-approved.
- **One intentionally placed « TABARNOUCHE! »** appears in the 4D Big Day Sarah line, after four new species in one trip. It should remain a genuine excitement spike; do **not** turn every message into a sacre.
- The lemon-shark outburst becomes **« CITROOOOOOOOOON »**, honoring Sarah’s original exuberance.

## Critical implementation safeguards for Roman

1. **Keep all keys, speaker roles, stages, sequencing, cooldowns, and reveal gates unchanged.** Translate display content only; do not alter persistent research IDs, unlock criteria, tag state, or scene timing.
2. **Dynamic placeholders require runtime localization**, not string replacement after text has already been composed in English. In particular:
   - `{speciesList}` / `{count}` in Big Day: build a French list of **localized common names with correct articles and agreement**. The existing English `bigDayArticle()` vowel rule and English `formatSpeciesList()` must not be reused unmodified.
   - `{species}` / `{name}` / `{bruce}` / `{firstName}` / `{n}` / `{hook}` in scripted conversations: preserve player-given names byte-for-byte and localize only species/common-name display values and earned hook content. Account for articles: e.g. *un ange de mer*, *le requin-taureau*.
   - Re-sighting food reply `{pron}`: use localized emphatic **lui/elle/ce requin** after “c'est”, based on the actual saved sex or unknown. **Do not change the `RESIGHT_LIKES_US_LINE` special-trigger comparison**; the shared constant must be localized once and reused in the closer list.
3. **Preserve differentiation between real science and game illustration**. Saved messages and speculative tracking routes must not suddenly claim to be live detections. This is especially worth reviewing in named-shark check-ins, the finale, and “migration tracks” celebrations. I adjusted several French expressions, but the English source also has optimistic wording.
4. **Do not leak locked insights:** each `NAMED_CHECKINS` template has an ordinary reply and a `meLocked` fallback; the unlocked `{hook}` must appear only when earned, preserving the existing game logic.
5. **Do not replay old messages in English on reload:** saved Phone bubbles may be persisted as literal text. Integration needs an explicit decision for saves migrated between editions. This CSV alone cannot retroactively translate free-form saved English strings.
6. **Honor accessibility and text layout**: long French bubbles should wrap on iPad and phones, and text must remain legible; punctuation in authored messages is intentional.
7. **Don't retranslate unrelated game text by accident**. The required Logbook field-notes/pin-hints and Archive captions/media-data pass are separate tracked release gates in `TRANSLATION-PLAN.md`; this batch intentionally focuses on Sarah.
8. **Source versions can change:** before French build integration, compare live English files to this extraction for added/modified Sarah lines, including `script.js` dialogue strings and the possible `nameIdeas` nickname placeholder pass.

## Scientific / editorial questions to challenge

- Some English Sarah facts contain **absolute or sweeping biological statements** (e.g. Greenland shark parasites/blindness; spinner-vs-blacktip breach; conservation rates, whale-shark dives, and superlatives). I softened a few overstatements in French where clarity demanded it, but **did not scientifically certify every claim**. Cross-check the English source and sources rather than letting the editions diverge silently.
- The **Bukangi** story is time-sensitive; the translated thread reflects its source state: successful release from the canal, with open-water monitoring still pending. Verify current factual status before final publishing.
- The **Mary Lee/Nicole** threads contain historical research and public-shark biographies; check units converted to metric and precise factual claims.
- Several *Big Day* lines assume four newly tagged sharks each gives a real satellite migration track. Preserve the game’s modelled-track disclaimer rather than implying real telemetry.
- Preserve the animal-welfare principle. The player tags and releases sharks; Sarah doesn't frame wild animals as pets or collectibles.

## Mechanical tests already run

- The 17 CSV files contained **734 nonempty unique keys, zero missing French cells, and five columns per record**.
- A placeholder comparison found **one issue** in the dynamic pronoun reply; corrected to keep `{pron}` in French with an explicit grammatical mapping. Re-run the audit after all commits before approval.
- The data source files were **not modified**. This is a translation draft for critical review and eventual integration, not a working game patch.

## What I want Roman to do

Read the conversations *as conversations*, not just as dictionary pairs. Check whether Sarah actually sounds like herself, whether her science is accurate, and whether the player’s replies set up her punchlines. Call out weak jokes or calques. Please send **specific challenges** on this PR and feel free to offer alternatives. If you make corrections to my branch, leave a short note of what changed so we can learn from each other.

**No merge without Avery.**

— Mira 🩵
