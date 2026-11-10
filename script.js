// 4K Ultra-Realistic Casino Roulette, Dynamic Coin Economy & Quest System

// 1. European Roulette Pockets Definition
const CASINO_POCKETS = [
  { num: '0',  category: 'Pure Luck',       color: '#068f3b', type: 'green', icon: '🍀', mult: 8 },
  { num: '32', category: 'Wealth & Gold',   color: '#b01424', type: 'red',   icon: '💰', mult: 3 },
  { num: '15', category: 'Wisdom & Mind',   color: '#1a1a1a', type: 'black', icon: '🦉', mult: 2 },
  { num: '19', category: 'Love & Heart',    color: '#b01424', type: 'red',   icon: '❤️', mult: 2.5 },
  { num: '4',  category: 'Career & Power',  color: '#1a1a1a', type: 'black', icon: '⚡', mult: 2 },
  { num: '21', category: 'Adventure',       color: '#b01424', type: 'red',   icon: '🧭', mult: 3 },
  { num: '2',  category: 'Health & Vital',  color: '#1a1a1a', type: 'black', icon: '🌿', mult: 2 },
  { num: '25', category: 'Chaos & Secret',  color: '#b01424', type: 'red',   icon: '🎲', mult: 4 },
  { num: '17', category: 'Pure Luck',       color: '#1a1a1a', type: 'black', icon: '🍀', mult: 2.5 },
  { num: '34', category: 'Wealth & Gold',   color: '#b01424', type: 'red',   icon: '💰', mult: 3 },
  { num: '6',  category: 'Wisdom & Mind',   color: '#1a1a1a', type: 'black', icon: '🦉', mult: 2 },
  { num: '27', category: 'Love & Heart',    color: '#b01424', type: 'red',   icon: '❤️', mult: 2.5 },
  { num: '13', category: 'Career & Power',  color: '#1a1a1a', type: 'black', icon: '⚡', mult: 2 },
  { num: '36', category: 'Adventure',       color: '#b01424', type: 'red',   icon: '🧭', mult: 3 },
  { num: '11', category: 'Health & Vital',  color: '#1a1a1a', type: 'black', icon: '🌿', mult: 2 },
  { num: '30', category: 'Chaos & Secret',  color: '#b01424', type: 'red',   icon: '🎲', mult: 4 }
];

const FORTUNES_DATA = {
  'Pure Luck': [
    "Miracles don't knock; they walk right in when you leave faith's door open.",
    "The dice of the cosmos are loaded in your favor today. Bet on yourself.",
    "A rare streak of serendipity is starting right now.",
    "Jackpot energy surrounds your upcoming venture!"
  ],
  'Wealth & Gold': [
    "A steady stream of prosperity follows disciplined ambition.",
    "An overlooked asset will soon prove worth ten times its apparent value.",
    "Wealth is not just in gold, but in knowing when you already have enough to win.",
    "Opportunities multiply as they are seized—watch your ledger blossom."
  ],
  'Wisdom & Mind': [
    "The grandmaster makes few moves, but every piece commands the board.",
    "Stillness cuts through panic faster than haste.",
    "Look past the noise of the table; observe the quiet patterns.",
    "To understand all is to command your destiny."
  ],
  'Love & Heart': [
    "A genuine smile given today will ignite a spark of everlasting warmth.",
    "You don't need a winning hand when you have someone who bets on you.",
    "A heartfelt conversation under evening lights will clear an old mystery.",
    "True love is the ultimate prize that never loses value."
  ],
  'Career & Power': [
    "Your quiet dedication is about to earn a standing ovation from leadership.",
    "Step up to the center table; the spotlight was built for your craft.",
    "A brilliant tactical move this week will dissolve an old obstacle.",
    "Authority comes not from loud demands, but unwavering consistency."
  ],
  'Adventure': [
    "A journey to an unfamiliar town holds the breakthrough you've dreamed of.",
    "Routine is comfortable, but daring makes the gambler's blood rush with joy.",
    "Pack your courage; an unscripted detour will become your best memory.",
    "The horizon is whispering your name—answer it."
  ],
  'Health & Vital': [
    "Rest is not surrender; it is the pit-stop before the championship lap.",
    "Drink clean water, walk beneath the open sky, and reclaim your inner fire.",
    "Your energy is rejuvenating—listen to the rhythm of your own strength.",
    "A calm body houses an unbeatable mind."
  ],
  'Chaos & Secret': [
    "A completely unexpected twist at 4 o'clock will turn your day into gold.",
    "An odd coincidence will open a door that was locked for three years.",
    "Expect the bizarre. Embrace the strange. Play the wildcard!",
    "What looked like a mistake was actually fate reorganizing the game."
  ]
};

