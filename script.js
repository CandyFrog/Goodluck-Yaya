// ========== KONFIGURASI PESAN ==========
const letterMessage = `Hai.

Semangat untuk hari ini.
Aku tau kamu udah latihan,
capek,
dan tetap bertahan sampai titik ini.

Apa pun hasilnya nanti,
semoga kamu bisa menikmati setiap gerak,
setiap irama,
dan setiap detik di panggung.

Tampil dengan percaya diri.
Kamu udah sejauh ini. 🎇`;

// ========== VARIABLES ==========
const envelopeScreen = document.getElementById('envelope-screen');
const envelopeWrapper = document.querySelector('.envelope-wrapper');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bgMusic');
const musicToggleBtn = document.getElementById('musicToggle');
const musicIcon = document.getElementById('musicIcon');
const musicText = document.getElementById('musicText');
const typedMessage = document.getElementById('typed-message');
const confettiContainer = document.getElementById('confetti-container');

// ========== ENVELOPE OPENING ==========
function openEnvelope() {
  envelopeWrapper.classList.add('open');
  
  // Auto play music
  setTimeout(() => {
    bgMusic.volume = 0.35;
    bgMusic.play().then(() => {
      feather.replace();
      musicIcon.setAttribute('data-feather', 'pause');
      musicText.textContent = 'Pause Music';
      feather.replace();
    }).catch(err => {
      console.log('Autoplay blocked:', err);
    });
  }, 800);

  // Transition to main content with slide up effect
  setTimeout(() => {
    envelopeScreen.classList.add('slide-up');
    mainContent.classList.add('visible');
    
    // Start confetti
    startConfetti();
    
    // Start typing animation
    setTimeout(() => {
      typeWriterEffect();
    }, 600);
  }, 1600);
}

// ========== MUSIC TOGGLE ==========
function toggleMusic() {
  if (bgMusic.paused) {
    bgMusic.play();
    musicIcon.setAttribute('data-feather', 'pause');
    musicText.textContent = 'Pause Music';
  } else {
    bgMusic.pause();
    musicIcon.setAttribute('data-feather', 'play');
    musicText.textContent = 'Play Music';
  }
  feather.replace();
}

// ========== TYPEWRITER EFFECT ==========
let charIndex = 0;
function typeWriterEffect() {
  if (charIndex < letterMessage.length) {
    const char = letterMessage.charAt(charIndex);
    
    if (char === '\n') {
      typedMessage.innerHTML += '<br>';
    } else {
      typedMessage.innerHTML += char;
    }
    
    charIndex++;
    setTimeout(typeWriterEffect, 55);
  }
}

// ========== CONFETTI ANIMATION (TURUN KE BAWAH) ==========
function createConfetti() {
  const colors = ['#FFB3C6', '#FF8FAB', '#FB6F92', '#FF6B9D', '#FFD1E3'];
  const symbols = ['💗', '💕', '💖', '🌸', '✨'];
  const confetti = document.createElement('div');
  
  // Random: pakai warna solid atau emoji
  if (Math.random() > 0.5) {
    confetti.classList.add('confetti');
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    // Random size
    const size = Math.random() * 8 + 6;
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    
    // Random shape
    if (Math.random() > 0.5) {
      confetti.style.borderRadius = '50%';
    }
  } else {
    confetti.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    confetti.style.fontSize = (Math.random() * 10 + 15) + 'px';
    confetti.style.position = 'absolute';
  }
  
  // Random position
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.top = '-20px';
  
  // Random animation duration
  const duration = Math.random() * 3 + 3;
  confetti.style.animation = `fall ${duration}s linear forwards`;
  
  confettiContainer.appendChild(confetti);
  
  // Remove after animation
  setTimeout(() => {
    confetti.remove();
  }, duration * 1000);
}

function startConfetti() {
  // Create initial burst
  for (let i = 0; i < 30; i++) {
    setTimeout(() => createConfetti(), i * 100);
  }
  
  // Continue creating confetti
  setInterval(() => {
    createConfetti();
  }, 400);
}

// ========== INITIALIZE FEATHER ICONS ==========
document.addEventListener('DOMContentLoaded', () => {
  feather.replace();
});