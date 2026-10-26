/* Tag Along — v0.16.0
   Research -> plan (region/depth/bait/method) -> dive -> watch/tag/resight
   -> collection book + logbook. */

"use strict";

/* Build number — shown in the top corner of the page. Bump every release. */
const VERSION = "v1.0.0";

/* v1.4.2: standard IUCN Red List category abbreviations for the compact
   field-guide pills. Full category names appear in expanded entries. */
const IUCN_ABBR = {
  "En danger critique": "CR",
  "En danger": "EN",
  "Vulnérable": "VU",
  "Quasi menacée": "NT",
  "Préoccupation mineure": "LC",
  "Data Deficient": "DD"
};

/* v0.22.0: "What's new?" — shown once per version update. */
const WHATS_NEW = /* French edition launches with NO What's New dialog (Avery decision 2026-10-25): empty map, so the dialog never fires. */
{};

function whatsNewSeen() {
  try { return localStorage.getItem("tyi-last-seen-version"); } catch { return null; }
}
function markWhatsNewSeen() {
  try { localStorage.setItem("tyi-last-seen-version", VERSION); } catch {}
}
/* Pure: should the What's New screen show?
   v0.22.0 Mira review: distinguish brand-new players from v0.21.0 upgraders.
   - No save data at all → first run, don't show.
   - Has save data but no version → v0.21.0 upgrader, show.
   - Version differs → show. Same version → don't. */
function shouldShowWhatsNew(lastSeen, current, hasSaveData) {
  if (!hasSaveData) return false; // brand new player
  if (!lastSeen) return true; // v0.21.0 upgrader (no version key yet)
  return lastSeen !== current;
}
function playerHasSaveData() {
  try {
    // Any of these indicates an existing player
    return !!(localStorage.getItem("tyi-logbook") ||
              localStorage.getItem("tyi-collection") ||
              localStorage.getItem("tyi-stats"));
  } catch { return false; }
}

/* ---------- SVG art: simplified, real proportions, few colours ---------- */

/* ---------- Ambient sea life: small silhouettes that drift through the dive ---------- */

/* v0.26.0: background creatures are now Mira-approved WebP shadow sprites
   (steel-blue silhouettes, transparent) instead of inline SVGs. The three
   original creatures keep their keys; ray/seal/jellyfish are new. */
const CREATURE_ART = {
  turtle: null, // set below via bgCreatureImg
  fish: null,
  dolphin: null,
  ray: null,
  seal: null,
  jellyfish: null,
  anglerfish: null,
  penguin: null,
  mola: null,
  moray: null,
  seahorse: null,
  clownfish: null,
  parrotfish: null,
  pufferfish: null,
  lionfish: null,
  hatchetfish: null,
  gulper: null,
  vampire: null,
  siphonophore: null,
  krill: null,
  viperfish: null,
  snailfish: null,
  cusk: null,
  otter: null,
  narwhal: null,
  beluga: null,
  snake: null,
  manatee: null,
  tuna: null,
};
/* Filled in at load: art-loader.js must be loaded before script.js. */
function initCreatureArt() {
  CREATURE_ART.turtle = bgCreatureImg("bg-sea-turtle", "Tortue de mer");
  CREATURE_ART.fish = bgCreatureImg("bg-fish-school", "Banc de poissons");
  CREATURE_ART.dolphin = bgCreatureImg("bg-dolphin", "Dauphin");
  CREATURE_ART.ray = bgCreatureImg("bg-ray", "Raie");
  CREATURE_ART.seal = bgCreatureImg("bg-seal", "Phoque");
  CREATURE_ART.jellyfish = bgCreatureImg("bg-jellyfish", "Méduse");
  CREATURE_ART.anglerfish = bgCreatureImg("bg-anglerfish", "Baudroie");
  CREATURE_ART.penguin = bgCreatureImg("bg-penguin", "Manchot");
  CREATURE_ART.mola = bgCreatureImg("bg-mola", "Poisson-lune");
  CREATURE_ART.moray = bgCreatureImg("bg-moray", "Murène");
  CREATURE_ART.seahorse = bgCreatureImg("bg-seahorse", "Hippocampe");
  CREATURE_ART.clownfish = bgCreatureImg("bg-clownfish", "Poisson-clown");
  CREATURE_ART.parrotfish = bgCreatureImg("bg-parrotfish", "Poisson-perroquet");
  CREATURE_ART.pufferfish = bgCreatureImg("bg-pufferfish", "Poisson-globe");
  CREATURE_ART.lionfish = bgCreatureImg("bg-lionfish", "Poisson-lion");
  CREATURE_ART.hatchetfish = bgCreatureImg("bg-hatchetfish", "Poisson-hachette");
  CREATURE_ART.gulper = bgCreatureImg("bg-gulper", "Anguille pélican");
  CREATURE_ART.vampire = bgCreatureImg("bg-vampire-squid", "Calmar vampire");
  CREATURE_ART.siphonophore = bgCreatureImg("bg-siphonophore", "Siphonophore");
  CREATURE_ART.krill = bgCreatureImg("bg-krill", "Essaim de krill");
  CREATURE_ART.viperfish = bgCreatureImg("bg-viperfish", "Poisson-vipère");
  CREATURE_ART.snailfish = bgCreatureImg("bg-snailfish", "Poisson-limace");
  CREATURE_ART.cusk = bgCreatureImg("bg-cusk-eel", "Donzelle");
  CREATURE_ART.otter = bgCreatureImg("bg-sea-otter", "Loutre de mer");
  CREATURE_ART.narwhal = bgCreatureImg("bg-narwhal", "Narval");
  CREATURE_ART.beluga = bgCreatureImg("bg-beluga", "Béluga");
  CREATURE_ART.snake = bgCreatureImg("bg-sea-snake", "Serpent de mer");
  CREATURE_ART.manatee = bgCreatureImg("bg-manatee", "Lamantin");
  CREATURE_ART.tuna = bgCreatureImg("bg-tuna", "Banc de thons");
}

/* Flavour: the dive log describes the place, not just the mechanics.
   v0.6.0: depth sets the atmosphere — shallow flavour is bright and busy,
   deep flavour is dark and strange. */
const DEPTH_FLAVOUR = {
  "surface": [
    "La lumière du soleil éclate à la surface en plaques mouvantes. L'eau est chaude et d'une limpidité incroyable.",
    "Le clapot de surface berce doucement le bateau. En dessous, tout brille d'un bleu-vert.",
    "Tu peux voir l'ombre du bateau qui dérive au-dessus de toi, une forme sombre sur le plafond lumineux de la mer.",
    "Une brise ride la surface en paillettes. Des goélands crient quelque part, très haut."
  ],
  "reef": [
    "Des têtes de corail s'élèvent comme une ville engloutie. De petits poissons vifs filent entre les branches.",
    "Le récif bourdonne — pas de bruit, mais de mouvement. Ici, tout s'affaire.",
    "Une station de nettoyage s'affaire en dessous : de minuscules poissons qui picorent les parasites d'un mérou patient.",
    "Une pieuvre se faufile d'une crevasse à l'autre, changeant de couleur au passage."
  ],
  "twilight": [
    "La lumière s'amincit jusqu'à un indigo profond. Tes yeux s'adaptent lentement à la pénombre.",
    "Des particules dérivent comme de la neige qui tombe vers le haut. C'est très silencieux, ici.",
    "La pente s'enfonce dans l'obscurité d'un côté. Tu sens la profondeur plus que tu ne la vois.",
    "Ton profondimètre dépasse les 200 mètres. Le dernier bleu s'efface vers un bleu-noir."
  ],
  "deep": [
    "Il ne reste pour ainsi dire plus de lumière — seulement la lueur du submersible et l'obscurité qui presse de partout.",
    "Le fond marin, quand les faisceaux l'éclairent, est une boue grise et douce, qui semble n'avoir pas été remuée depuis des décennies.",
    "Chaque mouvement, ici, semble délibéré. Rien ne gaspille d'énergie dans les profondeurs.",
    "Les faisceaux du submersible éclairent la neige marine : une chute lente et sans fin de minuscules particules blanches.",
    "Quelque part dans le noir, quelque chose clignote en bleu-vert, une fois. La bioluminescence — le langage même des profondeurs."
  ]
};

/* Sightings pair a log line with a creature drifting past. Vary by depth.
   v0.13.0: pools fattened (reef had only 2, twilight/deep only 1) and dealt
   like cards per trip — the old pure-random pick is what stacked three
   turtles in one dive. */
const SIGHTINGS = {
  "surface": [
    {
      "text": "Une tortue de mer glisse devant toi, sans se presser, ses nageoires bougeant comme de lentes ailes.",
      "creature": "turtle",
      "biomes": [
        "tropical",
        "temperate",
        "volcanic",
        "pelagic"
      ]
    },
    {
      "text": "Un banc de petits poissons argentés tournoie en parfaite harmonie.",
      "creature": "fish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Un dauphin apparaît au loin, décrit un arc dans le bleu, puis disparaît.",
      "creature": "dolphin",
      "biomes": [
        "tropical",
        "temperate",
        "pelagic"
      ]
    },
    {
      "text": "Deux poissons volants rasent la surface, touchant l'eau puis s'envolant à nouveau.",
      "creature": "fish",
      "biomes": [
        "tropical",
        "pelagic"
      ]
    },
    {
      "text": "Un phoque file comme une torpille, élégant et curieux, puis disparaît dans le bleu.",
      "creature": "seal",
      "biomes": [
        "temperate",
        "kelp",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Une raie manta bondit hors de l'eau au loin, déploie ses grandes ailes noires contre le ciel, puis disparaît.",
      "creature": "ray",
      "biomes": [
        "tropical",
        "pelagic"
      ]
    },
    {
      "text": "Une tortue caouanne remonte respirer, expire avec un son comme un soupir, puis plonge.",
      "creature": "turtle",
      "biomes": [
        "tropical",
        "temperate"
      ]
    },
    {
      "text": "Un groupe de dauphins tachetés chasse en formation, rabattant un banc serré de petits poissons dans une panique scintillante.",
      "creature": "dolphin",
      "biomes": [
        "tropical",
        "pelagic"
      ]
    },
    {
      "text": "Un poisson-lune de la taille d'une porte se prélasse à la surface, se balançant lentement au soleil.",
      "creature": "mola",
      "biomes": [
        "tropical",
        "temperate",
        "pelagic"
      ]
    },
    {
      "text": "Un manchot du Cap file comme une torpille dans un jet de bulles, d'une vitesse impossible pour un oiseau.",
      "creature": "penguin",
      "regions": [
        "south-africa"
      ]
    },
    {
      "text": "Un manchot des Galápagos file devant toi, minuscule et rapide, disparu avant que tu puisses le montrer du doigt.",
      "creature": "penguin",
      "regions": [
        "galapagos"
      ]
    },
    {
      "text": "La silhouette d'un requin-marteau passe au loin, sa large tête reconnaissable même d'aussi loin.",
      "creature": "shark:hammerhead",
      "biomes": [
        "tropical",
        "pelagic"
      ]
    },
    {
      "text": "Quelque chose d'énorme glisse sous le bateau — l'ombre d'un requin-baleine, lente et immense, avant de disparaître.",
      "creature": "shark:whale",
      "biomes": [
        "tropical",
        "pelagic"
      ]
    },
    {
      "text": "Une loutre de mer glisse devant toi, pattes repliées, parfaitement chez elle dans le varech.",
      "creature": "otter",
      "biomes": [
        "kelp"
      ]
    },
    {
      "text": "Un narval glisse dans l'eau verte et froide, sa longue défense ouvrant la voie.",
      "creature": "narwhal",
      "biomes": [
        "polar"
      ]
    },
    {
      "text": "Un béluga dérive lentement, pâle, sans nageoire dorsale pour briser sa silhouette.",
      "creature": "beluga",
      "biomes": [
        "polar"
      ]
    },
    {
      "text": "Un serpent de mer ondule devant toi, sa queue plate ramant, sans faire attention à toi.",
      "creature": "snake",
      "regions": [
        "philippines",
        "papua-new-guinea",
        "maldives"
      ]
    },
    {
      "text": "Un lamantin passe pesamment, lent et moustachu, broutant au passage.",
      "creature": "manatee",
      "regions": [
        "caribbean"
      ]
    },
    {
      "text": "Un banc de thons file à toute vitesse, argentés et rapides, disparus en un clin d'œil.",
      "creature": "tuna",
      "biomes": [
        "pelagic"
      ]
    },
    {
      "text": "Un poisson-clown file entre les tentacules d'anémone, puis s'y réfugie.",
      "creature": "clownfish",
      "regions": [
        "philippines",
        "papua-new-guinea",
        "maldives"
      ]
    },
    {
      "text": "La silhouette d'un grand requin blanc passe au loin, énorme et sans se presser, trop éloignée pour la suivre.",
      "creature": "shark:greatwhite",
      "biomes": [
        "tropical",
        "temperate",
        "pelagic"
      ]
    },
    {
      "text": "La silhouette d'un requin-taupe bleu file au loin, trop rapide et trop éloignée pour la suivre.",
      "creature": "shark:mako",
      "biomes": [
        "tropical",
        "temperate",
        "pelagic"
      ]
    },
    {
      "text": "La silhouette d'un requin-renard traverse le bleu au loin, sa longue queue traînant derrière, trop éloignée pour la suivre.",
      "creature": "shark:thresher",
      "biomes": [
        "tropical",
        "temperate",
        "pelagic"
      ]
    }
  ],
  "reef": [
    {
      "text": "Une tortue de mer pagaye au-dessus du corail, indifférente à ta présence.",
      "creature": "turtle",
      "biomes": [
        "tropical",
        "volcanic"
      ]
    },
    {
      "text": "Un banc scintillant de fusiliers déferle sur la crête du récif.",
      "creature": "fish",
      "biomes": [
        "tropical",
        "volcanic"
      ]
    },
    {
      "text": "Une tortue imbriquée grignote une éponge sur une tête de corail, son bec croquant sans relâche.",
      "creature": "turtle",
      "biomes": [
        "tropical"
      ]
    },
    {
      "text": "Un petit requin de récif patrouille le tombant — pas ta cible, juste un collègue de passage.",
      "creature": "fish",
      "biomes": [
        "tropical",
        "volcanic"
      ]
    },
    {
      "text": "Une raie aigle tachetée glisse sur le platier sableux, ses ailes ondulant comme de lents applaudissements.",
      "creature": "ray",
      "biomes": [
        "tropical"
      ]
    },
    {
      "text": "Une tortue verte repose sur un massif de corail, blottie comme pour une sieste. C'est probablement le cas.",
      "creature": "turtle",
      "biomes": [
        "tropical"
      ]
    },
    {
      "text": "Un banc de barracudas flotte immobile dans le bleu, des virgules argentées toutes tournées dans le même sens.",
      "creature": "fish",
      "biomes": [
        "tropical",
        "volcanic",
        "temperate"
      ]
    },
    {
      "text": "Une pieuvre de récif se glisse sur le corail, changeant de couleur à chaque mètre.",
      "creature": "fish",
      "biomes": [
        "tropical",
        "volcanic"
      ]
    },
    {
      "text": "Un phoque serpente entre les stipes de varech, apparaît un instant, puis disparaît, comme une rumeur.",
      "creature": "seal",
      "biomes": [
        "kelp",
        "temperate"
      ]
    },
    {
      "text": "Eau froide, peu de lumière — un banc de petits poissons argentés se tient au-dessus du récif rocheux.",
      "creature": "fish",
      "biomes": [
        "temperate",
        "polar",
        "kelp"
      ]
    },
    {
      "text": "Un immense banc de maquereaux tournoie au-dessus de ta tête, un nuage vivant aux reflets argentés.",
      "creature": "fish",
      "biomes": [
        "pelagic"
      ]
    },
    {
      "text": "Un calmar progresse par jets d'eau dans le bleu, bras traînants, chassant en pleine eau.",
      "creature": "fish",
      "biomes": [
        "pelagic"
      ]
    },
    {
      "text": "Une méduse lune dérive dans le bleu, se contractant doucement.",
      "creature": "jellyfish",
      "biomes": [
        "pelagic"
      ]
    },
    {
      "text": "La silhouette d'un requin-tigre traverse le tombant très en dessous, trop éloignée pour la suivre.",
      "creature": "shark:tiger",
      "biomes": [
        "tropical"
      ]
    },
    {
      "text": "Une murène glisse devant toi, longue et sinueuse, la bouche qui s'ouvre et se ferme au passage.",
      "creature": "moray",
      "biomes": [
        "tropical"
      ]
    },
    {
      "text": "Un hippocampe dérive debout, queue bien enroulée, se balançant avec l'eau.",
      "creature": "seahorse",
      "biomes": [
        "tropical",
        "temperate"
      ]
    },
    {
      "text": "Un poisson-perroquet racle la surface du corail de son bec, laissant derrière lui un nuage de sable.",
      "creature": "parrotfish",
      "biomes": [
        "tropical"
      ]
    },
    {
      "text": "Un poisson-globe plane au-dessus du récif, lisse et sans se presser, nageoires frémissantes pour rester sur place.",
      "creature": "pufferfish",
      "biomes": [
        "tropical",
        "temperate"
      ]
    },
    {
      "text": "Un poisson-lion plane au-dessus du récif, nageoires largement déployées, magnifique et indifférent.",
      "creature": "lionfish",
      "biomes": [
        "tropical",
        "temperate"
      ]
    }
  ],
  "twilight": [
    {
      "text": "Un banc lâche de poissons-lanternes scintille devant toi, chacun portant sa propre petite lumière.",
      "creature": "fish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Une chaîne de salpes dérive devant toi, des tonneaux vitreux reliés bout à bout.",
      "creature": "fish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Un calmar progresse par jets d'eau à la lisière des lumières, bras traînants, disparu en un clin d'œil.",
      "creature": "fish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Une méduse lune dérive, se contractant doucement, traînant ses fins bras buccaux.",
      "creature": "jellyfish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Un poisson-hachette scintille devant toi, au corps haut et argenté, les lumières de son ventre clignotant.",
      "creature": "hatchetfish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Une anguille pélican dérive, bouche énorme d'abord, sa longue queue se perdant dans le noir.",
      "creature": "gulper",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Un calmar vampire avance par pulsations devant toi, sa cape sombre de bras palmés traînant derrière lui.",
      "creature": "vampire",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Un siphonophore dérive, longue chaîne de cloches et de filaments, plus long que toi.",
      "creature": "siphonophore",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Un nuage de krill grouille devant toi, des milliers de minuscules corps se déplaçant comme un seul.",
      "creature": "krill",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Un poisson-vipère flotte dans le noir, crocs découverts, son long rayon dorsal se balançant devant lui.",
      "creature": "viperfish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    }
  ],
  "deep": [
    {
      "text": "Quelque chose de petit et de pâle dérive à la lisière des lumières — disparu avant que tu aies pu le distinguer.",
      "creature": "fish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Un grenadier fouille la boue à la lisière des lumières, sans se presser.",
      "creature": "fish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Une pieuvre dumbo passe en agitant ses nageoires, comme un petit fantôme avec des oreilles.",
      "creature": "fish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Une méduse des grands fonds avance par pulsations dans l'obscurité, sa cloche luisant faiblement en rouge.",
      "creature": "jellyfish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Une baudroie dérive à la lisière des lumières, son leurre luisant faiblement devant toutes ces dents.",
      "creature": "anglerfish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Un poisson-limace dérive, au corps mou, en forme de têtard, indifférent à l'obscurité.",
      "creature": "snailfish",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "Une donzelle glisse dans la boue, au corps allongé et discret, la queue s'effilant au loin.",
      "creature": "cusk",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "polar",
        "volcanic"
      ]
    },
    {
      "text": "La silhouette d'un requin-lutin dérive dans le noir en dessous, trop profonde et trop éloignée pour la suivre.",
      "creature": "shark:goblin",
      "biomes": [
        "tropical",
        "temperate",
        "kelp",
        "pelagic",
        "volcanic"
      ]
    }
  ]
};

/* v0.13.0: the sighting deck is filtered against the region note so the
   trip doesn't echo it — the Caribbean note already mentions a green sea
   turtle, Japan's a lanternfish, the Maldives' dolphins. */
const SIGHTING_KEYWORDS = { turtle: "turtle", fish: "fish", dolphin: "dolphin", ray: "ray", seal: "seal", jellyfish: "jelly", penguin: "penguin", anglerfish: "angler", mola: "mola", moray: "moray", seahorse: "seahorse", clownfish: "clownfish", parrotfish: "parrotfish", pufferfish: "pufferfish", lionfish: "lionfish", hatchetfish: "hatchetfish", gulper: "gulper", vampire: "vampire", siphonophore: "siphonophore", krill: "krill", viperfish: "viperfish", snailfish: "snailfish", cusk: "cusk", otter: "otter", narwhal: "narwhal", beluga: "beluga", snake: "snake", manatee: "manatee", tuna: "tuna" };
/* v2.7.4-beta: sighting-deck weighting — fish sightings surface most
   often, dolphins and turtles a bit less, everything else rarer. The deck
   still deals each sighting at most once per trip; weighting only orders
   the shuffle, so common creatures land earlier in the trip. Shark
   silhouettes ("shark:<id>") weigh 1, like all other rarities.
   v2.7.4-fix (Mira review): the deck is consumed with pop(), so the sort
   MUST be ascending — descending put the highest-weight-biased keys first
   in the array, which pop() deals LAST, so rares were dealt first. */
const CREATURE_WEIGHT = { fish: 3, dolphin: 2, turtle: 2 };
function sightingWeight(entry) {
  const key = (entry.creature || "").split(":")[0];
  return CREATURE_WEIGHT[key] || 1;
}
function weightedSightingShuffle(arr) {
  return arr.map(s => ({ s, k: Math.pow(Math.random(), 1 / sightingWeight(s)) }))
    .sort((a, b) => a.k - b.k).map(o => o.s);
}
function buildSightingDeck(depth, region) {
  const pool = SIGHTINGS[depth] || [];
  const note = ((REGIONS[region] && REGIONS[region].note) || "").toLowerCase();
  /* v2.4.0-beta (Mira review): filter by biome compatibility too — no turtles
     in the Arctic, no seals in the Maldives, no coral-reef animals in polar
     waters. Falls back to a neutral fish sighting, never an empty deck. */
  const biome = REGION_BIOME[region] || "temperate";
  const filtered = pool.filter(s => {
    let echo = note.includes(SIGHTING_KEYWORDS[s.creature]);
    /* v2.7.5-fix (Mira review): "lanternfish" contains "fish" but is not a
       generic-fish repeat — in a lanternfish note, suppress a fish-sprite
       entry only when its own text repeats the lanternfish line. Other
       fish-sprite entries (squid, salps, octopus, silver schools) are not
       duplicates of the note. All other keyword de-dup is untouched. */
    if (s.creature === "fish" && note.includes("lanternfish")) {
      echo = s.text.toLowerCase().includes("lanternfish");
    }
    return !echo &&
      (!s.biomes || s.biomes.indexOf(biome) !== -1) &&
      (!s.regions || s.regions.indexOf(region) !== -1);
  });
  const use = filtered.length ? filtered : pool.filter(s => s.creature === "fish");
  const final = use.length ? use : pool;
  return { deck: weightedSightingShuffle(final), pool: final };
}

/* Rare, quiet easter eggs in the flavour. Real phenomena, mentioned in passing.
   v0.6.0: the secrets live in the deep — the shallows are too bright for secrets. */
const EASTER_EGGS = [
  "Un instant, l'eau étincelle — des algues bioluminescentes, dérangées par le courant, qui clignotent comme des étoiles mouillées.",
  "Une vaste forme sombre se profile sur le côté — la silhouette d'un navire sabordé, rendu depuis longtemps à la mer.",
  "Quelque chose en dessous émet une brève pulsation de lumière bleue et froide, puis s'éteint. Tu décides de ne pas aller voir.",
  "L'eau est si claire qu'elle semble retouchée, comme le plan d'ouverture d'un documentaire animalier.",
  "C'est le genre d'eau sombre dont les vieux films de monstres nous mettaient en garde. Tu regardes par-dessus ton épaule quand même."
];

/* v0.22.0: failed trips feel like fieldwork — weather, sea state, and
   wildlife make every expedition a day on the water, not just a miss.
   v1.8.5-beta: keyed by climate zone like FIELD_NOTES — the Arctic no
   longer sounds like the Caribbean. 40 lines so repeats are rare. */
const SEA_CONDITIONS = {
  "tropical": [
    "Alizés d'est, réguliers et chauds — l'eau est d'un turquoise impossible.",
    "Un petit grain tropical à midi, disparu à une heure. Le pont fume au soleil ensuite.",
    "Calme plat et éblouissant — la mer semble coulée, et l'horizon miroite.",
    "Des nuages d'alizés dodus qui défilent en rangées, des moutons qui brillent entre eux.",
    "Chaud, lumineux et venteux — la nappe de mélange attractif s'étire droit derrière nous.",
    "Pluie le matin, éblouissement l'après-midi. Les tropiques n'arrivent pas à se décider, et les requins non plus.",
    "L'eau est si chaude qu'il faut surveiller la glace qui garde l'appât au frais. Calme plat, pas une ride.",
    "Une petite houle de l'orage d'hier, qui s'apaise. Le bateau roule doucement, comme s'il réfléchissait.",
    "Un voile de nuages hauts devant le soleil — lumineux mais doux, l'eau devenue de l'argent martelé.",
    "Humide et immobile à l'aube, puis la brise de mer s'installe vers dix heures. Une journée tropicale classique."
  ],
  "temperate": [
    "Des houles grises et un ciel bas — l'eau a la couleur de l'ardoise mouillée.",
    "Un brouillard matinal qui ne se lève jamais tout à fait; on navigue au son et aux instruments.",
    "De la bruine par intermittence, la mer hachée par un vent d'ouest agité.",
    "Un front froid est passé pendant la nuit — l'air est vif, l'eau agitée et verte.",
    "Un soleil pâle à travers de hauts nuages, la mer roulant en longues houles grises.",
    "Calme plat sous un ciel blanc — l'eau ressemble à de l'acier brossé.",
    "Un bon vent du nord qui soulève des moutons; les embruns crépitent contre la timonerie.",
    "Des bancs de brouillard qui passent, là puis disparus — le monde réduit à cinquante mètres.",
    "Couvert et bruineux, mais la mer est clémente — juste une lente et douce houle.",
    "Le soleil de fin d'après-midi qui perce enfin, dorant le sommet des vagues. Ça compense presque le froid."
  ],
  "polar": [
    "De la glace brisée qui tinte contre la coque — la mer est une bouillie de blanc et de bleu acier.",
    "Un vent mordant du nord, mais l'eau à l'abri de la glace est d'un calme plat.",
    "Un pâle soleil qui ne monte jamais haut, éblouissant sur la glace. Lunettes de soleil essentielles.",
    "Calme plat et glacial — la mer ressemble à du verre sombre entre les plaques de banquise.",
    "Des bourrasques de neige balayent la mer; par moments, la visibilité tombe à zéro entre deux éclaircies.",
    "L'air est si froid que les embruns gèlent sur les bastingages. La mer elle-même fume.",
    "De bas nuages gris qui pèsent, l'eau noire et d'un calme huileux.",
    "Un chenal d'eau libre entre les blocs de glace flottants, immobile comme un miroir. On dérive et on écoute.",
    "Le vent se lève, poussant de petites vagues vives — la lisière de glace craque et gémit.",
    "Clair et d'un froid brutal, l'horizon net comme un rasoir. Chaque respiration fume."
  ],
  "generic": [
    "Mer presque immobile ce matin — une surface de verre et un bateau qui tangue à peine.",
    "Un petit clapot qui garde les choses intéressantes; les moutons brillent au soleil.",
    "Couvert et maussade — l'eau ressemble à de l'étain martelé.",
    "Une bonne brise d'est; les houles roulent, longues et paresseuses.",
    "Le brouillard matinal se dissipe vers neuf heures, laissant l'eau vert argenté.",
    "Agité et lumineux — des embruns à la proue, des goélands qui crient au-dessus.",
    "Une lente houle venue de loin, le bateau qui monte et descend comme s'il respirait.",
    "La mer est agitée aujourd'hui — de courtes vagues raides, le pont qui bouge sans arrêt.",
    "L'heure dorée sur l'eau, la mer devenue du cuivre battu.",
    "La pluie qui picote la surface, chaque goutte un petit cratère. L'océan ne s'en formalise pas."
  ]
};
/* v1.8.5-beta: sea conditions follow the expedition's climate zone. */
/* v2.7.15-beta: chum-slick conditions only appear when the expedition
   actually used chum — same rule as pickFieldNote (v1.2.0). The filter
   also applies without a plan, matching pickFieldNote's no-plan case.
   The eligible pool is a separate function so tests can inspect it
   (Mira re-review: a positive chum-plan case, not just negatives). */
function eligibleSeaConditions(regionId, plan) {
  const zone = regionClimate(regionId);
  let arr = SEA_CONDITIONS[zone] || SEA_CONDITIONS.generic;
  const usedChum = plan && plan.method === "attract" && plan.methodOpt === "chum";
  if (!usedChum) arr = arr.filter(l => !/chum slick/i.test(l));
  return arr;
}
function pickSeaCondition(regionId, plan) {
  return pick(eligibleSeaConditions(regionId, plan));
}
/* v0.22.0 Mira review: wildlife sightings are region-appropriate.
   No mantas in the Arctic! */
const FIELD_NOTES = {
  "tropical": [
    "Notes de terrain : aucun requin, mais un groupe de dauphins a surfé sur la vague d'étrave pendant vingt minutes. Ça valait le carburant.",
    "Notes de terrain : une tortue de mer a fait surface à côté du bateau et nous a regardés avec une indifférence ancienne.",
    "Notes de terrain : une raie manta est passée en dessous, immense et sans hâte. Pas un requin, mais personne ne se plaint.",
    "Notes de terrain : trois espèces d'oiseaux marins recensées, et un poisson volant très confus. La science, c'est la science.",
    "Notes de terrain : température de l'eau de 27 °C en surface, visibilité facile de 30 mètres. Des conditions parfaites — juste aucun requin.",
    "Notes de terrain : l'appât est remonté intact, pas même grignoté. Ce qui vit là-dessous n'avait pas faim aujourd'hui.",
    "Notes de terrain : un courant vers l'est a poussé notre nappe de mélange attractif en un long ruban. Une bonne dérive, le mauvais public.",
    "Notes de terrain : du plancton épais dans la colonne d'eau ce soir — toute la mer scintille quand le bateau tangue.",
    "Notes de terrain : une tortue porteuse d'une balise satellite d'un autre projet a été aperçue. On lui a fait signe. Elle ne nous a pas répondu.",
    "Notes de terrain : un rémora s'est collé à la coque pendant une heure. On l'a appelé Kevin. Kevin est parti.",
    "Notes de terrain : un banc de carangues a tourbillonné sous le bateau, éclatant d'argent. Magnifique. Pas des requins.",
    "Notes de terrain : des poissons volants ont glissé sur la surface au crépuscule, poursuivis par quelque chose qu'on n'identifiera jamais.",
    "Notes de terrain : une tortue imbriquée a fait surface trois fois, chaque fois un peu plus près. La curiosité n'est pas qu'une affaire de mammifères.",
    "Notes de terrain : l'eau est si claire qu'on voit l'ombre de la chaîne d'ancre sur le sable, à 20 mètres de profondeur.",
    "Notes de terrain : des frégates suspendues immobiles au-dessus de nous, attendant qu'un poisson volant fasse une erreur.",
    "Notes de terrain : une raie-aigle tachetée est passée devant la proue, battant lentement des ailes comme un cœur.",
    "Notes de terrain : la ponte des coraux ce soir — l'eau est pleine de neige rose. Tout le récif respire."
  ],
  "temperate": [
    "Notes de terrain : aucun requin, mais un groupe de dauphins a surfé sur la vague d'étrave pendant vingt minutes. Ça valait le carburant.",
    "Notes de terrain : température de l'eau stable, appât frais, patience intacte. Les requins ont leur propre horaire.",
    "Notes de terrain : trois espèces d'oiseaux marins recensées, et un poisson volant très confus. La science, c'est la science.",
    "Notes de terrain : un phoque nous a regardés depuis un rocher voisin, peu impressionné par notre absence de requins.",
    "Notes de terrain : température de l'eau de 16 °C, une thermocline à 20 mètres. L'appât reposait juste dessus, intact.",
    "Notes de terrain : le courant a viré vers le nord vers midi et a emporté notre piste d'odeur avec lui. On réajuste.",
    "Notes de terrain : des goélands ont suivi le bateau tout l'avant-midi, pleins d'espoir. On n'a rien partagé. Ils nous ont jugés.",
    "Notes de terrain : une floraison de plancton qui rend l'eau vert doré. Joli, mais ça réduit la visibilité à 10 mètres.",
    "Notes de terrain : un poisson-lune a dérivé devant nous comme une assiette perdue. Énorme. Serein. Pas un requin.",
    "Notes de terrain : appât intact après six heures. Soit les requins sont ailleurs, soit ils se moquent de nous.",
    "Notes de terrain : la pointe de l'aile d'une raie a percé la surface au loin — disparue avant qu'on sorte les jumelles.",
    "Notes de terrain : le chant des baleines à l'hydrophone, faible et lointain. L'océan est occupé, juste pas par des requins.",
    "Notes de terrain : un marsouin commun a fait surface deux fois à bâbord, a roulé, puis a disparu. En un clin d'œil, on rate tout.",
    "Notes de terrain : des frondes de varech qui dérivent, de vraies îles flottantes. Tout un écosystème en mouvement.",
    "Notes de terrain : des cormorans qui sèchent leurs ailes sur la bouée, comme de petites gargouilles.",
    "Notes de terrain : le brouillard est arrivé à midi et a transformé tout l'océan en une pièce grise. On a plus écouté que regardé.",
    "Notes de terrain : un poisson-lune a dérivé devant la poupe, immense et improbable, comme le brouillon de l'océan."
  ],
  "polar": [
    "Notes de terrain : température de l'eau stable, appât frais, patience intacte. Les requins ont leur propre horaire.",
    "Notes de terrain : un iceberg a dérivé devant nous, d'un bleu impossible en dessous. Les requins sont là-dessous, quelque part.",
    "Notes de terrain : trois espèces d'oiseaux marins recensées. Les sternes arctiques semblaient nous plaindre.",
    "Notes de terrain : la nappe de mélange attractif a dérivé fidèlement toute la journée. Parfois, l'océan dit juste non, pas aujourd'hui.",
    "Notes de terrain : température de l'eau de 2 °C. L'appât pend, paresseux, dans le froid — tout bouge plus lentement ici, nous compris.",
    "Notes de terrain : un phoque a fait surface par une fissure dans la glace, a regardé, a disparu. Toute la rencontre a duré quatre secondes.",
    "Notes de terrain : le courant sous la glace coule régulièrement vers l'ouest. Nos instruments sont contents, même si nos filets sont vides.",
    "Notes de terrain : peu de plancton, mais l'eau est incroyablement claire — 40 mètres de visibilité et rien dedans.",
    "Notes de terrain : un ours polaire nous a regardés depuis la lisière de glace pendant une heure. On a gardé une distance respectueuse. Lui, non.",
    "Notes de terrain : la ligne d'appât est remontée couverte de cristaux de glace. L'océan nous dit quelque chose sur nos choix de vie.",
    "Notes de terrain : des clics de narval à l'hydrophone, assez proches pour les sentir. Pas un requin, mais on prend.",
    "Notes de terrain : le ciel s'est mis en aurores boréales à 23 h. Aucun requin, mais honnêtement? Ça valait le coup.",
    "Notes de terrain : de la glace brisée qui tinte contre la coque tout l'avant-midi — les carillons éoliens de l'Arctique.",
    "Notes de terrain : un phoque barbu s'est hissé sur un morceau de banquise et a chanté. Tout le bateau s'est tu pour écouter.",
    "Notes de terrain : l'eau est à -1 °C et pourtant toujours liquide. L'océan refuse de suivre les règles, ici.",
    "Notes de terrain : des mouettes tridactyles qui tournent autour des falaises, des milliers, bruyantes comme un stade.",
    "Notes de terrain : un requin du Groenland pourrait être juste sous nous en ce moment et on ne le saurait jamais. C'est le secret le mieux gardé de l'océan."
  ],
  "generic": [
    "Notes de terrain : température de l'eau stable, appât frais, patience intacte. Les requins ont leur propre horaire.",
    "Notes de terrain : la nappe de mélange attractif a dérivé fidèlement toute la journée. Parfois, l'océan dit juste non, pas aujourd'hui.",
    "Notes de terrain : trois espèces d'oiseaux marins recensées, et un poisson volant très confus. La science, c'est la science.",
    "Notes de terrain : l'appât est remonté intact — pas une morsure. La mer garde ses secrets.",
    "Notes de terrain : courant régulier, visibilité correcte. Toutes les conditions sont bonnes, sauf celle qui compte.",
    "Notes de terrain : du plancton épais qui dérive devant la coque. La base de tout, et aujourd'hui, c'est tout ce qu'on a.",
    "Notes de terrain : quelque chose de grand a bougé profondément sous le bateau, trop profond pour les lumières. On l'a noté comme « intéressant ».",
    "Notes de terrain : un oiseau marin s'est posé sur le bastingage et a refusé de partir pendant une heure. On l'a appelé Superviseur.",
    "Notes de terrain : l'eau est devenue d'un calme de verre au coucher du soleil. Magnifique. Sans requin, mais magnifique.",
    "Notes de terrain : des méduses qui pulsent par centaines, éclairées par les lumières du pont. Les lampes à lave de l'océan.",
    "Notes de terrain : le sondeur a montré un banc d'appâts à 40 mètres, qui se disperse. Quelque chose chasse ici — juste pas aujourd'hui.",
    "Notes de terrain : embruns salés, diesel et varech. L'odeur d'une journée de travail sans rien à montrer que l'odeur.",
    "Notes de terrain : la lune s'est levée sur des vagues calmes et a transformé toute la mer en argent martelé.",
    "Notes de terrain : un albatros solitaire nous a suivis pendant des heures sans un seul battement d'aile. Frimeur.",
    "Notes de terrain : de la bioluminescence dans le sillage ce soir — chaque vague se brise en feu froid.",
    "Notes de terrain : le baromètre baisse et les goélands savent quelque chose qu'on ignore. Ils rentrent tous.",
    "Notes de terrain : onze espèces d'oiseaux marins comptées aujourd'hui. Les requins ont la gloire, les oiseaux font la paperasse."
  ]
};
/* Map regions to climate zones for wildlife notes. */
function regionClimate(regionId) {
  const tropical = ["caribbean", "maldives", "philippines", "galapagos", "south-africa"];
  const polar = ["arctic"];
  if (tropical.includes(regionId)) return "tropical";
  if (polar.includes(regionId)) return "polar";
  return "temperate";
}
/* v1.2.0-beta Mira review: chum-slick observations only appear when the
   expedition actually used chum — otherwise they'd imply a method the
   player never chose. */
function pickFieldNote(regionId, plan) {
  const zone = regionClimate(regionId);
  let notes = FIELD_NOTES[zone] || FIELD_NOTES.generic;
  const usedChum = plan && plan.method === "attract" && plan.methodOpt === "chum";
  if (!usedChum) notes = notes.filter(n => !/chum slick/i.test(n));
  return pick(notes);
}

/* v0.7.0: the day is the expedition. Quiet beats for when the water
   holds its sharks back a while — waiting is most of the job. */
const WAITING_LINES = [
  "Tu regardes le bleu, et tu attends. Honnêtement, c'est l'essentiel du travail.",
  "Rien que de l'eau et de la lumière. Tu t'installes — la patience est toute la technique.",
  "L'appât dérive. Quelque part là-dehors, quelque chose est en train de décider.",
  "Tu scrutes l'horizon jusqu'à sentir tes yeux fatiguer."
];

/* v0.7.0: sightings log — what a watched shark was doing. Pure value,
   no progression attached. */
const SIGHTING_DOINES = [
  "Longe lentement le bord du récif",
  "Tourne tranquillement en pleine eau",
  "Passe sans se presser",
  "Chasse en silence, tout à sa proie",
  "Se laisse porter par le courant",
  "Patrouille sans hâte, sans rien laisser passer",
  "Revient faire un deuxième tour, par curiosité",
  "Se nourrit sans prêter attention au bateau"
];

/* v1.3.0-beta: natural-history observations from "Just watch" encounters.
   Optional flavor only — never a checklist, never an achievement trigger.
   Stored per-species on the tagged record.
   Mira review (v1.3.0): split by habitat so notes stay scientifically
   coherent — a deep-sea shark doesn't rest on a reef, and a reef shark
   doesn't hunt alone in the blue. */

/* Mira review (v1.3.0, round 3): ALL watch notes are now purely
   observational — they describe the environment, other animals, water
   conditions, or static features of the shark. They never assign an action
   to the shark, so they can't contradict the sighting's "doing" line.
   Habitat pools are kept for scientific coherence. */
const WATCH_NOTES_REEF = [
  "une corniche voisine offre un abri parfait",
  "le fond sablonneux en dessous est intact",
  "de petits poissons de récif filent entre les têtes de corail",
  "l'ombre du bateau ondule sur le récif"
];
const WATCH_NOTES_PELAGIC = [
  "un rémora est accroché près de la nageoire dorsale",
  "un banc serré de petits poissons scintille au loin",
  "la lisière du courant se voit comme une ligne de débris flottants",
  "aucun autre requin en vue — juste du bleu dans toutes les directions",
  "des rayons de soleil plongent en biais sous la surface",
  "un banc de petits poissons étincelle d'argent à proximité",
  "la coque du bateau résonne fort dans le bleu silencieux"
];
const WATCH_NOTES_DEEP = [
  "la température de l'eau baisse nettement ici",
  "la nageoire caudale est large et puissante, vue de près",
  "de la neige marine descend comme une pluie lente",
  "des éclairs bioluminescents clignotent dans le noir en dessous",
  "les faisceaux des lampes éclairent des particules en suspension dans l'eau"
];
/* Pick a habitat-appropriate pool from the species' depth bands.
   Reef species -> reef notes; twilight/deep -> deep notes;
   surface-only (open water) -> pelagic notes. */
function pickWatchNote(species) {
  /* Notes are purely observational (see above), so no doing/depth
     filtering is needed — any note suits any encounter in its habitat. */
  const d = (species && species.depths) || [];
  const pool = d.includes("reef") ? WATCH_NOTES_REEF
    : (d.includes("deep") || d.includes("twilight")) ? WATCH_NOTES_DEEP
    : WATCH_NOTES_PELAGIC;
  return pick(pool);
}

/* v1.7.9-beta: tagging any 10 sharks unlocks new waters
   (was v0.7.0: tagging the six original species). */
const REGION_UNLOCK_THREAD = [
  { who: "them", text: "Dix requins. Tu es officiellement un vrai chercheur spécialiste des requins maintenant, tu sais." },
  { who: "me", text: "Dix marqués. L'institut vient de nous donner accès à deux nouvelles régions d'étude." },
  { who: "them", text: "Les Galápagos et l'Afrique du Sud. J'ai lu tout ce que j'ai pu sur ces eaux-là. Pose-moi toutes tes questions. Je suis sérieuse." },
  { who: "me", text: "Je sens que je vais le faire. 🦈" }
];

/* v0.21.0 sharknado: unlock threads for the three new regions. */
const EAST_AUS_UNLOCK_THREAD = [
  { who: "them", text: "Quinze requins! L'institut vient de nous ouvrir l'est de l'Australie." },
  { who: "me", text: "Des requins-tapis tachetés et des requins de Port-Jackson. Des récifs à perte de vue." },
  { who: "them", text: "Je rêve de voir un requin-tapis tacheté depuis toujours. On dirait que quelqu'un a échappé un requin sur un tapis. 😂" }
];
const CALIFORNIA_UNLOCK_THREAD = [
  { who: "them", text: "Vingt-cinq! La côte californienne est ouverte maintenant." },
  { who: "me", text: "Des requins-léopards dans les baies, des requins-cornes sur les récifs." },
  { who: "them", text: "Les requins-cornes ont de petites arcades au-dessus des yeux. Ils ont l'air perpétuellement blasés. Je les adore." }
];
const ARCTIC_UNLOCK_THREAD = [
  { who: "them", text: "Trente-cinq requins. L'institut nous autorise à étudier... l'Arctique?" },
  { who: "me", text: "Des requins du Groenland. De l'eau noire, glaciale. Des animaux qui vivent très longtemps." },
  { who: "them", text: "Sois prudent là-bas. Et reviens avec des histoires. 🩵" }
];

/* World-map + tracking data lives in map-data.js (loaded before this file). */

function mapProj(lat, lon) {
  return [(lon + 180) / 360 * MAP_W, (90 - lat) / 180 * MAP_H];
}

/* Track points -> plottable xy. The first point is the tag site (the
   player's fact); the rest is the illustrative envelope walk. They are
   drawn separately so a tag site far from the documented range doesn't
   imply a migration nobody recorded. */
function mapPoints(t) {
  const pts = (t.track && t.track.points || []).map(p => {
    const c = MAP_COORDS[p.label];
    if (!c) return null;
    const [x, y] = mapProj(c[0], c[1]);
    return { x, y, label: p.label, day: p.day };
  }).filter(Boolean);
  return pts;
}

/* ---------- Tracking map: satellite view (v0.10.0) ----------
   Blue Marble background, viewBox zoom, toggleable currents overlay.
   Track/tag geometry is unchanged — the equirectangular projection
   already matched, so every coordinate keeps working as before. */
let mapZoom = 1, mapCX = MAP_W / 2, mapCY = MAP_H / 2;
/* v0.15.0: no explore mode — zoom is buttons/wheel.
   v1.6.1-beta: pinch-to-zoom restored then reverted (iPad: it didn't engage).
   touch-action follows the zoom level, decided before any touch begins:
   at 1x the page owns one-finger drags (the page scrolls); zoomed in,
   the map owns them (one finger pans). No mid-gesture races, no modes. */
let mapCurrentsOn = false; /* v1.5.2-beta: currents OFF by default */
const MAP_ZOOM_MIN = 1, MAP_ZOOM_MAX = 4;

function mapViewBox() {
  const w = MAP_W / mapZoom, h = MAP_H / mapZoom;
  const x = Math.min(Math.max(mapCX - w / 2, 0), MAP_W - w);
  const y = Math.min(Math.max(mapCY - h / 2, 0), MAP_H - h);
  return { x, y, w, h };
}

/* Split a waypoint list wherever it jumps the antimeridian, so a path
   never streaks across the whole map. */
function splitAntimeridian(pts) {
  const segs = [[pts[0]]];
  for (let i = 1; i < pts.length; i++) {
    if (Math.abs(pts[i][1] - pts[i - 1][1]) > 180) segs.push([]);
    segs[segs.length - 1].push(pts[i]);
  }
  return segs.filter(s => s.length > 1);
}

/* v1.6.11-beta: split track legs at the antimeridian (+/-180) so a
   trans-Pacific leg never draws as a straight line across Asia, Europe and
   the Atlantic — one shark apparently crossing continents. The shark really
   does cross the North Pacific (documented); only the rendering was wrong. */
function splitTrackAntimeridian(ll) {
  if (!ll || ll.length < 2) return [];
  const segs = [];
  let cur = [ll[0]];
  for (let i = 1; i < ll.length; i++) {
    const a = ll[i - 1], b = ll[i];
    const dLon = b[1] - a[1];
    if (Math.abs(dLon) > 180) {
      const eastward = dLon < 0; /* e.g. 150 -> -145 crosses +180 going east */
      const edgeLon = eastward ? 180 : -180;
      const lonB = eastward ? b[1] + 360 : b[1] - 360;
      const t = (edgeLon - a[1]) / (lonB - a[1]);
      const edgeLat = a[0] + t * (b[0] - a[0]);
      cur.push([edgeLat, edgeLon]);
      segs.push(cur);
      cur = [[edgeLat, -edgeLon], b];
    } else {
      cur.push(b);
    }
  }
  segs.push(cur);
  return segs.filter(s => s.length > 1);
}

/* Catmull-Rom -> cubic Bezier smoothing, so currents curve instead of kinking. */
function smoothPath(p) {
  const f = q => q[0].toFixed(1) + "," + q[1].toFixed(1);
  if (p.length < 3) return "M" + p.map(f).join(" L");
  let d = "M" + f(p[0]);
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[Math.max(0, i - 1)], p1 = p[i], p2 = p[i + 1], p3 = p[Math.min(p.length - 1, i + 2)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += " C" + c1x.toFixed(1) + "," + c1y.toFixed(1) + " " + c2x.toFixed(1) + "," + c2y.toFixed(1) + " " + f(p2);
  }
  return d;
}

/* Ocean currents overlay. Warm/cold hues are real oceanography, not decoration.
   Arrowheads only on the final subpath — a current running off the map edge
   gets no arrowhead mid-ocean. Famous-current labels fade in past 1.75x zoom. */
function renderCurrents(z) {
  const list = (typeof CURRENTS === "undefined") ? [] : CURRENTS;
  if (!mapCurrentsOn || !list.length) return "";
  const sw = (2.4 / z).toFixed(2);
  let s = '<defs>'
    + '<marker id="curWarm" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#ff9e5e"/></marker>'
    + '<marker id="curCold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#6ecff5"/></marker></defs>';
  list.forEach(c => {
    const cls = c.warm ? "warm" : "cold", mid = c.warm ? "curWarm" : "curCold";
    const segs = splitAntimeridian(c.pts);
    segs.forEach((seg, i) => {
      const d = smoothPath(seg.map(pt => mapProj(pt[0], pt[1])));
      s += '<path d="' + d + '" class="current ' + cls + '" stroke-width="' + sw + '"'
        + ' stroke-dasharray="' + (8/z).toFixed(1) + ' ' + (5/z).toFixed(1) + '"'
        + (i === segs.length - 1 ? ' marker-end="url(#' + mid + ')"' : "") + "/>";
    });
    if (c.label && z >= 1.75) {
      const mid2 = c.pts[Math.floor(c.pts.length / 2)];
      const lp = mapProj(mid2[0], mid2[1]);
      s += '<text x="' + lp[0].toFixed(1) + '" y="' + (lp[1] - 8).toFixed(1) + '" class="current-label" text-anchor="middle">' + esc(c.name) + "</text>";
    }
  });
  return s;
}

/* v1.8.6-beta: the tracking map shows full track lines ONLY for sharks the
   player explicitly enabled "Track this shark" on (t.mapTrack). Every shark
   still gets its current-location dot; the tag-site pin and track path are
   tracked-sharks-only, so the map stays readable. */
function mapShowsTrack(t) { return !!(t && t.mapTrack); }

/* v1.8.6 follow-up (Mira review): toggling "Track this shark" from a
   map-opened Collection card left the map stale — the route kept its
   previous visual state until some other redraw. Refresh the map when the
   toggle changes while Map is the active tab. The re-render dismisses the
   marker popup; that is the clean exit. Extracted for testability. */
function mapTabActive() {
  const active = document.querySelector(".tab.active");
  return !!(active && active.dataset && active.dataset.tab === "map");
}
function refreshMapIfActive() {
  if (mapTabActive()) renderMap();
}
function setMapTrack(t, on) {
  t.mapTrack = !!on;
  store.save(state.tagged);
  refreshMapIfActive();
}

function renderMap() {
  const wrap = $("worldMapWrap");
  const pop = $("mapPopup");
  const legend = $("mapLegend");
  const ids = Object.keys(state.tagged);
  /* v0.11.0: a focus glide re-renders every frame — hiding the popup here
     would eat it on the first animation frame, right after the tap showed
     it. Skip the hide while a glide is in flight; the popup still hides on
     any later render, exactly as before. */
  if (!mapGlide) pop.classList.add("hidden");
  const z = mapZoom, vb = mapViewBox();
  /* v0.15.0: zoom-driven gesture ownership — 1x scrolls the page,
     zoomed pans the map. Set before any touch begins. */
  wrap.style.touchAction = mapZoom > 1 ? "none" : "pan-y";
  wrap.classList.toggle("exploring", mapZoom > 1);
  /* Blue Marble background (dark rect behind it in case the hotlink fails;
     the URL guard keeps the map working if map-data.js ever fails to load). */
  const bmUrl = (typeof BLUE_MARBLE_URL !== "undefined") ? BLUE_MARBLE_URL : "";
  let svg = `<svg id="worldMapSvg" viewBox="${vb.x.toFixed(1)} ${vb.y.toFixed(1)} ${vb.w.toFixed(1)} ${vb.h.toFixed(1)}" role="img" aria-label="Carte du monde des requins marqués">`
    + `<rect x="0" y="0" width="${MAP_W}" height="${MAP_H}" fill="#0d2f4d"/>`
    + `<image href="${bmUrl}" x="0" y="0" width="${MAP_W}" height="${MAP_H}" preserveAspectRatio="none"/>`;
  svg += renderCurrents(z);
  /* Track strokes and marker sizes are divided by zoom so they stay
     readable instead of going gigantic. */
  const tsw = (2 / z).toFixed(2);
  ids.forEach(sid => {
    const t = state.tagged[sid];
    if (!t.track) t.track = genTrack(sharkById(sid) || { id: "nurse" }, t);
    if (!mapShowsTrack(t)) return; /* v1.8.6-beta: track lines are opt-in */
    const color = SPECIES_COLORS[sid] || "#ffffff";
    const pts = mapPoints(t);
    if (pts.length < 2) return;
    /* Illustrative track: envelope walk only (points[1..]). The tag site
       gets its own pin below — no line implying a migration between them.
       v1.6.11-beta: legs crossing the antimeridian are split at +/-180 and
       run to the map edge, so a trans-Pacific leg never streaks across
       continents the long way round. */
    const ll = (t.track.points || []).slice(1)
      .map(p => MAP_COORDS[p.label]).filter(Boolean);
    const archival = t.track.kind === "archival";
    const dash = archival ? ` stroke-dasharray="${(5 / z).toFixed(1)} ${(4 / z).toFixed(1)}"` : "";
    splitTrackAntimeridian(ll).forEach(seg => {
      const d = seg.map((c, i) => {
        const xy = mapProj(c[0], c[1]);
        return (i ? "L" : "M") + xy[0].toFixed(1) + "," + xy[1].toFixed(1);
      }).join(" ");
      /* v1.8.6 follow-up (Mira review): a neutral halo under each route so
         thin strokes stay legible on the photographic Blue Marble
         background, not just the dark fallback rect. Same dash pattern. */
      const haloW = ((2 / z) + (3 / z)).toFixed(2);
      svg += `<path class="map-track-halo" d="${d}" stroke-width="${haloW}"${dash}/>`;
      svg += `<path class="map-track" d="${d}" stroke="${color}" stroke-width="${tsw}"${dash}/>`;
    });
  });
  /* Markers: hollow pin = tag site (tracked sharks only), filled dot =
     latest position (every shark). Sizes are divided by zoom so they stay
     readable, not gigantic. v1.8.6-beta: untracked sharks show ONLY their
     current-location dot. */
  ids.forEach(sid => {
    const t = state.tagged[sid];
    const s = sharkById(sid);
    const color = SPECIES_COLORS[sid] || "#ffffff";
    const pts = mapPoints(t);
    if (!pts.length) return;
    const label = esc(t.name ? `“${t.name}”` : t.researchId) + " — " + esc(s.name);
    const showTrack = mapShowsTrack(t);
    if (showTrack) {
      const tag = pts[0];
      svg += `<g class="map-marker" data-sid="${sid}"><title>${label} (lieu de marquage)</title>`
        + `<circle cx="${tag.x.toFixed(1)}" cy="${tag.y.toFixed(1)}" r="${(6 / z).toFixed(1)}" fill="none" stroke="${color}" stroke-width="${(2.5 / z).toFixed(2)}"/>`
        + `<circle cx="${tag.x.toFixed(1)}" cy="${tag.y.toFixed(1)}" r="${(1.8 / z).toFixed(1)}" fill="${color}"/></g>`;
    }
    const last = pts[pts.length - 1];
    /* v1.8.6 follow-up (Mira review): explicit one-point rule. Exactly one
       valid position + tracking on → the hollow tag-site pin doubles as the
       latest-position marker (same place; a filled dot on top would hide the
       ring). Exactly one position + tracking off → latest dot only. */
    if (pts.length > 1 || !showTrack) {
      svg += `<g class="map-marker latest" data-sid="${sid}"><title>${label} (dernier point)</title>`
        + `<circle cx="${last.x.toFixed(1)}" cy="${last.y.toFixed(1)}" r="${(8 / z).toFixed(1)}" fill="${color}" stroke="#fff" stroke-width="${(2 / z).toFixed(2)}"/></g>`;
    }
  });
  svg += `</svg>`;
  if (!ids.length) {
    /* Warm empty state over the satellite map — the ocean is there waiting. */
    wrap.innerHTML = svg + `<div class="map-empty"><span class="big">🗺️</span>No tagged sharks yet — tag one and it will appear here, swimming its real waters.</div>`;
    legend.innerHTML = "";
  } else {
    wrap.innerHTML = svg;
    legend.innerHTML = ids.map(sid => {
      const s = sharkById(sid), t = state.tagged[sid];
      return `<span class="map-chip" data-sid="${sid}" role="button" tabindex="0"><span class="dot" style="background:${SPECIES_COLORS[sid] || "#fff"}"></span>${esc(s.name)} · ${esc(t.name || t.researchId)}</span>`;
    }).join("");
  }
  wrap.querySelectorAll(".map-marker").forEach(m => {
    m.addEventListener("click", () => {
      /* v0.10.2: a drag that ends on a marker must not open its popup —
         the gesture code sets this flag past ~10px of movement. */
      if (suppressMarkerClick) { suppressMarkerClick = false; return; }
      showMapPopup(m.dataset.sid);
      mapFocusOn(m.dataset.sid); // v0.11.0: glide the map to the shark
    });
  });
  /* v0.11.0: legend chips focus the map too — same tap, same glide. */
  legend.querySelectorAll(".map-chip").forEach(c => {
    const go = () => { showMapPopup(c.dataset.sid); mapFocusOn(c.dataset.sid); };
    c.addEventListener("click", go);
    c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });
  const tg = $("mapCurrentsToggle");
  if (tg) tg.setAttribute("aria-pressed", mapCurrentsOn ? "true" : "false");
}

function showMapPopup(sid) {
  const s = sharkById(sid), t = state.tagged[sid];
  const pts = mapPoints(t);
  const last = pts.length > 1 ? pts[pts.length - 1] : pts[0];
  const kindNote = t.track.hypothetical
    ? "Scénario de déplacement hypothétique — cet itinéraire illustre un déplacement plausible à longue distance pour une espèce migratrice, pas une reconstitution du trajet de cet individu."
    : t.track.kind === "archival"
    ? "Scénario de déplacement illustratif fondé sur l'habitat. Ces positions ne sont pas des détections réelles de cet individu." + (s.id === "sawshark" ? " (Pop-up satellite archival tags have been deployed on common sawsharks off Tasmania — Burke et al. 2020.)" : "")
    : t.track.kind === "resightings"
      ? "Construit à partir de réobservations lors de relevés sur les récifs, pas d'une balise satellite — ce requin quitte à peine son platier. Tous les points se trouvent dans un rayon d'environ 2 km du lieu de marquage."
      : t.track.kind === "acoustic"
        ? "Itinéraire illustratif fondé sur des détections de balises acoustiques provenant de réseaux de récepteurs sur les récifs — un mode de suivi différent du suivi par satellite."
      : null;
  const pop = $("mapPopup");
  pop.innerHTML = `
    <h4>${t.name ? `“${esc(t.name)}”` : esc(t.researchId)}</h4>
    <p class="latin">${esc(s.name)} · ${esc(t.researchId)}</p>
    <p class="map-meta">📍 Marqué à ${esc(t.location)} · ${esc(t.date)}<br>📡 Dernier point du trajet : ${last ? esc(last.label) : "—"}${t.resightings && t.resightings.length ? `<br>🔁 Re-sighted ${t.resightings.length}×` : ""}</p>
    ${kindNote ? `<p class="map-kind-note">${kindNote}</p>` : ""}
    <button class="secondary-button" type="button" id="mapCardBtn">🗂️ Open collection card</button>
    <button class="secondary-button" type="button" id="mapTrackBtn">📈 View full track</button>`;
  pop.classList.remove("hidden");
  $("mapCardBtn").addEventListener("click", () => openDetail(sid));
  /* v1.8.6-beta: the per-shark track overlay lives here now that the
     collection "Track this shark" button is a map-track toggle. */
  $("mapTrackBtn").addEventListener("click", () => openTrack(sid));
}

/* ---------- State ---------- */

const store = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-collection") || "{}"); }
    catch { return {}; }
  },
  save(data) { localStorage.setItem("tyi-collection", JSON.stringify(data)); }
};

const msgStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-messages") || '{"messages":[],"unread":0,"chatIdx":0}'); }
    catch { return { messages: [], unread: 0, chatIdx: 0 }; }
  },
  save(d) { localStorage.setItem("tyi-messages", JSON.stringify(d)); }
};
const _savedMsgs = msgStore.load();

/* v0.18.0: achievement + stats stores. Stats feed achievement checks
   (regions visited, baits used, re-sights, chum tags, expedition count). */
const statsStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-stats") || "{}"); }
    catch { return {}; }
  },
  save(d) { localStorage.setItem("tyi-stats", JSON.stringify(d)); }
};
const achieveStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-achievements") || "{}"); }
    catch { return {}; }
  },
  save(d) { localStorage.setItem("tyi-achievements", JSON.stringify(d)); }
};

/* v0.7.0: the sightings log — spotted but not tagged. Pure field notes. */
/* v1.5.0-beta Mira review (blocking): persist pending Big Day/species
   celebrations so a reload before trip end doesn't lose them. */
const celebrationStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-pending-celebrations") || "[]"); }
    catch { return []; }
  },
  save(d) { try { localStorage.setItem("tyi-pending-celebrations", JSON.stringify(d)); } catch {} },
  clear() { try { localStorage.removeItem("tyi-pending-celebrations"); } catch {} }
};
const sightStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-sightings") || "[]"); }
    catch { return []; }
  },
  save(d) { localStorage.setItem("tyi-sightings", JSON.stringify(d)); }
};

/* v0.8.0: the expedition logbook — a scientist's notebook. Every trip:
   date, the plan (region/depth/bait/method), encounters and outcome. */
const logStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-logbook") || "[]"); }
    catch { return []; }
  },
  save(d) { localStorage.setItem("tyi-logbook", JSON.stringify(d)); }
};

/* v1.7.9-beta: tagging any 10 sharks unlocks the Galápagos and South
   Africa — new waters earned, not given
   (was v0.7.0: the six original species, via a removed species-list const). */
/* v0.20.0: the pinned shark — "currently researching". One shark at a time,
   persisted across sessions. A focus, not a filter. */
const pinStore = {
  load() {
    try { return localStorage.getItem("tyi-pinned") || null; }
    catch { return null; }
  },
  save(id) {
    try {
      if (id) localStorage.setItem("tyi-pinned", id);
      else localStorage.removeItem("tyi-pinned");
    } catch {}
  }
};
/* v1.4.0-beta: secret tag-along facts. Tracks which facts have been unlocked
   per species: {speciesId: [factIndex, ...]}. Persists through export/import
   via RESET_KEYS. */
const factStore = {
  load() {
    try { return JSON.parse(localStorage.getItem("tyi-facts") || "{}"); }
    catch { return {}; }
  },
  save(d) {
    try { localStorage.setItem("tyi-facts", JSON.stringify(d)); } catch {}
  }
};
/* v1.0.3-beta: collapsible pinned explainer. Tracks whether the player has
   ever pinned a shark — after the first pin, the empty pinned card shows a
   single line ("Pinned sharks appear here.") instead of the full explanation. */
const pinHistoryStore = {
  load() {
    try { return localStorage.getItem("tyi-pinned-before") === "1"; }
    catch { return false; }
  },
  save() {
    try { localStorage.setItem("tyi-pinned-before", "1"); } catch {}
  }
};

/* v0.6.0: threads are {ts, msgs}. Migrate legacy bare-array threads. */
function normThread(t) {
  if (Array.isArray(t)) return { ts: 0, msgs: t };
  return t;
}

const state = {
  tagged: store.load(),   // id -> {name, researchId, length, sex, location, date, sarahEgg, track}
  failures: 0,
  chatIdx: _savedMsgs.chatIdx || 0,
  /* v0.12.0: contextual hints — the region of the player's most recent
     expedition, so Sarah's hints stay specific to what they're actually
     searching for instead of spamming the whole roster. */
  lastRegion: _savedMsgs.lastRegion || null,
  chatSeen: _savedMsgs.chatSeen || {},
  messages: (_savedMsgs.messages || []).map(normThread),
  unread: _savedMsgs.unread || 0,
  pendingTag: null,       // species object awaiting naming
  sightings: sightStore.load(), // v0.7.0: watched-but-not-tagged log
  logbook: logStore.load(),   // v0.8.0: expedition logbook
  regionsUnlocked: false, // v1.7.9-beta: 10 tagged -> Galápagos + South Africa (was: original six)
  pendingWin: false,      // v0.7.0: final shark tagged mid-trip; ceremony at day's end
  currentPlan: null,      // the trip's region/depth/bait/method (method added v0.8.0 as scent, reworked v0.9.0)
  taggedThisTrip: false,  // v0.7.0: skip the random post-trip chat after a tag
  resightedThisTrip: false, // v0.8.0: same skip after a re-sighting celebration
  followedThisTrip: false,  // v1.4.0-beta: skip random post-trip chat after a tag-along follow
  encounterDone: null,    // v0.7.0: callback that resumes the trip after watch/tag
  /* v0.17.1: Ask Sarah offer persists in the message store — Sarah's saved
     thread promises "pick one below", so the panel must survive a reload. */
  sarahAdviceOffered: !!_savedMsgs.sarahAdviceOffered,
  /* v1.4.19-beta: Big Day no-repeat bags — per-tier shuffled indices. */
  bigDayBags: _savedMsgs.bigDayBags || {},
  /* v1.6.10-beta: throttle single-shark congratulations — expedition number
     of Sarah's last single-shark cheer (null until the first one). */
  lastSingleCheerExp: (typeof _savedMsgs.lastSingleCheerExp === "number") ? _savedMsgs.lastSingleCheerExp : null,
  /* v1.8.3-beta: Sarah throttle — timestamp (ms) of the last Sarah
     message sent, any kind. Routine messages within 5 min of it are
     dropped, not queued. Persists so a reload doesn't reset the window. */
  lastSarahMsgAt: (typeof _savedMsgs.lastSarahMsgAt === "number") ? _savedMsgs.lastSarahMsgAt : null,
  /* v2.5.6-beta: per-individual mention clock — { speciesId: {at, w} }.
     Sarah spaces mentions of the SAME individual shark at least 15
     minutes apart; w is the mention's weight (check-in 0, re-sighting
     = that shark's sighting count). A heavier mention supersedes a
     lighter one inside the window. */
  sharkMentions: _savedMsgs.sharkMentions || {},
  /* v0.18.0: stats feed achievement checks; achievements persist unlocked IDs. */
  stats: Object.assign(
    { regionsVisited: [], baitsUsed: [], resights: 0, chumTags: 0, expeditions: 0,
      depthsTagged: [], depthsVisited: [], methodsUsed: [] },
    statsStore.load()
  ),
  achievements: achieveStore.load(), // id -> timestamp
  bruceChainComplete: false, // v0.18.0: the Bruce chain isn't built yet
  won: (() => { try { return localStorage.getItem("tyi-won") === "1"; } catch { return false; } })(),
  /* v2.5.6-beta: win date for the Master Shark Tagger certificate.
     Recorded in doWin(); older saves fall back to the Fin-ished
     achievement timestamp, then to first certificate view. */
  wonAt: (() => { try { return parseInt(localStorage.getItem("tyi-won-at") || "0", 10) || null; } catch { return null; } })(),
  /* v2.5.6-beta: the name the player writes on their certificate. */
  certName: (() => { try { return localStorage.getItem("tyi-cert-name") || ""; } catch { return ""; } })(),
  archiveUnlocked: (() => { try { return localStorage.getItem("tyi-archive") === "1"; } catch { return false; } })(),
  pinned: pinStore.load(), // v0.20.0: "currently researching" shark id, or null
  hasPinnedBefore: pinHistoryStore.load(), // v1.0.3-beta: player has pinned at least once
  unlockedFacts: factStore.load(), // v1.4.0-beta: {speciesId: [factIdx, ...]}
  /* v1.5.3-beta: reunion reactions — one-time Sarah thread per species. */
  reunionReacted: (() => { try { return JSON.parse(localStorage.getItem("tyi-reunion-reacted") || "{}"); } catch { return {}; } })(),
  /* v0.23.0: Bruce easter egg chain state: { stage, sharkId, lastAdvance } or null */
  bruceEgg: (() => { try { return JSON.parse(localStorage.getItem("tyi-bruce") || "null"); } catch { return null; } })(),
  bruceChainComplete: (() => { try { return localStorage.getItem("tyi-bruce-done") === "1"; } catch { return false; } })(),
  pendingTagAlong: null, // v1.4.0-beta: species id to focus on map after tag-along trip
  deferredTagAlong: null, // v1.4.0-beta: tag-along deferred until win ceremony acknowledged
  /* v1.7.0-beta: derpy award — win-unlocked completion reward. derpyUnlocked
     persists the unlock; derpyMode is the player's toggle. */
  derpyUnlocked: (() => { try { return localStorage.getItem("tyi-derpy-unlocked") === "1"; } catch { return false; } })(),
  derpyMode: (() => { try { return localStorage.getItem("tyi-derpy-mode") === "1"; } catch { return false; } })()
};
/* v0.18.0 review: migrate pre-achievement saves — seed stats from the logbook
   and existing tags so established players get credit for their history. */
(function migrateStats() {
  const s = state.stats;
  let changed = false;
  const log = state.logbook || [];
  if (!(s.expeditions > 0) && log.length > 0) {
    s.expeditions = log.length; changed = true;
  }
  log.forEach(t => {
    if (t.region && !s.regionsVisited.includes(t.region)) { s.regionsVisited.push(t.region); changed = true; }
    if (t.bait && !s.baitsUsed.includes(t.bait)) { s.baitsUsed.push(t.bait); changed = true; }
    /* v2.7.14-beta: backfill depths visited so established players get
       credit for past dives (same pattern as regions/baits). */
    if (t.depth && !(s.depthsVisited || []).includes(t.depth)) {
      (s.depthsVisited = s.depthsVisited || []).push(t.depth); changed = true;
    }
  });
  let resights = 0;
  Object.values(state.tagged || {}).forEach(t => { resights += (t.resightings || []).length; });
  if (!(s.resights > 0) && resights > 0) { s.resights = resights; changed = true; }
  /* v0.18.0 review 2nd pass: backfill "Something in the Water" — a log entry
     with attract+chum and a tagged encounter of a chum-valid species counts. */
  log.forEach(t => {
    if (t.methodOpt && t.methodOpt !== "none" && !(s.methodsUsed || []).includes(t.methodOpt)) {
      s.methodsUsed.push(t.methodOpt); changed = true;
    }
    const taggedHere = (t.encounters || []).some(e => e.result === "tagged");
    if (taggedHere && t.depth && !(s.depthsTagged || []).includes(t.depth)) {
      s.depthsTagged.push(t.depth); changed = true;
    }
  });
  if (!(s.chumTags > 0)) {
    const chumEarned = log.some(t =>
      t.method === "attract" && t.methodOpt === "chum" &&
      (t.encounters || []).some(e => {
        if (e.result !== "tagged") return false;
        const sp = SHARKS.find(x => x.id === e.speciesId);
        return sp && sp.methods && sp.methods.attract && sp.methods.attract.includes("chum");
      })
    );
    if (chumEarned) { s.chumTags = 1; changed = true; }
  }
  if (changed) saveStats();
})();
function saveMsgs() {
  msgStore.save({ messages: state.messages, unread: state.unread, chatIdx: state.chatIdx,
    lastRegion: state.lastRegion, chatSeen: state.chatSeen,
    sarahAdviceOffered: state.sarahAdviceOffered,
    bigDayBags: state.bigDayBags,
    lastSarahMsgAt: state.lastSarahMsgAt,
    sharkMentions: state.sharkMentions,
    lastSingleCheerExp: state.lastSingleCheerExp });
}
/* Every new thread gets a timestamp for the Phone tab.
   v1.4.0: if the Phone panel is already open, the new thread renders
   immediately — count it as read instead of leaving a stale badge.
   v1.8.3-beta: Sarah throttle — at most one ROUTINE message per 5 min.
   `kind` is "routine" for ambient chatter (post-expedition check-ins /
   random chats), "special" for scripted event threads, "ask" for
   player-initiated Ask Sarah. Special + ask always go through;
   routine messages inside the window are DROPPED, not queued.
   The default kind is "special" (fail-open) so unclassified call
   sites keep working. Every SENT thread — any kind — updates
   lastSarahMsgAt. Returns true if sent, false if dropped. */
const SARAH_THROTTLE_MS = 5 * 60 * 1000;
/* v2.5.6-beta (Avery): per-individual mention cooldown. Sarah never
   mentions the same individual shark twice inside 15 minutes — unless
   the new mention outweighs the last one. Weights: a check-in (Sarah
   "just thinking about" a shark) is 0 and always yields; an actual
   re-sighting weighs its sighting count, so a 2nd sighting supersedes
   a 1st, a 3rd supersedes a 2nd, and any real sighting supersedes a
   check-in. */
const SHARK_MENTION_MS = 15 * 60 * 1000;
function sharkMentionBlocked(speciesId, weight) {
  const m = (state.sharkMentions || {})[speciesId];
  if (!m) return false;
  const age = Date.now() - m.at;
  return age >= 0 && age < SHARK_MENTION_MS && weight <= m.w;
}
function noteSharkMention(speciesId, weight) {
  state.sharkMentions = state.sharkMentions || {};
  state.sharkMentions[speciesId] = { at: Date.now(), w: weight };
  saveMsgs();
}
/* v1.8.3-beta Mira fix: throttle predicate shared by pushThread and the
   ambient branch of afterExpedition — chatSeen must only advance for chats
   actually sent, so the ambient gate runs BEFORE pickChat() selects one. */
function routineThrottled() {
  const last = state.lastSarahMsgAt;
  const age = (typeof last === "number") ? Date.now() - last : Infinity;
  return age >= 0 && age < SARAH_THROTTLE_MS;
}
function pushThread(msgs, kind) {
  if (kind === "routine" && routineThrottled()) return false;
  state.messages.push({ ts: Date.now(), msgs });
  state.lastSarahMsgAt = Date.now();
  const phoneTab = document.querySelector('.tab[data-tab="phone"]');
  if (!(phoneTab && phoneTab.classList.contains('active'))) state.unread += 1;
  saveMsgs();
  updateMsgBadge();
  renderMessages();
  return true;
}
function fmtTime(ts) {
  return new Date(ts).toLocaleString("fr-CA",
    { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

/* Research IDs: every tagged shark always gets one, like real field science.
   Format: SPECIESCODE-YEAR-SEQ, e.g. NS-2026-001. Nickname is a separate,
   optional layer on top — a shark can have both, never "Unnamed". */
const idSeqStore = {
  load() {
    try { return parseInt(localStorage.getItem("tyi-idseq") || "0", 10) || 0; }
    catch { return 0; }
  },
  save(n) { localStorage.setItem("tyi-idseq", String(n)); }
};
let idSeq = idSeqStore.load();
function mintResearchId(species) {
  idSeq += 1;
  idSeqStore.save(idSeq);
  const year = new Date().getFullYear();
  return `${species.code}-${year}-${String(idSeq).padStart(3, "0")}`;
}
/* Migrate older saves: any tagged shark without an ID gets one now.
   (Runs after helpers are defined — see below.) */
function migrateIds() {
  Object.entries(state.tagged).forEach(([sid, t]) => {
    if (!t.researchId) {
      t.researchId = mintResearchId(sharkById(sid) || { code: "XX" });
    }
  });
  store.save(state.tagged);
}
/* Older saves predate tracking: give every tagged shark a track. */
function migrateTracks() {
  let changed = false;
  Object.entries(state.tagged).forEach(([sid, t]) => {
    /* v0.21.0 Mira final: regenerate tracks that predate the tag-anchor fix.
       Old tracks start at generic regional centers and teleport to the envelope.
       v0.21.0 Mira re-review: preserve player re-sighting points. */
    if (!t.track || t.track.v !== 2) {
      /* v0.21.0 Mira: legacy tracks lack the resighting flag. Reconstruct
         from t.resightings records if no flagged points exist. */
      let resightPoints = (t.track && t.track.points || []).filter(p => p.resighting);
      const resightRecords = t.resightings || [];
      if (resightPoints.length === 0 && resightRecords.length > 0 && t.track && t.track.points) {
        // Legacy: reconstruct from resightings records. Old points lack the flag,
        // so we treat points beyond the typical generated count as re-sightings.
        // Each resighting record corresponds to a point appended after generation.
        const genCount = t.track.points.length - resightRecords.length;
        if (genCount >= 0 && resightRecords.length > 0) {
          resightPoints = t.track.points.slice(genCount).map((p) => ({
            label: p.label, day: p.day, km: p.km, resighting: true
          }));
        }
      }
      t.track = genTrack(sharkById(sid) || { id: "nurse" }, t);
      t.track.v = 2;
      const species = sharkById(sid);
      /* v2.0.0-beta (Mira review): region-aware anchor for reconstructed points. */
      const env = (typeof envelopeFor !== "undefined" && envelopeFor(species.id, t.region)) || null;
      resightPoints.forEach((rp) => {
        const anchorLabel = (env && env.tagAnchor) || rp.label;
        const last = t.track.points[t.track.points.length - 1];
        const lastCoord = MAP_COORDS[last.label];
        const newCoord = MAP_COORDS[anchorLabel];
        let km = 0;
        if (lastCoord && newCoord && typeof haversineKm === "function") {
          km = Math.round(haversineKm(lastCoord, newCoord) * 10) / 10;
        }
        t.track.points.push({ label: anchorLabel, day: rp.day, km, resighting: true });
        t.track.totalKm = Math.round((t.track.totalKm + km) * 10) / 10;
        // Ensure day count agrees with final point (legacy points may be newer)
        if (rp.day > t.track.days) t.track.days = rp.day;
      });
      if (resightRecords.length) t.resightings = resightRecords;
      changed = true;
    }
  });
  if (changed) store.save(state.tagged);
}

/* v1.8.7-beta: re-sightings no longer pollute the movement track.
   Strip re-sighting-flagged points from existing tracks so the graph
   shows travel only (Avery: the flat tail made it look "like the shark
   stopped travelling"). Re-sighting records stay in t.resightings — the
   log is untouched. totalKm and days are recomputed from the remaining
   travel points. Points without the flag are left alone: no invented
   identity, no guessing. */
function migrateTravelTracks() {
  let changed = false;
  Object.entries(state.tagged).forEach(([sid, t]) => {
    if (!t.track || !Array.isArray(t.track.points)) return;
    if (!t.track.points.some(p => p.resighting)) return;
    const travel = t.track.points.filter(p => !p.resighting);
    /* The tag anchor (point 0) is never a re-sighting; keep at least it. */
    const kept = travel.length ? travel : t.track.points.slice(0, 1);
    t.track.points = kept;
    t.track.totalKm = Math.round(kept.reduce((a, p) => a + (p.km || 0), 0) * 10) / 10;
    t.track.days = kept.length ? kept[kept.length - 1].day : 0;
    changed = true;
  });
  if (changed) store.save(state.tagged);
}

/* v2.0.0-beta (Mira review): backfill the tag region key on pre-v2.0.0
   records from their saved location name. Tracks are NOT regenerated —
   existing tracks were built with the species envelope, which is exactly
   what envelopeFor() still selects for these single-region saves, so this
   preserves them byte-for-byte while making old records region-aware for
   any future regeneration. */
function migrateTagRegions() {
  const nameToKey = {};
  Object.keys(REGIONS).forEach(k => { nameToKey[REGIONS[k].name] = k; });
  let changed = false;
  Object.values(state.tagged).forEach(t => {
    if (!t || t.region || !t.location) return;
    const key = nameToKey[t.location];
    if (key) { t.region = key; changed = true; }
  });
  if (changed) store.save(state.tagged);
}

const $ = (id) => document.getElementById(id);
const esc = (str) => String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const sharkById = (id) => SHARKS.find(s => s.id === id);
/* v1.5.3-beta: reunion odds by species ecology. These are game-balance numbers,
   NOT scientific re-sighting probabilities. Resident/site-faithful sharks are
   most likely to be recognized; wide-ranging migrants rarely are.
   v1.7.23-beta: halved across the board (Avery: 4 re-sightings of one nurse
   shark in 4 days felt spammy, not special). No time gating — the same odds
   apply on every encounter (Avery: we're not time-gating the game). */
const REUNION_ODDS = { resident: 0.25, coastal: 0.125, migratory: 0.05 };
const ECOLOGY_TIER = {
  /* Resident/site-faithful (17) — reef residents, bottom-dwellers, site-attached */
  nurse: "resident", sandtiger: "resident", galapagos: "resident",
  epaulette: "resident", lemon: "resident", blacktip: "resident",
  whitetip: "resident", zebra: "resident", bonnethead: "resident",
  greyreef: "resident", caribbean: "resident", wobbegong: "resident",
  leopard: "resident", horn: "resident", portjackson: "resident",
  angelshark: "resident", catshark: "resident",
  /* Coastal/seasonal (14) — patrol coasts, seasonal aggregations */
  tiger: "coastal", hammerhead: "coastal", basking: "coastal",
  porbeagle: "coastal", bronze: "coastal", scalloped: "coastal",
  smooth: "coastal", bull: "coastal", sandbar: "coastal",
  salmon: "coastal", dusky: "coastal", silvertip: "coastal",
  spinner: "coastal", spinydogfish: "coastal",
  /* Migratory/wide-ranging (19) — open ocean, deep water, vast ranges */
  thresher: "migratory", whale: "migratory", goblin: "migratory",
  greatwhite: "migratory", mako: "migratory", blue: "migratory",
  silky: "migratory", oceanic: "migratory", sevengill: "migratory",
  frilled: "migratory", megamouth: "migratory", sawshark: "migratory",
  greenland: "migratory", cookiecutter: "migratory", sixgill: "migratory",
  velvetbelly: "migratory", dwarflantern: "migratory", kitefin: "migratory",
  pacificsleeper: "migratory"
};
const untagged = () => SHARKS.filter(s => !state.tagged[s.id]);
/* Migrations run once at boot — see the boot section below. */

/* ---------- Tabs (each tab remembers its scroll position) ---------- */

const tabScroll = {};
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return; /* v1.5.11: locked Archive tab is unclickable */
    /* v2.6.0: the tour spotlights tabs as scenery, not controls —
       taps on the bar while the tour is open must not navigate. */
    if (tourOpenNow) return;
    /* v2.5.11-beta: leaving the Archive stops its clips (pauseVideosIn). */
    if (btn.dataset.tab !== "archive") pauseVideosIn();
    const current = document.querySelector(".tab.active");
    if (current) tabScroll[current.dataset.tab] = window.scrollY;
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".panel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    $("tab-" + btn.dataset.tab).classList.add("active");
    if (btn.dataset.tab === "map") renderMap(); // v0.9.0: tracking map renders on open
    if (btn.dataset.tab === "expedition") renderExpeditionPin(); // v0.20.0: pinned shark line
    if (btn.dataset.tab in tabScroll) window.scrollTo(0, tabScroll[btn.dataset.tab]);
    /* v0.24.0: clear the Archive new-photo badge on visit. */
    if (btn.dataset.tab === "archive") {
      const badge = btn.querySelector(".tab-badge");
      if (badge) badge.classList.add("hidden");
    }
    if (btn.dataset.tab === "phone") {
      /* v1.5.25-beta (Mira review): defensive sync — Ask Sarah always reflects
         the current pin when the Phone tab opens, never a stale one. */
      renderSarahAsk();
      /* v0.12.0: like a real phone — the conversation opens pinned to the
         newest message. renderMessages' own scroll can't do this: it runs
         while the tab is hidden (display:none), where scrollTop has no
         effect, so the pin has to happen after the panel is visible. */
      renderMessages();
      const list = $("messagesList");
      if (list) list.scrollTop = list.scrollHeight;
      if (state.unread > 0) {
        state.unread = 0;
        saveMsgs();
        updateMsgBadge();
      }
    }
  });
});
function goTab(name) {
  document.querySelector(`.tab[data-tab="${name}"]`).click();
}

/* ---------- Research: a field-guide database ----------
   v0.7.0: the guide is a compact roster list; each row expands into the
   full entry. Hard rule stands: NO pictures of the actual shark here —
   text only. The real face is earned at tagging. */
/* ---------- Field guide database (v0.19.0) ----------
   Search + stacked filters. Filters narrow the notebook; they never solve
   the expedition — matching is on the shark's own data, nothing is revealed.
   Filter state is session-only. */
const guideFilters = {
  q: "",
  region: new Set(),
  depth: new Set(),
  method: new Set(),
  bait: new Set(),
  tagged: "all" // "all" | "tagged" | "untagged"
};
function baitList(s) {
  return Array.isArray(s.combo.bait) ? s.combo.bait : [s.combo.bait];
}
/* v2.0.0-beta: species can now be found in more than one region.
   combo.regions (array) is the canonical form; combo.region (single
   string) is the legacy form. regionList() normalizes both, mirroring
   the baitList() pattern from v0.20.0. */
function regionList(s) {
  if (!s || !s.combo) return [];
  if (Array.isArray(s.combo.regions)) return s.combo.regions;
  if (s.combo.region) return [s.combo.region];
  return [];
}
function regionNames(s) {
  return regionList(s).map(r => (REGIONS[r] || {}).name || r);
}
/* v1.7.32-beta: the Research method filter works at the top-level
   method (attract / aggregation) — the same two options the Expedition
   Method dropdown offers. Sub-opts (chum / boat / plane / network)
   stay in METHODS + species data for expedition boost + logbook
   rendering, but the Research filter no longer lists them. */
function guideMatches(s) {
  const f = guideFilters;
  if (f.q) {
    const q = f.q.toLowerCase();
    if (!s.name.toLowerCase().includes(q) && !s.latin.toLowerCase().includes(q)) return false;
  }
  if (f.region.size && !regionList(s).some(r => f.region.has(r))) return false;
  if (f.depth.size && !(s.depths || []).some(d => f.depth.has(d))) return false;
  if (f.method.size && !Object.keys(s.methods || {}).some(m => f.method.has(m))) return false;
  if (f.bait.size && !baitList(s).some(b => f.bait.has(b))) return false;
  if (f.tagged === "tagged" && !state.tagged[s.id]) return false;
  if (f.tagged === "untagged" && state.tagged[s.id]) return false;
  return true;
}
function activeFilterCount() {
  const f = guideFilters;
  return f.region.size + f.depth.size + f.method.size + f.bait.size +
    (f.tagged !== "all" ? 1 : 0) + (f.q ? 1 : 0);
}
function buildFilterChips() {
  const mk = (elId, items, set) => {
    const row = $(elId);
    if (!row) return;
    row.innerHTML = "";
    items.forEach(([id, label]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = label;
      b.setAttribute("aria-pressed", String(set.has(id)));
      b.addEventListener("click", () => {
        if (set.has(id)) set.delete(id); else set.add(id);
        renderResearch();
      });
      row.appendChild(b);
    });
  };
  mk("filterRegion", Object.entries(REGIONS).map(([id, r]) =>
    [id, r.locked ? `🔒 ${r.name}` : r.name]), guideFilters.region);
  mk("filterDepth", Object.entries(DEPTHS).map(([id, d]) => [id, d.name]), guideFilters.depth);
  /* v1.7.32-beta: method chips are the two top-level METHODS — the
     same options the Expedition Method dropdown offers. */
  mk("filterMethod", Object.entries(METHODS).map(([id, m]) => [id, m.name]), guideFilters.method);
  mk("filterBait", Object.entries(BAITS).map(([id, label]) => [id, label]), guideFilters.bait);
  // tagged status: single-select chips
  const tRow = $("filterTagged");
  if (tRow) {
    tRow.innerHTML = "";
    [["all", "Tous"], ["tagged", "Marqués"], ["untagged", "Non marqués"]].forEach(([id, label]) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chip";
      b.textContent = label;
      b.setAttribute("aria-pressed", String(guideFilters.tagged === id));
      b.addEventListener("click", () => { guideFilters.tagged = id; renderResearch(); });
      tRow.appendChild(b);
    });
  }
}
function renderActiveChips() {
  const wrap = $("activeChips");
  if (!wrap) return;
  wrap.innerHTML = "";
  const f = guideFilters;
  const addChip = (label, clear) => {
    const c = document.createElement("span");
    c.className = "chip-active";
    c.innerHTML = `<span>${esc(label)}</span>`;
    const x = document.createElement("button");
    x.type = "button";
    x.className = "chip-remove";
    x.setAttribute("aria-label", `Remove filter: ${label}`);
    x.textContent = "×";
    x.addEventListener("click", () => { clear(); renderResearch(); });
    c.appendChild(x);
    wrap.appendChild(c);
  };
  if (f.q) addChip(`“${f.q}”`, () => { f.q = ""; const s = $("guideSearch"); if (s) s.value = ""; });
  f.region.forEach(id => addChip(REGIONS[id] ? REGIONS[id].name : id, () => f.region.delete(id)));
  f.depth.forEach(id => addChip(DEPTHS[id] ? DEPTHS[id].name : id, () => f.depth.delete(id)));
  f.method.forEach(id => {
    addChip(METHODS[id] ? METHODS[id].name : id, () => f.method.delete(id));
  });
  f.bait.forEach(id => addChip(BAITS[id] || id, () => f.bait.delete(id)));
  if (f.tagged !== "all") addChip(f.tagged === "tagged" ? "Marqués" : "Non marqués",
    () => { f.tagged = "all"; });
}
function clearGuideFilters() {
  guideFilters.q = "";
  guideFilters.region.clear();
  guideFilters.depth.clear();
  guideFilters.method.clear();
  guideFilters.bait.clear();
  guideFilters.tagged = "all";
  const s = $("guideSearch");
  if (s) s.value = "";
  renderResearch();
}
/* v0.20.0: pin one shark as "currently researching". Tapping the pin on a
   pinned shark unpins it. One pin at a time — a focus, not a collection. */
function togglePin(id) {
  /* v1.5.25-beta: pinning must not move the page. The list re-render below used
     to make the page jump/scroll on tap — save and restore the scroll position. */
  const keepY = window.scrollY;
  state.pinned = (state.pinned === id) ? null : id;
  if (state.pinned) { // v1.0.3-beta: remember the first pin to collapse the explainer later
    state.hasPinnedBefore = true;
    pinHistoryStore.save();
  }
  pinStore.save(state.pinned);
  renderResearch();
  renderExpeditionPin();
  renderPinHint(); // v0.22.0
  renderSarahAsk(); // v1.5.25-beta (Mira review): Ask Sarah must reflect the new pin immediately
  window.scrollTo(0, keepY);
}
/* v0.20.0: jump to the pinned shark's field-guide entry. Mira review fix -
   clears any filters hiding the shark first, so Jump never silently fails. */

/* v1.4.15-beta: highlight key research clues in bold (same font/size).
   Bolds location, diet, and depth cues — never the expedition answers. */
function highlightClues(s) {
  let text = s.research || "";
  // Take the first two sentences for the preview
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  text = sentences.slice(0, 2).join(" ").trim();
  // Bold each region name
  for (const regionName of regionNames(s)) {
    if (!regionName) continue;
    const re = new RegExp(`(${regionName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    text = text.replace(re, "<strong>$1</strong>");
  }
  // Bold diet keywords
  const dietWords = ["plankton", "krill", "squid", "crabs", "lobster", "fish", "seals", "rays", "urchins", "shellfish"];
  for (const w of dietWords) {
    const re = new RegExp(`\\b(${w})\\b`, "gi");
    text = text.replace(re, "<strong>$1</strong>");
  }
  return text;
}
/* v2.7.9-beta fix (Mira re-review): species-aware clue emphasis, v2.
   Bait emphasis comes ONLY from the species' own baitList(s) via
   BAIT_SYNONYMS, plus SPECIES_SYNONYMS for the two reviewed cases
   where the honest clue word is species-specific (pacificsleeper
   pollock for schooling-fish; silvertip cephalopods for squid) —
   never generalized to other species. Region emphasis comes from
   REGION_ALIASES (the species' own regions), covering prose wording,
   not just REGIONS display labels. Depth emphasis is DEPTH_EVIDENCE
   phrases plus metre numbers.
   Metre numbers: decimal-safe, with a protected start and no
   lookbehind (older WebKit-safe) — a number never bolds mid-number,
   so "1.4 metres" can only ever match whole. Known body lengths in
   LENGTH_PHRASES are masked before bolding and restored after, so
   lengths stay unbolded while depth cues bold (verified by
   enumeration: every decimal metre phrase in the 50 texts is a body
   length; every depth phrase is an integer). Single-pass term
   bolding (longest first, no nested <strong>); number bolding is a
   separate pass that cannot nest inside term bolds (terms contain
   no digits). Same font/size, just bold. */
const BAIT_SYNONYMS = {
  "squid": ["squid"],
  "crustaceans": ["crustaceans", "crabs", "crab", "shrimp", "lobster"],
  "ray": ["stingrays", "rays", "ray"],
  "tuna": ["large oily fish", "oily fish", "tuna", "herring", "mackerel"],
  "schooling-fish": ["schools of small reef fish", "schools of smaller fish", "schools of reef fish", "school of reef fish", "schools of fish", "schooling fishes", "schooling fish", "small schooling fish", "sardines", "sardine", "anchovies", "anchovy", "herring", "mackerel"],
  "urchins": ["sea urchins", "urchins", "shellfish"],
  "plankton": ["plankton", "krill"]
};
const SPECIES_SYNONYMS = {
  "pacificsleeper": ["pollock"],
  "silvertip": ["cephalopods"]
};
const REGION_ALIASES = {
  "caribbean": ["Mer des Caraïbes", "Caribbean"],
  "north-carolina": ["Outer Banks, Caroline du Nord", "Outer Banks", "North Carolina", "US east coast"],
  "philippines": ["Philippines", "Philippine"],
  "maldives": ["Maldives", "Maldivian"],
  "japan": ["Baie de Sagami, Japon", "Sagami Bay", "Japan"],
  "open-atlantic": ["Atlantique ouvert"],
  "cornwall": ["Cornouailles, Royaume-Uni", "Cornwall", "southwest Britain"],
  "galapagos": ["Îles Galápagos", "Galápagos", "Galapagos"],
  "south-africa": ["Afrique du Sud"],
  "east-australia": ["Est de l'Australie", "Australia's east coast", "southern and eastern Australia"],
  "california": ["Côte de la Californie", "California"],
  "arctic": ["Eaux arctiques", "Arctic"],
  "papua-new-guinea": ["Papouasie-Nouvelle-Guinée", "PNG"]
};
const DEPTH_EVIDENCE = [
  "twilight zone", "continental shelf", "continental slope",
  "near the surface", "just under the surface", "hundreds of metres",
  "reef flats", "shallow reefs", "shallow reef crevices", "reef edges",
  "reef ledges", "rocky reefs", "shallow coastal waters",
  "warm shallow water", "coastlines and estuaries", "surf zone",
  "outer shelf", "upper continental shelf", "shallow outer slopes",
  "deep by day", "mid-water", "surface waters", "kelp beds",
  "kelp and rocky reefs", "deep tropical", "patch of reef",
  "sunlit shallows", "surface down through the reefs"
];
const LENGTH_PHRASES = [
  "1.9 to 2.4 metres", "1.2 to 1.5 metres", "1.65 metres", "2.4 metres",
  "5.5 metres", "1.4 metres", "6 metres", "4.8 metres", "1.6 metres",
  "4.3 metres"
];
function highlightResearchClues(s, text) {
  text = text || s.research || "";
  const esc = t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const masked = [];
  let work = text;
  LENGTH_PHRASES.forEach(phrase => {
    const re = new RegExp("\\b" + esc(phrase) + "\\b", "gi");
    work = work.replace(re, () => { masked.push(phrase); return "\u0001" + (masked.length - 1) + "\u0001"; });
  });
  const terms = [];
  regionList(s).forEach(r => {
    const aliases = REGION_ALIASES[r] || [ (REGIONS[r] || {}).name || r ];
    aliases.forEach(a => { if (a) terms.push(a); });
  });
  baitList(s).forEach(b => {
    const syns = BAIT_SYNONYMS[b] || [ String(b).replace(/-/g, " ") ];
    syns.forEach(a => terms.push(a));
  });
  (SPECIES_SYNONYMS[s.id] || []).forEach(a => terms.push(a));
  DEPTH_EVIDENCE.forEach(a => terms.push(a));
  terms.sort((a, b) => b.length - a.length);
  work = work.replace(new RegExp("\\b(" + terms.map(esc).join("|") + ")\\b", "gi"), "<strong>$1</strong>");
  const num = "\\d[\\d,]*(?:\\.\\d+)?";
  work = work.replace(new RegExp("(^|[^\\d.])(" + num + "\\s*(?:to|and|–|—|-)\\s*" + num + "\\s*metres|" + num + "\\s*metres)\\b", "gi"), "$1<strong>$2</strong>");
  return work.replace(/\u0001(\d+)\u0001/g, (_, i) => masked[+i]);
}
function renderPinnedCard(list) {
  /* v1.4.0-beta: pinned card lives in its own full-width section above the
     grid, not as the first grid cell. */
  const slot = $("pinnedSlot");
  const target = slot || list;
  if (slot) slot.innerHTML = "";
  const s = SHARKS.find(x => x.id === state.pinned);
  const card = document.createElement("div");
  card.className = "pinned-card" + (s ? "" : " pinned-empty");
  if (!s) {
    card.innerHTML = state.hasPinnedBefore
      ? `<p class="latin">📌 <em>Pinned sharks appear here. Sarah might know something if you ask her about one.</em></p>`
      : `<p class="latin">📌 <em>No shark pinned — tap 📌 on any field-guide entry to keep it here while you research.</em><br><span class="dim">Tip: pinning a shark switches on soft logbook hints — when your expedition plan is close for the shark you're researching, your notes will nudge you. Sarah might know something too, if you ask her about it.</span></p>`;
  } else {
    const done = !!state.tagged[s.id];
    /* v1.4.15-beta: pinned card shows the research description with key clues
       in subtle bold — same font and size, just bold. Never the actual answers. */
    const researchPreview = highlightClues(s);
    card.innerHTML = `
      <div class="pinned-head"><span>📌 Currently researching</span>
        <button type="button" class="pin-btn unpin" data-unpin aria-label="Unpin ${s.name}">✕</button>
      </div>
      <div class="pinned-body">
        <div>
          <span class="tag-check${done ? " is-done" : ""}" aria-hidden="true"></span><span class="sr-only">${done ? "Marqué" : "Non marqué"}</span><strong>${s.name}</strong><br>
          <span class="latin">${s.latin}</span><br>
          <span class="latin">${regionNames(s).join(", ")} · ${s.depths.map(d => (DEPTHS[d] || {}).name || d).join(", ")}</span>
        </div>
      </div>
      <p class="pinned-research">${researchPreview}</p>`;
    card.querySelector("[data-unpin]").addEventListener("click", () => togglePin(s.id));
  }
  target.appendChild(card);
}
/* v0.22.0: pin-gated soft hints. When a shark is pinned and the planned
   expedition matches 3 of its 4 needs (region, depth, bait, method), the
   logbook offers one soft observational nudge about the odd one out.
   Wording is observational only — never "correct"/"wrong". This evolves
   the old rule that failed trips give no signal: the logbook now means
   "you're warm". Sarah remains the stronger help after repeated failures. */
const PIN_HINTS = {
  "region": "On les trouvera peut-être ailleurs?",
  "depth": "L'eau ne semble pas tout à fait bonne pour eux à cette profondeur…",
  "bait": "Ils n'ont pas semblé aimer la nourriture qu'on leur offrait.",
  "method": "Ils n'ont pas semblé nous remarquer du tout — peut-être une autre approche?"
};

/* Pure: given a plan and a pinned shark id, return a hint when the trip
   doesn't explain the miss, else null. Testable. Region/depth/bait decide
   whether the encounter was possible; method only picks the hint when the
   conditions were right but the approach didn't match (v2.7.15). */
/* v2.7.15-beta: a method mismatch is a CHOSEN approach this species
   doesn't respond to. No method chosen, no specific attractant, or no
   methods data for the species all mean "can't judge" — not a mismatch
   (so the existing warm case and approach-independent species keep
   their warm hint). */
function methodMismatch(s, trip) {
  const methods = s.methods || {};
  if (Object.keys(methods).length === 0) return false;
  if (!trip.method) return false;
  // No concrete approach selected yet (old/partial logbook entries can
  // name a method with methodOpt "none") — not a mismatch (Mira re-review).
  if (!trip.methodOpt || trip.methodOpt === "none") return false;
  const opts = methods[trip.method];
  if (!opts) return true;
  return !opts.includes(trip.methodOpt);
}
/* v0.22.0 Mira review: hints are grounded in COMPLETED expeditions, not the
   live planner. The logbook helps interpret evidence; it doesn't reveal
   answers by trial-and-error clicking.
   Distinguishes: conditions that make encounter POSSIBLE (region/depth/bait)
   from methods that improve ODDS (method/methodOpt boost only). */
function pinHintForTrip(trip, pinnedId) {
  if (!pinnedId || !trip) return null;
  const s = SHARKS.find(x => x.id === pinnedId);
  if (!s || state.tagged[pinnedId]) return null;
  // Did this trip's conditions make the pinned shark's appearance possible?
  const baitOk = Array.isArray(s.combo.bait) ? s.combo.bait.includes(trip.bait) : s.combo.bait === trip.bait;
  const possible = regionList(s).includes(trip.region) &&
    (s.depths || []).includes(trip.depth) && baitOk;
  // Did the player encounter (or tag) the pinned shark this trip?
  const encountered = (trip.encounters || []).some(e => e.speciesId === pinnedId);
  if (possible && !encountered) {
    // Conditions were right but the approach didn't match — the method
    // hint finally fires (v2.7.15); method never gates possibility.
    if (methodMismatch(s, trip)) {
      return { kind: "hint", dimension: "method", hint: PIN_HINTS.method };
    }
    // Conditions were right, shark just wasn't there — "you're warm"
    return { kind: "warm", hint: "L'eau semblait convenir à l'espèce " + s.name.toLowerCase() + " aujourd'hui. Parfois, aucun individu ne se présente, même quand les conditions sont bonnes." };
  }
  if (!possible && !encountered) {
    // Which dimension was off? Observational only.
    const off = [];
    if (!regionList(s).includes(trip.region)) off.push("region");
    if (!(s.depths || []).includes(trip.depth)) off.push("depth");
    if (!baitOk) off.push("bait");
    if (off.length === 1) {
      return { kind: "hint", dimension: off[0], hint: PIN_HINTS[off[0]] };
    }
  }
  return null;
}

/* v0.22.0 Mira review: live planner hints removed. Hints now appear in the
   logbook after completed expeditions (pinHintForTrip), preserving the
   research puzzle. This function is kept as a no-op for compatibility. */
function renderPinHint() {
  const el = $("pinHint");
  if (el) { el.classList.add("hidden"); el.innerHTML = ""; }
}

/* v0.20.0: show the pinned shark on the Expedition tab — a research focus
   to plan around. Never auto-fills the planner; the sea decides. */
/* v1.4.15-beta: diet phrases for pinned hints — natural language, not answers.
   "They eat plankton" lets the player infer the bait; "Plankton bloom — no bait"
   would hand it over. */
const DIET_PHRASE = {
  "plankton": "ils mangent du plancton",
  "crustaceans": "ils mangent des crabes et du homard",
  "squid": "ils chassent les calmars",
  "schooling-fish": "ils poursuivent les poissons en bancs",
  "tuna": "ils chassent les gros poissons gras",
  "ray": "ils mangent des raies",
  "urchins": "ils mangent des oursins et des mollusques"
};
function renderExpeditionPin() {
  const el = $("expeditionPin");
  if (!el) return;
  const s = SHARKS.find(x => x.id === state.pinned);
  if (!s) { el.classList.add("hidden"); el.innerHTML = ""; return; }
  el.classList.remove("hidden");
  const regionName = regionNames(s).join(", ");
  /* v0.20.0: Mira review fix — filter feeders (whale, basking) store bait as a
     string, not an array. baitList() normalizes both. */
  /* v1.4.15-beta: show diet as a natural sentence, not the bait answer. */
  const dietKeys = baitList(s);
  const dietText = dietKeys.map(k => DIET_PHRASE[k] || `they eat ${k}`).join("; ");
  el.innerHTML = `📌 Currently researching: <strong>${s.name}</strong>
    <span class="latin">${regionName} · ${s.depths.map(d => (DEPTHS[d] || {}).name || d).join(", ")} · ${dietText}</span>
    <br><span class="dim" style="font-size:12px">📓 Pin hints on — your logbook notes nudge you when the plan is close.</span>`;
}
/* v1.4.0-beta: rising z-index so a later-opened overlay always floats
   above earlier ones, regardless of DOM order. */
let guideOverlayZ = 30;
/* v2.0.0-beta: the rising z-index lives on the dropdown body, not the row.
   The open row's header must slide UNDER the sticky tab bar like normal
   content; only the floating detail card floats above its neighbors. */
function zOfBody(row) {
  const b = row && row.querySelector(".guide-row-body");
  return (b && parseInt(b.style.zIndex || "0", 10)) || 0;
}
/* v1.5.4-beta: shared collapse for guide rows — used by the close button,
   Escape key, and outside-click dismissal. Returns focus to the row header.
   v1.6.0-beta: restoreFocus flag — the accordion passes false so closing
   other cards doesn't yank focus (and scroll) back to them. */
function collapseGuideRow(row, restoreFocus = true) {
  if (!row || !row.classList.contains("open")) return;
  pauseVideosIn(row); /* v2.5.11-beta: stop any clip in the closing card */
  const body = row.querySelector(".guide-row-body");
  const head = row.querySelector(".guide-row-head");
  if (body) body.classList.add("hidden");
  if (head) {
    head.setAttribute("aria-expanded", "false");
    if (restoreFocus) head.focus();
  }
  row.classList.remove("open");
  if (body) body.style.zIndex = "";
}
/* v1.5.4-beta: Escape closes the topmost open guide popup. On small screens a
   tap outside the open popup also dismisses it — the fixed modal can cover
   its own row header, leaving no other way to close. */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  const openRows = [...document.querySelectorAll(".guide-row.open")];
  if (!openRows.length) return;
  openRows.sort((a, b) => zOfBody(b) - zOfBody(a));
  collapseGuideRow(openRows[0]);
});
document.addEventListener("click", (e) => {
  if (!window.matchMedia("(max-width: 768px)").matches) return;
  const openRow = document.querySelector(".guide-row.open");
  if (!openRow || openRow.contains(e.target)) return;
  collapseGuideRow(openRow);
});
function renderResearch() {
  const list = $("researchList");
  list.innerHTML = "";
  /* v0.20.0: the pinned shark — "currently researching". A focus card at the
     top of the field guide; pinning is a focus, never a filter. */
  renderPinnedCard(list);
  /* v0.13.0: untagged sharks first — the ones you're still hunting.
     Tagged ones settle to the bottom, out of the way. */
  const ordered = [...SHARKS]
    .filter(guideMatches)
    .sort((a, b) => ((state.tagged[a.id] ? 1 : 0) - (state.tagged[b.id] ? 1 : 0)));
  // v0.19.0: filter UI state
  buildFilterChips();
  renderActiveChips();
  const n = activeFilterCount();
  const fc = $("filterCount");
  if (fc) {
    fc.textContent = String(n);
    fc.classList.toggle("hidden", n === 0);
  }
  const gc = $("guideCount");
  if (gc) gc.textContent = `Showing ${ordered.length} of ${SHARKS.length} sharks`;
  const clr = $("guideClear");
  if (clr) clr.classList.toggle("hidden", n === 0);
  /* v0.20.0: Mira review fix — the pinned card survives empty-results states;
     it is a research focus, not a filter result. */
  if (!ordered.length) {
    const p = document.createElement("p");
    p.className = "latin";
    p.style.cssText = "text-align:center; padding: 24px 12px;";
    p.textContent = "Aucun requin ne correspond à ces filtres. Essaie d'en enlever un — l'océan est plus grand qu'il n'y paraît.";
    list.appendChild(p);
    return;
  }
  ordered.forEach(s => {
    const done = !!state.tagged[s.id];
    const regionLocked = regionList(s).length > 0 && regionList(s).every(r => REGIONS[r] && REGIONS[r].locked);
    const isPinned = state.pinned === s.id;
    const row = document.createElement("div");
    row.className = "guide-row";
    row.setAttribute("data-entry", s.id);
    /* v1.5.17-beta: IUCN pill lives INSIDE the head button so the whole header
       (names + badge) is one tap target. Color-coded by threat level. */
    const iucnAbbr = IUCN_ABBR[s.status] || s.status;
    row.innerHTML = `
      <div class="guide-row-top">
        <button type="button" class="guide-row-head" aria-expanded="false">
          <span class="guide-names">
            <span class="guide-row-name"><span class="tag-check${done ? " is-done" : ""}" aria-hidden="true"></span><span class="sr-only">${done ? "Marqué" : "Non marqué"}</span>${s.name}</span>
            <span class="latin">${s.latin}</span>
          </span>
          <span class="status-pill iucn-${iucnAbbr}" title="Liste rouge de l'UICN : ${s.statusFr || s.status}">${iucnAbbr}</span>
        </button>
        <button type="button" class="pin-btn${isPinned ? " pinned-on" : ""}" data-pin="${s.id}"
          aria-label="${isPinned ? "Unpin" : "Pin"} ${s.name} as currently researching"
          aria-pressed="${isPinned}">📌</button>
      </div>
      <div class="guide-row-body hidden">
        <button type="button" class="guide-close" aria-label="Close ${s.name} details">\u2715</button>
        <p class="iucn-full">Liste rouge de l'UICN : <strong>${s.statusFr || s.status}</strong></p>
        ${s.research.split("\n\n").map(p => `<p class="research-text">${highlightResearchClues(s, p)}</p>`).join("")}
        ${done
          ? `<p class="hook">Tagged ${idLine(state.tagged[s.id])}${state.tagged[s.id].name ? ` as <strong>${esc(state.tagged[s.id].name)}</strong>` : ""} 🎉</p>`
          : regionLocked
            ? `<p class="latin">🔒 Our vessel hasn't surveyed these waters yet — tag 10 sharks to unlock them.</p>`
            : ``}
      </div>
    `;
    const head = row.querySelector(".guide-row-head");
    const body = row.querySelector(".guide-row-body");
    const closeBtn = body.querySelector(".guide-close");
    if (closeBtn) closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      collapseGuideRow(row);
    });
    head.addEventListener("click", () => {
      const isHidden = body.classList.toggle("hidden");
      head.setAttribute("aria-expanded", String(!isHidden));
      row.classList.toggle("open", !isHidden);
      /* v1.4.0-beta: overlay floats above neighbors; rising z-index keeps
         the most recently opened entry on top.
         v2.0.0-beta: the z-index goes on the dropdown body, NOT the row —
         the row header must slide under the sticky tab bar instead of
         painting over it (iPad clip report). */
      const _body = row.querySelector(".guide-row-body");
      if (!isHidden) {
        /* v1.6.0-beta: accordion — opening one entry closes the others. */
        document.querySelectorAll(".guide-row.open").forEach(other => {
          if (other !== row && other.closest("#researchList")) collapseGuideRow(other, false);
        });
        if (_body) _body.style.zIndex = String(++guideOverlayZ);
      }
      else if (_body) _body.style.zIndex = "";
    });
    const pinBtn = row.querySelector("[data-pin]");
    if (pinBtn) pinBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      togglePin(s.id);
    });
    list.appendChild(row);
  });
}

/* ---------- Planner ---------- */

function fillSelect(el, obj) {
  el.innerHTML = "";
  Object.entries(obj).forEach(([id, v]) => {
    const o = document.createElement("option");
    o.value = id;
    o.textContent = typeof v === "string" ? v : v.name;
    el.appendChild(o);
  });
}

function fillRegions() {
  const el = $("regionSelect");
  const current = el.value;
  el.innerHTML = "";
  Object.entries(REGIONS).forEach(([id, v]) => {
    const o = document.createElement("option");
    o.value = id;
    if (v.locked) {
      const unlockText = id === "galapagos" || id === "south-africa"
        ? `🔒 ${v.name} — unlocks at 10 tags`
        : id === "east-australia"
          ? `🔒 ${v.name} — unlocks at 15 tags`
          : id === "california"
            ? `🔒 ${v.name} — unlocks at 25 tags`
            : id === "arctic"
              ? `🔒 ${v.name} — unlocks at 35 tags`
              : `🔒 ${v.name} — locked`;
      o.textContent = unlockText;
      o.disabled = true;
    } else {
      o.textContent = v.name;
    }
    el.appendChild(o);
  });
  if (current && REGIONS[current] && !REGIONS[current].locked) el.value = current;
}

/* v0.7.0: regions unlock in two stages now.
   - v1.7.9-beta: tagging any 10 sharks unlocks the Galápagos and
     South Africa as real, selectable waters (was: the six original species).
   - Tagging the full roster wins the game (Master Shark Tagger).
     v0.11.0: the win keeps moving up with the roster — always SHARKS.length. */
function applyRegions() {
  /* v0.21.0 Mira review: 15/25/35 milestones are count-based,
     independent of the 10-tag Galápagos/South Africa unlock. */
  const n = Object.keys(state.tagged).length;
  if (state.regionsUnlocked) {
    for (const id of ["galapagos", "south-africa"]) REGIONS[id].locked = false;
  }
  if (n >= 15) REGIONS["east-australia"].locked = false;
  if (n >= 25) REGIONS["california"].locked = false;
  if (n >= 35) REGIONS["arctic"].locked = false;
}

/* v0.7.0 migration: v0.6.0 winners had tyi-won=1 at 6/6, but the win is
   now the full roster. They keep their tags and earn the regions; the win
   resets until every shark is tagged.
   v0.11.0: same rule keeps applying as the roster grows — a win at 12/12
   resets when new sharks arrive, until 15/15, 18/18, and so on. */
function migrateWinV07() {
  const taggedCount = Object.keys(state.tagged).length;
  if (state.won && taggedCount < SHARKS.length) {
    state.won = false;
    try { localStorage.removeItem("tyi-won"); } catch {}
  }
  if (Object.keys(state.tagged).length >= 10) {
    state.regionsUnlocked = true;
    try { localStorage.setItem("tyi-regions", "1"); } catch {}
  } else {
    try { state.regionsUnlocked = localStorage.getItem("tyi-regions") === "1"; } catch {}
  }
  applyRegions();
}

/* ---------- Planner ----------
   v0.7.0: no target species. The planner is conditions only — region,
   depth, bait. v0.8.0 adds scent in the water as its own row.
   Your research is your targeting: the right combination
   brings the right sharks. The sea decides who shows up. */
function renderPlanner() {
  /* Selects are static; fillRegions() preserves the current region.
     Trips stay available after the win — there's always more to see. */
  fillRegions();
}

/* v1.7.13-beta: resolve the method option at launch — attract always
   uses chum since the sub-dropdown was retired. v1.7.6-beta: aggregation
   has no sub-menu either — default to "boat" for backward-compatible
   stats/logbook (the choice was flavor-only). Extracted for testability. */
function resolveLaunchMethodOpt() {
  const method = $("methodSelect").value;
  if (method === "aggregation" && !$("methodOptSelect").value) return "boat";
  return method === "attract" ? "chum" : $("methodOptSelect").value;
}

$("launchBtn").addEventListener("click", () => {
  const region = $("regionSelect").value;
  if (!region || !REGIONS[region] || REGIONS[region].locked) return;
  runExpedition({
    region,
    depth: $("depthSelect").value,
    bait: $("baitSelect").value,
    method: $("methodSelect").value,
    /* v1.7.13-beta + v1.7.6-beta: attract→chum, aggregation→boat, via helper. */
    methodOpt: resolveLaunchMethodOpt()
  });
});

/* ---------- Expedition ---------- */

function logLine(html, cls) {
  const p = document.createElement("p");
  if (cls) p.className = cls;
  p.innerHTML = html;
  const log = $("diveLog");
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}
/* v0.7.3: expedition pacing — a beat slower than reading speed, so the
   day breathes. Tune PACE to adjust globally.
   v0.20.0: quick-pace option — the player can shorten the beats. */
let PACE = 1.5;
const QUICK_PACE = 0.35;
function setPace(quick) {
  PACE = quick ? QUICK_PACE : 1.5;
  try { localStorage.setItem("tyi-pace", quick ? "quick" : "slow"); } catch {}
  const box = $("quickPace");
  if (box) box.checked = !!quick;
}
const wait = (ms) => new Promise(r => setTimeout(r, ms * PACE));

/* v0.13.0: persistent depth scenery — the scene was gradient + rays and
   felt empty between sightings. Simple SVG silhouettes, one per depth. */
const SCENERY = {
  surface: `<svg viewBox="0 0 400 60" preserveAspectRatio="xMidYMax slice">
    <g fill="#2f88b5" opacity="0.45">
      <path d="M40,30 q6,-5 12,0 q-6,5 -12,0 Z M46,30 l-8,-4 l-8,4 l8,4 Z"/>
      <path d="M330,20 q6,-5 12,0 q-6,5 -12,0 Z M336,20 l-8,-4 l-8,4 l8,4 Z"/>
      <path d="M200,40 q5,-4 10,0 q-5,4 -10,0 Z M205,40 l-7,-3 l-7,3 l7,3 Z"/>
    </g></svg>`,
  reef: `<svg viewBox="0 0 400 70" preserveAspectRatio="xMidYMax slice">
    <g fill="#175e75" opacity="0.55">
      <ellipse cx="60" cy="66" rx="46" ry="26"/>
      <ellipse cx="180" cy="68" rx="60" ry="30"/>
      <ellipse cx="330" cy="66" rx="52" ry="28"/>
    </g>
    <g stroke="#175e75" stroke-width="5" stroke-linecap="round" opacity="0.5" fill="none">
      <path d="M60,48 q-4,-18 -14,-26 M60,48 q2,-20 12,-30 M60,48 q10,-12 22,-16"/>
      <path d="M180,44 q-6,-22 -18,-32 M180,44 q0,-24 8,-36 M180,44 q12,-14 26,-18"/>
      <path d="M330,46 q-4,-16 -12,-24 M330,46 q6,-18 16,-26"/>
    </g>
    <g stroke="#0f4a5e" stroke-width="3" opacity="0.45" fill="none">
      <path d="M120,66 q4,-20 18,-28 q14,8 18,28"/>
      <path d="M260,66 q4,-18 16,-26 q12,8 16,26"/>
    </g></svg>`,
  twilight: `<svg viewBox="0 0 400 70" preserveAspectRatio="xMidYMax slice">
    <path d="M0,70 L0,30 L90,44 L200,58 L400,64 L400,70 Z" fill="#0d2c48" opacity="0.65"/>
    <path d="M0,70 L0,52 L140,60 L400,70 Z" fill="#081f36" opacity="0.7"/>
    <g fill="#0d2c48" opacity="0.5">
      <path d="M300,52 l10,-14 l10,14 Z"/>
      <path d="M340,56 l8,-11 l8,11 Z"/>
    </g></svg>`,
  deep: `<svg viewBox="0 0 400 70" preserveAspectRatio="xMidYMax slice">
    <path d="M0,70 L0,52 Q120,44 220,52 Q320,58 400,50 L400,70 Z" fill="#05090e" opacity="0.8"/>
    <ellipse cx="120" cy="56" rx="26" ry="8" fill="#0a1219" opacity="0.8"/>
    <ellipse cx="300" cy="58" rx="34" ry="9" fill="#0a1219" opacity="0.8"/>
  </svg>`
};
/* v2.4.0-beta: region-specific dive backdrops — SVG overlays per biome.
   Subtle, behind the action; the depth SVG stays as the base. */
const BIOME_SCENERY = {
  tropical: `<svg viewBox="0 0 600 200" preserveAspectRatio="xMidYMax slice">
    <g opacity="0.5">
      <path d="M40,200 Q50,140 35,110 Q60,130 55,160 Q70,120 60,90 Q80,120 75,150 L85,200 Z" fill="#c4748a"/>
      <path d="M90,200 Q100,150 85,120 Q110,140 105,170 L115,200 Z" fill="#d48aa0"/>
      <path d="M520,200 Q510,140 525,110 Q505,130 510,160 Q495,125 505,95 Q485,125 490,155 L480,200 Z" fill="#c4748a"/>
      <ellipse cx="150" cy="190" rx="60" ry="18" fill="#8a6a4a" opacity="0.6"/>
      <ellipse cx="450" cy="195" rx="80" ry="15" fill="#8a6a4a" opacity="0.6"/>
    </g></svg>`,
  temperate: `<svg viewBox="0 0 600 200" preserveAspectRatio="xMidYMax slice">
    <g opacity="0.55">
      <path d="M0,200 L0,150 Q80,130 140,160 Q200,120 280,150 L280,200 Z" fill="#4a5a62"/>
      <path d="M320,200 L320,160 Q400,140 460,165 Q520,135 600,160 L600,200 Z" fill="#3d4d55"/>
      <ellipse cx="150" cy="185" rx="90" ry="20" fill="#5a6a72" opacity="0.5"/>
    </g></svg>`,
  kelp: `<svg viewBox="0 0 600 200" preserveAspectRatio="xMidYMax slice">
    <g opacity="0.5">
      <path d="M100,200 Q95,120 105,60 Q98,100 110,140 Q102,80 115,40" stroke="#2d6a3d" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path d="M180,200 Q175,110 185,50 Q178,95 190,130" stroke="#357a48" stroke-width="11" fill="none" stroke-linecap="round"/>
      <path d="M420,200 Q425,120 415,55 Q422,100 410,145" stroke="#2d6a3d" stroke-width="13" fill="none" stroke-linecap="round"/>
      <path d="M500,200 Q495,130 505,70" stroke="#357a48" stroke-width="10" fill="none" stroke-linecap="round"/>
      <ellipse cx="105" cy="45" rx="22" ry="10" fill="#3d8a52" opacity="0.7"/>
      <ellipse cx="415" cy="60" rx="20" ry="9" fill="#3d8a52" opacity="0.7"/>
    </g></svg>`,
  pelagic: `<svg viewBox="0 0 600 200" preserveAspectRatio="xMidYMax slice">
    <g opacity="0.35">
      <ellipse cx="300" cy="100" rx="120" ry="25" fill="#1a4a6a" opacity="0.4"/>
      <ellipse cx="310" cy="105" rx="80" ry="15" fill="#245a7a" opacity="0.3"/>
    </g></svg>`,
  polar: `<svg viewBox="0 0 600 200" preserveAspectRatio="xMidYMax slice">
    <g opacity="0.6">
      <path d="M80,0 L140,0 L120,60 L100,90 L60,60 Z" fill="#cfe8f2"/>
      <path d="M100,90 L120,60 L110,90 Z" fill="#a8d0e6"/>
      <path d="M450,0 L520,0 L500,45 L470,70 L430,45 Z" fill="#cfe8f2"/>
      <path d="M470,70 L500,45 L485,70 Z" fill="#a8d0e6"/>
      <ellipse cx="300" cy="195" rx="200" ry="12" fill="#9fc0d4" opacity="0.3"/>
    </g></svg>`,
  volcanic: `<svg viewBox="0 0 600 200" preserveAspectRatio="xMidYMax slice">
    <g opacity="0.6">
      <path d="M0,200 L0,140 Q60,120 100,150 Q140,110 200,140 L200,200 Z" fill="#2a2a2e"/>
      <path d="M400,200 L400,150 Q460,130 500,155 Q540,125 600,150 L600,200 Z" fill="#232326"/>
      <path d="M120,200 Q150,170 180,185 Q210,160 240,180 L240,200 Z" fill="#333336"/>
    </g></svg>`
};
/* v2.4.0-beta: region-specific accents — landmarks that belong to ONE place,
   not the whole biome. (Mira review: the NC wreck was showing in all temperate waters.) */
const REGION_ACCENT = {
  "north-carolina": `<svg viewBox="0 0 600 200" preserveAspectRatio="xMidYMax slice">
    <g opacity="0.45" transform="translate(420,175) rotate(-8)">
      <rect x="-45" y="-12" width="90" height="24" rx="4" fill="#2e383e"/>
      <rect x="-8" y="-28" width="16" height="18" fill="#2e383e"/>
      <rect x="-30" y="-22" width="8" height="12" fill="#2e383e"/>
    </g></svg>`
};
/* depth key used by the planner -> scenery key. */
const SCENERY_FOR = { surface: "surface", reef: "reef", twilight: "twilight", deep: "deep" };
/* v2.4.0-beta: region -> biome for location-specific dive backgrounds and wildlife.
   No tropical animals in the arctic, no penguins in the maldives. */
const REGION_BIOME = {
  "caribbean": "tropical", "philippines": "tropical", "maldives": "tropical", "papua-new-guinea": "tropical",
  "north-carolina": "temperate", "japan": "temperate", "cornwall": "temperate",
  "south-africa": "temperate", "east-australia": "temperate",
  "california": "kelp",
  "open-atlantic": "pelagic",
  "arctic": "polar",
  "galapagos": "volcanic"
};
/* Region-appropriate ambient creatures (keys into CREATURE_ART). */
/* v2.7.4-beta: drift weighting by duplication — fish fivefold in shallow lists (bumped from tripled in v2.7.5, Avery)
   (most common in most places), dolphins/turtles single (a bit less
   common), mola rare in warm and open water. Penguins are NOT here: they
   are region-specific (South Africa + Galápagos only) and join the drift
   via the region override in startAmbientLife. */
/* v2.7.5-fix: bottom-dwellers cut on Avery's word (clam, nudibranch, tripod, isopod, yeti, cucumber) — removed from pools, drift, keywords, and tests.
   v2.7.5-beta: batch-2 drift additions — reef/twilight/deep creatures join
   their biome lists; surface visitors join theirs (otter to kelp =
   California only; narwhal/beluga to polar = Arctic only; tuna to
   pelagic). Fish boosted to five in every shallow list (v2.7.5, Avery), still the most common. */
/* v2.7.5-fix (Mira review): reef residents stay in reef drift — surface
   drift excludes them, so reef fish don't swim in open surface water. */
/* v2.7.6-beta (Avery): populated water — fish eightfold in tropical +
   kelp lists (was fivefold); reef/kelp drift also spawns faster below. */
const REEF_RESIDENTS = ["moray", "seahorse", "clownfish", "parrotfish", "pufferfish", "lionfish"];
function surfaceDriftList(biome) {
  return (BIOME_CREATURES[biome] || ["fish", "fish", "fish", "turtle", "dolphin"])
    .filter(function(c) { return REEF_RESIDENTS.indexOf(c) === -1; });
}
const BIOME_CREATURES = {
  "tropical":  ["fish", "fish", "fish", "fish", "fish", "fish", "fish", "fish", "turtle", "dolphin", "ray", "mola", "moray", "parrotfish", "pufferfish", "lionfish"],
  "temperate": ["fish", "fish", "fish", "fish", "fish", "seal", "dolphin", "jellyfish", "mola", "seahorse", "pufferfish", "lionfish"],
  "kelp":      ["fish", "fish", "fish", "fish", "fish", "fish", "fish", "fish", "seal", "dolphin", "otter"],
  "pelagic":   ["fish", "fish", "fish", "fish", "fish", "dolphin", "jellyfish", "ray", "mola", "tuna"],
  "polar":     ["fish", "fish", "fish", "fish", "fish", "seal", "jellyfish", "narwhal", "beluga"],
  "volcanic":  ["fish", "fish", "fish", "fish", "fish", "turtle", "ray", "seal"]
};
/* v2.5.0-beta: hand-painted expedition backgrounds (Avery + Mira).
   13 images covering all 52 region×depth combinations. Surface uses BG-01..06,
   reef/shallows uses BG-07..11, twilight and deep share BG-12/BG-13. */
const BG_IMAGE = {
  "caribbean|surface": "bg-01-tropical-surface.webp",
  "philippines|surface": "bg-01-tropical-surface.webp",
  "maldives|surface": "bg-01-tropical-surface.webp",
  "papua-new-guinea|surface": "bg-01-tropical-surface.webp",
  "north-carolina|surface": "bg-02-temperate-surface.webp",
  "japan|surface": "bg-02-temperate-surface.webp",
  "cornwall|surface": "bg-02-temperate-surface.webp",
  "south-africa|surface": "bg-02-temperate-surface.webp",
  "east-australia|surface": "bg-02-temperate-surface.webp",
  "open-atlantic|surface": "bg-03-open-atlantic-surface.webp",
  "california|surface": "bg-04-kelp-surface.webp",
  "galapagos|surface": "bg-05-volcanic-surface.webp",
  "arctic|surface": "bg-06-arctic-surface.webp",
  "caribbean|reef": "bg-07-tropical-shallows.webp",
  "philippines|reef": "bg-07-tropical-shallows.webp",
  "maldives|reef": "bg-07-tropical-shallows.webp",
  "papua-new-guinea|reef": "bg-07-tropical-shallows.webp",
  "japan|reef": "bg-08-rocky-shallows.webp",
  "cornwall|reef": "bg-08-rocky-shallows.webp",
  "south-africa|reef": "bg-08-rocky-shallows.webp",
  "east-australia|reef": "bg-08-rocky-shallows.webp",
  "california|reef": "bg-08-rocky-shallows.webp",
  "galapagos|reef": "bg-08-rocky-shallows.webp",
  "open-atlantic|reef": "bg-09-open-atlantic-shallows.webp",
  "arctic|reef": "bg-10-arctic-shallows.webp",
  "north-carolina|reef": "bg-11-north-carolina-wreck-shallows.webp",
};
function bgFor(region, depth) {
  if (depth === "twilight") return "bg-12-shared-twilight.webp";
  if (depth === "deep") return "bg-13-shared-deep-dark.webp";
  return BG_IMAGE[region + "|" + depth] || "bg-02-temperate-surface.webp";
}
function renderScenery(depth, region) {
  const el = $("diveScenery");
  if (!el) return;
  /* v2.5.0-beta: background image replaces the SVG scenery + biome overlays.
     v2.5.1-beta: twilight gets a slight brightening (Avery) — CSS filter only,
     the approved master image is untouched. */
  const bg = bgFor(region, depth);
  const twilightClass = depth === "twilight" ? " twilight-lift" : "";
  el.innerHTML = `<img class="dive-bg${twilightClass}" src="assets/expedition-backgrounds/${bg}" alt="" draggable="false">`;
  /* v2.5.1-beta: deep dark — midnight black gradient on top (Avery). */
  if (depth === "deep") {
    const dk = document.createElement("div");
    dk.className = "deep-darken";
    el.appendChild(dk);
  }
  el.querySelectorAll(".snow").forEach(n => n.remove());
  /* Marine snow in the deep: slow-falling specks. */
  if (depth === "deep") {
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("span");
      s.className = "snow";
      s.style.left = (Math.random() * 100) + "%";
      s.style.animationDuration = (7 + Math.random() * 9).toFixed(1) + "s";
      s.style.animationDelay = (-Math.random() * 12).toFixed(1) + "s";
      s.style.width = s.style.height = (1 + Math.random() * 2.5).toFixed(1) + "px";
      el.appendChild(s);
    }
  }
}

/* v0.13.0: background fish drift through between sightings so the water
   never feels empty. Small, dim, clearly behind the action. */
let ambientTimer = null;
function startAmbientLife(depth, region) {
  stopAmbientLife();
  /* v2.4.0-beta: region-specific wildlife — no tropical animals in the arctic.
     Mira review: twilight/deep use deep-appropriate creatures, not shallow biome fauna. */
  const biome = REGION_BIOME[region] || "temperate";
  const shallow = depth === "surface" || depth === "reef";
  let creatures;
  if (depth === "deep") creatures = ["fish", "fish", "fish", "anglerfish", "snailfish", "cusk"];
  else if (!shallow) creatures = ["fish", "fish", "jellyfish", "hatchetfish", "gulper", "vampire", "siphonophore", "krill", "viperfish"];
  else if (depth === "surface") creatures = surfaceDriftList(biome);
  else creatures = (BIOME_CREATURES[biome] || ["fish", "fish", "fish", "turtle", "dolphin"]).slice();
  /* v2.7.4-beta: penguins drift only where they live — South Africa and
     the Galápagos — never in the Arctic or other temperate waters. */
  if (shallow && (region === "south-africa" || region === "galapagos")) creatures.push("penguin");
  /* v2.7.6-beta (Avery): populated water — coral reefs and kelp forests
     teem, so spawns run about twice as often there (4s at 75% vs the
     usual 6s at 55%). Everywhere else keeps the usual pace; twilight
     and the deep stay sparse, as they should.
     v2.7.6-fix (Mira review): kelp counts only in shallow water —
     California twilight/deep were wrongly boosted, since kelp is the
     biome at all four California depths. */
  const populated = (biome === "tropical" && depth === "reef") || (biome === "kelp" && shallow);
  ambientTimer = setInterval(() => {
    if (document.hidden) return;
    if (Math.random() < (populated ? 0.75 : 0.55)) spawnCreature(pick(creatures), true);
  }, populated ? 4000 : 6000);
}
function stopAmbientLife() {
  if (ambientTimer) { clearInterval(ambientTimer); ambientTimer = null; }
}

/* Ambient sea life + quiet easter-egg flavour during the dive. */
/* v2.7.5-fix (Avery): these shadows move at half speed — drifters and
   loungers, not cruisers. Everything else keeps the usual 9-17s crossing. */
const SLOW_CREATURES = ["jellyfish", "mola", "seahorse", "manatee", "snailfish", "siphonophore", "krill", "anglerfish"];
/* v2.7.8-beta: relative size factors for ambient creatures (see spawnCreature).
   Tiny 0.55 / small 0.7 / medium-small 0.85 / medium 1 / large 1.2-1.3 / very large 1.5.
   v2.7.13-beta (Avery, on-device): the otter reads too big at 1 — its sprite is
   wide, so height alone understates its screen presence. Halved to 0.5. */
const CREATURE_SIZE = {
  krill: 0.55, hatchetfish: 0.55,
  seahorse: 0.7, clownfish: 0.7, viperfish: 0.7, snailfish: 0.7,
  fish: 0.85, pufferfish: 0.85, lionfish: 0.85, vampire: 0.85, parrotfish: 0.85, cusk: 0.85, gulper: 0.85,
  penguin: 1, jellyfish: 1, siphonophore: 1, snake: 1, moray: 1, anglerfish: 1, otter: 0.5,
  turtle: 1.2, seal: 1.2, ray: 1.2,
  dolphin: 1.3, tuna: 1.3,
  mola: 1.5, manatee: 1.5, narwhal: 1.5, beluga: 1.5
};
function spawnCreature(type, background, lit) {
  const scene = $("diveScene");
  let art = CREATURE_ART[type];
  /* v2.7.4-beta: ambient shark silhouettes — existing shark art, darkened
     with the same .shark-shadow treatment as the mystery silhouette, so
     the shape always matches the species named in the sighting line.
     They drift by uncatchably: the sighting text says distant/too far,
     and nothing here creates an encounter. */
  if (!art && typeof type === "string" && type.indexOf("shark:") === 0 && typeof sharkArtImg === "function") {
    /* v2.7.10-beta (Avery): in the deep dark, a blackened illustration
       stands out — the other shadows are dark blue on black, the shark
       was solid black. Deep ambient shark shadows use the species' own
       dark-blue silhouette art instead (same shape, same halo, same
       opacity — only the body colour changes to match the other deep
       shadows). Derpy mode keeps the blackened derpy art; midwater and
       the mystery phase are untouched. */
    const deepSilhouette = scene && scene.classList && typeof scene.classList.contains === "function" &&
      scene.classList.contains("depth-deep") && typeof derpyModeOn === "function" && !derpyModeOn() &&
      typeof ART_URL === "function";
    if (deepSilhouette) {
      const sid = type.slice(6);
      art = '<div class="shark-shadow deep-silhouette"><img src="' + ART_URL(sid, "silhouette") + '" alt="Distant shark silhouette" loading="lazy" data-shark-art="' + sid + '" data-art-type="silhouette" onerror="sharkArtFallback(this)" /></div>';
    } else {
      art = '<div class="shark-shadow">' + sharkArtImg(type.slice(6), "illustration", "Distant shark silhouette") + '</div>';
    }
  }
  if (!art) return;
  const el = document.createElement("div");
  el.className = "ambient" + (background ? " bg-fish" : "");
  /* v2.7.5-fix (Avery): the lanternfish school carries its own lights —
     a warm bright glow that throws the whole school into relief.
     Sighting only (the flag), so ordinary fish drift stays dark. */
  if (lit) el.classList.add("lit");
  el.innerHTML = art;
  el.style.top = (8 + Math.random() * 55) + "%";
  /* v2.7.5-fix (Avery): famously slow creatures cross at half speed —
     their shadows linger instead of hurrying past like a fish. */
  const slow = SLOW_CREATURES.indexOf(type) !== -1;
  const dur = (9 + Math.random() * 8) * (slow ? 2 : 1);
  el.style.animationDuration = dur.toFixed(1) + "s";
  /* v2.7.5-fix (Avery): background animals stay relatively close — at
     10-18px they read as fast-moving distant blobs, not creatures. */
  /* v2.7.8-beta (Avery): relative sizing — small animals no longer render
     as large as big ones (an otter was reading as a manatee). Factors
     compress real size so nothing vanishes: krill stays visible, just
     clearly smaller than a tuna. Distant shark silhouettes keep factor
     1 — they are far away by definition, not nearby. */
  const sizeFactor = (type && CREATURE_SIZE[type]) || 1;
  el.style.height = background
    ? Math.round((18 + Math.random() * 12) * sizeFactor) + "px"
    : Math.round((24 + Math.random() * 26) * sizeFactor) + "px";
  /* v0.26.1: ambient creatures swim both ways — 50/50 per spawn. The art
     faces left by default, so leftward swimmers need no flip; rightward
     swimmers are mirrored to face their direction of travel. (Replaces the
     old 40%-flip, which left most creatures swimming backwards.) */
  if (Math.random() < 0.5) {
    el.style.transform = "scaleX(-1)"; // face right, drift left-to-right
  } else {
    el.classList.add("swim-left"); // face left, drift right-to-left
  }
  el.addEventListener("animationend", () => el.remove());
  scene.appendChild(el);
  setTimeout(() => el.remove(), slow ? 45000 : 25000); // safety net (slow crossings run 18-34s)
}

/* Guaranteed ambient life before the shark reveal: the scene must feel
   alive first. At least one sighting always lands; a rare easter egg may
   join it. v0.6.0: eggs are likelier in the deep, where secrets live. */
async function showSighting(depth) {
  // Rare, quiet easter eggs: real phenomena, mentioned in passing.
  const eggChance = (depth === "twilight" || depth === "deep") ? 0.35 : 0.12;
  if (Math.random() < eggChance) {
    const eggs = EASTER_EGGS.filter(e => e.depths.includes(depth));
    if (eggs.length) {
      logLine(`✨ ${pick(eggs).text}`);
      await wait(1600);
    }
  }
  const options = SIGHTINGS[depth] || [];
  if (options.length) {
    /* v0.13.0: dealt from the trip deck — each sighting once per trip.
       v0.13.0 review fix: the deck does NOT refill. A long trip simply
       runs out of new sightings instead of repeating them. */
    if (tripDecks && !tripDecks.sightings.deck.length) return;
    const s = tripDecks ? deal(tripDecks.sightings.deck, tripDecks.sightings.pool) : pick(options);
    logLine(`👁️ ${s.text}`);
    spawnCreature(s.creature, false, s.text.toLowerCase().indexOf("lanternfish") !== -1);
  }
}

/* ---------- Expedition: a full day out ----------
   v0.7.0: no target species. Each shark declares where it can appear
   (region + bait + depth range) — that declaration IS the encounter
   table. A combination resolves to every species whose declaration
   matches. New sharks slot in by adding their own declaration. */
function resolveEncounters(plan) {
  return SHARKS.filter(s => {
    const baitOk = Array.isArray(s.combo.bait)
      ? s.combo.bait.includes(plan.bait)
      : s.combo.bait === plan.bait;
    return regionList(s).includes(plan.region) &&
      s.depths.includes(plan.depth) &&
      baitOk;
  });
}

/* Pick one species for an encounter slot: prefer untagged species the
   player hasn't already seen today, then familiar faces for watching.
   v0.8.0: the scent lure BOOSTS — a species the lure is right for gets
   triple weight. A wrong lure or no lure changes nothing (never a gate).
   v0.9.0: same boost-only semantics, now keyed on the Method dimension —
   a species boosts only on (method, sub-option) pairs that are real for
   that animal. */
function methodWeight(plan, species) {
  const m = (plan && plan.method) || "attract";
  const opt = (plan && plan.methodOpt) || "none";
  return ((species.methods || {})[m] || []).includes(opt) ? 3 : 1;
}
function pickEncounter(appeared, shown, plan) {
  const fresh = appeared.filter(s => !shown.has(s.id));
  if (!fresh.length) return null;
  const newToPlayer = fresh.filter(s => !state.tagged[s.id]);
  const pool = newToPlayer.length ? newToPlayer : fresh;
  let total = 0;
  const weights = pool.map(s => { const w = methodWeight(plan, s); total += w; return w; });
  let r = Math.random() * total;
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

/* One encounter: the shark appears, and the player chooses to WATCH
   (a sighting, logged) or TAG (if untagged — opportunistic tagging is
   always allowed). Either way the day goes on. */
/* v1.6.4-beta: encounter-level one-shot for "Log re-sighting". The v1.5.25
   guard lived on the button's dataset — if the encounter UI ever re-rendered
   (or iOS retargeted the tap), a fresh button lost the guard and Sarah's
   resighting thread could fire twice. This key lives outside the DOM. */
let lastResightEncounterId = null;
function doEncounter(species, plan) {
  return new Promise(resolve => {
    /* v1.6.4-beta: unique ID for this encounter instance. The resight guard
       keys on it, so exactly one re-sighting can be logged per encounter
       no matter how many buttons get rendered. */
    const encounterId = "enc-" + Date.now().toString(36) + "-" + Math.floor(Math.random() * 46656).toString(36);
    /* v1.5.3-beta: reunion system — one tagged shark per species. After tagging,
       encountering the species rolls: is it YOUR shark (reunion) or a different
       untagged animal? Odds by ecology tier (game-balance, not science):
       resident 25%, coastal 12.5%, migratory 5%. No time gating — the same
       odds apply on every encounter. */
    const existingRec = state.tagged[species.id];
    let isReunion = false;
    let isDifferentShark = false;
    if (existingRec) {
      const tier = (typeof ECOLOGY_TIER !== "undefined" && ECOLOGY_TIER[species.id]) || "coastal";
      const odds = (typeof REUNION_ODDS !== "undefined" && REUNION_ODDS[tier]) || 0.125;
      isReunion = Math.random() < odds;
      isDifferentShark = !isReunion;
    }
    const rec = isReunion ? existingRec : null;
    const sharkEl = $("diveShark");
    /* v1.8.5-beta: size tiers — a porbeagle shouldn't fill the frame like
       a white shark. Derived from the species' real max length; the
       Collection stays full-frame, only the expedition encounter scales. */
    sharkEl.classList.remove("size-small", "size-medium", "size-large", "size-xlarge");
    sharkEl.classList.add("size-" + sizeTierFor(species));
    /* v0.26.0: tap-to-reveal encounter. Phase 1 shows the mystery
       silhouette (the species is not named yet). Tapping crossfades
       to the full-colour illustration and reveals the name.
       The illustration is preloaded so the reveal is instant.
       v1.6.6-beta: the shadow now uses the shark's actual illustration
       with a dark CSS overlay, so the silhouette always matches the shark.
       v1.7.20-beta: in derpy mode the mystery silhouette is a darkened
       derpy SVG (same CSS darkening trick) — suspense in derpy style,
       revealed on tap to the full derpy art.
       v1.7.21-beta: the derpy SVG has no width/height attributes, so it
       collapsed to zero size inside .shark-shadow — CSS now gives it
       explicit 220x110 dimensions. */
    preloadSharkArt(species.id);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    sharkEl.innerHTML =
      `<div class="shark-silhouette" role="button" tabindex="0" ` +
      `aria-label="Something is out there — tap to reveal">` +
      `<div class="shark-shadow">` + sharkArtImg(species.id, "illustration", "Mysterious shark silhouette") + `</div>` +
      `<div class="tap-hint">👆 Tap to reveal</div></div>`;
    sharkEl.classList.remove("hidden");
    logLine(`🦈 <span class="found">Something's out there...</span>`, "found");
    const actions = $("diveActions");
    actions.classList.add("hidden");
    actions.innerHTML = "";

    /* Phase 2: the reveal. Swaps silhouette for illustration, reveals
       the species name (with v0.17.1 already-in-book info), then shows
       the Watch/Tag buttons. */
    const reveal = () => {
      const sil = sharkEl.querySelector(".shark-silhouette");
      if (!sil || sil.dataset.revealed) return;
      sil.dataset.revealed = "true";
      /* v0.17.1: the moment a shark appears, say whether it's already in the
         book — no squinting at the small print under the buttons. */
      /* v1.5.3-beta: reunion vs different-shark presentation. */
      let already;
      if (!existingRec) {
        already = ` — new to your book!`;
      } else if (isReunion) {
        const rname = rec.name ? esc(rec.name) : rec.researchId; // v1.8.5-beta: no quotes around nicknames
        already = ` — wait... that tag looks familiar. It's ${rname}! 🥹`;
      } else {
        const oname = existingRec.name ? esc(existingRec.name) : "yours"; // v1.8.5-beta: no quotes around nicknames
        already = ` — another ${species.name}! This one has no matching tag — not ${oname}.`;
      }
      const showIllustration = () => {
        /* v1.7.14-beta: prominent encounter status badge — the already-in-book
           info was a tiny log-line suffix, easy to miss. Now it's a visual
           badge right under the shark illustration. */
        let badgeClass, badgeText;
        if (!existingRec) {
          badgeClass = "enc-new";
          badgeText = "✨ NEW SPECIES — new to your book!";
        } else if (isReunion) {
          /* v1.7.14-beta Mira fix: escape once, at the HTML insertion boundary.
             rname stays raw here; esc() is applied in badgeText below. */
          const rname = rec.name ? rec.name : rec.researchId; // v1.8.5-beta: no quotes around nicknames
          badgeClass = "enc-reunion";
          badgeText = `🥹 YOUR SHARK — ${esc(rname)}`;
        } else {
          badgeClass = "enc-other";
          badgeText = `🦈 ANOTHER ${esc(species.name.toUpperCase())}`;
        }
        sharkEl.innerHTML =
          `<div class="shark-reveal">` +
          sharkArtImg(species.id, "illustration", species.name) +
          `<div class="encounter-badge ${badgeClass}">${badgeText}</div>` +
          `</div>`;
        logLine(`🦈 <span class="found">Shark! A ${species.name}${already}</span>`, "found");
        showEncounterActions();
      };
      if (reducedMotion) {
        showIllustration();
      } else {
        sil.classList.add("revealing");
        setTimeout(showIllustration, 350);
      }
    };

    const silEl = sharkEl.querySelector(".shark-silhouette");
    silEl.addEventListener("click", reveal);
    silEl.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); reveal(); }
    });

    const showEncounterActions = () => {
      actions.classList.remove("hidden");
    const finish = () => {
      /* The day doesn't end on its own — after each encounter the player
         chooses: keep diving, or head back to the ship. */
      actions.innerHTML = "";
      const stayBtn = document.createElement("button");
      stayBtn.className = "secondary-button";
      stayBtn.type = "button";
      stayBtn.textContent = "🌊 Keep diving";
      stayBtn.addEventListener("click", () => {
        actions.classList.add("hidden");
        actions.innerHTML = "";
        resolve(false);
      });
      const backBtn = document.createElement("button");
      backBtn.className = "secondary-button";
      backBtn.type = "button";
      backBtn.textContent = "⛵ Head back to the ship";
      backBtn.addEventListener("click", () => {
        actions.classList.add("hidden");
        actions.innerHTML = "";
        resolve(true);
      });
      actions.appendChild(stayBtn);
      actions.appendChild(backBtn);
      actions.classList.remove("hidden");
    };
    const watchBtn = document.createElement("button");
    watchBtn.className = "secondary-button";
    watchBtn.type = "button";
    watchBtn.textContent = "👁️ Just watch";
    watchBtn.addEventListener("click", () => {
      const entry = recordSighting(species, plan);
      logTripEncounter(species, "watched");
      /* v1.3.0-beta: occasional natural-history note on tagged sharks.
         ~35% chance, stored on the record, shown in the collection detail.
         Pure flavor — not a checklist, no achievements attached. */
      let noteLine = "";
      if (rec && Math.random() < 0.35) {
        const note = pickWatchNote(species);
        rec.notes = rec.notes || [];
        if (!rec.notes.includes(note)) {
          rec.notes.push(note);
          store.save(state.tagged);
          noteLine = ` 📓 <em>Noted: ${esc(note)}.</em>`;
        }
      }
      logLine(`👁️ You watch the ${species.name} ${entry.doing}. A good sighting, logged.${noteLine}`);
      finish();
    });
    actions.appendChild(watchBtn);
    /* v1.5.3-beta: three encounter states —
       !existingRec: first tag (Tag button)
       isReunion: it's YOUR shark (Follow + Log re-sighting)
       isDifferentShark: another wild shark (Species observation only) */
    if (!existingRec) {
      const tagBtn = document.createElement("button");
      tagBtn.className = "primary-button";
      tagBtn.type = "button";
      tagBtn.textContent = `🏷️ Tag the ${species.name}`;
      tagBtn.addEventListener("click", () => {
        actions.classList.add("hidden");
        actions.innerHTML = "";
        /* v0.17.1: the release buttons resolve the encounter directly —
           no second keep-diving/head-back prompt after the health check. */
        openTagging(species, (result) => {
          actions.classList.add("hidden");
          actions.innerHTML = "";
          /* v1.4.0-beta: result is false (keep diving), true (head back),
             or {tagAlong: speciesId} (tag along — ends expedition). */
          if (result && typeof result === "object" && result.tagAlong) {
            resolve({ tagAlong: result.tagAlong });
          } else {
            resolve(result === true);
          }
        });
      });
      actions.appendChild(tagBtn);
    } else if (isReunion) {
      /* v1.5.3-beta: REUNION — it's YOUR shark! Log re-sighting and Follow
         for this actual individual. One-time Sarah reaction per species. */
      /* v1.6.7-beta: capture whether the reunion reaction fired — if it did,
         the resight button must not push its own thread for this encounter. */
      const reunionReactedThisEncounter = maybeReunionReaction(species, rec);
      /* v1.4.0-beta Mira review (blocker 2): follow option for already-tagged
         species — unlocks remaining secret facts without retagging. Ends the
         expedition (you're spending the rest of the trip following). */
      const followBtn = document.createElement("button");
      followBtn.className = "primary-button";
      followBtn.type = "button";
      const _followRec = state.tagged[species.id];
      const _followName = (_followRec && _followRec.name) || species.name;
      /* v1.7.23-beta: show insight progress on the Follow button. */
      const _factTotal = insightPoolFor(species.id).length;
      const _factHave = (state.unlockedFacts[species.id] || []).length;
      const _factLine = _factTotal ? `<br><small class="dim">(insights: ${_factHave}/${_factTotal})</small>` : "";
      followBtn.innerHTML = `🧭 Follow ${esc(_followName)}<br><small class="dim">ends this expedition — no more shark encounters today</small>${_factLine}`;
      const _factLabel = _factTotal ? ` (${_factHave} of ${_factTotal} insights learned)` : "";
      followBtn.setAttribute("aria-label", `Follow ${_followName} for the rest of this trip (ends expedition)${_factLabel}`);
      followBtn.addEventListener("click", () => {
        actions.classList.add("hidden");
        actions.innerHTML = "";
        /* v1.4.0-beta Mira review (blocker): the already-tagged path never
           calls openTagging(), so state.encounterDone is null. Pass
           doEncounter's local resolver directly — one-shot guard against
           double taps. */
        let _followResolved = false;
        doFollowTagged(species.id, (result) => {
          if (!_followResolved) {
            _followResolved = true;
            resolve(result);
          }
        });
      });
      /* v1.5.8-beta: "Follow" goes first, "Just watch" second. */
      actions.insertBefore(followBtn, watchBtn);
      /* v0.8.0: it's one of yours — log the re-sighting. */
      const resightBtn = document.createElement("button");
      resightBtn.className = "secondary-button";
      resightBtn.type = "button";
      resightBtn.textContent = "📝 Log re-sighting";
      resightBtn.addEventListener("click", () => {
        /* v1.5.25-beta: one-shot — a double-tap must not log (and thread) twice.
           v1.6.4-beta: hardened — the dataset guard alone wasn't enough (Avery
           still saw duplicates on iPad). The encounter-ID check lives outside
           the DOM, so a re-rendered button can't lose it. */
        if (lastResightEncounterId === encounterId) return;
        lastResightEncounterId = encounterId;
        if (resightBtn.dataset.done) return;
        resightBtn.dataset.done = "true";
        resightBtn.disabled = true;
        const entry = recordResighting(species, plan);
        /* v1.8.5-beta fix (Mira review): a reunion is the tagged individual
           itself — pass its researchId so the logbook matches by identity. */
        logTripEncounter(species, "resighted", rec ? rec.researchId : null);
        logLine(`📝 Re-sighting logged — ${species.name} off ${esc(entry.location)}. ${esc(entry.note)}`);
        /* v1.6.7-beta: one resighting = one Sarah thread. The first-ever reunion
           already got the special "WAIT... again?!?" reaction above; only later
           resightings use the routine resightThread. */
        /* v2.5.6-beta: per-individual mention cooldown — the sighting
           weighs its sighting count, so a fresh sighting supersedes a
           recent check-in, but Sarah won't repeat herself about the
           same shark inside 15 minutes at equal-or-lesser weight. */
        if (!reunionReactedThisEncounter) {
          const sightW = (rec.resightings || []).length;
          if (!sharkMentionBlocked(species.id, sightW)) {
            if (pushThread(resightThread(species, rec))) noteSharkMention(species.id, sightW);
          }
        }
        state.resightedThisTrip = true;
        finish();
      });
      actions.appendChild(resightBtn);
    } else {
      /* v1.5.3-beta: DIFFERENT SHARK — another wild ${species.name}, not yours.
         Just watch, or observe the species (may unlock a secret fact).
         NO tag, NO re-sighting, NO follow — never touches the tagged record. */
      const observeBtn = document.createElement("button");
      observeBtn.className = "secondary-button";
      observeBtn.type = "button";
      /* v1.7.24-beta: show insight progress on the Observe button, same as
         Follow (v1.7.23-beta) — the player should know what observing this
         wild shark will get them before committing the expedition. */
      const _obsFactTotal = insightPoolFor(species.id).length;
      const _obsFactHave = (state.unlockedFacts[species.id] || []).length;
      const _obsFactLine = _obsFactTotal ? `<br><small class="dim">(insights: ${_obsFactHave}/${_obsFactTotal})</small>` : "";
      /* v1.7.25-beta: when all insights are learned, the exhausted
         branch still ends the expedition and shows the "learned all I
         can" popup (same as Follow's exhausted flow) — it reveals no
         new fact, so the copy must not promise one. */
      const _obsExhausted = _obsFactTotal > 0 && _obsFactHave >= _obsFactTotal;
      const _obsSub = _obsExhausted
        ? `study this ${esc(species.name)} — all insights learned (ends the expedition)`
        : `study this ${esc(species.name)} — may reveal a secret fact (ends the expedition)`;
      observeBtn.innerHTML = `🔬 Observe species<br><small class="dim">${_obsSub}</small>${_obsFactLine}`;
      const _obsFactLabel = _obsFactTotal ? ` (${_obsFactHave} of ${_obsFactTotal} insights learned)` : "";
      observeBtn.setAttribute("aria-label", _obsExhausted
        ? `Observe this ${species.name} (species study, not your tagged shark; all insights already learned; ends the expedition)${_obsFactLabel}`
        : `Observe this ${species.name} (species study, not your tagged shark; learning a new fact ends the expedition)${_obsFactLabel}`);
      observeBtn.addEventListener("click", () => {
        const fact = unlockSecretFact(species.id);
        logTripEncounter(species, "observed");
        if (fact) {
          /* v1.7.24-beta: mirror the Follow flow (v1.7.22-beta) — the insight
             lives on the Map popup only, not duplicated in the log. Before
             this fix Observe resolved with bare `true` and never set
             pendingTagAlong / pendingTagAlongFact, so closeDive had nothing
             to show: the fact only existed in the dive log and Avery never
             saw the popup for an untagged shark. Now it stashes the fact
             and resolves with { tagAlong } so closeDive navigates to the Map
             and shows the popup — same as Follow. mode: "observe" keeps the
             popup copy honest (studying, not following). */
          state.pendingTagAlongFact = { speciesId: species.id, fact, exhausted: false, mode: "observe" };
          /* v1.7.8-beta: a new species insight ends the expedition — you're
             spending the rest of the day processing what you learned. */
          logLine(`🧭 That discovery deserves a full debrief — heading back to the ship to log it properly.`);
          actions.classList.add("hidden");
          actions.innerHTML = "";
          renderAll();
          resolve({ tagAlong: species.id });
        } else {
          /* v1.7.25-beta: exhausted Observe — no facts left, but the
             expedition still ends and the popup still shows, mirroring
             the non-exhausted Observe flow and Follow's exhausted flow.
             Before this fix the branch called finish() (Keep diving /
             Head back) and showed no popup, so Avery never saw the
             "learned all I can" message for a fully-learned species.
             The popup copy (showTagAlongFact) already handles
             exhausted + observe — no new fact is promised. */
          state.pendingTagAlongFact = { speciesId: species.id, fact: null, exhausted: true, mode: "observe" };
          logLine(`🧭 The study is complete — heading back to the ship to log it properly.`);
          actions.classList.add("hidden");
          actions.innerHTML = "";
          renderAll();
          resolve({ tagAlong: species.id });
        }
      });
      actions.appendChild(observeBtn);
    }
    }; // end showEncounterActions
  });
}

/* v0.7.0: a trip is a full day out — descent, wildlife, then 2–4
   encounter slots paced through the day, then day's end. The shark is
   a moment in the day, never the end of it. */
/* v1.4.2: porthole — the observation window is always present.
   v1.4.7: when no expedition is active it shows the ocean surface from a
   boat window — rolling wave crests at three depths, spray hitting the
   glass. Called on init and when an expedition ends. */
function showPorthole() {
  const scene = $("diveScene");
  scene.className = "dive-scene porthole";
  $("diveScenery").innerHTML = "";
  /* v1.5.5: clear any lingering ambient creature shadows from the expedition —
     spawnCreature() appends them to diveScene (not diveScenery), so they
     survived the trip and haunted the idle porthole waves. */
  scene.querySelectorAll(".ambient").forEach(el => el.remove());
  $("diveShark").classList.add("hidden");
  const log = $("diveLog");
  if (log) log.innerHTML = '<p class="dive-idle">\u{1F30A} The ocean waits. Plan your expedition above, then launch.</p>';
  const actions = $("diveActions");
  if (actions) { actions.classList.add("hidden"); actions.innerHTML = ""; }
  $("diveView").classList.remove("hidden");
}

async function runExpedition(plan) {
  state.currentPlan = plan;
  state.pendingWin = false;
  state.taggedThisTrip = false;
  state.resightedThisTrip = false;
  state.followedThisTrip = false;
  /* v1.4.19-beta: Big Day — queue routine species celebrations during the
     trip; flush one conversation (single or Big Day) at trip end. */
  state.pendingCelebrations = [];
  /* v0.18.0: feed achievement stats — regions visited, baits used. */
  if (plan.region && !state.stats.regionsVisited.includes(plan.region)) {
    state.stats.regionsVisited.push(plan.region);
  }
  if (plan.bait && !state.stats.baitsUsed.includes(plan.bait)) {
    state.stats.baitsUsed.push(plan.bait);
  }
  /* v2.7.14-beta: feed the twilight/deep-dive achievements — the depth of
     every expedition launched, tag or no tag. */
  if (plan.depth && !(state.stats.depthsVisited || []).includes(plan.depth)) {
    (state.stats.depthsVisited = state.stats.depthsVisited || []).push(plan.depth);
  }
  if (plan.methodOpt && plan.methodOpt !== "none" && !state.stats.methodsUsed.includes(plan.methodOpt)) {
    state.stats.methodsUsed.push(plan.methodOpt);
  }
  saveStats();
  tripDecks = { waiting: shuffled(WAITING_LINES), doing: shuffled(SIGHTING_DOINES), sightings: buildSightingDeck(plan.depth, plan.region) };
  /* v0.8.0: open a fresh logbook page for this trip. */
  tripLog = {
    ts: Date.now(),
    date: new Date().toLocaleDateString("fr-CA", { year: "numeric", month: "short", day: "numeric" }),
    region: plan.region,
    depth: plan.depth,
    bait: plan.bait,
    /* v0.20.0 Mira review fix: record the actual method ("" when unpicked) —
       the logbook renders "No method chosen"; "attract" was a misrecord. */
    method: plan.method || "",
    methodOpt: plan.methodOpt || "none",
    /* v0.22.0: fieldwork conditions — weather/sea state for the logbook.
       v1.8.5-beta: climate-zoned via pickSeaCondition. */
    conditions: pickSeaCondition(plan.region, plan),
    encounters: []
  };
  $("launchBtn").disabled = true;
  $("diveView").classList.remove("hidden");
  $("diveActions").classList.add("hidden");
  $("diveActions").innerHTML = "";
  $("diveLog").innerHTML = "";
  $("diveShark").classList.add("hidden");

  const scene = $("diveScene");
  scene.className = "dive-scene " + DEPTHS[plan.depth].scene;
  renderScenery(plan.depth, plan.region);
  startAmbientLife(plan.depth, plan.region);
  const deep = plan.depth === "twilight" || plan.depth === "deep";

  const baitText = plan.bait === "plankton"
    ? "No bait — scanning the water for a plankton bloom…"
    : `Bait deployed: ${BAITS[plan.bait]}.`;

  logLine(`🛥️ <strong>Expedition begun</strong> — the research vessel leaves the harbor.`);
  await wait(1700);
  logLine(`🌤️ ${tripLog.conditions}`);
  await wait(1700);
  logLine(`🪝 ${baitText}`);
  await wait(1700);
  /* v0.9.0: the method in the water, if any. Neutral wording — no promises. */
  const methodText = (!plan.method || (plan.method === "attract" && (!plan.methodOpt || plan.methodOpt === "none")))
    ? "No attractant in the water — just the bait doing the talking."
    : plan.method === "aggregation"
      ? "Looking for the feeding aggregation — where the food is, the sharks will be."
      : `${METHODS.attract.opts[plan.methodOpt]} in the water.`;
  logLine(`🌊 ${methodText}`);
  await wait(1700);
  if (deep) {
    logLine(`⬇️ The water darkens as you descend. The surface light thins, then lets go.`);
    await wait(2000);
  }
  logLine(`🌊 ${pick(DEPTH_FLAVOUR[plan.depth])}`);
  await wait(2000);
  // The scene must feel alive before anything else: sightings always land.
  await showSighting(plan.depth);
  await wait(2100);
  logLine(`👀 ${REGIONS[plan.region].note}`);
  await wait(2000);

  const appeared = resolveEncounters(plan);
  const shown = new Set();
  const slots = 2 + Math.floor(Math.random() * 3); // 2–4 encounters
  let sawShark = false;
  let endedEarly = false;
  for (let i = 0; i < slots; i++) {
    $("diveShark").classList.add("hidden");
    if (i > 0) {
      /* v1.4.15-beta: time progresses across the trip — morning, afternoon, evening */
      const timeBeats = [
        `⏳ The morning wears on…`,
        `⏳ The afternoon stretches out…`,
        `⏳ Evening approaches…`
      ];
      logLine(deep
        ? `⏳ The hours slip by. The deep does not hurry, so neither do you.`
        : (timeBeats[i - 1] || timeBeats[timeBeats.length - 1]));
      await wait(2000);
    }
    await showSighting(plan.depth);
    await wait(1900);
    const s = pickEncounter(appeared, shown, plan);
    if (s) {
      shown.add(s.id);
      sawShark = true;
      const encResult = await doEncounter(s, plan);
      await wait(1200);
      /* v1.4.0-beta: tag-along ends the expedition. Stash the species so
         closeDive can focus the map AFTER trip completion. */
      if (encResult && typeof encResult === "object" && encResult.tagAlong) {
        endedEarly = true;
        state.pendingTagAlong = encResult.tagAlong;
        break;
      }
      if (encResult === true) { endedEarly = true; break; }
    } else {
      logLine(`👀 ${deal(tripDecks.waiting, WAITING_LINES)}`);
      await wait(1800);
    }
  }

  // Day's end — the trip closes naturally, or early if the player chose to head back.
  stopAmbientLife();
  $("diveShark").classList.add("hidden");
  if (endedEarly) {
    logLine(`⛵ You call it a day and turn for home — a good day on the water.`);
  } else {
    logLine(`🌅 The light changes. Time to head in — the day is done.`);
  }
  await wait(1800);
  if (!sawShark) {
    state.failures += 1;
    logLine(`<span class="miss">No sharks today. The sea keeps its counsel.</span>`, "miss");
    await wait(1200);
    /* v0.22.0: failed trips feel like fieldwork — warm, never punishing.
       v0.22.0 Mira review: persist the note so it survives in the logbook. */
    /* v1.2.0-beta: 1-2 field observations per failed trip — a day on the
       water always teaches something. Never a right/wrong signal. */
    const fieldNotes = [pickFieldNote(plan.region, plan)];
    if (Math.random() < 0.5) {
      const second = pickFieldNote(plan.region, plan);
      if (second !== fieldNotes[0]) fieldNotes.push(second);
    }
    fieldNotes.forEach(fn => logLine(`📓 <em>${fn}</em>`));
    if (tripLog) tripLog.fieldNote = fieldNotes.join(" ");
  } else {
    state.failures = 0;
  }
  /* v0.18.0: expedition count feeds the "Sea Legs" achievement. */
  state.stats.expeditions = (state.stats.expeditions || 0) + 1;
  saveStats();
  checkAchievements();
  advanceBruceChain(); // v0.23.0: slow-burn easter egg

  /* v0.8.0: close the logbook page for this trip.
     v0.22.0 Mira review: attach pin hint grounded in this completed expedition. */
  if (tripLog) {
    if (state.pinned) {
      const hint = pinHintForTrip(tripLog, state.pinned);
      if (hint) tripLog.pinHint = hint.hint;
    }
    state.logbook.unshift(tripLog);
    logStore.save(state.logbook);
    /* v2.7.14-beta: Fieldwork reads the logbook, so the check must run
       after this trip is recorded — the earlier call above runs before
       the unshift. Re-running is safe: earned ids are skipped. */
    checkAchievements();
    tripLog = null;
    renderLogbook();
  }

  const actions = $("diveActions");
  actions.classList.remove("hidden");
  actions.innerHTML = "";
  /* v0.13.0: the actual return-to-ship. One button, one job. */
  const closeDive = () => {
    actions.classList.add("hidden");
    actions.innerHTML = "";
    showPorthole();
    $("launchBtn").disabled = false;
    renderAll();
    /* v1.4.0-beta: tag-along — after the trip fully completes (log, achievements,
       cleanup all done exactly once), navigate to the map and focus the shark. */
    const tagAlongSid = state.pendingTagAlong || null;
    state.pendingTagAlong = null;
    const factInfo = state.pendingTagAlongFact;
    state.pendingTagAlongFact = null;
    /* v1.4.19-beta: Big Day — flush queued routine celebrations as one
       Phone thread (single or Big Day) before win/afterExpedition branching. */
    flushPendingCelebrations();
    if (state.pendingWin) {
      state.pendingWin = false;
      /* v1.4.0-beta Mira review (win-path edge case): the 50th tag + tag-along
         must not stack the map/fact overlay on the win ceremony. Defer until
         the finale is acknowledged (handled in winStep beat 4). */
      if (tagAlongSid) {
        state.deferredTagAlong = { speciesId: tagAlongSid, factInfo: factInfo };
      }
      doWin();
    } else {
      afterExpedition(plan);
      if (tagAlongSid) {
        goTab("map");
        /* v1.7.24-beta Mira review: Observe studied a DIFFERENT wild shark —
           do not focus the tagged individual's track. Follow/tag-along keep
           the focus. The mode rides on factInfo. */
        const isObserveClose = factInfo && factInfo.mode === "observe";
        if (!isObserveClose) {
          setTimeout(() => { try { ensureMapFocusedOn(tagAlongSid); } catch {} }, 200);
        }
        /* v1.4.0-beta Mira review (important): show the unlocked fact in a
           readable overlay with learned X/3 progression — at quick pace the
           dive-log line may never be read before auto-navigation. */
        if (factInfo) {
          setTimeout(() => showTagAlongFact(factInfo), 600);
        }
      }
    }
  };
  /* v0.13.0: the player already said "head back" once — don't ask again.
     Give the closing lines a beat to land, then close on their own. */
  if (endedEarly) {
    await wait(2200);
    closeDive();
    return;
  }
  const backBtn = document.createElement("button");
  backBtn.className = "secondary-button";
  backBtn.type = "button";
  backBtn.textContent = "⛵ Return to ship";
  backBtn.addEventListener("click", closeDive);
  actions.appendChild(backBtn);
}

/* v1.8.5-beta: expedition encounter size tiers — derived from each
   species' real max length (sizeRange[1]). Four fixed tiers, Avery's
   choice over proportional scaling. Collection art is untouched. */
function sizeTierFor(species) {
  const mx = species && species.sizeRange ? species.sizeRange[1] : 3;
  if (mx < 2) return "small";
  if (mx < 4) return "medium";
  if (mx < 6) return "large";
  return "xlarge";
}

/* ---------- Sightings log: watched, not tagged ----------
   v0.7.0: choosing "just watch" records a sighting — species, what it
   was doing, where and when. Spotted-but-not-tagged. Pure value, no
   progression mechanics attached. */
function recordSighting(species, plan) {
  const entry = {
    speciesId: species.id,
    name: species.name,
    doing: tripDecks ? deal(tripDecks.doing, SIGHTING_DOINES) : pick(SIGHTING_DOINES),
    location: REGIONS[plan.region].name,
    date: new Date().toLocaleDateString("fr-CA", { year: "numeric", month: "short", day: "numeric" }),
    ts: Date.now()
  };
  state.sightings.unshift(entry);
  sightStore.save(state.sightings);
  renderSightings();
  return entry;
}

function renderSightings() {
  const list = $("sightingsList");
  if (!list) return;
  list.innerHTML = "";
  if (!state.sightings.length) {
    list.innerHTML = `<div class="empty-note">No sightings yet.<br>Watch a shark without tagging it and it'll be logged here. 👁️</div>`;
    return;
  }
  /* v1.8.5-beta: cap the shown sightings — the list grows without bound.
     Latest first (state.sightings is unshifted); "Show more" reveals the rest. */
  const shown = state.sightings.slice(0, sightingsShown);
  shown.forEach(e => {
    const div = document.createElement("div");
    div.className = "sighting-entry";
    div.innerHTML = `
      <div class="sighting-name">👁️ ${esc(e.name)}</div>
      <div class="sighting-detail">${esc(e.doing)} — ${esc(e.location)}, ${esc(e.date)}</div>`;
    list.appendChild(div);
  });
  if (state.sightings.length > sightingsShown) {
    const more = document.createElement("button");
    more.type = "button";
    more.className = "secondary-button sightings-more";
    more.textContent = `👁️ Show more sightings (${state.sightings.length - sightingsShown} more)`;
    more.addEventListener("click", sightingsShowMore);
    list.appendChild(more);
  }
}

/* v1.8.5-beta: reveal the next page of field sightings. Extracted for testability. */
const SIGHTINGS_PAGE_SIZE = 10;
let sightingsShown = SIGHTINGS_PAGE_SIZE;
function sightingsShowMore() {
  sightingsShown += SIGHTINGS_PAGE_SIZE;
  renderSightings();
}

/* ---------- Re-sightings: your tagged sharks, seen again ----------
   v0.8.0: a tagged shark can reappear on a later dive in the right
   waters. Logging the re-sighting adds a field entry to the shark's
   collection card and extends its tracking story — warm, not a
   progression track. */
/* v1.7.24-beta Mira review: the persisted field note comes ONLY from
   FIELD_RESIGHT_NOTES — genuinely observational entries, no Sarah
   voice. Sarah's lines live in their own reaction pools and reach the
   player only through her chat bubble. */
const FIELD_RESIGHT_NOTES = [
  "En bonne santé et sans hâte.",
  "Une cicatrice fraîche sur la nageoire dorsale — il y a une histoire là-dessous.",
  "Taille légèrement supérieure à celle du marquage, à vue d'œil.",
  "Nage en compagnie d'un autre requin, cette fois.",
  "Toujours le même circuit tranquille : ce requin connaît bien les environs.",
  "S'est approché du bateau sans hésiter, comme pour l'examiner.",
  "S'alimente bien; bonne condition corporelle.",
  "La balise est toujours parfaitement en place. Bien joué, l'équipe d'autrefois!"
];

/* The one Sarah line that earns the player's food reply (Avery). */
const RESIGHT_LIKES_US_LINE = "Encore lui! Je commence à croire qu'il nous aime bien.";

/* v1.7.24-beta: Sarah's first-reunion closer variants. The original
   closer ("That's incredible!...") + Avery's four picks. These are
   Sarah's voice — conversational, affectionate — and are NEVER
   stored as the field note. They are delivered by
   maybeReunionReaction() — the reaction that ACTUALLY fires on
   first reunion. The four picks used to live in a resightThread
   ordinal-1 branch that never ran in the normal flow (the reunion
   reaction fires first and Log skips the thread), so they moved here
   where they have a reliable delivery point. One thread per encounter. */
const RESIGHT_REUNION_CLOSERS = [
  "C'est incroyable! Ce requin est revenu! J'en ai presque les larmes aux yeux. 🥹",
  "Ah wow, il est revenu! Je pensais justement à lui.",
  "Le même trajet, encore. Certains requins ont leurs habitudes et franchement? Moi aussi.",
  "La balise tient toujours. Ce requin porte pratiquement un Fitbit et semble en pleine forme.",
  "Encore lui! Je commence à croire qu'il nous aime bien.",
  "C'est vraiment ce requin! La balise le confirme. J'ai des frissons.",
  "Encore une réobservation! C'est exactement pour ces moments que j'aime le marquage : on sait qu'on retrouve le même individu.",
  "Le même requin, la même eau. Comme retrouver un vieil ami. En mieux.",
  "Je savais que cette balise servirait! Bon retour, mon vieil ami.",
  "Le même requin qui nage encore. C'est tout ce qu'on espérait apprendre en le marquant."
];

/* The generic closer — fallback for resightThread ordinal 1, which
   only runs in unusual histories (an earlier encounter consumed the
   reunion reaction without logging a re-sighting). */
const RESIGHT_GENERIC_CLOSER = "C'est ce qu'il y a de plus beau dans le marquage : on peut savoir qu'on revoit le même individu. Tu penses que ce requin t'a reconnu?";

/* v1.7.24-beta: tiered re-sighting reactions — Sarah gets more excited
   as she sees the same shark again. 2nd re-sighting: warm recognition.
   3rd: the THREE lines, once only. 4th+: generic best-friend
   energy (no counts, so the lines stay true). Tiers count
   RE-sightings (ordinal = resightings.length, after logging). */
const RESIGHT_NOTES_2ND = [
  "Il est revenu! J'espérais tellement le revoir.",
  "Deuxième réobservation! OK, ce requin revient souvent.",
  "Hé, encore une visite! Je commence à reconnaître ce requin entre mille.",
  "De retour pour la deuxième fois! Ce requin devient un habitué.",
  "Deux fois! Soit il aime cet endroit, soit il nous aime bien. Peut-être les deux.",
  "Deux réobservations! Ce requin est officiellement sur notre radar.",
  "Encore! Je commence à avoir l'impression de connaître ce requin.",
  "Deuxième fois avec ce requin. La balise ne ment pas."
];

/* v2.7.5-fix (Avery): the THREE lines fire ONLY on the 3rd re-sighting —
   the old >= 3 tier repeated them at every later reunion, so Sarah said
   "THIRD TIME!" again on the 4th. 4th+ reunions use the generic excited
   pool below, which never counts. */
const RESIGHT_NOTES_3RD = [
  "TROIS RÉOBSERVATIONS?! Ce requin fait presque partie de la famille maintenant. Je lui donne un surnom dans ma tête et personne ne peut m'en empêcher.",
  "OK, c'est officiellement une amitié. Trois réobservations, ça veut dire que ce requin nous connaît. Quelle amitié, vraiment!",
  "Troisième réobservation! Je danse un petit peu de joie. Ce requin revient nous dire bonjour!",
  "Trois réobservations du même requin! Tu comprends à quel point c'est spécial?? On dirait que ce requin nous choisit!",
  "TROIS RÉOBSERVATIONS! Ce requin est devenu un habitué. Je me suis vraiment attachée."
];

/* Generic best-friend energy for the 4th re-sighting onward — no counts,
   so these lines stay true no matter how many times the shark returns. */
const RESIGHT_NOTES_EXCITED = [
  "ENCORE une visite! Je pense que ce requin nous a adoptés. On est ses humains maintenant.",
  "Ce requin revient toujours! Je ne dis pas qu'on est inséparables, mais on est inséparables.",
  "Encore ce requin! On connaît son endroit préféré, et quelle chance!"
];
/* French sex-aware variants (slot numbers are 1-based; male/unknown uses the base array). Slot-first pick is preserved: the slot is chosen, then the variant renders. */
const RESIGHT_LIKES_US_LINE_FEMALE = "Encore elle! Je commence à croire qu'elle nous aime bien.";
const RESIGHT_REUNION_CLOSERS_FEMALE = {
  "2": "Ah wow, elle est revenue! Je pensais justement à elle.",
  "5": "Encore elle! Je commence à croire qu'elle nous aime bien.",
  "8": "Le même requin, la même eau. Comme retrouver une vieille amie. En mieux.",
  "9": "Je savais que cette balise servirait! Bon retour, ma vieille amie."
};
const RESIGHT_NOTES_2ND_FEMALE = {
  "1": "Elle est revenue! J'espérais tellement la revoir.",
  "5": "Deux fois! Soit elle aime cet endroit, soit elle nous aime bien. Peut-être les deux."
};
;

/* Pick Sarah's re-sighting reaction by which re-sighting this is
   (1-based re-sighting ordinal for this individual). Used ONLY in
   Sarah's chat bubble (resightThread) — never in the persisted
   field note, so the player never speaks Sarah's lines.
   1st: the generic closer only — the first-reunion closer variants
   (RESIGHT_REUNION_CLOSERS) are delivered by maybeReunionReaction(),
   which fires on the actual first reunion; resightThread ordinal 1
   only runs in unusual histories (an earlier encounter consumed the
   reunion reaction without logging a re-sighting). */
function resightSarahReactionFor(ordinal, rec) {
  const female = rec && rec.sex === "female";
  if (ordinal === 3) return pick(RESIGHT_NOTES_3RD);
  if (ordinal >= 4) return pick(RESIGHT_NOTES_EXCITED);
  if (ordinal === 2) {
    const pool = RESIGHT_NOTES_2ND;
    let idx = Math.floor(Math.random() * pool.length);
    if (female && RESIGHT_NOTES_2ND_FEMALE[idx + 1]) return RESIGHT_NOTES_2ND_FEMALE[idx + 1];
    return pool[idx];
  }
  return RESIGHT_GENERIC_CLOSER;
}

function recordResighting(species, plan) {
  const t = state.tagged[species.id];
  t.resightings = t.resightings || [];
  /* v1.7.24-beta Mira review: entry.note is the player's field note —
     always from FIELD_RESIGHT_NOTES (observational only). Sarah's
     reactions live in her own chat bubble (resightThread), never in
     the persisted record, so the player never speaks Sarah's lines. */
  const entry = {
    date: new Date().toLocaleDateString("fr-CA", { year: "numeric", month: "short", day: "numeric" }),
    location: REGIONS[plan.region].name,
    note: pick(FIELD_RESIGHT_NOTES),
    ts: Date.now()
  };
  t.resightings.push(entry);
  /* v1.8.7-beta: re-sightings stay OFF the movement track. They are the
     player's encounters, not tag movement — appending them flattened the
     track graph ("like the shark stopped travelling"). The track shows
     travel only; re-sightings live in the logbook and the Collection
     re-sightings list. */
  store.save(state.tagged);
  /* v0.18.0: re-sights feed the "Old Friend" achievement. */
  state.stats.resights = (state.stats.resights || 0) + 1;
  saveStats();
  checkAchievements();
  renderCollection();
  return entry;
}

/* A re-sighting gets its own little celebration — species-relevant,
   like every other Sarah moment after a tag. */
function resightThread(species, rec) {
  const label = rec.name ? rec.name : rec.researchId;
  const last = rec.resightings[rec.resightings.length - 1];
  const ordinal = rec.resightings.length;
  const thread = [
    { who: "them", text: `You saw ${label} again? The ${species.name.toLowerCase()}?` },
    /* The player's bubble reports the field note only — never Sarah's lines. */
    { who: "me", text: `${species.name}, off ${last.location}. ${last.note}` },
  ];
  /* v1.7.24-beta Mira review: Sarah's reaction goes in HER bubble.
     2nd+ re-sightings use the tiered pools. The first-reunion closer
     variants (incl. the likes-us line) are delivered by
     maybeReunionReaction(), not here — so resightThread never
     appends the food reply; that gating lives in
     reunionReactionThread(). */
  const sarahLine = resightSarahReactionFor(ordinal, rec);
  thread.push({ who: "them", text: sarahLine });
  return thread;
}

/* The player's food reply follows ONLY Sarah's "I think it likes us"
   line (Avery) — it answers that specific claim, so it would be a
   non sequitur after any other reaction. Returns null otherwise.
   Pronoun matches the shark's recorded sex; "it" when unknown. */
function resightFoodReplyFor(sarahLine, rec) {
  if (sarahLine !== RESIGHT_LIKES_US_LINE && sarahLine !== RESIGHT_LIKES_US_LINE_FEMALE) return null;
  const pron = rec && rec.sex === "female" ? "elle" : rec && rec.sex === "male" ? "lui" : "ce requin";
  return `Peut-être. Ou peut-être que c'est ${pron} qui sait où trouver à manger.`;
}
/* v1.5.3-beta: one-time Sarah reaction to first reunion per species.
   Warm, not spammy — only fires once per species, ever.
   The closer is picked from RESIGHT_REUNION_CLOSERS (the original
   closer + Avery's four variants), so every first reunion gets a
   fresh Sarah line at a reliable delivery point. */
/* Pure: build the first-reunion thread for a given closer. The
   player's food reply follows ONLY the "I think it likes us" line
   (Avery) — it answers that specific claim, so it would be a
   non sequitur after any other closer. */
function reunionReactionThread(name, closer, rec) {
  const thread = [
    { who: "them", text: `WAIT. You saw ${name} again?!?` },
    { who: "me", text: `The tag matched — it's really them.` },
    { who: "them", text: closer }
  ];
  const foodReply = resightFoodReplyFor(closer, rec);
  if (foodReply) thread.push({ who: "me", text: foodReply });
  return thread;
}
/* v1.8.5-beta: index of the last-dealt reunion closer — maybeReunionReaction
   never repeats a closer twice in a row. Module-level (not persisted). */
let lastReunionCloserIdx = -1;
function maybeReunionReaction(species, rec) {
  state.reunionReacted = state.reunionReacted || {};
  /* v1.6.7-beta: returns whether the thread fired, so the resight button
     can skip its own thread when the reunion reaction already spoke. */
  if (state.reunionReacted[species.id]) return false;
  /* v2.5.6-beta: per-individual mention cooldown — this sighting weighs
     one more than the shark's recorded sightings. If a mention of equal
     or greater weight landed inside 15 minutes, hold the one-time
     reaction (flag unburned) for a later reunion instead. */
  const sightW = ((rec && rec.resightings) || []).length + 1;
  if (sharkMentionBlocked(species.id, sightW)) return false;
  state.reunionReacted[species.id] = true;
  try { localStorage.setItem("tyi-reunion-reacted", JSON.stringify(state.reunionReacted)); } catch {}
  /* v1.5.8-beta: unnamed sharks are called by research tag ID, not species name.
     v1.7.32-beta Mira fix: pass the RAW nickname — renderMessages()
     escapes once at the render boundary. Escaping here would double-
     escape (e.g. "Fin & Tonic" stored as "Fin &amp; Tonic", rendered
     as "Fin &amp;amp; Tonic"). */
  const name = rec.name ? rec.name : (rec.researchId || species.name);
  /* v1.8.5-beta: never deal the same reunion closer twice in a row —
     Avery saw "literally just thinking about this one" twice running. */
  let ci = Math.floor(Math.random() * RESIGHT_REUNION_CLOSERS.length);
  if (RESIGHT_REUNION_CLOSERS.length > 1 && ci === lastReunionCloserIdx) ci = (ci + 1) % RESIGHT_REUNION_CLOSERS.length;
  lastReunionCloserIdx = ci;
  const closerText = (rec && rec.sex === "female" && RESIGHT_REUNION_CLOSERS_FEMALE[ci + 1]) ? RESIGHT_REUNION_CLOSERS_FEMALE[ci + 1] : RESIGHT_REUNION_CLOSERS[ci];
  if (pushThread(reunionReactionThread(name, closerText, rec))) {
    noteSharkMention(species.id, sightW);
  }
  return true;
}

/* ---------- Sarah remembers sharks by name ----------
   v0.8.0: between expeditions she sometimes checks in about one of
   your NAMED sharks. Genuine family conversation — the fact stays
   with the species she asked about. */
const NAMED_CHECKINS = [
  /* v0.12.0 voice pass: the cousin who remembers, calmly.
     v1.8.0-beta Mira blocker: the hook is a LOCKED insight now, so
     each template carries a neutral meLocked fallback. The hook text
     is used only when that insight is already unlocked (see
     maybeCheckinThread) — Sarah must never leak an unearned insight
     in ordinary Phone chat while Collection still shows it locked. */
  { them: "Hé, comment va {name}? Je pensais justement à cette espèce : {species}.",
    me: "Toujours là quelque part, avec sa balise. {hook}",
    meLocked: "Toujours là quelque part. Rien de nouveau, juste la vie de requin." },
  { them: "Tu crois que {name} se souvient de toi?",
    me: "Si les requins gardent rancune aux bateaux, je vais avoir des ennuis. {hook}",
    meLocked: "Si les requins gardent rancune aux bateaux, je vais avoir des ennuis. Pas de nouvelles, par contre." },
  { them: "Des nouvelles de {name}? J'aimerais en savoir plus sur l'espèce {species}.",
    me: "Rien de nouveau à raconter aujourd'hui. Probablement occupé à être un requin. {hook}",
    meLocked: "Rien de nouveau à raconter aujourd'hui. Probablement occupé à être un requin." },
  /* v1.8.5-beta: five more variants — with only three templates the
     "remembers you" line dominated. Sarah has more to say than that. */
  { them: "J'ai rêvé de {name} cette nuit. Enfin, j'ai rêvé de la carte de suivi. Ça revient au même.",
    me: "On a tous les deux cette carte dans la tête maintenant. {hook}",
    meLocked: "On a tous les deux cette carte dans la tête maintenant. Toujours sur la carte." },
  { them: "Est-ce que tu te demandes parfois ce que fait {name} à cet instant précis?",
    me: "Des affaires de requin, j'imagine. {hook}",
    meLocked: "Des affaires de requin, j'imagine. C'est son métier." },
  { them: "Quelqu'un m'a demandé quel était mon requin préféré et j'ai répondu {name}. Ne le dis pas aux autres.",
    me: "Ton secret est bien gardé. {hook}",
    meLocked: "Ton secret est bien gardé. Il nage toujours quelque part." },
  { them: "J'ai regardé un documentaire et j'ai passé mon temps à penser « c'est pas comme ça que {name} ferait ».",
    me: "Tu ne jures plus que par les requins. {hook}",
    meLocked: "Tu ne jures plus que par les requins. Aucun regret." },
  { them: "Petite question : si {name} pouvait parler, qu'est-ce qu'il dirait de nous?",
    me: "« Arrêtez de me coller des balises. » {hook}",
    meLocked: "« Arrêtez de me coller des balises. » Je le comprendrais." }
];

/* v1.8.5-beta: index of the last-dealt named check-in — maybeCheckinThread
   never repeats a template twice in a row. Module-level (not persisted);
   a reload just resets the guard, it never breaks content. */
let lastCheckinIdx = -1;
/* v2.5.6-beta: species of the check-in built by maybeCheckinThread(),
   so afterExpedition can log the mention only if the thread is sent. */
let pendingCheckinSpeciesId = null;
function maybeCheckinThread() {
  pendingCheckinSpeciesId = null;
  /* v2.5.4-beta fix (Mira review): check-ins must respect the species
     coherence rule — only named individuals of the pinned or
     just-encountered species, not any old tagged shark. */
  const allowedIds = new Set();
  if (state.pinned) allowedIds.add(state.pinned);
  const lastTrip = (state.logbook || [])[0];
  if (lastTrip && lastTrip.encounters) {
    for (const e of lastTrip.encounters) if (e.speciesId) allowedIds.add(e.speciesId);
  }
  /* v2.5.6-beta: and never about an individual Sarah mentioned in the
     last 15 minutes (per-individual cooldown; a check-in weighs 0, so
     any recent mention blocks it). */
  const named = SHARKS.filter(s => state.tagged[s.id] && state.tagged[s.id].name && allowedIds.has(s.id)
    && !sharkMentionBlocked(s.id, 0));
  if (!named.length || Math.random() > 0.4) return null;
  /* v2.5.6-beta: weighted pick — each recorded sighting adds weight,
     so the individuals she knows best come up most often. One RNG draw,
     same as pick(). */
  let totalW = 0;
  const weights = named.map(s => { const w = 1 + ((state.tagged[s.id].resightings || []).length); totalW += w; return w; });
  let r = Math.random() * totalW;
  let s = named[named.length - 1];
  for (let i = 0; i < named.length; i++) { r -= weights[i]; if (r < 0) { s = named[i]; break; } }
  pendingCheckinSpeciesId = s.id;
  const rec = state.tagged[s.id];
  /* v1.8.5-beta: never deal the same check-in twice in a row — with a
     small pool, repeats read as Sarah having only one thing to say. */
  let ci = Math.floor(Math.random() * NAMED_CHECKINS.length);
  if (NAMED_CHECKINS.length > 1 && ci === lastCheckinIdx) ci = (ci + 1) % NAMED_CHECKINS.length;
  lastCheckinIdx = ci;
  const t = NAMED_CHECKINS[ci];
  /* v1.8.0-beta: the hook is insight index SECRET_FACTS.length for this
     species (hook appends first in insightPoolFor). Only quote it when
     the player has earned it; otherwise use the neutral fallback. */
  const hookIdx = (typeof SECRET_FACTS !== "undefined" && SECRET_FACTS[s.id] || []).length;
  const hookUnlocked = (state.unlockedFacts[s.id] || []).includes(hookIdx);
  const meText = hookUnlocked ? t.me : t.meLocked;
  const fill = (str) => str
    .replaceAll("{name}", rec.name)
    .replaceAll("{species}", s.name.toLowerCase())
    .replaceAll("{hook}", s.hook);
  return [
    { who: "them", text: fill(t.them) },
    { who: "me", text: fill(meText) }
  ];
}

/* ---------- Expedition logbook: the scientist's notebook ----------
   v0.9.0: every trip lands here — plan (region/depth/bait/method),
   encounters and outcome. Compare attempts; the pattern is the answer. */
/* v0.22.0: logbook filters — outcome, region, species. Filters narrow the
   notebook; they never solve the expedition. */
const logbookFilters = { outcome: "all", region: "all", species: "all", dateRange: "all" };
/* v1.8.4-beta: logbook pagination — the logbook is the largest unbounded DOM
   list, and rendering every trip ever made post-expedition renders slower as
   the save grows. Show the latest LOGBOOK_PAGE_SIZE trips; "Show older trips"
   reveals more. Changing filters resets the page. */
const LOGBOOK_PAGE_SIZE = 30;
let logbookShown = LOGBOOK_PAGE_SIZE;

/* Pure: does a logbook trip entry match the given filters? Testable. */
/* v0.22.0 Mira review: filters represent EVENTS within the expedition.
   - "tagged": any tagged encounter (trip may also have others)
   - "resighted": any re-sighted encounter
   - "watched": any watched (just watch) encounter
   - "followed": any tag-along follow encounter
   - "missed": no shark encounters at all
   A trip with multiple outcomes appears in each relevant filter. */
function logbookTripMatches(t, f) {
  if (f.outcome !== "all") {
    const enc = t.encounters || [];
    if (f.outcome === "tagged" && !enc.some(e => e.result === "tagged")) return false;
    if (f.outcome === "resighted" && !enc.some(e => e.result === "resighted")) return false;
    if (f.outcome === "watched" && !enc.some(e => e.result === "watched")) return false;
    if (f.outcome === "followed" && !enc.some(e => e.result === "followed")) return false;
    if (f.outcome === "missed" && enc.length > 0) return false;
  }
  if (f.region !== "all" && t.region !== f.region) return false;
  if (f.species !== "all" && !(t.encounters || []).some(e => e.speciesId === f.species)) return false;
  if (f.dateRange && f.dateRange !== "all") {
    /* v1.3.0-beta Mira review: trips without a timestamp are excluded
       when a date filter is active (they can't prove they're recent). */
    if (!t.ts) return false;
    const age = Date.now() - t.ts;
    const day = 86400000;
    if (f.dateRange === "7d" && age > 7 * day) return false;
    if (f.dateRange === "30d" && age > 30 * day) return false;
    if (f.dateRange === "1y" && age > 365 * day) return false;
  }
  return true;
}

/* Pure: logbook species options in alphabetical order. The dropdown is
   a 50-entry list to scan, so A–Z beats roster order for finding one.
   Returns a sorted copy — the SHARKS roster order itself (research tab
   untagged-first, expedition lists) is untouched. "All species" stays
   first because it is static markup in index.html, not built here. */
function logbookSpeciesOptions() {
  return [...SHARKS].sort((a, b) => a.name.localeCompare(b.name));
}

function buildLogbookFilters() {
  const rs = $("logFilterRegion"), ss = $("logFilterSpecies");
  if (rs && rs.options && rs.options.length <= 1) {
    Object.entries(REGIONS).forEach(([id, r]) => {
      const o = document.createElement("option");
      o.value = id; o.textContent = r.name;
      rs.appendChild(o);
    });
  }
  if (ss && ss.options && ss.options.length <= 1) {
    logbookSpeciesOptions().forEach(s => {
      const o = document.createElement("option");
      o.value = s.id; o.textContent = s.name;
      ss.appendChild(o);
    });
  }
  ["logFilterOutcome", "logFilterRegion", "logFilterSpecies", "logFilterDate"].forEach(id => {
    const el = $(id);
    if (el && !el.dataset.bound) {
      el.dataset.bound = "1";
      el.addEventListener("change", () => {
        logbookFilters.outcome = $("logFilterOutcome").value;
        logbookFilters.region = $("logFilterRegion").value;
        logbookFilters.species = $("logFilterSpecies").value;
        logbookFilters.dateRange = $("logFilterDate").value;
        logbookShown = LOGBOOK_PAGE_SIZE; // v1.8.4-beta: filters reset the page
        renderLogbook();
      });
    }
  });
  const clr = $("logFilterClear");
  if (clr && !clr.dataset.bound) {
    clr.dataset.bound = "1";
    clr.addEventListener("click", () => {
      logbookFilters.outcome = "all"; logbookFilters.region = "all"; logbookFilters.species = "all"; logbookFilters.dateRange = "all";
      $("logFilterOutcome").value = "all"; $("logFilterRegion").value = "all"; $("logFilterSpecies").value = "all"; $("logFilterDate").value = "all";
      logbookShown = LOGBOOK_PAGE_SIZE; // v1.8.4-beta: clearing filters resets the page
      renderLogbook();
    });
  }
}

function renderLogbook() {
  const list = $("logbookList");
  if (!list) return;
  buildLogbookFilters();
  list.innerHTML = "";
  const trips = state.logbook.filter(t => logbookTripMatches(t, logbookFilters));
  const anyFilter = logbookFilters.outcome !== "all" || logbookFilters.region !== "all" || logbookFilters.species !== "all" || logbookFilters.dateRange !== "all";
  const clr = $("logFilterClear");
  if (clr) clr.classList.toggle("hidden", !anyFilter);
  if (!state.logbook.length) {
    list.innerHTML = `<div class="empty-note">No expeditions logged yet.<br>Every trip lands here — plan, encounters, outcome. 📓</div>`;
    return;
  }
  if (!trips.length) {
    list.innerHTML = `<div class="empty-note">No trips match those filters.<br>Try clearing something — the ocean is bigger than it looks.</div>`;
    return;
  }
  /* v1.8.4-beta: cap the rendered trips — the logbook grows without bound and
     re-rendering all of it after every expedition got slower as the save grew.
     Latest trips first; "Show older trips" reveals more. */
  const shown = trips.slice(0, logbookShown);
  shown.forEach(t => {
    const div = document.createElement("div");
    div.className = "logbook-entry";
    const planBits = [
      REGIONS[t.region] ? REGIONS[t.region].name : t.region,
      DEPTHS[t.depth] ? DEPTHS[t.depth].name : t.depth,
      BAITS[t.bait] || t.bait,
      /* v0.9.0: method; pre-v0.9.0 entries stored `lure` — render those
         with the legacy labels so old trips still read sensibly.
         v0.9.1: the planner lets Method stay unpicked (sub-menu hidden) —
         those trips log method:"" and read as "No method chosen". */
      (t.method && METHODS[t.method])
        ? `${METHODS[t.method].name} — ${METHODS[t.method].opts[t.methodOpt] || LEGACY_LURES[t.methodOpt] || t.methodOpt}`
        : ("method" in t ? "Aucune méthode choisie"
          : (t.lure && t.lure !== "none" ? LEGACY_LURES[t.lure] || t.lure : "Aucun attractant"))
    ];
    const enc = t.encounters.length
      ? t.encounters.map(e => {
          const icon = e.result === "tagged" ? "🏷️" : e.result === "resighted" ? "🔁" : e.result === "followed" ? "🧭" : "👁️";
          const idBit = e.researchId ? ` <span class="dim">🔬 ${esc(e.researchId)}</span>` : "";
          /* v1.8.5-beta fix (Mira review): show the nickname ONLY when this
             encounter is positively the same tagged individual (researchId
             match). A "watched"/"observed" encounter may be a different wild
             shark of the same species — that stays species-only; never
             invent identity. Legacy entries without an individual ID also
             stay species-only. */
          const taggedRec = state.tagged[e.speciesId];
          const sameIndividual = !!(e.researchId && taggedRec && taggedRec.researchId === e.researchId);
          const nickBit = (sameIndividual && taggedRec.name) ? ` <span class="dim">· ${esc(taggedRec.name)}</span>` : "";
          return `${icon} ${esc(e.name)}${nickBit}${idBit} <span class="dim">(${e.result})</span>`;
        }).join("<br>")
      : `<span class="dim">No sharks today.</span>`;
    div.innerHTML = `
      <div class="logbook-date">🛥️ ${esc(t.date)}</div>
      <div class="logbook-plan">${planBits.map(esc).join(" · ")}</div>
      ${t.conditions ? `<div class="logbook-conditions latin">🌤️ ${esc(t.conditions)}</div>` : ""}
      ${t.fieldNote ? `<div class="logbook-fieldnote latin">🔭 ${esc(t.fieldNote)}</div>` : ""}
      <div class="logbook-enc">${enc}</div>
      ${t.pinHint ? `<div class="logbook-pinhint"><span class="pin-hint-icon">📓</span> <em>${esc(t.pinHint)}</em></div>` : ""}
      <button type="button" class="repeat-btn" data-repeat>🔁 Repeat this plan</button>`;
    const rb = div.querySelector("[data-repeat]");
    if (rb) rb.addEventListener("click", () => repeatPlan(t));
    list.appendChild(div);
  });
  if (trips.length > logbookShown) {
    const more = document.createElement("button");
    more.type = "button";
    more.className = "secondary-button logbook-more";
    more.textContent = `📓 Show older trips (${trips.length - logbookShown} more)`;
    more.addEventListener("click", logbookShowOlder);
    list.appendChild(more);
  }
}

/* v1.8.4-beta: reveal the next page of logbook trips. Extracted for testability. */
function logbookShowOlder() {
  logbookShown += LOGBOOK_PAGE_SIZE;
  renderLogbook();
}

/* v1.7.13-beta: resolve the restored method option — legacy "seal" plans
   map to chum. Extracted for testability. */
function resolveRestoredMethodOpt(t) {
  return t.method === "attract" ? "chum" : (t.methodOpt || "none");
}

/* v0.20.0: repeat a logged expedition's plan — restores region, depth, bait
   and method into the planner and jumps to the Expedition tab. Values that
   no longer exist (e.g. a re-locked region) are skipped, never forced. */
function repeatPlan(t) {
  if (!t) return;
  const set = (id, val) => {
    const el = $(id);
    if (!el || val == null || val === "") return false;
    if ([...el.options].some(o => o.value === val && !o.disabled)) {
      el.value = val;
      el.dispatchEvent(new Event("change"));
      return true;
    }
    return false;
  };
  set("regionSelect", t.region);
  set("depthSelect", t.depth);
  set("baitSelect", t.bait);
  /* Method select's change handler fills the sub-options synchronously,
     so the opt can be set right after. v0.20.0 Mira review fix: a saved
     expedition with no method restores NO method — it must not retain
     whatever was previously picked in the planner. */
  if (set("methodSelect", t.method || "")) {
    /* v1.6.12-beta: attract restores as chum; legacy "seal" plans map to chum. */
    set("methodOptSelect", resolveRestoredMethodOpt(t));
  } else {
    const ms = $("methodSelect");
    if (ms && !t.method) { ms.value = ""; ms.dispatchEvent(new Event("change")); }
  }
  goTab("expedition");
}

function updateMsgBadge() {
  const b = $("msgBadge");
  b.textContent = state.unread;
  b.classList.toggle("hidden", state.unread === 0);
  /* v1.4.0: the unread state is announced as text, not red-alone. */
  const tab = document.querySelector('.tab[data-tab="phone"]');
  if (tab) {
    tab.setAttribute("aria-label", state.unread > 0
      ? "Phone, " + state.unread + " unread conversation" + (state.unread === 1 ? "" : "s")
      : "Téléphone");
  }
}

/* v1.5.1: batched rendering — build the whole thread list as one HTML string
   and set innerHTML once, so the phone doesn't visibly grow in stages. */
function renderMessages() {
  const list = $("messagesList");
  if (!state.messages.length) {
    list.innerHTML = `<div class="empty-note">No messages yet.<br>Sarah will text you between expeditions. 💬</div>`;
    return;
  }
  let html = "";
  state.messages.forEach(thread => {
    const stamp = thread.ts
      ? `<div class="thread-stamp">${esc(fmtTime(thread.ts))}</div>`
      : "";
    html += `<div class="thread">${stamp}<div class="phone-thread">`;
    thread.msgs.forEach(m => {
      html += `<div class="bubble ${esc(m.who)}">${esc(m.text)}</div>`;
    });
    html += `</div></div>`;
  });
  list.innerHTML = html;
  // Like a real chat: oldest at top, newest at the bottom, pinned to the latest.
  list.scrollTop = list.scrollHeight;
}

/* v0.7.0: no target species anymore, so the nudge picks an untagged
   shark to point at — a useful direction, not a correction. */
/* v0.12.0: contextual hints. Sarah pays attention to where you've been
   searching — hints and chats prefer species from the player's most recent
   expedition region, so she talks about the shark you're actually after
   instead of spamming the whole roster. Falls back to the full roster when
   there's no recent region (or nothing untagged there). */
function regionalSpecies(onlyUntagged) {
  const pool = onlyUntagged ? untagged() : SHARKS;
  if (state.lastRegion) {
    const local = pool.filter(s => regionList(s).includes(state.lastRegion));
    if (local.length) return local;
  }
  return pool.length ? pool : SHARKS;
}
function pickChat() {
  const pool = sarahSpeciesPool(COUSIN_CHATS);
  if (!pool.length) {
    /* No pinned/encountered species with chats — generic, no species named. */
    return pick(GENERIC_CHATS);
  }
  const s = pick(pool);
  const chats = COUSIN_CHATS[s.id];
  const seen = state.chatSeen[s.id] || 0;
  state.chatSeen[s.id] = seen + 1;
  return chats[seen % chats.length];
}
/* v2.5.4-beta: Sarah's species coherence (Avery) — she only names a
   particular shark species when it's (1) the pinned species on the
   research tab, or (2) just encountered in the most recent expedition.
   Achievement texts are exempt from this rule. */
function sarahSpeciesPool(chatsObj) {
  const allowed = new Set();
  if (state.pinned && chatsObj[state.pinned]) allowed.add(state.pinned);
  const lastTrip = (state.logbook || [])[0];
  if (lastTrip && lastTrip.encounters) {
    for (const e of lastTrip.encounters) {
      if (e.speciesId && chatsObj[e.speciesId]) allowed.add(e.speciesId);
    }
  }
  return [...allowed].map(id => SHARKS.find(s => s.id === id)).filter(Boolean);
}
/* Generic Sarah chats — no species named, for when there's no pinned or
   recently-encountered species with authored chats. */
const GENERIC_CHATS = [
  { them: "La mer est toute calme aujourd'hui. C'est une belle journée juste pour être sur l'eau.", me: "L'océan n'a pas toujours quelque chose à nous donner." },
  { them: "Je lisais encore sur le gigantisme des grands fonds. Tout est plus gros là-dessous. Tout.", me: "Les abysses voient tout en grand." },
  { them: "Est-ce que ça t'arrive de regarder l'eau sans penser aux requins une seule seconde? ... Non? Moi non plus.", me: "J'ai toujours des requins en tête." },
];
/* ---------- Sarah's Big Day (v1.4.19-beta) ----------
   When an expedition tags multiple first-time species, ONE authored Big Day
   conversation replaces the routine per-species celebrations. Design: PR #44.
   - 0 new species: nothing (existing no-tag behavior)
   - 1 new species: existing opener + research ID + cheer, at trip end
   - 2/3/4 new species: one Big Day conversation from the tier pool
   - Lemon shark in the mix: lemon-aware variant (no second thread)
   No-repeat via per-tier shuffled bags persisted in state.bigDayBags. */

/* "a nurse shark" / "an oceanic whitetip" — simple vowel check. */
function bigDayArticle(name) {
  return /^[aeiou]/i.test(name.trim()) ? "an" : "a";
}

/* "a nurse shark and a lemon shark" / "a, b, and c" — discovery order. */
function formatSpeciesList(events) {
  const parts = events.map(e => `${bigDayArticle(e.speciesName)} ${e.speciesName.toLowerCase()}`);
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return parts.slice(0, -1).join(", ") + ", and " + parts[parts.length - 1];
}

/* Deal one conversation index from a tier's no-repeat bag. Reshuffles when
   exhausted. Bags persist in state so Sarah doesn't repeat across trips. */
function dealBigDayIndex(tierKey) {
  if (!state.bigDayBags) state.bigDayBags = {};
  let bag = state.bigDayBags[tierKey];
  const poolSize = BIG_DAY[tierKey].length;
  if (!bag || bag.length === 0) {
    bag = Array.from({ length: poolSize }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = bag.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [bag[i], bag[j]] = [bag[j], bag[i]];
    }
  }
  const idx = bag.pop();
  state.bigDayBags[tierKey] = bag;
  saveMsgs(); // persist the bag
  return idx;
}

/* Pure function: build the Big Day thread from queued celebration events.
   Returns array of {who, text} with placeholders resolved. Testable. */
function buildBigDayThread(events) {
  const count = events.length;
  const hasLemon = events.some(e => e.speciesId === "lemon");
  const tierKey = hasLemon ? "lemon" : Math.min(count, 4);
  const pool = BIG_DAY[tierKey];
  // For tests: allow deterministic selection via last arg; live code deals.
  const idx = dealBigDayIndex(tierKey);
  const convo = pool[idx % pool.length];
  const speciesList = formatSpeciesList(events);
  return convo.map(m => ({
    who: m.who,
    text: m.text.replace(/{speciesList}/g, speciesList).replace(/{count}/g, String(count))
  }));
}

/* Flush queued routine celebrations at trip end. Called from closeDive on the
   guaranteed trip-completion path (normal end + early Head back + tag-along).
   Fires exactly one Phone thread: single celebration or Big Day. */
function flushPendingCelebrations() {
  const events = state.pendingCelebrations || [];
  state.pendingCelebrations = [];
  /* v1.5.0-beta: clear persisted copy — flushed means delivered. */
  celebrationStore.clear();
  if (events.length === 0) return;
  if (events.length === 1) {
    /* v1.6.10-beta: throttle single-shark congratulations — Sarah cheers a
       lone tag at most once every 3 expeditions so she doesn't become
       annoying. The tag itself still counts; she just doesn't always text.
       Big Day (2+) threads below are NOT throttled. */
    const exp = (state.stats && typeof state.stats.expeditions === "number") ? state.stats.expeditions : 0;
    const last = state.lastSingleCheerExp;
    if (last === null || last === undefined || exp - last >= 3) {
      const e = events[0];
      pushThread([
        { who: "them", text: e.opener },
        { who: "me", text: `A ${e.speciesName} — ${e.length} metres, ${e.sex}. Research ID ${e.researchId}.` },
        { who: "them", text: e.cheer }
      ]);
      state.lastSingleCheerExp = exp;
      saveMsgs();
    }
  } else {
    // 2+ new species: one Big Day conversation.
    pushThread(buildBigDayThread(events));
  }
}

function afterExpedition(plan) {
  /* A trip with a successful tag already got its Sarah moment — the
     species-relevant celebration thread. Same for a re-sighting or a
     tag-along follow. Don't follow it minutes later with an unrelated
     random fact. */
  if (plan && plan.region) { state.lastRegion = plan.region; saveMsgs(); }
  if (state.taggedThisTrip || state.resightedThisTrip || state.followedThisTrip) return;
  let thread;
  /* v1.8.3-beta: throttle kind — the 5-failure nudge and the one-time
     advice offer are condition-triggered guidance (special), while the
     check-in / random chat is ambient chatter (routine, throttled). */
  let threadKind = "routine";
  if (state.failures >= 5) {
    // gentle nudge, genuine-conversation style — about YOUR waters.
    // v0.17.1: Sarah only butts in on her own after five; before that,
    // asking is the player's call (see the Ask Sarah panel).
    // v2.5.4-beta: nudge follows the species coherence rule (Avery) —
    // only the pinned or just-encountered species, never a random one.
    const pool = sarahSpeciesPool(COUSIN_NUDGES);
    const s = pool.length ? pick(pool) : null;
    thread = [
      { who: "them", text: "Comment ça va, tes sorties de recherche?" },
      { who: "me", text: "Pas fort, pour être honnête. Quelques sorties sans requin. La mer est vide." },
      { who: "them", text: s ? (COUSIN_NUDGES[s.id] || "La prochaine rencontre viendra. J'ai confiance en toi.") : "La prochaine rencontre viendra. J'ai confiance en toi." },
      { who: "me", text: "Ah. OK, ça m'aide vraiment. Merci." }
    ];
    threadKind = "special";
    state.failures = 0;
  } else if (state.failures === 1 && !state.sarahAdviceOffered) {
    /* v0.17.1: after the first failed trip, Sarah offers her notes — the
       player picks the species, since the game may not know what they're
       actually after. The Ask Sarah panel appears in the Phone tab. */
    thread = [
      { who: "them", text: "Journée difficile sur l'eau?" },
      { who: "me", text: "Ouais. Pas un requin à l'horizon." },
      { who: "them", text: "J'ai des notes sur tous les requins qu'on a étudiés. Choisis-en un ci-dessous et je te raconterai ce que je sais : où le chercher, ce qu'il aime." }
    ];
    state.sarahAdviceOffered = true;
    threadKind = "special";
    saveMsgs(); // v0.17.1 review fix: the offer must survive a reload
  } else {
    /* v1.8.3-beta Mira fix: gate the ambient branch on the routine throttle
       BEFORE any chat selection — pickChat() advances chatSeen as a side
       effect, so a dropped thread must never consume a rotation entry
       (players would skip Sarah's authored lines without ever seeing them). */
    if (!routineThrottled()) {
      /* v0.8.0: sometimes she just checks in about one of your named
         sharks — the cousin who remembers. */
      const checkin = maybeCheckinThread();
      if (checkin) {
        thread = checkin;
      } else {
        const chat = pickChat();
        thread = [
          { who: "them", text: chat.them },
          { who: "me", text: chat.me }
        ];
      }
    }
  }
  if (thread) {
    const sent = pushThread(thread, threadKind);
    /* v2.5.6-beta: a sent check-in starts that individual's 15-minute
       mention clock (weight 0). */
    if (sent && pendingCheckinSpeciesId) noteSharkMention(pendingCheckinSpeciesId, 0);
  }
  pendingCheckinSpeciesId = null;
  renderSarahAsk();
}

/* v0.17.1: Ask Sarah — player-initiated advice. The panel appears in the
   Phone tab after the first failed trip.
   v1.5.19-beta: she advises on the one you're actively researching, not the
   whole roster. The panel only appears while there's an active pin.
   v1.8.5-beta: no species dropdown — there's only ever one shark to ask
   about, so it's a single button naming the researched shark. */
function renderSarahAsk() {
  const panel = $("sarahAsk");
  if (!panel) return;
  const s = state.pinned ? sharkById(state.pinned) : null;
  const show = !!state.sarahAdviceOffered && !!s;
  panel.classList.toggle("hidden", !show);
  if (!show) return;
  const btn = $("sarahAskBtn");
  btn.textContent = `Ask Sarah about the ${s.name}`;
  btn.setAttribute("aria-label", `Ask Sarah for advice about the ${s.name}`);
}
function askSarahAdvice(sid) {
  const s = sharkById(sid);
  if (!s) return;
  /* v1.8.3-beta: Ask Sarah is player-initiated — always goes through
     the throttle. */
  pushThread([
    { who: "me", text: `I'm striking out — any advice on the ${s.name.toLowerCase()}?` },
    { who: "them", text: COUSIN_NUDGES[sid] || "La prochaine rencontre viendra. J'ai confiance en toi." },
    { who: "me", text: "Thanks. That's actually really helpful." }
  ], "ask");
  state.sarahAdviceOffered = false;
  saveMsgs(); // v0.17.1 review fix: a used offer stays used across reloads
  renderSarahAsk();
  goTab("phone");
}

/* ---------- Achievements (v0.18.0) ----------
   Visible upfront with breadcrumb hints until unlocked. Checks run after
   the actions that can earn them; unlocks persist and celebrate. */
function saveStats() {
  statsStore.save(state.stats);
}
/* Grandfathering (v1.8.0-beta): already-earned achievements are never
   re-checked, so a Dedicated earned under an earlier rule (e.g. the old
   101-fact pool) stays earned even though the check now requires all 201
   insights. The 201-fact bar applies to NEW awards only. */
function checkAchievements() {
  if (typeof ACHIEVEMENTS === "undefined") return;
  ACHIEVEMENTS.forEach(a => {
    if (state.achievements[a.id]) return;
    let earned = false;
    try { earned = !!a.check(state); } catch { earned = false; }
    if (earned) unlockAchievement(a);
  });
}
function unlockAchievement(a) {
  state.achievements[a.id] = Date.now();
  achieveStore.save(state.achievements);
  renderAchievements();
  /* v0.18.0 review: queue celebrations so one action earning several
     achievements shows each card in turn instead of overwriting. */
  achieveQueue.push(a);
  showNextAchievement();
  /* v1.4.9: Deep-Sea Unicorn (renamed from White Whale in v1.8.0)
     gets a Sarah reaction — she'd lose her mind over a megamouth.
     Fires alongside the achievement celebration. */
  if (a.id === "white-whale" && typeof WHITE_WHALE_THREAD !== "undefined") {
    pushThread(WHITE_WHALE_THREAD.map(m => ({ ...m })));
  }
}
const achieveQueue = [];
let achieveShowing = false;
function showNextAchievement() {
  if (achieveShowing || !achieveQueue.length) return;
  const a = achieveQueue.shift();
  achieveShowing = true;
  const ov = $("achieveOverlay");
  if (!ov) { achieveShowing = false; return; }
  ov.classList.remove("hidden");
  ov.innerHTML = `<div class="phone">
    <div class="cert-trophy" style="font-size:52px; text-align:center">${a.icon}</div>
    <h2 style="text-align:center; margin:8px 0 2px">Achievement Unlocked!</h2>
    <p style="text-align:center; font-weight:800; margin:4px 0">${esc(a.name)}</p>
    <p class="latin" style="text-align:center">${esc(a.description)}</p>
    <button id="achieveClose" class="primary-button" type="button">Sweet!</button>
  </div>`;
  $("achieveClose").addEventListener("click", () => {
    ov.classList.add("hidden");
    achieveShowing = false;
    showNextAchievement();
  });
}
function renderAchievements() {
  const list = $("achieveList");
  if (!list || typeof ACHIEVEMENTS === "undefined") return;
  /* v0.23.0: hidden achievements (e.g. Bruce) don't appear until unlocked. */
  const visible = ACHIEVEMENTS.filter(a => !a.hidden || state.achievements[a.id]);
  const unlockedCount = visible.filter(a => state.achievements[a.id]).length;
  const head = $("achieveHead");
  if (head) head.innerHTML = `<h2>Achievements</h2><p>${unlockedCount} of ${visible.length} unlocked</p>`;
  /* v1.7.19-beta: the Master Shark Tagger trophy lives here now (moved from
     the Collection trophy shelf). The derpy toggle stays in Collection. */
  const trophyShelf = $("achieveTrophyShelf");
  if (trophyShelf) {
    trophyShelf.innerHTML = "";
    if (state.won) {
      const t = document.createElement("button");
      t.type = "button";
      t.className = "trophy-shelf";
      t.setAttribute("aria-label", "Ouvrir ton certificat de Maître du marquage des requins");
      t.innerHTML = `
        <div class="cert-trophy">🏆</div>
        <h3>Master Shark Tagger</h3>
        <p class="latin">Official certificate — tap to view</p>`;
      t.addEventListener("click", openCertificate);
      trophyShelf.appendChild(t);
    }
  }
  list.innerHTML = "";
  visible.forEach(a => {
    const unlocked = !!state.achievements[a.id];
    const row = document.createElement("div");
    row.className = "guide-row" + (unlocked ? "" : " locked");
    /* v1.7.19-beta: achievement cards stack — icon beside a vertical
       name/hint stack instead of name and hint side-by-side. Saves
       horizontal room and scans cleaner. */
    row.innerHTML = `
      <div class="guide-row-head ach-stack" style="cursor:default">
        <span class="ach-icon" style="font-size:22px">${unlocked ? a.icon : "🔒"}</span>
        <span class="ach-texts">
          <span class="guide-row-name">${unlocked ? esc(a.name) : "???"}</span>
          <span class="latin ach-hint">${unlocked ? esc(a.description) : esc(a.breadcrumb)}</span>
        </span>
      </div>`;
    list.appendChild(row);
  });
  /* v1.4.2: tab badge removed — the count lives in the page header above. */
}

/* ---------- Tagging ---------- */

const rand = (a, b) => Math.round((a + Math.random() * (b - a)) * 10) / 10;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* v0.7.3: flavour lines are dealt like cards — shuffled per trip, each
   line once, so phrases never repeat within a day. */
function shuffled(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
let tripDecks = null;
function deal(deck, pool) {
  if (!deck.length) deck.push(...shuffled(pool));
  return deck.pop();
}

/* v0.8.0: the trip currently being logged for the logbook. */
let tripLog = null;
function logTripEncounter(species, result, researchId) {
  if (!tripLog) return;
  tripLog.encounters.push({ speciesId: species.id, name: species.name, result, researchId: researchId || null });
}
/* v1.2.0-beta: count how many individuals of a species the player has tagged,
   across all logbook trips. state.tagged only keeps the latest per species,
   so the logbook is the source of truth for lifetime counts. */
/* v1.2.0-beta Mira review: ordinal words for the tag announcement —
   "the third Nurse Shark you've tagged", not "3 in your collection". */
function ordinal(n) {
  const words = ["first","second","third","fourth","fifth","sixth","seventh",
    "eighth","ninth","tenth","eleventh","twelfth"];
  if (n >= 1 && n <= words.length) return words[n - 1];
  // Teen exceptions and the 10-20 range always take "th"
  const mod100 = n % 100;
  if (mod100 >= 10 && mod100 <= 20) return n + "th";
  const mod10 = n % 10;
  if (mod10 === 1) return n + "st";
  if (mod10 === 2) return n + "nd";
  if (mod10 === 3) return n + "rd";
  return n + "th";
}
function countSpeciesTags(speciesId) {
  let n = 0;
  (state.logbook || []).forEach(t => {
    (t.encounters || []).forEach(e => {
      if (e.speciesId === speciesId && e.result === "tagged") n++;
    });
  });
  // The current trip's log isn't in state.logbook yet — count it too.
  if (tripLog) {
    (tripLog.encounters || []).forEach(e => {
      if (e.speciesId === speciesId && e.result === "tagged") n++;
    });
  }
  return n;
}

/* ---------- Tagging: tag -> health check -> release ----------
   v0.7.0: tagging happens mid-trip and the day goes on. After the tag is
   saved, a health-check beat runs (tag seated, vitals noted), then the
   shark is released and the expedition resumes — doneCb continues the trip. */
function openTagging(species, doneCb) {
  state.pendingTag = species;
  state.encounterDone = doneCb || null;
  const length = rand(species.sizeRange[0], species.sizeRange[1]);
  const sex = Math.random() < 0.5 ? "female" : "male";
  const researchId = mintResearchId(species);
  state.pendingTag._gen = { length, sex, researchId };
  $("tagForm").classList.remove("hidden");
  $("healthView").classList.add("hidden");
  $("tagSharkArt").innerHTML = sharkArtImg(species.id, "illustration", species.name);
  $("tagInfo").innerHTML = `
    <strong>${species.name}</strong> <em>(${species.latin})</em><br>
    🔬 Research ID: <strong>${researchId}</strong> (assigned automatically)<br>
    📏 ${length} m &nbsp;·&nbsp; ${sex === "female" ? "♀ femelle" : "♂ mâle"}<br>
    📍 Tagged at: ${REGIONS[state.currentPlan.region].name}<br>
    📅 ${new Date().toLocaleDateString("fr-CA", { year: "numeric", month: "short", day: "numeric" })}
  `;
  $("sharkName").value = "";
  $("sharkName").placeholder = pick(species.nameIdeas) + "…";
  $("tagOverlay").classList.remove("hidden");
  setTimeout(() => $("sharkName").focus(), 100);
}

function confirmTag(name) {
  const s = state.pendingTag;
  if (!s) return;
  const regionName = REGIONS[state.currentPlan.region].name;
  const dateStr = new Date().toLocaleDateString("fr-CA", { year: "numeric", month: "short", day: "numeric" });
  const rec = {
    name: name || "",
    researchId: s._gen.researchId,
    length: s._gen.length,
    sex: s._gen.sex,
    location: regionName,
    /* v2.0.0-beta (Mira review): persist the tag region KEY so the track
       envelope stays geographically coherent with where THIS shark was
       tagged, even for multi-region species. */
    region: state.currentPlan.region,
    date: dateStr,
    taggedAt: Date.now(), // v0.16.0: explicit chronology for the ending
    track: genTrack(s, { location: regionName, region: state.currentPlan.region, date: dateStr })
  };
  /* v1.4.19-beta: Big Day — determine new-species BEFORE recording the tag. */
  const wasNewSpecies = !state.tagged[s.id];
  /* v1.5.3-beta: one tagged shark per species (canonical). The reunion system
     never creates a second record — _individuals from v1.5.2 betas are left
     dormant, not deleted. */
  state.tagged[s.id] = rec;
  state.taggedThisTrip = true;
  logTripEncounter(s, "tagged", rec.researchId);
  store.save(state.tagged);
  /* v1.2.0-beta: prominent species-count announcement — no more squinting
     at the small print. First of species vs. Nth individual, loud and clear. */
  const lifetimeTags = countSpeciesTags(s.id);
  if (lifetimeTags <= 1) {
    logLine(`🎉 <span class="found"><strong>New species!</strong> This is your first ${s.name}!</span>`, "found");
  } else {
    logLine(`🎉 <span class="found"><strong>${s.name} tagged!</strong> That's the ${ordinal(lifetimeTags)} ${s.name} you've tagged!</span>`, "found");
  }
  state.pendingTag = null;
  /* v0.18.0: chum tags feed the "Something in the Water" achievement —
     v0.18.0 review: only when chum is a real method for THIS species. */
  if (state.currentPlan && state.currentPlan.method === "attract" &&
      state.currentPlan.methodOpt === "chum" &&
      s.methods && s.methods.attract && s.methods.attract.includes("chum")) {
    state.stats.chumTags = (state.stats.chumTags || 0) + 1;
    saveStats();
  }
  /* v0.19.0: depths tagged feed the "Full Fathom" achievement. */
  if (state.currentPlan && state.currentPlan.depth &&
      !state.stats.depthsTagged.includes(state.currentPlan.depth)) {
    state.stats.depthsTagged.push(state.currentPlan.depth);
    saveStats();
  }
  /* v1.4.19-beta: Big Day — queue the routine celebration instead of pushing
     immediately. Flushed as one conversation (single or Big Day) at trip end.
     Special threads (Bruce, Mary Lee, Nicole, Sarah egg, Archive) still push
     separately below and are never batched. */
  if (wasNewSpecies) {
    state.pendingCelebrations.push({
      speciesId: s.id,
      speciesName: s.name,
      nickname: name || "",
      researchId: rec.researchId,
      length: rec.length,
      sex: rec.sex,
      opener: s.opener,
      cheer: s.cheer
    });
    /* v1.5.0-beta: persist so a reload before trip end doesn't lose it. */
    celebrationStore.save(state.pendingCelebrations);
  }
  maybeSarahEgg(s.id, rec);
  maybeNameEgg(s.id, rec); // v0.23.0
  /* v0.24.0: progressive Wild Archive unlock (Mira approved). First tag
     reveals the Archive tab with a Sarah intro; later tags add entries
     quietly. Existing winners keep full access via migrateArchiveUnlock. */
  const wasFirstTag = Object.keys(state.tagged).length === 1;
  if (!state.archiveUnlocked && wasFirstTag) {
    state.archiveUnlocked = true;
    try { localStorage.setItem("tyi-archive", "1"); } catch {}
    pushThread([
      { who: "them", text: "ATTENDS. J'ai quelque chose pour toi. 📸" },
      { who: "them", text: "Pour chaque espèce de requin que tu marques, je vais te trouver une vraie photo d'un animal de cette espèce. Regarde le nouvel onglet 🖼️ Archives!" },
      { who: "me", text: "De vraies photos? De véritables animaux de ces espèces?" },
      { who: "them", text: "De vraies photos! Les fiches du guide t'aident à identifier les requins; les Archives te montrent leurs espèces dans la vraie vie. Chaque nouveau marquage ajoute une rencontre à ton carnet. 🩵" }
    ]);
  }
  /* v1.5.1: Archive never shows a notification badge — removed per Avery. */
  checkMilestones();
  checkAchievements(); // v0.18.0
  renderAll();
  showHealthCheck(s, rec);
}

/* v1.3.1-beta Mira review (blocking): the "Tag along" CTA must NOT appear
   before release — tapping it hid the overlay without resolving the encounter,
   leaving runExpedition() awaiting forever. The CTA lives only in doRelease(),
   after the player has chosen how to release. */
function showHealthCheck(s, rec) {
  state.healthSpecies = s;
  $("tagForm").classList.add("hidden");
  $("healthView").classList.remove("hidden");
  /* v1.4.0-beta: third release choice — tag along ends the expedition. */
  try {
    const rec2 = state.tagged[s.id];
    const nm = (rec2 && rec2.name) || s.name;
    $("tagAlongName").textContent = nm;
  } catch {}
  $("healthArt").innerHTML = sharkArtImg(s.id, "illustration", s.name);
  $("healthInfo").innerHTML = `
    <strong>${s.name}</strong> — ${esc(rec.researchId)}<br>
    🩺 Health check: ${rec.sex === "female" ? "♀ femelle" : "♂ mâle"}, ${rec.length} m.<br>
    Tag seated well, swimming strongly, good body condition.<br>
    <em>Every shark released healthy. 🦈</em>
  `;
}

/* v0.17.1: the release IS the destination choice — keep diving or head back.
   The release buttons resolve the encounter directly instead of dropping the
   player into a second keep-diving/head-back prompt. */
function doRelease(headBack) {
  const done = state.encounterDone;
  const s = state.healthSpecies;
  state.encounterDone = null;
  state.healthSpecies = null;
  $("tagOverlay").classList.add("hidden");
  if (s) {
    /* v1.3.1-beta: warm release moment with the title woven in.
       Personalized CTA ("Tag along with [name]") focuses the map on YOUR shark.
       (v1.4.0-beta: retired per Mira review — the health-check third release
       choice is now the single tag-along path.) */
    const rec = state.tagged[s.id];
    const displayName = (rec && rec.name) || s.name;
    logLine(`🌊 ${esc(displayName)} is back in the water — tag secure, swimming strong.`);
  }
  renderAll();
  if (done) done(headBack);
}
/* v1.4.0-beta: secret tag-along facts — 1-3 curated, biologically correct facts
   per species. Unlock one per tag-along; when exhausted, the graceful line plays.
   Facts are filled in below (generated content). */
const SECRET_FACTS = {
  nurse: [
    "Les requins nourrices peuvent pomper l'eau sur leurs branchies tout en restant parfaitement immobiles — la plupart des requins s'étoufferaient en faisant cela, mais un requin nourrice peut faire la sieste sur le fond marin et respirer facilement.",
    "Pour se nourrir, les requins-nourrices aspirent leurs proies avec force, parfois jusque dans les trous du récif. Le jour, ils se reposent souvent les uns contre les autres, en véritables piles de requins endormis.",
    "Chaque été, les requins-nourrices se rassemblent dans les mêmes zones de reproduction peu profondes, au large de la Floride. Ils y reviennent année après année, comme pour une réunion de famille."
  ],
  thresher: [
    "Un requin-renard chasse avec sa queue comme un fouet — des caméras à haute vitesse les ont finalement surpris en 2013 alors qu'ils rassemblaient des sardines, puis les étourdissaient d'un coup de queue par-dessus la tête.",
    "Cette queue en forme de faux peut être aussi longue que le reste de son corps, et des muscles chauds particuliers maintiennent son cerveau et ses yeux au chaud pour qu'il puisse chasser dans l'eau froide et profonde."
  ],
  whale: [
    "Chaque requin-baleine possède un motif de taches unique, comparable à une empreinte digitale. En photographiant ces motifs, les chercheurs peuvent reconnaître des individus au fil des années et des océans.",
    "Certains requins-baleines plongent à près de deux kilomètres de profondeur, puis remontent vers la surface pour se nourrir de plancton."
  ],
  goblin: [
    "Les mâchoires d'un requin lutin se projettent vers l'avant hors de son visage comme un lance-pierre pour saisir sa proie — l'une des morsures les plus rapides jamais mesurées chez un requin.",
    "Sa peau rosâtre est si molle et translucide qu'on peut voir les vaisseaux sanguins en dessous, et son long museau est rempli de capteurs qui ressentent le faible bourdonnement électrique des proies cachées."
  ],
  tiger: [
    "Les requins tigres sont célèbres pour manger presque tout — des plaques d'immatriculation, des pneus et même des tortues de mer, dont les carapaces peuvent être brisées par leurs dents dentelées et leurs puissantes mâchoires, ont tous été retrouvés dans leurs estomacs.",
    "Les rayures audacieuses qui leur donnent leur nom s'estompent avec l'âge, de sorte que les plus grands vieux tigres nagent presque gris uni; certains individus parcourent aussi des bassins océaniques entiers au cours de voyages de plusieurs années."
  ],
  sandtiger: [
    "Les requins-taureaux font quelque chose qu'aucun autre requin ne fait : ils avalent de l'air à la surface et le retiennent dans leur estomac comme un flotteur intégré, ce qui leur permet de rester immobiles en suspension dans l'eau.",
    "Avant la naissance, les petits mènent une bataille plus sombre — le plus grand embryon de chaque utérus mange ses frères et sœurs, de sorte que seuls deux requins, un de chaque côté, naissent."
  ],
  galapagos: [
    "Les requins des Galápagos sont notoirement curieux, encerclant souvent les plongeurs pour un long regard délibéré — les chercheurs les considèrent comme l'un des requins de récif les plus curieux.",
    "Malgré leur nom, les requins des Galápagos vivent sur des récifs tropicaux bien au-delà des îles Galápagos, notamment autour d'Hawaï et des Bermudes. Ils patrouillent souvent les tombants en petits groupes."
  ],
  greatwhite: [
    "Près de Seal Island, en Afrique du Sud, des grands requins blancs jaillissent entièrement hors de l'eau pour surprendre les phoques. Ces bonds spectaculaires font partie de leurs techniques de chasse.",
    "Certains grands requins blancs conservent leurs muscles de nage plus chauds que l'eau environnante et traversent des océans entiers. Des individus marqués ont voyagé entre la Californie, Hawaï et une zone de haute mer surnommée le White Shark Café."
  ],
  hammerhead: [
    "Ce marteau n'est pas juste pour la forme — écarter largement les yeux donne aux requins-marteaux un chevauchement binoculaire plus large vers l'avant que chez la plupart des requins, et balayer la tête d'un côté à l'autre leur permet de balayer le sable à la recherche des murmures électriques des raies pastenagues enfouies.",
    "Les grands requins-marteaux sont surtout solitaires — des chasseurs solitaires, et non des poissons de banc — et leur première nageoire dorsale est exceptionnellement haute et en forme de faucille, la plus haute de tous les requins-marteaux."
  ],
  mako: [
    "Le requin mako à nageoires courtes est le requin le plus rapide au monde, construit comme une torpille avec un moteur chauffé — ses muscles chauds lui permettent de bondir après les thons et même de sauter entièrement hors de l'eau.",
    "Les makos réfléchissent vite aussi : ce sang chaud atteint le cerveau, le gardant vif dans l'eau froide où d'autres prédateurs ralentissent."
  ],
  basking: [
    "Les requins pèlerins peuvent perdre et repousser leurs branchiospines hérissées — comme perdre et repousser un tamis intégré — bien que les scientifiques cherchent encore à déterminer à quelle fréquence cela se produit.",
    "En été, on a filmé des requins-pèlerins nageant lentement en cercle, museau contre queue. Les chercheurs pensent que ce comportement pourrait faire partie de leur parade nuptiale."
  ],
  epaulette: [
    "Quand la marée baisse, les requins épaulettes marchent tout simplement — pagayant sur le récif exposé sur leurs nageoires d'une mare à l'autre, et survivant des heures dans une eau si pauvre en oxygène qu'elle tuerait la plupart des poissons.",
    "Ce sont des sédentaires aux territoires minuscules, passant souvent toute leur vie sur une petite parcelle de récif."
  ],
  lemon: [
    "Les requins-citrons peuvent retrouver les endroits où ils sont nés. À Bimini, des femelles revenues dans les mangroves de leur naissance ont été suivies après plusieurs années d'absence.",
    "Ils sont étudiés à Bimini depuis plus de trois décennies — l'une des études sur les requins les plus longues au monde — et lors de tests en laboratoire, ils ont montré qu'ils peuvent apprendre et se souvenir d'indices visuels — une preuve solide d'apprentissage visuel et de mémoire."
  ],
  blacktip: [
    "Les requins à pointes noires reviennent souvent sur les mêmes coins de récif pendant des années. C'est ce qui rend le marquage soigneux si précieux : une réobservation peut aider les chercheurs à reconnaître le même individu au fil du temps.",
    "Ce sont des sprinteurs des eaux peu profondes, chassant souvent en meutes qui rabattent les poissons-appâts contre le rivage."
  ],
  whitetip: [
    "Les requins corail sont des chasseurs nocturnes. Le jour, ils se reposent ensemble dans les grottes ou sous les surplombs des récifs. La nuit, ils sortent explorer les crevasses à la recherche de proies.",
    "Leurs corps minces peuvent se glisser dans les crevasses du récif où aucun autre requin de leur taille ne pourrait entrer, et comme les requins nourrices, ils peuvent pomper l'eau pour respirer tout en restant immobiles."
  ],
  blue: [
    "Les requins bleus sont de grands voyageurs. Leurs migrations peuvent traverser l'Atlantique, guidées par des sens dont les chercheurs cherchent encore à comprendre tous les mécanismes.",
    "Les requins bleus s'approchent parfois des plongeurs avec curiosité, les observant en tournant lentement autour d'eux. Et une seule femelle peut donner naissance à plus d'une centaine de petits."
  ],
  porbeagle: [
    "Le requin-taupe commun conserve une température interne supérieure à celle de l'eau glaciale de l'Atlantique Nord. Cette capacité l'aide à poursuivre ses proies dans les eaux froides.",
    "Les requins-taupes se reproduisent lentement — après une gestation de huit ou neuf mois, une femelle donne naissance à seulement une poignée de petits vivants, généralement environ quatre."
  ],
  silky: [
    "Les requins soyeux doivent leur nom à leur peau : leurs minuscules écailles sont si lisses que la peau ressemble à de la soie, contrairement au papier de verre de la plupart des requins.",
    "Ils sont audacieux et curieux, suivant souvent les plongeurs sur de longues distances juste pour enquêter — et ils suivent les bancs de thons à travers l'océan ouvert."
  ],
  oceanic: [
    "Les requins océaniques étaient autrefois parmi les grands requins les plus abondants de la planète. Curieux et audacieux, ils s'approchaient de presque tout ce qui flottait en haute mer, des débris aux navires de recherche.",
    "Leurs longues nageoires arrondies, marquées de blanc aux extrémités, fonctionnent un peu comme des ailes. Elles les aident à parcourir la haute mer sur de longues distances, parfois longtemps entre deux repas."
  ],
  sevengill: [
    "La plupart des requins ont cinq fentes branchiales de chaque côté. Le requin à sept branchies en possède sept, un caractère qu'il partage avec un petit groupe d'espèces issues de lignées anciennes.",
    "À La Jolla, en Californie, les plongeurs reconnaissent certains habitués grâce à leurs motifs de taches. On a aussi observé des requins à sept branchies chasser les phoques en groupes peu structurés."
  ],
  bronze: [
    "Le requin cuivré porte bien son nom : ses flancs prennent des reflets de cuivre lorsqu'il tourne dans la lumière, une teinte remarquable parmi les requins habituellement gris.",
    "Ce sont des voyageurs longue distance de l'hémisphère sud, migrant le long de côtes entières entre les aires d'alimentation et les aires de mise bas."
  ],
  frilled: [
    "Le requin lézard est une capsule temporelle vivante — au corps d'anguille, avec 25 rangées de dents acérées (environ 300 en tout), il n'a presque pas changé en 80 millions d'années.",
    "Les requins-lézards vivent si profondément qu'on les observe rarement. Un individu filmé près de la surface au Japon en 2007 a marqué les esprits. Certains chercheurs pensent qu'il capture ses proies par un mouvement brusque rappelant celui d'un serpent."
  ],
  zebra: [
    "Les bébés requins zèbres naissent avec d’audacieuses rayures noires et blanches — et deviennent des adultes tachetés, semblables à des léopards. Ils changent essentiellement de motif, et de nom commun, en vieillissant.",
    "Doux habitants du fond, ils se reposent sur le fond marin le jour et utilisent leurs longues queues pour coincer de petites proies dans les crevasses du récif la nuit."
  ],
  scalloped: [
    "Les requins-marteaux halicornes se rassemblent le jour en vastes bancs autour des monts sous-marins au large — île Cocos et les Galápagos accueillent des centaines d'individus tourbillonnant ensemble dans le bleu.",
    "Les femelles requins-marteaux halicornes parcourent parfois de grandes distances pour mettre bas dans des zones côtières abritées. À la naissance, les petits possèdent déjà une tête en marteau, encore souple et arrondie."
  ],
  smooth: [
    "Le requin-marteau lisse tolère des eaux plus fraîches que bien d'autres requins-marteaux. Il fréquente notamment la Méditerranée et les côtes de la Nouvelle-Zélande.",
    "Son marteau a un bord avant lisse et arrondi sans encoche centrale, lui donnant le profil le plus net de tous les requins-marteaux."
  ],
  bonnethead: [
    "En 2018, des chercheurs ont montré que le requin-marteau tiburo peut digérer les herbes marines dont il se nourrit, en plus de ses proies animales. C'est l'un des rares requins connus capables de tirer de l'énergie des végétaux.",
    "Petit parmi les requins-marteaux, le requin-marteau tiburo fréquente les baies et les estuaires peu profonds. Il peut former des groupes de plusieurs dizaines d'individus."
  ],
  bull: [
    "Les requins bouledogues nagent des centaines de kilomètres en remontant les rivières — on les a trouvés loin en amont de l'Amazon et du Mississippi, et ils vivent toute l'année dans le lac Nicaragua, adaptant leur corps à l'eau douce comme peu de requins le peuvent.",
    "Cette adaptabilité provient de reins remarquables qui recyclent le sel, permettant à un même requin de chasser à la fois en haute mer et dans une rivière boueuse."
  ],
  greyreef: [
    "Lorsqu'il se sent menacé, le requin gris de récif adopte une posture d'avertissement caractéristique : il arque le dos, abaisse les nageoires pectorales et nage en effectuant des mouvements exagérés en forme de S. C'est un signal clair qu'il faut lui laisser de l'espace.",
    "Ils sont aussi curieux et sociables. Ils s'approchent parfois des plongeurs pour les observer de près, avant de repartir sans plus leur prêter attention."
  ],
  caribbean: [
    "Les requins de récif des Caraïbes ont appris à se reposer dans les courants océaniques, face au courant pour que l'eau passe sur leurs branchies — faisant la sieste pendant que la mer respire pour eux.",
    "Ce sont des sédentaires du récif corallien, patrouillant les mêmes tronçons de bord de récif pendant des années."
  ],
  sandbar: [
    "Les requins gris portent l'une des nageoires dorsales les plus hautes de tous les requins — une voile fière qui les rend faciles à repérer depuis un bateau.",
    "Les petits du requin gris grandissent dans des zones de nurserie comme la baie du Delaware. Les chercheurs y ont suivi plusieurs générations de jeunes requins qui fréquentent les mêmes eaux peu profondes."
  ],
  salmon: [
    "Le requin-saumon est un proche parent du mako, adapté aux eaux froides du Pacifique Nord. Il conserve la chaleur de ses muscles même lorsque l'eau approche du point de congélation.",
    "Ils suivent les remontées de saumons, et leur muscle rouge chaud leur permet de frapper avec toute leur puissance dans une eau assez froide pour engourdir la plupart des prédateurs."
  ],
  dusky: [
    "Les requins sombres prennent leur temps pour grandir. Ils peuvent mettre vingt ans à atteindre la maturité et vivre plus de quarante ans, ce qui rend leur population particulièrement vulnérable à la surexploitation.",
    "Ils migrent sur des milliers de kilomètres le long des côtes, et les femelles se rassemblent dans les eaux chaudes du sud pour mettre bas."
  ],
  silvertip: [
    "Les requins à pointes argentées sont notoirement audacieux autour des plongeurs, effectuant souvent des passages rapprochés et délibérés — curieux plutôt qu'agressifs, mais impossibles à ignorer.",
    "Les extrémités blanches de leurs nageoires se détachent dans la lumière lorsqu'ils patrouillent les tombants des récifs de l'Indo-Pacifique, seuls ou en petits groupes."
  ],
  spinner: [
    "Les requins tisserands se nourrissent en chargeant verticalement à travers les boules d'appâts tout en tournant comme une perceuse — puis en s'élançant hors de l'eau dans un saut vrillé.",
    "Ces pirouettes acrobatiques ne sont pas un jeu; la rotation leur permet de happer des poissons dans toutes les directions pendant qu'ils fusent vers le haut à travers le banc."
  ],
  wobbegong: [
    "Le wobbegong ressemble à un tapis vivant! Ses motifs et les franges autour de sa bouche le rendent presque invisible sur le fond. De petits poissons s'approchent parfois si près de ses barbillons qu'il lui suffit de bondir pour les attraper.",
    "Puis il frappe avec l'une des morsures les plus rapides du monde des requins, ouvrant ses énormes mâchoires en charnière pour engloutir une proie presque de sa taille."
  ],
  leopard: [
    "Chaque été, les femelles requins léopards gestantes se rassemblent dans les eaux chaudes peu profondes de La Jolla, Californie, se prélassant pour accélérer le développement de leurs petits — une maternité dans les vagues.",
    "Ce sont de doux mangeurs de fond, croquant des crabes et des siphons de palourdes, et leurs taches sont assez uniques pour que les chercheurs puissent distinguer les individus."
  ],
  horn: [
    "Les requins cornes croquent les oursins et les crabes avec des rangées de dents plates en forme de molaires — faites pour écraser, et non pour trancher.",
    "Les femelles requins-cornes pondent des capsules d'œufs en spirale, qu'elles peuvent coincer dans des crevasses rocheuses. Leur forme en tire-bouchon aide à les maintenir à l'abri des prédateurs."
  ],
  portjackson: [
    "Les requins de Port Jackson pondent aussi des capsules d'œufs en forme de tire-bouchon, les calant entre les rochers — et on voit parfois les mères ramasser la capsule dans leur bouche pour la porter vers une crevasse plus sûre.",
    "Ils effectuent de véritables migrations le long de la côte d'Australie, parcourant des centaines de kilomètres entre les aires d'alimentation et les aires de reproduction."
  ],
  angelshark: [
    "Les anges de mer sont des artistes de l'embuscade — ils disparaissent sous le sable, seuls leurs yeux visibles, puis explosent vers le haut pour engloutir les poissons qui passent en une fraction de seconde.",
    "Malgré leur nom angélique, ce sont des habitants du fond aplatis qui ressemblent davantage aux raies, et les anges de mer d'Europe sont maintenant en danger critique d'extinction."
  ],
  megamouth: [
    "Le requin grande-gueule est resté inconnu des scientifiques jusqu'en 1976. Cette année-là, un individu d'environ 4,6 mètres a été pris dans une ancre flottante d'un navire de la marine américaine, au large d'Hawaï.",
    "Il passe ses journées dans les profondeurs et remonte vers la surface chaque nuit pour se nourrir par filtration de krill, et les chercheurs soupçonnent que la bande pâle à l'intérieur de son énorme bouche pourrait briller pour attirer les proies dans l'obscurité."
  ],
  sawshark: [
    "La scie d'un requin-scie est parsemée de capteurs — il balaye le rostre dans le sable pour sentir le battement électrique du cœur des proies enfouies, puis frappe latéralement pour les neutraliser.",
    "Ces barbillons en forme de moustaches à mi-longueur de la scie peuvent aider à détecter les proies et les changements autour du fond marin; ils semblent particulièrement utiles pour le toucher."
  ],
  greenland: [
    "Les requins du Groenland pourraient vivre quatre siècles, voire davantage. Une femelle étudiée aurait eu près de 400 ans, ce qui en fait l'un des vertébrés les plus longévifs connus.",
    "Des copépodes parasites peuvent se fixer sur les yeux des requins du Groenland. Des recherches récentes montrent toutefois que leur vision est adaptée aux grands fonds. Leur chair doit être préparée avec précaution : en Islande, la fermentation traditionnelle permet d'en faire le hákarl."
  ],
  cookiecutter: [
    "Le squalelet féroce émet une faible lumière sous son ventre. Elle masque sa silhouette vue d'en dessous, sauf une bande sombre près de la tête qui pourrait attirer de plus grands animaux en imitant une petite proie.",
    "Puis ce petit requin d'environ 30 centimètres prélève, grâce à ses mâchoires, un morceau circulaire de chair sur de grands animaux comme les baleines et les thons. On a même retrouvé ses morsures rondes sur les dômes sonar en caoutchouc de sous-marins."
  ],
  sixgill: [
    "Les requins grisets sont des poids lourds des grands fonds, parcourant les profondeurs froides au-delà d'un kilomètre, ne remontant la nuit que dans quelques endroits spéciaux comme le détroit de Puget.",
    "Ce sont des charognards sans hâte, à la constitution lente et puissante — et ces six fentes branchiales les marquent comme des survivants d'une lignée ancienne."
  ],
  velvetbelly: [
    "Le sagre commun porte son propre éclairage tamisé — des rangées d'organes producteurs de lumière le long de son ventre brillent pour effacer sa silhouette aux yeux des prédateurs en dessous.",
    "Il vit dans les profondeurs crépusculaires de l'Atlantique Est : un minuscule requin perdu dans l'immensité obscure."
  ],
  dwarflantern: [
    "Le requin-lanterne nain est l'un des plus petits requins du monde : adulte, il mesure environ 20 centimètres et pourrait tenir dans le creux de ta main.",
    "Le requin-lanterne nain vit dans les grandes profondeurs au large de la Colombie et du Venezuela. Il produit sa propre lumière grâce à la bioluminescence : une minuscule lanterne dans l'obscurité."
  ],
  kitefin: [
    "Le squale liche est l'un des plus grands vertébrés bioluminescents connus. Ce chasseur des profondeurs, long de plus d'un mètre et demi, produit sa propre lumière bleu-vert.",
    "Sa lueur n'a été confirmée que dans une étude de 2021, ce qui en fait l'une des plus grandes surprises récentes de la science des requins."
  ],
  pacificsleeper: [
    "Les requins dormeurs du Pacifique sont des géants des profondeurs du Pacifique Nord. Certains atteignent une longueur comparable à celle d'un grand requin blanc, mais on les observe si rarement que leur vie reste largement mystérieuse.",
    "Ces grands requins peuvent se rassembler autour des carcasses de baleines tombées au fond de l'océan. Ces ressources alimentaires peuvent nourrir des charognards pendant des mois dans l'obscurité des abysses."
  ],
  spinydogfish: [
    "Les aiguillats communs portent un léger venin dans les épines devant chaque nageoire dorsale — une défense rare chez les requins, et assez acérée pour exiger le respect.",
    "Ce sont aussi des mères marathons : les gestations durent jusqu'à deux ans, parmi les plus longues de tous les vertébrés sur Terre."
  ],
  catshark: [
    "Les petites roussettes pondent des œufs dans des capsules coriaces munies de filaments torsadés. Surnommées « bourses de sirène », ces capsules s'accrochent aux algues jusqu'à l'éclosion.",
    "Les petites roussettes sont surtout actives la nuit. Leurs yeux rappellent ceux des chats, et elles peuvent se faufiler dans de très petites crevasses pour se cacher pendant la journée."
  ]
};

/* Returns the next unlearned fact for a species, or null if exhausted.
   Guarantees one unlearned fact if any remain (Mira's guardrail). */
/* v1.8.0-beta: the full insight pool for a species — SECRET_FACTS plus
   the hook + bonus, which are now real unlockable insights. Hook/bonus
   text still lives on the shark record (sharks-data.js) because Sarah's
   named-checkin replies quote s.hook ONLY when that insight is unlocked
   (see maybeCheckinThread) — never to leak a locked insight. Appending keeps old unlockedFacts
   indices stable: existing players keep their SECRET_FACTS unlocks, and
   hook (index N) + bonus (index N+1) start locked. */
function insightPoolFor(speciesId) {
  const base = (typeof SECRET_FACTS !== "undefined" && SECRET_FACTS[speciesId]) || [];
  const s = typeof SHARKS !== "undefined" ? SHARKS.find(x => x.id === speciesId) : null;
  const extra = [];
  if (s) {
    if (s.hook) extra.push(s.hook);
    if (s.bonus) extra.push(s.bonus);
  }
  return [...base, ...extra];
}
function unlockSecretFact(speciesId) {
  const pool = insightPoolFor(speciesId);
  if (!pool.length) return null;
  const unlocked = state.unlockedFacts[speciesId] || [];
  const remaining = pool.map((_, i) => i).filter(i => !unlocked.includes(i));
  if (!remaining.length) return null;
  const idx = remaining[Math.floor(Math.random() * remaining.length)];
  unlocked.push(idx);
  state.unlockedFacts[speciesId] = unlocked;
  factStore.save(state.unlockedFacts);
  return pool[idx];
}
/* v1.4.0-beta: third release choice — "Release & tag along" ENDS the expedition.
   Lifecycle-safe per Mira's guardrail: resolves the encounter exactly once
   (with tag-along intent), so trip log, achievements, counters, Sarah batching,
   and launch-button cleanup all run exactly once. The map focuses the shark
   AFTER trip completion (in closeDive), not here. */
function doTagAlong() {
  const done = state.encounterDone;
  const s = state.healthSpecies;
  state.encounterDone = null;
  state.healthSpecies = null;
  $("tagOverlay").classList.add("hidden");
  if (s) {
    const rec = state.tagged[s.id];
    const displayName = (rec && rec.name) || s.name;
    logLine(`🌊 ${esc(displayName)} is back in the water — tag secure, swimming strong.`);
    /* v1.5.8-beta: the insight lives on the Collection card only — not in the log. */
    const fact = unlockSecretFact(s.id);
    state.pendingTagAlongFact = fact
      ? { speciesId: s.id, fact, exhausted: false }
      : { speciesId: s.id, fact: null, exhausted: true };
    logLine(`🧭 You're changing course to follow ${esc(displayName)} — no more encounters this trip.`);
  }
  renderAll();
  if (done) done({ tagAlong: s ? s.id : null });
}
$("releaseBtn").addEventListener("click", () => doRelease(false));
$("releaseShipBtn").addEventListener("click", () => doRelease(true));
$("tagAlongBtn").addEventListener("click", doTagAlong);
/* v1.4.0-beta Mira review (blocker 2): follow option for already-tagged species.
   Lets the player follow a shark they've already tagged to unlock remaining
   secret facts (2nd, 3rd) without retagging or replacing the collection record.
   Ends the expedition like doTagAlong — you're spending the rest of the trip
   following this shark. */
function doFollowTagged(speciesId, doneCb) {
  const s = SHARKS.find(x => x.id === speciesId);
  if (!s) return;
  const rec = state.tagged[speciesId];
  const displayName = (rec && rec.name) || s.name;
  logLine(`🧭 Following ${esc(displayName)} — tag secure, swimming strong.`);
  /* v1.7.22-beta: Following an already-tagged shark counts as a re-sighting.
     Feeds the Pen Pal achievement, the track map, and resight stats — just
     like "📝 Log re-sighting". (Avery: players who always Follow never earned
     Pen Pal because only the Log button recorded re-sightings.)
     v1.7.24-beta: Follow records the re-sighting but pushes no
     resightThread — Sarah's tiered reactions are for 📝 Log re-sighting
     only. No extra Phone spam. */
  if (state.currentPlan) recordResighting(s, state.currentPlan);
  const fact = unlockSecretFact(speciesId);
  /* v1.7.22-beta: the insight lives on the Map popup only — not in the log.
     (Matches doTagAlong's v1.5.8-beta behavior.) */
  if (fact) {
    /* Stash for the map overlay (readable reward with progression). */
    state.pendingTagAlongFact = { speciesId, fact, exhausted: false };
  } else {
    /* v1.7.22-beta Mira review: the exhaustion line lives ONLY in the Map
       popup (via pendingTagAlongFact) — no duplicate log line. */
    state.pendingTagAlongFact = { speciesId, fact: null, exhausted: true };
  }
  /* v1.4.0-beta Mira review (related polish): log the follow as a trip
     encounter with the "followed" outcome — the logbook shows a meaningful
     event, Sarah's after-trip logic doesn't misclassify the expedition, and
     the collection record is untouched (no fake re-tag). */
  logTripEncounter(s, "followed", rec ? rec.researchId : null);
  state.followedThisTrip = true;
  logLine(`🧭 You're changing course to follow ${esc(displayName)} — no more encounters this trip.`);
  /* v1.8.4-beta: no renderAll() here — the expedition is still resolving and
     closeDive() calls renderAll() again right after (before goTab("map") and
     the insight popup). The intermediate render rebuilt every hidden tab
     while the player was still on the dive view, doubling per-unlock work as
     the save grew. The dive log above is written by logLine() directly, so
     nothing visible depends on the removed render. */
  /* Resolve the encounter with tag-along intent, ending the expedition.
     Prefer the passed callback (already-tagged path from doEncounter);
     fall back to state.encounterDone for safety. */
  const done = doneCb || state.encounterDone;
  state.encounterDone = null;
  if (done) done({ tagAlong: speciesId });
}
/* v1.4.0-beta Mira review (important): readable tag-along reward on the Map.
   Shows the unlocked fact (or the graceful exhaustion line) in an overlay card
   with "learned X/3" progression, so the player can actually read it even at
   quick pace. Dismissed with an explicit button — no auto-close. */
function showTagAlongFact(info) {
  const s = SHARKS.find(x => x.id === info.speciesId);
  if (!s) return;
  /* v1.7.24-beta Mira review: Observe mode studies a DIFFERENT wild shark —
     never the player's tagged individual of that species (e.g. tagged nurse
     shark named Bubbles + observe another nurse shark must not say
     "Observing this Bubbles paid off"). Use the species' common name only.
     Follow/tag-along modes keep the nickname. The mode flows through
     pendingTagAlongFact / deferredTagAlong. */
  const isObserve = info.mode === "observe";
  const rec = state.tagged[info.speciesId];
  const displayName = isObserve ? s.name : ((rec && rec.name) || s.name);
  const pool = insightPoolFor(info.speciesId);
  const unlocked = state.unlockedFacts[info.speciesId] || [];
  const total = pool.length;
  const learned = unlocked.length;
  /* v1.7.24-beta: Observe mode — the player studied a wild, untagged shark,
     they did not follow their own tagged shark. Keep the popup copy honest:
     "studying/observing", never "following". Follow mode keeps the original
     copy. */
  let bodyHtml;
  if (info.fact && !info.exhausted) {
    bodyHtml = `
      <div class="tagalong-fact-card">
        <div class="fact-progress">${isObserve ? "Species insight" : "Tag-along insight"} — learned ${learned}/${total}</div>
        <div class="fact-text">🔬 ${esc(info.fact)}</div>
      </div>
      <p class="dim">${isObserve
        ? `Observing this ${esc(displayName)} paid off. ${total - learned > 0
          ? `Observe ${esc(displayName)} again sometime to learn more.`
          : `That's everything this species had to teach.`}`
        : `Following ${esc(displayName)} paid off. ${total - learned > 0
          ? `Follow ${esc(displayName)} again sometime to learn more.`
          : `That's everything this shark had to teach.`}`}</p>`;
  } else {
    bodyHtml = `
      <div class="tagalong-fact-card">
        <div class="fact-progress">${isObserve ? "Species insight" : "Tag-along insight"} — ${learned}/${total} learned</div>
        <div class="fact-text"><em>I've learned all I can — the rest is in the specialists' hands now.</em></div>
      </div>
      <p class="dim">${isObserve
        ? `${esc(displayName)} still appreciates being studied. 🔬`
        : `${esc(displayName)} still appreciates the company. 🧭`}</p>`;
  }
  $("tagAlongFactContent").innerHTML = `
    <h3 style="margin:4px 0 8px">${isObserve ? `🔬 Species insight — ${esc(displayName)}` : `🧭 Tagging along with ${esc(displayName)}`}</h3>
    ${bodyHtml}`;
  /* v1.7.24-beta Mira review: the close button must not say "Continue
     following" for Observe — the player studied, not followed. */
  $("tagAlongFactClose").textContent = isObserve ? "Back to map" : "Continue following 🧭";
  $("tagAlongOverlay").classList.remove("hidden");
}
$("tagAlongFactClose").addEventListener("click", () => {
  $("tagAlongOverlay").classList.add("hidden");
});

/* v0.17.1: Ask Sarah for advice. v1.8.5-beta: single button — the shark is
   always the currently pinned (researched) one. */
$("sarahAskBtn").addEventListener("click", () => {
  if (state.pinned) askSarahAdvice(state.pinned);
});

/* ---------- Milestones & win state ----------
   v0.7.0: two stages.
   - v1.7.9-beta: tagging any 10 sharks unlocks the Galápagos and
     South Africa as real, selectable waters (was: the six original species).
   - Tagging the full roster wins the game: Master Shark Tagger.
     v0.11.0: the win moves up with the roster (SHARKS.length), always. */
function checkMilestones() {
  const taggedIds = Object.keys(state.tagged);
  if (!state.regionsUnlocked && taggedIds.length >= 10) {
    state.regionsUnlocked = true;
    try { localStorage.setItem("tyi-regions", "1"); } catch {}
    for (const id of ["galapagos", "south-africa"]) REGIONS[id].locked = false;
    fillRegions();
    pushThread(REGION_UNLOCK_THREAD.map(m => ({ ...m })));
    showRegionUnlock();
  }
  /* v0.21.0 sharknado: progressive region unlocks by tag count.
     v0.21.0 Mira review: independent of the 10-tag Galápagos/South Africa unlock. */
  const n = taggedIds.length;
  if (n >= 15 && REGIONS["east-australia"].locked) {
    REGIONS["east-australia"].locked = false;
    fillRegions();
    pushThread(EAST_AUS_UNLOCK_THREAD.map(m => ({ ...m })));
    showRegionUnlockSingle("east-australia", "Est de l'Australie", "wobbegongs hide in the reef ledges here.");
  }
  if (n >= 25 && REGIONS["california"].locked) {
    REGIONS["california"].locked = false;
    fillRegions();
    pushThread(CALIFORNIA_UNLOCK_THREAD.map(m => ({ ...m })));
    showRegionUnlockSingle("california", "Côte de la Californie", "leopard sharks cruise the bays and kelp.");
  }
  if (n >= 35 && REGIONS["arctic"].locked) {
    REGIONS["arctic"].locked = false;
    fillRegions();
    pushThread(ARCTIC_UNLOCK_THREAD.map(m => ({ ...m })));
    showRegionUnlockSingle("arctic", "Eaux arctiques", "the Greenland shark waits in the cold dark.");
  }
  if (taggedIds.length >= SHARKS.length && !state.won) {
    /* The ceremony waits for day's end — the trip always finishes first. */
    state.pendingWin = true;
  }
}

function showRegionUnlock() {
  const ov = $("winOverlay");
  ov.classList.remove("hidden");
  ov.innerHTML = `<div class="phone">
    <div class="phone-head">🗺️ New waters surveyed</div>
    <div class="cert-body">
      <p><strong>Galápagos Islands</strong> — marine iguanas slip into the water nearby.</p>
      <p><strong>South Africa</strong> — cape fur seals bark on the rocks above.</p>
      <p class="latin">Ten sharks tagged. The institute trusts you with farther waters now — and Sarah texted you about it. 📱</p>
    </div>
    <button id="winNext" class="primary-button" type="button">Back to the water</button>
  </div>`;
  $("winNext").addEventListener("click", () => {
    ov.classList.add("hidden");
  });
}

/* v0.21.0 sharknado: single-region unlock overlay. */
function showRegionUnlockSingle(regionId, regionName, flavor) {
  const ov = $("winOverlay");
  ov.classList.remove("hidden");
  ov.innerHTML = `<div class="phone">
    <div class="phone-head">🗺️ New waters surveyed</div>
    <div class="cert-body">
      <p><strong>${regionName}</strong> — ${flavor}</p>
      <p class="latin">The institute trusts you with farther waters now — and Sarah texted you about it. 📱</p>
    </div>
    <button id="winNext" class="primary-button" type="button">Back to the water</button>
  </div>`;
  $("winNext").addEventListener("click", () => {
    ov.classList.add("hidden");
  });
}

/* v0.13.0: built dynamically so the count can never go stale again. */
function winThread() {
  const n = SHARKS.length;
  return [
    { who: "them", text: "Tu as réussi. Tu les as tous marqués." },
    { who: "me", text: `${n} for ${n}. Couldn't have done it without my research assistant.` },
    { who: "them", text: "Je vais dire à tout le monde que mon cousin est un véritable chercheur spécialiste des requins. C'est la plus belle journée." },
    { who: "me", text: "Une des plus belles de ma vie aussi. 🦈" }
  ];
}

/* v0.16.0: Sarah's celebration — the emotional core of the ending. Calm adult
   voice (v0.12.0): proud and emotional, never a wall of caps. Uses the
   player's ACTUAL first-tagged shark so it lands personally. */
/* v0.16.0 review fix: genuine chronological order for tagged sharks.
   New records carry taggedAt (ms epoch). Old saves fall back to the
   insertion order of state.tagged — for non-integer string keys that IS
   the order each shark was first tagged. Both the Sarah thread and the
   map finale use this same source. */
function taggedChronological() {
  return Object.keys(state.tagged)
    .map((sid, idx) => ({ sid, t: state.tagged[sid], idx }))
    .sort((a, b) => {
      const ta = a.t.taggedAt, tb = b.t.taggedAt;
      if (ta != null && tb != null && ta !== tb) return ta - tb;
      return a.idx - b.idx;
    });
}
function sarahWinThread() {
  const byDate = taggedChronological();
  const ids = byDate.map(e => e.sid);
  const first = byDate[0] || { sid: "nurse", t: { researchId: "??" } };
  const s = sharkById(first.sid) || { name: "shark" };
  const firstName = first.t.name ? `“${first.t.name}”` : first.t.researchId;
  const n = ids.length;
  return [
    { who: "them", text: "Hé. On peut prendre une minute pour savourer ça?" },
    { who: "me", text: "Bien sûr." },
    { who: "them", text: "Au début, ce n'étaient que des noms d'espèces sur une liste. Tu te souviens du premier?" },
    { who: "me", text: `${firstName} — the ${s.name.toLowerCase()}. I'll never forget.` },
    { who: "them", text: `And now you know ${n} individual sharks. Not species — individuals. With names, and tracks, and lives they're still living right now.` },
    { who: "me", text: "Ils nagent encore quelque part." },
    { who: "them", text: "Oui. Tu les as tous trouvés, et tu les as tous remis en liberté. C'est ça, le plus important, non? C'est notre travail." },
    { who: "me", text: "Le plus beau métier du monde." },
    { who: "them", text: "Je suis tellement fière de toi. Ne raconte à personne que je deviens sentimentale. J'ai une réputation à protéger." },
    { who: "me", text: "Promis, ton secret est bien gardé. 🦈" }
  ];
}

/* ---------- Win state: a ceremony in four beats (v0.16.0) ----------
   (a) institute recognition, (b) Sarah's celebration, (c) the map finale —
   "they're all still out there" — (d) the acknowledgement.
   Each lands separately — a moment, not a checklist. */
function doWin() {
  state.won = true;
  /* v0.16.0 review fix: the archive unlock is part of the win itself, not
     beat 4. A player who closes mid-ceremony keeps the unlock — beat 4 is
     where they're TOLD about it. */
  state.archiveUnlocked = true;
  /* v1.7.0-beta: the derpy award — completing the roster unlocks the
     original derpy art as a toggleable mode. */
  state.derpyUnlocked = true;
  try {
    localStorage.setItem("tyi-won", "1");
    localStorage.setItem("tyi-archive", "1");
    localStorage.setItem("tyi-derpy-unlocked", "1");
  } catch {}
  /* v2.5.6-beta: stamp the win date for the certificate. */
  if (!state.wonAt) {
    state.wonAt = Date.now();
    try { localStorage.setItem("tyi-won-at", String(state.wonAt)); } catch {}
  }
  renderCollection();
  renderResearch();
  renderSightings();
  /* v1.7.19-beta Mira review: the Master Shark Tagger trophy lives in the
     Achievements tab now — render it at win time so it appears without a
     reload. */
  renderAchievements();
  winStep(1);
}

function winStep(n) {
  const ov = $("winOverlay");
  ov.classList.remove("hidden");
  const box = (inner, cls) => { ov.innerHTML = `<div class="phone${cls ? " " + cls : ""}">${inner}</div>`; };

  if (n === 1) {
    /* Beat 1: the certificate — this is the signing moment. The player
       writes their name on the real certificate (Avery's artwork, the
       same figure that hangs in Achievements afterwards). */
    box(`
      ${certFigureHTML()}
      <p class="latin" style="text-align:center; margin:6px 0 0">Write your name on the line — that's what makes it yours.</p>
      ${certNameBoxHTML()}
      <p class="cert-sig" style="text-align:center">Awarded with salt on it. 🦈</p>
      <div class="cert-actions">
        <button id="certGrow" class="cert-action-btn" type="button" aria-pressed="false">🔍 Make it bigger</button>
        <button id="certSave" class="cert-action-btn" type="button">📥 Save / share certificate</button>
      </div>
      <button id="winNext" class="primary-button" type="button">Continue</button>`, "cert-phone");
    wireCertName();
    /* Focus the name BOX, not the on-certificate field: the keyboard
       can cover the certificate (Avery), but the box stays visible
       while typing and the signature line fills in as they type. */
    const nb = $("certNameBox");
    if (nb && nb.focus) nb.focus();
    wireCertSave();
    const grow = $("certGrow");
    if (grow) grow.addEventListener("click", () => {
      const shell = ov.querySelector(".cert-phone");
      const wide = shell && shell.classList.toggle("cert-wide");
      grow.setAttribute("aria-pressed", wide ? "true" : "false");
      grow.textContent = wide ? "🔍 Réduire" : "🔍 Agrandir";
      fitCertDisplays($("certName"));
    });
    $("winNext").addEventListener("click", () => winStep(2));

  } else if (n === 2) {
    /* Beat 2: the phone buzzes — Sarah has something to say. */
    pushThread(sarahWinThread().map(m => ({ ...m })));
    box(`
      <div class="phone-head buzz-phone">📱 Your phone buzzes…</div>
      <div class="phone-thread win-thread"></div>
      <p class="latin" style="text-align:center; margin:0">Saved in 📱 Phone.</p>
      <button id="winNext" class="primary-button" type="button">Continue</button>`);
    const th = ov.querySelector(".win-thread");
    sarahWinThread().forEach(m => {
      const b = document.createElement("div");
      b.className = "bubble " + m.who;
      b.textContent = m.text;
      th.appendChild(b);
    });
    $("winNext").addEventListener("click", () => winStep(3));

  } else if (n === 3) {
    /* Beat 3: the map finale — "they're all still out there." */
    winMapFinale();

  } else if (n === 4) {
    /* Beat 4: the acknowledgement. v0.24.0: the Archive is no longer a
       win-gated reward — it's been growing all game. This beat celebrates
       the completed collection instead. */
    updateArchiveTab();
    renderArchive();
    box(`
      <div class="ack-card" style="margin-top:0">
        <p class="eyebrow">ACKNOWLEDGEMENTS</p>
        <p class="ack-name">For <span>Sarah</span></p>
        <p>who finished Rockhound at 1:26 AM and loves sharks. 🦈</p>
        <p style="margin-top:8px">🖼️ Your Wild Archive is complete — every species you tagged, face to face with the real animal.</p>
      </div>
      <button id="winNext" class="primary-button" type="button">Continue</button>`);
    $("winNext").addEventListener("click", () => winStep(5));
  } else if (n === 5) {
    /* Beat 5 (v1.7.0-beta): the derpy award — Sarah gives you the original
       derpy art as a completion reward. A toggle appears in the collection. */
    pushThread(DERPY_AWARD_THREAD.map(m => ({ ...m })));
    box(`
      <div style="font-size:52px; text-align:center">\uD83E\uDD88</div>
      <h2 style="text-align:center; margin:8px 0 2px">A gift from Sarah</h2>
      <p class="latin" style="text-align:center">The original derpy sharks — unlocked!</p>
      <div class="cert-body">
        <p>Before the institute sent the real illustrations, these little derpy sharks were the whole game. Sarah saved every single one.</p>
        <p style="margin-top:8px">\uD83C\uDFA8 <strong>Derpy mode</strong> is now available — toggle it in your collection book to see all ${SHARKS.length} sharks in their original derpy glory.</p>
      </div>
      <div class="phone-thread win-thread" style="margin-top:8px"></div>
      <p class="latin" style="text-align:center; margin:0">Saved in \uD83D\uDCF1 Phone.</p>
      <button id="winNext" class="primary-button" type="button">Back to the collection book</button>`);
    const th5 = ov.querySelector(".win-thread");
    DERPY_AWARD_THREAD.forEach(m => {
      const b = document.createElement("div");
      b.className = "bubble " + m.who;
      b.textContent = m.text;
      th5.appendChild(b);
    });
    $("winNext").addEventListener("click", () => {
      ov.classList.add("hidden");
      /* v1.4.0-beta Mira review (win-path edge case): if the winning tag was
         also a tag-along, go to the map with the fact overlay instead of the
         collection book — the win ceremony keeps its priority. */
      const deferred = state.deferredTagAlong;
      state.deferredTagAlong = null;
      if (deferred) {
        goTab("map");
        /* v1.7.24-beta Mira review: Observe must not focus the tagged track. */
        const isObserveDeferred = deferred.factInfo && deferred.factInfo.mode === "observe";
        if (!isObserveDeferred) {
          setTimeout(() => { try { ensureMapFocusedOn(deferred.speciesId); } catch {} }, 200);
        }
        if (deferred.factInfo) {
          setTimeout(() => showTagAlongFact(deferred.factInfo), 600);
        }
      } else {
        goTab("collection");
      }
    });
  }
}

/* v0.16.0: the map finale. The world map, and one by one, every shark the
   player tagged — track, marker, name — until the ocean is full of them.
   The message isn't "you collected every shark." It's "they're all still
   out there." */
function winMapFinale() {
  const ov = $("winOverlay");
  ov.classList.remove("hidden");
  const ordered = taggedChronological();
  const n = ordered.length;
  const bmUrl = (typeof BLUE_MARBLE_URL !== "undefined") ? BLUE_MARBLE_URL : "";

  ov.innerHTML = `
    <div class="finale">
      <h2 style="text-align:center; margin:6px 0 2px">They're all still out there.</h2>
      <p class="latin" style="text-align:center; margin:0 0 8px" id="finaleCaption"></p>
      <div class="finale-map" id="finaleMap"></div>
      <div style="display:flex; gap:8px; justify-content:center; margin-top:10px">
        <button id="finaleSkip" class="secondary-button" type="button">Skip</button>
        <button id="finaleNext" class="primary-button hidden" type="button">Continue</button>
      </div>
    </div>`;

  /* v0.16.0 review fix: count = sharks revealed so far. The caption names
     the shark that was JUST revealed (ordered[count - 1]); count 0 is the
     intro state with an empty map. Only the newest marker gets the pop
     animation — earlier ones stay settled instead of re-popping every step. */
  const renderRevealed = (count) => {
    const newIdx = count - 1; // index of the just-revealed shark (-1 when none)
    let svg = `<svg viewBox="0 0 ${MAP_W} ${MAP_H}" role="img" aria-label="Carte du monde de tous les requins marqués">`
      + `<rect x="0" y="0" width="${MAP_W}" height="${MAP_H}" fill="#0d2f4d"/>`
      + (bmUrl ? `<image href="${bmUrl}" x="0" y="0" width="${MAP_W}" height="${MAP_H}" preserveAspectRatio="none"/>` : ``);
    ordered.slice(0, count).forEach(({ sid, t }, idx) => {
      if (!t.track) t.track = genTrack(sharkById(sid) || { id: "nurse" }, t);
      const color = SPECIES_COLORS[sid] || "#ffffff";
      const pts = mapPoints(t);
      if (pts.length > 1) {
        const path = pts.slice(1);
        const d = path.map((p, i) => (i ? "L" : "M") + p.x.toFixed(1) + "," + p.y.toFixed(1)).join(" ");
        const archival = t.track.kind === "archival";
        svg += `<path d="${d}" fill="none" stroke="${color}" stroke-width="2" opacity="0.85"`
          + (archival ? ` stroke-dasharray="5 4"` : "") + `/>`;
      }
      const last = pts[pts.length - 1];
      if (last) {
        const pop = idx === newIdx ? ` style="animation: finalePop 0.5s ease"` : ``;
        svg += `<g class="finale-marker"${pop}>`
          + `<circle cx="${last.x.toFixed(1)}" cy="${last.y.toFixed(1)}" r="7" fill="${color}" stroke="#fff" stroke-width="2"/>`
          + `</g>`;
      }
    });
    svg += `</svg>`;
    $("finaleMap").innerHTML = svg;
    const cap = $("finaleCaption");
    if (count === 0) {
      cap.textContent = "";
    } else if (count < n) {
      const { sid, t } = ordered[count - 1];
      const s = sharkById(sid);
      const nm = t.name ? t.name : t.researchId; // v1.8.5-beta: no quotes around nicknames
      cap.textContent = `${nm} — ${s ? s.name : sid}  (${count} / ${n})`;
    } else {
      cap.textContent = `${n} sharks. ${n} releases. All still swimming.`;
    }
  };

  let revealed = 0, done = false;
  renderRevealed(0);
  const finish = () => {
    if (done) return;
    done = true;
    clearInterval(timer);
    revealed = n;
    renderRevealed(n);
    $("finaleSkip").classList.add("hidden");
    $("finaleNext").classList.remove("hidden");
  };
  const timer = setInterval(() => {
    revealed++;
    if (revealed >= n) { finish(); return; } // finish() renders the final state once
    renderRevealed(revealed);
  }, 650);
  $("finaleSkip").addEventListener("click", finish);
  $("finaleNext").addEventListener("click", () => winStep(4));
}

/* Easter egg: name a shark "Sarah" and the cousin finds out. */
function maybeSarahEgg(speciesId, rec) {
  if (!rec || rec.sarahEgg) return;
  if ((rec.name || "").trim().toLowerCase() === "sarah") {
    rec.sarahEgg = true;
    /* v1.5.25-beta: naming the LEMON shark "Sarah" gets its own thread —
       lemons are her favourite. Separate from the regular Sarah thread. */
    if (speciesId === "lemon" && !rec.lemonSarahEgg) {
      rec.lemonSarahEgg = true;
      store.save(state.tagged);
      pushThread(LEMON_SARAH_EGG_THREAD.map(m => ({ ...m })));
      /* v1.6.5-beta: the egg IS the lemon celebration — drop the queued
         routine/Big-Day lemon thread so Sarah doesn't freak out twice.
         Other species' celebrations are untouched. */
      if (state.pendingCelebrations && state.pendingCelebrations.length) {
        state.pendingCelebrations = state.pendingCelebrations.filter(e => e.speciesId !== "lemon");
        try { celebrationStore.save(state.pendingCelebrations); } catch {}
      }
    } else {
      store.save(state.tagged);
      pushThread(SARAH_EGG_THREAD.map(m => ({ ...m })));
    }
  }
}

/* v0.23.0: real-shark easter eggs. Called on rename/tag.
   - Mary Lee / Nicole: great white + matching name → Sarah thread (immediate)
   - Bruce: any shark + "bruce" → starts SLOW chain (no immediate message!)
   - Deep Blue: RETIRED per Avery's decision 2026-10-08 (was on hold per Mira).
     Do not implement — the great-white naming easter eggs stay Mary Lee and Nicole only. */
function maybeNameEgg(speciesId, rec) {
  /* v1.5.2-beta: defensive guards — the Mary Lee/Nicole easter eggs must never
     crash the game, even if thread data or pushThread is unavailable. */
  try {
    if (!rec || !rec.name) return;
    if (typeof pushThread !== "function") return;
    const name = rec.name.trim().toLowerCase();
    const s = typeof sharkById === "function" ? sharkById(speciesId) : null;

    // Mary Lee: great white only
    if (speciesId === "greatwhite" && name === "mary lee" && !rec.maryLeeEgg) {
      if (typeof MARY_LEE_THREAD === "undefined" || !Array.isArray(MARY_LEE_THREAD)) return;
      rec.maryLeeEgg = true;
      store.save(state.tagged);
      pushThread(MARY_LEE_THREAD.map(m => ({ ...m })));
      return;
    }
    // Nicole: great white only
    if (speciesId === "greatwhite" && name === "nicole" && !rec.nicoleEgg) {
      if (typeof NICOLE_THREAD === "undefined" || !Array.isArray(NICOLE_THREAD)) return;
      rec.nicoleEgg = true;
      store.save(state.tagged);
      pushThread(NICOLE_THREAD.map(m => ({ ...m })));
      return;
    }
    // Bruce: ANY shark. No immediate message — the slow chain begins silently.
    if (name === "bruce" && !state.bruceEgg && !state.bruceChainComplete) {
      /* v1.5.24: keep the player's exact capitalization for {bruce} in the chain. */
      /* v1.5.25-beta: defensive expedition count — the trigger must never
         depend on state.stats being fully formed (first-expedition safety).
         Previously a missing state.stats would throw inside the try/catch
         and silently skip setting bruceEgg. */
      let expCount = 0;
      try { expCount = (state.stats && typeof state.stats.expeditions === "number") ? state.stats.expeditions : 0; } catch {}
      state.bruceEgg = { stage: 0, sharkId: speciesId, playerName: rec.name.trim(), started: Date.now(), lastAdvance: 0, expeditionsAtStage: expCount };
      try { localStorage.setItem("tyi-bruce", JSON.stringify(state.bruceEgg)); } catch {}
      // Deliberately no pushThread here. Sarah will notice... eventually.
    }
  } catch (e) {
    /* v1.5.2-beta: never let an easter egg crash naming — log and continue. */
    if (typeof console !== "undefined" && console.warn) console.warn("maybeNameEgg:", e);
  }
}

/* v0.23.0: advance the Bruce chain. Called on expedition completion and game
   load. Stages are spaced: at least 2 expeditions OR 12 hours between stages,
   so it unfolds slowly over multiple sessions. */
function advanceBruceChain() {
  if (!state.bruceEgg || state.bruceChainComplete) return;
  if (typeof BRUCE_CHAIN === "undefined") return;
  const now = Date.now();
  /* v1.5.25-beta: defensive reads — never let missing stats block the chain. */
  let _expNow = 0;
  try { _expNow = (state.stats && typeof state.stats.expeditions === "number") ? state.stats.expeditions : 0; } catch {}
  const stage = state.bruceEgg.stage;
  /* v1.5.32-beta: stage 0 (the opener) fires immediately — Sarah should
     react when the player names a shark Bruce, not stay silent. The
     2-expedition/12-hour spacing applies BETWEEN stages, not before the
     first one. Previously the gate blocked stage 1 too, so naming a shark
     Bruce on the first catch produced no feedback at all. */
  if (stage > 0) {
    const expeditionsSince = _expNow - (state.bruceEgg.expeditionsAtStage || 0);
    const hoursSince = (now - (state.bruceEgg.lastAdvance || state.bruceEgg.started)) / 3600000;
    // Need either 2+ expeditions or 12+ hours since last stage
    if (expeditionsSince < 2 && hoursSince < 12) return;
  }
  if (stage >= BRUCE_CHAIN.length) {
    // Chain complete — unlock hidden achievement
    state.bruceChainComplete = true;
    try {
      localStorage.setItem("tyi-bruce-done", "1");
      localStorage.removeItem("tyi-bruce");
    } catch {}
    state.bruceEgg = null;
    checkAchievements(); // v1.7.10-beta: Bruce achievement fires when the chain starts
    return;
  }

  // Push this stage's messages. v0.23.0: personalize {species} with the
  // player's Bruce, so the history attaches to THEIR shark, not a lecture.
  // v1.5.24: {bruce} uses the player's exact capitalization; OG Jaws/Nemo
  // references always say "Bruce" in the text itself.
  let bruceSpecies = "shark";
  let bruceName = "Bruce"; /* fallback for chains started before v1.5.24 */
  try {
    const bs = sharkById(state.bruceEgg.sharkId);
    if (bs && bs.name) bruceSpecies = bs.name.toLowerCase();
    if (state.bruceEgg.playerName) bruceName = state.bruceEgg.playerName;
  } catch {}
  pushThread(BRUCE_CHAIN[stage].map(m => ({
    who: m.who,
    text: String(m.text).split("{species}").join(bruceSpecies).split("{bruce}").join(bruceName)
  })));
  state.bruceEgg.stage = stage + 1;
  state.bruceEgg.lastAdvance = now;
  state.bruceEgg.expeditionsAtStage = _expNow;
  // If that was the final stage, complete the chain NOW (not on a later call)
  if (state.bruceEgg.stage >= BRUCE_CHAIN.length) {
    state.bruceChainComplete = true;
    try {
      localStorage.setItem("tyi-bruce-done", "1");
      localStorage.removeItem("tyi-bruce");
    } catch {}
    state.bruceEgg = null;
    checkAchievements();
    return;
  }
  try { localStorage.setItem("tyi-bruce", JSON.stringify(state.bruceEgg)); } catch {}
}

$("tagConfirm").addEventListener("click", () => confirmTag($("sharkName").value.trim()));

/* ---------- Collection book: compact grid, tap for detail ---------- */

function displayName(t) {
  return t.name ? `“${esc(t.name)}”` : "";
}
function idLine(t) {
  return `<span class="research-id">🔬 ${esc(t.researchId || "")}</span>`;
}

function renderCollection() {
  const list = $("collectionList");
  list.innerHTML = "";
  const shelf = $("trophyShelf");
  shelf.innerHTML = "";
  const ids = Object.keys(state.tagged);
  /* v1.4.2: count lives in the page header now, not the tab */
  const ccHead = $("collectionCountHead");
  if (ccHead) ccHead.innerHTML = `<strong>${ids.length}</strong> of <strong>${SHARKS.length}</strong> species tagged`;

  /* v1.7.19-beta: the Master Shark Tagger trophy moved to the Achievements
     tab (renderAchievements) — the derpy toggle/claim stay on this shelf. */

  /* v1.7.17-beta: manual derpy claim fallback — if the player has won but
     the automatic unlock never fired, show a one-time claim button.
     v1.7.18-beta: check the tagged roster directly instead of state.won,
     since the win flag can be reset by migrations.
     (Mira review): use the shared hasFullRoster() helper — stale keys can
     never pass — and hide while a win ceremony is pending, since the
     ceremony presents Sarah's gift itself. */
  if (hasFullRoster() && !state.derpyUnlocked && !state.pendingWin) {
    const cb = document.createElement("button");
    cb.type = "button";
    cb.className = "derpy-claim";
    cb.setAttribute("aria-label", "Réclamer ta récompense des requins zinzins");
    cb.innerHTML = `\uD83C\uDF81 Claim your derpy award`;
    cb.addEventListener("click", () => {
      /* v1.7.19-beta Mira review: only re-render on a successful claim, and
         render Achievements too — the relocated trophy appears immediately
         for legacy winners without a reload. */
      if (claimDerpyAward()) {
        renderAchievements();
      }
      renderCollection();
      renderResearch();
    });
    shelf.appendChild(cb);
  }

  /* v1.7.0-beta: derpy mode toggle — win-unlocked completion award. */
  if (state.derpyUnlocked) {
    const d = document.createElement("button");
    d.type = "button";
    d.className = "derpy-toggle" + (state.derpyMode ? " active" : "");
    d.setAttribute("aria-pressed", state.derpyMode ? "true" : "false");
    d.setAttribute("aria-label", "Activer ou désactiver le mode zinzin");
    d.innerHTML = `\uD83E\uDD88 Derpy mode: ${state.derpyMode ? "activé" : "désactivé"}`;
    d.addEventListener("click", () => {
      state.derpyMode = !state.derpyMode;
      try { localStorage.setItem("tyi-derpy-mode", state.derpyMode ? "1" : "0"); } catch {}
      renderCollection();
      renderResearch();
    });
    shelf.appendChild(d);
  }

  if (!ids.length && !state.won) {
    list.innerHTML = `<div class="empty-note">No sharks tagged yet.<br>Do your research, then get out there. 🦈</div>`;
    return;
  }
  SHARKS.filter(s => state.tagged[s.id]).forEach(s => {
    const t = state.tagged[s.id];
    const cell = document.createElement("button");
    cell.type = "button";
    /* v1.8.1-beta: 100%-complete indicator — every insight discovered for
       this species. Derived from existing unlock data; no save change.
       Index-membership check (same definition as Dedicated): a
       full-length array with a missing index (e.g. an imported
       [0,1,2,99] or duplicate [0,0,1,2]) must NOT count as complete. */
    const _pool = insightPoolFor(s.id);
    const _unlocked = state.unlockedFacts[s.id] || [];
    const _insightsComplete = _pool.length > 0 && _pool.every((_, i) => _unlocked.includes(i));
    cell.className = "grid-cell" + (_insightsComplete ? " insights-complete" : "");
    if (_insightsComplete) cell.title = "Toutes les découvertes obtenues — 100 %";
    cell.setAttribute("aria-label", `Open details for ${t.name ? esc(t.name) : esc(t.researchId)} ${s.name}${_insightsComplete ? " — all insights discovered" : ""}`);
    cell.innerHTML = `
      <div class="shark-art">${sharkArtImg(s.id, "illustration", s.name)}</div>
      <div class="grid-cell-text">
        ${t.name ? `<div class="grid-name">“${esc(t.name)}”</div>` : ""}
        <div class="grid-id">${esc(t.researchId)}</div>
        <h3>${s.name}</h3>
        <p class="latin">${s.latin}</p>
      </div>`;
    cell.addEventListener("click", () => openDetail(s.id));
    list.appendChild(cell);
  });
}

/* v2.5.6-beta: the completion date printed on the certificate —
   the recorded win date, else the Fin-ished achievement's unlock
   timestamp, else today (stamped so it never drifts afterwards). */
function certAwardDate() {
  let ts = state.wonAt || state.achievements["finished"] || null;
  if (!ts) {
    ts = Date.now();
    state.wonAt = ts;
    try { localStorage.setItem("tyi-won-at", String(ts)); } catch {}
  }
  return new Date(ts).toLocaleDateString("fr-CA",
    { year: "numeric", month: "long", day: "numeric" });
}

/* v2.5.6-beta: the certificate figure — Avery's artwork with the
   player's name on the printed line and the award date filled in.
   Shared by the Achievements modal and the win ceremony (beat 1),
   where signing it is the moment. */
function certFigureHTML() {
  return `
    <figure class="cert-figure">
      <img class="cert-img" src="assets/master-tagger-certificate.jpg" alt="Certificat de Maître du marquage des requins — Programme de terrain Sur la piste des requins">
      <input id="certName" class="cert-name" type="text" maxlength="40" autocomplete="off"
        placeholder="" aria-label="Ton nom sur le certificat">
      <span class="cert-date">${esc(certAwardDate())}</span>
    </figure>`;
}

/* v2.5.6-beta: export geometry — where the name and date are drawn on
   the native 1125×781 artwork (measured from the printed lines: name
   line centre x≈50.2%, baseline on the line y≈55.0% so descenders
   dip beneath it like handwriting; date line centre
   x≈77.9%, baseline just above y=80.4%). Font sizes scale with width. */
const CERT_DRAW = { nameX: 0.502, nameBase: 0.550, namePx: 61, dateX: 0.779, dateBase: 0.799, datePx: 33 };
const CERT_FONT = '"Snell Roundhand", "Segoe Script", "Brush Script MT", cursive';

/* Shrink-to-fit: the largest font size (≤ basePx) at which text fits
   maxW, measured on a canvas. A 40-character name at the full
   signature size would draw through the certificate border in the
   export — the on-screen input clips, the canvas does not (Mira). */
function fitTextPx(text, basePx, maxW, family) {
  if (!text || !(basePx > 0) || !(maxW > 0)) return basePx;
  let ctx = null;
  try {
    const cv = document.createElement("canvas");
    ctx = cv.getContext && cv.getContext("2d");
  } catch {}
  if (!ctx || !ctx.measureText) return basePx;
  ctx.font = `${basePx}px ${family}`;
  const w = ctx.measureText(text).width;
  if (!(w > maxW)) return basePx;
  return Math.max(10, Math.floor(basePx * maxW / w));
}

/* The certificate is a keepsake: composite the artwork + the player's
   name + the award date at native resolution and share/download it.
   The salt caption is modal dressing and is NOT part of the export. */
function exportCertificate() {
  const img = new Image();
  img.onload = () => {
    const cv = document.createElement("canvas");
    cv.width = img.naturalWidth || 1125;
    cv.height = img.naturalHeight || 781;
    const ctx = cv.getContext("2d");
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = "#2b3a55";
    ctx.textAlign = "center";
    const scale = cv.width / 1125;
    if (state.certName) {
      const namePx = fitTextPx(state.certName, CERT_DRAW.namePx * scale, cv.width * 0.66, CERT_FONT);
      ctx.font = `${Math.round(namePx)}px ${CERT_FONT}`;
      ctx.fillText(state.certName, cv.width * CERT_DRAW.nameX, cv.height * CERT_DRAW.nameBase);
    }
    const dateText = certAwardDate();
    const datePx = fitTextPx(dateText, CERT_DRAW.datePx * scale, cv.width * 0.23, CERT_FONT);
    ctx.font = `${Math.round(datePx)}px ${CERT_FONT}`;
    ctx.fillText(dateText, cv.width * CERT_DRAW.dateX, cv.height * CERT_DRAW.dateBase);
    cv.toBlob(async (blob) => {
      if (!blob) return;
      const fname = "master-shark-tagger-certificate.jpg";
      if (navigator.share && navigator.canShare) {
        const file = new File([blob], fname, { type: "image/jpeg" });
        if (navigator.canShare({ files: [file] })) {
          try { await navigator.share({ files: [file], title: "Maître du marquage des requins" }); return; }
          catch (e) { if (e && e.name === "AbortError") return; }
        }
      }
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = fname;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    }, "image/jpeg", 0.92);
  };
  img.src = "assets/master-tagger-certificate.jpg";
}

function certActionsHTML() {
  return `
    <div class="cert-actions">
      <button id="certSave" class="cert-action-btn" type="button">📥 Save / share certificate</button>
    </div>`;
}

function wireCertSave() {
  const b = $("certSave");
  if (b) b.addEventListener("click", exportCertificate);
}

/* Keep the on-screen signature and date inside their printed lines,
   mirroring the export fit: the signature field is 68% of the figure
   wide (its base size is 5.4cqw of the figure), the date span 26%
   (base 2.9cqw). No-op until the elements are laid out. */
function fitCertDisplays(nameInput) {
  if (!nameInput || !nameInput.clientWidth) return;
  const figW = nameInput.clientWidth / 0.68;
  nameInput.style.fontSize =
    fitTextPx(nameInput.value, figW * 0.054, nameInput.clientWidth, CERT_FONT) + "px";
  const fig = nameInput.closest && nameInput.closest("figure");
  const dateEl = fig && fig.querySelector && fig.querySelector(".cert-date");
  if (dateEl && dateEl.clientWidth) {
    dateEl.style.fontSize =
      fitTextPx(dateEl.textContent, figW * 0.029, dateEl.clientWidth, CERT_FONT) + "px";
  }
}

/* The fitted sizes are inline pixels, which override the responsive
   cqw base — re-fit when the figure's width changes (rotation,
   window resize). Registered once, scoped to the certificate. */
let certResizeWired = false;
function wireCertResize() {
  if (certResizeWired) return;
  certResizeWired = true;
  window.addEventListener("resize", () => {
    const ni = $("certName");
    if (ni) fitCertDisplays(ni);
  });
}

function wireCertName() {
  const nameInput = $("certName");
  const nameBox = $("certNameBox");
  const sync = (from, to) => {
    state.certName = from.value;
    if (to) to.value = from.value;
    try { localStorage.setItem("tyi-cert-name", state.certName); } catch {}
    fitCertDisplays(nameInput);
  };
  if (nameInput) {
    nameInput.value = state.certName || "";
    nameInput.addEventListener("input", () => sync(nameInput, nameBox));
  }
  if (nameBox) {
    nameBox.value = state.certName || "";
    nameBox.addEventListener("input", () => sync(nameBox, nameInput));
  }
  wireCertResize();
  fitCertDisplays(nameInput);
  return nameInput;
}

/* v2.5.6-beta: a plain, always-visible name box that mirrors the
   certificate's signature line. On touch devices the keyboard can
   cover the certificate itself while typing (Avery, 2026-10-20) —
   the box stays in view, and the name appears on the line as typed. */
function certNameBoxHTML() {
  return `
    <label class="cert-name-box">Your name
      <input id="certNameBox" type="text" maxlength="40" autocomplete="off" placeholder="Your name">
    </label>`;
}

function openCertificate() {
  const c = $("detailContent");
  /* v2.5.6-beta (Mira review): certificate mode leaves the two-column
     shark-detail grid — the figure and caption stack full-width. */
  c.classList.add("cert-mode");
  c.innerHTML = certFigureHTML() +
    certNameBoxHTML() +
    certActionsHTML() + `
    <p class="cert-sig" style="text-align:center">Awarded with salt on it. 🦈</p>`;
  /* Unhide BEFORE wiring (Mira review): under display:none the name
     field has zero width and the shrink-to-fit would skip, leaving a
     persisted long name unfitted until the first keystroke. */
  $("detailOverlay").classList.remove("hidden");
  wireCertName();
  wireCertSave();
}

function openDetail(id) {
  const s = sharkById(id);
  const t = state.tagged[id];
  const c = $("detailContent");
  c.classList.remove("cert-mode");
  c.innerHTML = `
    <div class="detail-art">
    <div class="shark-art">${sharkArtImg(s.id, "illustration", s.name)}</div>
    </div>
    <div class="detail-identity">
    ${t.name ? `<div class="given-name">“${esc(t.name)}”</div>` : ""}
    <div class="detail-name-row">
      ${idLine(t)}
      <button id="renameBtn" class="mini-button" type="button">✏️ ${t.name ? "Rename" : "Add nickname"}</button>
    </div>
    <div id="renameForm" class="hidden">
      <input id="renameInput" type="text" maxlength="24" value="${esc(t.name)}" placeholder="Nomme ton requin…" />
      <div class="rename-actions">
        <button id="renameSave" class="primary-button" type="button">Save</button>
        <button id="renameCancel" class="secondary-button" type="button">Cancel</button>
      </div>
    </div>
    <h3 style="margin:6px 0 0">${s.name}</h3>
    <p class="latin detail-scientific">${s.latin}</p>
    <span class="status-pill">IUCN: ${s.status}</span>
    <p class="book-stats">
      📏 ${t.length} m · ${t.sex === "female" ? "♀ femelle" : "♂ mâle"}<br>
      📍 Marqué à ${esc(t.location)}<br>
      📅 ${esc(t.date)}
    </p>
    <button id="trackBtn" class="secondary-button" type="button" style="margin:4px 0 8px" aria-pressed="${t.mapTrack ? "true" : "false"}">${t.mapTrack ? "📍 Suivi sur la carte ✓" : "📍 Suivre ce requin"}</button>
    ${(() => {
      /* v1.7.23-beta: show only the most recent 3 re-sightings; older ones
         hide behind a "Show all" toggle. Re-sightings are stored
         oldest-first, so the visible slice is the tail of the list.
         v1.7.33-beta: the block lives in the left (identity) column,
         under stats + Track, so the columns balance on long entries. */
      if (!t.resightings || !t.resightings.length) return "";
      const total = t.resightings.length;
      const VISIBLE = 3;
      const recent = t.resightings.slice(-VISIBLE);
      const older = t.resightings.slice(0, -VISIBLE);
      const li = r => `<li>📍 ${esc(r.date)} — ${esc(r.location)}<br><span class="dim">${esc(r.note)}</span></li>`;
      return `<div class="resight-block">
      <h4>🔁 Re-sightings (${total})</h4>
      ${older.length ? `<ul id="resightOlder" class="track-stops hidden">${older.map(li).join("")}</ul>` : ""}
      <ul class="track-stops">${recent.map(li).join("")}</ul>
      ${older.length ? `<button id="resightMore" class="mini-button" type="button" aria-expanded="false">Show all (${total})</button>` : ""}
    </div>`;
    })()}
    </div>
    <div class="detail-record">
    ${t.notes && t.notes.length ? `
    <div class="watch-notes-block">
      <h4>📓 Field notes from watching (${t.notes.length})</h4>
      <ul class="track-stops">
        ${t.notes.map(n => `<li>👁️ ${esc(n)}</li>`).join("")}
      </ul>
    </div>` : ""}
    ${(() => {
      /* v1.4.0-beta: show unlocked tag-along facts in the collection detail.
         v1.8.0-beta: the block ALWAYS renders — 0/N when nothing is
         unlocked yet — so the player can see what there is to learn.
         Hook + bonus are real insights now (insightPoolFor), not
         separate 💡/✨ blocks. */
      const unlocked = state.unlockedFacts[id] || [];
      const pool = insightPoolFor(id);
      const shown = unlocked.map(i => pool[i]).filter(Boolean);
      return `<div class="secret-facts-block">
        <h4>🔬 Tag-along insights (${shown.length}/${pool.length})</h4>
        ${shown.length ? `<ul class="track-stops">
          ${shown.map(f => `<li>🔬 ${esc(f)}</li>`).join("")}
        </ul>` : ""}
      </div>`;
    })()}
    ${s.conservation ? `<p class="conservation-note">🌊 <strong>Conservation:</strong> ${s.conservation}</p>` : ""}
    </div>
  `;
  $("detailOverlay").classList.remove("hidden");
  /* v1.8.6-beta: "Track this shark" is a real toggle — the tracking map
     draws the full route only for sharks with mapTrack on (persisted).
     The detailed per-shark track overlay moved to the map marker popup. */
  $("trackBtn").addEventListener("click", () => {
    setMapTrack(t, !t.mapTrack);
    const btn = $("trackBtn");
    btn.textContent = t.mapTrack ? "📍 Suivi sur la carte ✓" : "📍 Suivre ce requin";
    btn.setAttribute("aria-pressed", String(!!t.mapTrack));
  });
  /* v1.7.23-beta: re-sightings "Show all" toggle. Collapsed again on reopen
     because openDetail re-renders from scratch each time. */
  const resightMore = $("resightMore");
  if (resightMore) {
    let resightsExpanded = false;
    resightMore.addEventListener("click", () => {
      resightsExpanded = !resightsExpanded;
      $("resightOlder").classList.toggle("hidden", !resightsExpanded);
      resightMore.textContent = resightsExpanded ? "Afficher moins" : `Show all (${t.resightings.length})`;
      resightMore.setAttribute("aria-expanded", String(resightsExpanded));
    });
  }
  $("renameBtn").addEventListener("click", () => {
    $("renameForm").classList.remove("hidden");
    $("renameBtn").classList.add("hidden");
    const inp = $("renameInput");
    inp.focus();
    inp.select();
  });
  $("renameCancel").addEventListener("click", () => {
    $("renameForm").classList.add("hidden");
    $("renameBtn").classList.remove("hidden");
  });
  $("renameSave").addEventListener("click", () => {
    t.name = $("renameInput").value.trim();
    store.save(state.tagged);
    maybeSarahEgg(id, t);
    maybeNameEgg(id, t); // v0.23.0: Mary Lee / Nicole / Bruce
    /* v1.5.20-beta: check achievements on any rename — naming a shark
       "Sarah" outside an expedition must still unlock Best Cousin Ever. */
    checkAchievements();
    renderCollection();
    renderResearch();
    openDetail(id);
  });
}

/* ---------- Shark tracking: where are they now? ---------- */

function openTrack(id) {
  const s = sharkById(id);
  const t = state.tagged[id];
  if (!t.track) { t.track = genTrack(s, t); store.save(state.tagged); }
  const tr = t.track;
  /* v1.8.7-beta: the track shows travel only. Re-sighting-flagged points
     (present on older saves until the migration runs) are excluded from
     the graph, stats, timeline, and last ping — re-sightings live in the
     logbook, not on the movement track. */
  const travelPoints = tr.points.filter(p => !p.resighting);
  const points = travelPoints.length ? travelPoints : tr.points;
  const totalKm = Math.round(points.reduce((a, p) => a + (p.km || 0), 0) * 10) / 10;
  const days = points.length ? points[points.length - 1].day : tr.days;
  const W = 320, H = 168, pad = 26;
  const n = points.length;
  const pts = points.map((p, i) => {
    const x = pad + (n === 1 ? 0.5 : i / (n - 1)) * (W - pad * 2);
    const jitter = ((hashStr(p.label) % 100) / 100 - 0.5) * (H - pad * 2 - 30);
    const y = Math.round(H / 2 + jitter);
    return { x: Math.round(x), y, p };
  });
  const pathD = pts.map((pt, i) => (i === 0 ? "M" : "L") + pt.x + " " + pt.y).join(" ");
  const dots = pts.map((pt, i) => {
    const first = i === 0, last = i === pts.length - 1;
    return `<circle cx="${pt.x}" cy="${pt.y}" r="${last ? 6 : 4}" fill="${last ? "#ffd166" : "#4fd1c5"}" stroke="#0b2237" stroke-width="2"/>
      ${first || last ? `<text x="${pt.x}" y="${pt.y - 10}" text-anchor="middle" fill="#a9c3d6" font-size="9">${esc(first ? "marqué ici" : "dernier point du trajet")}</text>` : ""}`;
  }).join("");
  const last = points[points.length - 1];
  const stops = points.map((p, i) =>
    `<li>${i === 0 ? "📍" : "▫️"} Day ${p.day} — ${esc(p.label)}${p.km ? ` <span class="dim">(+${p.km.toLocaleString()} km)</span>` : ""}</li>`
  ).join("");
  const title = t.name ? `“${esc(t.name)}”` : esc(t.researchId);
  $("trackContent").innerHTML = `
    <div class="phone-head">📍 Tracking ${title} <span class="research-id">${esc(t.researchId)}</span></div>
    <svg viewBox="0 0 ${W} ${H}" class="track-map" role="img" aria-label="Migration track map">
      <rect x="0" y="0" width="${W}" height="${H}" rx="12" fill="#0a1c30"/>
      ${[0.25, 0.5, 0.75].map(f => `<line x1="0" y1="${H * f}" x2="${W}" y2="${H * f}" stroke="#16405f" stroke-width="1" stroke-dasharray="4 6"/>`).join("")}
      <path d="${pathD}" fill="none" stroke="#4fd1c5" stroke-width="2.5" stroke-dasharray="7 5" opacity="0.85"/>
      ${dots}
    </svg>
    <div class="track-stats">
      <div><strong>${totalKm.toLocaleString()} km</strong><span>travelled</span></div>
      <div><strong>${days} days</strong><span>at liberty</span></div>
      <div><strong>${points.length}</strong><span>locations</span></div>
    </div>
    <ul class="track-stops">${stops}</ul>
    <p class="track-note">Last ping: <strong>${esc(last.label)}</strong> · day ${last.day}<br>
    <span class="dim">${esc(tr.hypothetical ? "Scénario de déplacement hypothétique — cet itinéraire illustre un déplacement plausible à longue distance pour une espèce migratrice, pas une reconstitution du trajet de cet individu." : tr.kind === "archival" ? "Scénario de déplacement illustratif fondé sur l'habitat. Ces positions ne sont pas des détections réelles de cet individu." + (s.id === "sawshark" ? " (Pop-up satellite archival tags have been deployed on common sawsharks off Tasmania — Burke et al. 2020.)" : "") : (TRACK_KIND_NOTES[tr.kind] || TRACK_KIND_NOTES.satellite))}</span></p>
  `;
  $("trackOverlay").classList.remove("hidden");
}

$("trackClose").addEventListener("click", () => {
  $("trackOverlay").classList.add("hidden");
});
$("trackOverlay").addEventListener("click", (e) => {
  if (e.target === $("trackOverlay")) $("trackOverlay").classList.add("hidden");
});

$("detailClose").addEventListener("click", () => {
  $("detailOverlay").classList.add("hidden");
});
/* v1.7.23-beta: top-right ✕ buttons delegate to the bottom Close buttons,
   so the exit is visible the moment the modal opens and behaviour stays
   in exactly one place. */
$("detailCloseTop").addEventListener("click", () => $("detailClose").click());
$("trackCloseTop").addEventListener("click", () => $("trackClose").click());
$("detailOverlay").addEventListener("click", (e) => {
  if (e.target === $("detailOverlay")) $("detailOverlay").classList.add("hidden");
});

/* ---------- Hard progress reset ----------
   v0.7.0: a full wipe for replay and testing — not prestige, no bonuses,
   just a clean restart. Two explicit steps so it can't be hit by accident. */
/* v0.20.0 Mira review fix: tyi-pinned and tyi-pace belong to full reset. */
const RESET_KEYS = ["tyi-collection", "tyi-messages", "tyi-won", "tyi-archive", "tyi-idseq", "tyi-sightings", "tyi-regions", "tyi-logbook", "tyi-stats", "tyi-achievements", "tyi-pinned", "tyi-pace", "tyi-last-seen-version", "tyi-bruce", "tyi-bruce-done", "tyi-facts", "tyi-pending-celebrations", "tyi-reunion-reacted", "tyi-derpy-unlocked", "tyi-derpy-mode", "tyi-bukangi", "tyi-bukangi-update", "tyi-won-at", "tyi-cert-name", "tyi-tour-seen"]; // v1.4.0-beta: +tyi-facts; v1.5.3-beta: +tyi-pending-celebrations, +tyi-reunion-reacted; v2.5.6-beta: +tyi-won-at, +tyi-cert-name; v2.6.0: +tyi-tour-seen

/* v0.23.0: save export/import for the public beta. */
function exportSave() {
  const data = { version: VERSION, exportedAt: new Date().toISOString(), keys: {} };
  RESET_KEYS.forEach(k => {
    try {
      const v = localStorage.getItem(k);
      if (v !== null) data.keys[k] = v;
    } catch {}
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const aEl = document.createElement("a");
  aEl.href = url;
  aEl.download = "tag-along-save-" + VERSION + ".json";
  document.body.appendChild(aEl);
  aEl.click();
  setTimeout(() => { document.body.removeChild(aEl); URL.revokeObjectURL(url); }, 100);
}
/* v0.23.0 Mira review: safe import — validate everything BEFORE touching
   storage, replace the complete key set (clear missing keys), and back up
   the existing save first. */
/* v0.23.0 Mira review: strict validation. Reject anything questionable —
   this is player data going into a public beta. */
const SAVE_KEY_ALLOWLIST = [...RESET_KEYS, "tyi-bruce", "tyi-bruce-done"];
function validateSaveData(data) {
  if (!data || typeof data !== "object") return { ok: false, reason: "not an object" };
  if (!data.keys || typeof data.keys !== "object") return { ok: false, reason: "missing keys" };
  const keyNames = Object.keys(data.keys);
  // Must have at least one recognized key with actual content
  if (keyNames.length === 0) return { ok: false, reason: "empty save (no keys)" };
  // Reject ALL unknown keys
  const unknown = keyNames.filter(k => !SAVE_KEY_ALLOWLIST.includes(k));
  if (unknown.length > 0) return { ok: false, reason: "unrecognized keys: " + unknown.slice(0, 3).join(", ") };
  // Validate shapes, not just JSON parsing
  for (const [k, v] of Object.entries(data.keys)) {
    if (typeof v !== "string") return { ok: false, reason: "non-string value for " + k };
    if (k === "tyi-collection" && v) {
      let parsed;
      try { parsed = JSON.parse(v); } catch { return { ok: false, reason: "invalid JSON in tyi-collection" }; }
      if (typeof parsed !== "object" || Array.isArray(parsed) || parsed === null)
        return { ok: false, reason: "tyi-collection must be an object" };
      // Each record must be a proper shark entry (protects migrateIds())
      for (const [sid, rec] of Object.entries(parsed)) {
        if (rec === null || typeof rec !== "object" || Array.isArray(rec))
          return { ok: false, reason: "tyi-collection[" + sid + "] is not a shark record" };
        if (rec.tagged === true && (typeof rec.researchId !== "string" || !rec.researchId))
          return { ok: false, reason: "tyi-collection[" + sid + "] missing researchId" };
      }
    }
    if (k === "tyi-logbook" && v) {
      let parsed;
      try { parsed = JSON.parse(v); } catch { return { ok: false, reason: "invalid JSON in tyi-logbook" }; }
      if (!Array.isArray(parsed)) return { ok: false, reason: "tyi-logbook must be an array" };
      for (let i = 0; i < parsed.length; i++) {
        const t = parsed[i];
        if (t === null || typeof t !== "object")
          return { ok: false, reason: "tyi-logbook[" + i + "] is not a trip record" };
        // Essential fields the rendering path depends on
        if (!Array.isArray(t.encounters))
          return { ok: false, reason: "tyi-logbook[" + i + "] missing encounters" };
        for (let j = 0; j < t.encounters.length; j++) {
          const e = t.encounters[j];
          if (e === null || typeof e !== "object")
            return { ok: false, reason: "tyi-logbook[" + i + "].encounters[" + j + "] invalid" };
        }
      }
    }
    if (k === "tyi-messages" && v) {
      let parsed;
      try { parsed = JSON.parse(v); } catch { return { ok: false, reason: "invalid JSON in tyi-messages" }; }
      // saveMsgs() stores an object with a messages array inside
      if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed))
        return { ok: false, reason: "tyi-messages must be an object" };
      if (!Array.isArray(parsed.messages))
        return { ok: false, reason: "tyi-messages.messages must be an array" };
      // Each thread: modern { ts, msgs } object OR legacy bare-array (normThread handles both)
      for (let i = 0; i < parsed.messages.length; i++) {
        const t = parsed.messages[i];
        let msgs;
        if (Array.isArray(t)) msgs = t;  // legacy bare-array thread
        else if (t !== null && typeof t === "object" && Array.isArray(t.msgs)) msgs = t.msgs;
        else return { ok: false, reason: "tyi-messages.messages[" + i + "] invalid" };
        // Each message entry must be an object
        for (let j = 0; j < msgs.length; j++) {
          if (msgs[j] === null || typeof msgs[j] !== "object")
            return { ok: false, reason: "tyi-messages.messages[" + i + "][" + j + "] invalid" };
        }
      }
    }
    if (k === "tyi-stats" && v) {
      let parsed;
      try { parsed = JSON.parse(v); } catch { return { ok: false, reason: "invalid JSON in tyi-stats" }; }
      if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed))
        return { ok: false, reason: "tyi-stats must be an object" };
      // regionsVisited is used with .includes() — must be array or absent
      if ("regionsVisited" in parsed && !Array.isArray(parsed.regionsVisited))
        return { ok: false, reason: "tyi-stats.regionsVisited must be an array" };
    }
  }
  // Version: must be a recognized Tag Along version, else reject
  const fv = data.version || "unknown";
  /* v1.4.0-beta Mira review (blocker 3): accept the 1.x beta lineage so
     exported v1.3.x playtest saves import cleanly. */
  const supported = /^v0\.(1[0-9]|2[0-3])\./.test(fv) || /^v1\.\d+\.\d+-beta$/.test(fv) || fv === VERSION;
  if (!supported) return { ok: false, reason: "unsupported version: " + fv };
  // Progress-bearing payload: importing tyi-pace alone would wipe the collection
  const hasProgress = ["tyi-collection", "tyi-logbook", "tyi-won"].some(k => {
    const v = data.keys[k];
    return typeof v === "string" && v.length > 2 && v !== "{}" && v !== "[]" && v !== "null";
  });
  if (!hasProgress) return { ok: false, reason: "no actual progress in save" };
  return { ok: true, version: fv };
}
/* v0.23.0 Mira review: snapshot returns the data AND whether it worked.
   We verify the backup before claiming it exists. */
function snapshotCurrentSave() {
  const snap = {};
  try {
    SAVE_KEY_ALLOWLIST.forEach(k => {
      const v = localStorage.getItem(k);
      if (v !== null) snap[k] = v;
    });
    return { ok: true, snap };
  } catch (e) {
    return { ok: false };
  }
}
function restoreSnapshot(snap, storage) {
  const s = storage || (typeof localStorage !== "undefined" ? localStorage : null);
  if (!s) return false;
  try {
    SAVE_KEY_ALLOWLIST.forEach(k => {
      if (k in snap) s.setItem(k, snap[k]);
      else s.removeItem(k);
    });
    return true;
  } catch { return false; }
}
/* v0.23.0 Mira review: storage replacement as a testable unit.
   storage defaults to localStorage but tests can inject a failing stub. */
function replaceSaveKeys(keys, storage) {
  const s = storage || (typeof localStorage !== "undefined" ? localStorage : null);
  if (!s) throw new Error("no storage");
  SAVE_KEY_ALLOWLIST.forEach(k => {
    if (k in keys) s.setItem(k, keys[k]);
    else s.removeItem(k);
  });
}
function importSave(file) {
  const reader = new FileReader();
  reader.onload = () => {
    let data;
    try { data = JSON.parse(reader.result); }
    catch { alert("Couldn't read that file. Is it a valid Tag Along save?"); return; }
    // Validate BEFORE touching storage
    const check = validateSaveData(data);
    if (!check.ok) {
      alert("That save file looks incompatible (" + check.reason + "). Nothing was changed.");
      return;
    }
    let msg = "Import this save? Your current progress will be replaced.\n\n";
    msg += "File version: " + check.version + "\nCurrent version: " + VERSION;
    msg += "\n\nYou'll be offered a backup download first.";
    if (!confirm(msg)) return;
    // Snapshot current progress BEFORE touching anything
    const before = snapshotCurrentSave();
    if (!before.ok) {
      alert("Couldn't read your current save. Import cancelled — nothing was changed.");
      return;
    }
    // Offer backup download (accessible recovery, not just a hidden key)
    const backupBlob = new Blob([JSON.stringify({ version: VERSION, exportedAt: new Date().toISOString(), keys: before.snap }, null, 2)], { type: "application/json" });
    const backupUrl = URL.createObjectURL(backupBlob);
    const backupA = document.createElement("a");
    backupA.href = backupUrl;
    backupA.download = "tag-along-backup-" + VERSION + ".json";
    document.body.appendChild(backupA);
    backupA.click();
    setTimeout(() => { document.body.removeChild(backupA); URL.revokeObjectURL(backupUrl); }, 100);
    // Also keep a hidden copy
    try { localStorage.setItem("tyi-backup", JSON.stringify({ version: VERSION, keys: before.snap })); } catch {}
    // Replace complete key set with true rollback on failure
    try {
      replaceSaveKeys(data.keys);
    } catch (e) {
      // Roll back to the snapshot
      const restored = restoreSnapshot(before.snap);
      alert(restored
        ? "Import failed — your previous save has been restored."
        : "Import failed and rollback also failed. If the backup download completed, that file has your data — otherwise your previous progress may be lost.");
      return;
    }
    location.reload();
  };
  reader.readAsText(file);
}
// Wire up buttons (after DOM ready — these run at script load, elements exist)
(function initSaveButtons() {
  const ex = document.getElementById("exportBtn");
  if (ex) ex.addEventListener("click", exportSave);
  const im = document.getElementById("importBtn");
  const fi = document.getElementById("importFile");
  if (im && fi) {
    im.addEventListener("click", () => fi.click());
    fi.addEventListener("change", () => {
      if (fi.files && fi.files[0]) importSave(fi.files[0]);
      fi.value = ""; // reset so the same file can be picked again
    });
  }
})();
$("resetBtn").addEventListener("click", () => {
  $("resetOverlay").classList.remove("hidden");
});
$("resetCancel").addEventListener("click", () => {
  $("resetOverlay").classList.add("hidden");
});
$("resetOverlay").addEventListener("click", (e) => {
  if (e.target === $("resetOverlay")) $("resetOverlay").classList.add("hidden");
});
$("resetConfirm").addEventListener("click", () => {
  RESET_KEYS.forEach(k => { try { localStorage.removeItem(k); } catch {} });
  location.reload();
});

/* ---------- Boot ---------- */

function renderAll() {
  renderResearch();
  renderPlanner();
  renderCollection();
  renderSightings();
  renderLogbook();
  renderMessages();
  updateMsgBadge();
  updateArchiveTab();
  if (state.archiveUnlocked) renderArchive();
  renderSarahAsk();
  renderAchievements(); // v0.18.0
  renderExpeditionPin(); // v0.20.0
  renderPinHint(); // v0.22.0
  /* v0.20.0: restore quick-pace preference (the change listener is bound
     once at init — Mira review fix: binding it here accumulated listeners
     on every renderAll). */
  const qp = $("quickPace");
  if (qp) {
    let saved = false;
    try { saved = localStorage.getItem("tyi-pace") === "quick"; } catch {}
    qp.checked = saved;
    if (saved) setPace(true);
  }
}

/* v0.20.0: Wild Archive UI lives in archive-ui.js (module split). */
/* v0.16.0 review fix: pre-v0.16 winners never run doWin() again, so a
   completed v0.14 save boots with won=true, a full roster, and no archive
   unlock. Backfill the unlock they already earned.
   v0.24.0 Mira review: ANY returning player with ≥1 tag gets Archive access,
   not just winners. New players get the Sarah intro on their first tag;
   returning players get quiet access (no first-tag message). */
function migrateArchiveUnlock() {
  try {
    const taggedCount = Object.keys(state.tagged).length;
    if (taggedCount >= 1 && !state.archiveUnlocked) {
      state.archiveUnlocked = true;
      localStorage.setItem("tyi-archive", "1");
    }
  } catch {}
}
/* v1.7.11-beta: derpy award retroactive unlock — pre-v1.7.0 winners (or any
   save whose win didn't trigger the derpy unlock) never run doWin() again,
   so they boot with won=true but no derpy award. Backfill the unlock they
   already earned, and deliver Sarah's derpy thread to the Phone if she
   hasn't sent it yet. */
/* v1.7.18-beta (Mira review): full-roster check — every current SHARKS id
   must be genuinely tagged. A bare length check can pass on stale or
   renamed keys, so validate the actual roster ids. */
function hasFullRoster() {
  return SHARKS.length > 0 && SHARKS.every(s => !!state.tagged[s.id]);
}
function migrateDerpyUnlock() {
  try {
    /* v1.7.16-beta: explicit full-roster gate — the derpy award is for
       genuine full-roster winners only. migrateWinV07() already resets
       state.won for partial-roster saves; this check is belt-and-braces
       so the award can never leak to an incomplete win.
       v1.7.18-beta: hasFullRoster() validates the actual roster ids. */
    const taggedCount = Object.keys(state.tagged).length;
    const fullRoster = hasFullRoster();
    /* v1.7.17-beta: diagnostic logging — Avery's valid 50/50 win wasn't
       unlocking, so log the gate inputs for debugging. */
    try {
      console.log("[derpy-migrate]", JSON.stringify({
        won: state.won,
        taggedCount,
        rosterSize: SHARKS.length,
        fullRoster,
        derpyUnlocked: !!state.derpyUnlocked,
      }));
    } catch {}
    if (state.won && fullRoster && !state.derpyUnlocked) {
      state.derpyUnlocked = true;
      localStorage.setItem("tyi-derpy-unlocked", "1");
      /* Only push Sarah's thread if it isn't already in the Phone —
         avoids double-sending for mid-ceremony saves. */
      const derpyMarker = "derpy mode toggle in your collection book";
      const alreadyShown = state.messages.some(thread =>
        (thread.msgs || []).some(m => (m.text || "").includes(derpyMarker)));
      if (!alreadyShown) {
        pushThread(DERPY_AWARD_THREAD.map(m => ({ ...m })));
      }
    }
  } catch {}
}
/* v1.7.17-beta: manual derpy claim — same grant as the automatic migration,
   callable from the Collection trophy shelf fallback button.
   v1.7.18-beta: claiming with a full roster also restores the win flag,
   since the player is a genuine 50/50 winner.
   (Mira review): eligibility lives in the function, not just the UI.
   Returns true when the claim is granted, false otherwise — the claim is
   idempotent and never fires while a win ceremony is pending, since the
   ceremony presents Sarah's gift itself. */
function claimDerpyAward() {
  try {
    if (state.derpyUnlocked) return false;
    if (state.pendingWin) return false;
    if (!hasFullRoster()) return false;
    state.won = true;
    state.derpyUnlocked = true;
    localStorage.setItem("tyi-won", "1");
    localStorage.setItem("tyi-derpy-unlocked", "1");
    const derpyMarker = "derpy mode toggle in your collection book";
    const alreadyShown = state.messages.some(thread =>
      (thread.msgs || []).some(m => (m.text || "").includes(derpyMarker)));
    if (!alreadyShown) {
      pushThread(DERPY_AWARD_THREAD.map(m => ({ ...m })));
    }
    try { console.log("[derpy-claim] manual claim granted"); } catch {}
    return true;
  } catch {}
  return false;
}
/* v0.22.0 Mira review: capture pre-migration storage state for What's New.
   Migrations write keys (e.g. tyi-collection) even for new players, so we
   snapshot before they run. */
const preMigrationHadSave = (() => {
  try {
    const log = localStorage.getItem("tyi-logbook");
    const col = localStorage.getItem("tyi-collection");
    // Meaningful data: non-empty logbook, or collection with actual sharks
    if (log && log !== "[]") return true;
    if (col && col !== "{}" && col !== "null") {
      try { return Object.keys(JSON.parse(col)).length > 0; } catch { return false; }
    }
    return !!localStorage.getItem("tyi-stats");
  } catch { return false; }
})();
migrateIds();
migrateTracks();
migrateTravelTracks();
migrateTagRegions();
migrateWinV07();
/* v1.7.16-beta: derpy retroactive unlock runs after the win migration.
   migrateWinV07() resets state.won for partial-roster saves, and
   migrateDerpyUnlock() additionally gates on a full 50-shark roster,
   so the award only ever reaches genuine full-roster winners. */
migrateDerpyUnlock();
migrateArchiveUnlock();
fillRegions();
fillSelect($("depthSelect"), DEPTHS);
fillSelect($("baitSelect"), BAITS);
function updateVisual(selectId) {
  const el = document.getElementById(selectId.replace(/Select$/, "Visual"));
  if (!el) return;
  const icon = (PICK_ICONS[selectId] || {})[$(selectId).value];
  el.innerHTML = icon === "dot:ray" ? '<span class="pick-dot"></span>' : (icon || "");
}
function updateAllVisuals() {
  ["regionSelect", "depthSelect", "baitSelect", "methodSelect", "methodOptSelect"].forEach(updateVisual);
}

/* v0.9.0: Method is two selects — the top-level approach, then its
   sub-menu of real field practices.
   v0.9.1: progressive disclosure — the sub-menu row stays hidden until a
   Method is actually picked. Launching with no method keeps the old
   graceful default (neutral, no boost); the sub-menu simply never shows. */
(function initMethodSelects() {
  const mSel = $("methodSelect"), oSel = $("methodOptSelect"), field = $("methodOptField");
  mSel.innerHTML = "";
  const ph = document.createElement("option");
  /* v1.7.32-beta: the first option reads "No extra method" — picking
     no method is a valid choice, and the old placeholder implied a
     method was required. */
  ph.value = ""; ph.textContent = "No extra method";
  mSel.appendChild(ph);
  Object.entries(METHODS).forEach(([id, m]) => {
    const o = document.createElement("option");
    o.value = id; o.textContent = m.name;
    mSel.appendChild(o);
  });
  const fillOpts = () => {
    const m = METHODS[mSel.value];
    /* v1.6.12-beta: attract uses chum by default — no sub-dropdown shown. */
    if (!m || mSel.value === "attract") {
      field.classList.add("hidden");
      oSel.innerHTML = "";
      updateVisual("methodOptSelect");
      return;
    }
    /* v1.7.6-beta: aggregation no longer has a sub-menu — it just works.
       The opts are kept in game-data.js for old logbook entries. */
    if (mSel.value === "aggregation") {
      field.classList.add("hidden");
      oSel.innerHTML = "";
      updateVisual("methodOptSelect");
      return;
    }
    field.classList.remove("hidden");
    $("methodOptLabel").textContent = m.subLabel;
    oSel.innerHTML = "";
    Object.entries(m.opts).forEach(([id, label]) => {
      const o = document.createElement("option");
      o.value = id; o.textContent = label;
      oSel.appendChild(o);
    });
    updateVisual("methodOptSelect");
  };
  mSel.addEventListener("change", () => { fillOpts(); updateVisual("methodSelect"); renderPinHint(); });
  oSel.addEventListener("change", () => updateVisual("methodOptSelect"));
  ["regionSelect", "depthSelect", "baitSelect"].forEach(id =>
    $(id).addEventListener("change", () => { updateVisual(id); renderPinHint(); }));
  fillOpts();
  updateAllVisuals();
})();
/* v0.22.0: re-render the pin hint when the Expedition tab opens (plan may
   have been restored via repeat-plan) and when pinning changes. */
(function initPinHint() {
  const tab = document.querySelector('[data-tab="expedition"]');
  if (tab) tab.addEventListener("click", () => setTimeout(renderPinHint, 50));
})();
/* v0.10.0: map toolbar — zoom controls + currents toggle (static HTML).
   Guarded lookups: if this script ever loads against older HTML, the game
   boots fine and the map simply renders without the toolbar. */
const onMapBtn = (id, fn) => { const b = $(id); if (b) b.addEventListener("click", fn); };
onMapBtn("mapZoomIn", () => { mapFocusClear(); mapZoom = Math.min(MAP_ZOOM_MAX, mapZoom * 1.5); renderMap(); });
onMapBtn("mapZoomOut", () => {
  mapFocusClear();
  mapZoom = Math.max(MAP_ZOOM_MIN, mapZoom / 1.5);
  if (mapZoom === MAP_ZOOM_MIN) { mapCX = MAP_W / 2; mapCY = MAP_H / 2; }
  renderMap();
});
onMapBtn("mapZoomReset", () => { mapFocusClear(); mapZoom = 1; mapCX = MAP_W / 2; mapCY = MAP_H / 2; renderMap(); });
onMapBtn("mapCurrentsToggle", () => { mapCurrentsOn = !mapCurrentsOn; renderMap(); });
/* v0.10.2: shared zoom helper — re-centers on the pointer's map position,
   then applies the new zoom (clamped). Used by wheel; buttons use the
   fixed-step zoom below. */
let suppressMarkerClick = false;
let mapRenderQueued = false;
function requestMapRender() {
  /* rAF-throttle so pan stays smooth on phones; direct render where
     requestAnimationFrame doesn't exist (tests, old webviews). */
  if (typeof requestAnimationFrame === "function") {
    if (mapRenderQueued) return;
    mapRenderQueued = true;
    requestAnimationFrame(() => { mapRenderQueued = false; renderMap(); });
  } else {
    renderMap();
  }
}
function mapZoomAt(clientX, clientY, newZoom) {
  const svgEl = $("worldMapSvg");
  if (!svgEl) return;
  const r = svgEl.getBoundingClientRect(), vb = mapViewBox();
  /* Anchor-preserving zoom (v0.10.2 review fix): the map point under the
     pointer must stay under the same screen spot after zooming. Record the
     pointer's normalized position in the OLD viewBox, then re-anchor the
     new viewBox so that same map point sits at the same normalized spot.
     (The old code made the pointer's point the new CENTER, so the map
     jumped toward the pinch midpoint.) */
  const nx = (clientX - r.left) / r.width, ny = (clientY - r.top) / r.height;
  const px = vb.x + nx * vb.w, py = vb.y + ny * vb.h;
  mapZoom = Math.min(MAP_ZOOM_MAX, Math.max(MAP_ZOOM_MIN, newZoom));
  if (mapZoom === MAP_ZOOM_MIN) { mapCX = MAP_W / 2; mapCY = MAP_H / 2; }
  else {
    const w2 = MAP_W / mapZoom, h2 = MAP_H / mapZoom;
    mapCX = px - nx * w2 + w2 / 2;
    mapCY = py - ny * h2 + h2 / 2;
  }
  mapFocusClear(); // manual zoom breaks the tap-focus toggle contract
  requestMapRender();
}
/* v0.11.0: tap-a-marker focus. Tapping a shark marker (or its legend chip)
   glides the map to that shark's latest ping at ~3x and centers on it;
   tapping the same marker again glides back to the saved view. Hopping to
   a different marker glides straight there, keeping the original restore
   view. The zoom is programmatic, so it behaves identically in normal and
   explore mode — no gesture-ownership issues. Any manual map move cancels
   the glide and clears the focus: the toggle only promises "back to where
   you were" while the app still owns the view. */
const MAP_FOCUS_ZOOM = 3, MAP_FOCUS_MS = 500;
let mapGlide = null;  // in-flight animation token; replaced to cancel
let mapFocus = null;  // { sid, prevZoom, prevCX, prevCY } | null
function mapGlideCancel() { mapGlide = null; }
function mapFocusClear() { mapGlideCancel(); mapFocus = null; }
function mapGlideTo(x, y, z, ms) {
  mapGlideCancel();
  const dur = ms || MAP_FOCUS_MS;
  const now0 = (typeof performance !== "undefined" && performance.now) ? performance.now() : Date.now();
  const anim = { fz: mapZoom, fcx: mapCX, fcy: mapCY, tz: z, tcx: x, tcy: y, t0: now0, dur };
  mapGlide = anim;
  const step = now => {
    if (mapGlide !== anim) return; // superseded or cancelled
    const t = Math.min(1, (now - anim.t0) / anim.dur);
    const e = 1 - Math.pow(1 - t, 3); // ease-out cubic: fast launch, soft landing
    mapZoom = anim.fz + (anim.tz - anim.fz) * e;
    mapCX = anim.fcx + (anim.tcx - anim.fcx) * e;
    mapCY = anim.fcy + (anim.tcy - anim.fcy) * e;
    renderMap(); // direct render: the glide IS the frame budget
    if (t < 1) requestAnimationFrame(step);
    else mapGlide = null;
  };
  if (typeof requestAnimationFrame === "function") requestAnimationFrame(step);
  else { mapZoom = z; mapCX = x; mapCY = y; mapGlide = null; renderMap(); }
}
function mapFocusOn(sid) {
  const t = state.tagged[sid];
  if (!t) return;
  const pts = mapPoints(t);
  if (!pts.length) return;
  if (mapFocus && mapFocus.sid === sid) {
    const f = mapFocus; mapFocus = null; // toggle: back to the saved view
    mapGlideTo(f.prevCX, f.prevCY, f.prevZoom);
    return;
  }
  if (!mapFocus) mapFocus = { sid, prevZoom: mapZoom, prevCX: mapCX, prevCY: mapCY };
  else mapFocus.sid = sid;
  const last = pts[pts.length - 1]; // latest ping: where the shark "is"
  mapGlideTo(last.x, last.y, MAP_FOCUS_ZOOM);
}
/* v1.4.0-beta Mira review: non-toggling focus for the follow/tag-along
   completion path. mapFocusOn() toggles (a second tap glides back out), but
   following the same shark twice must NOT zoom away from it. Manual map taps
   keep using mapFocusOn(). */
function ensureMapFocusedOn(sid) {
  const t = state.tagged[sid];
  if (!t) return;
  const pts = mapPoints(t);
  if (!pts.length) return;
  if (mapFocus && mapFocus.sid === sid) return; // already focused — don't toggle away
  if (!mapFocus) mapFocus = { sid, prevZoom: mapZoom, prevCX: mapCX, prevCY: mapCY };
  else mapFocus.sid = sid;
  const last = pts[pts.length - 1]; // latest ping: where the shark "is"
  mapGlideTo(last.x, last.y, MAP_FOCUS_ZOOM);
}
/* Mouse-wheel zoom, centered on the pointer. preventDefault stops the page
   scrolling while the pointer is over the map (standard map-widget behavior). */
const mapWrapEl = $("worldMapWrap");
if (mapWrapEl) mapWrapEl.addEventListener("wheel", e => {
  e.preventDefault();
  mapZoomAt(e.clientX, e.clientY, mapZoom * (e.deltaY > 0 ? 1 / 1.3 : 1.3));
}, { passive: false });
/* v1.6.1-beta (revised): pinch-to-zoom removed after iPad testing
   showed the gesture didn't engage. Buttons/wheel zoom and one-finger
   pan (when zoomed in) are unchanged. touch-action still follows the zoom
   level, decided before any touch begins: at 1x the page owns one-finger
   drags (the page scrolls); zoomed in, the map owns them (one finger pans). */
(function initMapGestures() {
  const wrap = $("worldMapWrap");
  if (!wrap || typeof window === "undefined") return;
  const pts = new Map(); // pointerId -> {x, y}
  let panX = 0, panY = 0, downX = 0, downY = 0, movedMax = 0;
  wrap.addEventListener("pointerdown", e => {
    suppressMarkerClick = false; // a stale flag never eats a real tap
    mapGlideCancel(); // grabbing the map mid-glide hands control to the hand
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) {
      downX = panX = e.clientX; downY = panY = e.clientY;
      movedMax = 0;
    }
  });
  window.addEventListener("pointermove", e => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (e.pointerType !== "mouse" && pts.size === 1) {
      movedMax = Math.max(movedMax, Math.hypot(e.clientX - downX, e.clientY - downY));
      if (mapZoom > 1 && movedMax > 10) {
        e.preventDefault();
        mapFocusClear(); // a real pan breaks the tap-focus toggle contract
        const svgEl = $("worldMapSvg");
        if (svgEl) {
          const r = svgEl.getBoundingClientRect(), vb = mapViewBox();
          mapCX -= (e.clientX - panX) / r.width * vb.w;
          mapCY -= (e.clientY - panY) / r.height * vb.h;
          requestMapRender();
        }
      }
      panX = e.clientX; panY = e.clientY;
    }
  }, { passive: false });
  const endPointer = e => {
    pts.delete(e.pointerId);
    if (pts.size === 0 && movedMax > 10) suppressMarkerClick = true;
  };
  window.addEventListener("pointerup", endPointer);
  window.addEventListener("pointercancel", endPointer);
})();
$("buildTag").textContent = VERSION;
/* v0.22.0: What's New — show once per version update for returning players. */
/* v0.23.0: Bruce chain can also advance on game load (time-based). */
setTimeout(() => { try { advanceBruceChain(); } catch {} }, 5000);
(function initWhatsNew() {
  const notes = WHATS_NEW[VERSION];
  if (!notes || !shouldShowWhatsNew(whatsNewSeen(), VERSION, preMigrationHadSave)) {
    markWhatsNewSeen();
    return;
  }
  const c = $("whatsNewContent");
  c.innerHTML = `
    <div class="cert-trophy" style="font-size:40px">🎉</div>
    <h3 style="margin:6px 0 0">What's new in ${esc(VERSION)}</h3>
    <p class="latin">Tag Along — field program updates</p>
    <ul class="whats-new-list">
      ${notes.map(n => `<li>${n}</li>`).join("")}
    </ul>`;
  $("whatsNewOverlay").classList.remove("hidden");
  $("whatsNewClose").addEventListener("click", () => {
    $("whatsNewOverlay").classList.add("hidden");
    markWhatsNewSeen();
  });
  /* v1.7.23-beta: top-right ✕ delegates to the bottom button (which also
     marks the notes seen) — same one-source-of-truth pattern as detail/track. */
  $("whatsNewCloseTop").addEventListener("click", () => $("whatsNewClose").click());
})();
const tickPhoneClock = () => {
  $("phoneTime").textContent =
    new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
};
tickPhoneClock();
/* v0.17.1: the phone clock ticks — refresh every 30s so it never goes stale
   next to message timestamps. */
setInterval(tickPhoneClock, 30000);
/* v1.4.0: living caustics — each ribbon reappears at a new horizontal
   position after its lifecycle completes. The reposition fires on
   animationiteration, while the ribbon is in its invisible tail, so the
   jump is never seen. Skipped under prefers-reduced-motion (CSS already
   freezes the ribbons there). */
/* v1.4.1: sun-ray caustics — each ray gets a fresh fan angle after its
   lifecycle completes, so rays keep fanning from the sun point at new
   angles. Fires on animationiteration, while the ray is in its invisible
   tail, so the jump is never seen. Each ray keeps its own lane (home angle
   from CSS) with a small jitter, so the fan stays spread across the screen.
   Skipped under prefers-reduced-motion (CSS freezes the rays there).
   v1.4.17: restored after the v1.4.16 conic fan broke iPad layout. */
(function initCaustics() {
  if (typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.caustics span').forEach(sp => {
    const home = parseFloat(getComputedStyle(sp).getPropertyValue('--ray-angle')) || 0;
    sp.dataset.homeAngle = home;
    sp.addEventListener('animationiteration', () => {
      const jitter = Math.random() * 16 - 8;
      sp.style.setProperty('--ray-angle',
        (parseFloat(sp.dataset.homeAngle) + jitter).toFixed(1) + 'deg');
    });
  });
})();
/* v1.7.25-beta: bubbles driven by a time-based JS loop (see the style.css
   comment for the full why — iOS WKWebView froze the CSS compositor
   animations for bubbles launching from below the viewport). The helpers
   are pure and unit-tested in test-suite.js; the IIFE wires them to the
   26 spans, reading per-bubble config (--bubble-rise / --bubble-duration /
   --bubble-delay) from CSS so style.css stays the single source of truth.
   Position is recomputed from the rAF timestamp every frame, so the loop
   can pause while the main thread is busy or the tab is hidden and
   resume at the correct position — a bubble can never get permanently
   stuck at a wrong position. */
/* Piecewise-linear stops of the old bubble-rise keyframes:
   [progress, driftX px, opacity]. Rise (translateY) is exactly linear:
   y = rise * progress. */
const BUBBLE_STOPS = [[0, 0, 0], [0.08, 2, 0.85], [0.85, 20, 0.45], [1, 24, 0]];
/* Interpolate drift + opacity at progress p (0..1, clamped). */
function bubbleFrameAt(p) {
  const q = Math.min(1, Math.max(0, p));
  for (let i = 1; i < BUBBLE_STOPS.length; i++) {
    const s0 = BUBBLE_STOPS[i - 1];
    const s1 = BUBBLE_STOPS[i];
    if (q <= s1[0]) {
      const t = s1[0] === s0[0] ? 0 : (q - s0[0]) / (s1[0] - s0[0]);
      return { x: s0[1] + (s1[1] - s0[1]) * t, opacity: s0[2] + (s1[2] - s0[2]) * t };
    }
  }
  return { x: 24, opacity: 0 };
}
/* Progress through one rise, 0..1. delayMs is negative (bubble starts
   partway up: local time = now - delay); wraps cleanly at the loop point. */
function bubbleProgressAt(nowMs, delayMs, durationMs) {
  const dur = durationMs > 0 ? durationMs : 20000;
  const t = (((nowMs - delayMs) % dur) + dur) % dur;
  return t / dur;
}
/* Convert a CSS length ("-105vh", "20px") to px. vh tracks the live
   viewport height, so bubbles adapt if the iOS URL bar shows/hides. */
function bubbleLengthToPx(value, viewportPx) {
  const m = /^(-?\d+(?:\.\d+)?)(vh|px)$/.exec(String(value).trim());
  if (!m) return 0;
  return m[2] === "vh" ? parseFloat(m[1]) * viewportPx / 100 : parseFloat(m[1]);
}
(function initBubbles() {
  if (typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (typeof document.querySelectorAll !== "function" ||
      typeof requestAnimationFrame !== "function" ||
      typeof getComputedStyle !== "function") return;
  const spans = document.querySelectorAll(".bubbles span");
  if (!spans.length) return;
  const cfgs = [];
  spans.forEach(sp => {
    const cs = getComputedStyle(sp);
    cfgs.push({
      el: sp,
      rise: cs.getPropertyValue("--bubble-rise").trim(),
      duration: (parseFloat(cs.getPropertyValue("--bubble-duration")) || 20) * 1000,
      delay: (parseFloat(cs.getPropertyValue("--bubble-delay")) || 0) * 1000,
    });
  });
  const tick = (now) => {
    const viewportPx = window.innerHeight;
    for (const c of cfgs) {
      const p = bubbleProgressAt(now, c.delay, c.duration);
      const f = bubbleFrameAt(p);
      const y = bubbleLengthToPx(c.rise, viewportPx) * p;
      c.el.style.transform = "translate3d(" + f.x.toFixed(1) + "px, " + y.toFixed(1) + "px, 0)";
      c.el.style.opacity = f.opacity.toFixed(3);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
})();
/* v0.19.0: field-guide database controls. */
(function initGuideTools() {
  const search = $("guideSearch");
  if (search) search.addEventListener("input", () => {
    guideFilters.q = search.value.trim();
    renderResearch();
  });
  const toggle = $("filterToggle");
  const panel = $("filterPanel");
  const closeSheet = () => {
    panel.classList.add("hidden");
    panel.classList.remove("open-sheet");
    toggle.setAttribute("aria-expanded", "false");
  };
  if (toggle && panel) toggle.addEventListener("click", () => {
    const open = panel.classList.toggle("hidden");
    toggle.setAttribute("aria-expanded", String(!open));
    /* Mobile bottom sheet. */
    panel.classList.toggle("open-sheet", !open && window.innerWidth <= 640);
  });
  const sheetClose = $("sheetClose");
  if (sheetClose) sheetClose.addEventListener("click", closeSheet);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && panel && !panel.classList.contains("hidden")) closeSheet();
  });
  const clr = $("guideClear");
  if (clr) clr.addEventListener("click", clearGuideFilters);
  /* v0.20.0: quick-pace listener bound once at init (never in renderAll). */
  const qp = $("quickPace");
  if (qp) qp.addEventListener("change", () => setPace(qp.checked));
})();
initCreatureArt(); // v0.26.0: fill CREATURE_ART with WebP shadow sprites
renderAll();
/* v1.5.0-beta Mira review (blocking): recover celebrations lost to a reload
   before trip end. Clear the persisted copy FIRST (idempotent — a crash
   mid-flush can't double-deliver), then flush once. */
function recoverPendingCelebrations() {
  const saved = celebrationStore.load();
  if (saved && saved.length > 0) {
    celebrationStore.clear();
    state.pendingCelebrations = saved;
    flushPendingCelebrations();
  }
}
recoverPendingCelebrations();
showPorthole(); // v1.4.2: observation window always present — porthole surface when idle
/* v0.18.0 review: one achievement check at boot so migrated saves backfill. */
checkAchievements();

/* v2.5.11-beta: is any video OTHER than the background currently
   playing (e.g. an Archive clip)? Archive videos and the background
   video fight over the iPad's video decoder — both go slow and
   choppy when they play at once (Avery) — so while a real clip
   plays, the ambient background rests. */
function foreignVideoPlaying() {
  var bg = document.getElementById('sun-video');
  var vids = document.querySelectorAll('video');
  for (var i = 0; i < vids.length; i++) {
    var v = vids[i];
    if (v !== bg && !v.paused && !v.ended) return true;
  }
  return false;
}

/* v2.5.11-beta (Mira review): pause every playing <video> inside a
   container (default: the Archive list), then notify the background
   sync explicitly. The explicit notification matters: pause() flips
   .paused synchronously but QUEUES the pause event — a caller that
   tears down right after (renderArchive clearing its list) can
   detach the clip before the event fires, and a detached element's
   event never reaches the document listener, stranding the
   background paused. The notification re-runs the sync immediately;
   it re-checks live state, so a different clip still playing keeps
   the background at rest. Never touches the background video. */
function pauseVideosIn(container) {
  var root = container || document.getElementById('archiveList');
  if (root && root.querySelectorAll) {
    var bg = document.getElementById('sun-video');
    var vids = root.querySelectorAll('video');
    for (var i = 0; i < vids.length; i++) {
      var v = vids[i];
      if (v !== bg && !v.paused && v.pause) v.pause();
    }
  }
  try {
    document.dispatchEvent(new Event('tagalong:media-teardown'));
  } catch (e) { /* no event support: native pause events still cover most paths */ }
}

/* ================= v2.6.0: the welcome tour =================
   A quick slideshow that teaches the game: one slide per tab, the
   card parked in one spot under the tab bar (v2.7.2), a yellow arrow
   pointing at the tab being explained while that tab wears a
   spotlight ring (Avery's design).
   Shows once on first visit; the ? button by the save controls
   replays it anytime. Copy is plain and short — the tour is a map,
   not a manual. */
const TOUR_SLIDES = [
  {
    "tab": null,
    "icon": "🦈",
    "title": "Bienvenue sur la piste des requins!",
    "text": "Te voilà à la tête d'un projet de recherche sur les requins. Étudie de vraies espèces, planifie des expéditions, marque les requins et remets-les à l'eau, puis suis leurs déplacements. Le jeu s'inspire de la biologie et de la recherche en conservation, mais les expéditions et les trajets de suivi sont fictifs."
  },
  {
    "tab": "research",
    "icon": "📖",
    "title": "Recherche",
    "text": "Ton guide de terrain. Les notes de chaque requin t'indiquent où il vit, à quelle profondeur il nage et ce qu'il mange. Ce que tu apprends ici guidera tes expéditions. C'est aussi ici que tu épingles le requin que tu cherches."
  },
  {
    "tab": "expedition",
    "icon": "🛥️",
    "title": "Expédition",
    "text": "Planifie la sortie : choisis la région, la profondeur, l'appât et la méthode à partir de ce que tu as appris, puis pars. Marque les requins avec soin, puis remets-les toujours à l'eau."
  },
  {
    "tab": "collection",
    "icon": "🗂️",
    "title": "Collection",
    "text": "Ton carnet de collection officiel. Chaque espèce que tu marques gagne sa carte ici. Marque les 50 pour compléter le carnet."
  },
  {
    "tab": "map",
    "icon": "🗺️",
    "title": "Carte",
    "text": "Tes requins marqués poursuivent leur route. Sélectionne un marqueur pour identifier le requin, puis active le suivi à partir de sa carte pour tracer tout son parcours."
  },
  {
    "tab": "logbook",
    "icon": "📓",
    "title": "Journal de bord",
    "text": "Ton carnet de scientifique : chaque sortie, chaque plan, chaque résultat. Quand une expédition ne donne rien, les tendances dans tes notes peuvent t'aider à comprendre pourquoi."
  },
  {
    "tab": "phone",
    "icon": "📱",
    "title": "Téléphone",
    "text": "Ta cousine Sarah adore les requins. Elle t'enverra ses réactions et prendra de tes nouvelles pendant que tu joues. Si tu bloques, tu peux lui demander conseil sur le requin que tu as épinglé."
  },
  {
    "tab": "archive",
    "icon": "📸",
    "title": "Archives",
    "text": "Découvre ces espèces dans la vraie vie grâce à des photos et des vidéos soigneusement sélectionnées, ainsi qu'à des illustrations documentées. Cet onglet se débloque après ton premier marquage."
  },
  {
    "tab": "achievements",
    "icon": "🏆",
    "title": "Succès",
    "text": "Les jalons du voyage. Termine le carnet de collection et tu gagneras ton certificat de Maître du marquage des requins ici."
  },
  {
    "tab": null,
    "icon": "🌊",
    "title": "C'est parti!",
    "text": "C'est toute la visite. Commence par Recherche, épingle un requin et planifie ta première expédition. Bonne chance là-dehors!"
  }
];
let tourIdx = 0;
let tourOpenNow = false;
let tourPrevBodyOverflow = "";
let tourReturnFocus = null;

function tourSeen() {
  try { return !!localStorage.getItem("tyi-tour-seen"); } catch (e) { return true; }
}
function markTourSeen() {
  try { localStorage.setItem("tyi-tour-seen", "1"); } catch (e) { /* private mode: tour may re-offer next visit */ }
}
/* v2.6.0 (Mira review): the tour is a NEW-player welcome. Returning
   players never see it unprompted — their tyi-tour-seen flag didn't
   exist before v2.6.0, so a bare !tourSeen() check would have toured
   every upgrader. The gate uses the pre-migration save snapshot
   (preMigrationHadSave, captured before migrations write keys even
   for new players), the same one What's New uses — so the two
   dialogs can never stack from auto-open: a new player gets the tour
   and no What's New; a returning player gets What's New, never the
   tour. Replay from ? works for everyone regardless. */
function tourShouldAutoOpen(hadSave) {
  var saved = (typeof hadSave !== "undefined") ? hadSave : preMigrationHadSave;
  return !tourSeen() && !saved;
}
function openTour() {
  tourOpenNow = true;
  /* Remember what had focus so closing returns it (replay: the ?
     button; first run: the active element, usually body — closeTour
     then falls back to the Research tab as a clear game target). */
  try {
    var ae = document.activeElement;
    tourReturnFocus = (ae && ae.focus && ae !== document.body) ? ae : null;
  } catch (e) { tourReturnFocus = null; }
  var scrim = $("tourScrim"), ov = $("tourOverlay");
  if (scrim) scrim.classList.remove("hidden");
  if (ov) ov.classList.remove("hidden");
  /* v2.7.2 (Mira review): lock background scrolling while the modal
     tour is open, so the sticky tab bar — and the tab arrow measured
     from it — can't drift away from the spotlighted tab. Restored in
     closeTour; guarded, since the test harness has no body. */
  try {
    tourPrevBodyOverflow = (document.body && document.body.style) ? document.body.style.overflow : "";
    if (document.body && document.body.style) document.body.style.overflow = "hidden";
  } catch (e) { /* scroll lock is a nicety, never a blocker */ }
  showTourSlide(0);
  var next = $("tourNext");
  if (next && next.focus) next.focus();
}
function closeTour() {
  tourOpenNow = false;
  markTourSeen();
  var scrim = $("tourScrim"), ov = $("tourOverlay");
  if (scrim) scrim.classList.add("hidden");
  if (ov) ov.classList.add("hidden");
  var arrow = $("tourTabArrow");
  if (arrow) arrow.style.opacity = "0";
  try { if (document.body && document.body.style) document.body.style.overflow = tourPrevBodyOverflow; } catch (e) {}
  tourPrevBodyOverflow = "";
  document.querySelectorAll(".tab.tour-spot").forEach(function(b) { b.classList.remove("tour-spot"); });
  var nav = document.querySelector(".tabs");
  if (nav) nav.classList.remove("tour-on");
  /* Focus returns to the opener, or to the Research tab on first run
     — never left on a button the tour just hid. */
  try {
    if (tourReturnFocus && tourReturnFocus.focus) tourReturnFocus.focus();
    else {
      var research = document.querySelector('.tab[data-tab="research"]');
      if (research && research.focus) research.focus();
    }
  } catch (e) { /* focus restore is a nicety, never a blocker */ }
  tourReturnFocus = null;
}
/* Keep Tab inside the tour while it's open: the scrim covers the
   page, but the tab bar itself sits above it, so without a trap a
   keyboard user could Tab onto a spotlighted tab and navigate away
   mid-dialog. */
function tourTrapFocus(e) {
  if (!tourOpenNow || e.key !== "Tab") return;
  var btns = [$("tourSkip"), $("tourBack"), $("tourNext")].filter(function(b) {
    return b && !b.disabled && !b.classList.contains("hidden");
  });
  if (!btns.length) return;
  var first = btns[0], last = btns[btns.length - 1];
  var active = document.activeElement;
  if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
}
function tourAdvance() {
  if (tourIdx >= TOUR_SLIDES.length - 1) closeTour();
  else showTourSlide(tourIdx + 1);
}
function tourBack() {
  if (tourIdx > 0) showTourSlide(tourIdx - 1);
}
function showTourSlide(i) {
  tourIdx = Math.max(0, Math.min(TOUR_SLIDES.length - 1, i));
  var s = TOUR_SLIDES[tourIdx];
  $("tourIcon").textContent = s.icon;
  $("tourTitle").textContent = s.title;
  $("tourText").textContent = s.text;
  $("tourCount").textContent = (tourIdx + 1) + " of " + TOUR_SLIDES.length;
  $("tourBack").disabled = tourIdx === 0;
  $("tourNext").textContent = tourIdx === TOUR_SLIDES.length - 1 ? "Start playing 🦈" : "Next →";
  var skip = $("tourSkip");
  if (tourIdx === TOUR_SLIDES.length - 1) skip.classList.add("hidden");
  else skip.classList.remove("hidden");
  var dots = $("tourDots");
  if (dots) {
    dots.innerHTML = "";
    TOUR_SLIDES.forEach(function(_, di) {
      var d = document.createElement("span");
      d.className = "tour-dot" + (di === tourIdx ? " on" : "");
      dots.appendChild(d);
    });
  }
  document.querySelectorAll(".tab.tour-spot").forEach(function(b) { b.classList.remove("tour-spot"); });
  var nav = document.querySelector(".tabs");
  if (nav) nav.classList.add("tour-on");
  if (s.tab) {
    var btn = document.querySelector('.tab[data-tab="' + s.tab + '"]');
    if (btn) btn.classList.add("tour-spot");
  }
  positionTour();
}
/* Place the card in one fixed spot under the tab bar — centred, the
   same place on every slide — and point the yellow tab arrow at the
   tab the current slide explains. The card's height is fixed to a
   comfortable reading size on roomy screens (320px) and shrunk to
   exactly the space below the tab bar on short ones — never taller
   than the viewport, so the nav row stays visible; the text scrolls
   inside the card. Exceptional case: when the space below the tab bar
   drops under 160px, even the card's own chrome (header + 46px nav)
   would clip, so the overlay itself scrolls instead — the nav row
   stays reachable by scrolling, never clipped. Decorative precision:
   any failure leaves the CSS fallback. */
function positionTour() {
  var ov = $("tourOverlay");
  if (!ov || !tourOpenNow) return;
  try {
    var nav = document.querySelector(".tabs");
    var navRect = nav.getBoundingClientRect();
    var s = TOUR_SLIDES[tourIdx];
    var vw = window.innerWidth || 360;
    var width = Math.min(680, vw - 16);
    var left = Math.max(8, (vw - width) / 2);
    ov.style.top = (navRect.bottom + 12) + "px";
    ov.style.left = left + "px";
    ov.style.width = width + "px";
    if (window.innerHeight) {
      var avail = window.innerHeight - navRect.bottom - 24;
      if (avail >= 160) {
        ov.style.height = Math.min(320, avail) + "px";
        ov.style.maxHeight = "none";
        ov.style.overflowY = "visible";
      } else {
        ov.style.height = "auto";
        ov.style.maxHeight = Math.max(0, window.innerHeight - navRect.bottom - 12) + "px";
        ov.style.overflowY = "auto";
      }
    }
    var arrow = $("tourTabArrow");
    if (arrow) {
      var btn = s.tab ? document.querySelector('.tab[data-tab="' + s.tab + '"]') : null;
      var center = vw / 2;
      if (btn) {
        var br = btn.getBoundingClientRect();
        center = br.left + br.width / 2;
      }
      arrow.style.top = (navRect.bottom + 2) + "px";
      arrow.style.left = Math.max(2, Math.min(center - 14, vw - 30)) + "px";
      arrow.style.opacity = s.tab ? "1" : "0";
    }
    var scrim = $("tourScrim");
    if (scrim) scrim.style.top = navRect.bottom + "px";
  } catch (e) { /* positioning is decorative; CSS defaults hold */ }
}
$("tourBtn").addEventListener("click", openTour);
$("tourNext").addEventListener("click", tourAdvance);
$("tourBack").addEventListener("click", tourBack);
$("tourSkip").addEventListener("click", closeTour);
window.addEventListener("resize", positionTour);
/* Reposition the tab arrow if the page scrolls under the open tour
   (belt and braces beside the body scroll lock). */
window.addEventListener("scroll", positionTour);
document.addEventListener("keydown", function(e) {
  if (!tourOpenNow) return;
  if (e.key === "Escape") closeTour();
  else if (e.key === "ArrowRight") tourAdvance();
  else if (e.key === "ArrowLeft") tourBack();
  else tourTrapFocus(e);
});
if (tourShouldAutoOpen()) openTour();

/* v2.3.0-beta: orientation-aware underwater background (Mira's videos).
   Picks the landscape or portrait loop based on viewport shape; loads only
   the selected video. Swaps on rotate/resize. Pauses when the tab is hidden. */
(function() {
  var video = document.getElementById('sun-video');
  var still = document.getElementById('sun-still');
  if (!video) return;
  /* The background may play only when the tab is visible AND no other
     video is playing. Every trigger (visibility, media events, source
     swaps) funnels through here. */
  function syncSunVideo() {
    if (document.hidden || foreignVideoPlaying()) {
      if (video.pause) video.pause();
    } else if (video.play) {
      var p = video.play();
      if (p && p.catch) p.catch(function(){});
    }
  }
  function pickBackground() {
    var portrait = window.innerHeight > window.innerWidth;
    var src = portrait ? 'underwater-portrait.mp4' : 'underwater-landscape.mp4';
    var poster = portrait ? 'underwater-portrait-poster.jpg' : 'underwater-landscape-poster.jpg';
    if (video.getAttribute('src') !== src) {
      video.src = src;
      video.poster = poster;
      if (still) still.src = poster;
    }
    syncSunVideo();
  }
  pickBackground();
  window.addEventListener('resize', pickBackground);
  window.addEventListener('orientationchange', pickBackground);
  document.addEventListener('visibilitychange', syncSunVideo);
  /* Media events don't bubble, but they do pass through ancestors in
     the capture phase — one document-level listener hears every
     Archive video, including ones rendered later. */
  document.addEventListener('play', function(e) { if (e.target !== video) syncSunVideo(); }, true);
  document.addEventListener('pause', function(e) { if (e.target !== video) syncSunVideo(); }, true);
  document.addEventListener('ended', function(e) { if (e.target !== video) syncSunVideo(); }, true);
  /* Explicit teardown notification (pauseVideosIn): covers clips torn
     down before their queued pause event can be delivered. */
  document.addEventListener('tagalong:media-teardown', syncSunVideo);
})();
