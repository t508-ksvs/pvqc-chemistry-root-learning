(() => {
 'use strict';
 const bank=window.PVQC_WORD_BANK;
 const wordsByKey=new Map(bank.words.map(w=>[w.key,w]));
 const extensions=bank.extensions;
 extensions.forEach(w=>wordsByKey.set(w.key,w));
 const lessons=[
  {id:'de',title:'從去除，讀懂 de-',root:'DE- · AWAY / DOWN',group:'通用字根 → 化工情境',symbol:'de-',lead:'先理解「去除、離開」的方向，再對照完整的化學操作。',
   story:'dehydration 是脫水；decomposition 是分解；decantation 則是傾析。字首給你方向線索，完整單字告訴你是哪一種過程。',
   words:['dehydration','decomposition','decantation','denaturation','delocalization','deodorization'],
   note:'看到相似開頭，不必每個字都硬拆。V11 特別提醒：decantation 的學習重點是傾析操作；de- 不能取代完整詞義。',
   question:'把物質中的水分移除，應選哪一個詞？',choices:['dehydration','hydrogenation','solution'],answer:0,
   explanation:'dehydration 是脫水。hydrogenation 是氫化；solution 是溶液。先辨認 de- 的方向，再確認完整單字。',
   source:'圖像：CG_de_化.png 原檔副本；文字與詞彙以 V11 的 de- 教學提醒為基礎。'},
  {id:'solv',title:'溶質、溶劑、溶液，分清角色',root:'SOLV · SOLU',group:'化學過程',symbol:'＋',lead:'以鹽水為例：鹽是溶質，水是溶劑，形成的均勻鹽水是溶液。',
   story:'把鹽加入水，鹽的粒子分散到水中。看不見原來的鹽粒，不代表鹽消失了。solute、solvent、solution 是三種不同的角色。',
   words:['solute','solvent','solution','dissolution','solubility'],
   note:'本圖只用固體溶於液體示範；溶質不一定是固體，溶劑也不只限於水。簡圖中的粒子大小、數量與間距不按比例。',
   question:'鹽溶於水後，哪個說法比較正確？',choices:['鹽完全消失，物質不再存在','溶質粒子分散在溶劑中，形成均勻溶液','水變成溶質，鹽變成溶劑'],answer:1,
   explanation:'在這個鹽水情境，鹽是溶質、水是溶劑；溶解後粒子分散在溶劑中，並沒有消失。',
   source:'圖像：CG_solv1008new；角色示例參照 IUPAC solution 定義。',url:'https://goldbook.iupac.org/terms/view/S05746'},
  {id:'bonds',title:'烷、烯、炔，先看碳碳鍵',root:'-ANE · -ENE · -YNE',group:'碳鏈與命名',symbol:'C≡C',lead:'固定兩個碳，比較單鍵、雙鍵與三鍵，先建立母體烴的概念。',
   story:'ethane 是乙烷，ethene 是乙烯，ethyne 是乙炔。碳碳鍵改變，對應的氫原子數也不同。A／E／Y 可以作記憶提示；結構才是判斷的依據。',
   words:['ethane','ethene','ethyne','alkane','alkene','alkyne','alkaline'],
   note:'alkaline 是「鹼性的」，不屬於烷／烯／炔的分類。CₙH₂ₙ₊₂、CₙH₂ₙ、CₙH₂ₙ₋₂ 分別適用於此處的非環狀烷、一個雙鍵的非環狀烯、一個三鍵的非環狀炔。',
   question:'在這三個雙碳分子中，哪一個具有碳碳雙鍵？',choices:['ethane 乙烷','ethene 乙烯','ethyne 乙炔'],answer:1,
   explanation:'ethene（乙烯）具有 C=C。ethane 是 C–C，ethyne 是 C≡C。ethene／alkene 在本課標為概念延伸，不算入 V11 的 541 詞。',
   source:'鍵結簡圖與通式條件參照 IUPAC 烴類分類；原教學圖保留為補充。',url:'https://iupac.qmul.ac.uk/class/hydro.html'},
  {id:'sugars',title:'從單元數，看懂醣類名稱',root:'MONO · DI · OLIGO · POLY',group:'數量與醣類',symbol:'●—●',lead:'分類時數的是每個醣分子中的單醣單元，不是整杯樣品有幾個分子。',
   story:'一個單醣單元，對應 monosaccharide；兩個單元連接，對應 disaccharide。先用單元圖認識數量，再把詞彙連到葡萄糖、麥芽糖、蔗糖等例子。',
   words:['monosaccharide','disaccharide','oligosaccharide','polysaccharide','glucose','maltose','sucrose'],
   note:'本課明確採 FAO/WHO 的膳食醣類分類：寡醣 3–9、多醣 10 個以上單醣單元。不同領域的界線用法可能不同；不以此推斷甜度、消化速度或血糖反應。圓圈只是單元示意，並非真正的化學結構式。',
   question:'採本課的分類，含 12 個單醣單元的醣分子應放在哪一類？',choices:['monosaccharide 單醣','disaccharide 雙醣','polysaccharide 多醣'],answer:2,
   explanation:'本課依 FAO/WHO 的分類，10 個以上單醣單元歸為多醣。12 是這張簡圖的示意數量，不代表所有多醣都只有 12 個單元。',
   source:'分類依據：FAO/WHO Dietary carbohydrate composition。',url:'https://www.fao.org/4/w8079e/w8079e0h.htm'},
 ];
 const lessonById=new Map(lessons.map(l=>[l.id,l]));
 const $=id=>document.getElementById(id);
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const storageKey='pvqc-shared-learning-v1';
 let state={starred:[],completed:[],answers:{}};
 try{const x=JSON.parse(localStorage.getItem(storageKey)||'null');if(x&&Array.isArray(x.starred)&&Array.isArray(x.completed)&&x.answers&&typeof x.answers==='object')state=x;}catch{}
 state.starred=state.starred.filter(id=>[...wordsByKey.values()].some(w=>w.id===id));
 state.completed=state.completed.filter(id=>lessonById.has(id));
 let speechRun=0,toastTimer,searchPage=0;
 function toast(s){$('toast').textContent=s;$('toast').style.display='block';clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('toast').style.display='none',3500);}
 function persist(){try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{$('saved-status').textContent='此瀏覽器無法保留進度；目前仍可正常學習';}}
 function stopSpeech(){speechRun++;if('speechSynthesis' in window)speechSynthesis.cancel();}
 function speak(list){stopSpeech();if(!('speechSynthesis' in window))return toast('此瀏覽器未提供語音功能。');let i=0,run=speechRun;const next=()=>{if(run!==speechRun||i>=list.length)return;const u=new SpeechSynthesisUtterance(list[i++]);u.lang='en-US';u.rate=.82;const v=speechSynthesis.getVoices().find(v=>v.lang==='en-US');if(v)u.voice=v;u.onend=next;u.onerror=()=>{if(run===speechRun)toast('語音未完成，請確認裝置聲音設定後重試。');};speechSynthesis.speak(u);};next();}
 function wordTag(w){return `<span class="tag ${w.syllabus==='extension'?'extension':''}">${w.syllabus==='extension'?'概念延伸':'V11 字彙'}</span>`;}
 function wordChip(key){const w=wordsByKey.get(key);if(!w)throw new Error('Missing word '+key);return `<div class="word-chip"><div class="word-top"><button class="speak" data-speak="${esc(w.key)}" aria-label="播放 ${esc(w.en)} 的英文發音">♪ ${esc(w.en)}</button><button class="star" data-star="${esc(w.id)}" aria-label="${esc(w.en)} 標記待加強" aria-pressed="${state.starred.includes(w.id)}">${state.starred.includes(w.id)?'★':'☆'}</button></div><div class="word-zh">${esc(w.zh)}</div>${wordTag(w)}</div>`;}
 function bindWords(){document.querySelectorAll('[data-speak]').forEach(b=>b.onclick=()=>speak([wordsByKey.get(b.dataset.speak).en]));document.querySelectorAll('[data-star]').forEach(b=>b.onclick=()=>{const id=b.dataset.star;state.starred=state.starred.includes(id)?state.starred.filter(x=>x!==id):[...state.starred,id];persist();document.querySelectorAll('[data-star]').forEach(x=>{if(x.dataset.star===id){x.setAttribute('aria-pressed',String(state.starred.includes(id)));x.textContent=state.starred.includes(id)?'★':'☆';}});});}
 function home(){
  $('content').innerHTML=`<div class="eyebrow">CHEMISTRY · ROOTS · VISUAL LEARNING</div><h1>從看懂一張圖，<br>走到讀懂一個化學詞。</h1><p class="intro">選一個主題開始：看圖、聽單字，接著用一題回想確認理解。碰到不熟的字，點星號加入自己的複習清單。</p><div class="course-grid">${lessons.map((l,i)=>`<a class="course" href="#lesson/${l.id}"><div class="course-art large-symbol">${esc(l.symbol)}</div><div class="course-body"><small>LESSON ${String(i+1).padStart(2,'0')} · ${state.completed.includes(l.id)?'已學過':'開始探索'}</small><h2>${esc(l.title)}</h2><p>${esc(l.group)}</p></div></a>`).join('')}</div><div class="home-note">目前開放四個代表課供教師檢視。查單字已連接 V11 的 541 個詞；概念延伸詞會另標示。每課的「已學過」與回想題結果分開記錄。</div>`;
 }
 function wordSource(w){return w.syllabus==='extension'?'概念延伸，不納入 V11 的 541 詞計數。':`V11「${esc(w.source.alphabetSheet)}」第 ${w.source.alphabetRow} 列；「${esc(w.source.teachingSheet)}」第 ${w.source.teachingRow} 列。${w.reviewStatus==='website-correction'?'網站顯示已修訂，原文保留。':'來源轉錄，尚未逐詞完成內容審校。'}`;}
 function lesson(id){
  const l=lessonById.get(id);if(!l){location.hash='#home';return;}
  const i=lessons.indexOf(l),previous=lessons[i-1],next=lessons[i+1];
  $('content').innerHTML=`<div class="crumb"><a href="#home">← 回到圖文講義</a><span>${esc(l.group)} · ${i+1} / 4</span></div><article class="lesson-grid"><div class="lesson-text"><div class="root-title">${esc(l.root)}</div><h1>${esc(l.title)}</h1><p class="concept">${esc(l.lead)}</p><p class="story">${esc(l.story)}</p><section class="vocabulary"><h2 class="section-label">WORD FAMILY · 點單字聽英文</h2><div id="lesson-words" class="words">${l.words.map(wordChip).join('')}</div><div class="utilities"><button id="listen-all">♪ 全部聽一次</button><button id="stop-speech">停止</button><button id="meanings" aria-pressed="false">隱藏中文</button></div></section><button id="complete" class="master" aria-pressed="${state.completed.includes(id)}">${state.completed.includes(id)?'✓ 已學過這一課 · 再點可取消':'＋ 標記已學過這一課'}</button><details class="source"><summary>教材來源與字彙範圍</summary><p>${esc(l.source)} ${l.url?`<a href="${l.url}" target="_blank" rel="noopener">查看參考</a>`:''}</p>${l.words.map(key=>{const w=wordsByKey.get(key);return `<p><b>${esc(w.en)}</b>：${wordSource(w)}</p>`;}).join('')}</details></div><div class="lesson-visual"><section class="visual" id="visual"></section><aside class="boundary"><b>辨別重點</b>${esc(l.note)}</aside><section class="recall"><h2>ACTIVE RECALL · 先想再選</h2><form id="quiz-form"><fieldset><legend>${esc(l.question)}</legend><div class="choices">${l.choices.map((c,n)=>`<label class="choice"><input type="radio" name="answer" value="${n}" required><span>${esc(c)}</span></label>`).join('')}</div></fieldset><button type="submit">確認答案</button><p id="feedback" class="feedback" role="status"></p><p id="quiz-status" class="quiz-status"></p></form></section></div></article><div class="lesson-nav">${previous?`<a href="#lesson/${previous.id}">← ${esc(previous.title)}</a>`:'<a href="#home">← 課程總覽</a>'}${next?`<a href="#lesson/${next.id}">${esc(next.title)} →</a>`:'<a href="#review">前往我的複習 →</a>'}</div>`;
  bindWords();renderVisual(id);
  $('listen-all').onclick=()=>speak(l.words.map(k=>wordsByKey.get(k).en));$('stop-speech').onclick=stopSpeech;
  $('meanings').onclick=()=>{const h=$('lesson-words').classList.toggle('hide-meanings');$('meanings').textContent=h?'顯示中文':'隱藏中文';$('meanings').setAttribute('aria-pressed',String(h));};
  $('complete').onclick=()=>{state.completed=state.completed.includes(id)?state.completed.filter(x=>x!==id):[...state.completed,id];persist();$('complete').setAttribute('aria-pressed',String(state.completed.includes(id)));$('complete').textContent=state.completed.includes(id)?'✓ 已學過這一課 · 再點可取消':'＋ 標記已學過這一課';};
  const old=state.answers[id];if(old)$('quiz-status').textContent=`已練習 ${old.attempts} 次；最近一次${old.correct?'答對':'待複習'}。`;
  $('quiz-form').onsubmit=e=>{e.preventDefault();const choice=Number(new FormData(e.currentTarget).get('answer'));const correct=choice===l.answer;state.answers[id]={choice,correct,attempts:(state.answers[id]?.attempts||0)+1};persist();$('feedback').textContent=(correct?'答對了。':'再辨別一次。')+l.explanation;$('quiz-status').textContent=`已練習 ${state.answers[id].attempts} 次；最近一次${correct?'答對':'待複習'}。`;};
 }
 function image(src,alt){return `<div class="image-scroll"><button class="image-open" data-image-src="${src}" data-alt="${esc(alt)}" aria-label="放大${esc(alt)}"><img src="${src}" alt="${esc(alt)}"></button></div><div class="caption">點圖片放大；直式圖片可向下捲動閱讀。</div>`;}
 function bindImages(){document.querySelectorAll('[data-image-src]').forEach(b=>b.onclick=()=>{$('full-image').src=b.dataset.imageSrc;$('full-image').alt=b.dataset.alt;$('lightbox').showModal();});}
 function renderVisual(id,selection=0){
  const v=$('visual');
  if(id==='de'){v.innerHTML=image('assets/de-prefix.png','de- 從一般英文延伸到化學情境的教學圖');bindImages();return;}
  if(id==='solv'){
   const labels=['加入前','加入溶質','均勻分散','原教學圖'];
   const xs=selection===1?[[186,206],[198,206],[211,206],[224,206],[190,192],[205,192],[220,192]]:[[95,125],[132,163],[178,113],[220,152],[118,199],[190,198],[233,211]];
   const dots=selection===0?'':xs.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="#d5a65c" stroke="#99753f"/>`).join('');
   v.innerHTML=`<div class="tabs" aria-label="切換溶解階段">${labels.map((t,n)=>`<button data-visual="${n}" class="${n===selection?'active':''}" aria-pressed="${n===selection}">${t}</button>`).join('')}</div>`+(selection===3?image('assets/solv-main.webp','燒杯三兄弟：溶質、溶劑、溶液'):`<svg class="solution-svg" viewBox="0 0 330 285" role="img" aria-label="${labels[selection]}的燒杯粒子示意"><path d="M65 70 V230 Q65 245 80 245 H250 Q265 245 265 230 V70" fill="#f8fbfc" stroke="#688b8c" stroke-width="4"/><path d="M69 112 H261 V230 Q261 241 250 241 H80 Q69 241 69 230Z" fill="#dceef0"/>${dots}<text x="165" y="40" text-anchor="middle" font-size="20" fill="#225c48">${selection===0?'水：溶劑 solvent':selection===1?'加入鹽：溶質 solute':'均勻鹽水：溶液 solution'}</text><text x="165" y="274" text-anchor="middle" font-size="12" fill="#6b7d71">圓點表示溶質粒子，數量與大小不按比例</text></svg><p class="explanation">${['先辨認溶劑：這個例子使用水。','鹽加入水中。圖中先示意尚未均勻分散的狀態。','溶質粒子分散在水中；看不見原來的鹽粒，不代表鹽消失。'][selection]}</p>`);
  }else if(id==='bonds'){
   const variants=[['ethane','乙烷','C₂H₆',1],['ethene','乙烯','C₂H₄',2],['ethyne','乙炔','C₂H₂',3]];
   const t=variants[Math.min(selection,2)],b=t[3];let atoms='';
   for(const [x,side] of [[110,-1],[240,1]]){
    atoms+=`<text x="${x}" y="155" text-anchor="middle" font-size="34" fill="#243d33">C</text>`;
    const h=b===1?[[x+side*65,145],[x,70],[x,220]]:b===2?[[x,70],[x,220]]:[[x+side*65,145]];
    for(const [hx,hy] of h){atoms+=`<line x1="${x+(hx-x)*.25}" y1="${145+(hy-145)*.3}" x2="${hx-(hx-x)*.25}" y2="${hy-(hy-145)*.3}" stroke="#718574" stroke-width="3"/><text x="${hx}" y="${hy+8}" text-anchor="middle" font-size="23" fill="#6b7d71">H</text>`;}
   }
   const bond=Array.from({length:b},(_,i)=>`<line x1="136" y1="${145+(i-(b-1)/2)*10}" x2="214" y2="${145+(i-(b-1)/2)*10}" stroke="#225c48" stroke-width="4"/>`).join('');
   v.innerHTML=`<div class="tabs" aria-label="切換碳碳鍵">${[...variants.map(t=>t[0]+' '+t[1]),'原教學圖'].map((s,n)=>`<button data-visual="${n}" class="${n===selection?'active':''}" aria-pressed="${n===selection}">${s}</button>`).join('')}</div>`+(selection===3?image('assets/hydrocarbon-main.webp','烴類與 alkaline 的辨別圖'):`<div class="diagram-title">${t[0]} · ${t[1]} · ${t[2]}</div><div class="diagram-subtitle">${b===1?'碳碳單鍵':b===2?'碳碳雙鍵':'碳碳三鍵'} · 簡化平面結構</div><svg class="bond-svg" viewBox="0 0 350 270" role="img" aria-label="${t[1]}的平面結構：碳碳${b}鍵，每個碳連接${4-b}個氫">${bond}${atoms}</svg><p class="explanation">每個碳在這些分子中形成四個共價鍵。碳碳鍵由單鍵變成雙鍵、三鍵時，每個碳連接的氫數分別是 3、2、1。</p>`);
  }else if(id==='sugars'){
   const choices=[['mono-','單醣',1,'monosaccharide','1 個單醣單元，例如葡萄糖。'],['di-','雙醣',2,'disaccharide','2 個單醣單元連接，例如麥芽糖、蔗糖。'],['oligo-','寡醣',5,'oligosaccharide','這裡示意 5 個單元；本課採用的分類範圍為 3–9。'],['poly-','多醣',12,'polysaccharide','這裡示意 12 個單元；本課採用的分類範圍為 10 個以上。']];const c=choices[selection];
   v.innerHTML=`<div class="tabs" aria-label="切換醣類單元數">${choices.map((x,n)=>`<button data-visual="${n}" class="${n===selection?'active':''}" aria-pressed="${n===selection}">${x[0]} ${x[1]}</button>`).join('')}</div><div class="diagram-title">${c[3]}</div><div class="diagram-subtitle">${c[1]} · 圖中示意 ${c[2]} 個單醣單元</div><div class="sugar-units" role="img" aria-label="${c[2]}個單醣單元${c[2]>1?'彼此連接':''}的簡化示意">${Array.from({length:c[2]},()=>'<span class="sugar-unit" aria-hidden="true"></span>').join('')}</div><p class="explanation">${c[4]}</p><div class="caption">圓圈代表單元；不同單醣的真實結構與組成並不完全相同。</div>`;
  }
  v.querySelectorAll('[data-visual]').forEach(b=>b.onclick=()=>renderVisual(id,Number(b.dataset.visual)));bindImages();
 }
 function words(){
  $('content').innerHTML=`<div class="eyebrow">WORD FINDER</div><h1>查單字，也找回它的字根。</h1><p class="intro">541 個 V11 詞彙與 ${extensions.length} 個概念延伸詞分開標示。點星號加入待加強清單，點單字聽英文。</p><div class="search-panel"><input id="search" type="search" placeholder="搜尋英文、中文、字根或分類" aria-label="搜尋單字"><select id="scope" aria-label="選擇詞彙範圍"><option value="v11">V11 基準字彙</option><option value="all">含概念延伸</option><option value="starred">我的待加強</option></select><select id="category" aria-label="選擇分類"><option value="">全部分類</option>${[...new Set(bank.words.map(w=>w.group))].sort().map(g=>`<option value="${esc(g)}">${esc(g)}</option>`).join('')}</select></div><div id="results"></div>`;
  $('search').oninput=$('scope').onchange=$('category').onchange=()=>{searchPage=0;results();};results();
 }
 function results(){
  const q=$('search').value.trim().toLowerCase(),scope=$('scope').value,category=$('category').value;
  const pool=scope==='all'?[...bank.words,...extensions]:scope==='starred'?[...wordsByKey.values()].filter(w=>state.starred.includes(w.id)):bank.words;
  const filtered=pool.filter(w=>(!category||w.group===category)&&[w.en,w.zh,w.group,w.root||'',...(w.tags||[])].join(' ').toLowerCase().includes(q));
  const size=20,totalPages=Math.max(1,Math.ceil(filtered.length/size));searchPage=Math.min(searchPage,totalPages-1);
  $('results').innerHTML=`<div class="results-meta">找到 ${filtered.length} 個單字 · 每頁 ${size} 個</div><div class="table-wrap"><table class="word-table"><thead><tr><th>英文與範圍</th><th>中文與分類</th><th>待加強</th></tr></thead><tbody>${filtered.slice(searchPage*size,(searchPage+1)*size).map(w=>`<tr><td><button class="speak" data-speak="${esc(w.key)}" aria-label="播放 ${esc(w.en)} 的英文發音">♪ ${esc(w.en)}</button><br>${wordTag(w)}</td><td>${esc(w.zh)}<div class="group">${esc(w.group)}</div><details><summary>字根與教材資訊</summary><p>${esc(w.root||'')}</p><p>${esc(w.note||'')}</p><p>${wordSource(w)}</p>${w.source&&w.reviewStatus==='website-correction'?`<p>來源原譯：${esc(w.source.zh)}</p>`:''}</details></td><td><button class="star" data-star="${esc(w.id)}" aria-label="${esc(w.en)} 標記待加強" aria-pressed="${state.starred.includes(w.id)}">${state.starred.includes(w.id)?'★':'☆'}</button></td></tr>`).join('')||'<tr><td colspan="3">找不到符合的單字，試試其他關鍵字。</td></tr>'}</tbody></table></div><div class="pager"><button id="page-prev" ${searchPage===0?'disabled':''}>上一頁</button><span>${searchPage+1} / ${totalPages}</span><button id="page-next" ${searchPage>=totalPages-1?'disabled':''}>下一頁</button></div>`;
  $('page-prev').onclick=()=>{searchPage--;results();};$('page-next').onclick=()=>{searchPage++;results();};bindWords();
 }
 function review(){
  const starred=[...wordsByKey.values()].filter(w=>state.starred.includes(w.id));const wrong=lessons.filter(l=>state.answers[l.id]&&!state.answers[l.id].correct);
  $('content').innerHTML=`<div class="eyebrow">MY REVIEW</div><h1>把還不熟的，再看清楚一次。</h1><p class="intro">已學過 ${state.completed.length} / 4 課 · 待加強 ${starred.length} 字 · 最近答錯 ${wrong.length} 題。自我標記與回想題結果分開保存。</p><section class="review-card"><h2>我的待加強單字</h2>${starred.length?`<div class="words">${starred.map(w=>wordChip(w.key)).join('')}</div>`:'<p class="empty">在講義或查字頁點 ☆，就會出現在這裡。</p>'}</section><section class="review-card"><h2>回到答錯的概念</h2>${wrong.length?wrong.map(l=>`<p><a href="#lesson/${l.id}">${esc(l.title)}</a>：${esc(l.question)}</p>`).join(''):'<p class="empty">目前沒有待重看的回想題；完成一課後可以試著回答。</p>'}</section><section class="review-card"><h2>學過的課程</h2>${lessons.map(l=>`<p>${state.completed.includes(l.id)?'✓':'○'} <a href="#lesson/${l.id}">${esc(l.title)}</a></p>`).join('')}</section>`;bindWords();
 }
 function route(){stopSpeech();const hash=location.hash.replace(/^#/,'')||'home';document.querySelectorAll('nav a').forEach(a=>{const active=a.hash==='#'+hash||(hash.startsWith('lesson/')&&a.hash==='#home');if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});if(hash.startsWith('lesson/'))lesson(hash.slice(7));else if(hash==='words')words();else if(hash==='review')review();else home();document.title=(hash.startsWith('lesson/')?(lessonById.get(hash.slice(7))?.title||'圖文講義'):hash==='words'?'查單字':hash==='review'?'我的複習':'代表課預覽')+'｜PVQC 化學字根';window.scrollTo({top:0,behavior:'instant'});}
 $('close-image').onclick=()=>$('lightbox').close();window.addEventListener('hashchange',route);window.addEventListener('pagehide',stopSpeech);route();
})();
