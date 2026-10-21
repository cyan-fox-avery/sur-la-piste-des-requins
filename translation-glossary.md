# Sur la piste des requins — shared terminology glossary

Created 2026-10-21 from Batch 1 (Expedition) + Mira's review of PR #1,
applied on Avery's word ("Apply all of Mira's suggestions").

Rule: once a form below is approved, reuse it consistently across
Expedition, Research, Collection, and Logbook, while still allowing
natural sentence-level variation. Do not invent a second form for
the same concept in a later batch without flagging it.

| English concept | Québec French (approved form) | Notes |
| --- | --- | --- |
| expedition | expédition | Tab + batch name |
| tagging / a tag | marquage | e.g. "se débloque à 10 marquages" |
| tag (the device, noun) | balise | Mira's glossary term; confirm in context when it first appears in a batch |
| observation / sighting | observation | |
| bait | appât | |
| attractant (general) | attractant | General UI term; the specific mixture is below |
| fish-oil mixture | mélange attractif à l'huile de poisson | Shorten only if UI width forces it, and note the change |
| searching / spotting | repérage | e.g. "Repérage en bateau des concentrations de plancton" |
| a shark gathering | rassemblement | Verb form: "Repérer un rassemblement" |
| kelp habitat (large) | forêts de varech | Not "herbiers de varech" for large habitat |
| shearwaters | puffins | French puffins ARE shearwaters; English puffin = macareux — do NOT "correct" to macareux |
| twilight depths (game: 100–400 m) | zone crépusculaire | Good French; do NOT imply exact formal oceanographic boundaries — game ranges stay intact |
| breach (verb) | bondir hors de l'eau | e.g. baleines à bosse bondissent hors de l'eau |
| collection book | livre de collection | |
| nickname | surnom | Player-given name for a tagged shark |
| re-sighting | réobservation | |
| IUCN (body) | UICN | In French, IUCN → UICN; status words themselves are translated in the Research batch |
| tracking (a shark) | suivi | e.g. "Suivre ce requin", "Suivi sur la carte" |
| tag-along insights | aperçus du marquage | Draft form in Batch 2 — Avery to confirm; insight content lives in Research batch |

## Implementation guardrails (Mira, PR #1 review)

- Dynamic placeholders such as `{region}` must display the **localized
  region label**, not an English region string, in the eventual French
  build. Verify at build time, not in the workbook.
- Code keys and Latin scientific names stay unchanged.
- When French text is longer than English, test actual mobile UI
  widths instead of cutting meaning to make a label fit.
- No build, deployment, or Games Hub link is authorized by these
  workbooks.
