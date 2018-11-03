import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from '@pages/Home';
import NotFound from '@pages/404';
import Ec from '@pages/Ec';
import News from '@pages/News/news';
import NewsContent from '@pages/News/content';

export default () => {
  return (
    <Switch>
      <Route path="/" component={Home} key="home" exact />
      <Route path="/economic-calendar.html" component={Ec} key="Ec" />
      <Route path="/news.html" component={News}></Route>
      <Route path="/news-content.html" component={NewsContent}></Route>
      <Redirect exact strict from="/dd" to="/404" />
      <Route component={NotFound} key="404" />
    </Switch>
  );
};
