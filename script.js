/* ==================================================
   トップページ
================================================== */

/* ---------- 扉のスクロールアニメーション ---------- */

const section = document.querySelector(".door-transition");
const doorMessage = document.querySelector(".door-message");
const doorContainer = document.querySelector(".door-container");
const leftDoor = document.querySelector(".door-left");
const rightDoor = document.querySelector(".door-right");
const festivalMessage = document.querySelector(".festival-message");

// トップページに扉がある場合だけ実行
if (
  section &&
  doorMessage &&
  doorContainer &&
  leftDoor &&
  rightDoor &&
  festivalMessage
) {
  window.addEventListener("scroll", () => {
    const start = section.offsetTop;

    const end = start + section.offsetHeight - window.innerHeight;

    let progress = (window.scrollY - start) / (end - start);

    progress = Math.max(0, Math.min(progress, 1));

    /* ---------- 扉のメッセージ ---------- */

    if (progress < 0.2) {
      doorMessage.style.opacity = 1 - progress / 0.2;
    } else {
      doorMessage.style.opacity = 0;
    }

    /* ---------- 扉を表示 ---------- */

    if (progress >= 0.2 && progress <= 0.5) {
      const p = (progress - 0.2) / 0.3;

      doorContainer.style.opacity = p;

      doorContainer.style.transform = `scale(${0.2 + p * 0.8})`;

      doorContainer.style.filter = `blur(${25 - p * 25}px)`;
    }

    /* ---------- 扉を開く ---------- */

    if (progress >= 0.5) {
      let p = (progress - 0.5) / 0.3;

      p = Math.min(p, 1);

      const deg = p * 95;

      leftDoor.style.transform = `rotateY(${deg}deg)`;

      rightDoor.style.transform = `rotateY(${-deg}deg)`;
    }

    /* ---------- 桂川祭メッセージ ---------- */

    if (progress >= 0.7) {
      let p = (progress - 0.7) / 0.2;

      p = Math.min(p, 1);

      festivalMessage.style.opacity = p;

      festivalMessage.style.transform = `scale(${0.8 + p * 0.2})`;
    } else {
      festivalMessage.style.opacity = 0;
    }
  });
}

/* ---------- TOP・テーマ ---------- */

const topSection = document.querySelector(".top");

if (topSection) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    const opacity = Math.max(0, 1 - scrollY / 600);

    topSection.style.setProperty("--hero-opacity", opacity);
  });
}

/* ---------- ハンバーガーメニュー ---------- */

const hamburger = document.getElementById("hamburger");

const menuPanel = document.getElementById("menu-panel");

if (hamburger && menuPanel) {
  hamburger.addEventListener("click", () => {
    menuPanel.classList.toggle("active");
  });
}

/* ---------- ナビゲーション ---------- */

const header = document.querySelector("header");

const theme = document.querySelector("#theme");

if (header && theme) {
  window.addEventListener("scroll", () => {
    const themeTop = theme.offsetTop;

    if (window.scrollY >= themeTop - 70) {
      header.classList.add("show");
    } else {
      header.classList.remove("show");
    }
  });
}

/* ========================================
   Q&A ACCORDION
======================================== */

const qaQuestions = document.querySelectorAll(".qa-question");

qaQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const card = question.closest(".qa-card");

    const isOpen = card.classList.contains("is-open");

    /* 一度すべて閉じる */

    document.querySelectorAll(".qa-card").forEach((item) => {
      item.classList.remove("is-open");
    });

    /* クリックしたものだけ開く */

    if (!isOpen) {
      card.classList.add("is-open");
    }
  });
});
function createProjectCard(project) {
  const card = document.createElement("a");

  card.classList.add("project-card");
  card.href = `event-detail.html?id=${project.id}`;

  card.innerHTML = `
    <div class="project-image no-image">
      <span>アイコン画像</span>
    </div>

    <div class="project-info">

      <h2>${project.title}</h2>

      <p>
        主催者：
        ${project.organizer}
      </p>

      <p>
        ${project.description}
      </p>

      <div class="project-tags">
        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>

      <div class="project-card-arrow">
        詳細を見る →
      </div>

    </div>
  `;

  return card;
}
