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
| collection book | carnet de collection officiel | Chosen 2026-10-21 from Mira's options (carnet favored for a personal field book); supersedes draft 'livre de collection officiel' |
| nickname | surnom | Player-given name for a tagged shark |
| re-sighting | réobservation | |
| IUCN (body) | UICN | In French, IUCN → UICN; status words themselves are translated in the Research batch |
| tracking (a shark) | suivi | e.g. "Suivre ce requin", "Suivi sur la carte" |
| tag-along insights | découvertes grâce au marquage | Chosen 2026-10-21 from Mira's options; short form 'découvertes' if space is tight. Supersedes draft 'aperçus du marquage' (sounded like visual glimpses). Completion: 'Toutes les découvertes obtenues — 100 %' |

| derpy sharks | requins zinzins | Avery + Mira decision 2026-10-21, Avery-approved: affectionate/playful, more natural than derpy untranslated or loufoques |
| derpy mode | mode zinzin | e.g. "Mode zinzin : activé / désactivé"; claim = "Réclamer ta récompense zinzin"; unlock = "Tu as débloqué les requins zinzins !" — keep réclamer (claiming) distinct from débloquer (initial unlock) |
| PSAT (pop-up satellite archival tag) | balises d’archivage détachables | Explanatory form: they record data, detach, float to the surface, then transmit by satellite. Do NOT use "balises satellites archivées émergentes" |
| common sawshark (Pristiophorus cirratus) | requin-scie à long nez | FAO French name (FishBase), verified against Tag Along sharks-data.js. Flagged for Research batch to prevent drift; do not translate "common" literally |
| last ping (track) | dernier point du trajet | Neutral form for illustrative tracks; "dernier signal" only when a signal really exists |
| tracking map | carte de suivi | |
| currents (map toggle) | courants | |
| tag site | lieu de marquage | Hollow pin on the map |
| re-sighted (count) | réobservé | e.g. "Réobservé 3×" |
| logbook | journal de bord | Tab label; heading "Journal des expéditions" |
| repeat this plan | reprendre ce plan | Restores a logged trip's plan into the planner |
| legacy lure (no lure) | aucun attractant | Old scent-lure dimension, separate from bait (Batch 1 'attractant'); other legacy lure display values (chum / seal / krill) still TBD in the narrative/legacy pass |
| wild archive | archives sauvages | Tab heading "Archives sauvages"; tab label "Archives" |
| trimmed from original | extrait de la vidéo originale | Archive credit-line note; verified — trimmed assets are video excerpts with clip boundaries |
| new photo badge | nouveau média | Badge wording; 'nouvelle photo' only if photo-only, trigger unconfirmed, so broader form chosen |

## Implementation guardrails (Mira, PR #1 review)

- Dynamic placeholders such as `{region}` must display the **localized
  region label**, not an English region string, in the eventual French
  build. Verify at build time, not in the workbook.
- Code keys and Latin scientific names stay unchanged.
- When French text is longer than English, test actual mobile UI
  widths instead of cutting meaning to make a label fit.
- No build, deployment, or Games Hub link is authorized by these
  workbooks.
