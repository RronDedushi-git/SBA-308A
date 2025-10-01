const API_KEY = "1f40f1ca";
const BASE_URL = "https://www.omdbapi.com/";

async function fetchFromOMDb(params) {
  const url = new URL(BASE_URL);
  url.searchParams.append("apikey", API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function searchMovies(query, page = 1) {
  return fetchFromOMDb({
    s: query,
    page: page,
  });
}

export async function getMovieDetails(imdbID) {
  return fetchFromOMDb({
    i: imdbID,
    plot: "full",
  });
}
