import React from 'react';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';
import qs from 'qs';
import Breadcrumb from '@component/Breadcrumb';
import NewsList from '@component/News/list';
import AboutBanner from '@component/AboutBanner';
import BaseLayout from '../../layout/BaseLayout';

@inject(stores => {
  return {
    newsStore: stores.newsStore,
  };
})
@observer
class News extends React.Component {
  breadcrumb = [{ txt: '首页', link: '/' }, { txt: 'AETOS汇评' }];

  componentDidMount() {
    const { newsStore, location } = this.props;
    const urlObj = qs.parse(location.search.split('?')[1]);
    const currentPages = urlObj.page ? parseInt(urlObj.page, 10) : 1;
    console.log(currentPages, newsStore.news.cat);
    if (
      newsStore.loading ||
      currentPages !== newsStore.currentPages ||
      newsStore.news.cat != 38
    ) {
      newsStore.queryNews({ startAt: currentPages, cat: 38, product: '' });
    }
  }

  componentDidUpdate(prevProps) {
    const { location, newsStore } = this.props;
    const param = qs.parse(location.search.split('?')[1]);
    if (location.search !== prevProps.location.search) {
      newsStore.queryNews({ startAt: parseInt(param.page, 10), cat: 38, product: '' });
    }
  }

  handleOnChange = () => {
    // const { newsStore } = this.props;
    // newsStore.queryNews({ startAt: page });
  };
  bootstrap() {
    const { newsStore, location } = this.props;
    const urlObj = qs.parse(location.search.split('?')[1]);
    const currentPages = urlObj.page ? parseInt(urlObj.page, 10) : 1;
    return new Promise((resolve, reject) => {
      newsStore
        .queryNews({ startAt: currentPages, cat: 38, product: '' })
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
      newsStore: { news, loading, currentPages },
      history,
    } = this.props;

    // const { current } = this.state;
    return (
      <BaseLayout {...this.props}>
        <Helmet>
          <title>AETOS汇评_艾拓思</title>
          <meta name="keywords" content="AETOS汇评,艾拓思,艾拓思专场" />
          <meta name="description" content="了解市场动态，把握交易机会，每交易日为您前瞻市场机遇" />
        </Helmet>
        <AboutBanner title="了解市场动态，把握交易机会" content="每交易日为您前瞻市场机遇" className="market-commentary-banner" />
        <Breadcrumb data={this.breadcrumb} />
        <div className="container about-title bfc">
          <h1 className="f-l">AETOS汇评</h1>
          <div className="f-r" />
        </div>
        <div className="container  margin-block">
          <NewsList
            pagination
            paginationUrl="market-commentary.html"
            {...news}
            loading={loading}
            history={history}
            current={currentPages}
            linkType="pdf"

            onChange={this.handleOnChange}
          />
        </div>
      </BaseLayout>
    );
  }
}

export default News;
