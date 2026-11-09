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

const clueTrack = document.querySelector("[data-clue-track]");
const clueControls = document.querySelector("[data-clue-controls]");

if (clueTrack && clueControls && clueTrack.children.length > 1) {
  const cards = clueTrack.children;
  const previousClue = clueControls.querySelector("[data-clue-prev]");
  const nextClue = clueControls.querySelector("[data-clue-next]");
  const clueStatus = clueControls.querySelector("[data-clue-status]");
  const cardStride = () => cards[1].offsetLeft - cards[0].offsetLeft;

  function updateCluePosition() {
    const stride = cardStride();
    if (!stride) return;

    const first = Math.round(clueTrack.scrollLeft / stride) + 1;
    const visibleCount = Math.round(clueTrack.clientWidth / stride);
    const last = Math.min(first + visibleCount - 1, cards.length);
    const range = first === last ? String(first) : `${first}–${last}`;
    const position = `${range} de ${cards.length}`;
    if (clueStatus.textContent !== position) clueStatus.textContent = position;
    previousClue.disabled = clueTrack.scrollLeft < 1;
    nextClue.disabled = clueTrack.scrollLeft + clueTrack.clientWidth >= clueTrack.scrollWidth - 1;
  }

  function moveClue(direction) {
    const stride = cardStride();
    const current = Math.round(clueTrack.scrollLeft / stride);
    clueTrack.scrollLeft = (current + direction) * stride;
  }

  previousClue.addEventListener("click", () => moveClue(-1));
  nextClue.addEventListener("click", () => moveClue(1));
  clueTrack.addEventListener("keydown", (event) => {
    if (event.target !== clueTrack || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    moveClue(event.key === "ArrowLeft" ? -1 : 1);
  });
  clueTrack.addEventListener("scroll", updateCluePosition, { passive: true });
  window.addEventListener("resize", updateCluePosition);
  clueControls.hidden = false;
  updateCluePosition();
}
