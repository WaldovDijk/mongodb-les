import ReactDOM from 'react-dom';
import * as serviceWorker from './Typescript/Service/serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './Redux/Reducers/Index';

import AppWithAuth from './Pages/App';

//Css
import './scss/main.scss';

//Store
const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <AppWithAuth />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
