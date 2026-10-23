# Mira’s Research editorial pass · 2026-10-23

**PR #7 — Sur la piste des requins.** This handoff accompanies changes made directly to `translation-batch-07-research.csv` on Roman's existing draft branch, at Avery's invitation.

## Scope and status

The CSV retains **437 translatable rows** (35 research UI, 50 × six per-species fields, 101 extra facts, plus the scope row), their original English source columns, keys, and all dynamic placeholders. No gameplay code, source English prose, links, image assets, or deployment were changed. **This is an editorial rewrite in progress, not a merge approval or a claim that all 437 lines were individually rewritten.** Roman should review the updated text; Avery's final approval remains required.

Work completed across three commits:

1. French common-name corrections tied to scientific species IDs, French geographic names, metric/decimal/thousands formatting, capitalization and consistency. Kept Latin binomials unchanged.
2. Rewrote dozens of clunky French research passages and secret facts with a warmer, clearer, less literal voice, including the four especially directive *Pêchez…* research paragraphs. Preserved habitat/depth/prey evidence rather than inserting new expedition recipes.
3. Documented 12 species-name decisions with sources **inside the corresponding CSV name rows**. Unverified names remain flagged; `Etmopterus perryi` is an example needing a final preferred French common name decision.

A structural parse/check after the first two commits confirmed **437 well-formed CSV rows**, unchanged category distribution, no dynamic placeholder changes, and no detected remnants of a defined scan list of English country/region names, direct `vous`, or `Pêchez` instructions. These mechanical checks **do not replace a full human/biological review**.

## Species naming principles

Match the `sharks-data.js` **Latin ID**, not a literal English noun. Representative sourced decisions:

| Species Latin | Approved-for-draft French | Reference |
| --- | --- | --- |
| *Carcharias taurus* | requin-taureau | [DFO](https://waves-vagues.dfo-mpo.gc.ca/library-bibliotheque/9973.pdf) |
| *Carcharhinus leucas* (already distinct) | requin-bouledogue | Established separate roster name |
| *Sphyrna tiburo* | requin-marteau tiburo | [TERMIUM](https://www.btb.termiumplus.gc.ca/tpv2alpha/alpha-fra.html?i=&index=ent&lang=fra&srchtxt=SPHYRNA+TIBURO) |
| *Carcharhinus melanopterus* | requin à pointes noires | [France CITES](https://cites.application.developpement-durable.gouv.fr/viewtaxon.do?id=37034) |
| *Triaenodon obesus* | requin corail | [DORIS](https://doris.ffessm.fr/Especes/Triaenodon-obesus-Requin-corail-1258) |
| *Carcharhinus longimanus* | requin océanique | [DORIS](https://doris.ffessm.fr/Especes/Carcharhinus-longimanus-Requin-oceanique-976) |
| *Carcharhinus amblyrhynchos* | requin gris de récif | [DORIS](https://doris.ffessm.fr/Especes/Carcharhinus-amblyrhynchos-Requin-gris-de-recif-1323) |
| *Carcharhinus plumbeus* | requin gris | [FishBase](https://www.fishbase.se/FieldGuide/FieldGuideSummary.php?c_code=262&genusname=Carcharhinus&speciesname=plumbeus) |
| *Carcharhinus perezii* | requin de récif des Caraïbes | [DORIS](https://doris.ffessm.fr/Especes/Carcharhinus-perezii-Requin-caraibe-2770), documented variant |
| *Carcharhinus brevipinna* | requin tisserand | [FAO](https://www.fao.org/4/w9160f/w9160f04.pdf) |
| *Hexanchus griseus* | requin griset | [DFO](https://www.dfo-mpo.gc.ca/species-especes/profiles-profils/sixgillshark-requingriset-fra.html) |
| *Etmopterus spinax* | sagre commun | [FishBase](https://fishbase.se/ComNames/CommonNameSummary.php?autoctr=108678) |
| *Dalatias licha* | squale liche | [EU](https://fish-commercial-names.ec.europa.eu/fish-names/species/dalatias-licha_fr) |
| *Isistius brasiliensis* | squalelet féroce | [DORIS](https://doris.ffessm.fr/Especes/Isistius-brasiliensis-Squalelet-feroce-5787) |

These are **draft glossary choices**; Roman and Avery can select another documented regional synonym if desired, but all on-screen appearances for an individual species should agree. The DORIS primary name for *Carcharhinus perezii* is *requin caraïbe*, so the longer *requin de récif des Caraïbes* should be treated as an accepted explanatory variant rather than the sole official name.

## Items deliberately *not* silently settled

- **Blacktip reef vs. spinner behavior:** `secret-blacktip-1` still associates spinning feeding breaches with *Carcharhinus melanopterus*. This is strongly evocative of *C. brevipinna*, the separately listed spinner/tisserand shark. **Roman: please investigate the ENGLISH source claim, scientifically, before it is propagated as a fact in either language.** The edited French text currently reflects the supplied English claim.
- **Conservation statuses, population statistics, physiology and biological absolutes:** French rendering has generally retained the English source's claims. They need their own source/recency checks, particularly megamouth encounter totals and any global/regional conservation-status distinctions.
- **Research puzzle design:** I recast four explicit `Pêchez…` paragraphs into observational wording. Please double-check every French paragraph still provides useful depth/prey/region clues without directly disclosing the complete expedition combo. The English content may also still contain instructions and should be reviewed independently.
- **Remaining common-name decisions:** verify all 50 names, especially the flagged ones not included in the sourced subset above (e.g. `dwarflantern`). Avoid translating a name solely because its English form sounds descriptive.
- **Quality pass:** this was a substantial but selective editorial rewrite across a large workbook. Please give the remaining notes, hooks, conservation claims and 101 facts a fresh pair of eyes for agreement, flow and factual caution.
- **Source-version syncing:** English Tag Along continues evolving; take a new English-source delta before implementation. The translation workbook is not itself a deployed French game.

## Practical review request

Roman, please inspect the CSV diff and review **my edits critically**. I'd especially welcome pushback on any French phrase whose meaning has drifted, species term with a better regional standard, or science that needs more nuance. Fix errors in this branch or leave specific PR comments; then Avery can decide whether the batch is ready to merge.

— Mira 🩵
