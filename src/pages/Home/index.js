import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';
import PerfectScrollbar from 'perfect-scrollbar';
import Swiper from '@component/Swiper';
import Loading from '@component/Loading';
import Economic from '@component/Economic/EcData';
import ChartsComponent from '@component/Charts/table';
import NewsList from '@component/News/list';
import DailyExpress from '@component/DailyExpress';
import 'perfect-scrollbar/css/perfect-scrollbar.css';
import BaseLayout from '../../layout/BaseLayout';

import './style.scss';

@inject(stores => {
  return {
    appState: stores.appState,
    promoAdStore: stores.promoAdStore,
    newsStore: stores.newsStore,
    eXStore: stores.eXStore,
    chartsStore: stores.chartsStore,
    dailyExpressState: stores.dailyExpressState,
  };
})
@observer
class Home extends React.Component {
  componentDidMount() {
    console.log('abc');
    const { eXStore, chartsStore, newsStore, promoAdStore, dailyExpressState } = this.props;

    const { exLoading, exDateTimeLoading } = eXStore;
    chartsStore.queryCharts().then(() => {
      new PerfectScrollbar('.scroll-charts');
    });
    if (exLoading && exDateTimeLoading) {
      eXStore.fetchEx().then(() => {
        new PerfectScrollbar('.scroll-economic');
      });
      eXStore.fetchEvent();
    } else {
      new PerfectScrollbar('.scroll-economic');
    }

    if (newsStore.loading || 1 !== newsStore.currentPages || newsStore.newsContent.cat != 38) {
      newsStore.queryNews({ startAt: 1, num: 10, aside: 1 });
    }
    if (promoAdStore.loading) {
      promoAdStore.fetch();
    }
    if (dailyExpressState.loading) {
      dailyExpressState.fetch();
    }

    this.interval = setInterval(() => {
      chartsStore.queryCharts();
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  bootstrap() {
    var { newsStore, eXStore, dailyExpressState, promoAdStore, chartsStore } = this.props;
    // 新闻
    var a1 = new Promise((resolve, reject) => {
      newsStore
        .queryNews({ startAt: 1, num: 10, aside: 1 })
        .then(data => {
          // newsStore.news = "abc"
          resolve(data);
        })
        .catch(err => {
          reject(err); // eslint-disable-line
        });
    });

    // 财经日历
    var a2 = new Promise((resolve, reject) => {
      eXStore
        .fetchEx()
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err); // eslint-disable-line
        });
    });
    var a3 = new Promise((resolve, reject) => {
      eXStore
        .fetchEvent()
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err); // eslint-disable-line
        });
    });

    // 策略微观
    var a4 = new Promise((resolve, reject) => {
      dailyExpressState
        .fetch()
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err); // eslint-disable-line
        });
    });

    // promo广告
    var a5 = new Promise((resolve, reject) => {
      promoAdStore
        .fetch()
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err); // eslint-disable-line
        });
    });

    // 报价
    var a6 = new Promise((resolve, reject) => {
      chartsStore.queryCharts()
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err); // eslint-disable-line
        });
    });
    return Promise.all([a1, a2, a3, a4, a5, a6])
      .then(() => {})
      .catch(e => console.log(e));
  }

  render() {
    const {
      eXStore: { ex, exLoading, exDateTime },
      chartsStore: { charts },
      newsStore: { newsAside, newsAsideLoading },
      promoAdStore: { loading, dataList },
      dailyExpressState,
      dailyExpressState: { dataList: { data = [] } }
    } = this.props;
    return (
      <BaseLayout {...this.props}>
        <Helmet>
          <title>智库28 - AETOS艾拓思专场</title>
          <meta name="description" content="AETOS艾拓思提供专业的外汇谘询服务、汇评、在线讲座及分析,让访问者更轻松掌握外汇交易技巧" />
          <meta name="keywords" content="艾拓思,AETOS,艾拓思官网,AETOS官网,艾拓思外汇,AETOS外汇" />
        </Helmet>
        <div className="container-full home-banner margin-block">
          <div className="container">
            <div className="txt">
              <img src="/public/images/home-banner-txt.png" alt="AETOS艾拓思新闻早班车在线讲座" />
            </div>
            <div className="img">
              <img src="/public/images/home-banner-img.png" alt="AETOS艾拓思新闻早班车介绍" />
            </div>
          </div>
        </div>
        <div className="container-full home-news-block margin-block clearfix">
          <div className="container">
            <div className="txt">
              <h2>
                “新闻早班车”
                <br />
                AETOS艾拓思专场
              </h2>
              <p>时间：每交易日上午09:10 （北京时间）</p>
              <p>
                <span className="btn-gridient" href="javascirpt:void(0)">
                  请联系您的AETOS艾拓思IB报名参加
                </span>
              </p>
            </div>
            <div className="img">
              <img src="/public/images/home-news-img.png" alt="AETOS艾拓思新闻早班车" />
            </div>
          </div>
        </div>
        <div className="container-full home-item-block">
          <div className="container">
            <div className="item left">
              <h3>策略微观</h3>
              <div className="img">
                <img src="/public/images/home-item-img01.png" alt="AETOS艾拓思策略微观" />
              </div>
              <div className="info">
                每天为您纵观市场动向 <br />
                交易策略智珠在握
              </div>
              <div className="ft">
                <Link className="btn-gridient" to="/daily-express.html">
                  查看详情
                </Link>
              </div>
            </div>
            <div className="item middle">
              <h3>外汇交易微课堂</h3>
              <div className="img">
                <img src="/public/images/home-item-img02.png" alt="AETOS艾拓思外汇交易微课堂" />
              </div>
              <div className="info">
                深入浅出 <br />
                助你轻松掌握外汇交易技巧
              </div>
              <div className="ft">
                <Link className="btn-gridient" to="/forex-trading-micro-courses.html">
                  查看详情
                </Link>
              </div>
            </div>
            <div className="item right">
              <h3>开立模拟账户</h3>
              <div className="img">
                <img src="/public/images/home-item-img03.png" alt="AETOS艾拓思开立模拟账户" />
              </div>
              <div className="info">费在真实的市场报价环境中，学习交易技巧，实践交易策略</div>
              <div className="ft">
                <a
                  className="btn-gridient"
                  href="http://r.theaetos.com/trust/cn/register-demo.htm"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  查看详情
                </a>
              </div>
            </div>
          </div>
        </div>
        {/*财经日历*/}
        <div className="container-full home-economic-calendar-forex">
          <div className="container clearfix">
            <div className="box">
              <div className="item  economic-calendar">
                <div className="">
                  <h3 className="page-title">
                    <span>
                      财经日历
                      <em />
                      <em />
                    </span>
                  </h3>
                  <div className="content">
                    <div className="economic-component table-box">
                      <table className="table-thead">
                        <thead>
                          <tr>
                            <th width="60" valign="middle">
                              GMT
                            </th>
                            <th width="60" valign="middle">
                              国家
                            </th>
                            <th valign="middle">事件</th>
                            <th width="70" valign="middle">
                              重要性{' '}
                            </th>
                            <th width="70" valign="middle">
                              前值
                            </th>
                            <th width="70" valign="middle">
                              预计值{' '}
                            </th>
                            <th width="70" valign="middle">
                              实际值
                            </th>
                          </tr>
                        </thead>
                      </table>
                      <div className="border">
                        <div className="scroll scroll-economic ">
                          <table className="table-body">
                            <Economic ex={ex} exLoading={exLoading} />
                          </table>
                        </div>
                        <div className="ft">
                          距离下个事件日期： <span className="event-time">{exDateTime.time}</span>
                          <a
                            className="btn-gridient"
                            href="economic-calendar.html"
                            title="了解更多财经日历"
                          >
                            了解更多
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item  charts">
                <div className="">
                  <h3 className="page-title">
                    <span>
                      外汇行情
                      <em />
                      <em />
                    </span>
                  </h3>
                  <div className="content">
                    <div className="charts-component table-box">
                      <table className="table-thead">
                        <thead>
                          <tr>
                            <th valign="middle" width="20%">
                              产品
                            </th>
                            <th valign="middle" width="20%">
                              买价
                            </th>
                            <th valign="middle" width="20%">
                              卖价
                            </th>
                            <th valign="middle" width="20%">
                              最高{' '}
                            </th>
                            <th valign="middle" width="20%">
                              最低
                            </th>
                          </tr>
                        </thead>
                      </table>
                      <div className="border">
                        <div className="scroll scroll-charts ">
                          <div className="market-trend-box" id="fxBox">
                            <ChartsComponent charts={charts} />
                          </div>
                        </div>
                        <div className="ft">
                          <a className="btn-gridient" href="charts.html" title="了解更多外汇行情">
                            了解更多
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*策略微观*/}
        <div className="container-full home-daily">
          <div className="container">
            <h3 className="page-title">
              <span>
                策略微观
                <em />
                <em />
              </span>
            </h3>
            <DailyExpress
              dataList={data.slice(0, 3)}
              loading={dailyExpressState.loading}
            >
              <div className="ft">
                <a
                  className="btn-gridient"
                  href="daily-express.html"
                  target="_blank"
                  title="了解更多策略微观"
                >
                  了解更多
                </a>
              </div>
            </DailyExpress>
          </div>
        </div>
        {/*新闻*/}
        <div className="container-full home-news">
          <div className="container ">
            <div className="box">
              <div className="news-box" style={{ width: '100%' }}>
                <h3 className="page-title">
                  <span>
                    市场要闻
                    <em />
                    <em />
                  </span>
                </h3>
                <NewsList {...newsAside} loading={newsAsideLoading} />
                <div className="ft txt-center">
                  <Link className="btn-gridient" to="/news.html" title="了解更多市场要闻">
                    了解更多
                  </Link>
                </div>
              </div>
              {/*
              <div className="news-box">
                <h3 className="page-title"><span>新闻资讯<em></em><em></em></span></h3>
                <div className=" news-all-list">
                  <ul>
                    #include file="subpage/news-list-part.html"
                  </ul>
                </div>
                <div className="ft txt-center"><a className="btn-gridient" href="news-list.html" target="_blank" title="了解更多新闻资讯">了解更多</a></div>
              </div>
              */}
            </div>
          </div>
        </div>
        {/*SwipeableViews*/}
        <div className="container-full home-ad ">
          <div className="container">{loading ? <Loading /> : <Swiper data={dataList} />}</div>
        </div>
      </BaseLayout>
    );
  }
}
export default Home;
