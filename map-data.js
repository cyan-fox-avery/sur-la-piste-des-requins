/* map-data.js — world-map + tracking data module (split from script.js in v0.9.1).
   Pure data + two pure helpers (genTrack, hashStr). Loaded BEFORE script.js;
   everything here is global and read by the map tab at runtime. */

/* ---------- Shark tracking: movement envelopes ----------
   v0.9.0: rebuilt on REAL geography. Each species gets a biologically
   defensible envelope — a verified tagging/aggregation anchor, realistic
   areas in plausible corridor order, honest hop distances and ping
   intervals. Randomness lives INSIDE the envelope; the envelope itself
   is real. Research: primary literature + tagging programs (OCEARCH,
   Guy Harvey RI, ICCAT, Marine Megafauna Foundation), Oct 2026.
   WHY this matters (for reviewers): the old pools picked waypoints and
   hop distances semi-randomly, which could imply migration routes,
   timings, or distances nobody validated — a story that sounds scientific
   without being it. Per ChatGPT's v0.8.0 review: "randomness is fine
   inside a biologically defensible envelope."
   Honesty rules baked in: goblin sharks have NEVER carried satellite
   tags (tracks marked archival); epaulettes are mark-recapture only
   (tracks marked as reef survey re-sightings); great white flavor avoids
   presenting Seal Island/False Bay as a current hotspot (whites largely
   vanished there ~2017, orcas Port & Starboard) — the areas list keeps
   historically real sites without "right now" claims. */
