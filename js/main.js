document.addEventListener("DOMContentLoaded", () => {
  /* Footer year */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* War day counter */
  const warDayEl = document.getElementById("warDayNumber");
  if (warDayEl) {
    const start = new Date("2022-02-24T00:00:00Z");
    const now = new Date();
    const days = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    warDayEl.textContent = String(days);
  }

  /* Mobile menu toggle */
  const menuBtn = document.querySelector(".menu-btn");
  const mainNav = document.querySelector(".main-nav");
  if (menuBtn && mainNav) {
    menuBtn.addEventListener("click", () => {
      mainNav.classList.toggle("is-open");
    });
  }

  /* HERO WIPE ANIMATION (once per page load) */
  const heroGrid = document.getElementById("heroGrid");
  if (!heroGrid) return;

  const WAIT_BEFORE_START = 2000; // 2 seconds
  setTimeout(() => {
    heroGrid.classList.add("hero-reveal");
  }, WAIT_BEFORE_START);
});