// 2. Coin Economy & Quest System State (Ranges from 1 to 1000+)
const playerEconomy = {
  coins: 500, // Starting bankroll
  currentBet: 10,
  stats: {
    totalSpins: 0,
    totalCracked: 0,
    redHits: 0,
    blackHits: 0,
    greenHits: 0,
    coinsWon: 0,
    highStakeSpins: 0
  }
};

// Quests covering numbers ranging from 1 to 1000 coins in rewards and goals
const casinoQuests = [
  {
    id: 'first_spin',
    title: 'Beginner Gambler',
    desc: 'Spin the roulette wheel for the first time.',
    target: 1,
    current: 0,
    rewardCoins: 50,
    isCompleted: false,
    isClaimed: false,
    checkProgress: (state) => state.stats.totalSpins
  },
  {
    id: 'crack_three',
    title: 'Fortune Hunter',
    desc: 'Crack open 3 fortune cookies.',
    target: 3,
    current: 0,
    rewardCoins: 120,
    isCompleted: false,
    isClaimed: false,
    checkProgress: (state) => state.stats.totalCracked
  },
  {
    id: 'red_streak',
    title: 'Lady in Red',
    desc: 'Hit a RED pocket 2 times.',
    target: 2,
    current: 0,
    rewardCoins: 250,
    isCompleted: false,
    isClaimed: false,
    checkProgress: (state) => state.stats.redHits
  },
  {
    id: 'high_roller',
    title: 'High Roller Bet',
    desc: 'Place a high-stake bet (100 coins or more) on the wheel.',
    target: 1,
    current: 0,
    rewardCoins: 400,
    isCompleted: false,
    isClaimed: false,
    checkProgress: (state) => state.stats.highStakeSpins
  },
  {
    id: 'fortune_grandmaster',
    title: 'Imperial Grandmaster',
    desc: 'Spin the wheel 10 times to test true fate.',
    target: 10,
    current: 0,
    rewardCoins: 1000, // 1000 Coins Quest Jackpot!
    isCompleted: false,
    isClaimed: false,
    checkProgress: (state) => state.stats.totalSpins
  }
];

// 3. Audio Synthesizer (Web Audio API)
class CasinoAudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.8;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playBallRumble(speed) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140 + speed * 180, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320 + speed * 400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04 * Math.min(speed * 3, 1), this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch(e) {}
  }

  playBallBounce(intensity = 1) {
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800 + Math.random() * 400, t);
      osc.frequency.exponentialRampToValueAtTime(350, t + 0.04);

      gain.gain.setValueAtTime(0.25 * intensity, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(t);
      osc.stop(t + 0.04);

      const knock = this.ctx.createOscillator();
      const kGain = this.ctx.createGain();
      knock.type = 'triangle';
      knock.frequency.setValueAtTime(220, t);
      knock.frequency.exponentialRampToValueAtTime(60, t + 0.05);
      kGain.gain.setValueAtTime(0.18 * intensity, t);
      kGain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      knock.connect(kGain);
      kGain.connect(this.masterGain);
      knock.start(t);
      knock.stop(t + 0.05);
    } catch(e) {}
  }

  playCookieCrack() {
    if (!this.ctx) return;
    try {
      const t = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.18;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.035));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;
      filter.Q.value = 4;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.45, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.18);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      noise.start(t);
    } catch(e) {}
  }

  playCoinSound() {
    if (!this.ctx) return;
    try {
      const freqs = [987.77, 1318.51]; // B5 to E6 chime
      freqs.forEach((f, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, this.ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.25);
      });
    } catch(e) {}
  }

  playJackpot() {
    if (!this.ctx) return;
    try {
      const notes = [440, 554.37, 659.25, 880, 1108.73];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.09);
        gain.gain.setValueAtTime(0.18, this.ctx.currentTime + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.09 + 0.6);
        osc.connect(gain);
        gain.connect(this.masterGain);
        osc.start(this.ctx.currentTime + idx * 0.09);
        osc.stop(this.ctx.currentTime + idx * 0.09 + 0.6);
      });
    } catch(e) {}
  }
}
const audio = new CasinoAudioEngine();

