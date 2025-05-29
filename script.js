const form = document.getElementById("search-form");
const movieInput = document.getElementById("movie-input");
const poster = document.getElementById("poster");
const title = document.getElementById("title");
const year = document.getElementById("year");
const plot = document.getElementById("plot");
const result = document.getElementById("result");
const error = document.getElementById("error");

// Replace with your OMDb API key
const apiKey = "YOUR_OMDB_API_KEY";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = movieInput.value.trim();
  if (query) {
    fetchMovie(query);
  }
});

function fetchMovie(query) {
  const url = `https://www.omdbapi.com/?t=${encodeURIComponent(query)}&apikey=${apiKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "True") {
        displayMovie(data);
      } else {
        showError("Movie not found!");
      }
    })
    .catch(() => {
      showError("Error fetching movie data.");
    });
}

function displayMovie(data) {
  error.textContent = "";
  title.textContent = data.Title;
  year.textContent = `Year: ${data.Year}`;
  plot.textContent = data.Plot;
  poster.src = data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/120x180?text=No+Image";
  result.classList.remove("hidden");
}

function showError(message) {
  result.classList.add("hidden");
  error.textContent = message;
}
