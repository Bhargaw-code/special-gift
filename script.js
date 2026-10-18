/* ===== CONFIGURATION ===== */
const CONFIG = {
  herName: "Guddiya",
  letter: `My dear Guddiya,

Hello meri pyari gudiya, I Love You too much itna ki tum soch bhi nhi sakti. Bas kabhi kabhi situation hamare according nhi hota hai to bas kabhi kabhi pareshni ho sakti hai but not always. I am always with you. i promise i will love you more than you think bas mujhe bhi pyaar karna bahut bahut bahut sara.

Always yours,
Raj`,
  loveText: "You are my peace, my smile and my favourite person. You are my everything. Bas kahi jana mat.",
  main: { 
    src: "main.jpg", 
    text: "Hamari abhi tak ki sabse close or best photo" 
  },
  photos: [
    { src: "photo1.jpg", text: "Sabse cute photo" },
    { src: "photo2.jpg", text: "Hamesha hamko chedti rahti ho" },
    { src: "photo3.jpg", text: "Ye meri birthday party now your turn" },
    { src: "photo4.jpg", text: "Hamari sabse pahali sath me photo" }
  ],
  prizes: ["A new dress", "Lots of chocolates", "Picnic date", "A day with me", "Custom wish", "Movie night"],
  validNames: ["raj", "raj kumar bhargaw", "raj kumar", "bhargaw"]
};

/* ===== DOM & NAVIGATION ===== */
const $ = id => document.getElementById(id);
const show = id => {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = $(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }
};

const PH = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#f0d3d8"/><text x="50%" y="52%" font-size="20" fill="#a8445f" text-anchor="middle" font-family="sans-serif">Photo</text></svg>');
const img = (el, src) => { 
  if (!el) return;
  el.onerror = () => { el.onerror = null; el.src = PH; }; 
  el.src = src; 
};

// Initialize dynamic texts & main image
if ($('herName'))$('herName').textContent = CONFIG.herName;
document.querySelectorAll('.nm').forEach(e => e.textContent = CONFIG.herName);
if ($('letterText'))$('letterText').textContent = CONFIG.letter;
if ($('loveText'))$('loveText').textContent = CONFIG.loveText;
if ($('mainImg')) img($('mainImg'), CONFIG.main.src);
if ($('mainCap'))$('mainCap').textContent = CONFIG.main.text;

/* ===== LETTER MODAL ===== */
if ($('letter')) $('letter').onclick = () =>$('modal').classList.add('open');
if ($('closeLetter')) $('closeLetter').onclick = () =>$('modal').classList.remove('open');
if ($('modal')) {$('modal').onclick = e => {
    if (e.target.id === 'modal') $('modal').classList.remove('open');
  };
}
if ($('surpriseBtn')) {$('surpriseBtn').onclick = () => {
    show('s2');
    hearts(6);
  };
}

/* ===== YES / NO SCREEN ===== */
const noTexts = [
  "guddiya no nhi yes choose karo",
  "soch lo mere sath jana hai ki nhi",
  "Sitarnaki"
];
let n = 0;
if ($('noBtn')) {$('noBtn').onclick = () => {
    if (n >= noTexts.length) {
      $('noBtn').style.display = 'none';
      return;
    }
    $('noBtn').textContent = noTexts[n++];
    if ($('yesBtn'))$('yesBtn').style.transform = `scale(${1 + n * 0.15})`;
  };
}
if ($('yesBtn')) {$('yesBtn').onclick = () => {
    show('s3');
    hearts(6);
  };
}

/* ===== DATE PLAN FORM ===== */
if ($('planBtn')) {$('planBtn').onclick = () => {
    const v = id => ($(id) && $(id).value) ?$(id).value : '-';
    if ($('summary')) {$('summary').textContent = `${v('pDate')} at ${v('pTime')}\nCoffee at ${v('pPlace')}\nThen ${v('pMovie')} with ${v('pSnack')}\n${v('pNote')}`;
    }
    show('s4');
    initScratch();
    petals(14);
    buildCar();
  };
}

