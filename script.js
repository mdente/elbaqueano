const toggle = document.querySelector("[data-nav-toggle]");
const navigation = document.querySelector("[data-nav]");

function setMenuState(isOpen) {
  if (!toggle || !navigation) return;

  toggle.setAttribute("aria-expanded", String(isOpen));
  toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  navigation.classList.toggle("is-open", isOpen);
}

toggle?.addEventListener("click", () => {
  const isOpen = toggle.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuState(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenuState(false);
});

const desktopMediaQuery = window.matchMedia("(min-width: 761px)");
const handleDesktopChange = (event) => {
  if (event.matches) setMenuState(false);
};

if (typeof desktopMediaQuery.addEventListener === "function") {
  desktopMediaQuery.addEventListener("change", handleDesktopChange);
} else {
  desktopMediaQuery.addListener(handleDesktopChange);
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
