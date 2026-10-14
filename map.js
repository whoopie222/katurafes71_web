const openMapButton = document.getElementById("open-map");
const closeMapButton = document.getElementById("close-map");
const mapModal = document.getElementById("map-modal");

function openMap() {
  mapModal.classList.add("is-open");
  mapModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("map-modal-open");
  closeMapButton.focus();
}

function closeMap() {
  mapModal.classList.remove("is-open");
  mapModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("map-modal-open");
  openMapButton.focus();
}

openMapButton.addEventListener("click", openMap);

closeMapButton.addEventListener("click", closeMap);

// マップの外側をクリックしたら閉じる
mapModal.addEventListener("click", (event) => {
  if (event.target === mapModal) {
    closeMap();
  }
});

// Escapeキーでも閉じる
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && mapModal.classList.contains("is-open")) {
    closeMap();
  }
});
