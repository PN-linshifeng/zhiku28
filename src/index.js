import 'set-prototype-of'
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter
} from "react-router-dom";

import {
  AppContainer
} from 'react-hot-loader';
import {
  Provider
} from 'mobx-react';
import App from '@pages/App';
//store
import AppStatess from './store/store';

const zhiku = document.getElementById('zhiku');
const initialState = window.__INITIAL__STATE__ || {};
let appInit = AppStatess(initialState)

const render = (Container) => {
  ReactDOM.hydrate(
    <AppContainer>
      <Provider {...appInit}>
        <BrowserRouter>
          <Container />
        </BrowserRouter>
      </Provider>
    </AppContainer>,
    zhiku
  )
};
render(App)
if (module.hot) {
  module.hot.accept('./pages/App', () => {
    const NextApp = require('./pages/App').default;
    render(NextApp)
  })
}


/////////////////////////////////////////////////////
// import 'set-prototype-of';
// import React from 'react';
// import ReactDOM from 'react-dom';
// // import { BrowserRouter } from 'react-router-dom';

// // import {
// //   AppContainer
// // } from 'react-hot-loader';
// // import {
// //   Provider
// // } from 'mobx-react';
// import App from '@pages/404';
// //store
// // import AppStatess from './store/store';

// const zhiku = document.getElementById('zhiku');
// // const initialState = window.__INITIAL__STATE__ || {};
// // let appInit = AppStatess(initialState)

// const render = Container => {
//   ReactDOM.hydrate(

//     <Container />,
//     zhiku
//   );
// };
// render(App);
// if (module.hot) {
//   module.hot.accept('./pages/App', () => {
//     const NextApp = require('./pages/App').default;
//     render(NextApp)
//   })
// }

/////////////////////////////////////////////

// alert(98)

// // const a = new Proxy((resolve) => {
// //   resolve(9)
// // })

// console.log(Reflect)
// console.log(Symbol)
// console.log(Promise)

// console.log(Proxy)
// console.log(Proxy)
// var promise = new Promise((resolve) => {
//   resolve(9)
// })
// var set = new Set([1, 2, 3, 4, 4]);
// require('set-prototype-of')
// console.log(Object.setPrototypeOf)
// const s = () => {
//   alert(9)
// }
// s()
////////////////////////////////////
// import React from 'react';
// import ReactDOM from 'react-dom';
// ReactDOM.render(<div>999999</div>, document.getElementById('zhiku'))
