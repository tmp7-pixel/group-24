// ==========================================
// AUDIO SYNTHESIZER (8-bit arcade chords)
// ==========================================
const AudioController = (() => {
  let ctx = null;
  let muted = false;

  function init() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) ctx = new AudioCtx();
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
  }

  function playJump(isDouble = false) {
    if (muted || !ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = isDouble ? 'sine' : 'triangle';
      const startFreq = isDouble ? 420 : 260;
      const endFreq = isDouble ? 950 : 750;

      osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch (e) {}
  }

  function playRoar() {
    if (muted || !ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.linearRampToValueAtTime(190, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(45, now + 0.55);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.55);

      const bufferSize = ctx.sampleRate * 0.45;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(350, now);
      filter.Q.setValueAtTime(1.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(now);
      noise.stop(now + 0.45);
    } catch (e) {}
  }

  function playSkinChange() {
    if (muted || !ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  function playBuy() {
    if (muted || !ctx) return;
    try {
      const now = ctx.currentTime;
      // Cash register ding + ascending fanfare
      const notes = [587.33, 880, 1174.66];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);
        gain.gain.setValueAtTime(0.16, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.18);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.18);
      });
    } catch (e) {}
  }

  function playCoin() {
    if (muted || !ctx) return;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, ctx.currentTime);
      osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch (e) {}
  }

  function playPowerup() {
    if (muted || !ctx) return;
    try {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);
        gain.gain.setValueAtTime(0.14, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.15);
      });
    } catch (e) {}
  }

  function playScore() {
    if (muted || !ctx) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.055);
        gain.gain.setValueAtTime(0.12, now + idx * 0.055);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.055 + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.055);
        osc.stop(now + idx * 0.055 + 0.1);
      });
    } catch (e) {}
  }

  function playHit() {
    if (muted || !ctx) return;
    try {
      const bufferSize = ctx.sampleRate * 0.35;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(950, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.35);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  }

  function toggleMute() {
    muted = !muted;
    return muted;
  }

  return { init, playJump, playHit, playScore, playCoin, playPowerup, playRoar, playSkinChange, playBuy, toggleMute };
})();

// ==========================================
// PARTICLE SYSTEM (Sparks & Dust & Fire)
// ==========================================
const canvas = document.getElementById('fx-canvas');
const ctxFx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function addParticles(x, y, count = 8, color = '#facc15', speedRange = 3) {
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * speedRange + 1;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1.0,
      decay: 0.03 + Math.random() * 0.04,
      size: 3 + Math.random() * 3,
      color
    });
  }
}

function updateParticles(delta) {
  ctxFx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * delta;
    p.y += p.vy * delta;
    p.life -= p.decay * delta;

    if (p.life <= 0) {
      particles.splice(i, 1);
      continue;
    }

    ctxFx.save();
    ctxFx.globalAlpha = p.life;
    ctxFx.fillStyle = p.color;
    ctxFx.beginPath();
    ctxFx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    ctxFx.fill();
    ctxFx.restore();
  }
}

// ==========================================
// GAME STATE & SAVED DATA
// ==========================================
const dino = document.getElementById('dino');
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const coinDisplay = document.getElementById('coin-score');
const scoreContainer = document.getElementById('score-container');
const highScoreDisplay = document.getElementById('high-score');
const gameOverScreen = document.getElementById('game-over-screen');
const restartBtn = document.getElementById('restart-btn');
const muteBtn = document.getElementById('mute-btn');
const ground = document.getElementById('ground');
const cloudsLayer = document.getElementById('clouds-layer');
const starsLayer = document.getElementById('stars-layer');
const touchJumpBtn = document.getElementById('touch-jump-btn');
const touchDuckBtn = document.getElementById('touch-duck-btn');
const touchRoarBtn = document.getElementById('touch-roar-btn');
const powerupStatus = document.getElementById('powerup-status');
const powerupIcon = document.getElementById('powerup-icon');
const powerupText = document.getElementById('powerup-text');
const powerupBar = document.getElementById('powerup-bar');
const roarBanner = document.getElementById('roar-banner');
const biomeBanner = document.getElementById('biome-banner');
const skinButtons = document.querySelectorAll('.skin-btn');

