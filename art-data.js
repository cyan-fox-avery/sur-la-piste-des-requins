/* art-data.js — derpy shark art module (split from script.js in v0.11.0).
   Loaded BEFORE script.js; ART is global and read at render time. */

const ART = {
  thresher: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-renard">
    <polygon points="150,50 210,6 172,56" fill="#5d7f9e"/>
    <polygon points="152,62 176,92 160,62" fill="#5d7f9e"/>
    <ellipse cx="96" cy="56" rx="60" ry="17" fill="#6f93b8"/>
    <ellipse cx="96" cy="63" rx="52" ry="10" fill="#dfe9f2" opacity="0.85"/>
    <polygon points="38,56 56,47 56,65" fill="#6f93b8"/>
    <polygon points="96,40 108,20 118,40" fill="#5d7f9e"/>
    <polygon points="82,70 70,90 94,71" fill="#5d7f9e"/>
    <circle cx="54" cy="52" r="3.6" fill="#1c2733"/>
    <circle cx="55.2" cy="50.8" r="1.1" fill="#ffffff"/>
    <g stroke="#4a6a86" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="48" x2="70" y2="62"/>
      <line x1="78" y1="47" x2="76" y2="63"/>
      <line x1="84" y1="47" x2="82" y2="63"/>
    </g>
  </svg>`,
  whale: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-baleine">
    <polygon points="168,48 208,22 206,88" fill="#54687a"/>
    <ellipse cx="100" cy="55" rx="72" ry="25" fill="#5f7484"/>
    <ellipse cx="100" cy="66" rx="62" ry="14" fill="#cfd9e2" opacity="0.7"/>
    <polygon points="104,31 118,12 128,31" fill="#54687a"/>
    <polygon points="84,76 70,100 102,78" fill="#54687a"/>
    <circle cx="44" cy="50" r="3.2" fill="#1c2733"/>
    <path d="M28,62 Q40,70 54,68" stroke="#3c4c5c" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <g fill="#ffffff" opacity="0.9">
      <circle cx="80" cy="44" r="2.6"/><circle cx="98" cy="40" r="2.6"/><circle cx="116" cy="43" r="2.6"/>
      <circle cx="134" cy="47" r="2.6"/><circle cx="70" cy="54" r="2.4"/><circle cx="90" cy="54" r="2.4"/>
      <circle cx="110" cy="56" r="2.4"/><circle cx="130" cy="58" r="2.4"/><circle cx="148" cy="56" r="2.2"/>
      <circle cx="82" cy="64" r="2.2"/><circle cx="104" cy="66" r="2.2"/><circle cx="126" cy="66" r="2.2"/>
    </g>
  </svg>`,
  nurse: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-nourrice">
    <polygon points="160,54 200,36 198,84" fill="#7a6242"/>
    <ellipse cx="100" cy="60" rx="64" ry="19" fill="#8a6f4d"/>
    <ellipse cx="100" cy="68" rx="56" ry="11" fill="#d8c6a6" opacity="0.8"/>
    <polygon points="112,42 122,26 130,42" fill="#7a6242"/>
    <polygon points="142,43 150,30 156,43" fill="#7a6242"/>
    <polygon points="88,76 78,96 100,77" fill="#7a6242"/>
    <circle cx="52" cy="55" r="3.2" fill="#1c2733"/>
    <g stroke="#5e4a30" stroke-width="2" stroke-linecap="round">
      <line x1="40" y1="64" x2="33" y2="71"/>
      <line x1="40" y1="67" x2="33" y2="74"/>
    </g>
    <g stroke="#6e5739" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="52" x2="70" y2="66"/>
      <line x1="78" y1="51" x2="76" y2="67"/>
    </g>
  </svg>`,
  goblin: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-lutin">
    <polygon points="158,50 198,28 196,82" fill="#c08484"/>
    <ellipse cx="106" cy="55" rx="56" ry="15" fill="#d99a9a"/>
    <ellipse cx="106" cy="61" rx="48" ry="9" fill="#f2d9d9" opacity="0.8"/>
    <polygon points="52,55 10,46 10,62" fill="#d99a9a"/>
    <polygon points="106,41 116,28 122,41" fill="#c08484"/>
    <polygon points="92,68 82,86 102,69" fill="#c08484"/>
    <circle cx="48" cy="50" r="3.2" fill="#1c2733"/>
    <path d="M30,60 Q44,66 56,64" stroke="#a86a6a" stroke-width="2" fill="none" stroke-linecap="round"/>
    <g stroke="#a86a6a" stroke-width="1.4" stroke-linecap="round">
      <line x1="76" y1="48" x2="74" y2="60"/>
      <line x1="82" y1="47" x2="80" y2="61"/>
    </g>
  </svg>`,
  tiger: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-tigre">
    <polygon points="160,54 200,32 198,86" fill="#5a6a72"/>
    <ellipse cx="100" cy="58" rx="64" ry="20" fill="#6b7d85"/>
    <ellipse cx="100" cy="66" rx="56" ry="11" fill="#d3dce0" opacity="0.8"/>
    <polygon points="108,39 120,22 128,39" fill="#5a6a72"/>
    <polygon points="86,74 76,94 98,75" fill="#5a6a72"/>
    <circle cx="50" cy="53" r="3.2" fill="#1c2733"/>
    <circle cx="51.2" cy="51.8" r="1.1" fill="#ffffff"/>
    <g stroke="#4c5b63" stroke-width="3.4" opacity="0.5" stroke-linecap="round">
      <line x1="92" y1="42" x2="90" y2="72"/>
      <line x1="106" y1="40" x2="104" y2="74"/>
      <line x1="120" y1="42" x2="118" y2="72"/>
      <line x1="134" y1="46" x2="132" y2="68"/>
    </g>
  </svg>`,
  sandtiger: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-taureau">
    <polygon points="162,52 202,30 200,84" fill="#6e6250"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#7d6f5b"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#ddd2bd" opacity="0.8"/>
    <polygon points="110,41 120,24 128,41" fill="#6e6250"/>
    <polygon points="138,42 146,28 152,42" fill="#6e6250"/>
    <polygon points="88,72 78,92 100,73" fill="#6e6250"/>
    <polygon points="42,58 22,52 22,64" fill="#7d6f5b"/>
    <g stroke="#ece5d3" stroke-width="1.6" stroke-linecap="round">
      <line x1="29" y1="55" x2="25" y2="60"/>
      <line x1="33" y1="57" x2="29" y2="62"/>
    </g>
    <circle cx="52" cy="52" r="3.2" fill="#1c2733"/>
    <circle cx="53.2" cy="50.8" r="1.1" fill="#ffffff"/>
  </svg>`,
  galapagos: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin des Galápagos">
    <polygon points="158,54 200,34 198,84" fill="#5f6b66"/>
    <ellipse cx="100" cy="58" rx="64" ry="19" fill="#6e7b75"/>
    <ellipse cx="100" cy="66" rx="56" ry="11" fill="#d5dcd6" opacity="0.8"/>
    <polygon points="106,40 118,22 128,40" fill="#5f6b66"/>
    <polygon points="86,74 76,94 98,75" fill="#5f6b66"/>
    <polygon points="40,58 22,52 22,64" fill="#6e7b75"/>
    <circle cx="48" cy="53" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="51.8" r="1.1" fill="#ffffff"/>
  </svg>`,
  greatwhite: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Grand requin blanc">
    <polygon points="160,54 204,30 200,88" fill="#5a6470"/>
    <ellipse cx="102" cy="56" rx="66" ry="20" fill="#6b7683"/>
    <ellipse cx="102" cy="65" rx="58" ry="12" fill="#eef1f3" opacity="0.9"/>
    <polygon points="110,37 124,16 132,37" fill="#5a6470"/>
    <polygon points="88,72 76,94 100,73" fill="#5a6470"/>
    <polygon points="40,56 22,50 22,62" fill="#6b7683"/>
    <circle cx="52" cy="51" r="3.4" fill="#14181d"/>
  </svg>`,
  hammerhead: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Grand requin-marteau">
    <polygon points="160,54 200,32 198,86" fill="#5e6a70"/>
    <ellipse cx="112" cy="58" rx="58" ry="18" fill="#6d7a81"/>
    <ellipse cx="112" cy="66" rx="50" ry="10" fill="#d8dee1" opacity="0.8"/>
    <rect x="18" y="48" width="56" height="16" rx="8" fill="#6d7a81"/>
    <circle cx="27" cy="56" r="2.6" fill="#1c2733"/>
    <circle cx="65" cy="56" r="2.6" fill="#1c2733"/>
    <polygon points="118,41 130,24 138,41" fill="#5e6a70"/>
    <polygon points="96,72 86,92 108,73" fill="#5e6a70"/>
  </svg>`,
  mako: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-taupe bleu">
    <polygon points="162,54 206,34 202,84" fill="#3f5a7a"/>
    <ellipse cx="104" cy="56" rx="64" ry="16" fill="#4a6a8c"/>
    <ellipse cx="104" cy="63" rx="56" ry="9" fill="#dbe4ee" opacity="0.85"/>
    <polygon points="110,41 122,24 130,41" fill="#3f5a7a"/>
    <polygon points="90,70 80,90 102,71" fill="#3f5a7a"/>
    <polygon points="42,56 24,50 24,62" fill="#4a6a8c"/>
    <circle cx="54" cy="51" r="3.2" fill="#14181d"/>
    <circle cx="55.2" cy="49.8" r="1.1" fill="#ffffff"/>
  </svg>`,
  basking: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-pèlerin">
    <polygon points="170,54 206,36 204,84" fill="#5c5a52"/>
    <ellipse cx="104" cy="57" rx="70" ry="22" fill="#6b695f"/>
    <ellipse cx="104" cy="66" rx="60" ry="12" fill="#d9d5c8" opacity="0.7"/>
    <polygon points="112,36 124,18 132,36" fill="#5c5a52"/>
    <circle cx="56" cy="52" r="2.6" fill="#1c2733"/>
    <g stroke="#4a4840" stroke-width="2" stroke-linecap="round">
      <line x1="76" y1="44" x2="74" y2="68"/>
      <line x1="86" y1="43" x2="84" y2="69"/>
      <line x1="96" y1="43" x2="94" y2="69"/>
    </g>
  </svg>`,
  epaulette: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-épaulette">
    <polygon points="168,56 200,42 198,76" fill="#7a6a4e"/>
    <ellipse cx="108" cy="60" rx="58" ry="13" fill="#8a795c"/>
    <ellipse cx="108" cy="65" rx="50" ry="8" fill="#ded3b8" opacity="0.8"/>
    <polygon points="118,48 126,36 132,48" fill="#7a6a4e"/>
    <circle cx="62" cy="56" r="2.8" fill="#1c2733"/>
    <g fill="#4e4130" opacity="0.8">
      <circle cx="90" cy="56" r="3"/><circle cx="110" cy="58" r="3"/><circle cx="130" cy="57" r="3"/>
      <circle cx="150" cy="58" r="2.5"/>
    </g>
    <circle cx="140" cy="52" r="4" fill="none" stroke="#4e4130" stroke-width="2"/>
  </svg>`,
  lemon: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-citron">
    <polygon points="160,54 200,36 198,84" fill="#a08c3c"/>
    <ellipse cx="100" cy="60" rx="64" ry="19" fill="#c9b458"/>
    <ellipse cx="100" cy="68" rx="56" ry="11" fill="#e8d998" opacity="0.8"/>
    <polygon points="102,42 112,24 122,42" fill="#a08c3c"/>
    <polygon points="136,43 144,28 150,43" fill="#a08c3c"/>
    <polygon points="88,76 78,96 100,77" fill="#a08c3c"/>
    <circle cx="52" cy="55" r="3.2" fill="#1c2733"/>
    <circle cx="53.2" cy="53.8" r="1.1" fill="#ffffff"/>
    <g stroke="#8a7434" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="52" x2="70" y2="66"/>
      <line x1="78" y1="51" x2="76" y2="67"/>
      <line x1="84" y1="51" x2="82" y2="67"/>
    </g>
  </svg>`,
  blacktip: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin à pointes noires">
    <polygon points="160,54 200,36 198,84" fill="#6e757e"/>
    <polygon points="190,41 200,36 199,54" fill="#1c2733"/>
    <ellipse cx="100" cy="60" rx="64" ry="19" fill="#8a9199"/>
    <ellipse cx="100" cy="68" rx="56" ry="11" fill="#dfe3e6" opacity="0.8"/>
    <polygon points="104,42 114,24 124,42" fill="#6e757e"/>
    <polygon points="107,31 114,24 120,31" fill="#1c2733"/>
    <polygon points="88,76 78,96 100,77" fill="#6e757e"/>
    <polygon points="79,90 78,96 89,90" fill="#1c2733"/>
    <circle cx="52" cy="55" r="3.2" fill="#1c2733"/>
    <circle cx="53.2" cy="53.8" r="1.1" fill="#ffffff"/>
    <g stroke="#5a6167" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="52" x2="70" y2="66"/>
      <line x1="78" y1="51" x2="76" y2="67"/>
      <line x1="84" y1="51" x2="82" y2="67"/>
    </g>
  </svg>`,
  whitetip: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin corail">
    <polygon points="160,54 200,36 198,84" fill="#9aa0a3"/>
    <polygon points="190,41 200,36 199,54" fill="#f4f6f7"/>
    <ellipse cx="100" cy="60" rx="64" ry="19" fill="#b4b9bc"/>
    <ellipse cx="100" cy="68" rx="56" ry="11" fill="#eef0f1" opacity="0.8"/>
    <polygon points="104,42 114,24 124,42" fill="#9aa0a3"/>
    <polygon points="107,31 114,24 120,31" fill="#f4f6f7"/>
    <polygon points="88,76 78,96 100,77" fill="#9aa0a3"/>
    <polygon points="79,90 78,96 89,90" fill="#f4f6f7"/>
    <circle cx="52" cy="55" r="3.2" fill="#1c2733"/>
    <circle cx="53.2" cy="53.8" r="1.1" fill="#ffffff"/>
    <g stroke="#7d8387" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="52" x2="70" y2="66"/>
      <line x1="78" y1="51" x2="76" y2="67"/>
      <line x1="84" y1="51" x2="82" y2="67"/>
    </g>
  </svg>`,
  blue: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin bleu">
    <polygon points="162,52 202,34 200,82" fill="#2c537e"/>
    <ellipse cx="98" cy="58" rx="66" ry="17" fill="#3b6ea5"/>
    <ellipse cx="98" cy="66" rx="58" ry="10" fill="#eef3f8" opacity="0.9"/>
    <polygon points="52,58 66,52 64,64" fill="#3b6ea5"/>
    <polygon points="100,42 110,24 120,42" fill="#2c537e"/>
    <polygon points="86,72 30,96 88,73" fill="#2c537e"/>
    <circle cx="46" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="47.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <g stroke="#274a70" stroke-width="1.6" stroke-linecap="round">
      <line x1="68" y1="50" x2="66" y2="64"/>
      <line x1="74" y1="49" x2="72" y2="65"/>
      <line x1="80" y1="49" x2="78" y2="65"/>
    </g>
  </svg>`,
  porbeagle: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-taupe commun">
    <polygon points="158,54 186,30 190,60 186,90 158,66" fill="#4a5f73"/>
    <ellipse cx="100" cy="60" rx="60" ry="21" fill="#5d7488"/>
    <ellipse cx="100" cy="69" rx="52" ry="12" fill="#dfe5ea" opacity="0.85"/>
    <polygon points="104,40 114,20 124,40" fill="#4a5f73"/>
    <polygon points="114,26 119,20 122,28" fill="#f2f5f7"/>
    <polygon points="90,78 80,98 102,79" fill="#4a5f73"/>
    <polygon points="52,60 64,54 64,66" fill="#5d7488"/>
    <circle cx="54" cy="56" r="3.4" fill="#1c2733"/>
    <circle cx="55.2" cy="54.8" r="1.1" fill="#ffffff"/>
    <g stroke="#3d4f61" stroke-width="1.8" stroke-linecap="round">
      <line x1="72" y1="52" x2="70" y2="68"/>
      <line x1="79" y1="51" x2="77" y2="69"/>
      <line x1="86" y1="51" x2="84" y2="69"/>
    </g>
  </svg>`,
  silky: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin soyeux">
    <polygon points="164,54 204,36 202,84" fill="#6e5f43"/>
    <ellipse cx="100" cy="60" rx="68" ry="16" fill="#8a7a5e"/>
    <ellipse cx="100" cy="67" rx="60" ry="9" fill="#e6ddc8" opacity="0.8"/>
    <polygon points="40,60 58,53 58,67" fill="#8a7a5e"/>
    <polygon points="102,45 112,27 122,45" fill="#6e5f43"/>
    <polygon points="138,46 143,34 148,46" fill="#6e5f43"/>
    <polygon points="88,74 80,94 100,75" fill="#6e5f43"/>
    <circle cx="44" cy="56" r="3" fill="#1c2733"/>
    <circle cx="45.2" cy="54.8" r="1" fill="#ffffff"/>
    <g stroke="#5c4f36" stroke-width="1.5" stroke-linecap="round">
      <line x1="64" y1="52" x2="62" y2="66"/>
      <line x1="70" y1="51" x2="68" y2="67"/>
      <line x1="76" y1="51" x2="74" y2="67"/>
    </g>
  </svg>`,
  oceanic: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin océanique">
    <polygon points="160,54 200,36 198,84" fill="#66583f"/>
    <ellipse cx="100" cy="60" rx="62" ry="20" fill="#7d6f5c"/>
    <ellipse cx="100" cy="68" rx="54" ry="11" fill="#e3dccb" opacity="0.8"/>
    <polygon points="104,41 116,18 128,41" fill="#66583f"/>
    <polygon points="112,24 116,18 121,25" fill="#f4f1e8"/>
    <polygon points="88,76 40,100 90,77" fill="#66583f"/>
    <polygon points="46,94 40,100 54,95" fill="#f4f1e8"/>
    <polygon points="50,60 62,54 62,66" fill="#7d6f5c"/>
    <circle cx="52" cy="56" r="3.2" fill="#1c2733"/>
    <circle cx="53.2" cy="54.8" r="1.1" fill="#ffffff"/>
    <g stroke="#544832" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="52" x2="70" y2="66"/>
      <line x1="78" y1="51" x2="76" y2="67"/>
      <line x1="84" y1="51" x2="82" y2="67"/>
    </g>
  </svg>`,
  sevengill: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin à sept branchies">
    <polygon points="170,56 206,40 204,84" fill="#5a5148"/>
    <ellipse cx="104" cy="62" rx="62" ry="19" fill="#6e655a"/>
    <ellipse cx="104" cy="70" rx="54" ry="10" fill="#d8d2c4" opacity="0.75"/>
    <polygon points="140,44 148,30 154,44" fill="#5a5148"/>
    <polygon points="86,78 76,98 98,79" fill="#5a5148"/>
    <ellipse cx="52" cy="60" rx="16" ry="13" fill="#6e655a"/>
    <circle cx="48" cy="57" r="3" fill="#1c2733"/>
    <circle cx="49.2" cy="55.8" r="1" fill="#ffffff"/>
    <g stroke="#463f35" stroke-width="1.5" stroke-linecap="round">
      <line x1="66" y1="50" x2="64" y2="68"/>
      <line x1="71" y1="50" x2="69" y2="68"/>
      <line x1="76" y1="50" x2="74" y2="68"/>
      <line x1="81" y1="50" x2="79" y2="68"/>
      <line x1="86" y1="50" x2="84" y2="68"/>
      <line x1="91" y1="50" x2="89" y2="68"/>
      <line x1="96" y1="50" x2="94" y2="68"/>
    </g>
    <g fill="#4a4238" opacity="0.8">
      <circle cx="110" cy="56" r="2"/><circle cx="124" cy="60" r="2"/><circle cx="96" cy="58" r="2"/>
      <circle cx="136" cy="58" r="1.8"/><circle cx="84" cy="60" r="1.8"/>
    </g>
  </svg>`,
  bronze: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin cuivré">
    <polygon points="162,54 202,36 200,84" fill="#8a6535"/>
    <ellipse cx="100" cy="60" rx="64" ry="18" fill="#a67c3f"/>
    <ellipse cx="100" cy="68" rx="56" ry="10" fill="#ecd9ac" opacity="0.85"/>
    <polygon points="102,42 114,20 126,42" fill="#8a6535"/>
    <polygon points="88,76 78,96 100,77" fill="#8a6535"/>
    <polygon points="50,60 62,54 62,66" fill="#a67c3f"/>
    <circle cx="52" cy="56" r="3.2" fill="#1c2733"/>
    <circle cx="53.2" cy="54.8" r="1.1" fill="#ffffff"/>
    <g stroke="#6e4f28" stroke-width="1.6" stroke-linecap="round">
      <line x1="72" y1="52" x2="70" y2="66"/>
      <line x1="78" y1="51" x2="76" y2="67"/>
      <line x1="84" y1="51" x2="82" y2="67"/>
    </g>
  </svg>`,
  frilled: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-lézard">
    <polygon points="170,58 204,46 202,80" fill="#4a3f35"/>
    <ellipse cx="102" cy="62" rx="70" ry="14" fill="#5c4f41"/>
    <ellipse cx="102" cy="68" rx="62" ry="8" fill="#c9bfae" opacity="0.7"/>
    <ellipse cx="42" cy="60" rx="14" ry="10" fill="#5c4f41"/>
    <polygon points="104,49 112,34 120,49" fill="#4a3f35"/>
    <polygon points="88,72 80,92 98,73" fill="#4a3f35"/>
    <circle cx="38" cy="58" r="2.8" fill="#1c2733"/>
    <g stroke="#6e5f4d" stroke-width="2" stroke-linecap="round" fill="none">
      <path d="M56,52 q3,4 0,8 q-3,4 0,8"/>
      <path d="M62,52 q3,4 0,8 q-3,4 0,8"/>
      <path d="M68,52 q3,4 0,8 q-3,4 0,8"/>
      <path d="M74,52 q3,4 0,8 q-3,4 0,8"/>
      <path d="M80,52 q3,4 0,8 q-3,4 0,8"/>
      <path d="M86,52 q3,4 0,8 q-3,4 0,8"/>
    </g>
  </svg>`,
  zebra: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-zèbre">
    <polygon points="162,56 200,40 198,84" fill="#8a6f3d"/>
    <ellipse cx="100" cy="62" rx="64" ry="18" fill="#a5854a"/>
    <ellipse cx="100" cy="70" rx="56" ry="10" fill="#e8d9a8" opacity="0.8"/>
    <polygon points="102,45 112,27 122,45" fill="#8a6f3d"/>
    <polygon points="88,76 78,96 100,77" fill="#8a6f3d"/>
    <polygon points="50,62 62,56 62,68" fill="#a5854a"/>
    <path d="M36,66 q4,3 8,0" stroke="#6e5630" stroke-width="2" fill="none" stroke-linecap="round"/>
    <circle cx="52" cy="58" r="3.2" fill="#1c2733"/>
    <circle cx="53.2" cy="56.8" r="1.1" fill="#ffffff"/>
    <g fill="#6e5630" opacity="0.85">
      <circle cx="80" cy="56" r="2.6"/><circle cx="96" cy="60" r="2.6"/><circle cx="112" cy="57" r="2.6"/>
      <circle cx="128" cy="60" r="2.4"/><circle cx="88" cy="66" r="2.4"/><circle cx="104" cy="68" r="2.4"/>
      <circle cx="120" cy="67" r="2.2"/><circle cx="72" cy="62" r="2.2"/><circle cx="136" cy="64" r="2"/>
    </g>
    <g stroke="#6e5630" stroke-width="1.5" stroke-linecap="round">
      <line x1="70" y1="54" x2="68" y2="68"/>
      <line x1="76" y1="53" x2="74" y2="69"/>
      <line x1="82" y1="53" x2="80" y2="69"/>
    </g>
  </svg>`,
  /* v0.18.0 wave — derpy art for the seven new species. */
  scalloped: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-marteau halicorne">
    <polygon points="160,54 200,36 198,84" fill="#5d7f9e"/>
    <ellipse cx="105" cy="58" rx="58" ry="17" fill="#6f93b8"/>
    <ellipse cx="105" cy="65" rx="50" ry="10" fill="#dfe9f2" opacity="0.85"/>
    <rect x="28" y="48" width="34" height="20" rx="9" fill="#6f93b8"/>
    <path d="M45,48 q0,10 0,20" stroke="#4a6a86" stroke-width="2" fill="none"/>
    <circle cx="36" cy="58" r="3" fill="#1c2733"/>
    <circle cx="54" cy="58" r="3" fill="#1c2733"/>
    <polygon points="112,42 122,26 130,42" fill="#5d7f9e"/>
    <polygon points="92,74 82,94 104,75" fill="#5d7f9e"/>
    <g stroke="#4a6a86" stroke-width="1.6" stroke-linecap="round">
      <line x1="76" y1="50" x2="74" y2="64"/>
      <line x1="82" y1="49" x2="80" y2="65"/>
    </g>
  </svg>`,
  smooth: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-marteau lisse">
    <polygon points="160,54 200,36 198,84" fill="#64707c"/>
    <ellipse cx="105" cy="58" rx="58" ry="17" fill="#75828e"/>
    <ellipse cx="105" cy="65" rx="50" ry="10" fill="#e2e7eb" opacity="0.85"/>
    <ellipse cx="45" cy="58" rx="18" ry="11" fill="#75828e"/>
    <circle cx="34" cy="58" r="3" fill="#1c2733"/>
    <circle cx="56" cy="58" r="3" fill="#1c2733"/>
    <polygon points="112,42 122,26 130,42" fill="#64707c"/>
    <polygon points="92,74 82,94 104,75" fill="#64707c"/>
    <g stroke="#4c565f" stroke-width="1.6" stroke-linecap="round">
      <line x1="76" y1="50" x2="74" y2="64"/>
      <line x1="82" y1="49" x2="80" y2="65"/>
    </g>
  </svg>`,
  bonnethead: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-marteau tiburo">
    <polygon points="150,56 184,42 182,80" fill="#7a8a6a"/>
    <ellipse cx="100" cy="60" rx="48" ry="15" fill="#8b9a76"/>
    <ellipse cx="100" cy="66" rx="42" ry="9" fill="#e6ebda" opacity="0.85"/>
    <ellipse cx="48" cy="60" rx="13" ry="10" fill="#8b9a76"/>
    <circle cx="42" cy="60" r="2.8" fill="#1c2733"/>
    <circle cx="54" cy="60" r="2.8" fill="#1c2733"/>
    <polygon points="106,46 114,32 121,46" fill="#7a8a6a"/>
    <polygon points="88,73 80,90 98,74" fill="#7a8a6a"/>
    <g stroke="#5c6a4e" stroke-width="1.5" stroke-linecap="round">
      <line x1="72" y1="53" x2="70" y2="65"/>
      <line x1="78" y1="52" x2="76" y2="66"/>
    </g>
  </svg>`,
  bull: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-bouledogue">
    <polygon points="158,52 198,32 196,82" fill="#6e7a68"/>
    <ellipse cx="100" cy="58" rx="62" ry="21" fill="#7e8a76"/>
    <ellipse cx="100" cy="68" rx="54" ry="12" fill="#e8e6d8" opacity="0.85"/>
    <ellipse cx="44" cy="58" rx="14" ry="15" fill="#7e8a76"/>
    <circle cx="38" cy="54" r="3.2" fill="#1c2733"/>
    <polygon points="108,38 120,20 130,38" fill="#6e7a68"/>
    <polygon points="88,76 76,98 102,77" fill="#6e7a68"/>
    <g stroke="#525c48" stroke-width="1.8" stroke-linecap="round">
      <line x1="70" y1="50" x2="68" y2="66"/>
      <line x1="76" y1="49" x2="74" y2="67"/>
      <line x1="82" y1="49" x2="80" y2="67"/>
    </g>
  </svg>`,
  greyreef: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin gris de récif">
    <polygon points="160,54 200,36 198,84" fill="#5f6e7a"/>
    <ellipse cx="102" cy="58" rx="60" ry="17" fill="#6d7d89"/>
    <ellipse cx="102" cy="65" rx="52" ry="10" fill="#dde3e7" opacity="0.85"/>
    <polygon points="40,58 58,50 58,66" fill="#6d7d89"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <polygon points="110,42 121,24 130,42" fill="#5f6e7a"/>
    <polygon points="90,74 80,94 102,75" fill="#5f6e7a"/>
    <path d="M192,40 L200,36 M192,80 L198,84" stroke="#2c353c" stroke-width="3" stroke-linecap="round"/>
    <g stroke="#46525a" stroke-width="1.6" stroke-linecap="round">
      <line x1="74" y1="50" x2="72" y2="64"/>
      <line x1="80" y1="49" x2="78" y2="65"/>
    </g>
  </svg>`,
  caribbean: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin de récif des Caraïbes">
    <polygon points="160,54 200,36 198,84" fill="#5a7a8c"/>
    <ellipse cx="102" cy="58" rx="60" ry="17" fill="#688696"/>
    <ellipse cx="102" cy="65" rx="52" ry="10" fill="#dce9ee" opacity="0.85"/>
    <polygon points="40,58 58,50 58,66" fill="#688696"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <polygon points="110,42 121,24 130,42" fill="#5a7a8c"/>
    <polygon points="90,74 80,94 102,75" fill="#5a7a8c"/>
    <g stroke="#42565f" stroke-width="1.6" stroke-linecap="round">
      <line x1="74" y1="50" x2="72" y2="64"/>
      <line x1="80" y1="49" x2="78" y2="65"/>
    </g>
  </svg>`,
  sandbar: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin gris">
    <polygon points="160,54 200,36 198,84" fill="#6b7a72"/>
    <ellipse cx="102" cy="58" rx="60" ry="17" fill="#7a8a80"/>
    <ellipse cx="102" cy="65" rx="52" ry="10" fill="#e2e6df" opacity="0.85"/>
    <polygon points="40,58 58,50 58,66" fill="#7a8a80"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <polygon points="106,42 118,14 132,42" fill="#6b7a72"/>
    <polygon points="90,74 80,94 102,75" fill="#6b7a72"/>
    <g stroke="#4e5a52" stroke-width="1.6" stroke-linecap="round">
      <line x1="74" y1="50" x2="72" y2="64"/>
      <line x1="80" y1="49" x2="78" y2="65"/>
    </g>
  </svg>`,
  salmon: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-saumon">
    <polygon points="158,54 188,28 190,60 188,92 158,66" fill="#3d5266"/>
    <ellipse cx="100" cy="60" rx="62" ry="22" fill="#4c6379"/>
    <ellipse cx="100" cy="69" rx="54" ry="12" fill="#dfe5ea" opacity="0.85"/>
    <polygon points="50,60 66,52 66,68" fill="#4c6379"/>
    <polygon points="106,40 116,18 126,40" fill="#3d5266"/>
    <polygon points="116,24 121,18 124,26" fill="#eef2f5"/>
    <polygon points="90,78 80,98 102,79" fill="#3d5266"/>
    <circle cx="56" cy="55" r="3.4" fill="#1c2733"/>
    <circle cx="57.2" cy="53.8" r="1.1" fill="#ffffff"/>
    <g stroke="#2f4152" stroke-width="1.8" stroke-linecap="round">
      <line x1="74" y1="52" x2="72" y2="68"/>
      <line x1="81" y1="51" x2="79" y2="69"/>
      <line x1="88" y1="51" x2="86" y2="69"/>
    </g>
  </svg>`,
  dusky: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin sombre">
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#6e6e66"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#e4e2d8" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#6e6e66"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <line x1="126" y1="42" x2="142" y2="46" stroke="#4a4a44" stroke-width="2" stroke-linecap="round"/>
    <g stroke="#46463f" stroke-width="1.6" stroke-linecap="round">
      <line x1="74" y1="50" x2="72" y2="64"/>
      <line x1="80" y1="49" x2="78" y2="65"/>
      <line x1="86" y1="49" x2="84" y2="65"/>
    </g>
  </svg>`,



  silvertip: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin à pointes argentées">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#6e6e66"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#e4e2d8" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#6e6e66"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <polygon points="104,42 114,22 126,42" fill="#e8e8e8"/>
    <polygon points="160,54 200,36 198,84" fill="#e8e8e8"/>
   </g>
  </svg>`,
  spinner: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin tisserand">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#707a80"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#e8e8e2" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#707a80"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <polygon points="38,58 20,54 20,62" fill="#707a80"/>
   </g>
  </svg>`,
  wobbegong: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-tapis tacheté">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#8a6f4d"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#d8c9a8" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#8a6f4d"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <ellipse cx="48" cy="58" rx="26" ry="12" fill="#8a6f4d"/>
    <g stroke="#5a4632" stroke-width="1.5"><line x1="30" y1="52" x2="22" y2="48"/><line x1="30" y1="64" x2="22" y2="68"/></g>
   </g>
  </svg>`,
  leopard: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-léopard">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#7a7a6a"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#e4e2d8" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#7a7a6a"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <g fill="#3a3a32"><ellipse cx="80" cy="52" rx="8" ry="5"/><ellipse cx="110" cy="50" rx="10" ry="6"/><ellipse cx="140" cy="54" rx="7" ry="5"/><ellipse cx="95" cy="60" rx="6" ry="4"/></g>
   </g>
  </svg>`,
  horn: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-corne">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#8a7355"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#d8c9a8" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#8a7355"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <polygon points="104,42 110,28 118,42" fill="#6a5a42"/>
    <rect x="36" y="50" width="20" height="6" rx="3" fill="#6a5a42"/>
   </g>
  </svg>`,
  portjackson: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin de Port-Jackson">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#8a7355"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#d8c9a8" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#8a7355"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <path d="M70,44 Q90,58 110,44" stroke="#3a3226" stroke-width="4" fill="none"/>
    <path d="M100,66 Q120,78 140,64" stroke="#3a3226" stroke-width="4" fill="none"/>
   </g>
  </svg>`,
  angelshark: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Ange de mer commun">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#9a8a6a"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#d8c9a8" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#9a8a6a"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="70" ry="10" fill="#9a8a6a"/>
    <polygon points="30,58 50,52 50,64" fill="#9a8a6a"/>
   </g>
  </svg>`,
  megamouth: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin grande-gueule">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#4a4a52"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#8a8a92" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#4a4a52"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <ellipse cx="48" cy="62" rx="14" ry="8" fill="#1a1a20"/>
    <ellipse cx="48" cy="60" rx="10" ry="4" fill="#3a3a42"/>
   </g>
  </svg>`,
  sawshark: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-scie à long nez">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#707a72"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#e4e2d8" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#707a72"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <g stroke="#5a5a52" stroke-width="1.5"><rect x="8" y="55" width="34" height="5" fill="#8a8a82"/><line x1="12" y1="55" x2="12" y2="50"/><line x1="17" y1="55" x2="17" y2="50"/><line x1="22" y1="55" x2="22" y2="50"/><line x1="27" y1="55" x2="27" y2="50"/><line x1="32" y1="55" x2="32" y2="50"/><line x1="37" y1="55" x2="37" y2="50"/></g>
   </g>
  </svg>`,
  greenland: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin du Groenland">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#4e5a5a"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#8a9292" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#4e5a5a"/>
    <circle cx="48" cy="54" r="2.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    
   </g>
  </svg>`,
  cookiecutter: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Squalelet féroce">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#3e4a52"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#c8d0d0" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#3e4a52"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <rect x="60" y="48" width="10" height="20" fill="#a8d8d8" opacity="0.7"/>
    <polygon points="40,60 52,58 52,66" fill="#ffffff"/>
   </g>
  </svg>`,
  sixgill: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin griset">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#6a6258"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#b8ac98" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#6a6258"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <g stroke="#46463f" stroke-width="1.4"><line x1="70" y1="50" x2="68" y2="64"/><line x1="76" y1="50" x2="74" y2="64"/><line x1="82" y1="50" x2="80" y2="64"/><line x1="88" y1="50" x2="86" y2="64"/><line x1="94" y1="50" x2="92" y2="64"/><line x1="100" y1="50" x2="98" y2="64"/></g>
   </g>
  </svg>`,
  velvetbelly: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Sagre commun">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#3a3a42"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#7a7a82" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#3a3a42"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    
   </g>
  </svg>`,
  dwarflantern: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-lanterne nain">
   <g transform="translate(55,27) scale(0.5)">
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#3a3a42"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#6a6a72" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#3a3a42"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    
   </g>
  </svg>`,
  kitefin: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Squale liche">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#52525a"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#8a8a92" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#52525a"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    
   </g>
  </svg>`,
  pacificsleeper: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin dormeur du Pacifique">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#4a5252"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#8a9292" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#4a5252"/>
    <circle cx="48" cy="54" r="2.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    
   </g>
  </svg>`,
  spinydogfish: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Aiguillat commun">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#6e7276"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#e0e0d8" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#6e7276"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <g fill="#e8e8e0"><circle cx="80" cy="54" r="2.5"/><circle cx="105" cy="52" r="2.5"/><circle cx="130" cy="56" r="2.5"/><circle cx="95" cy="62" r="2"/></g>
    <polygon points="104,42 110,26 118,42" fill="#5a5a52"/>
   </g>
  </svg>`,
  catshark: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Petite roussette">
   <g>
    <polygon points="160,54 200,36 198,84" fill="#5e5e58"/>
    <ellipse cx="102" cy="58" rx="62" ry="18" fill="#8a7a5a"/>
    <ellipse cx="102" cy="65" rx="54" ry="10" fill="#d8c9a8" opacity="0.85"/>
    <polygon points="38,58 58,50 58,66" fill="#8a7a5a"/>
    <circle cx="48" cy="54" r="3.2" fill="#1c2733"/>
    <circle cx="49.2" cy="52.8" r="1.1" fill="#ffffff"/>
    <polygon points="104,42 114,22 126,42" fill="#5e5e58"/>
    <polygon points="90,74 80,94 102,75" fill="#5e5e58"/>
    <g fill="#4a3a28"><circle cx="80" cy="54" r="2"/><circle cx="100" cy="51" r="2.5"/><circle cx="120" cy="55" r="2"/><circle cx="140" cy="53" r="2"/><circle cx="90" cy="62" r="1.8"/></g>
   </g>
  </svg>`
};

