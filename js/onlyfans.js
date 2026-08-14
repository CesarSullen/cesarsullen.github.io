function playVideo() {
  const hiddenElements = document.querySelectorAll(".d-none");
  hiddenElements.forEach((element) => {
    element.classList.remove("d-none");
    element.classList.add("d-flex");
  });

  const advice = document.querySelector(".advice");
  advice.classList.add("d-none");

  const packVideo = document.getElementById("packVideo");
  packVideo.play();
}

const confirmAgeBtn = document.getElementById("confirmAgeBtn");
confirmAgeBtn.addEventListener("click", playVideo);
