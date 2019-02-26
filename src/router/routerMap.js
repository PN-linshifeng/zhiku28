import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import routes from './routes.js';

export default () => {
  return (
    <Switch>
      {routes.map((route) => (
        <Route {...route} key={route.path} />
      ))}
      <Redirect from="/index.html" to="/" />
    </Switch>
  );
};
// {routes.map((route,index) => (
//              <Route {...route} key={index}/>
//            ))}
// <Redirect from='/news' to="/reg"/>
