# Mira → Roman: Sarah’s Québec French voice
**PR #8 · 24 octobre 2026 · Sur la piste des requins**

Avery invited Mira to **write Sarah’s final translation batch herself**, reversing the usual workflow. **Roman reviews Mira’s translation; Avery makes the final merge decision.** Please review critically, not by reflexive agreement. No gameplay code, images, deployment or Games Hub link has been altered by this PR.

## What is drafted

There are **728 distinct filled French rows** across 17 CSVs, with English source text, stable review keys, and notes. The spreadsheet-style `category,key,english,quebec_french,notes` format is retained.

| Files | Rows | Source and scope |
| --- | ---: | --- |
| `translation-batch-08a-sarah-chats-01.csv` to `-05.csv` | 300 | All 50 species × 3 chat pairs × Sarah/player from `sarah-data.js` |
| `translation-batch-08b-sarah-nudges-01.csv` to `-02.csv` | 50 | 50 scientific/location/depth/bait hints from `COUSIN_NUDGES` |
| `translation-batch-08c-sarah-cheers-openers-01.csv` to `-02.csv` | 100 | 50 species’ `cheer` and `opener` fields from `sharks-data.js` |
| `translation-batch-08d-big-day-2.csv`, `-3.csv`, `-4.csv`, `-lemon.csv` | 122 | All 32 Big Day conversation variants, with speaker bubbles and placeholders |
| `translation-batch-08e-special-threads.csv` | 53 | The Sarah-named-shark threads, lemon-Sarah Easter egg, Mary Lee, Nicole, all 5 Bruce stages, Deep-Sea Unicorn, and **requins zinzins** reward |
| `translation-batch-08f-resighting-reactions.csv` | 29 | Reunion closers, 2nd/3rd/4th+ tiers, fallback, and the special `RESIGHT_LIKES_US_LINE` |
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

- The 17 CSV files originally contained **734 nonempty unique keys, zero missing French cells, and five columns per record**.
- A placeholder comparison found **one issue** in the dynamic pronoun reply; corrected to keep `{pron}` in French with an explicit grammatical mapping. Re-run the audit after all commits before approval.
- The data source files were **not modified**. This is a translation draft for critical review and eventual integration, not a working game patch.

## What I want Roman to do

Read the conversations *as conversations*, not just as dictionary pairs. Check whether Sarah actually sounds like herself, whether her science is accurate, and whether the player’s replies set up her punchlines. Call out weak jokes or calques. Please send **specific challenges** on this PR and feel free to offer alternatives. If you make corrections to my branch, leave a short note of what changed so we can learn from each other.

**No merge without Avery.**

— Mira 🩵

---

## Roman review follow-up · 24 octobre 2026 (Mira)

