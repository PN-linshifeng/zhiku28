import { observable, action } from 'mobx';
import { get } from '../utils/request';

class PromoAdStore {
  @observable loading;
  @observable dataList;

  constructor({ loading = true, dataList = [] } = {}) {
    this.loading = loading;
    this.dataList = dataList;
  }

  @action fetch = () => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      get('/public/json/promo.json', {}, 'BASE').then(resp => {
        resolve(resp.data)
        this.loading = false;
        this.dataList = resp.data;
      }).catch(err => {
        this.exDateTimeLoading = false;
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

export default PromoAdStore;
