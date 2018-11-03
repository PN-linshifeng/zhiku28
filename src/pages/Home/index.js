import React from 'react';
import {
  observer,
  inject, //注入数据
} from 'mobx-react';
import Helmet from 'react-helmet';
import Logo from '../../static/images/logo.png';
import './style.scss'

@inject(stores => {
  return {
    appState: stores.appState,
    newsStore: stores.newsStore,
    eXStore: stores.eXStore
  };
})
@observer
class Home extends React.Component {
  componentDidMount() {
    console.log('abc');
    const { newsStore, eXStore } = this.props;

    newsStore.queryNews().then(() => {}).catch(err => {
      console.log(err); // eslint-disable-line
    });

    eXStore.fetchEx().then(() => {});

  }

  change = event => {
    var { appState } = this.props;
    appState.reName(event.target.value);
  };
  bootstrap() {
    var { newsStore, eXStore } = this.props;

    var a1 = new Promise((resolve, reject) => {
      newsStore
        .queryNews()
        .then((data) => {
          // newsStore.news = "abc"
          resolve(data);
        })
        .catch(err => {
          reject(err); // eslint-disable-line
        });
    });
    var a2 = new Promise((resolve, reject) => {
      eXStore
        .fetchEx()
        .then((data) => {
          resolve(data);
        })
        .catch(err => {
          reject(err); // eslint-disable-line
        });
    });
    return Promise.all([a1, a2]).then(() => {

    }).catch(e => console.log(e))
  }

  render() {
    const { appState, eXStore } = this.props;
    return (
      <div>
        <Helmet>
          <title>title智库28</title>
        </Helmet>

        智库28---
        <img src={Logo} alt="搜索" />
        <input type="text" onChange={this.change} />
        {appState.msg}
        <p>{JSON.stringify(eXStore.ex)}</p>
      </div>
    );
  }
}
export default Home;