// Shop elements
const shopModal = document.getElementById('shop-modal');
const shopOpenBtn = document.getElementById('shop-open-btn');
const gameOverShopBtn = document.getElementById('game-over-shop-btn');
const shopCloseBtn = document.getElementById('shop-close-btn');
const shopDoneBtn = document.getElementById('shop-done-btn');
const shopCoinsDisplay = document.getElementById('shop-coins-display');
const shopTabs = document.querySelectorAll('.shop-tab');
const shopTabContents = document.querySelectorAll('.shop-tab-content');

// Load stored bank, high score, inventory & skin
let totalCoins = 0;
let highScore = 0;
let currentSkin = 'emerald';
let inventory = {
  starter_shield: false,
  coin_magnet: false,
  double_coins: false,
  extra_revive: false,
  unlocked_skins: ['emerald']
};

try {
  const savedCoins = localStorage.getItem('dino_bank_coins');
  if (savedCoins) totalCoins = parseInt(savedCoins, 10) || 0;

  const savedHi = localStorage.getItem('dino_jurassic_hi');
  if (savedHi) highScore = parseInt(savedHi, 10) || 0;

  const savedInv = localStorage.getItem('dino_player_inventory');
  if (savedInv) inventory = JSON.parse(savedInv);

  const savedSkin = localStorage.getItem('dino_selected_skin');
  if (savedSkin) currentSkin = savedSkin;
} catch (e) {}

// Update UI initial counters
coinDisplay.textContent = totalCoins;
highScoreDisplay.textContent = String(highScore).padStart(5, '0');

let isGameOver = false;
let isShopOpen = false;
let score = 0;
let runCoins = 0;
let lastMilestone = 0;
let gameSpeed = 6.2;
const maxSpeed = 14.5;
let groundX = 0;

let legStepTimer = 0;
let isAltStep = false;

// Physics & Jump
let isJumping = false;
let jumpCount = 0;
let isDucking = false;
let isRoaring = false;
let roarTimer = 0;
let dinoY = 0;
let dinoVelocity = 0;
const gravity = 0.62;
const jumpStrength = 13.0;

// Extra life revive state
let hasReviveAvailable = false;

// Powerup states
let activePowerup = null; // 'shield' or 'star-boost'
let powerupDuration = 0;
let powerupMaxDuration = 0;

// Obstacles, Collectibles, Clouds
let obstacles = [];
let collectibles = [];
let clouds = [];
let nextSpawnDistance = 350;
let distanceSinceLastSpawn = 0;

let isNight = false;

const CACTUS_COLORS = ['#15803d', '#16a34a', '#059669', '#0d9488', '#0284c7'];
const BIRD_COLORS = ['#ea580c', '#e11d48', '#d97706', '#9333ea', '#c026d3'];

// Save inventory & wallet helpers
function saveUserData() {
  try {
    localStorage.setItem('dino_bank_coins', totalCoins);
    localStorage.setItem('dino_player_inventory', JSON.stringify(inventory));
    localStorage.setItem('dino_selected_skin', currentSkin);
  } catch (e) {}
}

// ==========================================
// SKIN SYSTEM & LOCK STATUS
// ==========================================
function updateSkinButtonsLockState() {
  skinButtons.forEach((btn) => {
    const skinName = btn.dataset.skin;
    const isUnlocked = inventory.unlocked_skins.includes(skinName);
    const lockEl = document.getElementById(`lock-${skinName}`);
    if (lockEl) {
      lockEl.textContent = isUnlocked ? '' : '🔒';
    }
    btn.style.opacity = isUnlocked ? '1' : '0.6';
  });
}

function setSkin(skinName) {
  if (!inventory.unlocked_skins.includes(skinName)) {
    openShop('skins');
    return;
  }

  currentSkin = skinName;
  dino.classList.remove('skin-emerald', 'skin-lava', 'skin-cyber', 'skin-golden', 'skin-albino');
  dino.classList.add(`skin-${skinName}`);

  skinButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.skin === skinName);
  });

  saveUserData();
  AudioController.playSkinChange();

  const boardRect = gameBoard.getBoundingClientRect();
  const dinoRect = dino.getBoundingClientRect();
  const skinParticleColors = {
    emerald: '#22c55e',
    lava: '#f97316',
    cyber: '#38bdf8',
    golden: '#eab308',
    albino: '#ffffff'
  };
  addParticles(
    dinoRect.left - boardRect.left + 35,
    dinoRect.top - boardRect.top + 25,
    25,
    skinParticleColors[skinName] || '#38bdf8',
    5
  );
}

skinButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    AudioController.init();
    setSkin(btn.dataset.skin);
  });
});

