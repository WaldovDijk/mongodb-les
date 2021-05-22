import { ActionTypes } from '../Types';

export interface ILogin {
  loggedIn: boolean;
}

export interface ISetLogin {
  type: ActionTypes.login;
  payload: boolean;
}

export interface ISetLogout {
  type: ActionTypes.logout;
  payload: boolean;
}

export const setLogin = (): ISetLogin => {
  return {
    type: ActionTypes.login,
    payload: true,
  };
};

export const setLogout = (): ISetLogout => {
  return {
    type: ActionTypes.logout,
    payload: false,
  };
};
