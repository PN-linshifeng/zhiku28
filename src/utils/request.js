// import { Promise } from 'es6-promise';
import axios from 'axios';
import https from 'https';

const instance = axios.create({
  // node https代理设置
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

// instance.interceptors.request.use(function(config) {
//   // 在发送请求之前做些什么
//   config.headers['token'] = []
//   return config;
// }, function(error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });


const CONTENT = process.env.CONTENT || ''; // eslint-disable-line
const QUOTE = process.env.QUOTE || ''; // eslint-disable-line
const TRUST = process.env.TRUST || ''; // eslint-disable-line
const TARGET = process.env.TARGET || ''; // eslint-disable-line
const BASE = process.env.BASE || ''; // eslint-disable-line
const HOST = { CONTENT, QUOTE, TRUST, BASE }

const parameURL = (url, parame, host) => {
  const str = parame ? Object.keys(parame).reduce((result, key) => {
    result += `${key}=${encodeURIComponent(parame[key])}&`;
    return result;
  }, '') : '';
  if (!host && TARGET !== 'node') {
    return `${url}?${str.substr(0,str.length-1)}`;
  }
  const webUrl = HOST[host]
  return `${webUrl}${url}?${str.substr(0,str.length-1)}`;
}



export const get = (url, parame, host) => {
  return new Promise((resolve, reject) => {

    instance.get(parameURL(url, parame, host)).then((resp) => {
      if (typeof resp.data === 'string' && resp.data.indexOf('null(') > -1) {
        const data = JSON.parse(resp.data.substring(resp.data.indexOf("(") + 1, resp.data.lastIndexOf(")")))
        resolve(data)
      } else {
        resolve(resp.data)
      }
    }).catch((error) => {
      reject(error)
    })
  })
}

export default axios;
