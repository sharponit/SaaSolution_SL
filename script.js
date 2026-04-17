const words = ["AI Automation", "Smart SaaS", "Growth Systems", "Digital Scale"];
const typedText = document.getElementById("typedText");
const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const filterButtons = document.getElementById("filterButtons");
const serviceCards = [...document.querySelectorAll(".service-card")];
const billingToggle = document.getElementById("billingToggle");
const prices = [...document.querySelectorAll(".price")];
const demoPulse = document.getElementById("demoPulse");
const pulseResult = document.getElementById("pulseResult");
const contactForm = document.getElementById("contactForm");
const feedback = document.getElementById("formFeedback");

let wordIndex = 0;

setInterval(() => {
  wordIndex = (wordIndex + 1) % words.length;
  typedText.textContent = words[wordIndex];
}, 2200);

menuToggle.addEventListener("click", () => {
  siteNav.classList.toggle("open");
});

[...siteNav.querySelectorAll("a")].forEach((link) => {
  link.addEventListener("click", () => siteNav.classList.remove("open"));
});

filterButtons.addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  const filter = button.dataset.filter;
  [...filterButtons.querySelectorAll("button")].forEach((btn) =>
    btn.classList.remove("active")
  );
  button.classList.add("active");

  serviceCards.forEach((card) => {
    const show = filter === "all" || card.dataset.category === filter;
    card.style.display = show ? "block" : "none";
  });
});

billingToggle.addEventListener("change", () => {
  prices.forEach((priceTag) => {
    const value = billingToggle.checked
      ? priceTag.dataset.yearly
      : priceTag.dataset.monthly;
    priceTag.textContent = `$${Number(value).toLocaleString()}`;
  });
});

demoPulse.addEventListener("click", () => {
  const leadLift = Math.floor(Math.random() * 26) + 10;
  const saveHours = Math.floor(Math.random() * 31) + 20;
  pulseResult.textContent = `Projected +${leadLift}% qualified leads and ${saveHours}h saved/month.`;
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    feedback.textContent = "Please fill in all required fields.";
    feedback.style.color = "#ffb3b3";
    return;
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    feedback.textContent = "Please enter a valid email address.";
    feedback.style.color = "#ffb3b3";
    return;
  }

  feedback.textContent = `Thanks ${name}! Your request has been received.`;
  feedback.style.color = "#b7ffcb";
  contactForm.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
