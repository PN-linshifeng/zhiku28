import React from "react";
import ReactDOM from "react-dom";
// import {
//   BrowserRouter
// } from "react-router-dom";
import {
  AppContainer
} from "react-hot-loader";
// import RouterMap from './router/routerMap.js'
// import './scss/style.scss'
import Home from "@container/404";

// ReactDOM.render(<Home />, document.getElementById("zhiku"));

const render = Component => {
  ReactDOM.hydrate(
    <AppContainer>
			<Component />
		</AppContainer>,
    document.getElementById("zhiku")
  )
};
render(Home)
if (module.hot) {
  module.hot.accept('./container/404/index.jsx', () => {
    const NextApp = require('./container/404/index.jsx').default;
    render(NextApp)
  })
}
