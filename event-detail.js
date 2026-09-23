/* ========================================
   企画詳細ページ
======================================== */

/* ---------- URLから企画IDを取得 ---------- */

const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

/* ---------- 該当する企画を取得 ---------- */

const project = projects.find((item) => item.id === projectId);

/* ========================================
   HTML要素を取得
======================================== */

const eventTitle = document.getElementById("event-title");
const eventOrganizer = document.getElementById("event-organizer");
const eventImage = document.getElementById("event-image");
const eventDetail = document.getElementById("event-detail");
const eventCategory = document.getElementById("event-category");
const eventRecommended = document.getElementById("event-recommended");
const eventFee = document.getElementById("event-fee");
const eventReservation = document.getElementById("event-reservation");
const eventTags = document.getElementById("event-tags");
const eventSchedule = document.getElementById("event-schedule");
const eventNotes = document.getElementById("event-notes");
const eventNotesSection = document.getElementById("event-notes-section");

/* ========================================
   企画が見つからない場合
======================================== */

if (!project) {
  eventTitle.textContent = "企画が見つかりません";

  eventOrganizer.textContent = "";

  eventImage.innerHTML =
  "<span>該当する企画はありません。</span>";

  eventDetail.textContent =
    "指定された企画は存在しないか、URLが正しくありません。";

  eventCategory.textContent = "―";
  eventRecommended.textContent = "―";
  eventFee.textContent = "―";
  eventReservation.textContent = "―";

  eventTags.innerHTML = "";
  eventSchedule.innerHTML = "";

  eventNotesSection.style.display = "none";
} else {
  /* ---------- 基本情報 ---------- */

  eventTitle.textContent = project.title;

  eventOrganizer.textContent = project.organizer;

  eventDetail.textContent = project.detail;

  eventCategory.textContent = project.category;

  eventRecommended.textContent = project.recommendedFor.join("・");

  eventFee.textContent = project.fee;

  eventReservation.textContent = project.reservation ? "必要" : "不要";

  /* ========================================
     画像
  ======================================== */

  if (project.image) {
  eventImage.innerHTML =
    '<img src="' +
    project.image +
    '" alt="' +
    project.title +
    '">';
} else {
  eventImage.innerHTML = "<span>画像準備中</span>";
}

  /* ========================================
     タグ
  ======================================== */

  eventTags.innerHTML = "";

  project.tags.forEach((tag) => {
    const tagElement = document.createElement("span");

    tagElement.textContent = tag;

    eventTags.appendChild(tagElement);
  });

  /* ========================================
     開催日時・場所
  ======================================== */

  eventSchedule.innerHTML = "";

  project.schedule.forEach((schedule) => {
    const scheduleItem = document.createElement("div");

    scheduleItem.classList.add("schedule-item");

    scheduleItem.innerHTML =
  '<div class="schedule-date">' +
  schedule.date +
  "</div>" +
  '<div class="schedule-time">' +
  schedule.start +
  "〜" +
  schedule.end +
  "</div>" +
  '<div class="schedule-location">' +
  schedule.location +
  "</div>";

  /* ========================================
     注意事項
  ======================================== */

  if (project.notes && project.notes.trim() !== "") {
    eventNotes.textContent = project.notes;
  } else {
    eventNotesSection.style.display = "none";
  }
}
