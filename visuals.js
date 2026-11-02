(() => {
'use strict';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function image(src,alt){return `<div class="image-scroll"><button class="image-open" data-image-src="${src}" data-alt="${esc(alt)}" aria-label="放大${esc(alt)}"><img src="${src}" alt="${esc(alt)}"></button></div><div class="caption">點圖片放大；直式圖片可向下捲動閱讀。</div>`;}
window.PVQC_VISUAL_HTML=function(id,selection=0){
  if(id==='de'){return image('assets/de-prefix.png','de- 從一般英文延伸到化學情境的教學圖');}
  if(id==='solv'){
   const labels=['加入前','加入溶質','均勻分散','原教學圖'];
   const xs=selection===1?[[186,206],[198,206],[211,206],[224,206],[190,192],[205,192],[220,192]]:[[95,125],[132,163],[178,113],[220,152],[118,199],[190,198],[233,211]];
   const dots=selection===0?'':xs.map(([x,y])=>`<circle cx="${x}" cy="${y}" r="6" fill="#d5a65c" stroke="#99753f"/>`).join('');
   return `<div class="tabs" aria-label="切換溶解階段">${labels.map((t,n)=>`<button data-visual="${n}" class="${n===selection?'active':''}" aria-pressed="${n===selection}">${t}</button>`).join('')}</div>`+(selection===3?image('assets/solv-main.webp','燒杯三兄弟：溶質、溶劑、溶液'):`<svg class="solution-svg" viewBox="0 0 330 285" role="img" aria-label="${labels[selection]}的燒杯粒子示意"><path d="M65 70 V230 Q65 245 80 245 H250 Q265 245 265 230 V70" fill="#f8fbfc" stroke="#688b8c" stroke-width="4"/><path d="M69 112 H261 V230 Q261 241 250 241 H80 Q69 241 69 230Z" fill="#dceef0"/>${dots}<text x="165" y="40" text-anchor="middle" font-size="20" fill="#225c48">${selection===0?'水：溶劑 solvent':selection===1?'加入鹽：溶質 solute':'均勻鹽水：溶液 solution'}</text><text x="165" y="274" text-anchor="middle" font-size="12" fill="#6b7d71">圓點表示溶質粒子，數量與大小不按比例</text></svg><p class="explanation">${['先辨認溶劑：這個例子使用水。','鹽加入水中。圖中先示意尚未均勻分散的狀態。','溶質粒子分散在水中；看不見原來的鹽粒，不代表鹽消失。'][selection]}</p>`);
  }else if(id==='bonds'){
   const variants=[['ethane','乙烷','C₂H₆',1],['ethene','乙烯','C₂H₄',2],['ethyne','乙炔','C₂H₂',3]];
   const t=variants[Math.min(selection,2)],b=t[3];let atoms='';
   for(const [x,side] of [[110,-1],[240,1]]){
    atoms+=`<text x="${x}" y="155" text-anchor="middle" font-size="34" fill="#243d33">C</text>`;
    const h=b===1?[[x+side*65,145],[x,70],[x,220]]:b===2?[[x,70],[x,220]]:[[x+side*65,145]];
    for(const [hx,hy] of h){atoms+=`<line x1="${x+(hx-x)*.25}" y1="${145+(hy-145)*.3}" x2="${hx-(hx-x)*.25}" y2="${hy-(hy-145)*.3}" stroke="#718574" stroke-width="3"/><text x="${hx}" y="${hy+8}" text-anchor="middle" font-size="23" fill="#6b7d71">H</text>`;}
   }
   const bond=Array.from({length:b},(_,i)=>`<line x1="136" y1="${145+(i-(b-1)/2)*10}" x2="214" y2="${145+(i-(b-1)/2)*10}" stroke="#225c48" stroke-width="4"/>`).join('');
   return `<div class="tabs" aria-label="切換碳碳鍵">${[...variants.map(t=>t[0]+' '+t[1]),'原教學圖'].map((s,n)=>`<button data-visual="${n}" class="${n===selection?'active':''}" aria-pressed="${n===selection}">${s}</button>`).join('')}</div>`+(selection===3?image('assets/hydrocarbon-main.webp','烴類與 alkaline 的辨別圖'):`<div class="diagram-title">${t[0]} · ${t[1]} · ${t[2]}</div><div class="diagram-subtitle">${b===1?'碳碳單鍵':b===2?'碳碳雙鍵':'碳碳三鍵'} · 簡化平面結構</div><svg class="bond-svg" viewBox="0 0 350 270" role="img" aria-label="${t[1]}的平面結構：碳碳${b}鍵，每個碳連接${4-b}個氫">${bond}${atoms}</svg><p class="explanation">每個碳在這些分子中形成四個共價鍵。碳碳鍵由單鍵變成雙鍵、三鍵時，每個碳連接的氫數分別是 3、2、1。</p>`);
  }else if(id==='sugars'){
   const choices=[['mono-','單醣',1,'monosaccharide','1 個單醣單元，例如葡萄糖。'],['di-','雙醣',2,'disaccharide','2 個單醣單元連接，例如麥芽糖、蔗糖。'],['oligo-','寡醣',5,'oligosaccharide','這裡示意 5 個單元；本課採用的分類範圍為 3–9。'],['poly-','多醣',12,'polysaccharide','這裡示意 12 個單元；本課採用的分類範圍為 10 個以上。']];const c=choices[selection];
   return `<div class="tabs" aria-label="切換醣類單元數">${choices.map((x,n)=>`<button data-visual="${n}" class="${n===selection?'active':''}" aria-pressed="${n===selection}">${x[0]} ${x[1]}</button>`).join('')}</div><div class="diagram-title">${c[3]}</div><div class="diagram-subtitle">${c[1]} · 圖中示意 ${c[2]} 個單醣單元</div><div class="sugar-units" role="img" aria-label="${c[2]}個單醣單元${c[2]>1?'彼此連接':''}的簡化示意">${Array.from({length:c[2]},()=>'<span class="sugar-unit" aria-hidden="true"></span>').join('')}</div><p class="explanation">${c[4]}</p><div class="caption">圓圈代表單元；不同單醣的真實結構與組成並不完全相同。</div>`;
  }
};

})();
