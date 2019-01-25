const receiptBody = document.querySelector(".receipt-body");
const wrapper = document.querySelector(".wrapper");

let shown = false;

function show() {
  const timeline = anime.timeline();
  timeline
    .add({
      targets: ".logo",
      translateX: [115, 0],
      easing: "easeInOutQuad",
      duration: 500
    })
    .add(
      {
        targets: ".top .date",
        translateX: [-90, 0],
        opacity: [0, 1],
        easing: "easeInOutQuad",
        duration: 400
      },
      "-=400"
    )
    .add({
      targets: receiptBody,
      height: [0, receiptBody.scrollHeight],
      easing: "easeInOutQuad",
      duration: 500
    })
    .add({
      targets: ".middle",
      rotateX: [-90, 0],
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 300
    })
    .add({
      targets: ".bottom",
      rotateX: [-90, 0],
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 300
    })
    .add({
      targets: ".middle > *",
      translateY: [50, 0],
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: (el, i) => 300 + i * 100
    });
}

function hide() {
  const timeline = anime.timeline();
  timeline
    .add({
      targets: ".middle > *",
      translateY: [0, 50],
      opacity: [1, 0],
      easing: "easeInOutQuad",
      duration: (el, i, total) => 300 + (total - i) * 100
    })
    .add({
      targets: ".bottom",
      rotateX: [0, -90],
      opacity: [1, 0],
      easing: "easeInOutQuad",
      duration: 300
    })
    .add({
      targets: ".middle",
      rotateX: [0, -90],
      opacity: [1, 0],
      easing: "easeInOutQuad",
      duration: 300
    })
    .add({
      targets: receiptBody,
      height: [receiptBody.scrollHeight, 0],
      easing: "easeInOutQuad",
      duration: 500
    })
    .add({
      targets: ".top .date",
      translateX: [0, -90],
      opacity: [1, 0],
      easing: "easeInOutQuad",
      duration: 400
    })
    .add(
      {
        targets: ".logo",
        translateX: [0, 115],
        easing: "easeInOutQuad",
        duration: 500
      },
      "-=400"
    );
}

wrapper.addEventListener("click", () => {
  shown ? hide() : show();

  shown = !shown;
});