const TRACK_ENVELOPES = {
  nurse: {
    start: "Caribbean reef lagoon (tag site)", // game region is the generic Caribbean Sea; envelope stays local by design
    /* v0.9.0 consistency pass (for reviewers): the old envelope used the
       superbly documented Dry Tortugas (Florida) program, but the game
       tags nurse sharks in the Caribbean Sea — Florida waypoints for a
       Caribbean shark. Rebuilt Caribbean-local on Caribbean acoustic
       work: Glover's Reef, Belize (mean dispersal 7.7 km — Chapman et
       al.) and the Buck Island, St. Croix array (11 nurse sharks,
       2013–2017, high residency). The BEHAVIOUR (extreme residency,
       <10 km typical, biennial mating aggregations) is informed by both
       Florida and Caribbean studies; the PLACES are deliberately generic
       reef-habitat labels clustered at the tag site, because a nurse
       shark barely leaves its home reef. Map coords cluster tightly
       around the Caribbean Sea tag point — honest, not empty. */
    areas: ["Tag-site reef", "Adjacent sand flats", "Seagrass beds", "Reef-edge drop-off", "Mating aggregation flat", "Nearby patch reefs"],
    hop: [1, 15], dayStep: [7, 30], nPoints: [5, 6], kind: "acoustic",
    corridor: "extremely resident — mean dispersal 7.7 km (Glover's Reef, Belize); strong site fidelity; biennial returns to mating flats"
  },
  thresher: {
    start: "Offshore North Carolina", // Anderson et al.: 61 PSAT tags, 48 individuals tracked WNA; Kneebone/NEAq tagged NC→Grand Banks 2016–2023
    /* v0.9.0 consistency pass (for reviewers): the old envelope was built
       on Southern California acoustic/satellite work, but the game tags
       threshers in the Open Atlantic — a textbook case of the mismatch
       ChatGPT flagged ("an individual shark's displayed track must be
       geographically compatible with where that individual was tagged").
       Rebuilt on western North Atlantic PSAT telemetry instead: seasonal
       "snowbird" migration, Florida↔Grand Banks. */
    areas: ["Offshore North Carolina", "Mid-Atlantic Bight shelf edge", "Georges Bank", "Gulf of Maine", "Grand Banks", "Offshore Florida (wintering)"],
    hop: [80, 600], dayStep: [5, 14], nPoints: [5, 7], kind: "satellite",
    corridor: "seasonal 'snowbird' migration — north to the Grand Banks in summer, south toward Florida in winter; daily vertical migration matters more than horizontal (Anderson et al.; Kneebone/NEAq)"
  },
  whale: {
    start: "Tubbataha Reefs Natural Park, Philippines", // Araujo et al. 2018 (PeerJ): 17 juvenile SPOT5 tags, Sulu & Bohol Seas
    /* v0.9.0 consistency pass (for reviewers): the old envelope was built
       on the Ningaloo (W. Australia) satellite study, but the game tags
       whale sharks in the Philippines. Rebuilt on Araujo et al. 2018 —
       the location-matched telemetry ChatGPT pointed to: all 17 tagged
       sharks stayed in Philippine waters (6–126 days, 86–2,580 km,
       ~15.5 km/day), moving between the Bohol and Sulu Seas, through
       Surigao Strait, and out to the Pacific coast of Mindanao. */
    areas: ["Tubbataha Reefs Natural Park", "Sulu Sea", "Northern Palawan", "Bohol Sea", "Surigao Strait", "Eastern Leyte", "Eastern Mindanao (Pacific)"],
    hop: [50, 500], dayStep: [5, 14], nPoints: [5, 7], kind: "satellite",
    corridor: "juveniles highly mobile but stay in Philippine waters — Bohol↔Sulu connectivity, Surigao Strait crossings (Araujo et al. 2018, PeerJ)"
  },
  goblin: {
    start: "Sagami Bay, Japan", // described 1898 from a Sagami Bay specimen; most records here (Yano et al. 2007)
    areas: ["Sagami Bay", "Tokyo Bay", "Suruga Bay", "Offshore Izu Islands", "Kuroshio Current edge", "Japanese upper continental slope"],
    hop: [20, 150], dayStep: [14, 45], nPoints: [4, 5], kind: "archival",
    corridor: "deep-slope resident — presumed sedentary 270–960 m; NO migratory behaviour documented, NO satellite tracks exist"
  },
  tiger: {
    start: "Fuvahmulah, Maldives", // world's largest documented tiger aggregation; strong site fidelity (Sci Rep mark-recapture)
    areas: ["Fuvahmulah", "Addu Atoll", "Chagos Archipelago", "Seychelles Bank", "Saya de Malha", "Open Indian Ocean (westward leg)"],
    hop: [150, 800], dayStep: [7, 30], nPoints: [6, 7], kind: "satellite",
    corridor: "atoll-associated with long offshore excursions; trans-Indian-Ocean moves documented — 'Sereia' Mozambique→Indonesia >6,400 km (OCEARCH)"
  },
  sandtiger: {
    start: "Delaware Bay, USA", // Teter et al. 2014: 13 sharks satellite+acoustic tagged, late Aug/early Sep
    areas: ["Delaware Bay", "New Jersey coast", "Virginia Capes", "Cape Hatteras", "Cape Lookout", "Offshore North Carolina shelf edge"],
    hop: [50, 400], dayStep: [7, 21], nPoints: [5, 7], kind: "satellite",
    corridor: "seasonal coastal north–south along the shelf edge; autumn run to the Carolinas (Teter et al. 2014; Haulsee et al.)"
  },
  galapagos: {
    start: "Darwin Island, Galápagos", // satellite-tagging work at Darwin Island, GMR acoustic networks
    areas: ["Darwin Island", "Wolf Island", "Isabela Island", "Fernandina Island", "Galápagos platform edge", "Open water between islands"],
    hop: [20, 150], dayStep: [7, 21], nPoints: [4, 6], kind: "satellite",
    corridor: "highly resident — 30–50 km home ranges; >2,000 km moves documented but rare (MDPI Diversity 2026)"
  },
  greatwhite: {
    start: "Gansbaai, South Africa", // OCEARCH tagging ("Alisha", May 2012)
    areas: ["Gansbaai", "Dyer Island", "Seal Island (False Bay)", "Mossel Bay", "Cape Agulhas", "Open Indian Ocean (offshore leg)"],
    hop: [200, 1500], dayStep: [7, 21], nPoints: [6, 7], kind: "satellite",
    corridor: "coastal aggregation → offshore trans-oceanic; 'Nicole' SA→Australia→back >20,000 km / 9 mo (Bonfil et al., Science 2005)"
  },
  hammerhead: {
    start: "Bimini, Bahamas", // Guttridge et al. long-term Bimini tagging program
    /* v0.9.0 consistency pass (for reviewers): the old areas list leaned on
       Florida-tagged studies (Florida Keys, Jupiter, offshore Virginia) —
       ChatGPT's "Caribbean tag feeding a Florida-specific envelope"
       example. Rebuilt Caribbean-centered on Bahamas work: Bimini
       philopatry + seasonal residency (Guttridge et al. 2017) and the
       Andros Island year-round residency study (Frontiers 2025: site
       fidelity within 400 km², some individuals <1 km over 4 years).
       The partial-migration behaviour is kept honest in the corridor
       note (some do run north in summer), but no Florida waypoints are
       imported into a Caribbean shark's pings. */
    areas: ["Bimini", "Andros Island", "Eleuthera", "Exuma Sound", "Tongue of the Ocean", "Cay Sal Bank"],
    hop: [50, 400], dayStep: [7, 21], nPoints: [5, 7], kind: "satellite",
    corridor: "partial migration — many resident in the Bahamas year-round; some summer excursions north, return for winter (Guttridge et al. 2017; Andros 2025)"
  },
  mako: {
    start: "Azores", // ICCAT satellite study, NE Atlantic
    areas: ["Azores", "Canary Islands", "Madeira", "West African coast (Senegal/Cape Verde)", "Mid-Atlantic ridge", "Gulf Stream edge"],
    hop: [300, 1500], dayStep: [7, 30], nPoints: [6, 7], kind: "satellite",
    corridor: "open-ocean nomad — 24,213 km / 551 days documented; >8,900 km along West Africa (Abascal et al., ICCAT 2018)"
  },
  basking: {
    start: "Cornwall, UK", // Sims et al. tagging off Plymouth/SW England
    areas: ["Cornwall (Lizard/Land's End)", "Isle of Man", "Hebrides (Coll/Tiree)", "Irish Sea", "Celtic Sea", "Donegal Bay", "Bay of Biscay / Iberian coast (winter leg)"],
    hop: [200, 1000], dayStep: [7, 21], nPoints: [6, 8], kind: "satellite",
    corridor: "seasonal basin migration — UK summer feeding → Biscay/Iberia winter → return (Doherty et al., Sci Rep 2017)"
  },
  epaulette: {
    start: "Papua New Guinea reef flat (tag site)", // game tags in PNG; no PNG telemetry exists — see note
    /* v0.9.0 consistency pass (for reviewers): the old envelope named
       Heron Island (Great Barrier Reef) waypoints for a shark tagged in
       Papua New Guinea — exactly the mismatch ChatGPT flagged. Per the
       canon rule, the Heron Island mark-recapture work (Heupel &
       Bennett — best epaulette movement evidence anywhere) now informs
       BEHAVIOUR and SCALE only: "extremely resident, metre-scale
       movements." No Australian waypoints are imported; the areas are
       generic PNG reef-flat labels, and the kind stays "resightings"
       (never satellite-tagged). Greatest net displacement on record:
       475 m. */
    areas: ["Tag-site reef flat", "Adjacent coral-head pools", "PNG reef crest", "Lagoon patch", "North beach pools", "Reef-flat edge"],
    hop: [0.1, 2], dayStep: [1, 7], nPoints: [6, 8], kind: "resightings",
    corridor: "extreme residency — greatest net displacement on record 475 m; scale inferred from Heron Island mark-recapture (no PNG telemetry exists)"
  },
  lemon: {
    start: "Caribbean mangrove lagoon (tag site)",
    /* v0.11.0 review fix (ChatGPT): the first version named real
       western-Atlantic sites (Bimini → Andros ≈ 200 km) while the
       envelope claims hop: [2, 40] — an individual shark visibly crossing
       hundreds of kilometres its track data says it never swam. Per the
       canon rule, the plotted individual stays Caribbean-local: generic
       mangrove-lagoon labels clustered at the tag site (the nurse-shark
       precedent). The Bimini Biological Field Station science still
       informs BEHAVIOUR and SCALE (natal philopatry, mangrove nurseries)
       via the corridor note and research text — it just doesn't donate
       waypoints. (Making Bimini its own expedition region is the
       future-proof alternative; not this version.) */
    areas: ["Tag-site mangrove lagoon", "Nursery shallows", "Mangrove channel", "Lagoon sand flat", "Nursery patch reefs"],
    hop: [2, 40], dayStep: [7, 30], nPoints: [5, 7], kind: "acoustic",
    corridor: "natal philopatry — females return to their birthplace to pup; juveniles resident in mangrove lagoons; behaviour/scale from the Bimini acoustic + PIT tagging program"
  },
  blacktip: {
    start: "Maldivian reef flat (tag site)",
    /* v0.11.0 review fix (ChatGPT): Baa Atoll → Addu ≈ 650 km against
       hop: [1, 25] — same mismatch. Rebuilt reef-local: generic labels
       clustered within ~25 km of the Maldives tag site. The Moorea
       photo-ID / Indo-Pacific acoustic work still informs behaviour
       (tiny home ranges, stable social associations). */
    areas: ["Maldives tag-site reef flat", "Tag-site reef crest", "Tag-site lagoon", "Tag-site channel", "Reef-flat coral heads"],
    hop: [1, 25], dayStep: [7, 21], nPoints: [5, 6], kind: "acoustic",
    corridor: "extremely resident — among the smallest home ranges of any requiem shark; stable social associations (Moorea photo-ID; Indo-Pacific acoustic telemetry)"
  },
  whitetip: {
    start: "Philippine reef cave (tag site)",
    /* v0.11.0 review fix (ChatGPT): Tubbataha → Apo Reef ≈ 420 km
       against hop: [1, 20] — same mismatch. Rebuilt reef-local: generic
       cave/ledge/crevice labels clustered within ~20 km of the
       Philippines tag site. Indo-Pacific T. obesus acoustic work still
       informs behaviour (cave-sheltering, fierce reef fidelity). */
    areas: ["Tag-site reef cave", "Tag-site cave ledge", "Tag-site reef crevice", "Night-hunt reef", "Shelter ledge"],
    hop: [1, 20], dayStep: [7, 21], nPoints: [5, 6], kind: "acoustic",
    corridor: "strong reef fidelity — same daytime cave shelter for months/years; nocturnal, reef-local (Indo-Pacific acoustic work)"
  },
  blue: {
    start: "Open Atlantic (tag site)",
    areas: ["Tag-site open water", "Gulf Stream meander", "Mid-Atlantic Ridge approaches", "Azores Current", "Canary Current edge"],
    hop: [100, 800], dayStep: [5, 14], nPoints: [5, 7], kind: "satellite",
    corridor: "among the longest migrants of any shark \u2014 New England to South America runs are classic; Irish-tagged sharks recaptured off West Africa (~6,840 km); movements strongly seasonal with water temperature (Atlantic tagging programs, ICCAT)"
  },
  porbeagle: {
    start: "Cornwall, UK (tag site)",
    /* v0.13.0 review fix (ChatGPT): Bay of Biscay -> Mid-Atlantic Ridge is
       ~1,460 km, far beyond the old hop max of 600. Porbeagles genuinely
       make these transits (up to 2,000 km documented), so the hop range
       widens to match the animal instead of shrinking the map to fit the
       old range. 2,000 km over the 21-day max step ~= 95 km/day, inside
       the documented transit bursts of up to 100 km/day. "Norwegian Sea
       approaches" became "Iberian coast" — the documented wintering
       ground, and reachable on the same hop budget. */
    areas: ["Tag-site Cornish waters", "Celtic Sea", "Bay of Biscay", "Mid-Atlantic Ridge", "Iberian coast"],
    hop: [100, 2000], dayStep: [7, 21], nPoints: [5, 7], kind: "satellite",
    corridor: "strong seasonal return migrations \u2014 Bay of Biscay taggings travelled up to 2,000 km (Arctic Circle, Madeira, mid-Atlantic Ridge) and returned the following spring; 5,000\u201313,000 km annual loops with clear site fidelity; transit bursts up to 100 km/day"
  },
  silky: {
    start: "Open Atlantic (tag site)",
    areas: ["Tag-site open water", "Tuna school grounds", "FAD drift line", "Shelf-edge front", "Seamount approaches"],
    hop: [80, 500], dayStep: [5, 14], nPoints: [5, 7], kind: "satellite",
    corridor: "highly migratory \u2014 juveniles tracked thousands of kilometres; follows tuna schools and fish aggregating devices; genetics suggest female site fidelity to pupping areas even as individuals range widely"
  },
  oceanic: {
    start: "Open Atlantic (tag site)",
    /* Deliberately modest: movement data are still thin across much of
       the oceanic whitetip's range, so the envelope stays close and the
       corridor says so. */
    areas: ["Tag-site open water", "Seamount", "Oceanic island approaches", "Equatorial front"],
    hop: [50, 400], dayStep: [7, 21], nPoints: [5, 6], kind: "satellite",
    corridor: "highly migratory but movement data still thin across much of its range; philopatric migrations documented in the northern Atlantic; site fidelity off northeast Brazil"
  },
  sevengill: {
    start: "South African bay (tag site)",
    areas: ["Tag-site kelp forest", "Bay channel", "Estuary mouth", "Offshore reef", "Seal colony approaches"],
    hop: [2, 60], dayStep: [7, 30], nPoints: [5, 6], kind: "acoustic",
    corridor: "seasonal inshore\u2013offshore movement \u2014 into bays and estuaries, then out to deeper water; site-resident clusters documented over years; strong fidelity to seasonal aggregations (IUCN 2020)"
  },
  bronze: {
    start: "South African coast (tag site)",
    /* v0.13.0 review fix (ChatGPT): the old hop max of 300 km could not
       cover the documented 1,000+ km coastal migration, so the range
       widens to [30, 1200] (1,200 km over 21 days ~= 57 km/day, plausible
       for a coastal migrant). Areas run in migration order up the coast;
       the offshore reef gets its own label ("Wild Coast offshore reef")
       so it doesn't collide with the sevengill's False Bay "Offshore reef". */
    areas: ["Tag-site coastal bay", "Nursery bay", "Wild Coast offshore reef", "Sardine run grounds", "Mozambique coast approaches"],
    hop: [30, 1200], dayStep: [7, 21], nPoints: [5, 7], kind: "satellite",
    corridor: "seasonal coastwise migration \u2014 South African tagging shows 1,000+ km along the SA and Mozambique coasts in a single cycle; females move between coastal nursery bays and offshore waters"
  },
  frilled: {
    start: "Sagami Bay deep slope (tag site)",
    /* Archival, like the goblin: frilled sharks have never carried
       satellite tags in any sustained program — the track is reconstructed
       from capture records, and the kind note says so honestly. */
    areas: ["Tag-site deep slope", "Canyon wall", "Seamount flank", "Trench approaches"],
    hop: [5, 80], dayStep: [14, 60], nPoints: [4, 5], kind: "archival",
    corridor: "deep benthic drifter — individual movement poorly known; capture records around Japan's deep slopes provide habitat context, but no telemetry track exists; this local path is illustrative only"
  },
  zebra: {
    start: "Philippine reef (tag site)",
    areas: ["Philippine tag-site reef", "Coral garden", "Sand flat", "Lagoon patch reef", "Reef channel"],
    hop: [1, 30], dayStep: [7, 21], nPoints: [5, 6], kind: "acoustic",
    corridor: "reef-resident — Indo-Pacific acoustic work shows small home ranges and strong site fidelity on coral reefs"
  },
  /* v0.18.0 wave. Envelopes stay geographically compatible with tag regions. */
  scalloped: {
    start: "Galápagos seamount (tag site)",
    areas: ["Tag-site seamount", "Neighboring seamount", "Open-water corridor", "Island shelf edge", "Offshore front"],
    hop: [80, 600], dayStep: [10, 40], nPoints: [4, 6], kind: "satellite",
    corridor: "seamount migrant — eastern Pacific satellite work shows long moves between island groups (Galápagos–Cocos–Malpelo) and deep daytime dives; females range widest"
  },
  smooth: {
    start: "Celtic Sea (tag site)",
    areas: ["Tag-site shelf", "Shelf break", "Open Atlantic water", "Frontal zone", "Coastal bay"],
    hop: [50, 400], dayStep: [10, 35], nPoints: [4, 6], kind: "satellite",
    corridor: "temperate roamer — Atlantic tagging shows wide-ranging coastal-pelagic movement, following warm water masses and prey schools"
  },
  bonnethead: {
    start: "Caribbean seagrass bed (tag site)",
    areas: ["Tag-site seagrass", "Adjacent sand flat", "Mangrove fringe", "Shallow lagoon", "Patch reef"],
    hop: [1, 40], dayStep: [7, 21], nPoints: [5, 6], kind: "acoustic",
    corridor: "coastal resident — Gulf/Caribbean acoustic work shows small ranges around estuaries and seagrass, with seasonal inshore-offshore shifts"
  },
  bull: {
    start: "Caribbean coast (tag site)",
    areas: ["Tag-site estuary mouth", "Caribbean coastal shelf", "River channel", "Nearshore reef", "Bay system"],
    hop: [10, 250], dayStep: [7, 30], nPoints: [4, 6], kind: "acoustic",
    corridor: "estuary commuter — acoustic arrays show bulls moving between rivers, estuaries and coastal shelf; some individuals are resident, others migrate hundreds of kilometres"
  },
  greyreef: {
    start: "PNG reef pass (tag site)",
    areas: ["Tag-site reef pass", "Drop-off wall", "Channel", "Outer reef slope", "Lagoon pinnacle"],
    hop: [1, 30], dayStep: [7, 21], nPoints: [5, 6], kind: "acoustic",
    corridor: "reef-resident — Indo-Pacific telemetry shows extreme site fidelity; individuals patrol the same drop-offs and passes for years"
  },
  caribbean: {
    start: "Bahamas reef (tag site)",
    areas: ["Bahamas tag-site reef", "Reef flat", "Sand channel", "Coral head field", "Drop-off edge"],
    hop: [1, 50], dayStep: [7, 21], nPoints: [5, 6], kind: "acoustic",
    corridor: "reef-resident — Bahamas acoustic work shows strong site fidelity to home reefs, with occasional wider forays"
  },
  sandbar: {
    start: "Outer Banks shelf (tag site)",
    areas: ["Tag-site sandbank", "Outer Banks coastal shelf", "Bay mouth", "Migration corridor", "Wintering ground"],
    hop: [80, 700], dayStep: [10, 35], nPoints: [4, 6], kind: "satellite",
    corridor: "seasonal migrant — US east-coast satellite/acoustic work shows north-south migrations along the shelf, with Chesapeake Bay as a key nursery"
  },
  /* v0.20.0 wave. */
  salmon: {
    start: "Kuril Islands (tag site)",
    areas: ["Tag-site waters", "Sea of Okhotsk", "Gulf of Alaska", "Prince William Sound", "Offshore Japan (wintering)", "Oregon/California coast"],
    hop: [50, 400], dayStep: [5, 14], nPoints: [5, 7], kind: "satellite",
    corridor: "seasonal migration following salmon — north in summer (Gulf of Alaska, Kurils), south in winter (Japan, Oregon/California); ~33 km/day on migratory legs; males more common west, females east"
  },
  dusky: {
    start: "KwaZulu-Natal coast (tag site)",
    areas: ["Tag-site coast", "Sardine Run corridor", "Mozambique coast", "Cape waters", "Offshore Agulhas", "Nursery bays"],
    hop: [80, 500], dayStep: [7, 21], nPoints: [5, 7], kind: "satellite",
    corridor: "strongly migratory — up to 3,800 km recorded, seasonal poleward shifts; females show natal site fidelity, keeping local populations distinct"
  },


  silvertip: {
    start: "Outer reef slope off South Malé Atoll",
    areas: ["South Malé Atoll", "South Malé outer slope", "South Malé channel", "Malé Atoll south", "South Malé drop-off"],
    tagAnchor: "South Malé Atoll",
    hop: [5, 40], dayStep: [3, 14], nPoints: [5, 7], kind: "acoustic",
    corridor: "Silvertips show fidelity to outer reef slopes, patrolling the same drop-offs repeatedly; acoustic tagging in the western Indian Ocean has documented individuals returning to the same reef sites over months."
  },
  spinner: {
    start: "Edge of the Great Bahama Bank",
    areas: ["Caribbean Sea", "Caribbean reef edge", "Caribbean channel", "Caribbean Sea north", "Caribbean bank"],
    tagAnchor: "Caribbean Sea",
    hop: [20, 150], dayStep: [4, 21], nPoints: [5, 7], kind: "satellite",
    corridor: "Spinners migrate seasonally along the western Atlantic shelf following baitfish movements, with well-documented winter-spring aggregations off southeast Florida; satellite tagging shows long north-south coastal movements."
  },
  wobbegong: {
    start: "Rocky reef ledge off Byron Bay",
    areas: ["Byron Bay", "Julian Rocks", "Wategos reef", "Byron Bay north wall", "Byron Bay south ledge"],
    tagAnchor: "Byron Bay",
    hop: [1, 8], dayStep: [7, 30], nPoints: [5, 7], kind: "acoustic",
    corridor: "Spotted wobbegongs show strong site fidelity; photo-identification and acoustic studies have recorded individuals remaining on the same reef for years, so movements are short hops between neighbouring ledges."
  },
  leopard: {
    start: "Eelgrass bed in Tomales Bay",
    areas: ["Monterey Bay", "Monterey Canyon edge", "Elkhorn Slough mouth", "Monterey Bay south", "Cannery Row reef"],
    tagAnchor: "Monterey Bay",
    hop: [5, 60], dayStep: [3, 14], nPoints: [5, 7], kind: "acoustic",
    corridor: "Leopard sharks move seasonally between bays and along the California coast; large-scale tagging programs, including long-running work in San Francisco Bay, document site fidelity with seasonal shifts between estuaries."
  },
  horn: {
    start: "Kelp forest off Santa Catalina Island",
    areas: ["Santa Catalina Island", "Catalina west end", "Catalina isthmus", "Catalina east end", "Catalina back side"],
    tagAnchor: "Santa Catalina Island",
    hop: [1, 12], dayStep: [7, 30], nPoints: [5, 7], kind: "acoustic",
    corridor: "Horn sharks show strong site fidelity and documented homing; classic displacement studies recorded individuals navigating back to their home reef from kilometres away, so the track stays tight around one reef complex."
  },
  portjackson: {
    start: "Rocky reef off Sydney",
    areas: ["Sydney", "Sydney north", "Sydney south", "Sydney offshore", "Sydney harbor mouth"],
    tagAnchor: "Sydney",
    hop: [10, 80], dayStep: [14, 45], nPoints: [5, 7], kind: "acoustic",
    corridor: "Port Jacksons make a seasonal southern migration along the east Australian coast to lay eggs in summer, returning north in winter; tagging programs have documented long-distance movements of hundreds of kilometres between New South Wales and Tasmanian waters."
  },
  angelshark: {
    start: "Buried in sandy reef shallows off Cornwall",
    areas: ["Mount's Bay", "Mount's Bay east", "Penzance Bay", "Lizard Point reefs", "Mount's Bay west"],
    tagAnchor: "Mount's Bay",
    hop: [2, 40], dayStep: [1, 14], nPoints: [5, 7], kind: "acoustic",
    corridor: "Common angelsharks are strongly site-attached ambush predators; tagging studies show individuals barely move, sitting buried for days on the same sand patch. Movements are short shuffles between nearby sandy grounds, not migrations."
  },
  megamouth: {
    start: "Tagged at the surface at night off the Izu Peninsula",
    areas: ["Izu Peninsula", "Sagami Bay", "Izu Peninsula south", "Sagami Bay offshore", "Izu Peninsula east"],
    tagAnchor: "Izu Peninsula",
    hop: [50, 400], dayStep: [7, 30], nPoints: [5, 7], kind: "satellite",
    corridor: "Megamouths are vertical migrators, spending days deep in the twilight zone and rising at night to feed — tagged individuals have shown long horizontal movements following currents and plankton, consistent with other large filter-feeding sharks."
  },
  sawshark: {
    start: "Tagged over soft sediment off Tasmania", // v0.21.0 Mira: Burke et al. 2020, pop-up archival tags
    areas: ["Tasman Sea shelf", "Tasman shelf north", "Tasman shelf south", "NSW shelf edge", "Tasman Sea shelf east"],
    tagAnchor: "Tasman Sea shelf",
    hop: [10, 100], dayStep: [3, 14], nPoints: [5, 7], kind: "archival",
    corridor: "Common sawsharks are bottom-associated residents of the continental shelf; tagged individuals show limited horizontal movement with occasional shifts along the shelf, staying near soft-sediment feeding grounds."
  },
  greenland: {
    start: "Tagged in deep Baffin Bay water",
    areas: ["Baffin Bay", "Davis Strait", "Greenland shelf", "Baffin Bay deep basin", "Davis Strait slope"],
    tagAnchor: "Baffin Bay",
    hop: [40, 350], dayStep: [14, 60], nPoints: [5, 7], kind: "satellite",
    hypothetical: true,
    corridor: "Greenland sharks are wide-ranging deep-water roamers of the Arctic; tagging studies show slow, far-reaching movements across deep basins, consistent with their extremely low metabolism and centuries-long lifespans."
  },
  cookiecutter: {
    start: "Tagged at night in Sargasso Sea twilight waters",
    areas: ["Sargasso Sea", "Sargasso Sea west", "Sargasso Sea east", "Sargasso Sea south", "Sargasso Sea north"],
    tagAnchor: "Sargasso Sea",
    hop: [30, 200], dayStep: [3, 14], nPoints: [5, 7], kind: "archival",
    corridor: "Cookiecutter sharks are vertical migrators, spending days at mesopelagic depths and rising hundreds of metres at night to feed — tagged individuals would be expected to drift with oceanic currents and vertical-migration prey layers."
  },
  sixgill: {
    start: "Tagged in deep water off the Porcupine slope",
    areas: ["Porcupine Seabight", "Porcupine Bank", "Rockall Trough", "Porcupine slope", "Western Approaches deep"],
    tagAnchor: "Porcupine Seabight",
    hop: [30, 250], dayStep: [7, 30], nPoints: [5, 7], kind: "satellite",
    hypothetical: true,
    corridor: "Bluntnose sixgills are wide-ranging deep-slope residents; tagging and submersible studies show slow movements along continental slopes and seamounts, with some individuals undertaking diel vertical migrations into shallower water at night."
  },
  velvetbelly: {
    start: "Celtic Sea shelf break, Cornwall",
    areas: ["Porcupine Seabight", "Porcupine slope", "Porcupine Seabight east", "Porcupine Bank edge", "Porcupine Seabight west"],
    tagAnchor: "Porcupine Seabight",
    hop: [10, 80], dayStep: [2, 9], nPoints: [5, 7], kind: "acoustic",
    corridor: "Stays on the NE Atlantic continental slope, riding the deep scattering layer up and down the water column on its nightly feeding migrations."
  },
  dwarflantern: {
    start: "Upper continental slope, Caribbean Sea off Colombia",
    areas: ["Upper slope off Colombia", "Colombian slope north", "Colombian slope south", "Colombian canyon", "Upper slope off Colombia east"],
    tagAnchor: "Upper slope off Colombia",
    hop: [5, 35], dayStep: [3, 12], nPoints: [5, 7], kind: "archival",
    corridor: "A slope resident — small home range along the upper continental slope of the southern Caribbean, drifting between canyon systems with deep currents."
  },
  kitefin: {
    start: "Continental slope, Porcupine Seabight",
    areas: ["Porcupine Seabight", "Porcupine slope", "Porcupine Seabight east", "Porcupine Bank edge", "Porcupine Seabight west"],
    tagAnchor: "Porcupine Seabight",
    hop: [20, 150], dayStep: [14, 45], nPoints: [5, 7], kind: "satellite",
    corridor: "Wanders the deep Atlantic along continental slopes and seamount chains, following deep currents and seasonal aggregations of prey fish."
  },
  pacificsleeper: {
    start: "Tagged in Sagami Bay deep water",
    areas: ["Sagami Bay deep", "Izu Peninsula slope", "Pacific coast of Hokkaido", "Kuril Islands slope", "Oyashio current region"],
    tagAnchor: "Sagami Bay deep",
    hop: [100, 500], dayStep: [14, 45], nPoints: [5, 7], kind: "satellite",
    hypothetical: true,
    corridor: "A slow, long-distance wanderer — tagged in southern Japan, this track follows a northward drift with the Oyashio current toward Hokkaido and the Kuril slope, consistent with the species' basin-wide deep-water range."
  },
  spinydogfish: {
    start: "Coastal waters off Cornwall",
    areas: ["English Channel central", "English Channel east", "English Channel west", "English Channel central north", "English Channel central south"],
    tagAnchor: "English Channel central",
    hop: [20, 150], dayStep: [2, 10], nPoints: [5, 7], kind: "acoustic",
    corridor: "Moves with its school along the shelf — following schooling fish through the Celtic Sea and English Channel, shifting depth with the seasons."
  },
  catshark: {
    start: "Reef off Cornwall",
    areas: ["Mount's Bay", "Lizard Point reefs", "Penzance Bay", "Mount's Bay east", "Lizard Point west"],
    tagAnchor: "Mount's Bay",
    hop: [2, 20], dayStep: [1, 7], nPoints: [5, 7], kind: "acoustic",
    corridor: "A coastal homebody — small hops between reef patches and kelp beds off Cornwall, sheltering deep by day and foraging shallow at night."
  },};

