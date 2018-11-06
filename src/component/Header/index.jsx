import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './style.scss';
import Logo from '../../static/images/logo.png';

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    const { location } = this.props;
    switch (location.pathname) {
      case '/economic-calendar.html':
      case '/charts.html':
        this.state = {
          tool: 'active',
          about: ''
        }
        break;
      default:
        this.state = {
          tool: '',
          about: ''
        }
        break;
    }
  }

  oddEvent = () => {

    console.log(location.pathname)
    return true
  };

  render() {
    const { tool, about } = this.state;
    // console.log(tool)
    return (
      <div className="container-full header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="AETOS艾拓思智库28Logo" />
            </Link>
          </div>
          <label htmlFor="checkbox-nav" className="checkbox-nav">
            <input type="checkbox" className="disn" id="checkbox-nav" />
          </label>
          <div className="nav">
            <ul>
              <li>
                <NavLink to="/" title="首页" exact>
                  首页
                </NavLink>
              </li>
              <li>
                <NavLink to="/market-commentary.html" title="AETOS汇评">
                  AETOS汇评
                </NavLink>
              </li>
              <li>
                <NavLink to="/daily-express.html" title="策略微观">
                  策略微观
                </NavLink>
              </li>
              <li>
                <NavLink to="/forex-trading-micro-courses.html" title="外汇交易微课堂">
                  外汇交易微课堂
                </NavLink>
              </li>
              <li>
                <NavLink to="/news.html" title="市场要闻">
                  市场要闻
                </NavLink>
              </li>
              {/*<li><Link to="/news-list.html" title="新闻资讯">新闻资讯</Link></li> */}
              <li>
                <NavLink to="/trading-tools.html" title="交易工具" className={tool}>
                  交易工具
                </NavLink>
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
                <NavLink to="/about.html" title="关于我们" className={about}>
                  关于我们
                </NavLink>
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
                <NavLink
                  to="https://www.aetoscg-asia.com/intl/cn/"
                  title="外汇经纪商"
                  target="_blank"
                >
                  外汇经纪商
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
