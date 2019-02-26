import React from 'react';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';
import qs from 'qs'
import Breadcrumb from '@component/Breadcrumb';
import NewsList from '@component/News/list';
import AboutBanner from '@component/AboutBanner';
import bnImg from '@images/news-bn-img.png';
import BaseLayout from '../../layout/BaseLayout';


@inject(stores => {
  return {
    newsStore: stores.newsStore,
  };
})
@observer
class News extends React.Component {
  state = {}
  breadcrumb = [{ txt: '首页', link: '/' }, { txt: '市场要闻' }];

  componentDidMount() {
    const { newsStore, location } = this.props;
    const urlObj = qs.parse(location.search.split('?')[1]);
    const currentPages = urlObj.page ? parseInt(urlObj.page, 10) : 1;
    if (newsStore.loading || currentPages !== newsStore.currentPages || newsStore.news.cat != 33) {
      newsStore.queryNews({ startAt: currentPages });
    }
  }

  componentDidUpdate(prevProps) {
    const { location, newsStore } = this.props;
    const param = qs.parse(location.search.split('?')[1]);
    if (location.search !== prevProps.location.search) {
      newsStore.queryNews({ startAt: parseInt(param.page, 10) });
    }
  }

  handleOnChange = () => {
    // const { newsStore } = this.props;
    // newsStore.queryNews({ startAt: page });
  }
  bootstrap() {
    const { newsStore, location } = this.props;
    const urlObj = qs.parse(location.search.split('?')[1]);
    const currentPages = urlObj.page ? parseInt(urlObj.page, 10) : 1;
    return new Promise((resolve, reject) => {
      newsStore.queryNews({ startAt: currentPages }).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      });
    })
  }

  render() {
    const { newsStore: { news, loading, currentPages }, history } = this.props;

    // const { current } = this.state;
    return (
      <BaseLayout {...this.props}>
        <Helmet>
          <title>市场要闻_艾拓思</title>
          <meta name="keywords" content="艾拓思市场要闻,艾拓思,艾拓思专场" />
          <meta name="description" content="了解市场动态，把握交易机会，每交易日为您前瞻市场机遇" />
        </Helmet>
        <AboutBanner title="了解市场动态，把握交易机会" content="每交易日为您前瞻市场机遇">
          <img src={bnImg} alt="市场要闻" />
        </AboutBanner>
        <Breadcrumb data={this.breadcrumb} />
        <div className="container about-title bfc">
          <h1 className="f-l">市场要闻</h1>
          <div className="f-r" />
        </div>
        <div className="container  margin-block">
          <NewsList pagination {...news} loading={loading} history={history} current={currentPages} onChange={this.handleOnChange} />
        </div>
      </BaseLayout>
    );
  }
}

export default News;
