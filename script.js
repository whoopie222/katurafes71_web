window.addEventListener("scroll", () => {
  const topSection = document.getElementById("top");
  if (!topSection) return;

  const scrollTop = window.scrollY; // 現在のスクロール量
  const viewHeight = window.innerHeight; // 画面の高さ（100vh分）

  // スクロールするほど、1から0に向かって小さくなる数値を計算
  let opacityValue = 1 - scrollTop / viewHeight;

  // 0〜1の間に数値を収める安全ブレーキ
  if (opacityValue < 0) opacityValue = 0;
  if (opacityValue > 1) opacityValue = 1;

  // 【マジック】要素全体を透けさせるのではなく、「背景（background）」の透明度だけをコントロールする
  topSection.style.backgroundColor = `rgba(255, 255, 255, ${opacityValue})`;

  // 元の背景画像レイヤーの不透明度を調整するために、CSSのカスタムプロパティ（あるいは直接指定）を利用する代わりに
  // 最もブラウザバグの起きない「全体の透明度」をブレンドします。
  topSection.style.opacity = opacityValue;
});
