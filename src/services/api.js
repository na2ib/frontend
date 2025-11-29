const BASE_URL = "https://api.jikan.moe/v4";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/top/manga`);
  const data = await response.json();
  return data.data;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/manga?q=${encodeURIComponent(query)}&limit=25`
  );
  const data = await response.json();
  return data.data;
};
