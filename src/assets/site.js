(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  function closeMenu() { if(!menu) return; menu.setAttribute('aria-expanded','false'); nav.classList.remove('is-open'); }
  menu?.addEventListener('click', () => { const open=menu.getAttribute('aria-expanded')!=='true'; menu.setAttribute('aria-expanded',String(open)); nav.classList.toggle('is-open',open); });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown', e => {if(e.key==='Escape' && menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  matchMedia('(min-width:1101px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  document.addEventListener('click', e => { if(menu?.getAttribute('aria-expanded')==='true' && !e.target.closest('.site-header')) closeMenu(); });
  const tabs=[...document.querySelectorAll('[data-layer]')];
  const visual=document.querySelector('.research-visual');
  function selectLayer(tab,focus=false){const key=tab.dataset.layer;const item={kicker:tab.dataset.kicker,description:tab.dataset.description,link:tab.dataset.link,href:tab.dataset.href};tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1;});visual.dataset.active=key;document.querySelector('#loop-kicker').textContent=item.kicker;document.querySelector('#loop-description').textContent=item.description;const link=document.querySelector('#loop-link');link.textContent=item.link+' ↗';link.href=item.href;document.querySelector('#loop-panel').setAttribute('aria-labelledby',tab.id);if(focus)tab.focus();}
  tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectLayer(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectLayer(tabs[next],true);}});});
  if(tabs.length)selectLayer(tabs[0]);
  const network=document.querySelector('#network-points');
  if(network){const ns='http://www.w3.org/2000/svg';const points=[];for(let i=0;i<64;i++){const a=i*2.399963;const radius=132*Math.sqrt((i+.5)/64);points.push([262+Math.cos(a)*radius,180+Math.sin(a)*radius*.87]);}for(let i=0;i<points.length;i++){for(let j=i+1;j<points.length;j++){const d=Math.hypot(points[i][0]-points[j][0],points[i][1]-points[j][1]);if(d<43){const line=document.createElementNS(ns,'line');line.setAttribute('x1',points[i][0]);line.setAttribute('y1',points[i][1]);line.setAttribute('x2',points[j][0]);line.setAttribute('y2',points[j][1]);line.setAttribute('stroke','#e60012');line.setAttribute('stroke-opacity',String(.12*(1-d/55)));network.append(line);}}const point=document.createElementNS(ns,'circle');point.setAttribute('cx',points[i][0]);point.setAttribute('cy',points[i][1]);point.setAttribute('r',i%7===0?'2':'1');point.setAttribute('fill',i%7===0?'#e60012':'#b66571');point.setAttribute('opacity',i%7===0?'.9':'.5');network.append(point);}}
  const search=document.querySelector('#paper-search');
  function setParam(key,value){const url=new URL(location.href);if(value)url.searchParams.set(key,value);else url.searchParams.delete(key);history.replaceState(null,'',url);}
  function filterPapers(){if(!search)return;const query=search.value.trim().toLocaleLowerCase();const rows=[...document.querySelectorAll('.archive-paper')];let count=0;rows.forEach(row=>{row.hidden=!row.textContent.toLocaleLowerCase().includes(query);if(!row.hidden)count++;});const status=document.querySelector('#paper-count');status.textContent=status.dataset.template.replace('{count}',count).replace('{total}',rows.length)+' · '+status.dataset.equal;document.querySelector('#paper-empty').hidden=count!==0;}
  if(search){search.value=new URLSearchParams(location.search).get('q')||'';filterPapers();search.addEventListener('input',()=>{filterPapers();setParam('q',search.value.trim());});}
  function restoreFilters(){if(search){search.value=new URLSearchParams(location.search).get('q')||'';filterPapers();}}
  window.addEventListener('popstate',restoreFilters);
  document.querySelectorAll('[data-locale-link]').forEach(link=>link.addEventListener('click',()=>{const url=new URL(link.href);if(location.hash)url.hash=location.hash;const query=new URLSearchParams(location.search).get('q');if(query&&search)url.searchParams.set('q',query);link.href=url.href;}));
  // Only published article pages contact the counter; local previews never count.
  const viewCount = document.querySelector('[data-view-count]');
  if (viewCount && location.hostname === 'dongyuyang.github.io') {
    const value = document.querySelector('#busuanzi_value_page_pv');
    const counter = document.createElement('script');
    let finished = false;
    const unavailable = () => {
      if (finished) return;
      value.textContent = viewCount.dataset.unavailable;
      viewCount.dataset.state = 'unavailable';
    };
    const observer = new MutationObserver(() => {
      const raw = value.textContent.trim();
      if (!/^\d+$/.test(raw) || !Number.isSafeInteger(Number(raw))) return;
      finished = true;
      clearTimeout(timeout);
      observer.disconnect();
      value.textContent = Number(raw).toLocaleString(document.documentElement.lang);
      viewCount.dataset.state = 'ready';
    });
    observer.observe(value, { childList: true, subtree: true, characterData: true });
    const timeout = setTimeout(unavailable, 10000);
    counter.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    counter.async = true;
    counter.onerror = unavailable;
    document.head.append(counter);
  }
  const progress=document.querySelector('#reading-progress');
  const article=document.querySelector('#article-content');
  if(progress&&article){let pending=false;function update(){const start=article.getBoundingClientRect().top+window.scrollY-window.innerHeight*.25;const length=Math.max(1,article.offsetHeight-window.innerHeight*.5);progress.style.transform='scaleX('+Math.max(0,Math.min(1,(window.scrollY-start)/length))+')';pending=false;}window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});window.addEventListener('resize',update);update();}
})();
