async function SearchByname() {
  let name = document.querySelector("#moviename").value;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=3f0168f4d8cfd1423bcd5e59af9572a4&&query=${name}`;
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      const object = await resp.json();
      console.log(object.results);
      Movies(object.results , "Search");
      collaps(
        document.querySelector("#btnn"),
        document.querySelector(".container"),
        document.querySelectorAll(".movie"),
        document.querySelectorAll(".movies")
      );
    } else {
      ErrorDisplay();
    }
  } catch (err) {
    alert("could not find any movies " + err);
  }
}

function ErrorDisplay() {
  container.innerHTML = "<h1>Could not Find Any Movie</h1>";
}
const imgPath = "https://image.tmdb.org/t/p/w1280";
function Popular() {
  MovieFetch("popular", "Popular");
 
}
function Top_rated() {
  MovieFetch("top_rated", "Top Rated");

}
function Upcoming() {
  MovieFetch("upcoming", "Upcoming");

}
async function MovieFetch(name, x) {
  let urll = `https://api.themoviedb.org/3/movie/${name}?api_key=3f0168f4d8cfd1423bcd5e59af9572a4`;
  try {
    const resp = await fetch(urll);
    if (resp.ok) {
      const object = await resp.json();
      Movies(object.results, x);
      collaps(
        document.querySelector("#btnn"),
        document.querySelector(".container"),
        document.querySelectorAll(".movie"),
        document.querySelectorAll(".movies")
      );
    } else {
      ErrorDisplay();
    }
  } catch (err) {
    alert("could not find any movies " + err);
  }
}
Moviesss();
async function Moviesss() {
  const movieurl =
    "https://api.themoviedb.org/3/discover/movie?api_key=3f0168f4d8cfd1423bcd5e59af9572a4&append_to_response=videos";
  console.log("ho rhaa hai");
  try {
    const resp = await fetch(movieurl);
    if (resp.ok) {
      const object = await resp.json();
      Movies(object.results, "Trending");
      collaps(
        document.querySelector("#btnn"),
        document.querySelector(".container"),
        document.querySelectorAll(".movie"),
        document.querySelectorAll(".movies")
      );
    } else {
      ErrorDisplay();
    }
  } catch (err) {
    alert("could not find any movies " + err);
  }
}
const container = document.querySelector(".container");
const heading = document.querySelector(".heading");
async function Movies(obj, name) {
  container.innerHTML = " ";
  console.log(name);
  obj.forEach((element) => {
    if (element.backdrop_path != null) {
      let div = document.createElement("div");
      div.classList.add("movies");
      const rating = element.vote_average.toFixed(1);
      heading.innerHTML = `The Movies Shown By  ${name} `;
      div.innerHTML = `<div class="img-div"> 
      <img src="${
        imgPath + element.backdrop_path
      }" alt="image" class="movie"></div>
      <div>
      <h3 class="name">${
        element.title
      }</h3><span class="rating"> &bigstar;${rating}</span><br>
   <span> Release Date: ${element.release_date}</span>
   <p>${element.overview}</P></div>
    `;
      container.appendChild(div);
    }
  });
}
function collaps(btn, container, img, movies) {
  let views=document.querySelector('#btnn')
  if (btn && movies.length > 0 && img.length > 0 && container) {
    let bool=true;
    btn.addEventListener("click", () => {
     bool? views.innerHTML=`<i class="fa-solid fa-bars"></i>`:views.innerHTML=`<i class="fa-solid fa-bars"></i>`;
     bool=false;
     console.log(bool);
      movies.forEach((movie) => {
        movie.classList.toggle("movies-lines");
        movie.classList.toggle("movies");
      });
      img.forEach((image) => {
        image.classList.toggle("movie");
        image.classList.toggle("movie-lines");
      });
      container.classList.toggle("container-lines");
      container.classList.toggle("container");
    });
  } else {
    console.error("Some elements are missing.");
  }
 
}