updateSkinButtonsLockState();
setSkin(currentSkin);

// ==========================================
// COIN SHOP LOGIC & TRANSACTIONS
// ==========================================
function openShop(defaultTab = 'items') {
  isShopOpen = true;
  shopModal.classList.remove('hidden');
  shopCoinsDisplay.textContent = totalCoins;
  switchShopTab(defaultTab);
  refreshShopUI();
}

function closeShop() {
  isShopOpen = false;
  shopModal.classList.add('hidden');
  updateSkinButtonsLockState();
}

function switchShopTab(tabKey) {
  shopTabs.forEach((tab) => tab.classList.toggle('active', tab.dataset.tab === tabKey));
  shopTabContents.forEach((content) => content.classList.toggle('active', content.id === `tab-${tabKey}`));
}

shopTabs.forEach((tab) => {
  tab.addEventListener('click', () => switchShopTab(tab.dataset.tab));
});

function refreshShopUI() {
  shopCoinsDisplay.textContent = totalCoins;

  // 1. Items Statuses
  const items = [
    { id: 'shield', key: 'starter_shield' },
    { id: 'magnet', key: 'coin_magnet' },
    { id: 'doublecoins', key: 'double_coins' },
    { id: 'revive', key: 'extra_revive' }
  ];

  items.forEach((item) => {
    const isOwned = inventory[item.key];
    const statusEl = document.getElementById(`status-${item.id}`);
    const btn = document.querySelector(`[data-buy="${item.key}"]`);
    if (statusEl) {
      statusEl.textContent = isOwned ? '✓ Owned & Active' : 'Not Owned';
      statusEl.classList.toggle('owned', isOwned);
    }
    if (btn) {
      if (isOwned) {
        btn.textContent = 'OWNED';
        btn.disabled = true;
      } else {
        const cost = parseInt(btn.dataset.cost, 10);
        btn.textContent = `🪙 ${cost} COINS`;
        btn.disabled = totalCoins < cost;
      }
    }
  });

  // 2. Skins Statuses
  const skins = ['lava', 'cyber', 'golden', 'albino'];
  skins.forEach((skinKey) => {
    const isUnlocked = inventory.unlocked_skins.includes(skinKey);
    const statusEl = document.getElementById(`status-skin-${skinKey}`);
    const btn = document.querySelector(`[data-buy-skin="${skinKey}"]`);
    if (statusEl) {
      statusEl.textContent = isUnlocked ? '✓ Unlocked' : 'Locked';
      statusEl.classList.toggle('owned', isUnlocked);
    }
    if (btn) {
      if (isUnlocked) {
        btn.textContent = currentSkin === skinKey ? 'EQUIPPED' : 'EQUIP';
        btn.disabled = currentSkin === skinKey;
      } else {
        const cost = parseInt(btn.dataset.cost, 10);
        btn.textContent = `🪙 ${cost} COINS`;
        btn.disabled = totalCoins < cost;
      }
    }
  });
}

// Purchase buttons
document.querySelectorAll('[data-buy]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const itemKey = btn.dataset.buy;
    const cost = parseInt(btn.dataset.cost, 10);
    if (totalCoins >= cost && !inventory[itemKey]) {
      totalCoins -= cost;
      inventory[itemKey] = true;
      saveUserData();
      coinDisplay.textContent = totalCoins;
      AudioController.playBuy();
      refreshShopUI();
    }
  });
});

document.querySelectorAll('[data-buy-skin]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const skinKey = btn.dataset-buySkin || btn.getAttribute('data-buy-skin');
    const isUnlocked = inventory.unlocked_skins.includes(skinKey);
    const cost = parseInt(btn.dataset.cost, 10);

    if (!isUnlocked && totalCoins >= cost) {
      totalCoins -= cost;
      inventory.unlocked_skins.push(skinKey);
      setSkin(skinKey);
      saveUserData();
      coinDisplay.textContent = totalCoins;
      AudioController.playBuy();
      refreshShopUI();
    } else if (isUnlocked) {
      setSkin(skinKey);
      refreshShopUI();
    }
  });
});

shopOpenBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  openShop('items');
});

gameOverShopBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  openShop('items');
});

shopCloseBtn.addEventListener('click', closeShop);
shopDoneBtn.addEventListener('click', closeShop);

