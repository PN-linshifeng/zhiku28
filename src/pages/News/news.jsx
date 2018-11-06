import React from 'react';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';
import qs from 'qs'
import Breadcrumb from '@component/Breadcrumb';
import NewsList from '@component/News/list';
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
  // static getDerivedStateFromProps(nextProps) {
  //   const { newsStore, location } = nextProps;
  //   const urlObj = qs.parse(location.search.split('?')[1]);
  //   const currentPages = urlObj.page ? parseInt(urlObj.page, 10) : 1;
  //   if (newsStore.loading || currentPages !== newsStore.currentPages) {
  //     newsStore.queryNews({ startAt: currentPages });
  //   }
  //   return null
  // }
  breadcrumb = [{ txt: '首页', link: '/' }, { txt: '市场要闻' }];

  componentDidMount() {
    const { newsStore, location } = this.props;
    const urlObj = qs.parse(location.search.split('?')[1]);
    const currentPages = urlObj.page ? parseInt(urlObj.page, 10) : 1;
    if (newsStore.loading || currentPages !== newsStore.currentPages) {
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
          <title>市场要闻</title>
        </Helmet>
        <div className="container-full about-banner news-banner margin-block">
          <div className="container flex-center-left">
            <div className="txt ">
              <h2>了解市场动态，把握交易机会</h2>
              <p>每交易日为您前瞻市场机遇</p>
            </div>
            <div className="img">
              <img src={bnImg} alt="市场要闻" />
            </div>
          </div>
        </div>
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
