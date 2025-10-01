export function renderMovies(movies, onMovieClick) {
  const container = document.getElementById("results");

  if (!movies || movies.length === 0) {
    container.innerHTML = '<p class="muted">No movies found.</p>';
    return;
  }

  container.innerHTML = movies
    .map((movie, idx) => {
      const poster =
        movie.Poster !== "N/A"
          ? movie.Poster
          : "https://via.placeholder.com/300x450?text=No+Poster";
      return `
      <article class="card" data-idx="${idx}">
        <img src="${poster}" alt="${movie.Title}" />
        <div class="card-body">
          <h3>${movie.Title}</h3>
          <div class="year">${movie.Year}</div>
        </div>
      </article>
    `;
    })
    .join("");

  container.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const idx = parseInt(card.dataset.idx);
      onMovieClick(movies[idx]);
    });
  });
}