// 4. DOM Elements
const canvas = document.getElementById('roulette-canvas');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spin-btn');
const crackBtn = document.getElementById('crack-btn');
const resetBtn = document.getElementById('reset-btn');
const historyToggleBtn = document.getElementById('history-toggle-btn');
const closeHistoryBtn = document.getElementById('close-history-btn');
const historyDrawer = document.getElementById('history-drawer');
const historyList = document.getElementById('history-list');
const historyCount = document.getElementById('history-count');
const statusText = document.getElementById('status-text');
const statusIndicator = document.querySelector('.status-indicator');
const categoryBadge = document.getElementById('category-badge');
const cookieStage = document.getElementById('cookie-stage');
const cookieContainer = document.getElementById('cookie-container');
const cookiePrompt = document.getElementById('cookie-prompt');
const slipCategory = document.getElementById('slip-category');
const slipText = document.getElementById('slip-text');
const luckyNumbersEl = document.getElementById('lucky-numbers');
const luckyScoreEl = document.getElementById('lucky-score');
const slipCoinReward = document.getElementById('slip-coin-reward');
const slipMultiplier = document.getElementById('slip-multiplier');
const turretCenter = document.getElementById('turret-centerpiece');

// Economy & Quest DOM
const userCoinsEl = document.getElementById('user-coins');
const claimDailyBtn = document.getElementById('claim-daily-btn');
const betChipBtns = document.querySelectorAll('.bet-chip-btn');
const questHudToggle = document.getElementById('quest-hud-toggle');
const questBtn = document.getElementById('quest-btn');
const questsDrawer = document.getElementById('quests-drawer');
const closeQuestsBtn = document.getElementById('close-quests-btn');
const questsContainer = document.getElementById('quests-container');
const questCompletedCount = document.getElementById('quest-completed-count');

// 5. Update Coin Display & Storage
function updateCoinDisplay() {
  userCoinsEl.textContent = playerEconomy.coins.toLocaleString();
}

// 6. Quests Engine
function updateQuests() {
  let completed = 0;
  casinoQuests.forEach(q => {
    q.current = q.checkProgress(playerEconomy);
    if (q.current >= q.target) {
      q.isCompleted = true;
    }
    if (q.isClaimed) {
      completed++;
    }
  });

  questCompletedCount.textContent = `${completed} / ${casinoQuests.length} Complete`;
  renderQuests();
}

function renderQuests() {
  questsContainer.innerHTML = casinoQuests.map(q => {
    const pct = Math.min(100, Math.round((q.current / q.target) * 100));
    let actionBtnHtml = '';
    
    if (q.isClaimed) {
      actionBtnHtml = `<span class="claimed-badge">✓ Claimed</span>`;
    } else if (q.isCompleted) {
      actionBtnHtml = `<button class="claim-quest-btn" onclick="claimQuestReward('${q.id}')">Claim +${q.rewardCoins} 🪙</button>`;
    } else {
      actionBtnHtml = `<span>${q.current} / ${q.target}</span>`;
    }

    return `
      <div class="quest-card ${q.isCompleted ? 'completed' : ''}">
        <div class="quest-top">
          <span class="quest-title">${q.title}</span>
          <span class="quest-reward-tag">+${q.rewardCoins} 🪙</span>
        </div>
        <p class="quest-desc">${q.desc}</p>
        <div class="quest-progress-bar-bg">
          <div class="quest-progress-fill" style="width: ${pct}%"></div>
        </div>
        <div class="quest-bottom">
          <span>Progress: ${pct}%</span>
          ${actionBtnHtml}
        </div>
      </div>
    `;
  }).join('');
}

