import {
  observable,
  computed, // eslint-disable-line
  action,
  extendObservable // eslint-disable-line
} from 'mobx';
import { get } from '../utils/request'; // eslint-disable-line
// class News {
//   constructor(data) {
//     extendObservable(this, data); // 使用mobx的特性
//   }
//   @observable loading = false;
// }
class NewsStore {
  @observable news
  @observable newsAside
  @observable loading
  @observable newsContentLoading
  @observable newsContent
  @observable currentPages
  @observable newsAsideLoading

  constructor({ loading = true, news = {}, newsAsideLoading = true, newsAside = {}, currentPages = 1, newsContentLoading = true, newsContent = {} } = {}) {
    this.loading = loading
    this.news = news
    this.currentPages = currentPages
    this.newsContentLoading = newsContentLoading
    this.newsContent = newsContent
    this.newsAside = newsAside
    this.newsAsideLoading = newsAsideLoading
  }

  @action queryNews({
    product = 'forex',
    isTc = false,
    cat = 33,
    ln = 'zh-cn',
    num = 20,
    startAt = 1,
    onDate = '',
    endDate = '',
    keywords = '',
    aside = 0
  } = {}) {
    if (aside) {
      this.newsAsideLoading = true
    } else {
      this.loading = true
    }

    //?product=forex&cat=33&ln=zh-cn&isTc=false&startAt=1&num=20&onDate=&endDate=&keywords=
    return new Promise((resolve, reject) => {
      get('/api/getNewsList.php', {
        product,
        isTc,
        cat,
        ln,
        startAt,
        num,
        onDate,
        endDate,
        keywords
      }, 'CONTENT').then((resp) => {
        this.currentPages = startAt;


        if (aside) {
          this.newsAside = resp
          this.newsAsideLoading = false
        } else {
          this.news = resp;
          this.loading = false;
        }
        resolve(resp)
      }).catch((err) => {
        if (aside) {
          this.newsAsideLoading = false
        } else {
          this.loading = false
        }
        reject(err)
      })
    })
  }
  // product=forex&act=read&id=1261581&ln=zh-cn&isTc=false
  @action getNews = ({
    product = "forex",
    act = "read",
    id = "",
    ln = "zh-cn",
    isTc = false,
  } = {}) => {
    this.newsContentLoading = true;
    return new Promise((resolve, reject) => {
      get('/api/getNewsList.php', {
        product,
        act,
        id,
        ln,
        isTc
      }, 'CONTENT').then((resp) => {
        this.newsContentLoading = false;
        this.newsContent = resp;
        resolve(resp)
      }).catch(err => {
        this.newsContentLoading = false;
        reject(err)
      })
    })

  }

  toJson() {

    return {
      loading: this.loading,
      news: this.news,
      currentPages: this.currentPages,
      newsContentLoading: this.newsContentLoading,
      newsContent: this.newsContent,
      newsAside: this.newsAside,
      newsAsideLoading: this.newsAsideLoading
    }
  }
}
export default NewsStore;
