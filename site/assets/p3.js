
(function(){
var d=document,H=d.documentElement,$=function(s,c){return(c||d).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches||H.classList.contains('a11y-pause');
var G=window.gsap&&!reduced?window.gsap:null;
function fmt(n){return '£'+Math.round(n).toLocaleString('en-GB')}
function roll(el,to){var from=+(el.getAttribute('data-cur')||0);el.setAttribute('data-cur',to);if(!G){el.textContent=fmt(to);return}var o={n:from};G.to(o,{n:to,duration:1,ease:'power3.out',onUpdate:function(){el.textContent=fmt(o.n)}})}
/* ---- PRICE TABS ---- */
$$('.ptabs').forEach(function(tb){var pill=$('.pill',tb),btns=$$('button',tb);
 function place(b){pill.style.width=b.offsetWidth+'px';pill.style.transform='translateX('+(b.offsetLeft-6)+'px)'}
 function show(b){btns.forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-selected',x===b)});place(b);var id=b.getAttribute('data-t');
  $$('.tiers').forEach(function(g){var on=g.id===id;g.classList.toggle('on',on);if(on){$$('[data-price]',g).forEach(function(p){roll(p,+p.getAttribute('data-price')+(p.getAttribute('data-add')?+p.getAttribute('data-add'):0))});if(G)G.fromTo($$('.tier',g),{y:40,opacity:0},{y:function(i,el){return el.classList.contains('feat')&&innerWidth>900?-24:0},opacity:1,stagger:.08,duration:.7,ease:'expo.out',clearProps:'opacity'});ticks(g);dots(g);if(innerWidth<=900){var f=$('.tier.feat',g);if(f)g.scrollLeft=f.offsetLeft-g.clientWidth*.08}}})}
 btns.forEach(function(b){b.addEventListener('click',function(){show(b)})});requestAnimationFrame(function(){place($('button.on',tb)||btns[0])});addEventListener('resize',function(){place($('button.on',tb)||btns[0])})});
$$('.transw button').forEach(function(b){b.addEventListener('click',function(){$$('.transw button').forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});var s=$('.samebadge');if(s){s.classList.remove('show');void s.offsetWidth;s.classList.add('show')}})});
$$('.addon input').forEach(function(cb){cb.addEventListener('change',function(){var t=cb.closest('.tier'),p=$('[data-price]',t),base=+p.getAttribute('data-price');p.setAttribute('data-add',cb.checked?150:0);roll(p,base+(cb.checked?150:0));var l=$('.addlabel',t);if(l)l.textContent=cb.checked?'incl. test cover':''})});
function ticks(g){$$('.tier li svg path',g).forEach(function(p,i){if(!G)return;G.fromTo(p,{strokeDashoffset:24},{strokeDashoffset:0,duration:.5,delay:.3+i*.05,ease:'power2.out'})})}
function dots(g){var dw=g.nextElementSibling;if(!dw||!dw.classList.contains('tdots'))return;var n=$$('.tier',g).length;dw.innerHTML=new Array(n+1).join('<i></i>');var upd=function(){var w=g.scrollWidth/n,i=Math.round(g.scrollLeft/w);$$('i',dw).forEach(function(x,j){x.classList.toggle('on',j===i)})};g.onscroll=upd;upd()}
if('IntersectionObserver'in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var g=e.target;$$('[data-price]',g).forEach(function(p){roll(p,+p.getAttribute('data-price'))});ticks(g);io.unobserve(g)}})},{threshold:.25});$$('.tiers.on').forEach(function(g){io.observe(g);dots(g);if(innerWidth<=900){var f=$('.tier.feat',g);if(f)setTimeout(function(){g.scrollLeft=f.offsetLeft-g.clientWidth*.08},50)}})}else{$$('[data-price]').forEach(function(p){p.textContent=fmt(+p.getAttribute('data-price'))})}
if(matchMedia('(pointer:fine)').matches&&!reduced){$$('.tier').forEach(function(t){t.addEventListener('pointermove',function(e){var r=t.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;t.style.setProperty('--mx',x*100+'%');t.style.setProperty('--my',y*100+'%');t.style.transform=(t.classList.contains('feat')?'translateY(-24px) ':'')+'perspective(900px) rotateX('+((.5-y)*6)+'deg) rotateY('+((x-.5)*6)+'deg)'});t.addEventListener('pointerleave',function(){t.style.transform=''})})}
/* ---- YOUTUBE FACADE ---- */
$$('button.yt').forEach(function(b){b.addEventListener('click',function(){var id=b.getAttribute('data-id');var f=d.createElement('iframe');f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0&playsinline=1';f.allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';f.allowFullscreen=true;f.title=b.getAttribute('aria-label');b.appendChild(f)},{once:true})});
/* ---- FLIP CARDS ---- */
$$('.flip').forEach(function(f){f.addEventListener('click',function(){f.classList.toggle('on');f.setAttribute('aria-pressed',f.classList.contains('on'))})});
var sh=$('#shuffle');if(sh)sh.addEventListener('click',function(){var w=$('.flips');var c=$$('.flip',w);c.forEach(function(x){x.classList.remove('on')});for(var i=c.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));w.appendChild(c[j]);c.splice(j,1)}if(G)G.from($$('.flip',w),{y:20,opacity:0,stagger:.03,duration:.4})});
/* ---- QUIZ ---- */
var QZ=window.TDS_QUIZ,qb=$('#quiz');if(QZ&&qb){var qi=0,score=0;function render(){if(qi>=QZ.length){$('#q-text').textContent='You scored '+score+' out of '+QZ.length+'!';$('#q-opts').innerHTML='<button type=button id=q-again>Try again</button>';$('#q-again').onclick=function(){qi=0;score=0;render()};$('#q-exp').textContent=score>=8?'Great work — you know your signs.':'Worth another look at the Highway Code signs section.';$('.qbar i').style.width='100%';if(score>=8)car();return}
var q=QZ[qi];$('#q-n').textContent='Question '+(qi+1)+' of '+QZ.length;$('#q-text').textContent=q.q;$('#q-exp').textContent='';$('.qbar i').style.width=(qi/QZ.length*100)+'%';$('#q-opts').innerHTML='';q.a.forEach(function(t,i){var b=d.createElement('button');b.type='button';b.textContent=t;b.onclick=function(){$$('#q-opts button').forEach(function(x,j){x.disabled=true;if(j===q.c)x.classList.add('right')});if(i===q.c)score++;else b.classList.add('wrong');$('#q-exp').textContent=q.e;setTimeout(function(){qi++;render()},1700)};$('#q-opts').appendChild(b)})}
function car(){var c=$('.qcar');if(!c||!G)return;G.fromTo(c,{x:0},{x:innerWidth+240,duration:2.2,ease:'power2.inOut'})}render()}
/* ---- CHECKLIST ---- */
var KEY='tdsChecklist',st={};try{st=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){}
$$('.checklist input').forEach(function(cb){cb.checked=!!st[cb.id];cb.addEventListener('change',function(){st[cb.id]=cb.checked;try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){}})});
var pr=$('#printlist');if(pr)pr.addEventListener('click',function(){window.print()});
/* ---- COST CALC ---- */
var hs=$('#hours');if(hs){var calc=function(){var h=+hs.value,payg=h*40,r=h,cost=0;[[30,1050],[20,730],[10,370]].forEach(function(p){while(r>=p[0]){cost+=p[1];r-=p[0]}});cost+=r*40;$('#h-out').textContent=h+' hours';$('#payg').textContent=fmt(payg);$('#blk').textContent=fmt(cost);$('#sv').textContent=fmt(payg-cost)};hs.addEventListener('input',calc);calc()}
/* ---- BLOG FILTER ---- */
$$('.chips button').forEach(function(b){b.addEventListener('click',function(){$$('.chips button').forEach(function(x){x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});var c=b.getAttribute('data-c');$$('.post').forEach(function(p){p.classList.toggle('hide',c!=='all'&&p.getAttribute('data-c')!==c)});if(G)G.from($$('.post:not(.hide)'),{y:20,opacity:0,stagger:.04,duration:.5})})});
/* ---- TOC ---- */
var tl=$$('.toc a');if(tl.length&&'IntersectionObserver'in window){var io2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){tl.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-20% 0px -70% 0px'});$$('.article .prose h2[id]').forEach(function(h){io2.observe(h)})}
/* ---- ACCESSIBILITY TOOLBAR ---- */
var K='tdsA11y',S={};try{S=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
var ICON='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="4.2" r="2.2"/><path d="M4.5 7.6c-.5-.2-1 .1-1.2.6s.1 1 .6 1.2c1.9.7 3.9 1.1 5.6 1.2v3.2l-1.9 6.1c-.2.5.1 1.1.7 1.2.5.2 1.1-.1 1.2-.7L11.4 15h1.2l1.9 5.4c.2.5.7.8 1.2.7.5-.2.8-.7.7-1.2l-1.9-6.1v-3.2c1.7-.1 3.7-.5 5.6-1.2.5-.2.8-.7.6-1.2s-.7-.8-1.2-.6C17 8.4 14.4 8.8 12 8.8s-5-.4-7.5-1.2z"/></svg>';
var TOG=[['readable','Readable font','Aa'],['contrast','High contrast','◐'],['dark','Dark mode','☾'],['mono','Monochrome','▦'],['links','Highlight links','🔗'],['headings','Highlight headings','H'],['cursor','Big cursor','➤'],['guide','Reading guide','═'],['ls','Letter spacing','A↔'],['pause','Pause animations','❚❚'],['noimg','Hide images','▢']];
var btn=d.createElement('button');btn.className='a11y-btn';btn.type='button';btn.setAttribute('aria-label','Accessibility options');btn.setAttribute('aria-expanded','false');btn.innerHTML=ICON;d.body.appendChild(btn);var mb=d.querySelector('.mbar');function dock(){if(!mb)return;if(matchMedia('(max-width:760px)').matches){if(btn.parentNode!==mb)mb.insertBefore(btn,mb.firstChild)}else if(btn.parentNode!==d.body)d.body.appendChild(btn)}dock();addEventListener('resize',dock);
var guide=d.createElement('div');guide.className='a11y-guide';guide.setAttribute('aria-hidden','true');d.body.appendChild(guide);
var P=d.createElement('div');P.className='a11y-panel';P.setAttribute('role','dialog');P.setAttribute('aria-modal','true');P.setAttribute('aria-label','Accessibility adjustments');P.setAttribute('hidden','');
P.innerHTML='<div class="a11y-head"><button class="a11y-close" type="button" aria-label="Close accessibility options">✕</button><div class="ico">'+ICON+'</div><h2>Accessibility adjustments</h2><small><a href="/accessibility/">Accessibility statement</a> · <button type="button" data-a="hide">Hide toolbar</button></small></div>'+
'<div class="a11y-body"><h3>Content</h3><div class="a11y-grid">'+
'<div class="a11y-tile wide">Font size<div class="a11y-step"><button type="button" data-step="fs" data-d="-1" aria-label="Smaller text">−</button><span id="a11y-fs">Default</span><button type="button" data-step="fs" data-d="1" aria-label="Bigger text">+</button></div></div>'+
'<div class="a11y-tile wide">Line height<div class="a11y-step"><button type="button" data-step="lh" data-d="-1" aria-label="Less line height">−</button><span id="a11y-lh">Default</span><button type="button" data-step="lh" data-d="1" aria-label="More line height">+</button></div></div>'+
TOG.map(function(t){return '<button type="button" class="a11y-tile" data-tog="'+t[0]+'" aria-pressed="false"><span aria-hidden="true" style="font-size:1.3rem;font-weight:700">'+t[2]+'</span>'+t[1]+'</button>'}).join('')+
'<button type="button" class="a11y-tile wide" data-a="speak" aria-pressed="false"><span aria-hidden="true" style="font-size:1.3rem">🔊</span><span class="sp-l">Read page aloud</span></button>'+
'</div><button type="button" class="a11y-reset" data-a="reset">Reset all settings</button></div>';
d.body.appendChild(P);
var FS=[1,1.12,1.25,1.4],LH=[0,1.9,2.2,2.5];
function apply(){var c=H.classList;TOG.forEach(function(t){c.toggle('a11y-'+t[0],!!S[t[0]])});c.toggle('a11y-guide-on',!!S.guide);c.toggle('a11y-hidebar',!!S.hide);
 var fs=S.fs||0;H.style.setProperty('--fs',FS[fs]);H.style.fontSize=(FS[fs]*100)+'%';var fl=$('#a11y-fs');if(fl)fl.textContent=fs?('+'+fs):'Default';
 var lh=S.lh||0;c.toggle('a11y-lh',lh>0);if(lh)H.style.setProperty('--lhv',LH[lh]);var ll=$('#a11y-lh');if(ll)ll.textContent=lh?('+'+lh):'Default';
 $$('[data-tog]',P).forEach(function(b){b.setAttribute('aria-pressed',!!S[b.getAttribute('data-tog')])});
 if(window.gsap){S.pause?gsap.globalTimeline.pause():gsap.globalTimeline.resume()}}
apply();
function open(){P.removeAttribute('hidden');requestAnimationFrame(function(){P.classList.add('open')});btn.setAttribute('aria-expanded','true');setTimeout(function(){$('.a11y-close',P).focus()},50)}
function close(){P.classList.remove('open');btn.setAttribute('aria-expanded','false');setTimeout(function(){P.setAttribute('hidden','')},500);btn.focus()}
btn.addEventListener('click',open);$('.a11y-close',P).addEventListener('click',close);
P.addEventListener('keydown',function(e){if(e.key==='Escape')close();if(e.key==='Tab'){var f=$$('button,a',P).filter(function(x){return x.offsetParent!==null}),a=f[0],z=f[f.length-1];if(e.shiftKey&&d.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&d.activeElement===z){e.preventDefault();a.focus()}}});
P.addEventListener('click',function(e){var t=e.target.closest('button');if(!t)return;
 if(t.hasAttribute('data-tog')){var k=t.getAttribute('data-tog');S[k]=!S[k];if(k==='contrast'&&S[k]){S.dark=false;S.mono=false}if((k==='dark'||k==='mono')&&S[k])S.contrast=false;save();apply()}
 else if(t.hasAttribute('data-step')){var k2=t.getAttribute('data-step');S[k2]=Math.max(0,Math.min(3,(S[k2]||0)+ +t.getAttribute('data-d')));save();apply()}
 else if(t.getAttribute('data-a')==='reset'){S={};save();apply();if(window.speechSynthesis)speechSynthesis.cancel()}
 else if(t.getAttribute('data-a')==='hide'){S.hide=true;save();apply();close()}
 else if(t.getAttribute('data-a')==='speak'){if(!window.speechSynthesis)return;if(speechSynthesis.speaking){speechSynthesis.cancel();t.setAttribute('aria-pressed','false');$('.sp-l',t).textContent='Read page aloud';return}var u=new SpeechSynthesisUtterance(($('main')||d.body).innerText.slice(0,12000));u.lang='en-GB';u.onend=function(){t.setAttribute('aria-pressed','false');$('.sp-l',t).textContent='Read page aloud'};speechSynthesis.speak(u);t.setAttribute('aria-pressed','true');$('.sp-l',t).textContent='Stop reading'}});
addEventListener('pointermove',function(e){if(S.guide)guide.style.top=(e.clientY-7)+'px'},{passive:true});
var lg=$('footer .legal span:last-child');if(lg){var a=d.createElement('a');a.href='#';a.textContent='Accessibility options';a.addEventListener('click',function(e){e.preventDefault();S.hide=false;save();apply();open()});lg.appendChild(d.createTextNode(' · '));lg.appendChild(a)}
})();
