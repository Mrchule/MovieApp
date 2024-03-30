async function SearchByname() {
  let name = document.querySelector("#moviename").value;
  const url = `https://api.themoviedb.org/3/search/movie?api_key=3f0168f4d8cfd1423bcd5e59af9572a4&&query=${name}`;
  name="";
  try {
    const resp = await fetch(url);
    if (resp.ok) {
      const object = await resp.json();
      console.log(object.results);
      Movies(object.results);
     
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
  MovieFetch("popular");
}
function Top_rated() {
  MovieFetch("top_rated");
}
function Upcoming() {
  MovieFetch("upcoming");
}
async function MovieFetch(name) {
  let urll = `https://api.themoviedb.org/3/movie/${name}?api_key=3f0168f4d8cfd1423bcd5e59af9572a4`;
  try {
    const resp = await fetch(urll);
    if (resp.ok) {
      const object = await resp.json();
      
      Movies(object.results);
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
      Movies(object.results);
    } else {
      ErrorDisplay();
    }
  } catch (err) {
    alert("could not find any movies " + err);
  }
}
const container = document.querySelector(".container");

async function Movies(obj) {
  container.innerHTML = " ";
  obj.forEach((element) => {
    if(element.backdrop_path!=null){
      let div = document.createElement("div");
      div.classList.add("movies");
      const rating = element.vote_average.toFixed(1);
      div.innerHTML = `<div class="img-div"> 
      <img src="${
        imgPath + element.backdrop_path
      }" alt="image" class="movie"></div>
      <h3 class="name">${
        element.title
      }</h3><span class="rating"> &bigstar;${rating}</span><br>
   <span> Release Date: ${element.release_date}</span>
    `;
      container.appendChild(div);
    }
  });
}