/* ===== SCRATCH CARD ===== */
let scratched = false;
function initScratch() {
  if (scratched) return;
  const cv = $('scr');
  if (!cv) return;
  scratched = true;

  const b = cv.parentElement;
  const w = cv.width = b.clientWidth || 320;
  const h = cv.height = b.clientHeight || 400;
  const x = cv.getContext('2d');

  const g = x.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, '#d9a8a0');
  g.addColorStop(0.5, '#f6e2d6');
  g.addColorStop(1, '#c58f87');
  x.fillStyle = g;
  x.fillRect(0, 0, w, h);

  x.fillStyle = '#7a4a45';
  x.font = 'italic 500 24px serif';
  x.textAlign = 'center';
  x.fillText('Scratch to reveal', w / 2, h / 2);

  let down = false;
  let done = false;
  let k = 0;

  const pt = e => {
    const r = cv.getBoundingClientRect();
    return [(e.clientX - r.left) * w / r.width, (e.clientY - r.top) * h / r.height];
  };

  cv.onpointerdown = e => { down = true; cv.setPointerCapture(e.pointerId); move(e); };
  cv.onpointerup = () => { down = false; };
  cv.onpointermove = move;

  function move(e) {
    if (!down || done) return;
    const [a, cVal] = pt(e);
    x.globalCompositeOperation = 'destination-out';
    x.beginPath();
    x.arc(a, cVal, 28, 0, Math.PI * 2);
    x.fill();

    if (++k % 8) return;
    const d = x.getImageData(0, 0, w, h).data;
    let t = 0;
    let s = 0;
    for (let i = 3; i < d.length; i += 64) {
      s++;
      if (d[i] < 20) t++;
    }
    if (t / s > 0.5) {
      done = true;
      cv.style.opacity = '0';
      cv.style.pointerEvents = 'none';
      hearts(8);
    }
  }
}

/* ===== CAROUSEL ===== */
function buildCar() {
  const car = $('car');
  if (!car || car.children.length) return;
  car.innerHTML = CONFIG.photos.map(() => '<figure class="slide"><img alt=""><p></p></figure>').join('');
  [...car.children].forEach((f, i) => {
    img(f.querySelector('img'), CONFIG.photos[i].src);
    f.querySelector('p').textContent = CONFIG.photos[i].text;
  });
  if ($('dots')) {$('dots').innerHTML = CONFIG.photos.map((_, i) => `<b class="${i ? '' : 'on'}"></b>`).join('');
    car.onscroll = () => {
      const idx = Math.round(car.scrollLeft / (car.scrollWidth - car.clientWidth) * (CONFIG.photos.length - 1));
      [...$('dots').children].forEach((d, j) => d.classList.toggle('on', idx === j));
    };
  }
}

/* ===== SPIN WHEEL ===== */
const wc = $('wheel');
if (wc) {
  const cx = wc.getContext('2d');
  const N = CONFIG.prizes.length;
  const arc = (2 * Math.PI) / N;
  const cols = ['#e7a3b0', '#e9c9a0', '#c9a6e0', '#a6c9e0', '#f0b8a0', '#b5d8c0'];

  CONFIG.prizes.forEach((t, i) => {
    cx.beginPath();
    cx.moveTo(160, 160);
    cx.arc(160, 160, 160, i * arc, (i + 1) * arc);
    cx.fillStyle = cols[i % 6];
    cx.fill();
    cx.save();
    cx.translate(160, 160);
    cx.rotate(i * arc + arc / 2);
    cx.fillStyle = '#3a1833';
    cx.font = '500 13px sans-serif';
    cx.textAlign = 'right';
    cx.fillText(t, 146, 5);
    cx.restore();
  });

  let rot = 0;
  let busy = false;

  if ($('spinBtn')) {$('spinBtn').onclick = () => {
      if (busy) return;
      busy = true;
      if ($('spinRes'))$('spinRes').textContent = '';
      if ($('customBox'))$('customBox').classList.add('hide');

      const win = Math.floor(Math.random() * N);
      const target = 270 - (win * arc + arc / 2) * 180 / Math.PI;
      rot += 360 * 6 + ((target - rot % 360) % 360 + 360) % 360;
      wc.style.transform = `rotate(${rot}deg)`;

      setTimeout(() => {
        busy = false;
        if ($('spinRes'))$('spinRes').textContent = 'You won: ' + CONFIG.prizes[win];
        hearts(6);
        if (win === 4 && $('customBox'))$('customBox').classList.remove('hide');
      }, 5200);
    };
  }
}

if ($('customSend')) {$('customSend').onclick = () => {
    const t = $('customText').value.trim();
    if ($('customRes')) {$('customRes').textContent = t ? `Wish received: "${t}". Your wish is my command.` : 'Write your wish first.';
    }
  };
}

/* ===== COMPATIBILITY TEST ===== */
const msgs = [
  "Reading your names...",
  "Analysing heartbeats...",
  "Matching smiles...",
  "Comparing dreams...",
  "Counting stars together...",
  "Calculating love..."
];

if ($('cBtn')) {$('cBtn').onclick = () => {
    const name = $('cName').value.trim().toLowerCase().replace(/\s+/g, ' ');
    if (!name) {
      if ($('cRes'))$('cRes').
