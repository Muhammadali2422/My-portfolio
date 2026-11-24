/* ==========================================================================
   MUHAMMADALI HAITBOYEV - PORTFOLIO INTERACTIVITY & GAME ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  /* ------------------------------------------------------------------------
     Theme Toggle (Dark / Light)
     ------------------------------------------------------------------------ */
  const themeToggleBtn = document.getElementById('theme-toggle');
  const htmlRoot = document.documentElement;

  // Determine initial theme
  const savedTheme = localStorage.getItem('mh_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  htmlRoot.setAttribute('data-theme', initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      htmlRoot.setAttribute('data-theme', newTheme);
      localStorage.setItem('mh_theme', newTheme);
      showToast(newTheme === 'dark' ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
    });
  }

  /* ------------------------------------------------------------------------
     Mobile Menu Toggle
     ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-active');
      if (menuIconOpen && menuIconClose) {
        menuIconOpen.style.display = isOpen ? 'none' : 'block';
        menuIconClose.style.display = isOpen ? 'block' : 'none';
      }
    });

    // Close menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-active');
        if (menuIconOpen && menuIconClose) {
          menuIconOpen.style.display = 'block';
          menuIconClose.style.display = 'none';
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     Scrollspy: Active Nav Link & Scroll to Top Button
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Scroll to Top visibility
    if (scrollTopBtn) {
      if (scrollY > 350) {
        scrollTopBtn.classList.remove('hidden');
      } else {
        scrollTopBtn.classList.add('hidden');
      }
    }

    // Active link highlighting
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (correspondingLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLink.classList.add('active');
        } else {
          correspondingLink.classList.remove('active');
        }
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ------------------------------------------------------------------------
     Project Filtering
     ------------------------------------------------------------------------ */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ------------------------------------------------------------------------
     Project Detail Modal
     ------------------------------------------------------------------------ */
  const modalOverlay = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalContent = document.getElementById('modal-content');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  // Detailed data for projects
  const projectDetails = {
    puzzle: {
      title: "16-Puzzle Game (Pazle 16)",
      subtitle: "Algorithmic sliding puzzle logic & mathematical solvability",
      tags: ["JavaScript ES6+", "DOM Engine", "CSS Grid", "Responsive Design", "Timer & Move Counter"],
      description: "Pazle 16 is a classic 15-puzzle sliding game where the player arranges numbered tiles sequentially in a 4x4 grid. Built entirely with vanilla JavaScript without any external canvas or game engines, it demonstrates solid DOM handling, state tracking, and algorithmic solvability.",
      features: [
        "Guaranteed 100% solvable puzzle generation using reverse shuffle simulation",
        "Move counter and dynamic stopwatch timer tracking player efficiency",
        "Keyboard arrow key support and tactile touch/click support",
        "Victory detection and celebratory modal banner"
      ],
      demoLink: "#minigame",
      codeLink: "https://github.com"
    },
    weather: {
      title: "SkyCast - Weather Forecast App",
      subtitle: "Live global weather metrics & forecasting",
      tags: ["React.js", "OpenWeatherMap API", "Asynchronous JS", "CSS Modules", "Geolocation"],
      description: "SkyCast provides users with up-to-the-minute atmospheric conditions for thousands of cities worldwide. It displays current temperatures, humidity levels, wind velocities, and a dynamic 5-day weather trajectory.",
      features: [
        "Real-time weather data fetching with error handling for non-existent cities",
        "Adaptive UI themes that transition according to sunrise/sunset and rainfall",
        "Celsius and Fahrenheit unit conversion toggle",
        "HTML5 Geolocation to automatically suggest current user coordinates"
      ],
      demoLink: "https://github.com",
      codeLink: "https://github.com"
    },
    valute: {
      title: "ValutaPay - Currency Converter",
      subtitle: "Fast multi-currency financial calculator",
      tags: ["JavaScript / React", "Exchange Rates API", "Financial UI", "Local Caching"],
      description: "ValutaPay is a modern currency converter app designed for frequent travelers, traders, and everyday users. It delivers real-time exchange rates across USD, EUR, UZS (Uzbekistan Som), RUB, and other international currencies.",
      features: [
        "Instant two-way calculation with single-click currency swap",
        "Historical rate visualization and daily rate trend indicators",
        "Offline caching of the latest known rates in localStorage",
        "Clean, distraction-free keypad and mobile-friendly numeric input"
      ],
      demoLink: "https://github.com",
      codeLink: "https://github.com"
    },
    lugat: {
      title: "Lug'at - Smart Bilingual Dictionary",
      subtitle: "Interactive vocabulary search with definitions & audio",
      tags: ["PHP", "MySQL / JSON", "Free Dictionary API", "Audio API", "Search Cache"],
      description: "Lug'at is a dictionary and vocabulary learning web application. Users can search for terms in English or Uzbek, listen to native audio pronunciations, review parts of speech, synonyms, antonyms, and contextual sentence examples.",
      features: [
        "PHP backend script handling fast term lookups and database query optimization",
        "Audio pronunciation synthesis with the HTML5 Web Speech / Audio API",
        "Personal bookmarking feature allowing users to save difficult words",
        "Search history autocomplete for quick subsequent re-checks"
      ],
      demoLink: "https://github.com",
      codeLink: "https://github.com"
    },
    taskflow: {
      title: "TaskFlow - Modern Productivity Dashboard",
      subtitle: "Full-stack project & task management",
      tags: ["React", "PHP REST API", "MySQL", "Kanban", "State Management"],
      description: "TaskFlow simplifies project organization with intuitive boards, deadline alerts, status columns, and user activity tracking.",
      features: [
        "Drag and drop kanban columns for task state transitions",
        "RESTful PHP backend for persistent user records",
        "Priority filtering, tagging, and search queries"
      ],
      demoLink: "https://github.com",
      codeLink: "https://github.com"
    },
    portfolio: {
      title: "Muhammadali's Modern Soft Portfolio",
      subtitle: "Lightweight, responsive, and tactile web portfolio",
      tags: ["HTML5", "CSS3 Custom Properties", "Vanilla JavaScript", "Soft Neomorphism", "Interactive Widgets"],
      description: "Designed and built from scratch with a focus on 'Soft UI' aesthetics: gentle pastel gradients, smooth micro-interactions, dark/light theme switching, and an embedded playable 16-puzzle demo.",
      features: [
        "Zero bulky frameworks: 100% fast, responsive, and accessible",
        "Interactive embedded 15-puzzle engine right in the page",
        "Toast notification system and easy copy-to-clipboard integration"
      ],
      demoLink: "#hero",
      codeLink: "https://github.com"
    }
  };

  function openModal(projectKey) {
    const data = projectDetails[projectKey];
    if (!data) return;

    modalContent.innerHTML = `
      <h3>${data.title}</h3>
      <p class="modal-subtitle">${data.subtitle}</p>
      
      <div class="modal-tags">
        ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>

      <p class="modal-text">${data.description}</p>

      <div class="modal-tech-list">
        <h4>Key Engineering Highlights:</h4>
        <ul>
          ${data.features.map(f => `<li><i data-lucide="check" style="width:14px;height:14px;color:var(--accent-emerald);"></i> ${f}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-actions">
        ${data.demoLink.startsWith('#') 
          ? `<a href="${data.demoLink}" class="btn btn-primary btn-sm" id="modal-internal-link"><i data-lucide="external-link"></i> View Here</a>` 
          : `<a href="${data.demoLink}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i data-lucide="external-link"></i> Live Project</a>`}
        <a href="${data.codeLink}" target="_blank" rel="noopener noreferrer" class="btn btn-soft btn-sm"><i data-lucide="github"></i> Source Code</a>
      </div>
    `;

    if (window.lucide) {
      lucide.createIcons();
    }

    const internalLink = modalContent.querySelector('#modal-internal-link');
    if (internalLink) {
      internalLink.addEventListener('click', () => {
        closeModal();
      });
    }

    modalOverlay.classList.remove('hidden');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.add('hidden');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projectKey = e.currentTarget.getAttribute('data-project');
      openModal(projectKey);
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlay.classList.contains('hidden')) {
      closeModal();
    }
  });

  /* ------------------------------------------------------------------------
     Pazle 16 (15-Puzzle) Live Playable Game Engine
     ------------------------------------------------------------------------ */
  const puzzleBoard = document.getElementById('puzzle-board');
  const movesDisplay = document.getElementById('puzzle-moves-count');
  const timerDisplay = document.getElementById('puzzle-timer');
  const btnShuffle = document.getElementById('btn-shuffle-puzzle');
  const btnReset = document.getElementById('btn-reset-puzzle');
  const winOverlay = document.getElementById('puzzle-win-overlay');
  const btnPlayAgain = document.getElementById('btn-play-again');
  const winMovesSpan = document.getElementById('win-moves');
  const winTimeSpan = document.getElementById('win-time');

  // Board State: array of 16 numbers (1 to 15, and 0 representing the empty slot)
  // Solved state: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0]
  let board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  let moves = 0;
  let timerInterval = null;
  let secondsElapsed = 0;
  let gameActive = false;

  function renderBoard() {
    if (!puzzleBoard) return;
    puzzleBoard.innerHTML = '';

    board.forEach((val, idx) => {
      const tile = document.createElement('button');
      tile.className = 'puzzle-tile' + (val === 0 ? ' empty-tile' : '');
      tile.textContent = val === 0 ? '' : val;
      tile.setAttribute('data-index', idx);
      tile.setAttribute('aria-label', val === 0 ? 'Empty space' : `Tile ${val}`);

      if (val !== 0) {
        tile.addEventListener('click', () => handleTileClick(idx));
      }

      puzzleBoard.appendChild(tile);
    });
  }

  function handleTileClick(index) {
    const emptyIndex = board.indexOf(0);
    const row = Math.floor(index / 4);
    const col = index % 4;
    const emptyRow = Math.floor(emptyIndex / 4);
    const emptyCol = emptyIndex % 4;

    // Check adjacency (Manhattan distance === 1)
    const isAdjacent = (Math.abs(row - emptyRow) + Math.abs(col - emptyCol)) === 1;

    if (isAdjacent) {
      // Swap tile with empty slot
      board[emptyIndex] = board[index];
      board[index] = 0;
      moves++;
      movesDisplay.textContent = moves;

      // Start timer if not running
      if (!gameActive) {
        startTimer();
      }

      renderBoard();
      checkWinCondition();
    }
  }

  function startTimer() {
    gameActive = true;
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      secondsElapsed++;
      const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
      const secs = String(secondsElapsed % 60).padStart(2, '0');
      timerDisplay.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function stopTimer() {
    if (timerInterval) clearInterval(timerInterval);
    gameActive = false;
  }

  function resetGame() {
    stopTimer();
    secondsElapsed = 0;
    moves = 0;
    timerDisplay.textContent = '00:00';
    movesDisplay.textContent = '0';
    board = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
    if (winOverlay) winOverlay.classList.add('hidden');
    renderBoard();
  }

  // Guaranteed Solvable Shuffle:
  // We perform 120 valid random slide moves from the solved state.
  // This guarantees the generated state is 100% solvable mathematically!
  function shuffleGame() {
    resetGame();
    let currentEmpty = 15;
    const totalShuffleSteps = 100;

    for (let i = 0; i < totalShuffleSteps; i++) {
      const row = Math.floor(currentEmpty / 4);
      const col = currentEmpty % 4;
      const neighbors = [];

      if (row > 0) neighbors.push(currentEmpty - 4); // Up
      if (row < 3) neighbors.push(currentEmpty + 4); // Down
      if (col > 0) neighbors.push(currentEmpty - 1); // Left
      if (col < 3) neighbors.push(currentEmpty + 1); // Right

      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      board[currentEmpty] = board[randomNeighbor];
      board[randomNeighbor] = 0;
      currentEmpty = randomNeighbor;
    }

    renderBoard();
    startTimer();
    showToast('🧩 Puzzle shuffled! Good luck!');
  }

  function checkWinCondition() {
    // Check if board is 1..15, 0
    for (let i = 0; i < 15; i++) {
      if (board[i] !== i + 1) return false;
    }
    if (board[15] !== 0) return false;

    // Victory!
    stopTimer();
    if (winOverlay && winMovesSpan && winTimeSpan) {
      winMovesSpan.textContent = moves;
      winTimeSpan.textContent = timerDisplay.textContent;
      winOverlay.classList.remove('hidden');
      showToast('🎉 Victory! You solved Pazle 16!');
    }
    return true;
  }

  if (btnShuffle) btnShuffle.addEventListener('click', shuffleGame);
  if (btnReset) btnReset.addEventListener('click', resetGame);
  if (btnPlayAgain) {
    btnPlayAgain.addEventListener('click', () => {
      winOverlay.classList.add('hidden');
      shuffleGame();
    });
  }

  // Initial Puzzle Render
  renderBoard();

  /* ------------------------------------------------------------------------
     Contact Form & Copy Email
     ------------------------------------------------------------------------ */
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('user-email-text');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        showFeedback(formFeedback, 'Please complete all required fields.', 'error');
        return;
      }

      // Simulate sending feedback
      showFeedback(formFeedback, `Thank you, ${name}! Your message has been prepared. Opening your email client...`, 'success');
      showToast('✉️ Message prepared!');

      // Formulate mailto link
      const mailtoUrl = `mailto:muhammadali.haitboyev@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry')}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 700);

      contactForm.reset();
    });
  }

  if (copyEmailBtn && emailText) {
    copyEmailBtn.addEventListener('click', () => {
      const email = emailText.textContent.trim();
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('📋 Email copied to clipboard!');
        }).catch(() => {
          fallbackCopyText(email);
        });
      } else {
        fallbackCopyText(email);
      }
    });
  }

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('📋 Email copied to clipboard!');
  }

  function showFeedback(element, text, type) {
    if (!element) return;
    element.textContent = text;
    element.className = `form-feedback ${type}`;
    element.classList.remove('hidden');

    setTimeout(() => {
      element.classList.add('hidden');
    }, 5000);
  }

  /* ------------------------------------------------------------------------
     Toast Notification System
     ------------------------------------------------------------------------ */
  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2800);
  }
});
