import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import NotFound from '@pages/404';
import Home from '@pages/Home';
import Ec from '@pages/Ec';
import News from '@pages/News/news';
import NewsContent from '@pages/News/content';
import Charts from '@pages/Charts';
import TradingTools from '@pages/TradingTools';
import MarketCommentary from '@pages/MarketCommentary';
import DailyExpress from '@pages/DailyExpress';
import About from '@pages/About';
import FTMC from '@pages/ForexTradingMicroCourses';

const GetBaidu = props => {
  const TARGET = process.env.TARGET || ''; // eslint-disable-line
  let children = props.children;
  let _hmt = _hmt || [];
  // console.log( )
  if (TARGET!=='node'&&'development'!==process.env.NODE_ENV) {
    (function() {
      var hm = document.createElement('script');
      hm.src = 'https://hm.baidu.com/hm.js?24bde723079c94621f0affa35323aa2a';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }
  return children;
}

export default () => {
  return (
    <GetBaidu>
      <Switch>
        <Route path="/" component={Home} key="home" exact />
        <Route path="/index.html" component={Home} />
        <Route path="/market-commentary.html" component={MarketCommentary} />
        <Route path="/daily-express.html" component={DailyExpress} />
        <Route path="/trading-tools.html" component={TradingTools} />
        <Route path="/economic-calendar.html" component={Ec} key="Ec" />
        <Route path="/news.html" component={News} />
        <Route path="/news-content.html" component={NewsContent} />
        <Route path="/charts.html" component={Charts} />
        <Route path="/about.html" component={About} />
        <Route path="/disclaimer.html" component={About} />
        <Route path="/risk-warning.html" component={About} />
        <Route path="/privacy-policy.html" component={About} />
        <Route path="/forex-trading-micro-courses.html" component={FTMC} />
        <Redirect exact strict from="/dd" to="/404" />
        <Route component={NotFound} key="404" />
      </Switch>
    </GetBaidu>
  );
};
