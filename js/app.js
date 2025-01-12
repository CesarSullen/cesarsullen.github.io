// carousel
let carouselImages = document.querySelector(".carousel-images");
let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");

nextBtn.onclick = () => {
	carouselImages.append(carouselImages.querySelector("a:first-child"));
};
prevBtn.onclick = () => {
	carouselImages.prepend(carouselImages.querySelector("a:last-child"));
};
