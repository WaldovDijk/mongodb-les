import { combineReducers } from 'redux';

//reducers
import userReducer from './User/User';
import loadingReducer from './Loading/Loading';
import loginReducer from './Login/Login';

const rootReducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  loading: loadingReducer,
});

export default rootReducer;
