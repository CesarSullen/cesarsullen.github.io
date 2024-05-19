// Carousel
const images = document.querySelectorAll(".carousel-images img");
let currentImage = 0;

function showImage(index) {
  images.forEach((img) => img.classList.remove("active"));
  images[index].classList.add("active");
}

function nextImage() {
  currentImage = (currentImage + 1) % images.length;
  showImage(currentImage);
}

function prevImage() {
  currentImage = (currentImage - 1 + images.length) % images.length;
  showImage(currentImage);
}

document.getElementById("prevBtn").addEventListener("click", prevImage);

document.getElementById("nextBtn").addEventListener("click", nextImage);

showImage(currentImage);

let timer = setInterval(nextImage, 5000);

document.querySelectorAll("#prevBtn, #nextBtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    clearInterval(timer);
    timer = setInterval(nextImage, 7000);
  });
});

// Interception Observer
const fadeIn = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle("show", entry.isIntersecting);
  });
});
fadeIn.forEach((section) => {
  observer.observe(section);
});
