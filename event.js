/* ==================================================
   桂川祭｜企画検索ページ専用 JavaScript
================================================== */

/* ==================================================
   HTML要素
================================================== */

const searchInput = document.getElementById("searchInput");
const projectList = document.getElementById("projectList");
const tags = document.querySelectorAll(".tag");

/*
  企画検索ページに必要なHTMLが存在しない場合は
  ここから先の処理を実行しない

  → トップページなどでscript.jsとは別に読み込んでも
    エラーになりません。
*/

if (searchInput && projectList) {
  /* ==================================================
     企画カードを作成
  ================================================== */

  function createProjectCard(project) {
    const card = document.createElement("a");

    card.classList.add("project-card");
    card.href = `event-detail.html?id=${project.id}`;

    card.innerHTML = `
    <div class="project-image">
      ${
        project.image
          ? `<img src="${project.image}" alt="${project.title}">`
          : `<span>画像準備中</span>`
      }
    </div>

    <div class="project-info">

      <h2>${project.title}</h2>

      <p class="project-organizer">
        ${project.organizer}
      </p>

      <p class="project-description">
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

  /* ==================================================
     企画を表示
  ================================================== */

  function displayProjects(projectsToDisplay) {
    /*
      一度、現在表示されているカードを
      すべて削除する

      これによって、
      「非表示にしたカードの場所に空白が残る」
      という状態を防ぐ。
    */

    projectList.innerHTML = "";

    /* -----------------------------------------------
       該当する企画がない場合
    ------------------------------------------------ */

    if (projectsToDisplay.length === 0) {
      projectList.innerHTML = `
        <div class="no-result">
          該当する企画がありません。
        </div>
      `;

      return;
    }

    /* -----------------------------------------------
       該当する企画だけを追加
    ------------------------------------------------ */

    projectsToDisplay.forEach((project) => {
      const card = createProjectCard(project);

      projectList.appendChild(card);
    });
  }

  /* ==================================================
     検索処理
  ================================================== */

  function searchProjects() {
    /*
      検索欄に入力されている文字を取得
    */

    const keyword = searchInput.value.trim().toLowerCase();

    /*
      キーワードが空の場合
      → すべて表示
    */

    if (keyword === "") {
      displayProjects(projects);

      return;
    }

    /*
      企画を検索
    */

    const filteredProjects = projects.filter((project) => {
      /* -----------------------------------------------
         タイトル
      ------------------------------------------------ */

      const titleMatch = project.title.toLowerCase().includes(keyword);

      /* -----------------------------------------------
         主催者
      ------------------------------------------------ */

      const organizerMatch = project.organizer.toLowerCase().includes(keyword);

      /* -----------------------------------------------
         説明文
      ------------------------------------------------ */

      const descriptionMatch = project.description
        .toLowerCase()
        .includes(keyword);

      /* -----------------------------------------------
         タグ
      ------------------------------------------------ */

      const tagMatch = project.tags.some((tag) =>
        tag.toLowerCase().includes(keyword),
      );

      /*
        タイトル・主催者・説明・タグの
        どれかに一致すれば表示
      */

      return titleMatch || organizerMatch || descriptionMatch || tagMatch;
    });

    /*
      検索結果を表示
    */

    displayProjects(filteredProjects);
  }

  /* ==================================================
     タグをクリック
  ================================================== */

  tags.forEach((tag) => {
    tag.addEventListener("click", () => {
      const selectedTag = tag.dataset.tag;

      /*
        すでに選択されているタグを
        もう一度クリックした場合

        → 選択解除
      */

      if (tag.classList.contains("active")) {
        tag.classList.remove("active");

        searchInput.value = "";

        displayProjects(projects);

        return;
      }

      /*
        すべてのタグから
        activeを外す
      */

      tags.forEach((t) => {
        t.classList.remove("active");
      });

      /*
        クリックしたタグだけ
        activeにする
      */

      tag.classList.add("active");

      /*
        検索欄にもタグ名を表示
      */

      searchInput.value = selectedTag;

      /*
        タグで企画を絞り込む
      */

      const filteredProjects = projects.filter((project) => {
        return project.tags.includes(selectedTag);
      });

      /*
        該当する企画だけ表示

        ★ここが今回の重要ポイント

        該当しないカードは
        「非表示」にするのではなく、

        そもそもdisplayProjects()によって
        projectListに追加しない。

        そのためCSS Gridが
        左上から自動的に詰めてくれる。
      */

      displayProjects(filteredProjects);
    });
  });

  /* ==================================================
     検索欄に直接入力
  ================================================== */

  searchInput.addEventListener("input", () => {
    /*
      キーワードを直接入力した場合は
      タグの選択状態を解除
    */

    tags.forEach((tag) => {
      tag.classList.remove("active");
    });

    /*
      検索を実行
    */

    searchProjects();
  });

  /* ==================================================
     初期表示
  ================================================== */

  displayProjects(projects);
}
