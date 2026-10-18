/* ===== EDIT THIS PART ===== */
const CONFIG = {
  herName: "Guddiya",
  letter: `My dear Guddiya,

Hello meri pyari gudiya, I Love You too much itna ki tum soch bhi nhi sakti. Bas kabhi kabhi situation hamare according nhi hota hai to bas kabhi kabhi pareshni ho sakti hai but not always. I am always with you. i promise i will love you more than you think bas mujhe bhi pyaar karna bahut bahut bahut sara.
Always yours,
Raj`,
  loveText: "You are my peace, my smile and my favourite person.you are my everything.Bas kahi jana mat",
  main: { src: "images/main.jpg", text: "Hamari abhi tak ki sabse close or best photo" },
  photos: [
    { src: "images/photo1.jpg", text: "Sabse cute photo" },
    { src: "images/photo2.jpg", text: "Hamesha hamko chedti rahti ho" },
    { src: "images/photo3.jpg", text: "Ye meri bithday party now your turn" },
    { src: "images/photo4.jpg", text: "Hamari sabse pahali sath me photo" }
  ],
  prizes: ["A new dress", "Lots of chocolates", "Picnic date", "A day with me", "Custom wish", "Movie night"],
  validNames: ["raj", "raj kumar bhargaw", "raj kumar", "bhargaw"]
};
/* ========================== */
const $ = id => document.getElementById(id);
const show = id => { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); $(id).classList.add('active'); scrollTo(0, 0); };
const PH = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#f0d3d8"/><text x="50%" y="52%" font-size="20" fill="#a8445f" text-anchor="middle" font-family="serif">add your photo</text></svg>');
const img = (el, src) => { el.onerror = () => { el.onerror = null; el.src = PH; }; el.src = src; };

$('herName').textContent = CONFIG.herName;
document.querySelectorAll('.nm').forEach(e => e.textContent = CONFIG.herName);
$('letterText').textContent = CONFIG.letter;
$('loveText').textContent = CONFIG.loveText;
img($('mainImg'), CONFIG.main.src); $('mainCap').textContent = CONFIG.main.text;

/* Letter */
$('letter').onclick = () => $('modal').classList.add('open');
$('closeLetter').onclick = () => $('modal').classList.remove('open');
$('modal').onclick = e => { if (e.target.id === 'modal') $('modal').classList.remove('open'); };
$('surpriseBtn').onclick = () => { show('s2'); hearts(6); };

/* Yes / No */
const noTexts = ["guddiya no nhi yes chhose karo 🥺", "soch lo mere sath jana hai ki nhi 🤨", "Sitarnaki 😤🙈"];
let n = 0;
$('noBtn').onclick = () => {
  if (n >= noTexts.length) { $('noBtn').style.display = 'none'; return; }
  $('noBtn').textContent = noTexts[n++];
  $('yesBtn').style.transform = `scale(${1 + n * 0.15})`;
};
$('yesBtn').onclick = () => { show('s3'); hearts(6); };

/* Plan */
$('planBtn').onclick = () => {
  const v = id => $(id).value || '-';
  $('summary').textContent = `${v('pDate')} at ${v('pTime')}\nCoffee at ${v('pPlace')}\nThen ${v('pMovie')} with ${v('pSnack')}\n${$('pNote').value}`;
  show('s4'); initScratch(); petals(14); buildCar();
};

/* Scratch card */
let scratched = false;
function initScratch() {
  if (scratched) return; scratched = true;
  const cv = $('scr'), b = cv.parentElement, w = cv.width = b.clientWidth, h = cv.height = b.clientHeight, x = cv.getContext('2d');
  const g = x.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#d9a8a0'); g.addColorStop(.5, '#f6e2d6'); g.addColorStop(1, '#c58f87');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  x.fillStyle = '#7a4a45'; x.font = 'italic 500 30px Cormorant Garamond, serif'; x.textAlign = 'center'; x.fillText('Scratch to reveal', w / 2, h / 2);
  let down = false, done = false, k = 0;
  const pt = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * w / r.width, (e.clientY - r.top) * h / r.height]; };
  cv.onpointerdown = e => { down = true; cv.setPointerCapture(e.pointerId); move(e); };
  cv.onpointerup = () => down = false;
  cv.onpointermove = move;
  function move(e) {
    if (!down || done) return;
    const [a, c] = pt(e); x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(a, c, 28, 0, 7); x.fill();
    if (++k % 8) return;
    const d = x.getImageData(0, 0, w, h).data; let t = 0, s = 0;
    for (let i = 3; i < d.length; i += 64) { s++; if (d[i] < 20) t++; }
    if (t / s > .5) { done = true; cv.style.opacity = 0; cv.style.pointerEvents = 'none'; hearts(8); }
  }
}

/* Swipe carousel */
function buildCar() {
  if ($('car').children.length) return;
  $('car').innerHTML = CONFIG.photos.map(() => '<figure class="slide"><img alt=""><p></p></figure>').join('');
  [...$('car').children].forEach((f, i) => { img(f.querySelector('img'), CONFIG.photos[i].src); f.querySelector('p').textContent = CONFIG.photos[i].text; });
  $('dots').innerHTML = CONFIG.photos.map((_, i) => `<b class="${i ? '' : 'on'}"></b>`).join('');
  $('car').onscroll = () => {
    const c = $('car'), i = Math.round(c.scrollLeft / (c.scrollWidth - c.clientWidth) * (CONFIG.photos.length - 1));
    [...$('dots').children].forEach((d, j) => d.classList.toggle('on', i === j));
  };
}

