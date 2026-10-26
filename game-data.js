/* game-data.js — core game data module (split from script.js in v0.20.0).
   Loaded BEFORE script.js; REGIONS, DEPTHS, BAITS, METHODS, LEGACY_LURES
   and SARAH_EGG_THREAD are global. Split when script.js hit the push size
   limit; pure data, no dependencies. */

/* ---------- Data ---------- */

const REGIONS = {
  "caribbean": {
    "name": "Mer des Caraïbes",
    "note": "Une tortue verte glisse le long du récif."
  },
  "north-carolina": {
    "name": "Outer Banks, Caroline du Nord",
    "note": "En bas, les formes sombres de vieilles épaves émergent du sable — le cimetière de l'Atlantique."
  },
  "philippines": {
    "name": "Philippines",
    "note": "Une raie manta tourne paresseusement au-dessus de nous."
  },
  "maldives": {
    "name": "Maldives",
    "note": "Des dauphins cliquent et sifflent au loin."
  },
  "japan": {
    "name": "Baie de Sagami, Japon",
    "note": "Un poisson-lanterne scintille dans le noir."
  },
  "open-atlantic": {
    "name": "Atlantique ouvert",
    "note": "Des puffins tournent au-dessus des vagues."
  },
  "cornwall": {
    "name": "Cornouailles, Royaume-Uni",
    "note": "Des fous de Bassan plongent autour du bateau."
  },
  "papua-new-guinea": {
    "name": "Papouasie-Nouvelle-Guinée",
    "note": "Le platier s'étend, incroyablement clair et peu profond."
  },
  "galapagos": {
    "name": "Îles Galápagos",
    "note": "Des iguanes marins glissent dans l'eau tout près.",
    "locked": true
  },
  "south-africa": {
    "name": "Afrique du Sud",
    "note": "Des otaries à fourrure du Cap aboient sur les rochers au-dessus.",
    "locked": true
  },
  "east-australia": {
    "name": "Est de l'Australie",
    "note": "Des baleines à bosse bondissent hors de l'eau au-delà du cap.",
    "locked": true
  },
  "california": {
    "name": "Côte de la Californie",
    "note": "Des lions de mer nagent en marsouinant dans les forêts de varech.",
    "locked": true
  },
  "arctic": {
    "name": "Eaux arctiques",
    "note": "Des icebergs dérivent, incroyablement bleus à la ligne de flottaison.",
    "locked": true
  }
};

const DEPTHS = {
  "surface": {
    "name": "Eaux de surface (0–30 m)",
    "scene": "depth-surface"
  },
  "reef": {
    "name": "Récifs et eaux peu profondes (30–100 m)",
    "scene": "depth-shallow"
  },
  "twilight": {
    "name": "Zone crépusculaire (100–400 m)",
    "scene": "depth-midwater"
  },
  "deep": {
    "name": "Grands fonds obscurs (400–1000 m)",
    "scene": "depth-deep"
  }
};

const BAITS = {
  "crustaceans": "Crabes et homards",
  "squid": "Calmars",
  "schooling-fish": "Poissons en bancs (maquereaux)",
  "plankton": "Floraison de plancton — pas d'appât, suis la floraison",
  "tuna": "Thon / gros poissons gras",
  "ray": "Raie",
  "urchins": "Oursins et coquillages"
};

/* v0.9.0: "Method" replaces the v0.8.0 scent-lure row. The planner asks HOW
   you'll try to meet the shark, and each top-level approach opens its own
   sub-menu of real field practices. A species only boosts on methods that
   are real for that animal — a whale shark never sees chum.
   Boost-only semantics kept from v0.8.0: the right method raises a
   species' encounter weight ~3x; a wrong method is neutral, never a gate.
   WHY this shape (for reviewers): ChatGPT's v0.8.0 review argued that
   forcing every shark through identical planner rows teaches something
   more general than the evidence supports — e.g. "krill scent" for whale
   sharks implied scenting the water works on filter feeders, when real
   practice is locating a feeding aggregation. So the planner is now
   asymmetric on purpose: hunters get attractants, filter feeders get
   aggregation-finding. The asymmetry teaches the animal.
   EXTENSION POINT for future versions: new top-level methods (deep
   deployment, seal decoy, BRUV, ...) slot in here with their own `opts`;
   add the method key to each species' `methods` map it genuinely fits. */
const METHODS = {
  "attract": {
    "name": "Attirer — une odeur dans l'eau",
    "subLabel": "Attractant",
    "opts": {
      "none": "Aucun attractant",
      "chum": "Mélange attractif à l'huile de poisson"
    }
  },
  "aggregation": {
    "name": "Repérer un rassemblement",
    "subLabel": "Approche",
    "opts": {
      "boat": "Repérage en bateau des concentrations de plancton",
      "plane": "Relevé en avion d'observation",
      "network": "Réseau local d'observations"
    }
  }
};

