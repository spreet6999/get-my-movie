import axiosInstance from "./axiosInterceptor";

const ERROR_MESSAGE_TYPE = {
  400: "Cannot process the request",
  401: "Unauthorized Please login again",
  403: "You don't have authorized to access right",
  404: "Not Found",
  500: "Internal server error please try again after some time",
  502: "Couldn't complete the request please try again",
  504: "Server timeout please try after sometime",
  0: "Something went wrong please try after some time",
  600: "Could not associate Product Tracking List with OrderID. Please Retry!",
  601: "You do not have access to Cost Optimization application. Please contact owner of the application for access",
};

export const fetchMovies = async (year) => {
  try {
    const resp = await axiosInstance.get(
      `/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`
    );
    // console.log("AXIOS MOVIES RESP: ", resp);
    if (resp.status === 200) {
      return resp;
    } else {
      throw {
        error: resp.error ?? ERROR_MESSAGE_TYPE[resp.status],
      };
    }
  } catch (error) {
    console.error("Error occured while fetching movies:", error);
    return Promise.reject(error);
  }
};

export const fetchGenres = async () => {
  try {
    const resp = await axiosInstance.get(
      "/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d"
    );
    // console.log("AXIOS GENRES RESP: ", resp);
    if (resp.status === 200) {
      return resp;
    } else {
      throw {
        error: resp.error ?? ERROR_MESSAGE_TYPE[resp.status],
      };
    }
  } catch (error) {
    console.error("Error occured while fetching genres:", error);
    return Promise.reject(error);
  }
};
