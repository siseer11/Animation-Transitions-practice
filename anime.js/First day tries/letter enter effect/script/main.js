const playB = document.querySelector(".play.controll-button");
const pauseB = document.querySelector(".pause.controll-button");
const repeatB = document.querySelector(".repeat.controll-button");
const innerDiv = document.querySelector(".inner");

function randomNumBetwwen(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const makeSvg = (classes, id) => {
  return `<svg class="${classes} ${id} shape"><use xlink:href="#${id}"></use></svg>`;
};

//populate svgs
const populateSvg = n => {
  const shapes = ["x", "circle", "triangle"];
  const colors = ["red", "white", "black"];
  const nColors = colors.length;
  const nShapes = shapes.length;

  const shapesArray = [];

  for (let i = 0; i <= n; i++) {
    const color = colors[randomNumBetwwen(0, nColors)];
    const shape = shapes[randomNumBetwwen(0, nShapes)];
    shapesArray.push(makeSvg(color, shape));
  }
  innerDiv.innerHTML += shapesArray.join("");
};

console.log(populateSvg(100));

const lettersAnim = anime({
  targets: ".letter",
  delay: (el, i) => 60 * i + 60,
  opacity: [0, 1],
  translateY: (el, i) => [i % 2 == 0 ? -100 : 100, 0],
  duration: 500,
  autoplay: false,
  easing: "easeOutExpo",
  elasticity: 0
});

const shapeAnim = anime({
  targets: ".shape",
  autoplay: false,
  delay: (el, i) => i * 5,
  left: (el, i) => {
    let initialX = i * 1;
    let randomX = anime.random(-25, 25);
    if (randomX < 0) {
      randomX -= 10;
    } else {
      randomX += 10;
    }
    return [initialX + "%", `+=${randomX}%`];
  },
  opacity: [
    { value: 1, duration: 1, easing: "linear" },
    { value: 0, duration: 350, delay: 100, easing: "easeOutQuad" }
  ],
  scale: [0, anime.random(5, 13) / 10],
  translateY: el => {
    let randomY = anime.random(-200, 200);
    if (randomY < 0) {
      randomY -= 50;
    } else {
      randomY += 50;
    }
    return randomY;
  },
  duration: 500,
  elasticity: 0,
  easing: "easeOutExpo"
});

playB.addEventListener("click", () => {
  shapeAnim.play();
  lettersAnim.play();
});
pauseB.addEventListener("click", () => {
  shapeAnim.pause();
  lettersAnim.pause();
});
repeatB.addEventListener("click", () => {
  shapeAnim.restart();
  lettersAnim.restart();
});
