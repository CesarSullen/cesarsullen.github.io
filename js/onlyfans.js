const advice = document.getElementById("advice");
const reveal = document.getElementById("reveal");
const packVideo = document.getElementById("packVideo");

document.getElementById("confirmAgeBtn").addEventListener("click", () => {
  document.body.classList.remove("gate-mode");
  advice.hidden = true;
  reveal.hidden = false;
  packVideo.play().catch(() => {});
});
