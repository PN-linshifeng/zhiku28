import serverApp, { createStoreMap } from '../src/server.js';

const express = require('express');
const fs = require("fs");
// const favicon = require('express-favicon');
// const path = require("path")
var proxy = require('http-proxy-middleware');
var https = require('https');
const ReactDomServer = require('react-dom/server');
const Helmet = require('react-helmet').default;
const ejs = require("ejs");
const asyncBootstrapper = require('react-async-bootstrapper');
// const serverRender = require('./util/server-render');
// import serverApp from '../src/server'; // eslint-disable-line

// const isDev = process.env.NODE_ENV === 'development';
const app = express();

console.log(createStoreMap)
// app.use(favicon(path.join(__dirname, './dist/favicon.ico')));
app.use(['/api'], proxy({
  target: 'https://content.aetos-chinese.com',
  changeOrigin: true,
  agent: new https.Agent({
    rejectUnauthorized: false
  })
}));
app.use(['/quote'], proxy({
  target: 'https://quote.aetos-chinese.com',
  changeOrigin: true,
  agent: new https.Agent({
    rejectUnauthorized: false
  })
}));
app.use(['/content'], proxy({
  target: 'https://trust.aetos-chinese.com',
  changeOrigin: true,
  agent: new https.Agent({
    rejectUnauthorized: false
  })
}));

const getStoreState = (stores) => {
  return Object.keys(stores).reduce((result, storeName) => {
    result[storeName] = stores[storeName].toJson();
    return result
  }, {})
}

// const serverApp = require('../dist/server.js');

const template = fs.readFileSync('./dist/server.ejs', 'utf8');
app.use('/public', express.static('./dist'));
app.use('/googleeb45709a26184efb.html', express.static('./dist/googleeb45709a26184efb.html'));
app.use('/3.html', express.static('./dist/3.html'));
app.use('/5.html', express.static('./dist/5.html'));
app.get("*", function(req, res, next) {
  render(serverApp, createStoreMap, template, req, res).catch(next)
});

//render
function render(bundle, storeMap, template, req, res) {
  return new Promise((resolve, reject) => {
    const createStoreMap = storeMap;
    // console.log(createStoreMap)
    const serverBundle = bundle;
    const routerContext = {};
    const store = createStoreMap();
    const app = serverBundle(store, routerContext, req.url);
    asyncBootstrapper(app).then(() => { // 这里可以拿到路由

      //服务端路由跳转
      if (routerContext.url) {
        res.status(302).setHeader("Location", routerContext.url);
        res.end();
        return;
      }
      const initialState = JSON.stringify(getStoreState(store))
      const content = ReactDomServer.renderToString(app); // 这里也可以拿到路由
      const helmet = Helmet.renderStatic();
      // res.send(template.replace(/<!-- app -->/gm, content));

      const html = ejs.render(template, {
        app: content,
        initialState: initialState,
        meta: helmet.meta.toString(),
        title: helmet.title.toString(),
        link: helmet.link.toString(),
        style: helmet.style.toString()
      });
      res.send(html)
      resolve()
    }).catch(reject)
  })
}

//报错中间件next
app.use(function(error, req, res, next) {
  console.log(error)
  res.status(500).send(error)
})




app.listen(3333, function() {
  console.log('host:3333')
})
