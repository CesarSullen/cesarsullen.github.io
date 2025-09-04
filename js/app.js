// carousel
let carouselImages = document.querySelector(".carousel-images");
let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");
let projectTitle = document.querySelector(".project-title");
let projectDescription = document.querySelector(".project-description");

let projects = [];

async function loadProjects() {
	try {
		const response = await fetch("./js/projects.json");
		projects = await response.json();
		updateProjectInfo();
	} catch (error) {
		console.error("Error al cargar el JSON:", error);
	}
}

function updateProjectInfo() {
	const currentImage = carouselImages.querySelector("a:first-child img").src;
	const imageName = currentImage.split("/").pop();
	const project = projects.find((p) => p.image.endsWith(imageName));

	if (project) {
		projectTitle.textContent = project.title;
		projectDescription.textContent = project.description;
	}
}

loadProjects();

nextBtn.onclick = () => {
	carouselImages.append(carouselImages.querySelector("a:first-child"));
	updateProjectInfo();
};

prevBtn.onclick = () => {
	carouselImages.prepend(carouselImages.querySelector("a:last-child"));
	updateProjectInfo();
};

// Interception Observer
const animatedElements = document.querySelectorAll(
	".show-up, .show-down, .show-left, .show-right, .bounce-in, .rotate-left, .rotate-right"
);

const observer = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				entry.target.classList.add("animated");
				observer.unobserve(entry.target);
			}
		});
	},
	{ root: null, rootMargin: "0px", threshold: 0.2 }
);

animatedElements.forEach((el) => observer.observe(el));
