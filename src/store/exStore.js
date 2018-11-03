import { observable, action } from 'mobx';
// import jsonp from 'jsonp'
import getTime from '../utils/getTime';
import { get } from '../utils/request';


const time = getTime();
class EXStore {
  @observable exLoading;
  @observable ex;
  @observable exDateTimeLoading;
  @observable exDateTime;
  constructor({ exLoading = true, ex = [], exDateTime = {}, exDateTimeLoading = true } = {}) {
    this.exLoading = exLoading;
    this.ex = ex;
    this.exDateTimeLoading = exDateTimeLoading;
    this.exDateTime = exDateTime;
  }

  @action fetchEx({ onDate = time } = {}) {
    this.exLoading = true;
    return new Promise((resolve, reject) => {
      get('/api/getEcoDataList.php', { onDate }, 'CONTENT').then((resp) => {
        this.ex = resp.data;
        this.exLoading = false;
        resolve(resp)
      }).catch(err => {
        this.exLoading = false;
        reject(err);
      })
    })
  }
  // https://trust.aetoscg-asia.com/content/get-fx-daily!callbackDateTime.json?callback=exDateTime&ln=0
  @action fetchEvent = ({ ln = 0 } = {}) => {
    this.exDateTimeLoading = true;
    return new Promise((resolve, reject) => {
      get('/content/get-fx-daily!callbackDateTime.json', { ln }, 'TRUST').then((resp) => {

        this.exDateTime = resp.data;
        this.exDateTimeLoading = false;
        resolve(resp.data);
      }).catch(err => {
        this.exDateTimeLoading = false;
        reject(err);
      })
    })
  }

  toJson() {

    return {
      exLoading: this.exLoading,
      ex: this.ex,
      exDateTime: this.exDateTime,
      exDateTimeLoading: this.exDateTimeLoading
    }
  }

}
// jsonp('https://content.aetoscg.asia/api/getEcoDataList.php?onDate=20181030&callback=callbackEcon&jsoncallback=news', null, (err, data) => {
//   if (err) {
//     console.error(err.message);
//   } else {
//     console.log(data);
//   }
// });

export default EXStore;