/* v2.0.0-beta (Mira review): regional track envelopes. When a multi-region
   species is tagged outside its primary region, the track must stay
   geographically compatible with the actual tag site (canon: an individual's
   displayed track must match where THAT individual was tagged) — so each
   second region gets its own location-coherent envelope instead of reusing
   the species default. Keys are "speciesId:regionKey". No envelope invents
   long-distance migration to connect unrelated areas; each is a plausible
   local scenario in the tag region. */
TRACK_ENVELOPES["whale:maldives"] = {
  regionKey: "maldives",
  start: "South Ari Atoll, Maldives", // the only documented year-round whale shark aggregation on Earth (MWSRP photo-ID program, since 2006)
  areas: ["South Ari Atoll", "Maamigili", "Dhigurah", "Ari Atoll outer reef", "Rasdhoo Atoll", "Baa Atoll (Hanifaru)", "Mal\u00e9 Atoll south"],
  tagAnchor: "South Ari Atoll",
  hop: [20, 150], dayStep: [7, 30], nPoints: [5, 7], kind: "satellite",
  corridor: "resident juveniles \u2014 South Ari Atoll hosts the only documented year-round whale shark aggregation; the same individuals are re-sighted for years (photo-ID by spot patterns, Maldives Whale Shark Research Programme)"
};
TRACK_ENVELOPES["megamouth:philippines"] = {
  regionKey: "philippines",
  start: "Cagayan de Oro, Mindanao", // Philippine records are strandings/bycatch (Cagayan de Oro, Aurora/Luzon, Visayas); no tracking data exists
  areas: ["Cagayan de Oro", "Bohol Sea", "Visayan Sea", "Luzon east coast (Aurora)", "Philippine Sea edge", "Surigao Strait north"],
  tagAnchor: "Cagayan de Oro",
  hop: [20, 200], dayStep: [7, 30], nPoints: [4, 6], kind: "satellite",
  hypothetical: true, // Mira review: no tracking data exists for this route — waypoints are imagined plausible habitat movement, not measured track points
  corridor: "sparse data \u2014 Philippine megamouth records are strandings and bycatch; no tracking data exists, so this keeps a plausible local scenario for a vertical migrator instead of inventing a migration"
};
TRACK_ENVELOPES["blue:cornwall"] = {
  regionKey: "cornwall",
  start: "Mount's Bay, Cornwall", // well-documented summer/autumn visitors; UK/Ireland tagging programs
  areas: ["Mount's Bay", "Celtic Sea", "Scilly Isles waters", "Western Approaches", "Celtic Deep", "Southwest Approaches"],
  tagAnchor: "Mount's Bay",
  hop: [100, 800], dayStep: [5, 14], nPoints: [5, 7], kind: "satellite",
  corridor: "seasonal NE Atlantic visitors \u2014 UK/Ireland tagging programs; Irish-tagged blues recaptured off West Africa (~6,840 km); movements strongly seasonal with water temperature (Atlantic tagging programs, ICCAT)"
};
TRACK_ENVELOPES["smooth:north-carolina"] = {
  regionKey: "north-carolina",
  start: "Cape Hatteras, North Carolina", // S. zygaena documented along the US east coast
  areas: ["Cape Hatteras", "Outer Banks shelf", "Cape Lookout", "Chesapeake Bay mouth", "Mid-Atlantic Bight", "Gulf Stream edge"],
  tagAnchor: "Cape Hatteras",
  hop: [50, 400], dayStep: [10, 35], nPoints: [4, 6], kind: "satellite",
  corridor: "temperate coastal-pelagic roamer \u2014 US east coast tagging shows wide-ranging movement following warm water masses and prey schools"
};

