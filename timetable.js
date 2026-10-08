/* ==================================================
   桂川祭｜タイムテーブル
   project.js の projects データを利用
================================================== */

/* ==================================================
   HTML要素
================================================== */

const dateTabs = document.querySelectorAll(".date-tab");
const timetableDays = document.querySelectorAll(".timetable-day");

/* ==================================================
   scheduleを「配列」に統一する
================================================== */

function getSchedules(project) {
  /*
    project.schedule が

    ① オブジェクト
      {
        date: "10/29",
        start: "10:00",
        end: "10:30",
        location: "ステージ"
      }

    ② 配列
      [
        {
          date: "10/29",
          ...
        },
        {
          date: "10/30",
          ...
        }
      ]

    のどちらでも扱えるようにする
  */

  if (!project.schedule) {
    return [];
  }

  if (Array.isArray(project.schedule)) {
    return project.schedule;
  }

  return [project.schedule];
}

/* ==================================================
   日付ごとのタイムテーブルを作成
================================================== */

function createTimetable(date) {
  const dayElement = document.querySelector(
    `.timetable-day[data-day="${date}"]`,
  );

  if (!dayElement) {
    return;
  }

  const stageTimeline = dayElement.querySelector(".stage-timeline");

  const eventList = dayElement.querySelector(".event-list");

  /*
    既存の表示をクリア
  */

  stageTimeline.innerHTML = "";
  eventList.innerHTML = "";

  /* ==================================================
     この日に開催される企画を取得
  ================================================== */

  const dayProjects = [];

  projects.forEach((project) => {
    // 装飾企画・団体企画はタイムテーブルに表示しない
    if (project.category === "装飾企画" || project.category === "団体") {
      return;
    }

    const schedules = getSchedules(project);

    schedules.forEach((schedule) => {
      if (schedule.date === date) {
        dayProjects.push({ project, schedule });
      }
    });
  });

  /* ==================================================
     開始時間順に並べる
  ================================================== */

  dayProjects.sort((a, b) => {
    const timeA = a.schedule.start || "99:99";
    const timeB = b.schedule.start || "99:99";

    return timeA.localeCompare(timeB);
  });

  /* ==================================================
     ステージ企画とその他の企画に分ける
  ================================================== */

  const stageProjects = dayProjects.filter(
    (item) =>
      item.project.category === "ステージ企画" ||
      item.project.category === "ステージ出演団体",
  );
  const otherProjects = dayProjects.filter(
    (item) =>
      item.project.category !== "ステージ企画" &&
      item.project.category !== "ステージ出演団体",
  );
  /* ==================================================
     ステージ企画
  ================================================== */

  stageProjects.forEach((item) => {
    const project = item.project;
    const schedule = item.schedule;

    const stageItem = document.createElement("a");

    stageItem.classList.add("stage-item");

    stageItem.href = `event-detail.html?id=${project.id}`;

    /* 時間 */

    const time = document.createElement("div");

    time.classList.add("stage-time");

    time.textContent = `${schedule.start} – ${schedule.end}`;

    /* 情報 */

    const information = document.createElement("div");

    information.classList.add("stage-information");

    /* 企画名 */

    const title = document.createElement("h3");

    title.classList.add("stage-title");

    title.textContent = project.title;

    /* 場所 */

    const location = document.createElement("p");

    location.classList.add("stage-location");

    location.textContent = `📍 ${formatLocation(schedule.location)}`;

    information.appendChild(title);
    information.appendChild(location);

    stageItem.appendChild(time);
    stageItem.appendChild(information);

    stageTimeline.appendChild(stageItem);
  });

  /* ==================================================
     ステージ企画がない場合
  ================================================== */

  if (stageProjects.length === 0) {
    stageTimeline.innerHTML = `
      <p class="empty-message">
        この日のステージ企画はありません。
      </p>
    `;
  }

  /* ==================================================
     その他の企画
  ================================================== */

  otherProjects.forEach((item) => {
    const project = item.project;
    const schedule = item.schedule;

    const card = document.createElement("a");

    card.classList.add("timetable-card");

    card.href = `event-detail.html?id=${project.id}`;

    /* 時間 */

    const time = document.createElement("p");

    time.classList.add("event-time");

    time.textContent = `${schedule.start} – ${schedule.end}`;

    /* カテゴリー */

    const category = document.createElement("p");

    category.classList.add("event-category");

    category.textContent = project.category || project.organizer || "";

    /* 企画名 */

    const title = document.createElement("h3");

    title.classList.add("event-title");

    title.textContent = project.title;

    /* 場所 */

    const location = document.createElement("p");

    location.classList.add("event-location");

    location.textContent = `📍 ${formatLocation(schedule.location)}`;

    /* 詳細 */

    const linkText = document.createElement("span");

    linkText.classList.add("event-link");

    linkText.textContent = "企画詳細を見る →";

    card.appendChild(time);
    card.appendChild(category);
    card.appendChild(title);
    card.appendChild(location);
    card.appendChild(linkText);

    eventList.appendChild(card);
  });

  /* ==================================================
     その他の企画がない場合
  ================================================== */

  if (otherProjects.length === 0) {
    eventList.innerHTML = `
      <p class="empty-message">
        この日のその他の企画はありません。
      </p>
    `;
  }
}

/* ==================================================
   場所を文字列に変換
================================================== */

function formatLocation(location) {
  if (Array.isArray(location)) {
    return location.join("・");
  }

  return location || "場所未定";
}

/* ==================================================
   日付を切り替える
================================================== */

function switchDate(selectedDate) {
  /* タブ */

  dateTabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.date === selectedDate);
  });

  /* コンテンツ */

  timetableDays.forEach((day) => {
    day.classList.toggle("hidden", day.dataset.day !== selectedDate);
  });

  /*
    切り替えた日付の内容を生成
  */

  createTimetable(selectedDate);
}

/* ==================================================
   日付タブのクリック
================================================== */

dateTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    switchDate(tab.dataset.date);
  });
});

/* ==================================================
   初期表示
================================================== */

switchDate("10/29");
