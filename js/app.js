const projects = [
  {
    id: "stox",
    name: "STOX",
    text: "STOX is a complete ecosystem for businesses with one or several points of sale: the owner manages from STOX and his employees operate from SELY, all optionally synchronized by the cloud.",
    img: "./assets/images/banners/stox.png",
    href: "https://stox.sullen.deno.net",
  },
  {
    id: "radiocast",
    name: "RadioCast",
    text: "Radiocast is a practice project hosted on GitHub Pages, created as a personal exercise where users can listen to radio music for free. It offers a simple interface to enjoy a curated selection of radio stations.",
    img: "./assets/images/banners/radiocast.png",
    href: "https://cesarsullen.github.io/radiocast/",
  },
  {
    id: "pokebox",
    name: "Pokébox",
    text: "Pokébox is a practice project hosted on GitHub Pages, developed as a personal exercise to create a digital catalog of Pokémon.",
    img: "./assets/images/banners/pokebox.png",
    href: "https://cesarsullen.github.io/pokebox",
  },
  {
    id: "kuic",
    name: "Kuic",
    text: "It's a Kanban-type task management application designed with privacy first and completely offline operation. Create, edit, and delete custom columns and tasks, assign due dates, and mark progress with dynamic counters for pending and completed tasks.",
    img: "./assets/images/banners/kuic.png",
    href: "https://cesarsullen.github.io/kuic",
  },
  {
    id: "joycon-lab",
    name: "Joy-Con Lab",
    text: "Joy-Con Lab is a Nintendo game catalog built as a test project to practice and experiment with new ideas.",
    img: "./assets/images/banners/joycon-lab.jpg",
    href: "https://cesarsullen.github.io/joycon-lab",
  },
  {
    id: "synthocean",
    name: "SynthOcean",
    text: "SynthOcean is an ongoing team project still in development, so don’t judge the design too harshly. We’re crafting something cool, and I’ve included it here to share the journey.",
    img: "./assets/images/banners/synthocean.jpg",
    href: "https://synthocean.com",
    dev: true,
  },
  {
    id: "baxar",
    name: "Baxar",
    text: "Baxar is an online marketplace designed to provide a wide range of quality products at affordable prices, with a focus on accessibility and convenience. Targeting cuban market, it offers an e-commerce platform where users can browse and purchase goods digitally.",
    img: "./assets/images/banners/baxar.png",
    href: "https://getbaxar.com/baxar",
  },
  {
    id: "sophiemystique",
    name: "Sophie Mystique",
    text: "Sophie Mystique was my first sold project, a personal website created for a singer.",
    img: "./assets/images/banners/sophiemystique.png",
    href: "https://sophiemystique.com/",
  },
  {
    id: "witcher",
    name: "The Witcher API",
    text: "The Witcher API is an ongoing team project, currently under development.",
    img: "./assets/images/banners/witcher.png",
    href: "https://cesarsullen.github.io/thewitcher-api/",
    dev: true,
  },
];

const track = document.getElementById("carTrack");
const dotsBox = document.getElementById("carDots");
const desktop = matchMedia("(min-width: 761px)");
let active = 1;
let current = 0;

const slots = { "-1": "-.2rem", 0: "23.1rem", 1: "47.6rem" };

function el(tag, cls, text) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text) e.textContent = text;
  return e;
}

function build() {
  projects.forEach((p, i) => {
    const card = el("article", "pcard");
    card.dataset.i = i;
    const img = el("div", "ph pimg");
    img.style.backgroundImage = `url("${p.img}"), linear-gradient(135deg,#e9dcc6,#d9c7a8)`;
    if (p.dev) img.appendChild(el("span", "badge", "Currently in development"));
    const link = el("a", "pill pill-outline", "View project ");
    link.href = p.href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.appendChild(el("i", "mask i-arrow"));
    const text = el("p", "", p.text);
    text.title = p.text;
    card.append(img, el("h4", "", p.name), text, link);
    track.appendChild(card);
    const dot = el("button");
    dot.type = "button";
    dot.dataset.i = i;
    dot.setAttribute("aria-label", `Project ${i + 1}`);
    dotsBox.appendChild(dot);
  });
  render();
}

function markActive(i, dotIndex) {
  track.querySelectorAll(".pcard").forEach((card) => {
    const on = Number(card.dataset.i) === i;
    card.classList.toggle("is-active", on);
    const btn = card.querySelector(".pill");
    btn.classList.toggle("pill-brown", on);
    btn.classList.toggle("pill-outline", !on);
  });
  dotsBox
    .querySelectorAll("button")
    .forEach((b, k) => b.classList.toggle("on", k === dotIndex));
}

function renderDesktop() {
  const n = projects.length;
  track.querySelectorAll(".pcard").forEach((card) => {
    const i = Number(card.dataset.i);
    const off = ((i - active + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);
    const visible = off >= -1 && off <= 1;
    card.style.left = visible ? slots[off] : "100rem";
    card.style.opacity = visible ? 1 : 0;
    card.style.pointerEvents = visible ? "auto" : "none";
  });
  markActive(active, (active - 1 + n) % n);
}

function renderMobile() {
  track.querySelectorAll(".pcard").forEach((card) => {
    card.style.left = card.style.opacity = card.style.pointerEvents = "";
  });
  markActive(current, current);
}

function render() {
  desktop.matches ? renderDesktop() : renderMobile();
}

let ticking = false;
track.addEventListener(
  "scroll",
  () => {
    if (desktop.matches || ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const cards = [...track.querySelectorAll(".pcard")];
      const start = cards[0].offsetLeft;
      let best = 0;
      cards.forEach((c, i) => {
        if (
          Math.abs(c.offsetLeft - start - track.scrollLeft) <
          Math.abs(cards[best].offsetLeft - start - track.scrollLeft)
        )
          best = i;
      });
      if (best !== current) {
        current = best;
        markActive(current, current);
      }
    });
  },
  { passive: true },
);

const go = (d) => {
  active = (active + d + projects.length) % projects.length;
  render();
};
document.querySelector(".car-prev").addEventListener("click", () => go(-1));
document.querySelector(".car-next").addEventListener("click", () => go(1));
dotsBox.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  const i = Number(b.dataset.i);
  if (desktop.matches) {
    active = (i + 1) % projects.length;
    render();
  } else {
    const cards = [...track.querySelectorAll(".pcard")];
    track.scrollTo({
      left: cards[i].offsetLeft - cards[0].offsetLeft,
      behavior: "smooth",
    });
  }
});
desktop.addEventListener("change", () => {
  track.scrollLeft = 0;
  current = 0;
  render();
});
build();

const strip = document.querySelector(".strip-track");
const step = () => strip.clientWidth / 6;
document
  .querySelector(".strip-prev")
  .addEventListener("click", () => strip.scrollBy({ left: -step() }));
document
  .querySelector(".strip-next")
  .addEventListener("click", () => strip.scrollBy({ left: step() }));

async function trackProjectActivity(projectName) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json", apikey: SUPABASE_KEY },
      body: JSON.stringify({ name_param: projectName }),
      keepalive: true,
    });
    if (!res.ok) throw new Error(res.status);
  } catch (err) {
    console.warn("Offline mode");
  }
}

trackProjectActivity("Portfolio");
