import { ActionTypes } from '../Types';

export interface IUser {
  admin: boolean;
  avatar: string;
  email: string;
  birthDate: Date;
  chats?: Array<IChats>;
  id: string;
  friends?: Array<IFriends>;
  pendingFriends?: Array<IFriends>;
  pendingRequest?: Array<IFriends>;
  from: IFrom;
  header: string;
  langauge: Array<ILanguage>;
  lol?: { main: string; smurfs?: Array<any> };
  username: string;
  posts?: any;
  snowflake: number;
  verified: boolean;
}

interface ILanguage {
  code: string;
  language: string;
  name: string;
}

interface IFrom {
  code: string;
  language: string;
  name: string;
}

interface IChats {
  chatId: string;
  friendId: string;
}

interface IFriends {
  id: string;
}

export interface ISetUser {
  type: ActionTypes.setUser;
  payload: IUser;
}

export interface IClearUser {
  type: ActionTypes.clearUser;
}

export const setUser = (user: IUser): ISetUser => {
  return {
    type: ActionTypes.setUser,
    payload: user,
  };
};

export const clearUser = (): IClearUser => {
  return {
    type: ActionTypes.clearUser,
  };
};