window.claimQuestReward = function(questId) {
  const q = casinoQuests.find(item => item.id === questId);
  if (q && q.isCompleted && !q.isClaimed) {
    q.isClaimed = true;
    playerEconomy.coins += q.rewardCoins;
    audio.playCoinSound();
    triggerCasinoConfetti();
    updateCoinDisplay();
    updateQuests();
  }
};

// 7. Bet Selection Logic
betChipBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const betVal = parseInt(btn.dataset.bet, 10);
    playerEconomy.currentBet = betVal;
    betChipBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    audio.playCoinSound();
  });
});

// Daily / Free Coin Bonus
claimDailyBtn.addEventListener('click', () => {
  playerEconomy.coins += 100;
  audio.playCoinSound();
  updateCoinDisplay();
  claimDailyBtn.textContent = 'Claimed!';
  claimDailyBtn.disabled = true;
  setTimeout(() => {
    claimDailyBtn.textContent = '🎁 +100';
    claimDailyBtn.disabled = false;
  }, 10000); // 10s cooldown
});

// 8. 4K Ultra-Realistic Roulette Physics & Canvas
const numPockets = CASINO_POCKETS.length;
const arc = (2 * Math.PI) / numPockets;

const gameState = {
  wheelAngle: 0,
  wheelSpeed: 0,
  ballAngle: 0,
  ballSpeed: 0,
  ballRadius: 420,
  ballInPocket: false,
  isSpinning: false,
  readyToCrack: false,
  cracked: false,
  selectedPocket: null,
  potentialCoinWin: 0
};

const CX = 500;
const CY = 500;
const POCKET_OUTER = 440;
const POCKET_INNER = 330;