/* Field-guide sketches: rough pencil-style drawings of one distinctive
   feature per shark. Deliberately NOT the real shark art — the true
   appearance is revealed only when a shark is caught and tagged.
   (The real ART above is never shown in Research.) */
const SKETCH = {
  nurse: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-nourrice">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <line x1="52" y1="56" x2="46" y2="76"/>
      <line x1="62" y1="57" x2="60" y2="77"/>
      <line x1="14" y1="92" x2="206" y2="92" stroke-dasharray="4 7" opacity="0.6"/>
    </g>
  </svg>`,
  thresher: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-renard">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="70" cy="62" rx="42" ry="14"/>
      <path d="M110,58 Q150,50 168,18 Q176,8 186,6"/>
      <path d="M110,66 Q140,64 158,50" stroke-dasharray="7 5"/>
      <circle cx="42" cy="58" r="2.5" fill="#9fb8cc" stroke="none"/>
    </g>
  </svg>`,
  whale: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-baleine">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="110" cy="55" rx="80" ry="26"/>
      <path d="M188,55 L210,40 M188,55 L210,70"/>
    </g>
    <g fill="#9fb8cc" opacity="0.7">
      <circle cx="80" cy="45" r="3"/><circle cx="105" cy="42" r="3"/><circle cx="130" cy="46" r="3"/>
      <circle cx="92" cy="58" r="3"/><circle cx="118" cy="60" r="3"/><circle cx="143" cy="57" r="3"/>
      <circle cx="70" cy="62" r="2.5"/><circle cx="155" cy="64" r="2.5"/>
    </g>
  </svg>`,
  goblin: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-lutin">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M80,50 L18,44 L18,58 Z"/>
      <ellipse cx="130" cy="55" rx="55" ry="15"/>
      <path d="M183,52 Q200,48 208,44" stroke-dasharray="7 5"/>
    </g>
  </svg>`,
  tiger: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-tigre">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="55" rx="70" ry="20"/>
      <path d="M173,50 L205,34 M173,60 L205,76"/>
      <line x1="90" y1="37" x2="88" y2="73"/>
      <line x1="110" y1="35" x2="110" y2="75"/>
      <line x1="130" y1="37" x2="132" y2="73"/>
    </g>
  </svg>`,
  sandtiger: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-taureau">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M30,55 Q70,38 120,42 Q170,46 200,40"/>
      <path d="M30,55 Q70,68 120,66 Q170,64 200,60" stroke-dasharray="7 5"/>
      <path d="M44,52 l5,8 l5,-8 l5,8 l5,-8 l5,8 l5,-8"/>
    </g>
  </svg>`,
  galapagos: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin des Galápagos">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M70,55 Q110,35 150,55 Q110,75 70,55 Z"/>
      <circle cx="110" cy="55" r="10"/>
      <circle cx="110" cy="55" r="3" fill="#9fb8cc" stroke="none"/>
    </g>
  </svg>`,
  greatwhite: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Grand requin blanc">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M20,45 Q70,35 120,42 Q170,49 200,42"/>
      <path d="M20,65 Q70,58 120,63 Q170,68 200,62" stroke-dasharray="7 5"/>
      <line x1="14" y1="92" x2="206" y2="92" stroke-dasharray="4 7" opacity="0.6"/>
    </g>
  </svg>`,
  hammerhead: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Grand requin-marteau">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <rect x="40" y="42" width="140" height="26" rx="13"/>
      <path d="M110,68 L110,96" stroke-dasharray="7 5"/>
      <circle cx="55" cy="55" r="3" fill="#9fb8cc" stroke="none"/>
      <circle cx="165" cy="55" r="3" fill="#9fb8cc" stroke="none"/>
    </g>
  </svg>`,
  mako: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-taupe bleu">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M30,55 Q110,30 190,55 Q110,80 30,55 Z"/>
      <path d="M190,55 L210,42 M190,55 L210,68"/>
    </g>
  </svg>`,
  basking: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-pèlerin">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="110" cy="55" rx="75" ry="24"/>
      <path d="M45,55 Q110,85 175,55" stroke-width="3.5"/>
      <path d="M45,55 Q110,30 175,55" stroke-dasharray="7 5"/>
    </g>
  </svg>`,
  epaulette: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-épaulette">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M60,40 Q90,55 100,85"/>
      <path d="M100,85 L85,100 M100,85 L100,102 M100,85 L115,100"/>
      <line x1="14" y1="104" x2="206" y2="104" stroke-dasharray="4 7" opacity="0.6"/>
    </g>
  </svg>`,
  lemon: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-citron">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="62" rx="70" ry="18"/>
      <path d="M88,46 L96,24 L106,46 Z"/>
      <path d="M128,46 L136,24 L146,46 Z"/>
      <line x1="96" y1="24" x2="136" y2="24" stroke-dasharray="4 4" opacity="0.7"/>
    </g>
  </svg>`,
  blacktip: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin à pointes noires">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="62" rx="70" ry="18"/>
      <path d="M96,46 L104,22 L114,46 Z"/>
    </g>
    <polygon points="100,32 104,22 109,31" fill="#9fb8cc"/>
  </svg>`,
  whitetip: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin corail">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="62" rx="70" ry="18"/>
      <path d="M96,46 L104,22 L114,46 Z"/>
      <path d="M100,32 L104,22 L109,31" stroke="#e8edf2" stroke-width="3"/>
    </g>
  </svg>`,
  blue: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin bleu">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="62" rx="70" ry="18"/>
      <path d="M40,62 Q105,80 170,62" opacity="0.7"/>
      <path d="M88,78 L30,102 L90,79 Z"/>
    </g>
  </svg>`,
  porbeagle: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-taupe commun">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="62" rx="66" ry="20"/>
      <path d="M96,44 L106,22 L116,44 Z"/>
      <path d="M106,30 L110,22 L113,30" stroke="#e8edf2" stroke-width="3"/>
    </g>
  </svg>`,
  silky: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin soyeux">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="62" rx="72" ry="16"/>
      <path d="M40,62 Q105,70 170,62" stroke-dasharray="2 5" opacity="0.8"/>
      <path d="M96,48 L104,28 L112,48 Z"/>
    </g>
  </svg>`,
  oceanic: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin océanique">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="62" rx="66" ry="20"/>
      <path d="M96,44 L108,20 L120,44 Z"/>
      <path d="M88,80 L44,104 L90,81 Z"/>
      <path d="M52,98 L44,104 L56,100" stroke="#e8edf2" stroke-width="3"/>
    </g>
  </svg>`,
  sevengill: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin à sept branchies">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="108" cy="62" rx="66" ry="18"/>
      <path d="M138,46 L146,30 L152,46 Z"/>
      <g stroke-width="1.8">
        <line x1="66" y1="52" x2="64" y2="70"/>
        <line x1="71" y1="52" x2="69" y2="70"/>
        <line x1="76" y1="52" x2="74" y2="70"/>
        <line x1="81" y1="52" x2="79" y2="70"/>
        <line x1="86" y1="52" x2="84" y2="70"/>
        <line x1="91" y1="52" x2="89" y2="70"/>
        <line x1="96" y1="52" x2="94" y2="70"/>
      </g>
    </g>
  </svg>`,
  bronze: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin cuivré">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="62" rx="70" ry="18"/>
      <path d="M40,58 Q105,52 170,58" stroke="#c9a86a" opacity="0.9"/>
      <path d="M96,46 L106,22 L116,46 Z"/>
    </g>
  </svg>`,
  frilled: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-lézard">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="64" rx="72" ry="14"/>
      <g stroke-width="2">
        <path d="M56,54 q3,4 0,8 q-3,4 0,8"/>
        <path d="M63,54 q3,4 0,8 q-3,4 0,8"/>
        <path d="M70,54 q3,4 0,8 q-3,4 0,8"/>
      </g>
      <path d="M96,50 L104,32 L112,50 Z"/>
    </g>
  </svg>`,
  zebra: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-zèbre">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="62" rx="70" ry="18"/>
      <path d="M96,46 L106,26 L116,46 Z"/>
    </g>
    <g fill="#9fb8cc" opacity="0.9">
      <circle cx="85" cy="58" r="2.4"/><circle cx="100" cy="62" r="2.4"/><circle cx="115" cy="59" r="2.4"/>
      <circle cx="130" cy="62" r="2.2"/><circle cx="92" cy="68" r="2.2"/><circle cx="108" cy="69" r="2.2"/>
    </g>
  </svg>`,
  /* v0.18.0 wave — field sketches highlighting each species' key feature. */
  scalloped: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-marteau halicorne">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <rect x="30" y="48" width="40" height="22" rx="10"/>
      <path d="M50,48 q0,5 0,0 M50,48 q-3,11 0,22" stroke-dasharray="3 3"/>
      <ellipse cx="120" cy="60" rx="62" ry="17"/>
      <path d="M112,44 L122,26 L132,44 Z"/>
    </g>
  </svg>`,
  smooth: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-marteau lisse">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="50" cy="59" rx="20" ry="12"/>
      <ellipse cx="120" cy="60" rx="62" ry="17"/>
      <path d="M112,44 L122,26 L132,44 Z"/>
    </g>
  </svg>`,
  bonnethead: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-marteau tiburo">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="52" cy="60" rx="14" ry="11"/>
      <ellipse cx="118" cy="60" rx="58" ry="15"/>
      <path d="M110,46 L118,30 L126,46 Z"/>
    </g>
  </svg>`,
  bull: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-bouledogue">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="46" cy="59" rx="16" ry="17"/>
      <ellipse cx="118" cy="60" rx="64" ry="20"/>
      <path d="M110,41 L122,22 L134,41 Z"/>
    </g>
  </svg>`,
  greyreef: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin gris de récif">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="105" cy="60" rx="62" ry="17"/>
      <path d="M160,52 L196,34 L194,82 Z"/>
      <path d="M188,38 L196,34 M188,78 L194,82" stroke-width="4"/>
      <path d="M98,44 L108,26 L118,44 Z"/>
    </g>
  </svg>`,
  caribbean: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin de récif des Caraïbes">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="110" cy="60" rx="68" ry="17"/>
      <path d="M165,54 L200,38 L198,80 Z"/>
      <path d="M102,44 L112,26 L122,44 Z"/>
    </g>
  </svg>`,
  sandbar: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin gris">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="110" cy="62" rx="64" ry="17"/>
      <path d="M100,46 L114,14 L130,46 Z"/>
      <path d="M165,56 L198,40 L196,80 Z"/>
    </g>
  </svg>`,
  salmon: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-saumon">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="110" cy="62" rx="66" ry="20"/>
      <path d="M44,62 L70,52 L70,72 Z"/>
      <path d="M104,44 L116,22 L128,44 Z"/>
      <path d="M168,56 L200,38 L198,82 Z"/>
    </g>
  </svg>`,
  dusky: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin sombre">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <ellipse cx="110" cy="62" rx="64" ry="17"/>
      <path d="M100,46 L112,24 L124,46 Z"/>
      <path d="M138,44 L148,32 L156,44 Z"/>
      <path d="M124,40 Q138,36 142,42" stroke-dasharray="4 3"/>
      <path d="M165,56 L198,40 L196,80 Z"/>
    </g>
  </svg>`,



  silvertip: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin à pointes argentées">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">white-edged fins</text>
    </g>
  </svg>`,
  spinner: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin tisserand">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">long pointed snout</text>
    </g>
  </svg>`,
  wobbegong: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-tapis tacheté">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">barbels and lobes</text>
    </g>
  </svg>`,
  leopard: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-léopard">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">dark saddles and spots</text>
    </g>
  </svg>`,
  horn: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-corne">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">blunt head and brow ridges</text>
    </g>
  </svg>`,
  portjackson: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin de Port-Jackson">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">dark harness markings</text>
    </g>
  </svg>`,
  angelshark: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Ange de mer commun">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">flattened ray-like body</text>
    </g>
  </svg>`,
  megamouth: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin grande-gueule">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">enormous cavernous mouth</text>
    </g>
  </svg>`,
  sawshark: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-scie à long nez">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">saw-like rostrum</text>
    </g>
  </svg>`,
  greenland: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin du Groenland">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">tiny eyes, stout body</text>
    </g>
  </svg>`,
  cookiecutter: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Squalelet féroce">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">glowing collar and big teeth</text>
    </g>
  </svg>`,
  sixgill: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin griset">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">six gill slits</text>
    </g>
  </svg>`,
  velvetbelly: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Sagre commun">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">velvety dark skin</text>
    </g>
  </svg>`,
  dwarflantern: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin-lanterne nain">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">one of the smallest sharks</text>
    </g>
  </svg>`,
  kitefin: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Squale liche">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">heavy deep-water body</text>
    </g>
  </svg>`,
  pacificsleeper: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Requin dormeur du Pacifique">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">slow deep-sea giant</text>
    </g>
  </svg>`,
  spinydogfish: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Aiguillat commun">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">white spots and dorsal spines</text>
    </g>
  </svg>`,
  catshark: `
  <svg viewBox="0 0 220 110" role="img" aria-label="Petite roussette">
    <g fill="none" stroke="#9fb8cc" stroke-width="2.5" stroke-linecap="round">
      <path d="M40,55 Q70,40 120,44 Q170,48 200,42"/>
      <path d="M40,55 Q70,66 120,64 Q170,62 200,58" stroke-dasharray="7 5"/>
      <circle cx="52" cy="52" r="3"/>
      <path d="M104,44 L114,28 L124,44"/>
      <text x="110" y="100" text-anchor="middle" font-size="11" fill="#9fb8cc" stroke="none">small dark spots</text>
    </g>
  </svg>`
};
