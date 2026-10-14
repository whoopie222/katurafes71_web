/* ==================================================
   共通要素
================================================== */

const header = document.querySelector("header");
const hamburger = document.getElementById("hamburger");

/* ==================================================
   トップページ：扉のスクロールアニメーション
================================================== */

const section = document.querySelector(".door-transition");
const doorMessage = document.querySelector(".door-message");
const doorContainer = document.querySelector(".door-container");
const leftDoor = document.querySelector(".door-left");
const rightDoor = document.querySelector(".door-right");
const festivalMessage = document.querySelector(".festival-message");

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

    // 扉のメッセージ
    if (progress < 0.2) {
      doorMessage.style.opacity = 1 - progress / 0.2;
    } else {
      doorMessage.style.opacity = 0;
    }

    // 扉を表示
    if (progress >= 0.2 && progress <= 0.5) {
      const p = (progress - 0.2) / 0.3;

      doorContainer.style.opacity = p;
      doorContainer.style.transform = `scale(${0.2 + p * 0.8})`;
      doorContainer.style.filter = `blur(${25 - p * 25}px)`;
    }

    // 扉を開く
    if (progress >= 0.5) {
      let p = (progress - 0.5) / 0.3;
      p = Math.min(p, 1);

      const deg = p * 95;

      leftDoor.style.transform = `rotateY(${deg}deg)`;
      rightDoor.style.transform = `rotateY(${-deg}deg)`;
    }

    // 桂川祭メッセージ
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

/* ==================================================
   TOP：スクロール時の背景変化
================================================== */

const topSection = document.querySelector(".top");

if (topSection) {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const opacity = Math.max(0, 1 - scrollY / 600);

    topSection.style.setProperty("--hero-opacity", opacity);
  });
}

/* ==================================================
   ナビゲーション：スクロール時の表示
================================================== */

/* ---------- ナビゲーション ---------- */

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

/* ==================================================
   Q&A：アコーディオン
================================================== */

const qaQuestions = document.querySelectorAll(".qa-question");

qaQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const card = question.closest(".qa-card");

    if (!card) return;

    const isOpen = card.classList.contains("is-open");

    document.querySelectorAll(".qa-card").forEach((item) => {
      item.classList.remove("is-open");
    });

    if (!isOpen) {
      card.classList.add("is-open");
    }
  });
});

/* ==================================================
   企画カード作成
================================================== */

function createProjectCard(project) {
  const card = document.createElement("a");

  card.classList.add("project-card");
  card.href = `event-detail.html?id=${encodeURIComponent(project.id)}`;

  const tags = Array.isArray(project.tags) ? project.tags : [];

  card.innerHTML = `
    <div class="project-image no-image">
      <span>アイコン画像</span>
    </div>

    <div class="project-info">
      <h2></h2>
      <p class="project-organizer"></p>
      <p class="project-description"></p>
      <div class="project-tags"></div>
      <div class="project-card-arrow">詳細を見る →</div>
    </div>
  `;

  // 企画データを設定
  card.querySelector("h2").textContent = project.title || "";
  card.querySelector(".project-organizer").textContent =
    `主催者：${project.organizer || ""}`;
  card.querySelector(".project-description").textContent =
    project.description || "";

  const tagContainer = card.querySelector(".project-tags");

  tags.forEach((tag) => {
    const span = document.createElement("span");
    span.textContent = tag;
    tagContainer.appendChild(span);
  });

  return card;
}

/* ==================================================
   スマートフォン用ハンバーガーメニュー
================================================== */

if (hamburger && header) {
  hamburger.setAttribute("aria-expanded", "false");

  hamburger.addEventListener("click", () => {
    const isOpen = header.classList.toggle("menu-open");

    hamburger.setAttribute("aria-expanded", String(isOpen));
    hamburger.setAttribute(
      "aria-label",
      isOpen ? "メニューを閉じる" : "メニューを開く",
    );
  });

  // メニュー内のリンクをクリックしたら閉じる
  const navBar = header.querySelector(".nav-bar");

  if (navBar) {
    navBar.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("menu-open");
        hamburger.setAttribute("aria-expanded", "false");
        hamburger.setAttribute("aria-label", "メニューを開く");
      });
    });
  }
}
