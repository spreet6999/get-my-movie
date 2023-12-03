import axiosInstance from "./axiosInterceptor";

export const fetchMovies = async (year) => {
  try {
    const response = await axiosInstance.get(
      `/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`
    );
    return response.data.results;
  } catch (error) {
    console.error("Error occured while fetching movies:", error);
    return [];
  }
};

export const fetchGenres = async () => {
  try {
    const response = await axiosInstance.get(
      "/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d"
    );
    return response.data.genres;
  } catch (error) {
    console.error("Error occured while fetching genres:", error);
    return [];
  }
};