/* Legacy labels for pre-v0.9.0 logbook entries, so old trips still read
   sensibly after the scent-row removal. */
const LEGACY_LURES = {
  "none": "Aucun attractant",
  "chum": "Mélange attractif à l'huile de poisson",
  "seal": "Odeur de phoque",
  "krill": "Odeur de krill"
};





/* If you name a shark "Sarah", she finds out. Sweet, not progression. */
const SARAH_EGG_THREAD = [
  {
    "who": "them",
    "text": "Attends. Tu as appelé un requin Sarah? Comme moi?"
  },
  {
    "who": "me",
    "text": "Ben... oui. C'est grâce à toi que je connais la moitié de ces choses-là."
  },
  {
    "who": "them",
    "text": "Un requin qui porte mon nom, quelque part dans l'océan, avec une balise. Je pense que je ne vais jamais m'en remettre."
  },
  {
    "who": "me",
    "text": "Elle porte ton nom maintenant. Je pense qu'elle le sait."
  }
];

/* v1.5.25-beta: naming specifically the LEMON shark "Sarah". The real Sarah's
   reaction to lemon sharks was literally "LEMONNNNNNN" — this thread is
   separate from the regular Sarah-naming thread, and has maximum feelings. */
const LEMON_SARAH_EGG_THREAD = [
  {
    "who": "them",
    "text": "Attends. ATTENDS. Tu as appelé le REQUIN-CITRON Sarah??"
  },
  {
    "who": "me",
    "text": "Je trouvais que c'était le bon requin pour porter ton nom."
  },
  {
    "who": "them",
    "text": "CITROOOOOOOOOON 😭😭 Les requins-citrons, c'est mes requins PRÉFÉRÉS. Mes préférés de tout l'océan. Et maintenant il y en a une qui porte MON nom, là-dehors, et je suis incapable de gérer ça."
  },
  {
    "who": "me",
    "text": "C'est une bonne, celle-là. Elle le sait."
  },
  {
    "who": "them",
    "text": "C'est la meilleure. Dis-lui que je l'aime. En fait, elle le sait déjà. 😭😭"
  }
];

/* v0.23.0: real-shark easter eggs. Mary Lee was a real great white — tagged
   Sept 17, 2012 off Cape Cod by OCEARCH, 4.9m mature female, ~50 years old,
   named for Chris Fischer's mother. "Matriarch of the Sea" with 130k Twitter
   followers. Tag went silent June 2017; presumed alive. */
const MARY_LEE_THREAD = [
  {
    "who": "them",
    "text": "ATTENDS. Tu as appelé ton grand requin blanc Mary Lee? Comme LA Mary Lee?"
  },
  {
    "who": "me",
    "text": "Tu la connais?"
  },
  {
    "who": "them",
    "text": "LA CONNAÎTRE?! C'était le requin le plus célèbre d'Internet! OCEARCH l'a marquée près de Cape Cod en 2012. Presque cinq mètres, environ 1 600 kilos, et une cinquantaine d'années. On l'appelait la matriarche des mers et elle avait 130 000 abonnés sur Twitter. UN REQUIN. AVEC DES FANS."
  },
  {
    "who": "me",
    "text": "C'est incroyable."
  },
  {
    "who": "them",
    "text": "Sa balise a cessé d'émettre en 2017. La batterie était peut-être épuisée. On ne sait pas où elle est maintenant, mais j'aime croire qu'elle nage encore quelque part. Je pense à elle et je me dis qu'elle était une reine sans même le savoir. Ta Mary Lee a de grands ailerons à chausser. 🩵"
  }
];

/* v0.23.0: Nicole was a real great white — tagged Nov 7, 2003 in Gansbaai,
   South Africa, 3.8m female named for Nicole Kidman. Swam 11,000 km to
   Western Australia in 99 days, then back — 20,000+ km round trip.
   Published in Science (Bonfil et al. 2005). */
const NICOLE_THREAD = [
  {
    "who": "them",
    "text": "Nicole!! OH MON DIEU. Comme la vraie Nicole?"
  },
  {
    "who": "me",
    "text": "Il y a eu une vraie Nicole?"
  },
  {
    "who": "them",
    "text": "OUI. Marquée en Afrique du Sud en 2003, et nommée en hommage à Nicole Kidman. Légendaire. Puis elle est partie... Elle a nagé 11 000 kilomètres jusqu'en Australie-Occidentale. En 99 JOURS. Sa balise s'est détachée en février, et tout le monde pensait que l'histoire était terminée."
  },
  {
    "who": "me",
    "text": "Mais non?"
  },
  {
    "who": "them",
    "text": "ELLE EST REVENUE. En août 2004, de retour à Gansbaai. Plus de 20 000 kilomètres aller-retour. L'étude a été publiée dans Science et a montré que les grands requins blancs traversent des bassins océaniques entiers. Avant Nicole, aucun voyage de ce genre n'avait encore été documenté. Ta Nicole a l'âme d'une exploratrice. 🗺️🦈"
  }
];

