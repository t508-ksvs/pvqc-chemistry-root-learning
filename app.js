(() => {
  'use strict';
  const lessons = window.PVQC_LESSONS;
  const $ = id => document.getElementById(id);
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let learned = new Set();
  try { const stored = JSON.parse(localStorage.getItem('pvqc-chemistry-learned-v1') || '[]'); if (Array.isArray(stored)) learned = new Set(stored.filter(id => lessons.some(l => l.id === id))); } catch {}
  let page = 0, imageIndex = 0, speechRun = 0, toastTimer;
  function status(message) { $('status').textContent = message; $('status').style.display='block'; clearTimeout(toastTimer); toastTimer=setTimeout(() => $('status').style.display='none',3500); }
  function stopSpeech() { speechRun++; if ('speechSynthesis' in window) window.speechSynthesis.cancel(); }
  function speak(words) {
    stopSpeech();
    if (!('speechSynthesis' in window)) return status('此瀏覽器未提供語音，請換用支援語音的瀏覽器。');
    const run=speechRun; let index=0;
    const next = () => {
      if (run!==speechRun || index>=words.length) return;
      const utterance = new SpeechSynthesisUtterance(words[index++]); utterance.lang='en-US'; utterance.rate=.82;
      const voices=window.speechSynthesis.getVoices(); const voice=voices.find(v=>v.lang==='en-US') || voices.find(v=>v.lang.startsWith('en'));
      if(voice) utterance.voice=voice;
      utterance.onend=next; utterance.onerror=() => { if(run===speechRun) status('語音播放未完成，請確認裝置聲音設定後再試。'); };
      window.speechSynthesis.speak(utterance);
    }; next();
  }
  function syncProgress() {
    $('progress').textContent=`已學會 ${learned.size} / ${lessons.length} 個主題`;
    $('position').textContent=`${page+1} / ${lessons.length+1}`;
    $('prev').disabled=page===0; $('next').disabled=page===lessons.length;
  }
  function render() {
    stopSpeech(); imageIndex=0;
    if (page===0) {
      $('main').innerHTML=`<section class="hero"><div><div class="eyebrow">PVQC CHEMISTRY · VISUAL LEARNING</div><h1>把化學長單字，<br>讀成看得懂的<br><em>字根故事。</em></h1><p>從物質、結構到能量與過程，跟著圖片拆解單字，再用聲音與回想把概念留下來。</p><div class="pill-row"><span class="pill">14 個學習主題</span><span class="pill">19 張原創圖像</span><span class="pill">英文發音 × 主動回想</span></div><button class="primary" id="start">開始探索 →</button><p class="subtle">先看圖理解，再聽單字，最後合上答案試著回想。</p></div><div class="hero-figure"><img class="cover-image" src="assets/group-1.webp" alt="化學字根第一組：物質構成與基礎元素"></div></section>`;
      $('start').onclick=()=>go(1);
    } else {
      const l=lessons[page-1];
      $('main').innerHTML=`<article class="lesson"><div class="lesson-heading"><span class="eyebrow">LESSON ${String(page).padStart(2,'0')} / ${lessons.length}</span><span class="rule"></span><span class="eyebrow">${escape(l.group)}</span></div><div class="lesson-layout"><div class="lesson-copy"><div class="root">${escape(l.root)}</div><h1>${escape(l.title)}</h1><p class="lead">${escape(l.lead)}</p><p class="story">${escape(l.story)}</p><section class="vocabulary"><h2 class="section-label">WORD FAMILY · 點單字聽發音</h2><div class="word-list">${l.words.map((w,i)=>`<button class="word" data-word="${i}" aria-label="播放 ${escape(w.en)} 的英文發音"><strong>♪ ${escape(w.en)}</strong><span>${escape(w.zh)}</span></button>`).join('')}</div><div class="utility"><button id="play-all">♪ 全部聽一次</button><button id="stop">停止</button><button id="toggle-zh" aria-pressed="false">隱藏中文</button></div></section><button class="master ${learned.has(l.id)?'learned':''}" id="master" aria-pressed="${learned.has(l.id)}">${learned.has(l.id)?'✓ 已學會 · 再點可取消':'＋ 標記為已學會'}</button></div><div class="image-column"><section class="image-panel"><div class="image-tabs" role="group" aria-label="切換學習圖片">${l.images.map((im,i)=>`<button data-image="${i}" class="${i===0?'active':''}" aria-pressed="${i===0}">${escape(im.label)}</button>`).join('')}</div><button class="image-open" id="open-image" aria-label="放大目前圖片"><img class="lesson-image" id="lesson-image" src="${l.images[0].src}" alt="${escape(l.images[0].label)}"></button><div class="image-hint"><span>點圖片放大 · 放大後可捲動閱讀</span><span>Ms. Chang</span></div></section><section class="recall"><h2 class="section-label">ACTIVE RECALL · 先想一想</h2><p>${escape(l.question)}</p><button id="reveal" aria-expanded="false">看解答</button><p class="answer" id="answer" hidden>${escape(l.answer)}</p></section>${l.note?`<aside class="note"><b>閱讀提醒</b><br>${escape(l.note)}</aside>`:''}</div></div></article>`;
      document.querySelectorAll('[data-word]').forEach(btn=>btn.onclick=()=>speak([l.words[Number(btn.dataset.word)].en]));
      document.querySelectorAll('[data-image]').forEach(btn=>btn.onclick=()=>{
        imageIndex=Number(btn.dataset.image); const im=l.images[imageIndex]; $('lesson-image').src=im.src; $('lesson-image').alt=im.label;
        document.querySelectorAll('[data-image]').forEach(b=>{const active=b===btn;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
      });
      $('play-all').onclick=()=>speak(l.words.map(w=>w.en)); $('stop').onclick=stopSpeech;
      $('toggle-zh').onclick=()=>{const hidden=document.querySelector('.word-list').classList.toggle('hide-zh');$('toggle-zh').textContent=hidden?'顯示中文':'隱藏中文';$('toggle-zh').setAttribute('aria-pressed',String(hidden));};
      $('reveal').onclick=()=>{const open=$('answer').hidden;$('answer').hidden=!open;$('reveal').setAttribute('aria-expanded',String(open));$('reveal').textContent=open?'收起解答':'看解答';};
      $('open-image').onclick=()=>{const im=l.images[imageIndex];$('large-image').src=im.src;$('large-image').alt=im.label;$('image-dialog').showModal();};
      $('master').onclick=()=>{
        if(learned.has(l.id)) learned.delete(l.id);else learned.add(l.id);
        let saved=true;try{localStorage.setItem('pvqc-chemistry-learned-v1',JSON.stringify([...learned]));}catch{saved=false;}
        const done=learned.has(l.id);$('master').classList.toggle('learned',done);$('master').setAttribute('aria-pressed',String(done));$('master').textContent=done?'✓ 已學會 · 再點可取消':'＋ 標記為已學會';syncProgress();
        if(!saved) status('目前可標記進度，但此瀏覽器無法在下次開啟時保留。');
      };
    }
    syncProgress(); document.title=(page?lessons[page-1].title+'｜':'')+'PVQC 化學字根圖文講義';
    window.scrollTo({top:0,behavior:'instant'});
  }
  function go(n){ const safe=Math.max(0,Math.min(lessons.length,n));const hash=safe?'#'+lessons[safe-1].id:'#home';if(location.hash===hash){page=safe;render();}else location.hash=hash; }
  function fromHash(){const index=lessons.findIndex(l=>'#'+l.id===location.hash);page=index<0?0:index+1;render();}
  function renderGrid(){const query=$('search').value.trim().toLowerCase();const filtered=lessons.filter(l=>JSON.stringify(l).toLowerCase().includes(query));$('grid').innerHTML=filtered.map(l=>`<button class="course-card" data-lesson="${l.id}"><img src="${l.images[0].src}" alt="" loading="lazy"><div class="card-text"><small>${escape(l.root)}</small>${learned.has(l.id)?'<span class="badge">✓ 已學會</span>':''}<h3>${escape(l.title)}</h3></div></button>`).join('')||'<p class="empty">找不到這個主題，試試其他字根或單字。</p>';document.querySelectorAll('[data-lesson]').forEach(b=>b.onclick=()=>{$('grid-dialog').close();go(lessons.findIndex(l=>l.id===b.dataset.lesson)+1);});}
  $('overview').onclick=()=>{renderGrid();$('grid-dialog').showModal();};$('search').oninput=renderGrid;
  $('prev').onclick=()=>go(page-1);$('next').onclick=()=>go(page+1);
  document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).close());
  async function fullscreen(){try{if(document.fullscreenElement) await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{status('此瀏覽器未提供全螢幕，仍可正常閱讀。');}} $('full').onclick=fullscreen;
  document.addEventListener('keydown',e=>{
    if(e.target.closest('input,textarea,select,button,a')||document.querySelector('dialog[open]'))return;
    if(e.key==='ArrowRight'||e.code==='Space'){e.preventDefault();go(page+1);}else if(e.key==='ArrowLeft'){e.preventDefault();go(page-1);}else if(e.key.toLowerCase()==='o') $('overview').click();else if(e.key.toLowerCase()==='f') fullscreen();
  });
  let touchStart=null;
  $('main').addEventListener('touchstart',e=>{touchStart=e.touches.length===1?{x:e.touches[0].clientX,y:e.touches[0].clientY}:null;},{passive:true});
  $('main').addEventListener('touchend',e=>{if(!touchStart||!e.changedTouches.length)return;const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;touchStart=null;if(Math.abs(dx)>90&&Math.abs(dx)>Math.abs(dy)*2&&!e.target.closest('button,a'))go(page+(dx<0?1:-1));},{passive:true});
  window.addEventListener('hashchange',fromHash);window.addEventListener('pagehide',stopSpeech);fromHash();
})();
