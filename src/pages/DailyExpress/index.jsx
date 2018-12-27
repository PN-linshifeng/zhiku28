import React from 'react';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';
import qs from 'qs';
import Breadcrumb from '@component/Breadcrumb';
import AboutBanner from '@component/AboutBanner';
import DailyExpress from '@component/DailyExpress';

import BaseLayout from '../../layout/BaseLayout';

@inject(stores => {
  return {
    dailyExpressState: stores.dailyExpressState,
  };
})
@observer
class News extends React.Component {

  breadcrumb = [{ txt: '首页', link: '/' }, { txt: '策略微观' }];

  componentDidMount() {
    const { dailyExpressState } = this.props;

    if (dailyExpressState.loading) {
      dailyExpressState.fetch();
    }
  }

  componentDidUpdate(prevProps) {
    const { location, newsStore } = this.props;
    const param = qs.parse(location.search.split('?')[1]);
    if (location.search !== prevProps.location.search) {
      newsStore.queryNews({ startAt: parseInt(param.page, 10) });
    }
  }

  bootstrap() {
    const { dailyExpressState } = this.props;
    return new Promise((resolve, reject) => {
      dailyExpressState.fetch().then(() => {
          resolve();
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  render() {

    const {
      dailyExpressState: { dataList, loading },
    } = this.props;

    return (
      <BaseLayout {...this.props}>
        <Helmet>
          <title>{dataList.title||'加载中...'}</title>
          <meta name="description" content={dataList.description} />
          <meta name="keywords" content={dataList.keywords} />

        </Helmet>
        <AboutBanner title="每天为您纵观市场动向" content="交易策略智珠在握" className="daily-express-bn" />
        <Breadcrumb data={this.breadcrumb} />
        <div className="container about-title bfc">
          <h1 className="f-l">策略微观</h1>
          <div className="f-r" />
        </div>
        <div className="margin-block">
          <DailyExpress dataList={dataList.data} loading={loading} />
        </div>

      </BaseLayout>
    );
  }
}

export default News;
