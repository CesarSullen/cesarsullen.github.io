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

// Interception Observer
const sections = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			entry.target.classList.toggle("show", entry.isIntersecting);
		});
	},
	{
		threshold: 0.1,
	}
);
sections.forEach((section) => {
	observer.observe(section);
});
