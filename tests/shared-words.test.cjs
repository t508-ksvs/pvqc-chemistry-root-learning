const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const bank=JSON.parse(fs.readFileSync(path.join(root,'data/words.json'),'utf8'));
test('541 V11 records keep stable, unique identities and source locations',()=>{
 assert.equal(bank.words.length,541);
 assert.equal(new Set(bank.words.map(w=>w.key)).size,541);
 assert.equal(new Set(bank.words.map(w=>w.id)).size,541);
 for(const w of bank.words){
  assert.equal(w.id,'v11-'+crypto.createHash('sha256').update(w.key).digest('hex').slice(0,12));
  assert.equal(w.syllabus,'v11');assert.ok(w.source.alphabetRow>1);assert.ok(w.source.teachingRow>1);
  assert.equal(w.source.sha256,bank.meta.baselineSha256);
 }
});
test('source meanings survive website corrections',()=>{
 const by=new Map(bank.words.map(w=>[w.key,w]));
 assert.match(by.get('methyl').source.zh,/木精/);assert.equal(by.get('methyl').zh,'甲基');
 assert.match(by.get('dimethyl').source.zh,/乙烷/);assert.equal(by.get('dimethyl').zh,'二甲基（命名構件）');
 assert.match(by.get('disaccharide').root,/di-/);assert.doesNotMatch(by.get('disaccharide').root,/dis-/);
 assert.equal(bank.meta.websiteCorrections,7);
});
test('extension terms remain separate from the V11 inventory',()=>{
 const core=new Set(bank.words.map(w=>w.key));assert.equal(bank.extensions.length,6);
 for(const w of bank.extensions){assert.equal(w.syllabus,'extension');assert.ok(!core.has(w.key));assert.ok(w.sources.length);}
 assert.ok(bank.extensions.some(w=>w.key==='solvent'));
 assert.equal(bank.meta.missingFromLegacy.length,0);assert.equal(bank.meta.extraInLegacy.length,0);
});
test('every vocabulary reference in all four representative lessons resolves',()=>{
 const source=fs.readFileSync(path.join(root,'pilot.js'),'utf8');
 const references=[...source.matchAll(/words:\[([^\]]+)\]/g)];assert.equal(references.length,4);
 const keys=new Set([...bank.words,...bank.extensions].map(w=>w.key));
 for(const m of references){const words=[...m[1].matchAll(/'([^']+)'/g)].map(x=>x[1]);assert.ok(words.length>0);for(const w of words)assert.ok(keys.has(w),'Missing lesson word: '+w);}
});
