// Runnable test evidence for the French v1.0.0 build (Mira PR #16 gates).
// Extracts the real helpers/functions from script.js source and runs them.
const fs = require('fs'), vm = require('vm');
const src = fs.readFileSync('script-fr-final.js', 'utf-8');
function extract(re, label) {
  const m = src.match(re);
  if (!m) { console.log('EXTRACT FAIL:', label); process.exit(1); }
  return m[0];
}
let code = '';
code += extract(/function frIsFem[^\n]*/, 'frIsFem');
code += '\n' + extract(/function frIsVowel[^\n]*/, 'frIsVowel');
code += '\n' + extract(/function frLeName[^\n]*/, 'frLeName');
code += '\n' + extract(/function frCeName[^\n]*/, 'frCeName');
code += '\n' + extract(/function ordinal\(n, fem\) \{[\s\S]*?\n\}/, 'ordinal');
code += '\n' + extract(/function bigDayArticle[\s\S]*?\n\}/, 'bigDayArticle');
code += '\n' + extract(/function formatSpeciesList[\s\S]*?\n\}/, 'formatSpeciesList');
code += '\n' + extract(/const OLD_SAVE_DOING_FR = \{[\s\S]*?\};/, 'doing map');
code += '\n' + extract(/const OLD_SAVE_WATCH_NOTE_FR = \{[\s\S]*?\};/, 'watch map');
code += '\n' + extract(/const RESULT_FR = \{[^}]*\};/, 'result map');
const sb = {}; vm.createContext(sb);
vm.runInContext(code + '\nthis.T = { frLeName, frCeName, ordinal, bigDayArticle, formatSpeciesList, OLD_SAVE_DOING_FR, OLD_SAVE_WATCH_NOTE_FR, RESULT_FR };', sb);
const T = sb.T;
let pass = 0, fail = 0;
function eq(label, got, want) {
  if (got === want) { pass++; }
  else { fail++; console.log('FAIL', label, '| got:', JSON.stringify(got), '| want:', JSON.stringify(want)); }
}
// Articles
eq('le masc', T.frLeName('requin-nourrice'), 'le requin-nourrice');
eq('le fem', T.frLeName('petite roussette'), 'la petite roussette');
eq('le vowel ange', T.frLeName('ange de mer commun'), "l'ange de mer commun");
eq('le vowel aiguillat', T.frLeName('aiguillat commun'), "l'aiguillat commun");
eq('ce masc', T.frCeName('requin-nourrice'), 'ce requin-nourrice');
eq('ce fem', T.frCeName('petite roussette'), 'cette petite roussette');
eq('ce vowel ange', T.frCeName('ange de mer commun'), 'cet ange de mer commun');
eq('ce vowel aiguillat', T.frCeName('aiguillat commun'), 'cet aiguillat commun');
// Ordinals
eq('ord 1 masc', T.ordinal(1, false), '1er');
eq('ord 1 fem', T.ordinal(1, true), '1re');
eq('ord 3', T.ordinal(3, false), '3e');
eq('ord 12', T.ordinal(12, false), '12e');
eq('ord 50 fem', T.ordinal(50, true), '50e');
// Species list (bigDayArticle + joiners)
const ev = (n) => ({ speciesName: n });
eq('list 1 masc', T.formatSpeciesList([ev('requin-nourrice')]), 'le requin-nourrice');
eq('list 1 fem', T.formatSpeciesList([ev('petite roussette')]), 'la petite roussette');
eq('list 1 vowel', T.formatSpeciesList([ev('ange de mer commun')]), "l'ange de mer commun");
eq('list 2', T.formatSpeciesList([ev('requin-nourrice'), ev('petite roussette')]), 'le requin-nourrice et la petite roussette');
eq('list 3', T.formatSpeciesList([ev('requin-nourrice'), ev('petite roussette'), ev('aiguillat commun')]), "le requin-nourrice, la petite roussette, et l'aiguillat commun");
// Watch assemblies (article + real doing fragments)
for (const name of ['requin-nourrice', 'petite roussette', 'ange de mer commun', 'aiguillat commun'])
  for (const doing of ['Longe lentement le bord du récif', 'Chasse en silence, tout à sa proie']) {
    const line = `Tu observes ${T.frLeName(name)} ${doing}.`;
    if (/le la |le l'|la le /.test(line)) { fail++; console.log('FAIL watch assembly:', line); } else pass++;
  }
// Result codes + fallbacks
eq('result tagged', T.RESULT_FR['tagged'], 'marqué');
eq('result resighted', T.RESULT_FR['resighted'], 'réobservé');
eq('result followed', T.RESULT_FR['followed'], 'suivi');
eq('result watched', T.RESULT_FR['watched'], 'observé');
eq('result unknown fallback', T.RESULT_FR['bogus'] || 'bogus', 'bogus');
// Old-save maps: keys non-empty, values non-empty, French pool sizes
eq('doing map size', Object.keys(T.OLD_SAVE_DOING_FR).length, 8);
eq('watch map size', Object.keys(T.OLD_SAVE_WATCH_NOTE_FR).length, 16);
eq('doing sample', T.OLD_SAVE_DOING_FR['feeding, oblivious to the boat'], 'Se nourrit sans prêter attention au bateau');
eq('watch sample', T.OLD_SAVE_WATCH_NOTE_FR["the boat's shadow ripples across the reef"], "l'ombre du bateau ondule sur le récif");
eq('doing unknown fallback', T.OLD_SAVE_DOING_FR['something new'] || 'something new', 'something new');
console.log(`\nbuild-fr tests: ${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
