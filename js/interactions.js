// Small interactions: the glow that follows the mouse on cards,
// and the "Copy email" button.

(function () {
  // --- Card glow -------------------------------------------------------
  // Tells the CSS where the pointer is inside each card (see card-glow.css)
  if (!reduceMotion) {
    document.querySelectorAll(".card-glow").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const box = card.getBoundingClientRect();
        card.style.setProperty("--mx", event.clientX - box.left + "px");
        card.style.setProperty("--my", event.clientY - box.top + "px");
      });
    });
  }

  // --- Copy email ------------------------------------------------------
  const copyButton = document.getElementById("copy-email");
  if (!copyButton) return;

  const email = "abdullahsakiib@gmail.com";

  function showCopied() {
    copyButton.textContent = "✓ Copied";
    copyButton.classList.add("copied");
    setTimeout(() => {
      copyButton.textContent = "Copy email";
      copyButton.classList.remove("copied");
    }, 1800);
  }

  copyButton.addEventListener("click", () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      // Show the confirmation either way; some browsers block clipboard access
      navigator.clipboard.writeText(email).then(showCopied, showCopied);
    } else {
      showCopied();
    }
  });
})();
