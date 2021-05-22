import { ActionTypes } from '../Types';

export interface ILoading {
  loading: boolean;
}

export interface ISetLoading {
  type: ActionTypes.setLoad;
  payload: boolean;
}

export interface ISetLoaded {
  type: ActionTypes.setLoaded;
  payload: boolean;
}

export const setLoaded = (): ISetLoaded => {
  return {
    type: ActionTypes.setLoaded,
    payload: false,
  };
};

export const setLoading = (): ISetLoading => {
  return {
    type: ActionTypes.setLoad,
    payload: true,
  };
};
