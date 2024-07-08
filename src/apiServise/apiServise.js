import axios from "axios";

const API_KEY = "94e323babe79cd109736829e2ec95cfe";
const BASE_URL = "https://api.themoviedb.org/3/";

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  api_key: API_KEY,
  per_page: 20,
};

axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NGUzMjNiYWJlNzljZDEwOTczNjgyOWUyZWM5NWNmZSIsIm5iZiI6MTcyMDM2ODE2NC45OTkyMzQsInN1YiI6IjY2OGFiYWMxMzA1NGRkYTQwZWZmMjNkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nIE3ptkcItLYwrplkmH3g1E_VZCW1xKdKwEVXmNFuws"
  
export const fetchTrendingMovies = async () => {
   try {
    const { data } = await axios.get("/trending/movie/day");
    return data.results;
  } catch (error) {
    alert("Error fetching movies");
  }
};

export const fetchMovieByQuery = async (query, page) => {
  try {
    const response = await axios.get("/search/movie", {
      params: {
        query,
        page,
      },
    });
    return response;
  } catch (error) {
    alert("Error fetching movies");
  }
};

export const fetchMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details (${movieId}):`, error);
    throw error;
  }
};

export const fetchMovieCredits = async (movieId) => {
  try {
    const response = await axios.get(`movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error(`Error fetching movie cast (${movieId}):`, error);
    throw error;
  }
};

export const fetchMovieReviews = async (movieId) => {
  try {
    const response = await axios.get(`movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching movie reviews (${movieId}):`, error);
    throw error;
  }
};