function renderWheel() {
  ctx.clearRect(0, 0, 1000, 1000);

  // Outer Brass Deflector Track & Frets
  const trackGrad = ctx.createRadialGradient(CX, CY, 440, CX, CY, 495);
  trackGrad.addColorStop(0, '#5a3d07');
  trackGrad.addColorStop(0.3, '#d4af37');
  trackGrad.addColorStop(0.6, '#ffd966');
  trackGrad.addColorStop(0.85, '#855e0f');
  trackGrad.addColorStop(1, '#2b1a03');

  ctx.beginPath();
  ctx.arc(CX, CY, 485, 0, Math.PI * 2);
  ctx.arc(CX, CY, 440, 0, Math.PI * 2, true);
  ctx.fillStyle = trackGrad;
  ctx.fill();

  // 8 Diamond Brass Ball Deflectors along the track
  for (let d = 0; d < 8; d++) {
    const dAngle = (d * Math.PI * 2) / 8;
    const dx = CX + 462 * Math.cos(dAngle);
    const dy = CY + 462 * Math.sin(dAngle);
    ctx.save();
    ctx.translate(dx, dy);
    ctx.rotate(dAngle + Math.PI / 4);
    ctx.fillStyle = '#fff4bd';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 6;
    ctx.fillRect(-6, -6, 12, 12);
    ctx.restore();
  }

  // Rotating Rotor Cylinder
  ctx.save();
  ctx.translate(CX, CY);
  ctx.rotate(gameState.wheelAngle);
  ctx.translate(-CX, -CY);

  const rimGrad = ctx.createRadialGradient(CX, CY, 420, CX, CY, 442);
  rimGrad.addColorStop(0, '#855e0f');
  rimGrad.addColorStop(0.5, '#ffd966');
  rimGrad.addColorStop(1, '#5a3d07');
  ctx.beginPath();
  ctx.arc(CX, CY, 442, 0, Math.PI * 2);
  ctx.arc(CX, CY, 436, 0, Math.PI * 2, true);
  ctx.fillStyle = rimGrad;
  ctx.fill();

  // Draw Pockets
  for (let i = 0; i < numPockets; i++) {
    const p = CASINO_POCKETS[i];
    const startAngle = i * arc;
    const endAngle = startAngle + arc;

    ctx.beginPath();
    ctx.moveTo(CX, CY);
    ctx.arc(CX, CY, POCKET_OUTER, startAngle, endAngle);
    ctx.closePath();
    
    const pocketGrad = ctx.createRadialGradient(CX, CY, POCKET_INNER, CX, CY, POCKET_OUTER);
    if (p.type === 'red') {
      pocketGrad.addColorStop(0, '#660812');
      pocketGrad.addColorStop(0.7, '#c71828');
      pocketGrad.addColorStop(1, '#e62e3d');
    } else if (p.type === 'black') {
      pocketGrad.addColorStop(0, '#0d0d0d');
      pocketGrad.addColorStop(0.7, '#1f1f1f');
      pocketGrad.addColorStop(1, '#333333');
    } else {
      pocketGrad.addColorStop(0, '#04421b');
      pocketGrad.addColorStop(0.7, '#088a3a');
      pocketGrad.addColorStop(1, '#11b852');
    }
    ctx.fillStyle = pocketGrad;
    ctx.fill();

    // Brass Frets
    ctx.beginPath();
    ctx.moveTo(
      CX + POCKET_INNER * Math.cos(startAngle),
      CY + POCKET_INNER * Math.sin(startAngle)
    );
    ctx.lineTo(
      CX + POCKET_OUTER * Math.cos(startAngle),
      CY + POCKET_OUTER * Math.sin(startAngle)
    );
    ctx.lineWidth = 3.5;
    ctx.strokeStyle = '#ffd966';
    ctx.stroke();

    // Labels inside pocket
    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(startAngle + arc / 2);
    ctx.textAlign = 'center';

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px "Cinzel", serif';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 5;
    ctx.fillText(p.num, POCKET_OUTER - 32, 8);

    ctx.font = '16px "Nunito", sans-serif';
    ctx.fillStyle = '#ffdf7e';
    ctx.fillText(p.icon, POCKET_OUTER - 64, 6);

    ctx.restore();
  }

  // Inner Cone
  const coneGrad = ctx.createRadialGradient(CX, CY, 50, CX, CY, POCKET_INNER);
  coneGrad.addColorStop(0, '#ffffff');
  coneGrad.addColorStop(0.2, '#ffd700');
  coneGrad.addColorStop(0.5, '#996f0e');
  coneGrad.addColorStop(0.85, '#402903');
  coneGrad.addColorStop(1, '#1a1001');

  ctx.beginPath();
  ctx.arc(CX, CY, POCKET_INNER, 0, Math.PI * 2);
  ctx.fillStyle = coneGrad;
  ctx.fill();

  ctx.restore();

  drawIvoryBall();
}

