// Contact form. There's no server behind this site, so "Send message"
// opens the visitor's own email app with everything already filled in.

(function () {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const myEmail = "abdullahsakiib@gmail.com";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("f-name").value.trim();
    const email = document.getElementById("f-email").value.trim();
    const message = document.getElementById("f-message").value.trim();

    const subject = "Portfolio contact from " + name;
    const body = "Hi Abdullah,\n\n" + message + "\n\n— " + name + " (" + email + ")";

    const note = document.getElementById("form-note");
    if (note) note.textContent = "Opening your mail app…";

    // Click a temporary mailto link instead of changing location
    const link = document.createElement("a");
    link.href = "mailto:" + myEmail +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
})();
