const animatedElements = document.querySelectorAll(
	".show-up, .show-down, .bounce-in",
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
	{ root: null, rootMargin: "0px", threshold: 0.2 },
);
animatedElements.forEach((el) => observer.observe(el));
