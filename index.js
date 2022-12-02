let timer;
scrollForward = () => scroll(1);
scrollBack = () => scroll(-1);

scroll = (direction) => {
  const innerSlider = document.getElementById("inner-slider");
  const contentWidth = innerSlider?.children[0]?.clientWidth;

  const currentPosition = innerSlider.scrollLeft;
  let newPosition = currentPosition + direction * contentWidth;
  if (newPosition + 10 >= innerSlider.scrollWidth) newPosition = 0;
  else if (newPosition < 0) {
    const elementsCount = innerSlider?.children?.length;
    const lastIndex = elementsCount - 1;
    newPosition = lastIndex * contentWidth;
  }
  innerSlider.scrollLeft = newPosition;
};

onDotClicked = (event) => {
  const index = event.target.getAttribute("index");

  const innerSlider = document.getElementById("inner-slider");
  const contentWidth = innerSlider?.children[0]?.clientWidth;

  const newPosition = index * contentWidth;
  //   highlightSelectedDot(index);
  innerSlider.scrollLeft = newPosition;
};

initDots = () => {
  const innerSlider = document.getElementById("inner-slider");
  const elementsCount = innerSlider?.children?.length;

  const dotsContainer = document.getElementById("dots-container");
  for (let index = 0; index < elementsCount; index++) {
    const newDot = document.createElement("a");
    newDot.classList.add("dot");
    index === 0 && newDot.classList.add("highlighted");
    newDot.setAttribute("index", index);
    newDot.onclick = onDotClicked;
    dotsContainer.appendChild(newDot);
  }
};
onSliderScroll = () => {
  const innerSlider = document.getElementById("inner-slider");
  const contentWidth = innerSlider?.children[0]?.clientWidth;
  const currentPosition = innerSlider.scrollLeft;
  selectedIndex = parseInt(Math.ceil(currentPosition / contentWidth));
  highlightSelectedDot(selectedIndex);
};
highlightSelectedDot = (index) => {
  const dotsContainer = document.getElementById("dots-container");
  const elementsCount = dotsContainer?.children?.length;
  for (let index = 0; index < elementsCount; index++) {
    dotsContainer?.children[index]?.classList?.remove("highlighted");
  }
  dotsContainer?.children[index]?.classList?.add("highlighted");
};
window.onload = () => {
  initDots();
};

toggleAutoPlay = () => {
  const onText = document.getElementById("on");
  const offText = document.getElementById("off");
  const duration = document.getElementById("duration").value;

  const isAutoPlayOn = !!timer;
  if (isAutoPlayOn) {
    clearInterval(timer);
    timer = undefined;
  } else timer = setInterval(() => scroll(1), duration * 1000);
  onText.style.display = !isAutoPlayOn ? "block" : "none";
  offText.style.display = isAutoPlayOn ? "block" : "none";
};
onDurationchange = (event) => {
  const duration = event.target.value;
  const isAutoPlayOn = !!timer;
  if (!isAutoPlayOn) return;
  clearInterval(timer);
  timer = setInterval(() => scroll(1), duration);
};
