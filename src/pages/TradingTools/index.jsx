import React from 'react';
import { Link } from 'react-router-dom'
import Helmet from 'react-helmet';
import AboutBanner from '@component/AboutBanner';
import Breadcrumb from '@component/Breadcrumb';

import bnImg from '@images/about-bn-img.png';
import eco from '@images/eco-item.png';
import forex from '@images/forex-item-img.png';

import BaseLayout from '../../layout/BaseLayout';

export default props => {
  const breadcrumb = [
    { txt: '首页', link: '/' },
    { txt: '交易工具', link: '/trading-tools.htmll' },
    { txt: '外汇行情' },
  ];
  return (
    <BaseLayout {...props}>
      <Helmet>
        <title>交易工具</title>
      </Helmet>
      <AboutBanner title="了解市场动态，把握交易机会" content="每交易日为您前瞻市场机遇">
        <img src={bnImg} alt="交易工具" />
      </AboutBanner>
      <Breadcrumb data={breadcrumb} />
      <div className="container trading-tools-list margin-block">
        <ul>
          <li>
            <div className="box">
              <h3>外汇行情</h3>
              <div className="img">
                <img src={forex} alt="外汇行情" />
              </div>
              <Link to="/charts.html" className="btn-gridient">
                了解更多
              </Link>
            </div>
          </li>
          <li>
            <div className="box">
              <h3>财经日历</h3>
              <div className="img">
                <img src={eco} alt="财经日历" />
              </div>
              <Link to="/economic-calendar.html" className="btn-gridient">
                了解更多
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </BaseLayout>
  );
};
