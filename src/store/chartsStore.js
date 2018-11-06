import { observable, action } from 'mobx';
import { get } from '../utils/request';

class ChartsStore {
  @observable loading
  @observable charts
  constructor({ loading = true, charts = [] } = {}) {
    this.loading = loading
    this.charts = charts
  }
  // https://quote.aetoscg.asia/quote?group=FX&callback=fillData&_=1541397348433
  @action queryCharts = ({
    group = 'FX'
  } = {}) => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      get(('/quote'), { group }, 'QUOTE').then((resp) => {
        this.charts = resp
        resolve(resp)
      }).catch(err => {
        reject(err)
      })
    })
  }

  toJson() {
    return {
      loading: this.loading,
      charts: this.charts
    }
  }
}

export default ChartsStore
