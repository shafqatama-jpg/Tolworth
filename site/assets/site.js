
(function(){
var d=document,root=d.documentElement;root.classList.remove('no-js');
var reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced)root.classList.add('reduced');
var $=function(s,c){return (c||d).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||d).querySelectorAll(s))};
/* menu */
var b=$('.burger'),m=$('#menu');if(b&&m){b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);d.body.style.overflow=o?'hidden':'';d.body.classList.toggle('menu-open',o)});$$('#menu a').forEach(function(a){a.addEventListener('click',function(){m.classList.remove('open');d.body.style.overflow='';d.body.classList.remove('menu-open');b.setAttribute('aria-expanded',false)})})}
/* header solid */
var hd=$('header.site');function onS(){if(hd)hd.classList.toggle('solid',scrollY>60)}onS();addEventListener('scroll',onS,{passive:true});
/* forms */
$$('form[data-ajax]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();var msg=$('.formmsg',f),btn=$('button[type=submit]',f);if($('.hp input',f).value)return;btn.disabled=true;btn.textContent='Sending…';var o={};new FormData(f).forEach(function(v,k){if(k!=='_gotcha')o[k]=v});
fetch(f.action,{method:'POST',headers:{'Accept':'application/json','Content-Type':'application/json'},body:JSON.stringify(o)}).then(function(r){if(!r.ok)throw 0;f.reset();msg.className='formmsg ok';msg.textContent="Thank you — we've got your message and will be in touch shortly. For a faster reply, WhatsApp us on 07301 498451.";btn.textContent='Sent ✓'}).catch(function(){msg.className='formmsg err';msg.textContent='Sorry, that did not send. Please call 020 3143 1718 or WhatsApp 07301 498451.';btn.disabled=false;btn.textContent='Send enquiry'})})});
/* featurable lazy */
var rv=$('[data-featurable]');if(rv){var ld=function(){if(ld.x)return;ld.x=1;var s=d.createElement('script');s.src='https://featurable.com/assets/bundle.js';s.defer=true;s.charset='UTF-8';d.body.appendChild(s)};if('IntersectionObserver'in window){new IntersectionObserver(function(es,o){if(es[0].isIntersecting){ld();o.disconnect()}},{rootMargin:'600px'}).observe(rv)}else ld()}
/* wa ping */
setTimeout(function(){var w=$('.fab .wa');if(w)w.classList.add('ping')},8000);
/* map hotspots */
var tips=$$('[data-tip]');function showTip(i){var t=tips[i];if(!t)return;$('#tip-title').textContent=t.getAttribute('data-title');$('#tip-text').textContent=t.getAttribute('data-tip');tips.forEach(function(x,j){x.classList.toggle('active',j===i)});$$('.tipbtns button').forEach(function(x,j){x.classList.toggle('on',j===i)})}
tips.forEach(function(t,i){t.addEventListener('click',function(){showTip(i)});t.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();showTip(i)}})});$$('.tipbtns button').forEach(function(x,i){x.addEventListener('click',function(){showTip(i)})});if(tips.length)showTip(0);
/* price toggle */
$$('.toggle button').forEach(function(bt){bt.addEventListener('click',function(){$$('.toggle button').forEach(function(x){x.classList.toggle('on',x===bt);x.setAttribute('aria-pressed',x===bt)});$$('.pgroup').forEach(function(g){var on=g.id===bt.getAttribute('data-g');g.classList.toggle('on',on);if(on&&window.gsap&&!reduced){$$('[data-amt]',g).forEach(function(a){var v=+a.getAttribute('data-amt'),o={n:0};gsap.to(o,{n:v,duration:.9,ease:'power3.out',onUpdate:function(){a.textContent='£'+Math.round(o.n).toLocaleString('en-GB')}})});gsap.fromTo($$('.pcard',g),{y:30,opacity:0},{y:0,opacity:1,stagger:.08,duration:.6,ease:'power3.out'})}})})});
/* estimator */
var est=$('#est');if(est){var E=[["20–30 hours","Never driven: start with our 20 or 30-hour block, or a semi-intensive course."],["15–25 hours","A little experience: a 20-hour block or 20-hour intensive usually fits."],["8–15 hours","Lots of practice: a 10-hour block plus a mock test is often enough."],["2–6 hours","Test coming up: a mock test, a few lessons on the Tolworth routes and test cover."]];var upd=function(){var v=E[+est.value];$('#est-out').textContent=v[0];$('#est-text').textContent=v[1]};est.addEventListener('input',upd);upd()}
/* postcode checker */
var pc=$('#pc'),ok=['KT1','KT2','KT3','KT4','KT5','KT6','KT7','KT9','KT10','KT17','KT19','SW20','SM4'];if(pc){var run=function(e){if(e)e.preventDefault();var v=pc.value.toUpperCase().replace(/\s+/g,'');var out=$('#pc-out');if(v.length<2){out.textContent='';return}var oc=v.length>4?v.slice(0,-3):v;var yes=ok.indexOf(oc)>-1;out.innerHTML=yes?'✓ Yes — we cover '+oc+'. <a href="/book/" style="color:#FFB81C">Book now</a> or WhatsApp us.':'We may not cover '+oc+' yet — <a href="https://wa.me/447301498451" style="color:#FFB81C">WhatsApp us</a> and we\'ll check.'};$('#pcf').addEventListener('submit',run)}
/* fleet hotspot tap */
$$('.fhot button').forEach(function(x){x.addEventListener('click',function(){var p=x.parentNode;$$('.fhot').forEach(function(y){if(y!==p)y.classList.remove('open')});p.classList.toggle('open')})});
/* lesson preselect */
var q=new URLSearchParams(location.search).get('lesson'),sel=$('#lesson');if(q&&sel&&window.LESSONMAP&&LESSONMAP[q])sel.value=LESSONMAP[q];
if(!window.gsap||reduced){$$('.reveal').forEach(function(x){x.style.opacity=1;x.style.transform='none'});return}
gsap.registerPlugin(ScrollTrigger);
/* hero intro */
var hl=$$('.hero h1 .line>span');if(hl.length){var tl=gsap.timeline({defaults:{ease:'expo.out'}});tl.from('.hero-media img,.hero-media video',{scale:1.25,duration:2.2,ease:'power2.out'},0).from(hl,{yPercent:110,duration:1.2,stagger:.09},.15).from('.hero .lead,.hero .ctas,.kings-chip',{y:24,opacity:0,duration:.9,stagger:.08},.55).from('.hero-card',{y:40,opacity:0,duration:1},.8);
gsap.to('.hero-media',{yPercent:18,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}})}
/* page head */
if($('.pagehead .bg')){gsap.from('.pagehead h1,.pagehead .lead,.pagehead .ctas,.crumbs',{y:30,opacity:0,duration:1,stagger:.08,ease:'expo.out'});gsap.to('.pagehead .bg',{yPercent:12,ease:'none',scrollTrigger:{trigger:'.pagehead',start:'top top',end:'bottom top',scrub:true}})}
/* reveals */
$$('.reveal').forEach(function(el){gsap.to(el,{opacity:1,y:0,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 88%'}})});
$$('[data-stagger]').forEach(function(g){gsap.from(g.children,{y:50,opacity:0,duration:1,stagger:.08,ease:'expo.out',scrollTrigger:{trigger:g,start:'top 85%'}})});
$$('[data-parallax]').forEach(function(im){gsap.fromTo(im,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:im.parentNode,start:'top bottom',end:'bottom top',scrub:true}})});
$$('[data-count]').forEach(function(el){var v=+el.getAttribute('data-count'),pre=el.getAttribute('data-pre')||'',suf=el.getAttribute('data-suf')||'',o={n:0};ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:function(){gsap.to(o,{n:v,duration:1.8,ease:'power3.out',onUpdate:function(){el.textContent=pre+Math.round(o.n)+suf}})}})});
/* progress bar */
var pb=$('.progress');if(pb){gsap.to(pb,{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:true}})}
/* magnetic */
if(matchMedia('(pointer:fine)').matches){$$('.btn-amber,.magnetic').forEach(function(bt){bt.addEventListener('mousemove',function(e){var r=bt.getBoundingClientRect();gsap.to(bt,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.35,duration:.4})});bt.addEventListener('mouseleave',function(){gsap.to(bt,{x:0,y:0,duration:.6,ease:'elastic.out(1,.4)'})})})}
/* JOURNEY road */
var J=$('.journey');if(J){var road=$('.road',J),svg=$('svg',road),car=$('.car',J),paths,L=0,clip=$('#roadclip rect',J);
function build(){var w=road.clientWidth,h=road.clientHeight,mob=innerWidth<900;svg.setAttribute('viewBox','0 0 '+w+' '+h);var dd;
if(mob){var x=Math.max(22,(innerWidth-Math.min(innerWidth,1280))/2+26);dd='M'+x+' 0 L'+x+' '+h}else{var cx=w/2,amp=Math.min(110,w*.08),n=$$('.stop',J).length,seg=h/n;dd='M'+cx+' 0';for(var i=0;i<n;i++){var y0=i*seg,y1=(i+1)*seg,s=i%2?-1:1;dd+=' C'+(cx+s*amp*2)+' '+(y0+seg*.35)+' '+(cx-s*amp*2)+' '+(y0+seg*.65)+' '+cx+' '+y1}}
paths=$$('path',svg);paths.forEach(function(p){p.setAttribute('d',dd)});$$('.road-base,.road-edge',svg).forEach(function(p){p.style.strokeWidth=mob?'22px':'';});$('.road-edge',svg).style.strokeWidth=mob?'26px':'';L=paths[0].getTotalLength();place(st?st.progress:0)}
function place(p){if(!L)return;var w=road.clientWidth,h=road.clientHeight,len=L*p,a=paths[0].getPointAtLength(len),b2=paths[0].getPointAtLength(Math.min(L,len+2)),ang=Math.atan2(b2.y-a.y,b2.x-a.x)*180/Math.PI-90;if(len>=L-2)ang=0;
var off=road.offsetTop;gsap.set(car,{x:a.x,y:a.y+off,rotation:ang});clip.setAttribute('height',a.y+30)}
var st=ScrollTrigger.create({trigger:road,start:'top 55%',end:'bottom 55%',scrub:.6,onUpdate:function(s){place(s.progress)}});build();addEventListener('resize',function(){build();ScrollTrigger.refresh()});
$$('.stop',J).forEach(function(s){gsap.from($$('.stop-copy > *',s),{y:40,opacity:0,stagger:.08,duration:1,ease:'expo.out',scrollTrigger:{trigger:s,start:'top 75%'}});gsap.from($('.stop-media',s),{clipPath:'inset(15% 15% 15% 15% round 24px)',duration:1.4,ease:'expo.out',scrollTrigger:{trigger:s,start:'top 80%'}})})}
/* pass wall horizontal */
var pw=$('.passwall'),pt=$('.passtrack');if(pw&&pt&&matchMedia('(min-width:901px)').matches){gsap.to(pt,{x:function(){return -(pt.scrollWidth-innerWidth+48)},ease:'none',scrollTrigger:{trigger:pw,start:'center center',end:function(){return '+='+(pt.scrollWidth-innerWidth)},pin:true,scrub:.8,invalidateOnRefresh:true}})}
/* stacking lesson tiles subtle */
$$('.tile').forEach(function(t,i){gsap.from(t,{y:80,opacity:0,duration:1.1,ease:'expo.out',delay:(i%3)*.06,scrollTrigger:{trigger:t,start:'top 92%'}})});
})();
