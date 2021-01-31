import React from 'react';
import * as ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';

import store, {history} from "./store/configureStore";

import App from './App';

// import 'bootstrap/dist/css/bootstrap.min.css';

const htmlTag = document.querySelector('html');
const DynamicSize = () => {
  const width = document.documentElement.clientWidth;

  if (width <= 1668 && width > 813)
    htmlTag.setAttribute('style',`font-size: ${(width / 1668).toFixed(2)}px`);
  else if (width <= 813 && width > 640)
    htmlTag.setAttribute('style',`font-size: ${(width / 640).toFixed(2)}px`);
  else if (width <= 640 && width > 576)
    htmlTag.setAttribute('style',`font-size: ${(width / 576).toFixed(2)}px`);
  else if (width <= 576 && width > 480)
    htmlTag.setAttribute('style',`font-size: ${(width / 480).toFixed(2)}px`);
  else htmlTag.setAttribute('style', `font-size: 1px`);
};
window.onresize = () => DynamicSize();
DynamicSize();

const app = (
  <Provider store={store}>
    <Router history={history}>
      <App/>
    </Router>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
