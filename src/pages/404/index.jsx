import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import Breadcrumb from '@component/Breadcrumb';
import AboutBanner from '@component/AboutBanner';
import BaseLayout from '../../layout/BaseLayout';

// import Footers from "@component/footer/index.jsx";

class NoPage extends React.Component {
  breadcrumb = [{ txt: '首页', link: '/' }, { txt: '404' }];
  componentDidMount() {}

  render() {
    return (
      <BaseLayout {...this.props}>
        <Helmet>
          <title>找不到页面</title>
        </Helmet>
        <AboutBanner title="领先技术、专业分析、优质服务" content="一站式的金融投资咨询服务平台">
          <img src="/public/images/about-bn-img.png" alt="关于我们" />
        </AboutBanner>
        <Breadcrumb data={this.breadcrumb} />
        <div className="container  margin-block">
          <div className="no-find">
            <h1 className="max">
              404
              <span>找不到页面</span>
            </h1>
            <p />
            <Link to="/index.html" className="btn-gridient">
              返回首页
            </Link>
          </div>
        </div>
      </BaseLayout>
    );
  }
}
export default NoPage;
