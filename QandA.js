document.querySelectorAll(".accordion").forEach((accordion) => {
  accordion.addEventListener("toggle", () => {
    if (accordion.open) {
      /* 他のQ&Aを閉じる */

      document.querySelectorAll(".accordion").forEach((other) => {
        if (other !== accordion) {
          other.removeAttribute("open");
        }
      });
    }
  });
});