function drawIvoryBall() {
  const bx = CX + gameState.ballRadius * Math.cos(gameState.ballAngle);
  const by = CY + gameState.ballRadius * Math.sin(gameState.ballAngle);

  ctx.beginPath();
  ctx.arc(bx + 4, by + 6, 12, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
  ctx.fill();

  const ballGrad = ctx.createRadialGradient(bx - 3, by - 4, 1.5, bx, by, 12);
  ballGrad.addColorStop(0, '#ffffff');
  ballGrad.addColorStop(0.3, '#f5f5f5');
  ballGrad.addColorStop(0.7, '#d6d3ce');
  ballGrad.addColorStop(0.95, '#8c8883');
  ballGrad.addColorStop(1, '#474542');

  ctx.beginPath();
  ctx.arc(bx, by, 11, 0, Math.PI * 2);
  ctx.fillStyle = ballGrad;
  ctx.fill();

  ctx.beginPath();
  ctx.arc(bx - 4, by - 4, 3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
  ctx.fill();
}

// 9. Casino Spin Mechanics with Coin Betting
let lastFretTick = -1;
let rumbleTimer = 0;

function startCasinoSpin() {
  if (gameState.isSpinning) return;

  // Check if player has enough coins
  if (playerEconomy.coins < playerEconomy.currentBet) {
    alert(`Not enough coins! You need ${playerEconomy.currentBet} coins to spin. Claim the free +100 bonus above!`);
    return;
  }

  audio.init();

  // Deduct Bet from Vault
  playerEconomy.coins -= playerEconomy.currentBet;
  updateCoinDisplay();

  // Track Quest Progress
  playerEconomy.stats.totalSpins++;
  if (playerEconomy.currentBet >= 100) {
    playerEconomy.stats.highStakeSpins++;
  }
  updateQuests();

  gameState.isSpinning = true;
  gameState.readyToCrack = false;
  gameState.cracked = false;
  gameState.ballInPocket = false;

  spinBtn.disabled = true;
  crackBtn.disabled = true;

  statusIndicator.classList.add('spinning');
  statusText.innerHTML = `BET PLACED: -${playerEconomy.currentBet} 🪙 | Ball in play...`;
  categoryBadge.textContent = 'Spinning in Progress...';
  categoryBadge.classList.remove('highlight');
  cookieStage.classList.remove('ready');
  cookieContainer.classList.remove('cracked');
  cookiePrompt.innerHTML = '✨ Watch the ball dance across the brass frets...';

  gameState.wheelSpeed = 0.05 + Math.random() * 0.02;
  gameState.ballRadius = 462;
  gameState.ballSpeed = -(0.24 + Math.random() * 0.06);

  let phase = 'rim';
  let bounceCount = 0;
  const maxBounces = 4 + Math.floor(Math.random() * 4);

  function physicsLoop() {
    gameState.wheelAngle = (gameState.wheelAngle + gameState.wheelSpeed) % (Math.PI * 2);
    gameState.wheelSpeed *= 0.9985;

    if (turretCenter) {
      turretCenter.style.transform = `translate(-50%, -50%) rotate(${gameState.wheelAngle}rad)`;
    }

    if (phase === 'rim') {
      gameState.ballAngle = (gameState.ballAngle + gameState.ballSpeed) % (Math.PI * 2);
      gameState.ballSpeed *= 0.989;

      rumbleTimer++;
      if (rumbleTimer % 4 === 0) {
        audio.playBallRumble(Math.abs(gameState.ballSpeed));
      }

      if (Math.abs(gameState.ballSpeed) < 0.09) {
        phase = 'drop';
      }
    } else if (phase === 'drop') {
      gameState.ballAngle = (gameState.ballAngle + gameState.ballSpeed) % (Math.PI * 2);
      gameState.ballSpeed *= 0.982;
      gameState.ballRadius -= 2.8;

      if (gameState.ballRadius <= 385) {
        phase = 'bounce';
      }
    } else if (phase === 'bounce') {
      gameState.ballAngle = (gameState.ballAngle + gameState.ballSpeed) % (Math.PI * 2);
      
      const relativeAngle = ((gameState.ballAngle - gameState.wheelAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      const currentFret = Math.floor(relativeAngle / arc);

      if (currentFret !== lastFretTick) {
        audio.playBallBounce(0.9 - (bounceCount * 0.1));
        lastFretTick = currentFret;
        bounceCount++;
        gameState.ballRadius = 385 + (Math.random() * 12 - 6);
        gameState.ballSpeed *= 0.94;
      }

      if (bounceCount >= maxBounces && Math.abs(gameState.ballSpeed - gameState.wheelSpeed) < 0.015) {
        phase = 'settled';
        gameState.ballInPocket = true;
      }
    } else if (phase === 'settled') {
      const finalRelativeAngle = ((gameState.ballAngle - gameState.wheelAngle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      const winningIndex = Math.floor(finalRelativeAngle / arc) % numPockets;

      const pocketCenterRel = winningIndex * arc + arc / 2;
      gameState.ballAngle = gameState.wheelAngle + pocketCenterRel;
      gameState.ballRadius = 380;

      renderWheel();
      onBallSettled(winningIndex);
      return;
    }

    renderWheel();
    requestAnimationFrame(physicsLoop);
  }

  requestAnimationFrame(physicsLoop);
}

// 10. Ball Settled: Calculate Coin Payouts
function onBallSettled(pocketIndex) {
  const winner = CASINO_POCKETS[pocketIndex];
  gameState.selectedPocket = winner;
  gameState.isSpinning = false;
  gameState.readyToCrack = true;

  // Track Quest Colors
  if (winner.type === 'red') playerEconomy.stats.redHits++;
  else if (winner.type === 'black') playerEconomy.stats.blackHits++;
  else if (winner.type === 'green') playerEconomy.stats.greenHits++;
  updateQuests();

  // Calculate Coin Reward (1 to 1000+ depending on bet and multiplier)
  const baseReward = Math.round(playerEconomy.currentBet * winner.mult);
  // Add a random fortune lucky bonus (1 to 50 coins)
  const bonusLuckyCoins = Math.floor(Math.random() * 50) + 1;
  gameState.potentialCoinWin = Math.min(1000, baseReward + bonusLuckyCoins);

  statusIndicator.classList.remove('spinning');
  statusText.innerHTML = `BALL SETTLED: Pocket <strong style="color: ${winner.type === 'red' ? '#ff4d6d' : (winner.type === 'green' ? '#00ff88' : '#e0e0e0')}">${winner.num}</strong>! Payout Ready: +${gameState.potentialCoinWin} 🪙!`;
  
  categoryBadge.textContent = `${winner.num} ${winner.icon} ${winner.category}`;
  categoryBadge.classList.add('highlight');

  cookieStage.classList.add('ready');
  crackBtn.disabled = false;
  spinBtn.disabled = false;
  cookiePrompt.innerHTML = `👉 <strong>CRACK YOUR COOKIE</strong> to claim your +${gameState.potentialCoinWin} 🪙!`;

  audio.playJackpot();
}

// 11. Cookie Cracking & Coin Deposit
function crackCookie() {
  if (!gameState.readyToCrack || gameState.cracked) return;

  gameState.cracked = true;
  audio.playCookieCrack();

  // Deposit won coins into Vault
  playerEconomy.coins += gameState.potentialCoinWin;
  playerEconomy.stats.coinsWon += gameState.potentialCoinWin;
  playerEconomy.stats.totalCracked++;
  updateCoinDisplay();
  updateQuests();

  const pocket = gameState.selectedPocket;
  const fortunes = FORTUNES_DATA[pocket.category] || FORTUNES_DATA['Wisdom & Mind'];
  const fortuneText = fortunes[Math.floor(Math.random() * fortunes.length)];

  const luckySet = new Set();
  luckySet.add(pocket.num.padStart(2, '0'));
  while (luckySet.size < 4) {
    const r = Math.floor(Math.random() * 36) + 1;
    luckySet.add(r.toString().padStart(2, '0'));
  }
  const luckyString = Array.from(luckySet).join(', ');
  const starScore = '★'.repeat(pocket.type === 'green' ? 6 : (pocket.type === 'red' ? 5 : 4));

  // Populate Fortune Slip with Coin Payout
  slipCategory.textContent = `POCKET ${pocket.num} • ${pocket.icon} ${pocket.category}`;
  slipText.textContent = `"${fortuneText}"`;
  slipCoinReward.textContent = gameState.potentialCoinWin;
  slipMultiplier.textContent = `x${pocket.mult} Multiplier`;
  luckyNumbersEl.textContent = `Lucky Numbers: ${luckyString}`;
  luckyScoreEl.textContent = `Payout Luck: ${starScore}`;

  cookieContainer.classList.add('cracked');
  cookiePrompt.innerHTML = `👑 Credited +${gameState.potentialCoinWin} Coins to your Vault!`;
  crackBtn.disabled = true;

  audio.playCoinSound();
  triggerCasinoConfetti();

  saveFortuneRecord({
    pocket: pocket.num,
    type: pocket.type,
    category: pocket.category,
    icon: pocket.icon,
    fortune: fortuneText,
    rewardCoins: gameState.potentialCoinWin,
    numbers: luckyString,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  });
}

function resetGame() {
  gameState.readyToCrack = false;
  gameState.cracked = false;
  gameState.selectedPocket = null;
  gameState.potentialCoinWin = 0;

  cookieContainer.classList.remove('cracked');
  cookieStage.classList.remove('ready');
  categoryBadge.classList.remove('highlight');
  categoryBadge.textContent = 'Awaiting Ball Landing...';
  statusText.innerHTML = 'BALL READY: Select a bet & tap <strong>SPIN</strong>!';
  cookiePrompt.innerHTML = '▾ Place bets and spin the wheel!';
  crackBtn.disabled = true;
  spinBtn.disabled = false;
}

// 12. History Records
const historyRecords = [];
function saveFortuneRecord(item) {
  historyRecords.unshift(item);
  historyCount.textContent = historyRecords.length;
  renderHistory();
}

function renderHistory() {
  if (historyRecords.length === 0) {
    historyList.innerHTML = '<p class="empty-history">No winning fortunes recorded yet.</p>';
    return;
  }

  historyList.innerHTML = historyRecords.map(r => `
    <div class="history-card">
      <div class="h-cat">${r.icon} Pocket ${r.pocket} (${r.type.toUpperCase()}) — ${r.category}</div>
      <div class="h-reward">🪙 Won +${r.rewardCoins} Coins</div>
      <div class="h-text">"${r.fortune}"</div>
      <div class="h-time">Lucky Nos: ${r.numbers} • ${r.time}</div>
    </div>
  `).join('');
}

// 13. Confetti Particles
const confettiCanvas = document.getElementById('confetti-canvas');
const confettiCtx = confettiCanvas.getContext('2d');
let confettiParticles = [];
let confettiFrame = null;

function resizeConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeConfetti);
resizeConfetti();

function triggerCasinoConfetti() {
  confettiParticles = [];
  const palette = ['#ffd700', '#ffea80', '#e63946', '#00ff88', '#ffffff', '#c71828'];

  for (let i = 0; i < 110; i++) {
    confettiParticles.push({
      x: window.innerWidth * 0.7,
      y: window.innerHeight * 0.5,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 1.3) * 14,
      size: Math.random() * 9 + 4,
      color: palette[Math.floor(Math.random() * palette.length)],
      rot: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      alpha: 1,
      decay: 0.007 + Math.random() * 0.008
    });
  }

  if (confettiFrame) cancelAnimationFrame(confettiFrame);

  function confettiLoop() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let active = false;

    confettiParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.28;
      p.rot += p.vRot;
      p.alpha -= p.decay;

      if (p.alpha > 0) {
        active = true;
        confettiCtx.save();
        confettiCtx.translate(p.x, p.y);
        confettiCtx.rotate((p.rot * Math.PI) / 180);
        confettiCtx.globalAlpha = Math.max(0, p.alpha);
        confettiCtx.fillStyle = p.color;
        confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        confettiCtx.restore();
      }
    });

    if (active) {
      confettiFrame = requestAnimationFrame(confettiLoop);
    } else {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  confettiLoop();
}

// 14. Event Listeners & Initializers
spinBtn.addEventListener('click', startCasinoSpin);
crackBtn.addEventListener('click', crackCookie);
cookieContainer.addEventListener('click', crackCookie);
resetBtn.addEventListener('click', resetGame);

// Quests Drawer Toggle
questHudToggle.addEventListener('click', () => {
  questsDrawer.classList.toggle('open');
});

questBtn.addEventListener('click', () => {
  questsDrawer.classList.toggle('open');
});

closeQuestsBtn.addEventListener('click', () => {
  questsDrawer.classList.remove('open');
});

historyToggleBtn.addEventListener('click', () => {
  historyDrawer.classList.toggle('open');
});

closeHistoryBtn.addEventListener('click', () => {
  historyDrawer.classList.remove('open');
});

// Initialization
updateCoinDisplay();
updateQuests();
renderWheel();
