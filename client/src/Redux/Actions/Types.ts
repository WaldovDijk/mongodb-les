import {
  ISetUser,
  IClearUser,
  ISetLogin,
  ISetLogout,
  ISetLoaded,
  ISetLoading,
} from './Index';

export enum ActionTypes {
  setUser,
  clearUser,
  setSnapshot,
  clearSnapshot,
  login,
  logout,
  setLoad,
  setLoaded,
}

export type UserAction = ISetUser | IClearUser;
export type LoginAction = ISetLogin | ISetLogout;
export type LoadingAction = ISetLoaded | ISetLoading;
