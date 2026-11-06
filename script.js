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
  if (event.key === "Escape" && toggle?.getAttribute("aria-expanded") === "true") {
    setMenuState(false);
    toggle.focus();
  }
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

document.documentElement.classList.add("js");

const shareButton = document.querySelector("[data-share]");
const shareStatus = document.querySelector("[data-share-status]");
const shareFallback = document.querySelector("[data-share-fallback]");
const shareInput = document.querySelector("[data-share-url]");
const copyButton = document.querySelector("[data-copy]");

if (shareButton && shareStatus && shareFallback && shareInput && copyButton &&
    ["https:", "http:"].includes(window.location.protocol)) {
  const pageUrl = new URL(window.location.href);
  pageUrl.search = "";
  pageUrl.hash = "";
  shareInput.value = pageUrl.href;

  function selectLink() {
    shareInput.focus();
    shareInput.select();
  }

  shareButton.addEventListener("click", async () => {
    shareStatus.textContent = "";
    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: document.title, url: pageUrl.href });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }

    shareFallback.hidden = false;
    selectLink();
  });

  copyButton.addEventListener("click", async () => {
    if (navigator.clipboard?.writeText) {
      try {
        await navigator.clipboard.writeText(pageUrl.href);
        shareStatus.textContent = "Enlace copiado.";
        return;
      } catch {
        // Si el navegador bloquea el portapapeles, se puede copiar a mano.
      }
    }
    selectLink();
    shareStatus.textContent = "El enlace quedó seleccionado. Copialo y mandáselo a quien quieras.";
  });

  shareButton.hidden = false;
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = String(new Date().getFullYear());
