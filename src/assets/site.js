(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  function closeMenu() { if(!menu) return; menu.setAttribute('aria-expanded','false'); nav.classList.remove('is-open'); }
  menu?.addEventListener('click', () => { const open=menu.getAttribute('aria-expanded')!=='true'; menu.setAttribute('aria-expanded',String(open)); nav.classList.toggle('is-open',open); });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown', e => {if(e.key==='Escape' && menu?.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  matchMedia('(min-width:901px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
  document.addEventListener('click', e => { if(menu?.getAttribute('aria-expanded')==='true' && !e.target.closest('.site-header')) closeMenu(); });
  const layers={
    data:{kicker:'The foundation',description:'Find the right data. Preserve its structure. Make it useful for learning.',link:'Explore data research',href:'#data-research'},
    models:{kicker:'The learning system',description:'Build language and multimodal models that turn high-quality data into useful capabilities.',link:'Explore foundation models',href:'#models-research'},
    agents:{kicker:'The feedback loop',description:'Connect models with tools, actions, and feedback. Optimize the system as a whole.',link:'Explore the next question',href:'#agents-research'}
  };
  const tabs=[...document.querySelectorAll('[data-layer]')];
  const visual=document.querySelector('.research-visual');
  function selectLayer(tab,focus=false){const key=tab.dataset.layer;const item=layers[key];tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1;});visual.dataset.active=key;document.querySelector('#loop-kicker').textContent=item.kicker;document.querySelector('#loop-description').textContent=item.description;const link=document.querySelector('#loop-link');link.textContent=item.link+' ↗';link.href=item.href;document.querySelector('#loop-panel').setAttribute('aria-labelledby',tab.id);if(focus)tab.focus();}
  tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectLayer(tab));tab.addEventListener('keydown',e=>{let next;if(e.key==='ArrowRight')next=(index+1)%tabs.length;if(e.key==='ArrowLeft')next=(index+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();selectLayer(tabs[next],true);}});});
  if(tabs.length)selectLayer(tabs[0]);
  const network=document.querySelector('#network-points');
  if(network){const ns='http://www.w3.org/2000/svg';const points=[];for(let i=0;i<64;i++){const a=i*2.399963;const radius=132*Math.sqrt((i+.5)/64);points.push([262+Math.cos(a)*radius,180+Math.sin(a)*radius*.87]);}for(let i=0;i<points.length;i++){for(let j=i+1;j<points.length;j++){const d=Math.hypot(points[i][0]-points[j][0],points[i][1]-points[j][1]);if(d<43){const line=document.createElementNS(ns,'line');line.setAttribute('x1',points[i][0]);line.setAttribute('y1',points[i][1]);line.setAttribute('x2',points[j][0]);line.setAttribute('y2',points[j][1]);line.setAttribute('stroke','#e60012');line.setAttribute('stroke-opacity',String(.12*(1-d/55)));network.append(line);}}const point=document.createElementNS(ns,'circle');point.setAttribute('cx',points[i][0]);point.setAttribute('cy',points[i][1]);point.setAttribute('r',i%7===0?'2':'1');point.setAttribute('fill',i%7===0?'#e60012':'#b66571');point.setAttribute('opacity',i%7===0?'.9':'.5');network.append(point);}}
  const search=document.querySelector('#paper-search');
  function setParam(key,value){const url=new URL(location.href);if(value)url.searchParams.set(key,value);else url.searchParams.delete(key);history.replaceState(null,'',url);}
  function filterPapers(){if(!search)return;const query=search.value.trim().toLocaleLowerCase();const rows=[...document.querySelectorAll('.archive-paper')];let count=0;rows.forEach(row=>{row.hidden=!row.textContent.toLocaleLowerCase().includes(query);if(!row.hidden)count++;});document.querySelector('#paper-count').textContent=`${count} of ${rows.length} publications and tutorials · * Equal contribution`;document.querySelector('#paper-empty').hidden=count!==0;}
  if(search){search.value=new URLSearchParams(location.search).get('q')||'';filterPapers();search.addEventListener('input',()=>{filterPapers();setParam('q',search.value.trim());});}
  const languageButtons=[...document.querySelectorAll('[data-language]')];
  function filterLanguage(language){languageButtons.forEach(b=>{const selected=b.dataset.language===language;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});let count=0;document.querySelectorAll('.post-item').forEach(post=>{post.hidden=language!=='all'&&post.dataset.lang!==language;if(!post.hidden)count++;});const empty=document.querySelector('.blog-body .filter-empty');if(empty)empty.hidden=count!==0;}
  languageButtons.forEach(button=>button.addEventListener('click',()=>{filterLanguage(button.dataset.language);setParam('lang',button.dataset.language==='all'?'':button.dataset.language);}));
  function restoreFilters(){if(search){search.value=new URLSearchParams(location.search).get('q')||'';filterPapers();}if(languageButtons.length){const language=new URLSearchParams(location.search).get('lang');filterLanguage(['en','zh'].includes(language)?language:'all');}}
  restoreFilters();window.addEventListener('popstate',restoreFilters);
  const progress=document.querySelector('#reading-progress');
  const article=document.querySelector('#article-content');
  if(progress&&article){let pending=false;function update(){const start=article.getBoundingClientRect().top+window.scrollY-window.innerHeight*.25;const length=Math.max(1,article.offsetHeight-window.innerHeight*.5);progress.style.transform='scaleX('+Math.max(0,Math.min(1,(window.scrollY-start)/length))+')';pending=false;}window.addEventListener('scroll',()=>{if(!pending){pending=true;requestAnimationFrame(update);}},{passive:true});window.addEventListener('resize',update);update();}
})();
