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
