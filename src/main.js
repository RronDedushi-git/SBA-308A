import * as api from "./api.js";
import * as ui from "./ui.js";

const state = {
  currentQuery: "",
  currentPage: 1,
  totalResults: 0,
  currentMovies: [],
};

function init() {
  document.getElementById("searchBtn").addEventListener("click", handleSearch);

  document.getElementById("searchInput").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  });
}

async function handleSearch() {
  const input = document.getElementById("searchInput");
  const query = input.value.trim();

  if (!query) return;

  state.currentQuery = query;
  state.currentPage = 1;

  await loadMovies(query, 1);
}

async function loadMovies(query, page) {
  try {
    const data = await api.searchMovies(query, page);

    if (data.Response === "False") {
      document.getElementById("resultsSection").style.display = "none";
      return;
    }

    state.currentMovies = data.Search;
    state.totalResults = parseInt(data.totalResults, 10);
    state.currentPage = page;

    document.getElementById("resultsSection").style.display = "block";

    ui.renderMovies(state.currentMovies, handleMovieClick);
    ui.renderPagination(state.currentPage, state.totalResults, loadPage);
  } catch (error) {
    console.error("Search error:", error);
  }
}

async function loadPage(page) {
  await loadMovies(state.currentQuery, page);
  document.getElementById("resultsSection").scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

async function handleMovieClick(movie) {
  try {
    const details = await api.getMovieDetails(movie.imdbID);
    ui.showMovieModal(details);
  } catch (error) {
    console.error("Movie details error:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
