const carouselImages = document.querySelector(".carousel-images");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const projectTitle = document.querySelector(".project-title");
const projectDescription = document.querySelector(".project-description");

const projects = [
	{
		id: "stox",
		title: "STOX",
		description:
			"STOX is a complete ecosystem for businesses with one or several points of sale: the owner manages from STOX and his employees operate from SELY, all optionally synchronized by the cloud.",
		image: "./assets/images/banners/stox.png",
		url: "https://cesarsullen.github.io/stox/",
	},
	{
		id: "radiocast",
		title: "RadioCast",
		description:
			"Radiocast is a practice project hosted on GitHub Pages, created as a personal exercise where users can listen to radio music for free. It offers a simple interface to enjoy a curated selection of radio stations.",
		image: "./assets/images/banners/radiocast.png",
		url: "https://cesarsullen.github.io/radiocast/",
	},
	{
		id: "pokedex",
		title: "Pokédex",
		description:
			"Pokedex is a practice project hosted on GitHub Pages, developed as a personal exercise to create a digital catalog of Pokémon.",
		image: "./assets/images/banners/pokedex.png",
		url: "https://cesarsullen.github.io/pokedex",
	},
	{
		id: "baxar",
		title: "Baxar",
		description:
			"Baxar is an online marketplace designed to provide a wide range of quality products at affordable prices, with a focus on accessibility and convenience. Targeting cuban market, it offers an e-commerce platform where users can browse and purchase goods digitally.",
		image: "./assets/images/banners/baxar.png",
		url: "https://getbaxar.com/baxar",
	},
	{
		id: "kuic",
		title: "Kuic",
		description:
			"It's a Kanban-type task management application designed with privacy first and completely offline operation. Create, edit, and delete custom columns and tasks, assign due dates, and mark progress with dynamic counters for pending and completed tasks.",
		image: "./assets/images/banners/kuic.png",
		url: "https://cesarsullen.github.io/kuic",
	},
	{
		id: "sophiemystique",
		title: "Sophie Mystique",
		description:
			"Sophie Mystique was my first sold project, a personal website created for a singer.",
		image: "./assets/images/banners/sophiemystique.png",
		url: "https://sophiemystique.com/",
	},
	{
		id: "witcher",
		title: "The Witcher API",
		description:
			"The Witcher API is an ongoing team project, currently under development.",
		image: "./assets/images/banners/witcher.png",
		url: "https://cesarsullen.github.io/thewitcher-api/",
	},
];

function buildCarousel() {
	projects.forEach((project) => {
		const link = document.createElement("a");
		link.href = project.url;
		link.target = "_blank";
		link.rel = "noopener noreferrer";
		link.dataset.project = project.id;

		const img = document.createElement("img");
		img.src = project.image;
		img.alt = project.title;
		img.className = "carousel-img";

		link.appendChild(img);
		carouselImages.appendChild(link);
	});
}

function updateProjectInfo() {
	const activeSlide = carouselImages.firstElementChild;
	const projectId = activeSlide.dataset.project;
	const project = projects.find((p) => p.id === projectId);
	if (!project) return;

	projectTitle.textContent = project.title;
	projectDescription.textContent = project.description;
}

function showNextProject() {
	carouselImages.append(carouselImages.firstElementChild);
	updateProjectInfo();
}

function showPreviousProject() {
	carouselImages.prepend(carouselImages.lastElementChild);
	updateProjectInfo();
}

async function trackProjectActivity(projectName) {
	try {
		const { error } = await _supabase.rpc("increment_visit", {
			name_param: projectName,
		});
		if (error) throw error;
	} catch (err) {
		console.warn("Offline mode");
	}
}

buildCarousel();
updateProjectInfo();
nextBtn.addEventListener("click", showNextProject);
prevBtn.addEventListener("click", showPreviousProject);
trackProjectActivity("Portfolio");
