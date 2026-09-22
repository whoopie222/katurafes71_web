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

/* ==================================================
   企画検索ページ
================================================== */

/*
  企画データ

  実際の企画が決まったら、
  ここを書き換えていきます。
*/

const projects = [
  {
    title: "出店・企画名①",

    organizer: "大型企画",

    description: "企画内容の説明がここに入ります。",

    tags: ["10/29", "大型企画", "食品", "テント", "子どもにおすすめ"],
  },

  {
    title: "出店・企画名②",

    organizer: "体験型企画",

    description: "楽しく体験できる企画です。",

    tags: ["10/30", "体験型企画", "遊び", "3号館", "子どもにおすすめ"],
  },

  {
    title: "ステージパフォーマンス",

    organizer: "ステージ企画",

    description: "ステージ上でパフォーマンスを行います。",

    tags: ["10/31", "ステージ企画", "パフォーマンス", "ステージ"],
  },

  {
    title: "作品展示",

    organizer: "団体",

    description: "学生による作品を展示します。",

    tags: ["10/29", "団体", "展示", "5号館"],
  },
];

/* ---------- HTML要素を取得 ---------- */

const searchInput = document.getElementById("searchInput");

const projectList = document.getElementById("projectList");

const tags = document.querySelectorAll(".tag");

/*
  企画検索ページにいるときだけ
  以下の処理を実行する

  トップページには
  searchInputやprojectListがないため、
  エラーにならないようにする。
*/

if (searchInput && projectList) {
  /* ==================================================
     企画を表示
  ================================================== */

  function displayProjects(projectsToDisplay) {
    // 一度表示を空にする

    projectList.innerHTML = "";

    // 該当する企画がない場合

    if (projectsToDisplay.length === 0) {
      projectList.innerHTML = `
        <div class="no-result">
          該当する企画がありません。
        </div>
      `;

      return;
    }

    // 企画を1つずつ表示

    projectsToDisplay.forEach((project) => {
      const card = document.createElement("article");

      card.classList.add("project-card");

      /*
          企画カードのHTML
        */

      card.innerHTML = `

          <div class="project-image no-image">
            <span>アイコン画像</span>
          </div>


          <div class="project-info">

            <h2>
              ${project.title}
            </h2>


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

          </div>

        `;

      projectList.appendChild(card);
    });
  }

  /* ==================================================
     検索
  ================================================== */

  function searchProjects() {
    /*
      検索バーに入力されている文字
    */

    const keyword = searchInput.value.trim().toLowerCase();

    /*
      企画を絞り込む
    */

    const filteredProjects = projects.filter((project) => {
      // タイトルに含まれているか

      const titleMatch = project.title.toLowerCase().includes(keyword);

      // 主催者に含まれているか

      const organizerMatch = project.organizer.toLowerCase().includes(keyword);

      // タグに含まれているか

      const tagMatch = project.tags.some((tag) =>
        tag.toLowerCase().includes(keyword),
      );

      /*
            タイトル・主催者・タグの
            どれかに一致すれば表示
          */

      return titleMatch || organizerMatch || tagMatch;
    });

    /*
      絞り込んだ企画を表示
    */

    displayProjects(filteredProjects);
  }

  /* ==================================================
     タグをクリック
  ================================================== */

  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      /*
            クリックされたタグの文字
          */

      const selectedTag = tag.dataset.tag;

      /*
            検索バーにタグを表示
          */

      searchInput.value = selectedTag;

      /*
            すべてのタグから
            activeを外す
          */

      tags.forEach((t) => {
        t.classList.remove("active");
      });

      /*
            今クリックしたタグだけ
            activeにする
          */

      tag.classList.add("active");

      /*
            検索を実行
          */

      searchProjects();
    });
  });

  /* ==================================================
     検索バーに直接入力
  ================================================== */

  searchInput.addEventListener("input", () => {
    /*
        直接文字を入力した場合は、
        タグの選択状態を解除
      */

    tags.forEach((tag) => {
      tag.classList.remove("active");
    });

    searchProjects();
  });

  /* ==================================================
     初期表示
  ================================================== */

  displayProjects(projects);
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
