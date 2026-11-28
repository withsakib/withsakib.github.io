// Everything that belongs to the header:
//  - the scroll progress bar
//  - background + hide-on-scroll-down behaviour
//  - the mobile menu button
//  - highlighting the nav link of the section you're reading

(function () {
  const header = document.getElementById("header");
  const progressBar = document.getElementById("progress");
  const nav = document.getElementById("nav");
  const menuButton = document.getElementById("menu-btn");

  // --- Scroll behaviour ------------------------------------------------
  let lastScrollY = window.scrollY;
  let waiting = false;

  function updateOnScroll() {
    waiting = false;
    const y = window.scrollY;

    // Progress bar width = how far down the page we are
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (maxScroll > 0 ? (y / maxScroll) * 100 : 0) + "%";

    // Solid background once we've left the very top
    header.classList.toggle("scrolled", y > 20);

    // Hide when scrolling down, show again when scrolling up (never while the menu is open)
    const scrollingDown = y > lastScrollY;
    const menuOpen = nav.classList.contains("open");
    header.classList.toggle("hidden", y > 160 && scrollingDown && !menuOpen);

    lastScrollY = y;
  }

  // requestAnimationFrame keeps this smooth: at most one update per frame
  window.addEventListener("scroll", () => {
    if (waiting) return;
    waiting = true;
    requestAnimationFrame(updateOnScroll);
  }, { passive: true });

  updateOnScroll();

  // --- Mobile menu -----------------------------------------------------
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after picking a link
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });

  // --- Active link -----------------------------------------------------
  if (!("IntersectionObserver" in window)) return;

  const links = document.querySelectorAll("#nav a[href^='#']");
  const pairs = [];   // { link, section }

  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) pairs.push({ link, section });
  });

  // Only the band across the middle of the screen counts as "currently reading"
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((l) => l.classList.remove("active"));
      const match = pairs.find((p) => p.section === entry.target);
      if (match) match.link.classList.add("active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  pairs.forEach((p) => sectionObserver.observe(p.section));

  // The hero has no nav link, but watching it clears the highlight at the top
  const hero = document.getElementById("home");
  if (hero) sectionObserver.observe(hero);
})();
