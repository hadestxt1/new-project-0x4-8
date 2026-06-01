const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
const navLinks = document.querySelectorAll('[data-nav-menu] a');
const progress = document.querySelector('.scroll-progress');
const copyButton = document.querySelector('[data-copy-email]');
const copyFeedback = document.querySelector('[data-copy-feedback]');
const emailValue = document.querySelector('#email-value');

const closeMenu = () => {
  navToggle?.classList.remove('is-open');
  navMenu?.classList.remove('is-open');
  navToggle?.setAttribute('aria-expanded', 'false');
};

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu?.classList.toggle('is-open');
  navToggle.classList.toggle('is-open', Boolean(isOpen));
  navToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

const updateScrollProgress = () => {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percentage = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progress.style.width = `${Math.min(percentage, 100)}%`;
};

window.addEventListener('scroll', updateScrollProgress, { passive: true });
window.addEventListener('resize', updateScrollProgress);
updateScrollProgress();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

copyButton?.addEventListener('click', async () => {
  const email = emailValue?.textContent?.trim();

  if (!email) {
    return;
  }

  try {
    await navigator.clipboard.writeText(email);
    copyButton.textContent = 'Copied';
    copyFeedback.textContent = 'Email copied to clipboard.';
  } catch {
    copyFeedback.textContent = email;
  }

  window.setTimeout(() => {
    copyButton.textContent = 'Copy';
    copyFeedback.textContent = '';
  }, 2200);
});
