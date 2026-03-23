// ==========================================
// DOM ELEMENTS
// ==========================================
const bracketContainer = document.getElementById('bracket-container');

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    renderPlaceholderBracket();

    // Menu Navigate Mobile Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Fechar menu mobile ao clicar num link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
});

// ==========================================
// 1. COUNTDOWN TIMER LOGIC
// ==========================================
function initCountdown() {
    // Definir a data do torneio: 26 de Março de 2026 às 09:00:00
    const targetDate = new Date('March 26, 2026 09:00:00').getTime();

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Se o torneio já começou
        if (distance < 0) {
            clearInterval(interval);
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
            return;
        }

        // Cálculos de tempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Atualizar o DOM
        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }, 1000);
}

// ==========================================
// 2. TOURNAMENT BRACKET GENERATOR (VISUAL)
// ==========================================

// DADOS (EDITA AQUI MANUALMENTE)
const roundsData = {
  1: Array(16).fill().map((_, i) => ({
    player1: "A definir",
    player2: "A definir",
    score1: "-",
    score2: "-",
    winner: null
  })),
  2: Array(8).fill().map(() => ({ player1: "A definir", player2: "A definir", score1: "-", score2: "-", winner: null })),
  3: Array(4).fill().map(() => ({ player1: "A definir", player2: "A definir", score1: "-", score2: "-", winner: null })),
  4: Array(2).fill().map(() => ({ player1: "A definir", player2: "A definir", score1: "-", score2: "-", winner: null }))
};

const finalMatch = {
  player1: "A definir",
  player2: "A definir",
  score1: "-",
  score2: "-",
  winner: null
};

const thirdMatch = {
  player1: "A definir",
  player2: "A definir",
  score1: "-",
  score2: "-",
  winner: null
};

// RENDER MATCH
function renderMatch(match, num) {
  return `
    <div class="match-box">
      <div class="match-number">#${num}</div>
      <div class="player-row ${match.winner === 1 ? "is-winner" : ""}">
        <span>${match.player1}</span>
        <span class="player-score">${match.score1}</span>
      </div>
      <div class="player-row ${match.winner === 2 ? "is-winner" : ""}">
        <span>${match.player2}</span>
        <span class="player-score">${match.score2}</span>
      </div>
    </div>
  `;
}

// GERAR BRACKET
function generateBracket() {
  const left = document.getElementById("left-bracket");
  const right = document.getElementById("right-bracket");

  if (!left || !right) return;

  const roundLabels = ['16 AVOS', 'OITAVOS', 'QUARTOS', 'SEMI-FINAIS'];
  let matchCounter = 1;

  for (let r = 1; r <= 4; r++) {
    const colLeft = document.createElement("div");
    colLeft.className = "bracket-column";

    const colRight = document.createElement("div");
    colRight.className = "bracket-column";

    const label = roundLabels[r-1];
    
    // Create separate containers for header and matches
    colLeft.innerHTML = `<div class="round-header">${label}</div><div class="column-matches"></div>`;
    colRight.innerHTML = `<div class="round-header">${label}</div><div class="column-matches"></div>`;

    const matchesContainerLeft = colLeft.querySelector('.column-matches');
    const matchesContainerRight = colRight.querySelector('.column-matches');

    const matches = roundsData[r];
    const half = matches.length / 2;

    // LEFT
    for (let i = 0; i < half; i++) {
      matchesContainerLeft.innerHTML += renderMatch(matches[i], matchCounter++);
    }

    // RIGHT
    for (let i = half; i < matches.length; i++) {
      matchesContainerRight.innerHTML += renderMatch(matches[i], matchCounter++);
    }

    left.appendChild(colLeft);
    right.appendChild(colRight);
  }

  const finalMatchDiv = document.getElementById("final-match");
  const thirdMatchDiv = document.getElementById("third-match");
  
  if (finalMatchDiv) finalMatchDiv.innerHTML = renderMatch(finalMatch, 32);
  if (thirdMatchDiv) thirdMatchDiv.innerHTML = renderMatch(thirdMatch, 31);
}

// ==========================================
// 3. FADE-IN ANIMATION FOR SPONSORS
// ==========================================
function initFadeInAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
}

// Update DOM listener
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    generateBracket();
    initFadeInAnimations();

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => navLinks.classList.remove('active'));
    });
});
