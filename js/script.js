// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (mobileMenu) {
        mobileMenu.classList.add('hidden');
      }
    }
  });
});

// Floating CTA Button - Show after scrolling down
const floatingCTA = document.getElementById('floatingCTA');
let lastScroll = 0;

if (floatingCTA) {
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Show button after scrolling 300px
    if (currentScroll > 300) {
      floatingCTA.classList.add('visible');
    } else {
      floatingCTA.classList.remove('visible');
    }

    lastScroll = currentScroll;
  });
}
