import {ActionTypes} from '../../constants/action-types';

export const initialState = {
  nowPlayingMovies: {},
  upComingMovies: {},
  genres: [{id: 10110, name: 'All'}],
  isLoading: false,
};

export const appReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case ActionTypes.SET_NOW_PLAYING:
      return {...state, nowPlayingMovies: payload};
    case ActionTypes.SET_UPCOMING:
      return {...state, upComingMovies: payload};
      case ActionTypes.SET_GENERS:
      return {...state, genres: payload};
    case ActionTypes.SET_LOADING:
      return {...state, isLoading: payload};
    default:
      return state;
  }
};
