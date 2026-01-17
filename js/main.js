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

  const maskVideo = document.getElementById("dripMaskVideo");
  const overlayTiles = heroGrid.querySelectorAll(".hero-overlay-tile");

  if (!maskVideo || overlayTiles.length !== 4) {
    console.error("Missing #dripMaskVideo or .hero-overlay-tile elements (need 4).");
    return;
  }

  const WAIT_BEFORE_START = 2000; // 2 seconds

  // Draw source to canvas like object-fit: cover
  function drawCover(ctx, source, cw, ch) {
    const sw = source.videoWidth || source.naturalWidth;
    const sh = source.videoHeight || source.naturalHeight;
    if (!sw || !sh) return;

    const scale = Math.max(cw / sw, ch / sh);
    const dw = sw * scale;
    const dh = sh * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;
    ctx.drawImage(source, dx, dy, dw, dh);
  }

  async function animateTile(tile) {
    const img = tile.querySelector(".overlay-img");
    const canvas = tile.querySelector(".overlay-canvas");
    if (!img || !canvas) return;

    // Start hidden (only canvas reveal is visible)
    img.style.opacity = "0";

    // Ensure image is loaded
    if (!img.complete) {
      await new Promise((res) => img.addEventListener("load", res, { once: true }));
    }

    // Canvas size (HiDPI)
    const rect = tile.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    canvas.style.display = "block";

    const ctx = canvas.getContext("2d");
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Reset video for this tile
    maskVideo.pause();
    maskVideo.currentTime = 0;

    // Wait for video to have data
    await new Promise((res) => {
      if (maskVideo.readyState >= 2) return res();
      maskVideo.addEventListener("loadeddata", res, { once: true });
    });

    try {
      await maskVideo.play();
    } catch (e) {
      console.error(
        "Mask video could not play. Check muted/playsinline and file path.",
        e
      );
      canvas.style.display = "none";
      return;
    }

    // Render loop: image masked by video alpha
    const render = () => {
      if (maskVideo.paused || maskVideo.ended) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1) draw overlay image
      ctx.globalCompositeOperation = "source-over";
      drawCover(ctx, img, canvas.width, canvas.height);

      // 2) apply mask video alpha
      ctx.globalCompositeOperation = "destination-in";
      drawCover(ctx, maskVideo, canvas.width, canvas.height);

      requestAnimationFrame(render);
    };

    render();

    // Wait until video ends
    await new Promise((res) => maskVideo.addEventListener("ended", res, { once: true }));

    // Finish: show normal overlay image, hide canvas
    canvas.style.display = "none";
    img.style.opacity = "1";
  }

  // Run once per page load after 2s
  setTimeout(async () => {
    for (const tile of overlayTiles) {
      await animateTile(tile);
    }
  }, WAIT_BEFORE_START);
});


