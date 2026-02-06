const winScreen = document.getElementById("winScreen");
const game = document.getElementById("game");
const player = document.getElementById("player");
const scoreEl = document.getElementById("score");

let playerX = 150;
let score = 0;

function movePlayer(dx) {
  playerX += dx;
  playerX = Math.max(0, Math.min(playerX, 350));
  player.style.left = playerX + "px";
}

document.getElementById("left").onclick = () => movePlayer(-30);
document.getElementById("right").onclick = () => movePlayer(30);

document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") movePlayer(-30);
  if (e.key === "ArrowRight") movePlayer(30);
});

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * 360 + "px";
  game.appendChild(heart);

  let y = 0;
  const fall = setInterval(() => {
    y += 5;
    heart.style.top = y + "px";

    const heartRect = heart.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();

    if (
      heartRect.bottom > playerRect.top &&
      heartRect.left < playerRect.right &&
      heartRect.right > playerRect.left
    ) {
      score++;
      scoreEl.innerText = score;
      heart.remove();
      clearInterval(fall);

if (score >= 15) {
  clearInterval(gameInterval);
  winScreen.classList.remove("hidden");
}


    }

    if (y > 500) {
      heart.remove();
      clearInterval(fall);
    }
  }, 50);
}

const gameInterval = setInterval(createHeart, 1000);

setInterval(() => {
  const bgHeart = document.createElement("div");
  bgHeart.innerText = "💗";
  bgHeart.style.position = "fixed";
  bgHeart.style.left = Math.random() * 100 + "vw";
  bgHeart.style.bottom = "-20px";
  bgHeart.style.fontSize = "20px";
  bgHeart.style.opacity = "0.4";
  bgHeart.style.animation = "floatUp 6s linear";
  document.body.appendChild(bgHeart);
  setTimeout(() => bgHeart.remove(), 6000);
}, 800);


