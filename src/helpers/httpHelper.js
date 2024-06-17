import axios from 'axios';
import {
  API_KEY,
  AppConfig,
  BASE_URL,
  IMAGE_BASE_URL,
  YOUTUBE_BASE_URL,
} from '../constants/config';

export const axiosCall = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPlayingMovies = () => axiosCall.get(AppConfig.NOW_PLAYING);

export const getUpcomingMovies = () => axiosCall.get(AppConfig.UPCOMING);

export const getGenres = () => axiosCall.get(AppConfig.GENRES);

export const getPosters = path => `${IMAGE_BASE_URL}original/${path}`;

export const getVideo = key => `${YOUTUBE_BASE_URL}?v=${key}`;

export const getMovieById = (movieId, append_to_response = '') =>
  axiosCall.get(
    `${AppConfig.MOVIE}/${movieId}`,
    append_to_response ? {params: {append_to_response}} : null,
  );
