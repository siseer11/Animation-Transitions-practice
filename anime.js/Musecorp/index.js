//Element Selectors
const leftArrow = dq(".arrow-left");
const rightArrow = dq(".arrow-right");
const slides = dq(".slides-holder .slide", true);
const slidesNumberLines = dq(".slide-number-line", true);

//Variables init
const nSlides = slides.length;
let activeSlide = 0;
let clickable = true;

//Event Listeneres
leftArrow.addEventListener("click", leftArrowListener);
rightArrow.addEventListener("click", rightArrowListener);

//Functions
function dq(selector, all = false) {
  if (all) {
    return document.querySelectorAll(selector);
  }
  return document.querySelector(selector);
}

//Update the arrows disable class
function updateArrows() {
  console.log("zz");
  //Update the state of the lines right
  dq(".slide-number-line.active").classList.remove("active");
  slidesNumberLines[activeSlide].classList.add("active");

  //Update the state of the arrows
  if (activeSlide == 0) {
    leftArrow.classList.add("disabled");
  } else if (activeSlide === nSlides - 1) {
    rightArrow.classList.add("disabled");
  } else {
    leftArrow.classList.remove("disabled");
    rightArrow.classList.remove("disabled");
  }
}

function rightArrowListener() {
  if (!clickable || activeSlide === nSlides - 1) return;
  slide(slides[activeSlide], slides[activeSlide + 1]);
  activeSlide++;
  updateArrows();
}

function leftArrowListener() {
  if (!clickable || activeSlide === 0) return;
  slide(slides[activeSlide], slides[activeSlide - 1], false);
  activeSlide--;
  updateArrows();
}

//Animation
function slide(oldSlide, newSlide, increase = true) {
  //increase -> when it is true, it means that from the first slide, we went to the second
  //if false it is from second to first and so on
  const myTimeline = anime.timeline();
  clickable = false;

  //Times
  const scaleOut = 300;
  const scaleIn = 500;
  const translateImage = 800; //
  const translateOutTitle = 700;
  const translateInTitle = 800;

  myTimeline
    .add({
      targets: oldSlide.querySelector(".slide-image"),
      keyframes: [
        //Scale image out
        {
          scale: [1, 0.9],
          easing: "linear",
          duration: scaleOut
        },
        //Translate the image out of the view
        {
          translateX: [0, increase ? "-180%" : "180%"],
          delay: scaleOut - 100,
          duration: translateImage,
          easing: "easeOutSine"
        }
      ]
    })
    .add(
      //Translate the new slide into the view,
      //The image and the title will be hidden
      {
        targets: newSlide,
        translateX: 0,
        duration: 1
      },
      `-=${translateImage}`
    )
    .add(
      //Hide the old title
      {
        targets: oldSlide.querySelector(".slide-title"),
        translateY: [0, increase ? "100%" : "-100%"],
        scale: [1, 0.8],
        duration: translateOutTitle,
        easing: "linear"
      },
      `-=${translateImage}`
    )
    .add(
      //Slide the new image into the view
      //Keep it's scale to .9
      {
        targets: newSlide.querySelector(".slide-image"),
        translateX: [increase ? "180%" : "-180%", "0%"],
        scale: {
          duration: 1,
          value: 0.9
        },
        duration: translateImage,
        easing: "easeOutSine"
      },
      `-=${translateOutTitle + 100}`
    )
    .add({
      //Scale the new image up to 1, it's normal size
      targets: newSlide.querySelector(".slide-image"),
      scale: [0.9, 1],
      duration: scaleIn,
      delay: 0,
      easing: "easeOutSine"
    })
    .add(
      {
        //Slide the new title in
        targets: newSlide.querySelector(".slide-title"),
        translateY: [increase ? "-100%" : "100%", "0%"],
        scale: [0.8, 1],
        duration: translateInTitle,
        easing: "linear",
        complete: function() {
          clickable = true;
        }
      },
      `-=${translateImage + 500}`
    )
    .add({
      //Hide the old slide, take it out of the view
      targets: oldSlide,
      duration: 1,
      translateX: increase ? "-100%" : "100%"
    });
}
