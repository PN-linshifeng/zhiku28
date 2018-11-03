import React from 'react';
import { Link } from 'react-router-dom';

import './style.scss';
import Logo from '../../static/images/logo.png';

export default () => {
  return (
    <div className="container-full header">
      <div className="container">
        <div className="logo">
          <Link to="">
            <img src={Logo} alt="智库28Logo" />
          </Link>
        </div>
        <div className="nav">
          <ul>
            <li>
              <Link title="首页" to="/">
                首页
              </Link>
            </li>
            <li>
              <Link to="/market-commentary.html" title="AETOS汇评">
                AETOS汇评
              </Link>
            </li>
            <li>
              <Link to="/daily-express.html" title="策略微观">
                策略微观
              </Link>
            </li>
            <li>
              <Link to="/forex-trading-micro-courses.html" title="外汇交易微课堂">
                外汇交易微课堂
              </Link>
            </li>
            <li>
              <Link to="/news.html" title="市场要闻">
                市场要闻
              </Link>
            </li>
            <li>
              <Link to="/news-list.html" title="新闻资讯">
                新闻资讯
              </Link>
            </li>
            <li>
              <Link to="/trading-tools.html" title="交易工具">
                交易工具
              </Link>
              <div className="child-nav">
                <Link to="/charts.html" title="外汇行情">
                  外汇行情
                </Link>
                <Link to="/economic-calendar.html" title="财经日历">
                  财经日历
                </Link>
              </div>
            </li>
            <li>
              <Link to="/about.html" title="关于我们">
                关于我们
              </Link>
              <div className="child-nav">
                <Link to="/risk-warning.html" title="风险提示">
                  风险提示
                </Link>
                <Link to="/disclaimer.html" title="免责声明">
                  免责声明
                </Link>
                <Link to="/privacy-policy.html" title="隐私条款">
                  隐私条款
                </Link>
                {/* <Link to="about-tradingcentral.html" title="关于Trading Central">关于TC</Link>*/}
              </div>
            </li>
            <li>
              <Link to="https://www.aetoscg-asia.com/intl/cn/" title="外汇经纪商" target="_blank">
                外汇经纪商
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
