import React from 'react';
import Helmet from 'react-helmet';
import { inject, observer } from 'mobx-react';
import AboutBanner from '@component/AboutBanner';
import Breadcrumb from '@component/Breadcrumb';
import ChartsComponent from '@component/Charts';
import bnImg from '@images/about-bn-img.png';
import Loading from '@component/Loading';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import BaseLayout from '../../layout/BaseLayout';



@inject(stores => {
  return {
    chartsStore: stores.chartsStore,
  };
})
@observer
class Charts extends React.Component {
  state = {
    src: ''
  }
  breadcrumb = [
    { txt: '首页', link: '/' },
    { txt: '交易工具', link: '/trading-tools.htmll' },
    { txt: '外汇行情' },
  ];
  componentDidMount() {
    const { chartsStore } = this.props;
    chartsStore.queryCharts().then(() => {
      new PerfectScrollbar('.scroll-charts')
    });
  }

  changeImg = (src) => {
    console.log(src)
    this.setState({
      src: src
    })
  }

  bootstrap() {
    const { chartsStore } = this.props;
    return new Promise((resolve, reject) => {
      chartsStore
        .queryCharts()
        .then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  render() {
    const {
      chartsStore: { charts },
    } = this.props;
    const { src } = this.state;
    return (
      <BaseLayout {...this.props}>
        <Helmet>
          <title>外汇行情</title>
        </Helmet>
        <AboutBanner title="了解市场动态，把握交易机会" content="每交易日为您前瞻市场机遇">
          <img src={bnImg} alt="市场要闻" />
        </AboutBanner>
        <Breadcrumb data={this.breadcrumb} />
        <div className="container  margin-block">
          <div className="bord-all-chart">
            <ChartsComponent charts={charts} onChangeImg={this.changeImg} />
            <div className="chart-img-box">
              {src}
              <Loading className="absolute" />
              <img src={src} alt="" width="409" height="286" />
            </div>
          </div>
        </div>
      </BaseLayout>
    );
  }
}
export default Charts;