/* v0.23.0: BRUCE easter egg chain — LOCKED DESIGN (2026-10-06).
   Trigger: player names any tagged shark "bruce" (any caps; maybeNameEgg in
   script.js). Nothing happens immediately — no popup, no toast. Stages unfold
   slowly via advanceBruceChain (2+ expeditions or 12+ hours apart), so Sarah
   "notices" on her own time. {species} is replaced at push time with the Bruce
   shark's species (lowercase). {bruce} is replaced with the player's exact
   name input (their capitalization preserved). OG Jaws/Nemo references always
   use "Bruce" with a capital B. The hidden achievement unlocks after the final
   stage.
   Voice: Sarah texting — casual, lowercase, warm; precise where facts matter.
   Facts: the Jaws mechanical shark was nicknamed Bruce after Spielberg's
   lawyer; it malfunctioned constantly in salt water; Spielberg showed it
   less than planned; Finding Nemo's Bruce is a deliberate Jaws reference. */
const BRUCE_CHAIN = [
  [
    {
      "who": "them",
      "text": "{bruce}, hein"
    },
    {
      "who": "them",
      "text": "OK. Est-ce que tu sais jusqu'où cette histoire va?"
    },
    {
      "who": "me",
      "text": "C'est une référence aux Dents de la mer. Je me doutais que tu finirais par remarquer."
    },
    {
      "who": "them",
      "text": "Oh, j'ai remarqué. Et franchement? J'adore. Le requin des Dents de la mer était mécanique, construit pour le film. L'équipe l'avait surnommé Bruce, d'après l'avocat de Spielberg. Mais {bruce}, le requin que tu as nommé, nage pour vrai. Un animal de l'espèce {species}, avec le meilleur nom de la base de données."
    }
  ],
  [
    {
      "who": "them",
      "text": "Bon, je repensais à {bruce}, ton requin de l'espèce {species}. J'ai replongé dans l'histoire de son homonyme et... ouf."
    },
    {
      "who": "them",
      "text": "Et quand je dis machine, je parle d'une machine qui fonctionnait à peine. L'eau salée la brisait constamment : l'hydraulique, la flottabilité, tout. L'océan gagnait chaque manche."
    },
    {
      "who": "me",
      "text": "Un requin qui ne supporte pas l'océan. C'est brutal."
    },
    {
      "who": "them",
      "text": "Pas vrai? Ils avaient fabriqué ce truc gigantesque et compliqué et passaient la moitié du tournage à essayer de le faire fonctionner."
    }
  ],
  [
    {
      "who": "them",
      "text": "Encore une histoire de Bruce, puisque tu es coincé avec moi : celle du requin robot devient meilleure."
    },
    {
      "who": "them",
      "text": "Spielberg avait un problème : son requin ne fonctionnait pas. Alors il a décidé de très peu le montrer. Pendant une bonne partie du film, on ne le VOIT pas. On voit à travers ses yeux, les barils à la surface, la nageoire, et on entend la musique."
    },
    {
      "who": "me",
      "text": "Toum-toum. Toum-toum."
    },
    {
      "who": "them",
      "text": "EXACTEMENT. Et le film est devenu PLUS EFFRAYANT. Ne pas voir le requin faisait encore plus peur que le voir. Un robot défectueux a prouvé par accident que suggérer peut être plus fort que tout montrer."
    }
  ],
  [
    {
      "who": "them",
      "text": "Petite mise à jour Bruce. Ce nom revient partout dans l'histoire des requins au cinéma, il fallait que je t'en parle."
    },
    {
      "who": "them",
      "text": "Des années plus tard, le grand requin blanc de Trouver Nemo s'appelle Bruce. C'est voulu : une référence aux Dents de la mer. « Les poissons sont nos amis, pas notre nourriture. » Le gentil requin du cinéma porte le nom du plus terrifiant."
    },
    {
      "who": "me",
      "text": "OK, ça, c'est parfait."
    },
    {
      "who": "them",
      "text": "La partie moins drôle, c'est que Les Dents de la mer a vraiment terrifié les gens. L'idée du monstre qui attaque sans réfléchir est restée, et les vrais requins en paient encore le prix."
    }
  ],
  [
    {
      "who": "them",
      "text": "Dernière pensée sur Bruce, promis. Revenons à TON {bruce} un instant."
    },
    {
      "who": "them",
      "text": "Et puis il y a {bruce}, le requin que tu as nommé. Un vrai animal de l'espèce {species}. Tu l'as rencontré, marqué et relâché. Tu sais ce qu'il fait réellement dans son milieu."
    },
    {
      "who": "me",
      "text": "Il a même son identifiant de recherche."
    },
    {
      "who": "them",
      "text": "Exactement. Pour le film, ils avaient besoin d'un monstre, alors ils en ont construit un en métal. Toi, tu es allé rencontrer le vrai animal. Bruce le robot, Bruce la blague, et {bruce}, tout simplement un requin qui vit sa vie de requin. Bref, nom 10/10."
    }
  ]
];


