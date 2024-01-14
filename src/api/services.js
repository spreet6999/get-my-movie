import axiosInstance from "./axiosInterceptor";

// Fetching api key from .env
const API_KEY = process.env.REACT_APP_API_KEY || "";

const ERROR_MESSAGE_TYPE = {
  400: "Cannot process the request",
  401: "Unauthorized Please login again",
  403: "You don't have authorized to access right",
  404: "Not Found",
  500: "Internal server error please try again after some time",
  502: "Couldn't complete the request please try again",
  504: "Server timeout please try after sometime",
};

export const fetchMovies = async (year, searchString = "") => {
  try {
    const resp = await axiosInstance.get(
      `/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`,
      {
        params: searchString?.length ? { query: searchString } : {},
      }
    );
    console.log("AXIOS MOVIES RESP: ", resp);

    //* Only if resp.status === 200
    return resp;
  } catch (error) {
    console.error("Error occured while fetching movies:", error);
    return Promise.reject({
      apiError: error,
      message: error.response.data.status_message?.length
        ? error.response.data.status_message
        : ERROR_MESSAGE_TYPE[error.response.status],
    });
  }
};

export const fetchGenres = async () => {
  try {
    const resp = await axiosInstance.get(
      `/genre/movie/list?api_key=${API_KEY}`
    );
    console.log("AXIOS GENRES RESP: ", resp);

    //* Only if resp.status === 200
    return resp;
  } catch (error) {
    console.error("Error occured while fetching genres:", error);
    return Promise.reject({
      apiError: error,
      message: error.response.data.status_message?.length
        ? error.response.data.status_message
        : ERROR_MESSAGE_TYPE[error.response.status],
    });
  }
};
