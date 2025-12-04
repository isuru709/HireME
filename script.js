// Simple WhatsApp link and contact form handling
(function () {
  const whatsappNumber = "YOUR_WHATSAPP_NUMBER"; // e.g., 94771234567 (no +, country code first)
  const whatsappMessage = encodeURIComponent("Hi, I'm interested in your web development services. Can we chat?");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const waCta = document.getElementById("whatsapp-cta");
  if (waCta) waCta.setAttribute("href", whatsappUrl);

  const waLink = document.getElementById("whatsapp-link");
  if (waLink) waLink.setAttribute("href", whatsappUrl);

  // Basic static form handler: mailto fallback
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const mailto = `mailto:YOUR_EMAIL?subject=Project%20Inquiry%20from%20${encodeURIComponent(name)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\n${message}`
      )}`;
      status.textContent = "Opening your email client...";
      window.location.href = mailto;
      setTimeout(() => (status.textContent = "If the email didn’t open, please email YOUR_EMAIL or WhatsApp me."), 2000);
    });
  }

  // Load projects.json and render cards
  fetch("./projects.json")
    .then((res) => res.json())
    .then((projects) => renderProjects(projects))
    .catch(() => {
      const container = document.getElementById("projects");
      if (container) container.innerHTML = "<p>Unable to load projects. Please try again later.</p>";
    });

  function renderProjects(projects) {
    const container = document.getElementById("projects");
    if (!container) return;

    container.innerHTML = projects
      .map((p) => {
        const badges = (p.tech || []).map((t) => `<span class="badge">${t}</span>`).join("");
        const links = [
          p.demo && `<a href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>`,
          p.repo && `<a href="${p.repo}" target="_blank" rel="noopener">GitHub</a>`,
          p.caseStudy && `<a href="${p.caseStudy}" target="_blank" rel="noopener">Case Study</a>`,
        ]
          .filter(Boolean)
          .join("");

        return `
          <div class="card">
            ${p.screenshot ? `<img src="${p.screenshot}" alt="${p.title} screenshot">` : ""}
            <h3>${p.title}</h3>
            <p>${p.summary}</p>
            <div class="badges">${badges}</div>
            <p class="meta"><strong>Problem:</strong> ${p.problem}</p>
            <p class="meta"><strong>Solution:</strong> ${p.solution}</p>
            <p class="meta"><strong>Result:</strong> ${p.result}</p>
            <div class="links">${links}</div>
          </div>
        `;
      })
      .join("");
  }
})();