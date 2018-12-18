import { observable, action } from 'mobx';
import { get } from '../utils/request';

class DailyExpressState {
  @observable loading;
  @observable dataList;

  constructor({ loading = true, dataList = {} } = {}) {
    this.loading = loading;
    this.dataList = dataList;
  }

  @action fetch = () => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      get('/public/json/dailyExpress.json', {}, 'BASE').then(resp => {
        resolve(resp)
        this.loading = false;
        this.dataList = resp;
      }).catch(err => {
        this.loading = false;
        reject(err);
      })
    })
  }
  toJson() {
    return {
      loading: this.loading,
      dataList: this.dataList,
    }
  }
}

export default DailyExpressState;
