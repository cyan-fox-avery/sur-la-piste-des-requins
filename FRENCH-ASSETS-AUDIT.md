# Sur la piste des requins — French assets audit (2026-10-21)

Question Avery was working through: which Tag Along assets need a separate
French version, vs. which can be shared between English and French?

## Needs a separate French version — only one so far

- **Master Shark Tagger certificate** — the only baked-text image in the game.
  French version received 2026-10-21: `certificat-maitre-du-marquage-des-requins.jpg`
  (1125×774; "Maître du marquage des requins"; name line y=56.6%, x=22–80.5%).
  Note the compass already localizes: O (Ouest) instead of W.

## Shared, no French version needed

- **Shark illustrations + silhouettes** (50 species) — no text in the image.
- **Ambient background wildlife** (dolphin, fish school, jellyfish, ray,
  sea turtle, seal) — no text.
- **Logo** (`assets/logo.png`) — shark with a tag, no words. The title text
  itself is HTML, so it localizes as a string, not a new image.
- **Background ocean video / sun video** — no text.
- **Archive photos and videos** — real media, no baked captions. Captions
  are code strings, so they translate as text, not as new assets.

## Research-tab art — deliberately language-neutral

Avery + Mira rule (2026-10-21): research sketches carry **only the Latin
name**, so one set works for both languages. Example saved at
`../research-art/example-thresher-tail-alopias-vulpinus.jpg` — common
thresher, *Alopias vulpinus*, showing its defining feature, the long
upper tail. Correction to the 2026-10-19 all-50 scope (Avery, 2026-10-21):
**only some sharks will have research-tab images.** The generator
struggled at both ends — with subtle features (e.g. the Galápagos
shark's fin) and with very unique features (e.g. the goblin shark's
jaw) — so the set is selective, not complete-the-roster.

Guardrail for the rest of the set: if a sketch ever gains a common-name
caption or an annotated label in English, it stops being shared and
would need a French twin. Latin only keeps it single-source.

## Not assets — French strings, not French images

- Sarah's dialogue, research text, achievement text, tutorial tour,
  UI labels, and the certificate export canvas (which draws the typed
  name/date onto the certificate image in code). Those are a translation
  job in code, not new image files.

## Status

- French edition repo (`cyan-fox-avery/sur-la-piste-des-requins`) still has
  no build/code and is still unlinked on the games hub until the French
  edition is authorized. This audit is about assets only, not authorization.
- Rest of the research-tab sketches: Avery said 2026-10-21 they will be
  ready soon, and sent as one batch when finished (he already has a few
  more). Nothing is queued for integration until that batch lands.
