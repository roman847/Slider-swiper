let items = document.querySelectorAll(".item"),
  currentItem = 0,
  isEnabled = true;

document.querySelector(".control.left").addEventListener("click", function () {
  if (isEnabled) {
    previousItem(currentItem);
  } else {
  }
});

document.querySelector(".control.right").addEventListener("click", function () {
  if (isEnabled) {
    nextItem(currentItem);
  }
});

function changeCurrentItem(n) {
  currentItem = (n + items.length) % items.length;
}

function hideItem(direction) {
  isEnabled = false;
  items[currentItem].classList.add(direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("active-slide", direction);
  });
}

function showItem(direction) {
  items[currentItem].classList.add("next", direction);
  items[currentItem].addEventListener("animationend", function () {
    this.classList.remove("next", direction);
    this.classList.add("active-slide");
    isEnabled = true;
    switchOfDot();
  });
}

function switchOfDot() {
  let activeSlide = document.querySelector(".active-slide");
  let currentDots = document.querySelectorAll(".dot");
  currentDots.forEach((el, i) => {
    if (i == currentItem) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });

  currentDots.forEach((el, i) => {
    el.addEventListener("click", (e) => {
      if (e.target == el) {
        if (i > currentItem) {
          if (isEnabled) {
            nextItem(i - 1);
          }
        } else if (i < currentItem) {
          if (isEnabled) {
            previousItem(i + 1);
          }
        }
      }
    });
  });
}
switchOfDot();

function previousItem(n) {
  hideItem("to-right");
  changeCurrentItem(n - 1);
  showItem("from-left");
}

function nextItem(n) {
  hideItem("to-left");
  changeCurrentItem(n + 1);
  showItem("from-right");
}

let el = document.querySelector(".carousel");

const swipedetect = (el) => {
  let surface = el;
  let startX = 0;
  let startY = 0;
  let distX = 0;
  let distY = 0;

  let startTime = 0;
  let elapsedTime = 0;

  let threshold = 150;
  let restrain = 100;
  let allowedTime = 3000;

  surface.addEventListener("mousedown", function (e) {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener("mouseup", function (e) {
    distX = e.pageX - startX;
    distY = e.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restrain) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }

    e.preventDefault();
  });

  //ФУНКЦИЯ ПЕРЕЛИСТЫВАНИЯ СЛАЙДЕРА СТРЕЛКАМИ ТАЧСКРИНОМ
  surface.addEventListener("touchstart", function (e) {
    if (
      e.target.classList.contains("arrow") ||
      e.target.classList.contains("control")
    ) {
      if (e.target.classList.contains("left")) {
        if (isEnabled) {
          previousItem(currentItem);
        }
      } else {
        if (isEnabled) {
          nextItem(currentItem);
        }
      }
    }

    // ПЕРЕЛИСТЫВАНИЕ СЛАЙДЕРА О НАЖАТИЮ НА DOT НА ТАЧСКРИНЕ
    if (e.target.classList.contains("dot")) {
      let activeSlide = document.querySelector(".active-slide");
      let currentDots = document.querySelectorAll(".dot");
      currentDots.forEach((el, i) => {
        el.addEventListener("touchstart", (e) => {
          if (e.target == el) {
            if (i > currentItem) {
              if (isEnabled) {
                nextItem(i - 1);
              }
            } else if (i < currentItem) {
              if (isEnabled) {
                previousItem(i + 1);
              }
            }
          }
        });
      });
    }

    let touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  });

  surface.addEventListener("touchend", function (e) {
    let touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX;
    distY = touchObj.pageY - startY;
    elapsedTime = new Date().getTime() - startTime;

    if (elapsedTime <= allowedTime) {
      if (Math.abs(distX) >= threshold && Math.abs(distY) <= restrain) {
        if (distX > 0) {
          if (isEnabled) {
            previousItem(currentItem);
          }
        } else {
          if (isEnabled) {
            nextItem(currentItem);
          }
        }
      }
    }

    e.preventDefault();
  });

  surface.addEventListener("touchmove", function (e) {
    e.preventDefault();
  });
};

swipedetect(el);
