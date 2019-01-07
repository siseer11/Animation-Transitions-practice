const playB = document.querySelector(".play.controll-button");
const pauseB = document.querySelector(".pause.controll-button");
const repeatB = document.querySelector(".repeat.controll-button");

const lettersAnim = anime({
  targets: ".letter",
  delay: (el, i) => 100 * i,
  opacity: [0, 1],
  translateY: [-200, 0],
  scaleY: [3, 1],
  scaleX: [0.5, 1],
  duration: 1000,
  autoplay: false,
  elasticity: 650
});

playB.addEventListener("click", () => lettersAnim.play());
pauseB.addEventListener("click", () => lettersAnim.pause());
repeatB.addEventListener("click", () => lettersAnim.restart());
