/* Welcome splash + promo card — Paradise Valley Lodge
   Pour un autre site : modifier uniquement la section CONFIG ci-dessous. */
(function(){
  /* ===== CONFIG ===== */
  var PROMOS=[
  {
    "k": "Séjour nature",
    "t": "Bungalows en pension complète",
    "x": "Dormez entre forêt tropicale et baie d’Antongil, à Ambanizana.",
    "b": "Voir les bungalows",
    "h": "chambres.html"
  },
  {
    "k": "Comment venir",
    "t": "Accès & transferts",
    "x": "Depuis Maroantsetra, nous organisons votre transfert jusqu’au lodge.",
    "b": "Voir l’accès",
    "h": "acces.html"
  },
  {
    "k": "Étape à Maroantsetra",
    "t": "Manga Beach Hôtel",
    "x": "Votre base confortable avant ou après Masoala : chambres et restaurant.",
    "b": "Découvrir l’hôtel",
    "h": "https://mangabeach-madagascar.mg/"
  },
  {
    "k": "Aventure en mer",
    "t": "Pêche sportive Masoala",
    "x": "Complétez votre séjour avec une sortie pêche en baie d’Antongil.",
    "b": "Découvrir la pêche",
    "h": "https://mangabeachfishing-masoala.com/"
  }
];
  var SHOW_AFTER=6000, ROTATE=6500, HIDE_ON=["reservation.html", "contact.html"];
  /* ================== */
  var doc=document, ss=null;
  try{ss=window.sessionStorage}catch(e){}
  function get(k){try{return ss&&ss.getItem(k)}catch(e){return null}}
  function set(k){try{ss&&ss.setItem(k,'1')}catch(e){}}

  /* Splash */
  var sp=doc.querySelector('.wz-splash');
  if(sp){
    set('wz_splash');
    var close=function(){sp.classList.add('is-closing')};
    var b=sp.querySelector('.wz-skip-btn'); if(b) b.addEventListener('click',close);
    doc.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }

  /* Promo card */
  var page=(location.pathname.split('/').pop()||'index.html');
  if(HIDE_ON.indexOf(page)>-1||get('wz_promo_closed')) return;
  if(!PROMOS.length) return;
  if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var card=doc.createElement('aside');
  card.className='wz-promo'; card.setAttribute('role','complementary'); card.setAttribute('aria-label','Offres');
  var html='<button class="wz-promo-close" type="button" aria-label="Fermer">&times;</button><div class="wz-slides">';
  PROMOS.forEach(function(p,i){
    html+='<div class="wz-slide'+(i?'':' is-on')+'"><div class="wz-kicker">'+p.k+'</div><div class="wz-title">'+p.t+'</div><p class="wz-text">'+p.x+'</p><a class="wz-cta" href="'+p.h+'">'+p.b+'</a></div>';
  });
  html+='</div><div class="wz-dots">';
  PROMOS.forEach(function(p,i){html+='<button class="wz-dot'+(i?'':' is-on')+'" type="button" aria-label="Offre '+(i+1)+'"></button>'});
  html+='</div>';
  card.innerHTML=html; doc.body.appendChild(card);
  if(getComputedStyle(card).position!=='fixed'){card.remove();return}  /* CSS absent : ne rien afficher */

  var slides=card.querySelectorAll('.wz-slide'), dots=card.querySelectorAll('.wz-dot'), cur=0, timer=null;
  function go(n){slides[cur].classList.remove('is-on');dots[cur].classList.remove('is-on');cur=(n+slides.length)%slides.length;slides[cur].classList.add('is-on');dots[cur].classList.add('is-on')}
  function start(){stop();timer=setInterval(function(){go(cur+1)},ROTATE)}
  function stop(){if(timer){clearInterval(timer);timer=null}}
  Array.prototype.forEach.call(dots,function(d,i){d.addEventListener('click',function(){go(i);start()})});
  card.addEventListener('mouseenter',stop); card.addEventListener('mouseleave',start);
  card.querySelector('.wz-promo-close').addEventListener('click',function(){card.classList.remove('is-open');stop();set('wz_promo_closed')});
  setTimeout(function(){card.classList.add('is-open');start()},SHOW_AFTER);
})();
