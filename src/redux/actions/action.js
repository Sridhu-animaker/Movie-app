import {ActionTypes} from '../../constants/action-types';

export const setNowPlaying = payload => ({
  type: ActionTypes.SET_NOW_PLAYING,
  payload,
});

export const setUpcoming = payload => ({
  type: ActionTypes.SET_UPCOMING,
  payload,
});

export const setGeners = payload => ({
  type: ActionTypes.SET_GENERS,
  payload,
});

export const setLoading = payload => ({
  type: ActionTypes.SET_LOADING,
  payload,
});
