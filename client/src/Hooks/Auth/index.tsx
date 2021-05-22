import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as actions from '../../Redux/Actions/Index';
import Axios from 'axios';

const useAuth = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const logout = async () => {
    await Axios({
      method: 'get',
      baseURL: 'http://localhost:8083',
      url: '/auth/logout',
      withCredentials: true,
      validateStatus: null,
    });

    setLogout();
  };

  const login = async (email: string, password: string) => {
    const response = await Axios({
      method: 'put',
      baseURL: 'http://localhost:8083',
      url: '/auth/login',
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
      validateStatus: null,
    });
    if (response.data.isUser) {
      return { error: response.data.error };
    }
    setLogin(response.data);
    history.push('/');
  };

  const checkLogin = async () => {
    const response = await Axios({
      method: 'get',
      baseURL: 'http://localhost:8083',
      url: '/auth/checklogin',
      withCredentials: true,
      validateStatus: null,
    });
    if (response.data.unauthorized || response.status !== 200) {
      setLogout();
      dispatch(actions.setLoaded());
      return;
    } else {
      setLogin(response.data);
      history.push('/');
      dispatch(actions.setLoaded());
      return;
    }
  };

  const checkAuth = async () => {
    const response = await Axios({
      method: 'get',
      baseURL: 'http://localhost:8083',
      url: '/auth/checklogin',
      withCredentials: true,
      validateStatus: null,
    });
    if (response.data.unauthorized || response.status !== 200) {
      setLogout();
      return;
    }
  };

  const setLogout = () => {
    dispatch(actions.setLogout());
    dispatch(actions.clearUser());
    if (
      history.location.pathname !== '/login' &&
      history.location.pathname !== '/register'
    ) {
      console.log(history.location.pathname);
      history.push('/login');
    }
  };

  const setLogin = (user: any) => {
    dispatch(actions.setUser(user));
    dispatch(actions.setLogin());
  };

  return {
    login,
    logout,
    checkLogin,
    checkAuth,
  };
};

export default useAuth;
