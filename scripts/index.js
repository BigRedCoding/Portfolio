const gameButton = document.querySelector(".demonstrations__game-button");
const gameButton1 = document.querySelector(".demonstrations__game-button1");
const gameButton2 = document.querySelector(".demonstrations__game-button2");

gameButton.addEventListener("click", () => {
  window.open("./game/sampleravens.html", "_blank");
});

gameButton1.addEventListener("click", () => {
  window.open("./game2/sampleshooter.html", "_blank");
});

gameButton2.addEventListener("click", () => {
  window.open("./game3/demorpg.html", "_blank");
});
