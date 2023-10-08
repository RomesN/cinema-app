import {
  MOVIE_LIST,
  SET_ERROR,
  RESPONSE_PAGE,
  LOAD_MORE_RESULTS,
  MOVIE_TYPE,
  SEARCH_QUERY,
  SEARCH_RESULT,
  MOVIE_DETAILS,
  CLEAR_MOVIE_DETAILS
} from '../types';
import {
  MOVIE_API_URL,
  SEARCH_API_URL,
  MOVIE_DETAILS_URL,
  MOVIE_CREDITS_URL,
  MOVIE_IMAGES_URL,
  MOVIE_VIDEOS_URL,
  MOVIE_REVIEWS_URL
} from '../../services/movies.service';

export const getMovies = (type, pageNumber) => async (dispatch) => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    dispatchMethod(MOVIE_LIST, results, dispatch);
    dispatchMethod(RESPONSE_PAGE, payload, dispatch);
  } catch (error) {
    if (error.response) {
      const payload = {
        message: error.response.data.message || error.response.data.status_message,
        statusCode: error.response.status
      };
      dispatchMethod(SET_ERROR, payload, dispatch);
    }
  }
};

export const loadMoreMovies = (type, pageNumber) => async (dispatch) => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    dispatchMethod(LOAD_MORE_RESULTS, { list: results, page: payload.page, totalPages: payload.totalPages }, dispatch);
  } catch (error) {
    if (error.response) {
      const payload = {
        message: error.response.data.message || error.response.data.status_message,
        statusCode: error.response.status
      };
      dispatchMethod(SET_ERROR, payload, dispatch);
    }
  }
};

export const searchResult = (query) => async (dispatch) => {
  try {
    if (query) {
      const movies = await SEARCH_API_URL(query);
      const { results } = movies.data;
      dispatchMethod(SEARCH_RESULT, results, dispatch);
    } else {
      dispatchMethod(SEARCH_RESULT, [], dispatch);
    }
  } catch (error) {
    if (error.response) {
      const payload = {
        message: error.response.data.message || error.response.data.status_message,
        statusCode: error.response.status
      };
      dispatchMethod(SET_ERROR, payload, dispatch);
    }
  }
};

export const movieDetails = (id) => async (dispatch) => {
  try {
    const resp = await Promise.all([
      MOVIE_DETAILS_URL(id),
      MOVIE_CREDITS_URL(id),
      MOVIE_IMAGES_URL(id),
      MOVIE_VIDEOS_URL(id),
      MOVIE_REVIEWS_URL(id)
    ]).then((values) => values.map((value) => value.data));
    dispatchMethod(MOVIE_DETAILS, resp, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const clearMovieDetails = () => async (dispatch) => {
  dispatchMethod(CLEAR_MOVIE_DETAILS, [], dispatch);
};

export const setResponsePageNumber = (page, totalPages) => async (dispatch) => {
  const payload = { page, totalPages };
  dispatchMethod(RESPONSE_PAGE, payload, dispatch);
};

export const setMovieType = (type) => async (dispatch) => {
  dispatchMethod(MOVIE_TYPE, type, dispatch);
};

export const searchQuery = (query) => async (dispatch) => {
  dispatchMethod(SEARCH_QUERY, query, dispatch);
};

const dispatchMethod = (type, payload, dispatch) => {
  dispatch({ type, payload });
};

const getMoviesRequest = async (type, pageNumber) => {
  const movies = await MOVIE_API_URL(type, pageNumber);
  const { results, page, total_pages } = movies.data;
  const payload = {
    page,
    totalPages: total_pages
  };
  return { results, payload };
};
