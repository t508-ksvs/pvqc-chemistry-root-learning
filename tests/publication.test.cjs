const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const ctx={window:{}};vm.createContext(ctx);
for(const p of ['data/words.js','data/courses.js','visuals.js'])vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),ctx);
test('shared diagrams preserve chemical structure and quantity',()=>{
 const render=ctx.window.PVQC_VISUAL_HTML;
 for(const [selection,count] of [[0,6],[1,4],[2,2]]){
  const svg=render('bonds',selection).match(/<svg[\s\S]*?<\/svg>/)[0];
  assert.equal((svg.match(/>H<\/text>/g)||[]).length,count);
  assert.equal((svg.match(/stroke-width="4"/g)||[]).length,selection+1);
 }
 assert.equal((render('sugars',3).match(/class="sugar-unit"/g)||[]).length,12);
 assert.equal((render('solv',2).match(/<circle /g)||[]).length,7);
});
test('both modes consume the same courses, words and diagrams',()=>{
 for(const file of ['handout.html','student.html']){
  const html=fs.readFileSync(path.join(root,file),'utf8');
  for(const src of ['data/words.js','data/courses.js','visuals.js'])assert.ok(html.includes('src="'+src+'"'));
 }
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 for(const file of ['handout.html','student.html'])assert.ok(html.includes('href="'+file+'"'));
});
test('handout renders all lessons, valid vocabulary and answers',()=>{
 const elements=new Map();
 const el=id=>{if(!elements.has(id))elements.set(id,{innerHTML:''});return elements.get(id);};
 ctx.document={getElementById:el,querySelectorAll:()=>[]};
 vm.runInContext(fs.readFileSync(path.join(root,'handout.js'),'utf8'),ctx);
 const rendered=el('chapters').innerHTML;
 assert.equal((rendered.match(/class="chapter"/g)||[]).length,4);
 assert.equal((rendered.match(/class="answer"/g)||[]).length,4);
 for(const lesson of ctx.window.PVQC_COURSES){
  assert.ok(rendered.includes('id="'+lesson.id+'"'));
  assert.ok(rendered.includes('student.html#lesson/'+lesson.id));
 }
 assert.ok(!rendered.includes('undefined'));
});
