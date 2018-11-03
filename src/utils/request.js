import axios from 'axios';


const CONTENT = process.env.CONTENT || ''; // eslint-disable-line
const QUOTE = process.env.QUOTE || ''; // eslint-disable-line
const TRUST = process.env.TRUST || ''; // eslint-disable-line
const HOST = { CONTENT, QUOTE, TRUST }

const parameURL = (url, parame, host) => {
  const str = Object.keys(parame).reduce((result, key) => {
    result += `${key}=${encodeURIComponent(parame[key])}&`;
    return result;
  }, '');
  const webUrl = HOST[host]
  return `${webUrl}${url}?${str.substr(0,str.length-1)}`;
}


export const get = (url, parame, host) => {
  return new Promise((resolve, reject) => {
    axios.get(parameURL(url, parame, host)).then((resp) => {
      if (typeof resp.data === 'string' && resp.data.indexOf('null(' > -1)) {
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
