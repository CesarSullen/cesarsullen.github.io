// DOM references
const carouselImages = document.querySelector(".carousel-images");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const projectTitle = document.querySelector(".project-title");
const projectDescription = document.querySelector(".project-description");

// Single source of truth
const projects = [
	{
		id: "baxar",
		title: "Baxar",
		description:
			"Baxar is an online marketplace designed to provide a wide range of quality products at affordable prices, with a focus on accessibility and convenience. Targeting cuban market, it offers an e-commerce platform where users can browse and purchase goods digitally.",
		image: "./assets/banners/baxar.png",
		url: "https://getbaxar.com/baxar",
	},
	{
		id: "radiocast",
		title: "RadioCast",
		description:
			"Radiocast is a practice project hosted on GitHub Pages, created as a personal exercise where users can listen to radio music for free. It offers a simple interface to enjoy a curated selection of radio stations.",
		image: "./assets/banners/radiocast.png",
		url: "https://cesarsullen.github.io/radiocast/",
	},
	{
		id: "pokedex",
		title: "Pokédex",
		description:
			"Pokedex is a practice project hosted on GitHub Pages, developed as a personal exercise to create a digital catalog of Pokémon.",
		image: "./assets/banners/pokedex.png",
		url: "https://cesarsullen.github.io/pokedex",
	},
	{
		id: "starjewels",
		title: "Star Jewel's",
		description:
			"Offering unique silver jewelry, infused with intention, glamour, and balance.",
		image: "./assets/banners/starjewels.png",
		url: "https://starjewels.baxarnetwork.com",
	},
	{
		id: "sophiemystique",
		title: "Sophie Mystique",
		description:
			"Sophie Mystique was my first sold project, a personal website created for a singer.",
		image: "./assets/banners/sophiemystique.png",
		url: "https://sophiemystique.com/",
	},
	{
		id: "witcher",
		title: "The Witcher API",
		description:
			"The Witcher API is an ongoing team project, currently under development.",
		image: "./assets/banners/witcher.png",
		url: "https://thewitcherapi.baxarnetwork.com/",
	},
	{
		id: "baya",
		title: "La Baya Amarilla",
		description:
			"La Baya Amarilla is a personal practice project inspired by satirical media.",
		image: "./assets/banners/baya.png",
		url: "https://cesarsullen.github.io/la-baya-amarilla/",
	},
];

// Build carousel dynamically
function buildCarousel() {
	projects.forEach((project) => {
		const link = document.createElement("a");
		link.href = project.url;
		link.target = "_blank";
		link.dataset.project = project.id;

		const img = document.createElement("img");
		img.src = project.image;
		img.alt = project.title;
		img.className = "carousel-img";

		link.appendChild(img);
		carouselImages.appendChild(link);
	});
}

// Update project info from first slide
function updateProjectInfo() {
	const activeSlide = carouselImages.firstElementChild;
	const projectId = activeSlide.dataset.project;
	const project = projects.find((p) => p.id === projectId);

	if (!project) return;

	projectTitle.textContent = project.title;
	projectDescription.textContent = project.description;
}

// Controls
nextBtn.onclick = () => {
	carouselImages.append(carouselImages.firstElementChild);
	updateProjectInfo();
};

prevBtn.onclick = () => {
	carouselImages.prepend(carouselImages.lastElementChild);
	updateProjectInfo();
};

// Init
buildCarousel();
updateProjectInfo();

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
