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

export function renderPagination(currentPage, totalResults, onPageClick) {
  const container = document.getElementById("pagination");
  const totalPages = Math.ceil(totalResults / 10);

  if (totalPages <= 1) {
    container.innerHTML = "";
    return;
  }

  const maxButtons = 7;
  let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  let endPage = Math.min(totalPages, startPage + maxButtons - 1);

  if (endPage - startPage < maxButtons - 1) {
    startPage = Math.max(1, endPage - maxButtons + 1);
  }

  let html = "";

  if (currentPage > 1) {
    html += `<button class="page-btn" data-page="${
      currentPage - 1
    }">‹ Prev</button>`;
  }

  if (startPage > 1) {
    html += `<button class="page-btn" data-page="1">1</button>`;
    if (startPage > 2) {
      html += `<span class="page-btn" style="border:none;cursor:default">…</span>`;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    const active = i === currentPage ? "active" : "";
    html += `<button class="page-btn ${active}" data-page="${i}">${i}</button>`;
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      html += `<span class="page-btn" style="border:none;cursor:default">…</span>`;
    }
    html += `<button class="page-btn" data-page="${totalPages}">${totalPages}</button>`;
  }

  if (currentPage < totalPages) {
    html += `<button class="page-btn" data-page="${
      currentPage + 1
    }">Next ›</button>`;
  }

  container.innerHTML = html;

  container.querySelectorAll(".page-btn[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = parseInt(btn.dataset.page, 10);
      onPageClick(page);
    });
  });
}
