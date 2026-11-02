(() => {
'use strict';
const lessons=window.PVQC_COURSES, bank=window.PVQC_WORD_BANK;
const words=new Map([...bank.words,...bank.extensions].map(w=>[w.key,w]));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const diagram=(id,n)=>'<div class="visual print-visual">'+window.PVQC_VISUAL_HTML(id,n)+'</div>';
function visuals(id){
 if(id==='bonds')return '<div class="comparison-diagrams">'+[0,1,2].map(n=>diagram(id,n)).join('')+'</div>';
 if(id==='sugars')return '<div class="comparison-diagrams sugars">'+[0,1,2,3].map(n=>diagram(id,n)).join('')+'</div>';
 return diagram(id,id==='solv'?2:0);
}
document.getElementById('contents').innerHTML=lessons.map((l,i)=>`<a href="#${l.id}">${i+1}. ${esc(l.title)}</a>`).join('');
document.getElementById('chapters').innerHTML=lessons.map((l,i)=>`<article class="chapter" id="${l.id}"><div class="eyebrow">LESSON ${i+1} · ${esc(l.root)}</div><h2>${esc(l.title)}</h2><p class="concept">${esc(l.lead)}</p><p>${esc(l.story)}</p>${visuals(l.id)}<aside class="boundary"><b>辨別重點</b>${esc(l.note)}</aside><h3>字族與詞義</h3><table class="handout-words"><thead><tr><th>英文</th><th>中文</th><th>範圍</th></tr></thead><tbody>${l.words.map(key=>{const w=words.get(key);return `<tr><td><a href="student.html#words">${esc(w.en)}</a></td><td>${esc(w.zh)}</td><td>${w.syllabus==='extension'?'概念延伸':'V11 字彙'}</td></tr>`;}).join('')}</tbody></table><section class="paper-recall"><h3>主動回想</h3><p>${esc(l.question)}</p><ol type="A">${l.choices.map(c=>`<li>${esc(c)}</li>`).join('')}</ol><div class="writing-space">我的答案與理由：</div><div class="answer"><b>解答：${String.fromCharCode(65+l.answer)}</b><p>${esc(l.explanation)}</p></div></section><p class="handout-source">${esc(l.source)} ${l.url?`<a href="${esc(l.url)}" target="_blank" rel="noopener">參考資料</a>`:''}</p><a class="study-link" href="student.html#lesson/${l.id}">進入這一課的互動學習 →</a></article>`).join('');
document.getElementById('print').onclick=()=>window.print();
document.getElementById('show-answers').onchange=e=>document.body.classList.toggle('show-answers',e.target.checked);
document.querySelectorAll('.print-visual .tabs').forEach(el=>el.remove());
document.querySelectorAll('.print-visual .caption').forEach(el=>{if(el.textContent.includes('點圖片放大'))el.textContent='圖像與學生學習版共用；可在新分頁檢視原尺寸。';});
document.querySelectorAll('[data-image-src]').forEach(el=>{const a=document.createElement('a');a.href=el.dataset.imageSrc;a.target='_blank';a.rel='noopener';a.append(...el.childNodes);el.replaceWith(a);});
})();
