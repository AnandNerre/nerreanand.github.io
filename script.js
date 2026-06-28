const navToggle = document.querySelector("#navToggle");
const navLinks = document.querySelector("#navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

const projectSearch = document.querySelector("#projectSearch");
const projectCards = [...document.querySelectorAll(".project-card")];

projectSearch.addEventListener("input", (event) => {
  const query = event.target.value.trim().toLowerCase();

  projectCards.forEach((card) => {
    const searchable = `${card.textContent} ${card.dataset.tags}`.toLowerCase();
    card.hidden = query.length > 0 && !searchable.includes(query);
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const form = document.querySelector("#contactForm");
const status = document.querySelector("#formStatus");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get("name");
  const email = data.get("email");
  const budget = data.get("budget");
  const message = data.get("message");
  const subject = encodeURIComponent("Portfolio inquiry for data engineering work");
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nBudget: ${budget}\n\nProject:\n${message}`);

  status.textContent = "Opening your email app with the project details.";
  window.location.href = `mailto:nerre.anand@gmail.com?subject=${subject}&body=${body}`;
});
