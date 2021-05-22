import { ActionTypes, IUser, UserAction } from '../../Actions/Index';

const initialState: IUser | null = null;

const userReducer = (
  state = initialState,
  action: UserAction
): IUser | null => {
  switch (action.type) {
    case ActionTypes.setUser:
      return action.payload;
    case ActionTypes.clearUser:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;
