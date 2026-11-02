const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const out=path.resolve(process.argv[2]||path.join(root,'..','published-site'));
if(out===root||root.startsWith(out+path.sep)||out.startsWith(root+path.sep))throw new Error('Choose a separate output directory');
fs.mkdirSync(out,{recursive:true});
const files=['index.html','handout.html','handout.js','student.html','pilot.html','pilot.js','pilot.css','publication.css','visuals.js','.nojekyll','data/words.js','data/courses.js','assets/de-prefix.png','assets/solv-main.webp','assets/hydrocarbon-main.webp'];
for(const name of files){const dest=path.join(out,name);fs.mkdirSync(path.dirname(dest),{recursive:true});fs.copyFileSync(path.join(root,name),dest);}
console.log(JSON.stringify({output:out,files:files.length,bytes:files.reduce((n,p)=>n+fs.statSync(path.join(out,p)).size,0)}));