/* v2.0.0-beta (Mira review): pick the track envelope by the ACTUAL tag
   region, not just the species. Falls back to the species envelope for
   legacy records (no region saved) and single-region species — so existing
   saves keep their tracks byte-for-byte. */
function envelopeFor(speciesId, regionKey) {
  if (regionKey && TRACK_ENVELOPES[speciesId + ":" + regionKey]) {
    return TRACK_ENVELOPES[speciesId + ":" + regionKey];
  }
  return TRACK_ENVELOPES[speciesId] || TRACK_ENVELOPES.nurse;
}

/* How each track kind is framed to the player — honesty first. */
const TRACK_KIND_NOTES = {
  satellite: "Illustrative track — inspired by satellite telemetry. Note: pop-up archival tags transmit stored data after detachment, not live pings. 🛰️",
  archival: "Illustrative habitat-based scenario — this species has never carried a tracking tag. Drawn from capture records and published depth ranges, not an individual's movements.",
  resightings: "Illustrative track — built from reef survey re-sightings, not a satellite tag. This shark barely leaves its reef flat.",
  acoustic: "Illustrative track based on acoustic-tag detections from reef receiver arrays."
};

/* Simulated tag track: starts at the tag site, then walks the species'
   corridor in plausible order. Distances, ping intervals, and point
   counts all come from the envelope — nurse sharks scribble locally,
   whale sharks cross basins. v0.9.0: the areas list runs in corridor
   order, so legs are walked forward (never shuffled into nonsense);
   the start index varies so tracks differ. */
/* v0.21.0 Mira review: haversine distance (km) between two [lat, lon] pairs.
   Used by genTrack() so reported hop distances match the plotted coordinates. */
function haversineKm(a, b) {
  const R = 6371;
  const dLat = (b[0] - a[0]) * Math.PI / 180;
  const dLon = (b[1] - a[1]) * Math.PI / 180;
  const la1 = a[0] * Math.PI / 180, la2 = b[0] * Math.PI / 180;
  const h = Math.sin(dLat/2)**2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon/2)**2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

function genTrack(species, rec) {
  /* v2.0.0-beta (Mira review): envelope follows the actual tag region. */
  const env = envelopeFor(species.id, rec && rec.region);
  const n = env.nPoints[0] + Math.floor(Math.random() * (env.nPoints[1] - env.nPoints[0] + 1));
  /* v0.21.0 Mira final: use species-specific tag anchor for the starting
     position, not the generic regional center. The player's record keeps
     the broad region name, but plotting uses the local anchor. */
  const anchorLabel = env.tagAnchor || rec.location;
  const points = [{ label: anchorLabel, day: 0, km: 0 }];
  let day = 0, totalKm = 0;
  const maxStart = Math.max(0, env.areas.length - (n - 1));
  const startIdx = Math.floor(Math.random() * (maxStart + 1));
  const legs = env.areas.slice(startIdx, startIdx + n - 1);
  /* v0.21.0 Mira review: km is computed from MAP_COORDS via haversine,
     not random within hop. The hop range is now a sanity bound — if the
     real distance exceeds it, we use the real distance anyway (honest)
     and the envelope should be redesigned to be local. */
  let prevCoord = MAP_COORDS[anchorLabel];
  legs.forEach(area => {
    day += env.dayStep[0] + Math.floor(Math.random() * (env.dayStep[1] - env.dayStep[0] + 1));
    const coord = MAP_COORDS[area];
    let km;
    if (prevCoord && coord) {
      km = Math.round(haversineKm(prevCoord, coord) * 10) / 10;
    } else {
      km = Math.round((env.hop[0] + Math.random() * (env.hop[1] - env.hop[0])) * 10) / 10;
    }
    totalKm = Math.round((totalKm + km) * 10) / 10;
    points.push({ label: area, day, km });
    if (coord) prevCoord = coord;
  });
  return { points, totalKm, days: day, kind: env.kind || "satellite", v: 2, hypothetical: !!env.hypothetical };
}

