import React from 'react';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';
import $ from 'jquery';
import Breadcrumb from '@component/Breadcrumb';
import AboutBanner from '@component/AboutBanner';
import Book from '@component/Book';
import BaseLayout from '../../layout/BaseLayout';
import '../../static/jqbook/jqbook.js';
import '../../static/jqbook/style.css';

@inject(stores => {
  return {
    forexTradingMicroCoursesState: stores.forexTradingMicroCoursesState,
  };
})
@observer
class FTMC extends React.Component {
  breadcrumb = [{ txt: '首页', link: '/' }, { txt: '外汇交易微课堂' }];

  componentDidMount() {
    const { forexTradingMicroCoursesState } = this.props;

    if (forexTradingMicroCoursesState.loading) {
      forexTradingMicroCoursesState.fetch().then(() => {
        $(".wowbook").on("click", 'li div', function() {
          var $parent = $(this).parent("li")
          var options = {
            images: $parent.attr("data-src") + "/image_{{xxx}}.jpg?20180703",
            id: $parent.attr("data-id"),
            sprite: $parent.attr("data-src") + "/sprite.jpg?20180703",
            width: 1280,
            height: 720,
            pageNum: $parent.attr("data-num"),
            audio: '/public/images/page-flip.mp3'
          }
          if ($('#' + options.id).attr("show")) {
            $('#' + options.id).fadeIn(500)
            return
          }
          $('#' + options.id).jsbook(options);
        });
      });
    } else {
      $(".wowbook").on("click", 'li div', function() {
        var $parent = $(this).parent("li")
        var options = {
          images: $parent.attr("data-src") + "/image_{{xxx}}.jpg?20180703",
          id: $parent.attr("data-id"),
          sprite: $parent.attr("data-src") + "/sprite.jpg?20180703",
          width: 1280,
          height: 720,
          pageNum: $parent.attr("data-num"),
          audio: '/public/images/page-flip.mp3'
        }
        if ($('#' + options.id).attr("show")) {
          $('#' + options.id).fadeIn(500)
          return
        }
        $('#' + options.id).jsbook(options);
      });
    }
  }


  bootstrap() {
    const { forexTradingMicroCoursesState } = this.props;
    return new Promise((resolve, reject) => {
      forexTradingMicroCoursesState
        .fetch()
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
      forexTradingMicroCoursesState: { dataList, loading },
    } = this.props;
    return (
      <BaseLayout {...this.props}>
        <Helmet>
          <title>{dataList.title||'加载中...'}</title>
          <meta name="description" content={dataList.description} />
          <meta name="keywords" content={dataList.keywords} />
        </Helmet>
        <AboutBanner title="外汇交易微课堂" content="深入浅出，助你轻松掌握外汇交易技巧">
          <img src="/public/images/forex-trading-micro-courses-bn-img.png" alt="市场要闻" />
        </AboutBanner>
        <Breadcrumb data={this.breadcrumb} />
        <div className="container about-title bfc">
          <h1 className="f-l">外汇交易微课堂</h1>
          <div className="f-r" />
        </div>
        <div className="container forex-trading-micro-courses-box margin-block">
          <div className="content-box">
            <div dangerouslySetInnerHTML={{__html: dataList.content}}></div> {/*eslint-disable-line*/}
          </div>
          <div className="list wowbook">
            <Book dataList={dataList.data} loading={loading} />
          </div>
        </div>
      </BaseLayout>
    );
  }
}

export default FTMC;
