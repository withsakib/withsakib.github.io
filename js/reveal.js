// Scroll reveal: elements marked with data-reveal fade in as they come into view.
// The styling lives in css/motion.css; this file only adds the classes.

(function () {
  const items = document.querySelectorAll("[data-reveal]");

  // After the fade-in has finished we add "done", which switches the element
  // to its faster hover transition (see motion.css).
  function markDone(el) {
    setTimeout(() => el.classList.add("done"), 1000);
  }

  function show(el) {
    el.classList.add("visible");
    markDone(el);
  }

  // Old browsers or reduced motion: just show everything straight away
  if (reduceMotion || !("IntersectionObserver" in window)) {
    items.forEach(show);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      show(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: "0px 0px 15% 0px" });

  items.forEach((el) => observer.observe(el));

  // Safety net: if the observer hasn't reached something shortly after load,
  // show it anyway so no content stays hidden.
  setTimeout(() => {
    items.forEach((el) => {
      if (el.classList.contains("visible")) return;
      show(el);
      observer.unobserve(el);
    });
  }, 900);
})();
