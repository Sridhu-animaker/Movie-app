import * as config from '../../package.json';

export const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
export const YOUTUBE_BASE_URL = 'https://www.youtube.com/watch';

export const API_KEY = config.projectConfig.apiKey;

export const AppConfig = {
  NOW_PLAYING: '/movie/now_playing',
  UPCOMING: '/movie/upcoming',
  GENRES: '/genre/movie/list',
  GET_LANGUAGES: '/configuration/languages',
  MOVIE: '/movie',
};

export const APPEND_TO_RESPONSE = {
  VIDEOS: 'videos',
  CREDITS: 'credits',
  RECOMMENDATIONS: 'recommendations',
  SIMILAR: 'similar',
};
