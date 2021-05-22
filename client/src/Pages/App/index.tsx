import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Switch,
  Route,
  withRouter,
  useLocation,
  useHistory,
} from 'react-router-dom';
import * as actions from '../../Redux/Actions/Index';

import './app.styles.scss';
import Login from '../Login';
import Register from '../Register';
import { useTransition, animated, config } from 'react-spring';
import useAuth from '../../Hooks/Auth';

const App = (): JSX.Element | null => {
  const dispatch = useDispatch();
  const user = useSelector((store: { user: any }) => store.user);
  const { checkLogin } = useAuth();

  const loading = useSelector(
    (store: { loading: { loading: boolean } }) => store.loading.loading
  );
  const { loggedIn } = useSelector((store: { login: any }) => store.login);
  let history = useHistory();
  let location = useLocation();

  const SignupTransition = useTransition(location, {
    from: { opacity: 0, transform: 'translateX(100%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(-100%)' },
    config: config.molasses,
  });

  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);

  useEffect(() => {
    if (!loggedIn) {
      if (history.location.pathname !== '/login') history.push('/login');
    }
  }, [loggedIn, user]);

  useEffect(() => {
    dispatch(actions.setLoading());
    checkLogin();
  }, []);

  return loading ? (
    <div>loading ...</div>
  ) : (
    <div className='main'>
      {!loggedIn ? (
        <>
          {SignupTransition((style, item) => {
            return (
              <animated.div
                style={{
                  ...style,
                  gridColumn: '1/-1',
                  gridRow: '1/ span 1',
                  display: 'grid',
                }}
              >
                <Switch location={item}>
                  <Route path='/login' component={Login} />
                  <Route path='/register' component={Register} />
                </Switch>
              </animated.div>
            );
          })}
        </>
      ) : (
        loggedIn && (
          <>
            <div className='main__body'>
              <div className='main__user'>
                <div> id: {user.id}</div>
                <div>email: {user.email}</div>
                <div>username: {user?.username}</div>
                <div>admin: {user.admin ? 'true' : 'false'}</div>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default withRouter(App);
