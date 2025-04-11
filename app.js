// Audio context setup
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playNote(frequency = 440, duration = 100, volume = 0.2) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.value = frequency;

  gainNode.gain.value = volume;

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  setTimeout(() => {
    gainNode.gain.exponentialRampToValueAtTime(
      0.00001,
      audioCtx.currentTime + 0.1
    );
    setTimeout(() => {
      oscillator.stop();
    }, 100);
  }, duration);
}

// Birthday song setup
let i = 0;
const hbd = [
  264, 264, 297, 264, 352, 330, 264, 264, 297, 264, 396, 352, 264, 264, 523.25,
  440, 352, 330, 297, 466, 466, 440, 352, 396, 352,
];

const words = [
  "Hap-",
  "py",
  "birth-",
  "day",
  "to",
  "👉 You",
  "Hap-",
  "py",
  "birth-",
  "day",
  "to",
  "You 👈",
  "Hap-",
  "py",
  "birth-",
  "day",
  "dear",
  "Sweet-",
  "heart",
  "Hap-",
  "py",
  "birth-",
  "day",
  "to",
  "🎉 You 🎊",
];

// Create confetti
function createConfetti() {
  const colors = [
    "#ff3d7f",
    "#3d5afe",
    "#00cfdd",
    "#ffcc00",
    "#8e44ad",
    "#2ecc71",
  ];

  for (let i = 0; i < 150; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");

      const size = Math.random() * 10 + 5;
      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;

      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = `${Math.random() * 100}vw`;

      const duration = Math.random() * 3 + 2;
      confetti.style.animation = `confettiFall ${duration}s forwards ease-out`;

      if (Math.random() > 0.5) {
        confetti.style.borderRadius = "50%";
      } else {
        confetti.style.borderRadius = `${Math.random() * 5}px`;
      }

      document.body.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, duration * 1000);
    }, i * 50);
  }
}

// Create particles
function createParticles() {
  const container = document.getElementById("particles");
  const colors = [
    "rgba(255, 61, 127, 0.2)",
    "rgba(61, 90, 254, 0.2)",
    "rgba(0, 207, 221, 0.2)",
  ];

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 15 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particle.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.bottom = `-${size}px`;

    const duration = Math.random() * 15 + 10;
    particle.style.animation = `float ${duration}s infinite linear`;
    particle.style.animationDelay = `${Math.random() * duration}s`;

    container.appendChild(particle);
  }
}

// Set up birthday button
const birthdayBtn = document.getElementById("birthdayBtn");
birthdayBtn.onclick = function () {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }

  if (i >= hbd.length) i = 0;

  const hz = hbd[i];
  let dur = 300;

  let word = words[i];

  if (i === 18) {
    dur = dur * 5;
    birthdayBtn.classList.add("animate__animated", "animate__heartBeat");
    createConfetti();
    setTimeout(() => {
      birthdayBtn.classList.remove("animate__animated", "animate__heartBeat");
    }, 1000);
  }

  birthdayBtn.innerHTML = `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
       <path d="M9 18V5l12-2v13"></path>
       <circle cx="6" cy="18" r="3"></circle>
       <circle cx="18" cy="16" r="3"></circle>
     </svg>
     ${word}
   `;

  playNote(hz, dur, 0.2);

  i++;
};

// Set up gallery button
const galleryBtn = document.getElementById("galleryBtn");
const gallery = document.getElementById("gallery");

galleryBtn.onclick = function () {
  if (gallery.style.display === "grid") {
    gallery.style.display = "none";
    galleryBtn.innerText = "Lihat Galeri Kenangan";
  } else {
    gallery.style.display = "grid";
    galleryBtn.innerText = "Sembunyikan Galeri";
  }
};

// Set up wish display
const wishes = [
  "Semoga semua impianmu menjadi kenyataan! ✨",
  "Semoga tahun ini membawa keberkahan melimpah! 🌟",
  "Semoga bahagia dan sukses selalu! 💫",
  "Selamat ulang tahun, sayangku! 💕",
  "Kamu pantas mendapatkan yang terbaik hari ini! 🎁",
  "Aku bersyukur memilikimu dalam hidupku! 💖",
];

const wishDisplay = document.getElementById("wishDisplay");
let wishIndex = 0;

function changeWish() {
  wishDisplay.style.opacity = "0";

  setTimeout(() => {
    wishDisplay.innerText = wishes[wishIndex];
    wishDisplay.style.opacity = "1";
    wishIndex = (wishIndex + 1) % wishes.length;
  }, 500);
}

setInterval(changeWish, 4000);
changeWish();

// Initialize everything
createParticles();
createConfetti();
