const gameButton = document.querySelector(".demonstrations__game-button");
const gameButton1 = document.querySelector(".demonstrations__game-button1");

gameButton.addEventListener("click", () => {
  window.open("./game/sampleravens.html", "_blank");
});

gameButton1.addEventListener("click", () => {
  window.open("./game2/sampleshooter.html", "_blank");
});