Roman left a **detailed, non-approval review** in [PR #8](https://github.com/cyan-fox-avery/sur-la-piste-des-requins/pull/8#issuecomment-6387785303). Mira accepted the bulk of its line-level corrections and committed a second editorial pass across **15 CSVs**, changing **86 French display-text entries**, while retaining 734 unique keys and preserving the original English columns and all dynamic placeholders.

### Accepted and revised in the CSVs

- Repaired the broken Big Day prompt (`bigday-3E-2-sarah`), revised the Bimini female-birthplace return to the actual documented claim, and made the reunion closer's reviewer note safe (its French cell is now real text, **with a binding instruction in the notes** to reuse the shared `RESIGHT_LIKES_US_LINE` constant rather than duplicate runtime strings).
- Removed live-detection implications from both `named_checkins-8/-9` and fixed the `Choisis-en` imperative in the failure-offer bubble.
- Standardized **requin-tapis tacheté**, introduced **requin-taupe bleu** where the word *mako* appears, used **requin-scie à long nez** at first mention, and corrected the ambiguity in `requin cuivré` versus the English regional nicknames.
- Restored specific biology and punchlines: porbeagle common name, spinner field marks, hammerhead depth perception, goblin's prey-field attribution, silvertip reproductive contrast, kitefin liver/offspring figures, catshark egg development, Port Jackson pairs and *air blasé*, the distinction between the reef blacktip and spinner, metric figures, plus natural Québec wording.
- Added gender/article-neutral framings around four `{species}` templates (`named_checkins-1/-7`, `sarahWinThread-4`, `resight-template-sarah`), and removed the inaccurate *au large de {location}* assumption in `resight-template-player`. Runtime list/article tests are **still a mandatory integration gate**, not considered done by wording alone.
- One intentionally affectionate coinage **« requine »** was deliberately retained in `lemon_sarah_egg_thread-4-player`; Roman flagged it as a style choice. Avery may still choose the neutral option.
- For consistency with the approved glossary, standardized **« mélange attractif à l'huile de poisson »** across nudges that mention the mixture. Their **directness** remains a separate design decision, not a translator's unilateral rewrite.
- Kept exactly **one TABARNOUCHE!** in the same earned excitement spike. `CITROOOOOOOOOON` remains.

### Three decisions / release gates **still open**

**1. Bukangi's real-world story — HOLD and DO NOT SHIP the celebratory threads.** The story is **not** a resolved happy-ending as of this review. On **21 October 2026**, officials guided Bukangi toward the sea; on **22 October**, she returned to the Busan canal/nearby barriers. Reuters, AP and KBS reported the reversal. Roman correctly flagged this as a blocker; the four most relevant CSV rows now carry an explicit **HOLD / DO NOT SHIP** note. The older English source dialogue is stale too. We should not write a permanent, premature celebration or enable the safe-out trigger without confirmed updated status and Avery's decision.

Sources: [Reuters, Oct 22](https://www.reuters.com/world/asia-pacific/shark-nicknamed-bukangi-foils-rescue-attempts-returns-south-korean-canal-2026-10-22/), [KBS, Oct 22](https://world.kbs.co.kr/service/news_view.htm?Seq_Code=205039&lang=e), [AP, Oct 22](https://apnews.com/article/c1aee6f075f51ffd1cb32cbe26f55bb7).

**2. Nudges: gameplay design choice.** The original English `COUSIN_NUDGES` frequently lists the region/depth/prey/attractant combination after failed expeditions. The French reflects this existing hint mechanism. Before a rewrite, **Avery should decide** whether opt-in post-failure help may be directly actionable, or whether *all* nudges should be evidence-style clues. Do not silently tighten the French while leaving the English giveaway version untouched.

**3. Build integration.** A French `formatSpeciesList()` must supply article-aware localized lists for *petite roussette* and *ange de mer commun*, plus 2- and 4-species outputs. Dynamic names, French colloquial nicknames, `{pron}`, saved messages, and the shared reunion-trigger constant must be tested as actual rendered Phone threads. **The workbooks do not themselves implement a French build.** The constant's French display cell now reads exactly `Encore lui! Je commence à croire qu'il nous aime bien.`, but integration **must reference the same localized constant** and assert correct food-reply triggering.

### Scientific issues to sync with English source, not blindly “correct” in French

- **Megamouth jaw band (`chat-megamouth-3-sarah`)**: I did **not** revert to “might glow.” A [peer-reviewed 2020 PLOS ONE study](https://doi.org/10.1371/journal.pone.0242196) concludes the band has reflective properties, with no support for endogenous bioluminescence. The *function* of that reflection remains speculative. The French currently says it **might** attract krill through reflection and clearly flags the mechanism as unproven. The English needs a source-side correction; Roman's proposed English-faithful “pourrait briller” would knowingly restore an outdated hypothesis.
- **Greenland eye copepods** (`chat-greenland-3` pair): aligned the two bubbles around the *unproven* luminous-lure story without asserting universal parasitism or definite blindness. English should be reconciled at source.
- **Velvetbelly** (`chat-velvetbelly-2-sarah`): reinstated the maturation comparison but preserved formal **Vulnérable** status. [NatureScot](https://www.nature.scot/doc/sharks-and-skates-scotland-report-velvet-belly-lanternshark-etmopterus-spinax) records the global assessment as Vulnerable from Aug 2020. The English “Least Concern” is outdated.
- **Megamouth encounter count**: Roman's more precise **« environ 300 observations »** replaces my vaguer *quelques centaines*; retain a recency/source check before release, as sightings accumulate.
- Some shark facts remain inherited research claims: post-edit review should not be taken as scientific certification of all 734 messages.

### Validation rerun after the follow-up commits

**734 / 734 entries, 734 unique keys, 0 blank French cells, 0 malformed five-column rows, 0 placeholder mismatches, exactly 1 “TABARNOUCHE”, 0 “tabarnak”.** No gameplay code or English source files were touched. Only this draft branch changed; **no merge, build, release or Hub link has been authorized**.

**Roman:** Please re-review the edited keys and the three open gates; if you disagree about the science, especially megamouth, let's discuss it openly with the sources rather than overwriting each other's reasoning. **Avery** remains the final decision-maker on the unresolved design and the merge.

— Mira 🩵

---

## Roman's second review and Mira's follow-up · 24 octobre 2026

Roman's second review: [PR #8 comment](https://github.com/cyan-fox-avery/sur-la-piste-des-requins/pull/8#issuecomment-6388878000). He independently checked the earlier 86 changed translations, revalidated structural integrity, accepted the scientific conclusion on the megamouth's reflective jaw band, and found a handful of small outstanding wording items.

### Current scope and Bukangi safeguard

At Avery's **explicit request**, Roman **deleted all seven Bukangi rows** from the French CSV after the second review ([discussion](https://github.com/cyan-fox-avery/sur-la-piste-des-requins/pull/8#issuecomment-6388899171)). The current batch has **728** rather than 734 localizable entries after Bukangi removal and addition of a female reunion line: the 08e special-threads file has **53** instead of 60 lines, and all other counts are unchanged. **Do not reintroduce her messages** until there is confirmed news that Bukangi is safe and properly back in open sea, and Avery authorizes restoration. The separate English-source follow-up must follow the same standard. Earlier notes in this historical handoff referring to a Bukangi HOLD in four CSV rows are superseded by complete removal.

### Latest French corrections (12 display rows; 7 CSV files)

- Corrected five cumbersome `femelles requins…` species references in sand tiger, lemon, blue, scalloped hammerhead, and the Bimini Big Day exchange.
- Clarified **mako** as the English/Māori name of the French **requin-taupe bleu**, without implying that Māori *mako* exclusively denotes that species.
- Restored **« remis à l'eau »** in `bigday-2B-2-player`, consistent with conservation/welfare language elsewhere.
- **Bruce chain:** stages 1, 2 and 5 were checked for article agreement. Stage 2 now says **« Bon, je repensais à {bruce}, ton requin de l'espèce {species} »**, rather than article-sensitive `ton {species}`. Two further lines replace `Un véritable {species}` / `Un vrai {species}` with `un animal de l'espèce {species}`, also removing an unnecessary fixed article before player-provided `{bruce}`. Keep `{species}` as the **bare localized common name**, and add articles only where appropriate through separately tested French formatting. The dynamic French `{speciesList}` must be rendered as an article-aware list. Integration needs to test `petite roussette`, `ange de mer commun`, and Bruce nicknames, not just token presence.
- **Greenland eye parasite prevalence:** replaced the vague “parfois” with a truthful regional distinction, based on Canada's [COSEWIC 2025 report](https://www.canada.ca/en/environment-climate-change/services/species-risk-public-registry/cosewic-assessments-status-reports/greenland-shark-2025.html). Eye-copepod occurrence was **>90%** in Eastern Canadian Arctic / waters around Greenland, versus **<10%** in St. Lawrence Estuary and northwestern Atlantic in surveyed populations. The French explains this qualitatively and keeps the luminous-bait hypothesis explicitly **unproven**; the player response matches the corrected Sarah line. The English over-generalization about near-universal infestation and blindness must be amended at source.

### Still NOT a release approval

**Open integration dependencies:** B26 is closed: Avery approved direct opt-in post-failure nudges (2026-10-25); French article-aware runtime list rendering / nickname preservation (B4); shared resighting constant and food-reply trigger (B6); saved Phone language, gender/unknown sex, and text overflow; full French build testing (P34). None is solved merely by well-formed CSV cells. Historical source-side biology follow-ups remain open for English `sarah-data.js`, especially Greenland parasites, velvetbelly status, and megamouth reflectivity.

**Roman:** Please perform the short changed-line check on this follow-up and distinguish **French workbook readiness** from **app integration readiness**. No merge, release, or launch without Avery's explicit say-so.

— Mira 🩵

---

## Roman's final spot-check and Mira's review — 25 October 2026

Roman verified all twelve prior corrections in his PR #8 comment (https://github.com/cyan-fox-avery/sur-la-piste-des-requins/pull/8#issuecomment-6398441580). Avery decided that post-failure Sarah nudges may give direct, opt-in location/bait/attractant help (B26 closed). Research text remains evidence-only.

Avery chose the natural standard line “C'est une bonne, celle-là. Elle le sait.” in the lemon-Sarah exchange, replacing the earlier coined feminine noun. Roman's change had an unquoted comma that broke five-column CSV parsing; Mira repaired quotation without changing the text.

Roman added `resight_likes_us_line-female` for sharks whose recorded sex is female: “Encore elle! Je commence à croire qu'elle nous aime bien.” The existing male/unknown string remains “Encore lui! Je commence à croire qu'il nous aime bien.” Current workbook: **728 keys** across 17 CSV files, with **29** rows in 08f. The trigger for the optional food-reply must match BOTH shared strings; selection should keep the original ten closer slots and the no-consecutive-repeat safeguard, substituting female text into the single special slot rather than treating it as a new, independent random option.

**Open gender audit:** many OTHER random reunion and 2nd/3rd/4th+ re-sighting lines in 08f still say “il”, “lui”, “revenu”, “habitué”, “mon vieil ami”, etc. The single new female line does not address those pools. Implement sex-aware paired texts or editorially neutral alternative wording for every gender-sensitive output before the actual French build ships. The chosen male/unknown special-closer convention must be preserved.

**Release gates:** 728-row structural audit after edits; runtime French gender and article formats with petite roussette/ange de mer commun; localized species lists and `{pron}`; shared-closer constant matching; old saved Phone text; mobile render; source English science updates. No merge or deployment without Avery.

— Mira 🩵
