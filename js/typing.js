// Typing effect in the hero: "I am a ..." stays put and only the last
// word is typed out, held for a moment, deleted, then swapped.

(function () {
  const target = document.getElementById("typed");
  if (!target) return;

  // Edit this list to change what the hero says
  const words = ["Web Developer", "Full Stack Web Developer", "Learner", "Student"];

  const typeSpeed = 70;      // ms per letter while typing
  const deleteSpeed = 35;    // ms per letter while deleting
  const holdTime = 1600;     // how long a finished word stays on screen
  const pauseBetween = 300;  // short gap before the next word starts

  // No animation for people who prefer reduced motion: just show the first word
  if (reduceMotion) {
    target.textContent = words[0];
    return;
  }

  let wordIndex = 0;
  let letters = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIndex];
    target.textContent = word.slice(0, letters);

    let delay = deleting ? deleteSpeed : typeSpeed;

    if (!deleting && letters === word.length) {
      // Finished typing: wait, then start deleting
      deleting = true;
      delay = holdTime;
    } else if (deleting && letters === 0) {
      // Finished deleting: move on to the next word
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = pauseBetween;
    } else {
      letters += deleting ? -1 : 1;
    }

    setTimeout(tick, delay);
  }

  tick();
})();