/* Wheel */
const wc = $('wheel'), cx = wc.getContext('2d'), N = CONFIG.prizes.length, arc = 2 * Math.PI / N;
const cols = ['#e7a3b0', '#e9c9a0', '#c9a6e0', '#a6c9e0', '#f0b8a0', '#b5d8c0'];
CONFIG.prizes.forEach((t, i) => {
  cx.beginPath(); cx.moveTo(160, 160); cx.arc(160, 160, 160, i * arc, (i + 1) * arc); cx.fillStyle = cols[i % 6]; cx.fill();
  cx.save(); cx.translate(160, 160); cx.rotate(i * arc + arc / 2); cx.fillStyle = '#3a1833'; cx.font = '500 14px Jost'; cx.textAlign = 'right'; cx.fillText(t, 146, 5); cx.restore();
});
let rot = 0, busy = false;
$('spinBtn').onclick = () => {
  if (busy) return; busy = true; $('spinRes').textContent = ''; $('customBox').classList.add('hide');
  const win = Math.floor(Math.random() * N), target = 270 - (win * arc + arc / 2) * 180 / Math.PI;
  rot += 360 * 6 + ((target - rot % 360) % 360 + 360) % 360;
  wc.style.transform = `rotate(${rot}deg)`;
  setTimeout(() => {
    busy = false; $('spinRes').textContent = 'You won: ' + CONFIG.prizes[win]; hearts(6);
    if (win === 4) $('customBox').classList.remove('hide');
  }, 5200);
};
$('customSend').onclick = () => { const t = $('customText').value.trim(); $('customRes').textContent = t ? `Wish received: "${t}". Your wish is my command.` : 'Write your wish first.'; };

/* Compatibility calculator */
const msgs = ["Reading your names...", "Analysing heartbeats...", "Matching smiles...", "Comparing dreams...", "Counting stars together...", "Calculating love..."];
$('cBtn').onclick = () => {
  const name = $('cName').value.trim().toLowerCase().replace(/\s+/g, ' ');
  if (!name) { $('cRes').textContent = 'Enter a name first.'; return; }
  $('cRes').textContent = ''; $('loader').classList.remove('hide'); $('cBtn').disabled = true;
  const t0 = Date.now(), iv = setInterval(() => {
    const p = Math.min((Date.now() - t0) / 5000, 1);
    $('barFill').style.width = p * 100 + '%'; $('loadMsg').textContent = msgs[Math.min(Math.floor(p * msgs.length), msgs.length - 1)];
    if (p < 1) return;
    clearInterval(iv); $('loader').classList.add('hide'); $('cBtn').disabled = false;
    const ok = CONFIG.validNames.includes(name);
    $('cRes').textContent = ok ? '100% compatible' : '0% compatible';
    if (ok) hearts(10);
  }, 100);
};

/* Minimal particles: thin outline hearts and a few soft petals */
const fx = $('fx'), c = fx.getContext('2d'), HP = new Path2D('M12 20.5C5.5 15.2 3 12.2 3 8.9 3 6.2 5 4.5 7.3 4.5c1.9 0 3.7 1.2 4.7 3 1-1.8 2.8-3 4.7-3C19 4.5 21 6.2 21 8.9c0 3.3-2.5 6.3-9 11.6z');
let P = [];
const resize = () => { fx.width = innerWidth; fx.height = innerHeight; }; resize(); addEventListener('resize', resize);
const add = (type, n, up) => { for (let i = 0; i < n; i++) P.push({ type, up, x: Math.random() * fx.width, y: up ? fx.height + 20 + Math.random() * 200 : -20 - Math.random() * 300, s: type === 'h' ? .5 + Math.random() * .7 : 5 + Math.random() * 5, v: .4 + Math.random() * .6, w: Math.random() * 6, r: Math.random() * 6 }); };
const hearts = n => add('h', n, true), petals = n => add('p', n, false);
hearts(8);
(function loop() {
  c.clearRect(0, 0, fx.width, fx.height);
  P.forEach(p => {
    p.y += p.up ? -p.v : p.v; p.w += .015; p.r += .01; p.x += Math.sin(p.w) * .5;
    c.save(); c.translate(p.x, p.y); c.rotate(p.type === 'p' ? p.r : 0);
    if (p.type === 'h') { c.scale(p.s, p.s); c.strokeStyle = 'rgba(231,163,176,.55)'; c.lineWidth = 1.2; c.stroke(HP); }
    else { c.fillStyle = 'rgba(247,225,228,.6)'; c.beginPath(); c.ellipse(0, 0, p.s, p.s / 2, 0, 0, 7); c.fill(); }
    c.restore();
  });
  P = P.filter(p => p.up ? p.y > -40 : p.y < fx.height + 20);
  if (P.filter(p => p.type === 'h').length < 5) hearts(1);
  requestAnimationFrame(loop);
})();