function hashStr(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/* ================= The tracking map tab (v0.9.0) =================
   Display-only: it visualizes track data the game already has. The
   science (envelopes, regions, methods) is frozen — nothing here changes
   it. Coordinates below are APPROXIMATE plotting positions for named
   places so tracks can be drawn on a stylized map; they are not
   scientific claims, and the map is labeled illustrative. */

/* v1.8.6-beta: palette rebuilt for distinctness — 50 saturated colors,
   verified min pairwise DeltaE 10.6 (well above just-noticeable) and every
   color >= 3.5:1 WCAG contrast against the dark map fallback (#0d2f4d).
   v1.8.6 follow-up (Mira review): the six darkest route colors were
   brightened in-hue after five measured below 3:1. Still one color
   per shark. */
const SPECIES_COLORS = {
  nurse: "#48ea62", thresher: "#c377f8", whale: "#f0f631", goblin: "#74b9e9",
  tiger: "#f0387f", sandtiger: "#81f953", galapagos: "#9e9bf1",
  greatwhite: "#f5a47a", hammerhead: "#31f6cc", mako: "#e656c3",
  basking: "#91f028", epaulette: "#5d92f8", lemon: "#e98158",
  blacktip: "#64f886", whitetip: "#d7a8f0", blue: "#dce887",
  porbeagle: "#38daf0", silky: "#fb6ac1", oceanic: "#abd937",
  sevengill: "#7d7ee8", bronze: "#f66931", frilled: "#85eab1",
  zebra: "#d838f0", scalloped: "#e0f85d", smooth: "#4f7af2",
  bonnethead: "#f36288", bull: "#5ce818", greyreef: "#9468ee",
  caribbean: "#f0aa38", sandbar: "#72f3d4", salmon: "#e626d6",
  dusky: "#acf362", silvertip: "#a8b5f0", spinner: "#ee7268",
  wobbegong: "#47f751", leopard: "#c45df8", horn: "#eae23e",
  portjackson: "#62d0f3", angelshark: "#f6289c", megamouth: "#adee80",
  sawshark: "#8475f0", greenland: "#f89d5d", cookiecutter: "#35e4e0",
  sixgill: "#f362f3", velvetbelly: "#bef631", dwarflantern: "#68a0ee",
  kitefin: "#ea4d5e", pacificsleeper: "#4cf3a3", spinydogfish: "#bb8cf2",
  catshark: "#f3cf62"
};

/* Every label a track point can carry: region names (tag sites and
   re-sighting pings) + envelope areas. "Baja California" is a legacy
   v0.8.0 region label — kept so old tracks still plot. Unknown labels
   are skipped, never guessed. */
const MAP_COORDS = {
  "Caribbean Sea": [15.0, -70.0],
  "Outer Banks, North Carolina": [35.2, -75.5],
  "Philippines": [12.0, 122.0],
  "Maldives": [3.2, 73.2],
  "Sagami Bay, Japan": [35.1, 139.4],
  "Open Atlantic": [30.0, -40.0],
  "Cornwall, UK": [50.1, -5.5],
  "Papua New Guinea": [-6.0, 147.0],
  "Galápagos Islands": [-0.5, -90.8],
  "South Africa": [-34.0, 20.0],
  "Eastern Australia": [-27.0, 153.5],
  "California Coast": [34.0, -120.0],
  "Arctic Waters": [72.0, -40.0],
  "Baja California": [28.0, -113.0],
  "South Ari Atoll": [3.65, 72.92],
  "Maamigili": [3.48, 72.84],
  "Dhigurah": [3.53, 72.93],
  "Ari Atoll outer reef": [3.9, 72.8],
  "Baa Atoll (Hanifaru)": [5.17, 73.13],
  "Mal\u00e9 Atoll south": [4.1, 73.55],
  "Cagayan de Oro": [8.45, 124.6],
  "Visayan Sea": [11.4, 123.5],
  "Luzon east coast (Aurora)": [16.0, 122.1],
  "Philippine Sea edge": [14.0, 124.5],
  "Surigao Strait north": [10.2, 125.4],
  "Scilly Isles waters": [49.95, -6.35],
  "Celtic Deep": [51.2, -6.0],
  "Southwest Approaches": [49.0, -11.0],
  "Outer Banks shelf": [35.8, -75.2],
  "Chesapeake Bay mouth": [36.95, -75.95],
  "Mid-Atlantic Bight": [37.5, -74.0],
  "Dry Tortugas mating ground": [24.6, -82.9],
  "Marquesas Keys": [24.6, -82.1],
  "Key West reefs": [24.5, -81.8],
  "Florida Bay": [25.0, -80.9],
  "Everglades backcountry": [25.3, -81.0],
  "Biscayne Bay": [25.6, -80.2],
  "La Jolla Canyon": [32.85, -117.3],
  "Carlsbad Canyon": [33.15, -117.4],
  "Southern California Bight shelf edge": [33.5, -118.5],
  "Santa Catalina Island": [33.4, -118.4],
  "San Nicolas Basin": [33.2, -119.5],
  "Offshore Baja California waters": [31.0, -117.0],
  "Ningaloo Reef": [-22.7, 113.6],
  "Shark Bay": [-25.5, 113.5],
  "Montebello Islands": [-20.4, 115.5],
  "Java Trench approaches": [-10.5, 110.0],
  "Banda Sea": [-6.0, 130.0],
  "Timor Sea": [-11.0, 128.0],
  "Sagami Bay": [35.1, 139.4],
  "Tokyo Bay": [35.4, 139.8],
  "Suruga Bay": [34.7, 138.6],
  "Offshore Izu Islands": [34.2, 139.4],
  "Kuroshio Current edge": [34.0, 140.0],
  "Japanese upper continental slope": [34.8, 139.0],
  "Fuvahmulah": [-0.3, 73.4],
  "Addu Atoll": [-0.7, 73.2],
  "Chagos Archipelago": [-6.3, 71.8],
  "Seychelles Bank": [-5.0, 55.5],
  "Saya de Malha": [-11.0, 62.0],
  "Open Indian Ocean (westward leg)": [-8.0, 65.0],
  /* v0.18.0 wave — envelope areas for the seven new species. */
  "Tag-site seamount": [-0.7, -91.2],
  "Neighboring seamount": [-1.2, -89.5],
  "Open-water corridor": [-0.5, -88.0],
  "Island shelf edge": [-0.3, -91.5],
  "Offshore front": [0.5, -87.0],
  "Tag-site shelf": [50.3, -5.8],
  "Shelf break": [49.8, -7.0],
  "Open Atlantic water": [49.0, -10.0],
  "Frontal zone": [50.5, -8.5],
  "Coastal bay": [50.2, -5.0],
  "Tag-site seagrass": [15.2, -69.8],
  "Adjacent sand flat": [15.0, -70.2],
  "Mangrove fringe": [15.4, -69.5],
  "Shallow lagoon": [14.8, -70.0],
  "Patch reef": [15.1, -69.7],
  "Tag-site estuary mouth": [15.3, -70.3],
  "Caribbean coastal shelf": [15.5, -71.0],
  "Outer Banks coastal shelf": [35.5, -75.0],
  "River channel": [15.6, -70.5],
  "Nearshore reef": [14.9, -69.9],
  "Bay system": [15.0, -70.5],
  "Tag-site reef pass": [-6.2, 147.2],
  "Drop-off wall": [-6.3, 147.4],
  "Channel": [-6.1, 147.1],
  "Outer reef slope": [-6.4, 147.5],
  "Lagoon pinnacle": [-6.0, 147.0],
  "Bahamas tag-site reef": [24.1, -77.3],
  "Reef flat": [24.0, -77.2],
  "Sand channel": [24.2, -77.4],
  "Coral head field": [23.9, -77.1],
  "Drop-off edge": [24.3, -77.5],
  "Tag-site sandbank": [35.3, -75.4],
  "Bay mouth": [35.0, -75.8],
  "Migration corridor": [33.0, -76.5],
  "Wintering ground": [30.0, -79.0],
  "Delaware Bay": [39.0, -75.1],
  "New Jersey coast": [39.5, -74.0],
  "Virginia Capes": [37.0, -75.8],
  "Cape Hatteras": [35.2, -75.5],
  "Cape Lookout": [34.6, -76.5],
  "Offshore North Carolina shelf edge": [34.0, -75.8],
  "Darwin Island": [1.68, -92.0],
  "Wolf Island": [1.38, -91.82],
  "Isabela Island": [-0.7, -91.0],
  "Fernandina Island": [-0.37, -91.55],
  "Galápagos platform edge": [0.0, -91.5],
  "Open water between islands": [0.5, -91.8],
  "Gansbaai": [-34.6, 19.35],
  "Dyer Island": [-34.68, 19.4],
  "Seal Island (False Bay)": [-34.13, 18.58],
  "Mossel Bay": [-34.15, 22.1],
  "Cape Agulhas": [-34.83, 20.0],
  /* v0.20.0 wave: salmon + dusky envelope areas. */
  "Tag-site waters": [44.0, 150.0],
  "Sea of Okhotsk": [55.0, 150.0],
  "Gulf of Alaska": [58.0, -145.0],
  "Prince William Sound": [60.5, -147.0],
  "Offshore Japan (wintering)": [35.0, 142.0],
  "Oregon/California coast": [40.0, -125.0],
  "Tag-site coast": [-29.5, 31.5],
  "Sardine Run corridor": [-30.5, 30.5],
  "Mozambique coast": [-25.0, 34.0],
  "Cape waters": [-34.5, 19.0],
  "Offshore Agulhas": [-38.0, 25.0],
  "Nursery bays": [-28.5, 32.0],
  "Open Indian Ocean (offshore leg)": [-38.0, 25.0],
  "Bimini": [25.7, -79.25],
  "Andros Island": [24.4, -77.9],
  "Eleuthera": [25.0, -76.8],
  "Florida Keys": [24.6, -81.5],
  "Jupiter, Florida": [26.9, -80.05],
  "Offshore Virginia / Gulf Stream": [36.5, -74.5],
  "Azores": [38.7, -27.2],
  "Canary Islands": [28.3, -15.8],
  "Madeira": [32.7, -17.0],
  "West African coast (Senegal/Cape Verde)": [15.0, -20.0],
  "Mid-Atlantic ridge": [30.0, -42.0],
  "Gulf Stream edge": [35.0, -70.0],
  "Cornwall (Lizard/Land's End)": [50.0, -5.7],
  "Isle of Man": [54.2, -4.6],
  "Hebrides (Coll/Tiree)": [56.6, -6.6],
  "Irish Sea": [53.8, -5.3],
  "Celtic Sea": [50.5, -7.5],
  "Donegal Bay": [54.55, -8.3],
  "Bay of Biscay / Iberian coast (winter leg)": [44.5, -4.5],
  "Heron Island reef flat": [-23.44, 151.91],
  "Heron lagoon": [-23.445, 151.915],
  "Shark Bay (Heron Island)": [-23.438, 151.908],
  "Reef crest": [-23.442, 151.918],
  "Coral-head pools": [-23.441, 151.912],
  "Heron Island north beach pools": [-23.437, 151.914],
  "Wistari Reef edge": [-23.45, 151.92],
  /* v0.9.0 consistency pass: new envelope labels. Thresher (WNA),
     whale (Philippines), hammerhead (Bahamas) get real coordinates;
     nurse and epaulette generic reef labels cluster tightly at their
     tag sites — honest local scribbles, not false precision. Older
     labels above are kept so pre-fix tracks still plot. */
  "Offshore North Carolina": [35.5, -74.5],
  "Mid-Atlantic Bight shelf edge": [38.5, -72.0],
  "Georges Bank": [41.5, -67.5],
  "Gulf of Maine": [43.0, -69.0],
  "Grand Banks": [45.5, -50.0],
  "Offshore Florida (wintering)": [28.0, -79.0],
  "Tubbataha Reefs Natural Park": [8.9, 119.9],
  "Sulu Sea": [9.5, 121.0],
  "Northern Palawan": [11.0, 119.0],
  "Bohol Sea": [9.8, 123.5],
  "Surigao Strait": [10.2, 125.4],
  "Eastern Leyte": [10.8, 125.0],
  "Eastern Mindanao (Pacific)": [8.5, 126.5],
  "Exuma Sound": [24.0, -76.0],
  "Tongue of the Ocean": [24.2, -77.5],
  "Cay Sal Bank": [23.8, -80.3],
  "Tag-site reef": [15.0, -70.0],
  "Adjacent sand flats": [15.03, -70.01],
  "Seagrass beds": [14.98, -70.03],
  "Reef-edge drop-off": [15.02, -69.98],
  "Mating aggregation flat": [15.01, -70.04],
  "Nearby patch reefs": [14.99, -69.99],
  "Tag-site reef flat": [-6.0, 147.0],
  "Adjacent coral-head pools": [-5.998, 147.002],
  "PNG reef crest": [-6.002, 147.001],
  "Lagoon patch": [-6.002, 146.998],
  "North beach pools": [-5.999, 147.003],
  "Reef-flat edge": [-6.001, 146.997],
  /* v0.11.0: reef-local envelope labels for the reef trio (review fix).
     Generic lagoon / reef-flat / cave labels clustered tightly at each
     tag site — the nurse-shark precedent. Species science informs
     behaviour and scale, never waypoints. */
  "Tag-site mangrove lagoon": [15.0, -70.0],
  "Nursery shallows": [15.06, -69.96],
  "Mangrove channel": [14.95, -70.07],
  "Lagoon sand flat": [15.03, -70.1],
  "Nursery patch reefs": [14.97, -69.93],
  "Maldives tag-site reef flat": [3.2, 73.2],
  "Tag-site reef crest": [3.23, 73.21],
  "Tag-site lagoon": [3.17, 73.18],
  "Tag-site channel": [3.25, 73.24],
  "Reef-flat coral heads": [3.18, 73.23],
  "Tag-site reef cave": [12.0, 122.0],
  "Tag-site cave ledge": [12.03, 122.02],
  "Tag-site reef crevice": [11.98, 121.99],
  "Night-hunt reef": [12.04, 122.05],
  "Shelter ledge": [11.97, 122.03],

  /* v0.13.0: coordinates for the six-shark wave envelopes. Approximate
     plotting positions (see header note); consecutive legs audited
     against each envelope's hop range. */
  "Tag-site open water": [30.0, -40.0],
  "Gulf Stream meander": [33.0, -45.0],
  "Mid-Atlantic Ridge approaches": [31.5, -42.0],
  "Azores Current": [34.5, -38.0],
  "Canary Current edge": [31.0, -35.0],
  "Tag-site Cornish waters": [50.1, -5.5],
  "Bay of Biscay": [45.5, -5.5],
  "Mid-Atlantic Ridge": [44.0, -24.0],
  "Iberian coast": [40.0, -9.5],
  "Tuna school grounds": [28.0, -43.0],
  "FAD drift line": [26.5, -46.0],
  "Shelf-edge front": [25.0, -49.0],
  "Seamount approaches": [23.5, -46.5],
  "Seamount": [28.5, -42.5],
  "Oceanic island approaches": [27.0, -40.0],
  "Equatorial front": [25.5, -42.0],
  "Tag-site kelp forest": [-34.20, 18.35],
  "Bay channel": [-34.10, 18.50],
  "Estuary mouth": [-34.05, 18.60],
  "Offshore reef": [-34.25, 18.30],
  "Seal colony approaches": [-34.13, 18.58],
  "Tag-site coastal bay": [-34.0, 18.5],
  "Nursery bay": [-33.5, 26.0],
  "Wild Coast offshore reef": [-32.0, 28.5],
  "Sardine run grounds": [-30.5, 30.5],
  "Mozambique coast approaches": [-27.5, 32.5],

  /* v0.14.0: frilled + zebra envelope waypoints. */
  "Tag-site deep slope": [35.0, 139.6],
  "Canyon wall": [34.9, 139.9],
  "Seamount flank": [34.7, 140.2],
  "Trench approaches": [34.5, 140.5],
  "Philippine tag-site reef": [12.1, 122.1],
  "Coral garden": [12.05, 122.15],
  "Sand flat": [11.95, 122.05],
  "Lagoon patch reef": [12.15, 122.0],
  "Reef channel": [12.0, 121.95],


  "Aleutian arc": [52.0, -175.0],
  "Anacapa Channel": [34.0, -119.5],
  "Ari Atoll": [3.8, 72.9],
  "Aves Ridge slope": [13.5, -63.5],
  "Azores seamount chain": [38.0, -28.0],
  "Baa Atoll": [5.2, 73.0],
  "Baffin Bay": [73.0, -65.0],
  "Bass Strait": [-39.5, 147.0],
  "Bay of Biscay slope": [45.0, -5.0],
  "Bering Sea slope": [58.0, -175.0],
  "Bermuda": [32.3, -64.8],
  "Blake Plateau": [30.5, -78.5],
  "Bristol Channel": [51.3, -4.5],
  "Brittany coast": [48.4, -4.8],
  "Brittany continental slope": [47.5, -6.0],
  "Byron Bay": [-28.6, 153.6],
  "Canadian Arctic Archipelago": [73.0, -95.0],
  "Canary Islands slope": [28.0, -16.0],
  "Cardigan Bay": [52.5, -4.8],
  "Cariaco Basin slope": [10.8, -64.5],
  "Celtic Sea shallows": [50.5, -7.0],
  "Cuba shelf edge": [22.5, -79.5],
  "Davis Strait": [65.0, -58.0],
  "East China Sea": [30.0, 126.0],
  "Eden": [-37.1, 149.9],
  "Elkhorn Slough": [36.8, -121.8],
  "English Channel": [50.2, -1.0],
  "Great Australian Bight": [-33.5, 130.0],
  "Great Bahama Bank": [24.5, -79.0],
  "Greenland shelf": [68.0, -55.0],
  "Grenada Basin": [12.5, -62.5],
  "Gulf Stream": [35.0, -70.0],
  "Gulf of Cadiz": [36.0, -8.0],
  "Irish Sea margin": [53.5, -5.5],
  "Isles of Scilly": [49.9, -6.3],
  "Izu Peninsula": [34.9, 138.9],
  "Jervis Bay": [-35.1, 150.8],
  "Kuril Islands slope": [46.0, 152.0],
  "Kuril-Kamchatka Trench margin": [50.0, 158.0],
  "Kuroshio Current": [33.0, 138.0],
  "La Jolla": [32.8, -117.3],
  "Lesser Antilles volcanic arc slope": [14.0, -61.0],
  "Little Bahama Bank": [26.8, -78.5],
  "Lizard Point": [49.96, -5.2],
  "Lizard Point reefs": [49.96, -5.2],
  "Lord Howe Island": [-31.6, 159.1],
  "Madeira Abyssal slope": [32.0, -18.0],
  "Mid-Atlantic Ridge seamounts": [40.0, -30.0],
  "Montague Island": [-36.2, 150.2],
  "Monterey Bay": [36.8, -121.9],
  "Mount's Bay": [50.1, -5.5],
  "New South Wales coast": [-33.0, 152.5],
  "Norwegian Sea": [68.0, 5.0],
  "Ogasawara Islands": [27.1, 142.2],
  "Oyashio current region": [43.0, 146.0],
  "Pacific coast of Hokkaido": [42.0, 144.0],
  "Palos Verdes": [33.7, -118.4],
  "Penzance Bay": [50.1, -5.5],
  "Phillip Island": [-38.5, 145.2],
  "Plymouth Sound reefs": [50.3, -4.1],
  "Porcupine Bank": [53.5, -13.5],
  "Porcupine Seabight": [51.0, -13.0],
  "Port Stephens": [-32.7, 152.2],
  "Rasdhoo Atoll": [4.3, 73.0],
  "Rockall Trough": [55.0, -14.0],
  "San Clemente Island": [32.9, -118.5],
  "San Francisco Bay": [37.8, -122.4],
  "Santa Cruz Island": [34.0, -119.7],
  "Santa Monica Bay": [33.9, -118.5],
  "Sargasso Sea": [30.0, -60.0],
  "Scilly Isles": [49.9, -6.3],
  "Shikoku Basin": [31.0, 135.0],
  "Solitary Islands": [-30.2, 153.3],
  "South Malé Atoll": [3.9, 73.5],
  "Svalbard": [78.0, 16.0],
  "Sydney": [-33.9, 151.2],
  "Sydney reefs": [-33.9, 151.3],
  "Tasman Sea shelf": [-28.7, 153.7],
  "Tomales Bay": [38.2, -123.0],
  "Turks and Caicos": [21.8, -71.8],
  "Upper slope off Colombia": [12.5, -72.5],
  "Upper slope off Venezuela": [11.5, -64.0],
  "Vaavu Atoll": [3.5, 73.5],
  "Victoria shelf": [-38.5, 144.5],
  "Western Approaches": [49.5, -8.0],
  "Wilsons Promontory": [-39.0, 146.4],
  "Yucatán Channel": [21.8, -85.8],
  "northern Tasmania": [-40.9, 146.5],
  /* v0.21.0 Mira review: local waypoint clusters for resident species. */
  "Catalina west end": [33.45, -118.6],
  "Catalina isthmus": [33.45, -118.5],
  "Catalina east end": [33.4, -118.35],
  "Catalina back side": [33.42, -118.55],
  "Julian Rocks": [-28.61, 153.63],
  "Wategos reef": [-28.63, 153.64],
  "Byron Bay north wall": [-28.62, 153.65],
  "Byron Bay south ledge": [-28.65, 153.62],
  "Baffin Bay deep basin": [72.5, -64.0],
  "Davis Strait slope": [65.5, -57.5],
  "Porcupine slope": [51.02, -13.1],
  "Western Approaches deep": [49.3, -8.5],

  "Sagami Bay deep": [35.0, 139.5],
  "Izu Peninsula slope": [34.7, 139.0],
  /* v0.21.0 Mira re-review: local clusters for plausibility. */
  "Mount's Bay east": [50.08, -5.45],
  "Lizard Point west": [49.95, -5.25],
  "Colombian slope north": [12.7, -72.3],
  "Colombian slope south": [12.3, -72.7],
  "Colombian canyon": [12.5, -72.5],
  "Upper slope off Colombia east": [12.6, -72.0],
  "Tasman shelf north": [-28.6, 153.75],
  "Tasman shelf south": [-28.8, 153.65],
  "NSW shelf edge": [-28.65, 153.8],
  "Sargasso Sea west": [30.1, -60.2],
  "Sargasso Sea east": [29.9, -59.8],
  "Sargasso Sea north": [30.3, -60.1],

  /* v0.21.0 final audit: local clusters. */
  "South Malé outer slope": [3.95, 73.55],
  "South Malé channel": [3.88, 73.48],
  "Malé Atoll south": [3.85, 73.52],
  "South Malé drop-off": [3.92, 73.58],
  "Monterey Canyon edge": [36.75, -121.95],
  "Elkhorn Slough mouth": [36.82, -121.78],
  "Monterey Bay south": [36.65, -121.85],
  "Cannery Row reef": [36.62, -121.92],
  "Mount's Bay west": [50.05, -5.60],
  "Tasman Sea shelf east": [-28.7, 153.85],
  "Porcupine Seabight east": [51.05, -13.05],
  "Porcupine Bank edge": [51.08, -13.15],
  "Porcupine Seabight west": [50.95, -13.25],
  "English Channel east": [50.22, -1.0],
  "English Channel west": [50.18, -1.4],
  "English Channel central north": [50.25, -1.2],
  "English Channel central south": [50.15, -1.2],
  "English Channel central": [50.2, -1.2],
  "Caribbean reef edge": [15.2, -70.2],
  "Caribbean channel": [14.8, -69.8],
  "Caribbean Sea north": [15.5, -70.5],
  "Caribbean bank": [14.5, -70.0],

  "Sydney north": [-33.8, 151.3],
  "Sydney south": [-34.0, 151.2],
  "Sydney offshore": [-33.9, 151.4],
  "Sydney harbor mouth": [-33.85, 151.25],
  "Sargasso Sea south": [29.7, -60.0],
  "Taiwan east coast": [23.9, 121.7],
  "Taiwan east offshore": [23.8, 122.0],
  "Taiwan east deep": [23.7, 122.3],
  "Ryukyu Trench north": [24.2, 122.5],
  "Taiwan east slope": [24.0, 121.9],
  "Izu Peninsula south": [34.6, 139.1],
  "Sagami Bay offshore": [35.0, 139.5],
  "Izu Peninsula east": [34.8, 139.2],};

const MAP_W = 1000, MAP_H = 500;

/* NASA Blue Marble Next Generation, full-globe equirectangular (2:1),
   hotlinked as the map background. v0.10.0 replaces the stylized
   LAND_PATHS continents (retired). CC BY-SA 3.0 — credit lives in the
   map tab and the README. */
const BLUE_MARBLE_URL = "https://upload.wikimedia.org/wikipedia/commons/c/cd/Land_ocean_ice_2048.jpg";

/* Major ocean currents — schematic but geographically honest. Waypoints are
   [lat, lon]; the renderer smooths them and splits paths at the antimeridian.
   Warm vs cold is real oceanography (and a real driver of where sharks go),
   hence the two hues. v0.10.0: drawn as a toggleable overlay. */
const CURRENTS = [
  { name: "Gulf Stream", warm: true, label: true,
    pts: [[25,-80],[29,-77],[33,-73],[37,-68],[40,-60],[43,-52]] },
  { name: "North Atlantic Drift", warm: true,
    pts: [[43,-52],[47,-42],[51,-30],[54,-18],[57,-8]] },
  { name: "Canary Current", warm: false,
    pts: [[36,-9],[32,-12],[28,-15],[24,-18],[20,-20]] },
  { name: "North Equatorial Current", warm: true,
    pts: [[17,-22],[16,-35],[15,-48],[14,-58]] },
  { name: "South Equatorial Current", warm: true,
    pts: [[-2,-10],[-3,-20],[-5,-30],[-8,-37]] },
  { name: "Brazil Current", warm: true,
    pts: [[-9,-34],[-16,-37],[-24,-42],[-32,-50],[-39,-57]] },
  { name: "Antarctic Circumpolar Current", warm: false, label: true,
    pts: [[-56,-180],[-59,-135],[-56,-90],[-59,-45],[-56,0],[-59,45],[-56,90],[-59,135],[-56,180]] },
  { name: "Agulhas Current", warm: true, label: true,
    pts: [[-25,36],[-30,33],[-35,28],[-39,23],[-41,20],[-40,32],[-38,42]] },
  { name: "Kuroshio Current", warm: true, label: true,
    pts: [[21,122],[25,125],[29,129],[32,133],[35,139],[37,145],[40,155],[41,165]] },
  { name: "North Pacific Current", warm: true,
    pts: [[41,165],[43,180],[44,-165],[45,-150],[46,-138]] },
  { name: "California Current", warm: false,
    pts: [[46,-130],[41,-126],[36,-122],[31,-119],[26,-116],[23,-113]] },
  { name: "Humboldt Current", warm: false, label: true,
    pts: [[-42,-74],[-36,-73],[-30,-72],[-24,-71],[-18,-74],[-12,-78],[-6,-83]] },
  { name: "East Australian Current", warm: true,
    pts: [[-23,154],[-27,154],[-31,152],[-35,151],[-38,150]] },
  { name: "Pacific Equatorial Countercurrent", warm: true,
    pts: [[6,135],[6,155],[6,175],[6,-175],[6,-155],[6,-135],[6,-115],[6,-100]] }
];

/* ---------- French display labels (Batch 12) ----------
   Architecture (Mira-approved): canonical English keys and MAP_COORDS stay
   untouched; French labels apply ONLY at display boundaries via this map.
   Same French label for two English keys (e.g. Mid-Atlantic Ridge/ridge)
   is safe: lookups still use the distinct English keys.
   Display rule: GEO_LABELS_FR[label] || label — strings Batch 12 did not
   cover (4 regional-variant envelopes) fall back to English until reviewed. */
const GEO_LABELS_FR = {
  "Caribbean reef lagoon (tag site)": "Lagon récifal caraïbe (site de marquage)",
  "Tag-site reef": "Récif du site de marquage",
  "Adjacent sand flats": "Platiers sableux adjacents",
  "Seagrass beds": "Herbiers marins",
  "Reef-edge drop-off": "Tombant de récif",
  "Mating aggregation flat": "Platier de rassemblement nuptial",
  "Nearby patch reefs": "Récifs isolés à proximité",
  "Offshore North Carolina": "Au large de la Caroline du Nord",
  "Mid-Atlantic Bight shelf edge": "Bordure du plateau du Mid-Atlantic Bight",
  "Georges Bank": "Banc de Georges",
  "Gulf of Maine": "Golfe du Maine",
  "Grand Banks": "Grands Bancs",
  "Offshore Florida (wintering)": "Au large de la Floride (hivernage)",
  "Tubbataha Reefs Natural Park, Philippines": "Parc naturel des récifs de Tubbataha, Philippines",
  "Tubbataha Reefs Natural Park": "Parc naturel des récifs de Tubbataha",
  "Sulu Sea": "Mer de Sulu",
  "Northern Palawan": "Nord de Palawan",
  "Bohol Sea": "Mer de Bohol",
  "Surigao Strait": "Détroit de Surigao",
  "Eastern Leyte": "Leyte oriental",
  "Eastern Mindanao (Pacific)": "Mindanao oriental (Pacifique)",
  "Sagami Bay, Japan": "Baie de Sagami, Japon",
  "Sagami Bay": "Baie de Sagami",
  "Tokyo Bay": "Baie de Tokyo",
  "Suruga Bay": "Baie de Suruga",
  "Offshore Izu Islands": "Au large des îles Izu",
  "Kuroshio Current edge": "Lisière du courant de Kuroshio",
  "Japanese upper continental slope": "Haut de pente continentale japonais",
  "Fuvahmulah, Maldives": "Fuvahmulah, Maldives",
  "Fuvahmulah": "Fuvahmulah",
  "Addu Atoll": "Atoll Addu",
  "Chagos Archipelago": "Archipel des Chagos",
  "Seychelles Bank": "Banc des Seychelles",
  "Saya de Malha": "Banc de Saya de Malha",
  "Open Indian Ocean (westward leg)": "Plein océan Indien (tronçon vers l'ouest)",
  "Delaware Bay, USA": "Baie du Delaware, États-Unis",
  "Delaware Bay": "Baie du Delaware",
  "New Jersey coast": "Côte du New Jersey",
  "Virginia Capes": "Caps de Virginie",
  "Cape Hatteras": "Cap Hatteras",
  "Cape Lookout": "Cap Lookout",
  "Offshore North Carolina shelf edge": "Bordure du plateau au large de la Caroline du Nord",
  "Darwin Island, Galápagos": "Île Darwin, Galápagos",
  "Darwin Island": "Île Darwin",
  "Wolf Island": "Île Wolf",
  "Isabela Island": "Île Isabela",
  "Fernandina Island": "Île Fernandina",
  "Galápagos platform edge": "Bordure de la plateforme des Galápagos",
  "Open water between islands": "Eaux libres entre les îles",
  "Gansbaai, South Africa": "Gansbaai, Afrique du Sud",
  "Gansbaai": "Gansbaai",
  "Dyer Island": "Île Dyer",
  "Seal Island (False Bay)": "Seal Island (baie False)",
  "Mossel Bay": "Baie de Mossel",
  "Cape Agulhas": "Cap des Aiguilles",
  "Open Indian Ocean (offshore leg)": "Plein océan Indien (tronçon au large)",
  "Bimini, Bahamas": "Bimini, Bahamas",
  "Bimini": "Bimini",
  "Andros Island": "Île Andros",
  "Eleuthera": "Eleuthera",
  "Exuma Sound": "Exuma Sound",
  "Tongue of the Ocean": "Tongue of the Ocean",
  "Cay Sal Bank": "Banc de Cay Sal",
  "Azores": "Açores",
  "Canary Islands": "Îles Canaries",
  "Madeira": "Madère",
  "West African coast (Senegal/Cape Verde)": "Côte ouest-africaine (Sénégal / Cap-Vert)",
  "Mid-Atlantic ridge": "Dorsale médio-atlantique",
  "Gulf Stream edge": "Lisière du Gulf Stream",
  "Cornwall, UK": "Cornouailles, Royaume-Uni",
  "Cornwall (Lizard/Land's End)": "Cornouailles (Lizard / Land's End)",
  "Isle of Man": "Île de Man",
  "Hebrides (Coll/Tiree)": "Hébrides (Coll / Tiree)",
  "Irish Sea": "Mer d'Irlande",
  "Celtic Sea": "Mer Celtique",
  "Donegal Bay": "Baie de Donegal",
  "Bay of Biscay / Iberian coast (winter leg)": "Golfe de Gascogne / côte ibérique (tronçon hivernal)",
  "Papua New Guinea reef flat (tag site)": "Platier récifal de Papouasie-Nouvelle-Guinée (site de marquage)",
  "Tag-site reef flat": "Platier récifal du site de marquage",
  "Adjacent coral-head pools": "Vasques adjacentes entre les patates de corail",
  "PNG reef crest": "Crête récifale de Papouasie-Nouvelle-Guinée",
  "Lagoon patch": "Parcelle de lagon",
  "North beach pools": "Vasques de la plage nord",
  "Reef-flat edge": "Bordure du platier récifal",
  "Caribbean mangrove lagoon (tag site)": "Lagon de mangrove caraïbe (site de marquage)",
  "Tag-site mangrove lagoon": "Lagon de mangrove du site de marquage",
  "Nursery shallows": "Hauts-fonds nourriceries",
  "Mangrove channel": "Chenal de mangrove",
  "Lagoon sand flat": "Platier sableux de lagon",
  "Nursery patch reefs": "Récifs isolés nourriceries",
  "Maldivian reef flat (tag site)": "Platier récifal maldivien (site de marquage)",
  "Maldives tag-site reef flat": "Platier récifal du site de marquage des Maldives",
  "Tag-site reef crest": "Crête récifale du site de marquage",
  "Tag-site lagoon": "Lagon du site de marquage",
  "Tag-site channel": "Chenal du site de marquage",
  "Reef-flat coral heads": "Patates de corail du platier",
  "Philippine reef cave (tag site)": "Grotte récifale philippine (site de marquage)",
  "Tag-site reef cave": "Grotte récifale du site de marquage",
  "Tag-site cave ledge": "Rebord de grotte du site de marquage",
  "Tag-site reef crevice": "Fissure récifale du site de marquage",
  "Night-hunt reef": "Récif de chasse nocturne",
  "Shelter ledge": "Rebord abrité",
  "Open Atlantic (tag site)": "Plein Atlantique (site de marquage)",
  "Tag-site open water": "Eaux libres du site de marquage",
  "Gulf Stream meander": "Méandre du Gulf Stream",
  "Mid-Atlantic Ridge approaches": "Approches de la dorsale médio-atlantique",
  "Azores Current": "Courant des Açores",
  "Canary Current edge": "Lisière du courant des Canaries",
  "Cornwall, UK (tag site)": "Cornouailles, Royaume-Uni (site de marquage)",
  "Tag-site Cornish waters": "Eaux cornouaillaises du site de marquage",
  "Bay of Biscay": "Golfe de Gascogne",
  "Mid-Atlantic Ridge": "Dorsale médio-atlantique",
  "Iberian coast": "Côte ibérique",
  "Tuna school grounds": "Zones de bancs de thons",
  "FAD drift line": "Ligne de dérive des DCP",
  "Shelf-edge front": "Front de bordure de plateau",
  "Seamount approaches": "Approches de monts sous-marins",
  "Seamount": "Mont sous-marin",
  "Oceanic island approaches": "Approches des îles océaniques",
  "Equatorial front": "Front équatorial",
  "South African bay (tag site)": "Baie sud-africaine (site de marquage)",
  "Tag-site kelp forest": "Forêt de varech du site de marquage",
  "Bay channel": "Chenal de baie",
  "Estuary mouth": "Embouchure d'estuaire",
  "Offshore reef": "Récif du large",
  "Seal colony approaches": "Approches de la colonie de phoques",
  "South African coast (tag site)": "Côte sud-africaine (site de marquage)",
  "Tag-site coastal bay": "Baie côtière du site de marquage",
  "Nursery bay": "Baie nourricerie",
  "Wild Coast offshore reef": "Récif au large de la Wild Coast",
  "Sardine run grounds": "Zones du Sardine Run",
  "Mozambique coast approaches": "Approches de la côte du Mozambique",
  "Sagami Bay deep slope (tag site)": "Pente profonde de la baie de Sagami (site de marquage)",
  "Tag-site deep slope": "Pente profonde du site de marquage",
  "Canyon wall": "Paroi de canyon",
  "Seamount flank": "Flanc de mont sous-marin",
  "Trench approaches": "Approches de fosses",
  "Philippine reef (tag site)": "Récif philippin (site de marquage)",
  "Philippine tag-site reef": "Récif philippin du site de marquage",
  "Coral garden": "Jardin de corail",
  "Sand flat": "Platier sableux",
  "Lagoon patch reef": "Récif isolé de lagon",
  "Reef channel": "Chenal récifal",
  "Galápagos seamount (tag site)": "Mont sous-marin des Galápagos (site de marquage)",
  "Tag-site seamount": "Mont sous-marin du site de marquage",
  "Neighboring seamount": "Mont sous-marin voisin",
  "Open-water corridor": "Couloir d'eau libre",
  "Island shelf edge": "Bordure du plateau insulaire",
  "Offshore front": "Front du large",
  "Celtic Sea (tag site)": "Mer Celtique (site de marquage)",
  "Tag-site shelf": "Plateau du site de marquage",
  "Shelf break": "Rebord du plateau",
  "Open Atlantic water": "Eaux libres de l'Atlantique",
  "Frontal zone": "Zone frontale",
  "Coastal bay": "Baie côtière",
  "Caribbean seagrass bed (tag site)": "Herbier caraïbe (site de marquage)",
  "Tag-site seagrass": "Herbier du site de marquage",
  "Adjacent sand flat": "Platier sableux adjacent",
  "Mangrove fringe": "Lisière de mangrove",
  "Shallow lagoon": "Lagon peu profond",
  "Patch reef": "Récif isolé",
  "Caribbean coast (tag site)": "Côte caraïbe (site de marquage)",
  "Tag-site estuary mouth": "Embouchure d'estuaire du site de marquage",
  "Caribbean coastal shelf": "Plateau côtier caraïbe",
  "River channel": "Chenal fluvial",
  "Nearshore reef": "Récif côtier",
  "Bay system": "Système de baies",
  "PNG reef pass (tag site)": "Passe récifale de Papouasie-Nouvelle-Guinée (site de marquage)",
  "Tag-site reef pass": "Passe récifale du site de marquage",
  "Drop-off wall": "Paroi du tombant",
  "Channel": "Chenal",
  "Outer reef slope": "Pente récifale externe",
  "Lagoon pinnacle": "Pinacle de lagon",
  "Bahamas reef (tag site)": "Récif des Bahamas (site de marquage)",
  "Bahamas tag-site reef": "Récif du site de marquage des Bahamas",
  "Reef flat": "Platier récifal",
  "Sand channel": "Chenal sableux",
  "Coral head field": "Champ de patates de corail",
  "Drop-off edge": "Bordure du tombant",
  "Outer Banks shelf (tag site)": "Plateau des Outer Banks (site de marquage)",
  "Tag-site sandbank": "Banc de sable du site de marquage",
  "Outer Banks coastal shelf": "Plateau côtier des Outer Banks",
  "Bay mouth": "Embouchure de baie",
  "Migration corridor": "Couloir de migration",
  "Wintering ground": "Zone d'hivernage",
  "Kuril Islands (tag site)": "Îles Kouriles (site de marquage)",
  "Tag-site waters": "Eaux du site de marquage",
  "Sea of Okhotsk": "Mer d'Okhotsk",
  "Gulf of Alaska": "Golfe d'Alaska",
  "Prince William Sound": "Baie du Prince-William",
  "Offshore Japan (wintering)": "Au large du Japon (hivernage)",
  "Oregon/California coast": "Côte de l'Oregon / de la Californie",
  "KwaZulu-Natal coast (tag site)": "Côte du KwaZulu-Natal (site de marquage)",
  "Tag-site coast": "Côte du site de marquage",
  "Sardine Run corridor": "Couloir du Sardine Run",
  "Mozambique coast": "Côte du Mozambique",
  "Cape waters": "Eaux du cap",
  "Offshore Agulhas": "Au large du cap des Aiguilles",
  "Nursery bays": "Baies nourriceries",
  "Outer reef slope off South Malé Atoll": "Pente récifale externe au large de l'atoll Malé Sud",
  "South Malé Atoll": "Atoll Malé Sud",
  "South Malé outer slope": "Pente externe de l'atoll Malé Sud",
  "South Malé channel": "Chenal de l'atoll Malé Sud",
  "Malé Atoll south": "Sud de l'atoll de Malé",
  "South Malé drop-off": "Tombant de l'atoll Malé Sud",
  "Edge of the Great Bahama Bank": "Bord du Grand Banc des Bahamas",
  "Caribbean Sea": "Mer des Caraïbes",
  "Caribbean reef edge": "Bordure récifale caraïbe",
  "Caribbean channel": "Chenal caraïbe",
  "Caribbean Sea north": "Nord de la mer des Caraïbes",
  "Caribbean bank": "Banc caraïbe",
  "Rocky reef ledge off Byron Bay": "Rebord rocheux d'un récif au large de la baie de Byron",
  "Byron Bay": "Baie de Byron",
  "Julian Rocks": "Julian Rocks",
  "Wategos reef": "Récif de Wategos",
  "Byron Bay north wall": "Paroi nord de la baie de Byron",
  "Byron Bay south ledge": "Rebord sud de la baie de Byron",
  "Eelgrass bed in Tomales Bay": "Herbier de zostères dans la baie de Tomales",
  "Monterey Bay": "Baie de Monterey",
  "Monterey Canyon edge": "Bordure du canyon de Monterey",
  "Elkhorn Slough mouth": "Embouchure de l'Elkhorn Slough",
  "Monterey Bay south": "Sud de la baie de Monterey",
  "Cannery Row reef": "Récif de Cannery Row",
  "Kelp forest off Santa Catalina Island": "Forêt de varech au large de l'île Santa Catalina",
  "Santa Catalina Island": "Île Santa Catalina",
  "Catalina west end": "Extrémité ouest de Catalina",
  "Catalina isthmus": "Isthme de Catalina",
  "Catalina east end": "Extrémité est de Catalina",
  "Catalina back side": "Versant arrière de Catalina",
  "Rocky reef off Sydney": "Récif rocheux au large de Sydney",
  "Sydney": "Sydney",
  "Sydney north": "Nord de Sydney",
  "Sydney south": "Sud de Sydney",
  "Sydney offshore": "Au large de Sydney",
  "Sydney harbor mouth": "Embouchure du port de Sydney",
  "Buried in sandy reef shallows off Cornwall": "Enfoui dans les hauts-fonds sableux d'un récif au large des Cornouailles",
  "Mount's Bay": "Mount's Bay",
  "Mount's Bay east": "Mount's Bay est",
  "Penzance Bay": "Baie de Penzance",
  "Lizard Point reefs": "Récifs de la pointe Lizard",
  "Mount's Bay west": "Mount's Bay ouest",
  "Tagged at the surface at night off the Izu Peninsula": "Marqué en surface de nuit au large de la péninsule d'Izu",
  "Izu Peninsula": "Péninsule d'Izu",
  "Izu Peninsula south": "Sud de la péninsule d'Izu",
  "Sagami Bay offshore": "Au large de la baie de Sagami",
  "Izu Peninsula east": "Est de la péninsule d'Izu",
  "Tagged over soft sediment off Tasmania": "Marqué au-dessus de sédiments meubles au large de la Tasmanie",
  "Tasman Sea shelf": "Plateau de la mer de Tasman",
  "Tasman shelf north": "Nord du plateau de Tasman",
  "Tasman shelf south": "Sud du plateau de Tasman",
  "NSW shelf edge": "Bordure du plateau de Nouvelle-Galles du Sud",
  "Tasman Sea shelf east": "Est du plateau de la mer de Tasman",
  "Tagged in deep Baffin Bay water": "Marqué dans les eaux profondes de la baie de Baffin",
  "Baffin Bay": "Baie de Baffin",
  "Davis Strait": "Détroit de Davis",
  "Greenland shelf": "Plateau groenlandais",
  "Baffin Bay deep basin": "Bassin profond de la baie de Baffin",
  "Davis Strait slope": "Pente du détroit de Davis",
  "Tagged at night in Sargasso Sea twilight waters": "Marqué de nuit dans les eaux crépusculaires de la mer des Sargasses",
  "Sargasso Sea": "Mer des Sargasses",
  "Sargasso Sea west": "Ouest de la mer des Sargasses",
  "Sargasso Sea east": "Est de la mer des Sargasses",
  "Sargasso Sea south": "Sud de la mer des Sargasses",
  "Sargasso Sea north": "Nord de la mer des Sargasses",
  "Tagged in deep water off the Porcupine slope": "Marqué en eau profonde au large de la pente de Porcupine",
  "Porcupine Seabight": "Porcupine Seabight",
  "Porcupine Bank": "Banc de Porcupine",
  "Rockall Trough": "Fosse de Rockall",
  "Porcupine slope": "Pente de Porcupine",
  "Western Approaches deep": "Zone profonde des atterrages occidentaux",
  "Celtic Sea shelf break, Cornwall": "Rebord du plateau de la mer Celtique, Cornouailles",
  "Porcupine Seabight east": "Porcupine Seabight est",
  "Porcupine Bank edge": "Bordure du banc de Porcupine",
  "Porcupine Seabight west": "Porcupine Seabight ouest",
  "Upper continental slope, Caribbean Sea off Colombia": "Haut de pente continentale, mer des Caraïbes au large de la Colombie",
  "Upper slope off Colombia": "Haut de pente au large de la Colombie",
  "Colombian slope north": "Pente colombienne nord",
  "Colombian slope south": "Pente colombienne sud",
  "Colombian canyon": "Canyon colombien",
  "Upper slope off Colombia east": "Est du haut de pente au large de la Colombie",
  "Continental slope, Porcupine Seabight": "Pente continentale, Porcupine Seabight",
  "Tagged in Sagami Bay deep water": "Marqué dans les eaux profondes de la baie de Sagami",
  "Sagami Bay deep": "Baie de Sagami profonde",
  "Izu Peninsula slope": "Pente de la péninsule d'Izu",
  "Pacific coast of Hokkaido": "Côte pacifique d'Hokkaido",
  "Kuril Islands slope": "Pente des îles Kouriles",
  "Oyashio current region": "Région du courant d'Oyashio",
  "Coastal waters off Cornwall": "Eaux côtières au large des Cornouailles",
  "English Channel central": "Manche centrale",
  "English Channel east": "Manche est",
  "English Channel west": "Manche ouest",
  "English Channel central north": "Manche centrale nord",
  "English Channel central south": "Manche centrale sud",
  "Reef off Cornwall": "Récif au large des Cornouailles",
  "Lizard Point west": "Ouest de la pointe Lizard",
  "South Ari Atoll": "Atoll Ari Sud",
  "Maamigili": "Maamigili",
  "Dhigurah": "Dhigurah",
  "Ari Atoll outer reef": "Récif externe de l'atoll d'Ari",
  "Rasdhoo Atoll": "Atoll de Rasdhoo",
  "Baa Atoll (Hanifaru)": "Atoll de Baa (Hanifaru)",
  "South Ari Atoll, Maldives": "Atoll Ari Sud, Maldives",
  "Cagayan de Oro": "Cagayan de Oro",
  "Visayan Sea": "Mer des Visayas",
  "Luzon east coast (Aurora)": "Côte est de Luçon (Aurora)",
  "Philippine Sea edge": "Bord de la mer des Philippines",
  "Surigao Strait north": "Nord du détroit de Surigao",
  "Cagayan de Oro, Mindanao": "Cagayan de Oro, Mindanao",
  "Scilly Isles waters": "Eaux des îles Scilly",
  "Western Approaches": "Atterrages occidentaux",
  "Celtic Deep": "Celtic Deep",
  "Southwest Approaches": "Southwest Approaches",
  "Mount's Bay, Cornwall": "Mount's Bay, Cornouailles",
  "Outer Banks shelf": "Plateau des Outer Banks",
  "Chesapeake Bay mouth": "Embouchure de la baie de Chesapeake",
  "Mid-Atlantic Bight": "Mid-Atlantic Bight",
  "Cape Hatteras, North Carolina": "Cap Hatteras, Caroline du Nord"
};
