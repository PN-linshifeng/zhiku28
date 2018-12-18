import { observable, action } from 'mobx';
import { get } from '../utils/request';
const aboutLink = {
  about: '/public/json/about.json',
  riskWarning: '/public/json/riskWarning.json',
  disclaimer: '/public/json/disclaimer.json',
  privacyPolicy: '/public/json/privacyPolicy.json',
}

class AboutStore {
  @observable loading;
  @observable data;

  constructor({ loading = true, data = {} } = {}) {
    this.loading = loading;
    this.data = data;
  }

  @action getAbout = ({ url }) => {
    this.loading = true;
    return new Promise((resolve, reject) => {
      get(aboutLink[url], {}, 'BASE').then(resp => {
        resolve(resp)
        this.loading = false;
        this.data = resp;
      }).catch(err => {
        this.loading = false;
        reject(err);
      })
    })
  }
  toJson() {
    return {
      loading: this.loading,
      data: this.data,
    }
  }
}

export default AboutStore;
