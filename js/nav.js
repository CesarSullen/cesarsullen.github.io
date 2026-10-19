const links = [...document.querySelectorAll(".nav-links a")];
const sections = ["top", "services", "skills", "portfolio", "about"].map((id) =>
  document.getElementById(id),
);

if (sections.every(Boolean)) {
  const setActive = (id) =>
    links.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === `#${id}`),
    );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((s) => observer.observe(s));
}
