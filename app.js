
const MESSAGES = [
 "You are my favourite person in every timeline.",
      "If I had to choose again, I’d still choose you. Every single time.",
      "You make normal days feel like little adventures.",
      "I love the way your laugh makes everything else fade out.",
      "Thank you for being you. It’s my favourite thing.",
      "You’re not just part of my life, you are my life.",
      "Out of 8 billion people, my heart still glitches when I see you.",
      "You are the calm in my chaos and the chaos in my boring.",
      "Statistically speaking, you are 100% wonderful.",
      "You make clowns, foxes and my whole universe make sense.",
      "You are my Muse. You are my inspiration.",
      "There is nothing more beautiful than you. You make me breathless.",
      "My heart beats for you. Only you. Always you.",
      "Sherry Bobbins has a big place in my heart.",
      "You are perfect. You are truly flawless.",
      "My love for you cannot be expressed with words.",
      "I adore you Kerry. I worship you.",
];
const millisPerDay = 24 * 60 * 60 * 1000;
const today = Math.floor(Date.now() / millisPerDay);
const cycle = Math.floor(today / MESSAGES.length);
const indexToday = today % MESSAGES.length;

function shuffle(array) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getCycleKey(cycleNumber) {
  return `the-button-cycle-${cycleNumber}`;
}

function getShuffledForCycle(cycleNumber) {
  const key = getCycleKey(cycleNumber);
  const saved = localStorage.getItem(key);

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      // Basic validation
      if (Array.isArray(parsed) && parsed.length === MESSAGES.length) return parsed;
    } catch (_) {}
  }

  const shuffled = shuffle(MESSAGES);
  localStorage.setItem(key, JSON.stringify(shuffled));

  // Optional cleanup: remove older cycles to avoid storage buildup
  const oldKey = getCycleKey(cycleNumber - 3);
  localStorage.removeItem(oldKey);

  return shuffled;
}

const todaysList = getShuffledForCycle(cycle);

function getMessageForToday() {
  return todaysList[indexToday];
}

document.addEventListener("DOMContentLoaded", () => {
  const messageEl = document.getElementById("message");
  const buttonEl = document.getElementById("theButton");

  buttonEl.addEventListener("click", () => {
    messageEl.textContent = getMessageForToday();
  });
});