// ==========================================
// ENVIRONMENT & STARS
// ==========================================
function createStars() {
  starsLayer.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.floor(Math.random() * 88 + 4)}%`;
    star.style.top = `${Math.floor(Math.random() * 80 + 15)}px`;
    starsLayer.appendChild(star);
  }
}
createStars();

function setDucking(ducking) {
  if (isGameOver || isRoaring || isShopOpen) return;
  if (ducking) {
    isDucking = true;
    if (isJumping) {
      dinoVelocity -= 1.3;
    } else {
      dino.classList.add('ducking');
      dino.classList.remove('running', 'jumping');
    }
  } else {
    isDucking = false;
    dino.classList.remove('ducking');
    if (!isJumping) dino.classList.add('running');
  }
}

function jump() {
  AudioController.init();
  if (isShopOpen) return;
  if (isGameOver) {
    resetGame();
    return;
  }
  if (isRoaring) return;

  if (!isJumping && dinoY === 0) {
    isJumping = true;
    jumpCount = 1;
    dinoVelocity = jumpStrength;
    dino.classList.remove('running', 'ducking');
    dino.classList.add('jumping');
    AudioController.playJump(false);

    const boardRect = gameBoard.getBoundingClientRect();
    const dinoRect = dino.getBoundingClientRect();
    addParticles(dinoRect.left - boardRect.left + 25, dinoRect.bottom - boardRect.top - 5, 6, '#86efac');
  } else if (isJumping && jumpCount === 1) {
    jumpCount = 2;
    dinoVelocity = jumpStrength * 0.92;
    AudioController.playJump(true);

    const boardRect = gameBoard.getBoundingClientRect();
    const dinoRect = dino.getBoundingClientRect();
    addParticles(dinoRect.left - boardRect.left + 35, dinoRect.top - boardRect.top + 25, 10, '#38bdf8');
  }
}

function roar() {
  AudioController.init();
  if (isGameOver || isRoaring || isShopOpen) return;

  isRoaring = true;
  roarTimer = 35;
  dino.classList.add('roaring');
  dino.classList.remove('running', 'ducking');
  roarBanner.classList.remove('hidden');

  AudioController.playRoar();

  const boardRect = gameBoard.getBoundingClientRect();
  const dinoRect = dino.getBoundingClientRect();
  const muzzleX = dinoRect.left - boardRect.left + dinoRect.width;
  const muzzleY = dinoRect.top - boardRect.top + 20;

  for (let s = 0; s < 40; s++) {
    particles.push({
      x: muzzleX,
      y: muzzleY + (Math.random() * 20 - 10),
      vx: Math.random() * 12 + 4,
      vy: (Math.random() - 0.5) * 5,
      life: 1.0,
      decay: 0.04,
      size: 4 + Math.random() * 5,
      color: Math.random() > 0.5 ? '#f97316' : '#ef4444'
    });
  }

  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obs = obstacles[i];
    const obsRect = obs.el.getBoundingClientRect();
    addParticles(obsRect.left - boardRect.left + 20, obsRect.top - boardRect.top + 20, 15, '#f97316', 5);
    obs.el.remove();
    obstacles.splice(i, 1);
  }

  score += 50;
}

function activatePowerup(type) {
  activePowerup = type;
  powerupMaxDuration = type === 'shield' ? 450 : 350;
  powerupDuration = powerupMaxDuration;

  AudioController.playPowerup();

  if (type === 'shield') {
    dino.classList.add('has-shield');
    powerupIcon.textContent = '🛡️';
    powerupText.textContent = 'SHIELD ACTIVE (INVULNERABLE)';
  } else if (type === 'star-boost') {
    powerupIcon.textContent = '⚡';
    powerupText.textContent = 'SPEED BOOST (2X POINTS)';
  }
  powerupStatus.classList.remove('hidden');
}

function spawnCloud() {
  const cloud = document.createElement('div');
  cloud.className = 'cloud';
  const width = Math.floor(Math.random() * 30) + 40;
  const top = Math.floor(Math.random() * 65) + 20;
  cloud.style.width = `${width}px`;
  cloud.style.top = `${top}px`;
  cloud.style.right = '-70px';
  cloudsLayer.appendChild(cloud);
  clouds.push({ el: cloud, x: -70, speed: 0.7 + Math.random() * 0.7 });
}

function spawnCoinOrPowerup() {
  if (Math.random() > 0.45) return;

  const isPowerup = Math.random() < 0.22 && !activePowerup;
  const itemEl = document.createElement('div');

  const heights = [28, 65, 105];
  const bottom = heights[Math.floor(Math.random() * heights.length)];

  if (isPowerup) {
    const pType = Math.random() < 0.5 ? 'shield' : 'star-boost';
    itemEl.className = `powerup-item ${pType}`;
    itemEl.textContent = pType === 'shield' ? '🛡️' : '⚡';
    itemEl.style.bottom = `${bottom}px`;
    itemEl.style.right = '-35px';
    gameBoard.appendChild(itemEl);
    collectibles.push({ el: itemEl, type: pType, x: -35, width: 26, height: 26, bottom });
  } else {
    itemEl.className = 'coin';
    itemEl.textContent = '$';
    itemEl.style.bottom = `${bottom}px`;
    itemEl.style.right = '-30px';
    gameBoard.appendChild(itemEl);
    collectibles.push({ el: itemEl, type: 'coin', x: -30, width: 22, height: 22, bottom });
  }
}

function spawnObstacle() {
  const canSpawnBird = score > 200 && Math.random() > 0.65;
  const obsEl = document.createElement('div');

  let type = 'cactus';
  let width = 24;
  let height = 44;
  let bottom = 0;

  if (canSpawnBird) {
    type = 'pterodactyl';
    obsEl.className = 'pterodactyl wing-up';
    const birdColor = BIRD_COLORS[Math.floor(Math.random() * BIRD_COLORS.length)];
    obsEl.innerHTML = `
      <svg class="ptero-svg ptero-wing-up" viewBox="0 0 92 80" fill="${birdColor}">
        <path d="M50 0h12v12H50zm12 12h12v12H62zm12 12h18v12H74zm-36 0h12v12H38zm-12 12h12v12H26zm-16 0h8v8h-8zm24 12h24v12H34zm-8 12h8v12h-8z"/>
        <rect x="74" y="24" width="6" height="6" fill="#fff"/>
        <rect x="76" y="25" width="2" height="2" fill="#000"/>
      </svg>
      <svg class="ptero-svg ptero-wing-down" viewBox="0 0 92 80" fill="${birdColor}">
        <path d="M50 24h12v12H50zm12 12h12v12H62zm12 0h18v12H74zm-36 0h12v12H38zm-12 12h12v12H26zm-16-12h8v8h-8zm24-12h24v12H34zm-8 24h8v12h-8zm16 12h12v12H42z"/>
        <rect x="74" y="36" width="6" height="6" fill="#fff"/>
        <rect x="76" y="37" width="2" height="2" fill="#000"/>
      </svg>
    `;
    width = 48;
    height = 38;
    const birdHeights = [18, 55, 92];
    bottom = birdHeights[Math.floor(Math.random() * birdHeights.length)];
  } else {
    obsEl.className = 'cactus';
    const cactusColor = CACTUS_COLORS[Math.floor(Math.random() * CACTUS_COLORS.length)];
    const cactusIdx = Math.floor(Math.random() * 3);

    if (cactusIdx === 0) {
      width = 22;
      height = 44;
      obsEl.innerHTML = `<svg class="cactus-svg" viewBox="0 0 20 40" fill="${cactusColor}">
        <path d="M7 0h6v38H7zm8 10h5v12h-5zm-14 6h5v12H1z"/>
        <circle cx="10" cy="3" r="3" fill="#ec4899"/>
      </svg>`;
    } else if (cactusIdx === 1) {
      width = 38;
      height = 48;
      obsEl.innerHTML = `<svg class="cactus-svg" viewBox="0 0 38 46" fill="${cactusColor}">
        <path d="M5 2h5v40H5zm12 10h5v14h-5zm11-6h5v38h-5zm-16 8H2v10h5zm22 6h5v10h-5z"/>
        <circle cx="7" cy="4" r="2.5" fill="#f43f5e"/>
        <circle cx="29" cy="6" r="2.5" fill="#eab308"/>
      </svg>`;
    } else {
      width = 52;
      height = 52;
      obsEl.innerHTML = `<svg class="cactus-svg" viewBox="0 0 55 52" fill="${cactusColor}">
        <path d="M6 4h6v44H6zm14 8h5v12h-5zm13-8h6v44h-6zm12 12h5v10h-5zm-33 6H1v12h5zm24 6h-5v12h5zm19-2h-5v12h5z"/>
        <circle cx="9" cy="5" r="3" fill="#ec4899"/>
        <circle cx="36" cy="5" r="3" fill="#f59e0b"/>
      </svg>`;
    }
  }

  obsEl.style.width = `${width}px`;
  obsEl.style.height = `${height}px`;
  obsEl.style.bottom = `${bottom}px`;
  obsEl.style.right = `-${width + 10}px`;

  gameBoard.appendChild(obsEl);
  obstacles.push({
    el: obsEl,
    type,
    x: -(width + 10),
    width,
    height,
    bottom,
    wingTimer: 0
  });

  spawnCoinOrPowerup();

  const minGap = Math.max(220, gameSpeed * 34);
  nextSpawnDistance = minGap + Math.random() * 270;
  distanceSinceLastSpawn = 0;
}

// ==========================================
// MAIN ANIMATION LOOP
// ==========================================
let lastTime = null;
function gameLoop(time) {
  if (lastTime === null) lastTime = time;
  const delta = Math.min((time - lastTime) / 16.66, 2.5);
  lastTime = time;

  if (!isGameOver && !isShopOpen) {
    const currentSpeed = activePowerup === 'star-boost' ? gameSpeed * 1.35 : gameSpeed;

    // 1. Move Ground
    groundX += currentSpeed * delta;
    ground.style.transform = `translateX(-${groundX % 260}px)`;

    // 2. Physics & Jump
    if (isJumping || dinoY > 0) {
      dinoY += dinoVelocity * delta;
      dinoVelocity -= gravity * delta;

      if (dinoY <= 0) {
        dinoY = 0;
        dinoVelocity = 0;
        isJumping = false;
        jumpCount = 0;
        dino.classList.remove('jumping');
        if (isDucking) dino.classList.add('ducking');
        else if (!isRoaring) dino.classList.add('running');
      }
      dino.style.bottom = `${dinoY}px`;
    }

    // 3. Roar timer
    if (isRoaring) {
      roarTimer -= delta;
      if (roarTimer <= 0) {
        isRoaring = false;
        dino.classList.remove('roaring');
        roarBanner.classList.add('hidden');
        if (isDucking) dino.classList.add('ducking');
        else dino.classList.add('running');
      }
    }

    // 4. Stride animation
    legStepTimer += delta * (currentSpeed / 6.0);
    if (legStepTimer >= 6.0) {
      legStepTimer = 0;
      isAltStep = !isAltStep;
      dino.classList.toggle('alt-step', isAltStep);

      if (!isJumping && !isDucking && !isRoaring) {
        const boardRect = gameBoard.getBoundingClientRect();
        const dinoRect = dino.getBoundingClientRect();
        addParticles(dinoRect.left - boardRect.left + 22, dinoRect.bottom - boardRect.top - 6, 2, '#4ade80', 1.5);
      }
    }

    // 5. Clouds
    if (Math.random() < 0.007 && clouds.length < 5) {
      spawnCloud();
    }
    for (let i = clouds.length - 1; i >= 0; i--) {
      const c = clouds[i];
      c.x += c.speed * delta;
      c.el.style.right = `${c.x}px`;
      if (c.x > gameBoard.clientWidth + 80) {
        c.el.remove();
        clouds.splice(i, 1);
      }
    }

    // 6. Spawn & Move Obstacles
    distanceSinceLastSpawn += currentSpeed * delta;
    if (distanceSinceLastSpawn >= nextSpawnDistance) {
      spawnObstacle();
    }

    const dinoRect = dino.getBoundingClientRect();
    const dinoHitBox = {
      left: dinoRect.left + (isDucking ? 8 : 14),
      right: dinoRect.right - (isDucking ? 8 : 14),
      top: dinoRect.top + (isDucking ? 6 : 10),
      bottom: dinoRect.bottom - 4
    };

    // Coin Magnetism Perk Logic
    if (inventory.coin_magnet) {
      collectibles.forEach((item) => {
        if (item.type === 'coin') {
          const itemRect = item.el.getBoundingClientRect();
          const dist = Math.hypot(
            (itemRect.left + itemRect.width / 2) - (dinoRect.left + dinoRect.width / 2),
            (itemRect.top + itemRect.height / 2) - (dinoRect.top + dinoRect.height / 2)
          );
          if (dist < 180) {
            // Magnet pull toward dino
            item.x += 4.5 * delta;
            item.bottom += (dinoY - item.bottom) * 0.06 * delta;
            item.el.style.bottom = `${item.bottom}px`;
          }
        }
      });
    }

    // Collectibles Check
    for (let i = collectibles.length - 1; i >= 0; i--) {
      const item = collectibles[i];
      item.x += currentSpeed * delta;
      item.el.style.right = `${item.x}px`;

      const itemRect = item.el.getBoundingClientRect();
      if (
        dinoHitBox.right > itemRect.left &&
        dinoHitBox.left < itemRect.right &&
        dinoHitBox.bottom > itemRect.top &&
        dinoHitBox.top < itemRect.bottom
      ) {
        const boardRect = gameBoard.getBoundingClientRect();
        const fxX = itemRect.left - boardRect.left + itemRect.width / 2;
        const fxY = itemRect.top - boardRect.top + itemRect.height / 2;

        if (item.type === 'coin') {
          const coinVal = inventory.double_coins ? 2 : 1;
          runCoins += coinVal;
          totalCoins += coinVal;
          score += 15 * coinVal;
          coinDisplay.textContent = totalCoins;
          saveUserData();
          AudioController.playCoin();
          addParticles(fxX, fxY, 12, '#fde047', 4);
        } else {
          activatePowerup(item.type);
          addParticles(fxX, fxY, 20, item.type === 'shield' ? '#38bdf8' : '#f59e0b', 5);
        }

        item.el.remove();
        collectibles.splice(i, 1);
        continue;
      }

      if (item.x > gameBoard.clientWidth + 60) {
        item.el.remove();
        collectibles.splice(i, 1);
      }
    }

    // Move Obstacles & Collision Check
    for (let i = obstacles.length - 1; i >= 0; i--) {
      const obs = obstacles[i];
      obs.x += currentSpeed * delta;
      obs.el.style.right = `${obs.x}px`;

      if (obs.type === 'pterodactyl') {
        obs.wingTimer = (obs.wingTimer || 0) + delta;
        if (obs.wingTimer >= 9) {
          obs.wingTimer = 0;
          obs.el.classList.toggle('wing-up');
        }
      }

      const obsRect = obs.el.getBoundingClientRect();
      const obsHitBox = {
        left: obsRect.left + 6,
        right: obsRect.right - 6,
        top: obsRect.top + 5,
        bottom: obsRect.bottom - 2
      };

      if (
        dinoHitBox.right > obsHitBox.left &&
        dinoHitBox.left < obsHitBox.right &&
        dinoHitBox.bottom > obsHitBox.top &&
        dinoHitBox.top < obsHitBox.bottom
      ) {
        if (activePowerup === 'shield') {
          activePowerup = null;
          powerupStatus.classList.add('hidden');
          dino.classList.remove('has-shield');

          const boardRect = gameBoard.getBoundingClientRect();
          addParticles(obsRect.left - boardRect.left + 20, obsRect.top - boardRect.top + 20, 25, '#38bdf8', 6);

          obs.el.remove();
          obstacles.splice(i, 1);
          continue;
        } else if (hasReviveAvailable) {
          // Extra Life Revive triggered!
          hasReviveAvailable = false;
          AudioController.playPowerup();

          const boardRect = gameBoard.getBoundingClientRect();
          addParticles(dinoRect.left - boardRect.left + 35, dinoRect.top - boardRect.top + 20, 30, '#ec4899', 6);

          // Clear nearby obstacles
          obs.el.remove();
          obstacles.splice(i, 1);

          // Grant temporary shield bubble
          activatePowerup('shield');
          continue;
        } else {
          triggerGameOver();
          break;
        }
      }

      if (obs.x > gameBoard.clientWidth + 90) {
        obs.el.remove();
        obstacles.splice(i, 1);
      }
    }

    // 7. Powerup countdown
    if (activePowerup) {
      powerupDuration -= delta;
      const pct = Math.max(0, (powerupDuration / powerupMaxDuration) * 100);
      powerupBar.style.width = `${pct}%`;

      if (powerupDuration <= 0) {
        activePowerup = null;
        powerupStatus.classList.add('hidden');
        dino.classList.remove('has-shield');
      }
    }

    // 8. Score progression
    const scoreRate = activePowerup === 'star-boost' ? 0.3 * delta : 0.15 * delta;
    score += scoreRate;
    const currentScoreInt = Math.floor(score);
    scoreDisplay.textContent = String(currentScoreInt).padStart(5, '0');

    if (currentScoreInt >= 100 && Math.floor(currentScoreInt / 100) > lastMilestone) {
      lastMilestone = Math.floor(currentScoreInt / 100);
      AudioController.playScore();
      scoreContainer.classList.remove('flashing-score');
      void scoreContainer.offsetWidth;
      scoreContainer.classList.add('flashing-score');

      if (gameSpeed < maxSpeed) {
        gameSpeed += 0.45;
      }
    }

    // Day / Night cycle
    const shouldBeNight = Math.floor(currentScoreInt / 400) % 2 === 1;
    if (shouldBeNight !== isNight) {
      isNight = shouldBeNight;
      document.body.classList.toggle('night-mode', isNight);
    }
  }

  updateParticles(delta);

  requestAnimationFrame(gameLoop);
}

function triggerGameOver() {
  isGameOver = true;
  AudioController.playHit();
  dino.className = `crashed skin-${currentSkin}`;
  gameOverScreen.classList.remove('hidden');

  const boardRect = gameBoard.getBoundingClientRect();
  const dinoRect = dino.getBoundingClientRect();
  addParticles(dinoRect.left - boardRect.left + 35, dinoRect.top - boardRect.top + 25, 30, '#ef4444', 6);

  saveUserData();

  const finalScore = Math.floor(score);
  if (finalScore > highScore) {
    highScore = finalScore;
    highScoreDisplay.textContent = String(highScore).padStart(5, '0');
    try {
      localStorage.setItem('dino_jurassic_hi', highScore);
    } catch (e) {}
  }
}

function resetGame() {
  obstacles.forEach((o) => o.el.remove());
  obstacles = [];
  collectibles.forEach((c) => c.el.remove());
  collectibles = [];
  clouds.forEach((c) => c.el.remove());
  clouds = [];
  particles = [];

  isGameOver = false;
  isJumping = false;
  jumpCount = 0;
  isDucking = false;
  isRoaring = false;
  dinoY = 0;
  dinoVelocity = 0;
  score = 0;
  runCoins = 0;
  lastMilestone = 0;
  gameSpeed = 6.2;
  distanceSinceLastSpawn = 0;
  isNight = false;
  activePowerup = null;

  document.body.classList.remove('night-mode');
  powerupStatus.classList.add('hidden');
  roarBanner.classList.add('hidden');
  dino.classList.remove('has-shield');
  scoreContainer.classList.remove('flashing-score');

  // Apply purchased Starter Shield if owned
  if (inventory.starter_shield) {
    activatePowerup('shield');
  }

  // Restore extra life revive if owned
  hasReviveAvailable = !!inventory.extra_revive;

  dino.className = `running skin-${currentSkin}`;
  dino.style.bottom = '0px';
  scoreDisplay.textContent = '00000';
  gameOverScreen.classList.add('hidden');
}

// ==========================================
// CONTROLS & LISTENERS
// ==========================================
window.addEventListener('keydown', (e) => {
  if (e.code === 'Escape' && isShopOpen) {
    closeShop();
    return;
  }
  if (isShopOpen) return;

  if (e.code === 'Space' || e.code === 'ArrowUp') {
    e.preventDefault();
    jump();
  } else if (e.code === 'ArrowDown') {
    e.preventDefault();
    setDucking(true);
  } else if (e.code === 'KeyR') {
    e.preventDefault();
    roar();
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowDown') {
    setDucking(false);
  }
});

gameBoard.addEventListener('pointerdown', (e) => {
  if (isShopOpen) return;
  const rect = gameBoard.getBoundingClientRect();
  const touchY = e.clientY - rect.top;
  if (touchY < rect.height * 0.6) {
    jump();
  } else {
    setDucking(true);
  }
});

window.addEventListener('pointerup', () => {
  if (isDucking) setDucking(false);
});

touchJumpBtn.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  jump();
});

touchDuckBtn.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  setDucking(true);
});

touchDuckBtn.addEventListener('pointerup', (e) => {
  e.preventDefault();
  setDucking(false);
});

touchRoarBtn.addEventListener('pointerdown', (e) => {
  e.preventDefault();
  roar();
});

restartBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  resetGame();
});

muteBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  const isMuted = AudioController.toggleMute();
  muteBtn.textContent = isMuted ? '🔇 Sound: OFF' : '🔊 Sound: ON';
});

// Boot loop with Starter Shield check
if (inventory.starter_shield) {
  activatePowerup('shield');
}
hasReviveAvailable = !!inventory.extra_revive;

requestAnimationFrame(gameLoop);
