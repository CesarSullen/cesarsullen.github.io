function playVideo() {
  let hidenElements = document.querySelectorAll(".d-none");
  hidenElements.forEach(function (element) {
    element.classList.remove("d-none");
    element.classList.add("d-flex");
  });

  let ofConfirmation = document.querySelector(".of-confirmation");
  ofConfirmation.classList.add("d-none");

  let packVideo = document.getElementById("packVideo");
  packVideo.play();
}
