import React from 'react';
import Helmet from 'react-helmet';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import banner from '@images/trading-tools-bn.png';
import Breadcrumb from '@component/Breadcrumb';
import Economic from '@component/Economic';
import BaseLayout from '../../layout/BaseLayout';

@inject(stores => {
  return {
    eXStore: stores.eXStore,
  };
})
@observer
class Ec extends React.Component {
  breadcrumb = [
    { txt: '首页', link: '/' },
    { txt: '交易工具', link: '/trading-tools.html' },
    { txt: '财经日历' },
  ];
  state = {
    date: moment().format('YYYY-MM-DD'),
  };
  componentDidMount() {
    const { eXStore } = this.props;
    const { exLoading, exDateTimeLoading } = eXStore;
    if (exLoading && exDateTimeLoading) {
      eXStore.fetchEx();
      eXStore.fetchEvent();
    }
  }

  handleQuery = (onDate) => {
    const { eXStore } = this.props;
    console.log("开始请求", new Date().getTime())
    eXStore.fetchEx({ onDate: moment(onDate).format('YYYYMMDD'), }).then(() => {
      console.log("结束请求", new Date().getTime())
    });
    this.setState({
      date: onDate
    })
  }

  bootstrap() {
    const { eXStore } = this.props;
    const promiseEc = new Promise((resolve, reject) => {
      eXStore
        .fetchEx()
        .then((data) => {
          resolve(data);
        })
        .catch(reject);
    });
    const promiseEvent = new Promise((resolve, reject) => {
      eXStore
        .fetchEvent()
        .then((data) => {
          resolve(data);
        })
        .catch(reject);
    });
    return Promise.all([promiseEc, promiseEvent]).then(() => {
      // return resp;
    }).catch(err => {
      console.log("EC报错：", err)
    })
  }
  render() {
    const {
      eXStore: { exDateTime, exDateTimeLoading, ex, exLoading },
    } = this.props;
    const { date } = this.state

    return (
      <BaseLayout {...this.props}>
        <Helmet>
          <title>财经日历_艾拓思</title>
          <meta name="description" content="了解艾拓思财经日历，把握交易机会，每交易日为您前瞻市场机遇" />
          <meta name="keywords" content="艾拓思,艾拓思专场,艾拓思财经日历" />
        </Helmet>
        <div className="container-full about-banner trading-tools-bn margin-block">
          <div className="container flex-center-left">
            <div className="txt ">
              <h2>了解市场动态，把握交易机会</h2>
              <p>每交易日为您前瞻市场机遇</p>
            </div>
            <div className="img">
              <img src={banner} alt="交易工具" />
            </div>
          </div>
        </div>
        <Breadcrumb data={this.breadcrumb} />
        <Economic
          exDateTime={exDateTime}
          exDateTimeLoading={exDateTimeLoading}
          ex={ex}
          exLoading={exLoading}
          eventDate={date}
          onHandleQuery={this.handleQuery}
        />
      </BaseLayout>
    );
  }
}

export default Ec;
