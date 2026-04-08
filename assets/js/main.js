// ===========================
// Theme Toggle
// ===========================
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', savedTheme);
updateToggleIcon(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    updateToggleIcon(next);
  });
}

function updateToggleIcon(theme) {
  if (!themeToggle) return;
  themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
  themeToggle.setAttribute('aria-label', theme === 'dark' ? '라이트 모드로 변경' : '다크 모드로 변경');
}

// ===========================
// Hamburger Menu
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.textContent = isOpen ? '✕' : '☰';
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.textContent = '☰';
    });
  });
}

// ===========================
// Active Nav Link
// ===========================
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href').split('/').pop();
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===========================
// Reading Progress Bar
// ===========================
const progressBar = document.createElement('div');
Object.assign(progressBar.style, {
  position: 'fixed', top: '0', left: '0',
  height: '3px', background: '#6366f1',
  zIndex: '9999', width: '0%',
  transition: 'width 0.1s linear',
  pointerEvents: 'none'
});
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%';
}, { passive: true });

// ===========================
// Post Filter (posts.html)
// ===========================
const filterBtns = document.querySelectorAll('.filter-btn');
const postItems = document.querySelectorAll('.post-list-item');

if (filterBtns.length && postItems.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      postItems.forEach(item => {
        item.style.display = (filter === 'all' || item.dataset.category === filter) ? '' : 'none';
      });
    });
  });
}

// ===========================
// Accordion (about.html)
// ===========================
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const body = header.nextElementSibling;
    const isOpen = body.classList.contains('open');
    // Close all
    document.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));
    document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('open'));
    // Toggle clicked
    if (!isOpen) {
      body.classList.add('open');
      header.classList.add('open');
    }
  });
});

// ===========================
// TOC Active Highlight (post pages)
// ===========================
const tocLinks = document.querySelectorAll('.toc a');
if (tocLinks.length) {
  const headings = document.querySelectorAll('.post-body h2, .post-body h3');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  headings.forEach(h => { if (h.id) observer.observe(h); });
}
