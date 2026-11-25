// Portfolio interactions: typing line, scroll reveals, progress bar,
// header behaviour, active nav link, card glow, mobile menu, contact form.
// Plain JavaScript, no libraries.

const PHRASES = ["I am a Full Stack Web Developer", "I am a Learner", "I build websites"];
const TYPE_MS = 70;
const DELETE_MS = 35;
const HOLD_MS = 1600;

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Typing animation: a phrase types out, waits, deletes, then the next one starts.
function startTyping() {
  const el = document.getElementById("typed");
  if (!el) return;

  // With reduced motion, just show the first phrase and stop.
  if (reduceMotion) {
    el.textContent = PHRASES[0];
    return;
  }

  let phraseIndex = 0;
  let charCount = 0;
  let deleting = false;

  function tick() {
    const phrase = PHRASES[phraseIndex];
    el.textContent = phrase.slice(0, charCount);

    let delay = deleting ? DELETE_MS : TYPE_MS;

    if (!deleting && charCount === phrase.length) {
      deleting = true;
      delay = HOLD_MS;
    } else if (deleting && charCount === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % PHRASES.length;
      delay = 300;
    } else {
      charCount += deleting ? -1 : 1;
    }

    setTimeout(tick, delay);
  }

  tick();
}

// Reveal elements as they scroll into view. Elements that share a row use
// the --i variable in the HTML to get a small delay, so they appear in turn.
function setupReveals() {
  const items = document.querySelectorAll("[data-reveal]");

  // Once a card has finished its entrance, mark it .done so hover effects aren't delayed.
  const markDone = (el) => setTimeout(() => el.classList.add("done"), 1000);

  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => { el.classList.add("visible"); markDone(el); });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        markDone(entry.target);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  items.forEach((el) => observer.observe(el));
}

// Progress bar, header background, and hiding the header while scrolling down.
function setupHeader() {
  const bar = document.getElementById("progress");
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  let lastY = window.scrollY;
  let ticking = false;

  function update() {
    ticking = false;
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";

    header.classList.toggle("scrolled", y > 20);

    // Keep the header visible while the mobile menu is open.
    const menuOpen = nav.classList.contains("open");
    const scrollingDown = y > lastY;
    header.classList.toggle("hidden", y > 160 && scrollingDown && !menuOpen);
    lastY = y;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}

// Mobile menu.
function setupMenu() {
  const btn = document.getElementById("menu-btn");
  const nav = document.getElementById("nav");

  btn.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

// Highlight the nav link of the section that is currently on screen.
function setupActiveLink() {
  if (!("IntersectionObserver" in window)) return;

  const links = document.querySelectorAll("#nav a[href^='#']");
  const sections = [];
  links.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) sections.push({ link, section });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.remove("active"));
        const match = sections.find((s) => s.section === entry.target);
        if (match) match.link.classList.add("active");
      });
    },
    // A section counts as current when it crosses the middle of the screen.
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((s) => observer.observe(s.section));

  // The hero has no nav link, but watching it clears the highlight at the top.
  const hero = document.getElementById("home");
  if (hero) observer.observe(hero);
}

// Cards get a soft glow that follows the cursor.
function setupCardGlow() {
  if (reduceMotion) return;

  document.querySelectorAll(".card-glow").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", e.clientX - rect.left + "px");
      card.style.setProperty("--my", e.clientY - rect.top + "px");
    });
  });
}

// Copy email button.
function setupCopyEmail() {
  const btn = document.getElementById("copy-email");
  if (!btn) return;

  const email = "abdullahsakiib@gmail.com";

  function showCopied() {
    btn.textContent = "\u2713 Copied";
    btn.classList.add("copied");
    setTimeout(() => { btn.textContent = "Copy email"; btn.classList.remove("copied"); }, 1800);
  }

  btn.addEventListener("click", () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(showCopied, showCopied);
    } else {
      showCopied();
    }
  });
}

// Contact form: opens the visitor's mail app with the message filled in.
function setupContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("f-name").value.trim();
    const email = document.getElementById("f-email").value.trim();
    const message = document.getElementById("f-message").value.trim();

    const body = "Hi Abdullah,\n\n" + message + "\n\n— " + name + " (" + email + ")";
    const subject = "Portfolio contact from " + name;

    const note = document.getElementById("form-note");
    if (note) note.textContent = "Opening your mail app\u2026";

    window.location.href =
      "mailto:abdullahsakiib@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
  });
}

startTyping();
setupReveals();
setupHeader();
setupMenu();
setupActiveLink();
setupCardGlow();
setupCopyEmail();
setupContactForm();
