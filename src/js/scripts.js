document.addEventListener("click", clickHandlers);

function clickHandlers(event) {
  if (event.target.matches("#pull")) {
    showMenu();
    event.preventDefault();
  }
  if (event.target.matches(".content-video a")) {
    videoSwitch(event);
    event.preventDefault();
  }
  if (event.target.matches(".image-tn img")) {
    runCarousel(event);
    event.preventDefault();
  }
}

function runCarousel(event) {
  const imageHref = event.target.getAttribute("src");
  const titleText = event.target.title;
  // document.querySelector("figure img").setAttribute("src", imageHref);
  document.querySelector("figure img").src = imageHref;
  document.querySelector("figcaption").innerText = titleText;
}

function showMenu() {
  document.querySelector("body").classList.toggle("show-nav");
}

function videoSwitch(event) {
  const iFrame = document.querySelector("iframe");
  const videoLinks = document.querySelectorAll(".content-video a");
  videoLinks.forEach((videoLink) => videoLink.classList.remove("active"));
  event.target.classList.add("active");
  const videoToPlay = event.target.getAttribute("href");
  iFrame.setAttribute("src", videoToPlay);
}

// store the link plus the API key in a variable
const key = "l9GbhK4Pk2Nm6NiLsThxLdiXYfhpCZkA";
const API = `https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=${key}`;
const storagePrefix = "nyt-autosave";

console.log(API);

function getStories() {
  fetch(API)
    .then((response) => response.json())
    .then((data) => showData(data.results));
}

function showData(stories) {
  var looped = stories
    .map(
      (story) => `
    <div class="item">
    <picture>
    <img src="${story.multimedia[2].url}" alt="" />
    <caption>${story.multimedia[2]?.caption}</caption>
    </picture>
      <h3><a href="${story.url}">${story.title}</a></h3>
      <p>${story.abstract}</p>
    </div>
  `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
  sessionStorage.setItem(sotragePrefix, looped);
}

if (document.querySelector(".home")) {
  let saved = sessionStorage.getItem(storagePrefix);
  if (saved) {
    console.log("Loading from session storage");
    document.querySelector(".stories").innerHTML = saved;
  } else {
    console.log.apply("fetching from nytimes");
    getStories();
  }
}
//   getStories();
// }
