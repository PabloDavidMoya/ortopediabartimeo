// ===== Utilities =====
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

// ===== Footer year =====
$("#year").textContent = new Date().getFullYear();

// ===== Mobile nav =====
const toggle = $(".nav__toggle");
const menu = $("#navMenu");

toggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

// Close menu when clicking a link (mobile)
$$(".nav__link", menu).forEach(link => {
  link.addEventListener("click", () => {
    if (menu.classList.contains("is-open")) {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
});

// ===== Contact form validation (front-end) =====
const form = $("#contactForm");

function setError(fieldId, msg) {
  const el = $(`.error[data-for="${fieldId}"]`);
  if (el) el.textContent = msg || "";
}

function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = $("#name").value.trim();
  const phone = $("#phone").value.trim();
  const email = $("#email").value.trim();
  const topic = $("#topic").value;
  const message = $("#message").value.trim();
  const privacy = $("#privacy").checked;

  let ok = true;

  setError("name", "");
  setError("phone", "");
  setError("email", "");
  setError("topic", "");
  setError("message", "");
  setError("privacy", "");

  if (name.length < 3) { setError("name", "Ingresá un nombre válido."); ok = false; }
  if (phone.length < 7) { setError("phone", "Ingresá un teléfono válido."); ok = false; }
  if (!isEmail(email)) { setError("email", "Ingresá un email válido."); ok = false; }
  if (!topic) { setError("topic", "Seleccioná un motivo."); ok = false; }
  if (message.length < 10) { setError("message", "Escribí un mensaje un poco más detallado."); ok = false; }
  if (!privacy) { setError("privacy", "Necesitamos tu consentimiento para contactarte."); ok = false; }

  if (!ok) return;

  // Sin backend: generamos mensaje listo para WhatsApp (conservando el WhatsApp directo solicitado).
  const text =
`Hola Bartimeo. Te contacto desde la web.
Nombre: ${name}
Tel: ${phone}
Email: ${email}
Motivo: ${topic}
Mensaje: ${message}`;

  const waUrl = "https://wa.me/542974285331?text=" + encodeURIComponent(text);
  window.open(waUrl, "_blank", "noopener");

  form.reset();
});
