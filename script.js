let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
let foodResult = document.getElementById("food-result");
let trailerResult = document.getElementById("trailer-result");

let getMovie = () => {
  let movieName = movieNameRef.value;
  let omdbUrl = `http://www.omdbapi.com/?t=${movieName}&apikey=ec47ba33`;

  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Enter the movie you wanna watch, and I will tell you what to crave 🤤</h3>`;
  } else {
    fetch(omdbUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.Response == "True") {
          result.innerHTML = `
            <div class="info">
                <img src=${data.Poster} class="poster">
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                        <img src="star-icon.svg">
                        <h4>${data.imdbRating}/10</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
          `;

          fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
              data.Title + " official trailer"
            )}&type=video&key=AIzaSyA7H7E1jnk9pfDFVUNszj69-Ha9M4K1UK8`
          )
            .then((response) => response.json())
            .then((trailerData) => {
              if (trailerData.items.length > 0) {
                let trailerId = trailerData.items[0].id.videoId;
                trailerResult.innerHTML = `
                  <iframe width="560" height="150" src="https://www.youtube.com/embed/${trailerId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                `;
              } else {
                trailerResult.innerHTML = `<h3 class="msg">Trailer not found</h3>`;
              }
            })
            .catch(() => {
              trailerResult.innerHTML = `<h3 class="msg">Error occurred while fetching trailer</h3>`;
            });

          let genres = data.Genre.split(",");
          let foodSuggestions = [];
          let promises = genres.map((genre) => {
            return fetch(
              `http://localhost:3000/api/food/${genre.trim().toLowerCase()}`
            )
              .then((response) => response.json())
              .then((foodData) => {
                foodSuggestions.push(...foodData);
              });
          });

          Promise.all(promises)
            .then(() => {
              foodResult.innerHTML = "<h3>Food Suggestions:</h3>";
              foodSuggestions.forEach((food) => {
                fetch(
                  `https://api.unsplash.com/search/photos?query=${food}&client_id=qQyiSfO-tT4jLp7Fy5IUTmVYqW4zgNVJp6qudhdmIa0`
                )
                  .then((response) => response.json())
                  .then((imgData) => {
                    if (
                      imgData &&
                      imgData.results &&
                      imgData.results.length > 0
                    ) {
                      let foodCard = document.createElement("div");
                      foodCard.className = "food-card";
                      let foodImg = document.createElement("img");
                      foodImg.src = imgData.results[0].urls.small;
                      let foodName = document.createElement("h4");
                      foodName.textContent = food;
                      foodCard.appendChild(foodImg);
                      foodCard.appendChild(foodName);
                      foodResult.appendChild(foodCard);
                    }
                  })
                  .catch(() => {
                    foodResult.innerHTML += `<h3 class="msg">Error Occurred</h3>`;
                  });
              });
            })
            .catch(() => {
              foodResult.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
            });
        } else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
