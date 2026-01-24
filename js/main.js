document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // War day counter (UTC-safe)
  const warDayEl = document.getElementById("warDayNumber");
  if (warDayEl) {
    const warStartUTC = Date.UTC(2022, 1, 24); // Feb 24 2022
    const now = new Date();
    const todayUTC = Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate()
    );
    const days = Math.floor((todayUTC - warStartUTC) / (24 * 60 * 60 * 1000));
    warDayEl.textContent = String(days);
  }

 // Mobile menu toggle (improved but still simple)
// Mobile menu toggle
const menuBtn = document.querySelector(".menu-btn");
const mainNav = document.querySelector(".main-nav");

if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", () => {
    mainNav.classList.toggle("is-open");
  });
}





if (menuBtn && mainNav) {
  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // prevent document click from firing
    const isOpen = mainNav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Close menu when clicking a link
  mainNav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    mainNav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mainNav.classList.contains("is-open") &&
      !e.target.closest(".main-nav") &&
      !e.target.closest(".menu-btn")
    ) {
      mainNav.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
}








  // HERO overlay slides down after 2 seconds (5 seconds duration in CSS)
   // HERO: chaotic stagger reveal (2s wait, then tiles slide with 0.5s gap)
   
  const overlayTiles = document.querySelectorAll(".hero-overlay-tile");
  if (overlayTiles.length) {
    const WAIT_BEFORE_START = 300; // 2 seconds
    const STAGGER = 300; // 0.5 seconds between tiles

    // Sort by data-order (1,2,3,4)
    const tilesSorted = Array.from(overlayTiles).sort((a, b) => {
      return Number(a.dataset.order) - Number(b.dataset.order);
    });

    setTimeout(() => {
      tilesSorted.forEach((tile, index) => {
        setTimeout(() => {
          tile.classList.add("is-revealed");
        }, index * STAGGER);
      });
    }, WAIT_BEFORE_START);
  }
});








// STORY IMAGE: replace image from left -> right (same timing as hero)
document.addEventListener("DOMContentLoaded", () => {
// STORY IMAGE SWAP: start only when scrolled into view, wait 2s, then slide for 5s
const swaps = document.querySelectorAll(".story-swap");

if (swaps.length) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const swap = entry.target;
        const overlay = swap.querySelector(".story-overlay");
        if (!overlay) return;

        // Stop observing so it runs only once
        obs.unobserve(swap);

        // User sees base image for 2 seconds, then reveal overlay
        setTimeout(() => {
          overlay.classList.add("is-revealed");
        }, 500);
      });
    },
    {
      threshold: 0.6, // triggers when ~60% of image is visible
    }
  );

  swaps.forEach((swap) => observer.observe(swap));
}
});






