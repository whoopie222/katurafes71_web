const section = document.querySelector(".door-transition");

const doorMessage = document.querySelector(".door-message");

const doorContainer = document.querySelector(".door-container");

const leftDoor = document.querySelector(".door-left");

const rightDoor = document.querySelector(".door-right");

const festivalMessage = document.querySelector(".festival-message");

window.addEventListener("scroll", () => {
  const start = section.offsetTop;

  const end = start + section.offsetHeight - window.innerHeight;

  let progress = (window.scrollY - start) / (end - start);

  progress = Math.max(0, Math.min(progress, 1));

  if (progress < 0.2) {
    doorMessage.style.opacity = 1 - progress / 0.2;
  } else {
    doorMessage.style.opacity = 0;
  }

  if (progress >= 0.2 && progress <= 0.5) {
    const p = (progress - 0.2) / 0.3;

    doorContainer.style.opacity = p;

    doorContainer.style.transform = `scale(${0.2 + p * 0.8})`;
  }

  if (progress >= 0.5) {
    let p = (progress - 0.5) / 0.3;

    p = Math.min(p, 1);

    const deg = p * 95;

    leftDoor.style.transform = `rotateY(${-deg}deg)`;

    rightDoor.style.transform = `rotateY(${deg}deg)`;
  }

  if (progress >= 0.7) {
    let p = (progress - 0.7) / 0.2;

    p = Math.min(p, 1);

    festivalMessage.style.opacity = p;

    festivalMessage.style.transform = `scale(${0.8 + p * 0.2})`;
  } else {
    festivalMessage.style.opacity = 0;
  }
});
