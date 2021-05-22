import { ActionTypes, LoginAction, ILogin } from '../../Actions/Index';

const loginReducer = (
  state: ILogin = { loggedIn: false },
  action: LoginAction
): ILogin => {
  switch (action.type) {
    case ActionTypes.login:
      return { loggedIn: action.payload };
    case ActionTypes.logout:
      return { loggedIn: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