/* v0.9.1: live icon strips under each planner row. One small visual echo
   of the current pick per select, in the game's emoji style. The ray gets
   a simple styled oval ("dot:ray") — no honest emoji exists for it. Pure
   decoration; the selects remain the source of truth. */
const PICK_ICONS = {
  regionSelect: {
    "caribbean": "🏝️", "north-carolina": "⚓", "philippines": "🐠",
    "maldives": "🏖️", "japan": "🗾", "open-atlantic": "🌊",
    "cornwall": "🐦", "papua-new-guinea": "🪸",
    "galapagos": "🐢", "south-africa": "🦭",
    "east-australia": "🪸", "california": "🌊", "arctic": "🧊"
  },
  depthSelect: { "surface": "☀️", "reef": "🪸", "twilight": "🌅", "deep": "🌑" },
  baitSelect: {
    "crustaceans": "🦀", "squid": "🦑", "schooling-fish": "🐠",
    "plankton": "🦐", "tuna": "🐟", "ray": "dot:ray", "urchins": "🐚"
  },
  methodSelect: { "attract": "🪣", "aggregation": "🔍", "": "" },
  methodOptSelect: {
    "none": "–", "chum": "🪣",
    "boat": "🚤", "plane": "✈️", "network": "📻"
  }
};

/* v1.4.9: Deep-Sea Unicorn achievement (renamed from White Whale in
   v1.8.0) — Sarah's reaction to a megamouth tag.
   The megamouth is famously elusive (unknown to science until 1976, only
   around 300 ever documented). Sarah would absolutely lose her mind. */
const WHITE_WHALE_THREAD = [
  {
    "who": "them",
    "text": "ATTENDS. ARRÊTE TOUT. Tu viens de marquer un REQUIN GRANDE-GUEULE?!"
  },
  {
    "who": "me",
    "text": "Oui! C'est si exceptionnel que ça?"
  },
  {
    "who": "them",
    "text": "SI EXCEPTIONNEL?! Les scientifiques ne connaissaient même pas cette espèce avant 1976! Un individu s'est pris dans une ancre de la marine américaine près d'Hawaï, et les chercheurs ont dû se demander « mais qu'est-ce que C'EST? ». On n'en a documenté que quelques centaines. QUELQUES CENTAINES. Dans toute l'histoire."
  },
  {
    "who": "me",
    "text": "Ça remet les choses en perspective."
  },
  {
    "who": "them",
    "text": "Il vit dans la zone crépusculaire et ouvre une bouche ÉNORME pour filtrer le krill. Comme un cousin gothique et mystérieux du requin-baleine. Et maintenant, il y en a un là-dehors avec TA balise. Je vais encadrer cette conversation. 🩵"
  }
];

/* v1.7.0-beta: derpy award — Sarah reacts to the win-unlocked derpy art.
   She certified the aesthetic back when these were the placeholder sharks. */
const DERPY_AWARD_THREAD = [
  {
    "who": "them",
    "text": "Bon. J'ai quelque chose à t'avouer."
  },
  {
    "who": "me",
    "text": "Ça promet."
  },
  {
    "who": "them",
    "text": "Tu te souviens de l'apparence des requins au début? Avant que l'institut nous envoie les vraies illustrations?"
  },
  {
    "who": "me",
    "text": "Les petits requins zinzins? Avec les gros yeux tout ronds?"
  },
  {
    "who": "them",
    "text": "ILS ÉTAIENT PARFAITS. Je les aimais TELLEMENT. Le requin-renard avait l'air éternellement anxieux, et je l'aurais défendu jusqu'au bout."
  },
  {
    "who": "me",
    "text": "Sarah. Tu as officiellement approuvé leur look."
  },
  {
    "who": "them",
    "text": "OUI, et je le referais!! Bref, j'ai gardé toutes les illustrations. Elles sont À TOI maintenant. Tu peux activer le mode zinzin dans ton carnet de collection quand tu veux les revoir."
  },
  {
    "who": "me",
    "text": "C'est la meilleure récompense."
  },
  {
    "who": "them",
    "text": "Je sais. Je suis excellente pour offrir des cadeaux. 🦈"
  }
];
