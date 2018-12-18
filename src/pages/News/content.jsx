import React from 'react';
import Helmet from 'react-helmet';
import { observer, inject } from 'mobx-react';
import qs from 'qs';
import Breadcrumb from '@component/Breadcrumb';
import AboutBanner from '@component/AboutBanner';
import Content from '@component/News/content';
import NewsList from '@component/News/list';

import bnImg from '@images/news-bn-img.png';
import BaseLayout from '../../layout/BaseLayout';

@inject(stores => {
  return {
    newsStore: stores.newsStore,
  };
})
@observer
class NewsContent extends React.Component {
  breadcrumb = [
    { txt: '首页', link: '/' },
    { txt: '市场要闻', link: '/news.html' },
    { txt: '市场要闻内容' },
  ];
  state = {

  }
  componentDidMount() {
    const { location, newsStore, history } = this.props;
    const param = qs.parse(location.search.split('?')[1]);
    console.log(param.aid, newsStore.newsContent.article_id)
    if (param.aid && param.aid !== newsStore.newsContent.article_id) {
      newsStore.getNews({ id: param.aid })
    }
    console.log(newsStore, newsStore.newsAsideLoading)
    if (newsStore.newsAsideLoading) {
      newsStore.queryNews({ startAt: 1, num: 10, aside: 1 });
    }
    if (!param.aid) {
      history.replace('/news.html');
    }
  }

  componentDidUpdate(prevProps) {
    const { location, newsStore } = this.props;
    const param = qs.parse(location.search.split('?')[1]);

    if (location.search !== prevProps.location.search) {
      newsStore.getNews({ id: param.aid })
      this.node.scrollIntoView();
    }
  }

  bootstrap() {
    const { newsStore, location, history } = this.props;
    const param = qs.parse(location.search.split('?')[1]);
    console.log('param', param.aid)
    if (!param.aid) {
      history.replace('/news.html');
    }
    const newsContent = new Promise((resolve, reject) => {
      if (param.aid) {
        newsStore
          .getNews({ id: param.aid })
          .then(() => {
            resolve()
          })
          .catch(err => {
            reject(err);
          });
      }
    })

    const newsList = new Promise((resolve, reject) => {
      newsStore.queryNews({ startAt: 1, num: 10, aside: 1 }).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      });
    })
    return Promise.all([newsContent, newsList]).then(() => {

    }).catch(err => {
      console.log(err)
    })

  }
  render() {
    const {
      newsStore: { newsContentLoading, newsContent, newsAside, newsAsideLoading }
    } = this.props;
    return (
      <BaseLayout {...this.props}>
        <Helmet>
          <title>{newsContent.title || '正在加载中...'}</title>
          <meta name="description" content={newsContent.title} />
          <meta name="keywords" content={newsContent.title} />
        </Helmet>
        <AboutBanner title="了解市场动态，把握交易机会" content="每交易日为您前瞻市场机遇">
          <img src={bnImg} alt="市场要闻" />
        </AboutBanner>
        <Breadcrumb data={this.breadcrumb} />
        <div className="container about-title bfc" ref={node => (this.node = node)}>
          <h1 className="f-l">市场要闻</h1>
          <div className="f-r" />
        </div>
        <Content newsContentLoading={newsContentLoading} {...newsContent} />
        <div className="container news-list news-all-list margin-block">
          <h2>相关新闻</h2>
          <div className="line" />
          <NewsList {...newsAside} loading={newsAsideLoading} />
        </div>
      </BaseLayout>
    );
  }
}
export default NewsContent;
//
