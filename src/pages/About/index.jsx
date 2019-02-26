import React from 'react';
import { observer, inject } from 'mobx-react';
import Helmet from 'react-helmet';
import Breadcrumb from '@component/Breadcrumb';
import AboutBanner from '@component/AboutBanner';
import AboutContent from '@component/AboutContent';
import BaseLayout from '../../layout/BaseLayout';


@inject(stores => {
  return {
    aboutStore: stores.aboutStore,
  };
})
@observer
class About extends React.Component {
  state = {}
  breadcrumb = [{ txt: '首页', link: '/' }];

  componentDidMount() {
    const { aboutStore, location: { pathname } } = this.props;

    if (pathname === '/about.html' && aboutStore.loading === true) {
      aboutStore.getAbout({ url: 'about' });
    }

    if (pathname === '/risk-warning.html' && aboutStore.loading === true) {
      aboutStore.getAbout({ url: 'riskWarning' });
    }

    if (pathname === '/disclaimer.html' && aboutStore.loading === true) {
      aboutStore.getAbout({ url: 'disclaimer' });
    }

    if (pathname === '/privacy-policy.html' && aboutStore.loading === true) {
      aboutStore.getAbout({ url: 'privacyPolicy' });
    }

  }

  componentDidUpdate(prevProps) {
    const { aboutStore, location: { pathname } } = this.props;
    if (prevProps.location.pathname !== pathname) {
      if (pathname === '/about.html') {
        aboutStore.getAbout({ url: 'about' });
      }

      if (pathname === '/risk-warning.html') {
        aboutStore.getAbout({ url: 'riskWarning' });
      }

      if (pathname === '/disclaimer.html') {
        aboutStore.getAbout({ url: 'disclaimer' });
      }

      if (pathname === '/privacy-policy.html') {
        aboutStore.getAbout({ url: 'privacyPolicy' });
      }
    }

  }


  bootstrap() {
    const { aboutStore, location: { pathname } } = this.props;
    let url = '';
    if (pathname === '/about.html') {
      url = 'about'
    }

    if (pathname === '/risk-warning.html') {
      url = 'riskWarning'
    }

    if (pathname === '/disclaimer.html') {
      url = 'disclaimer'
    }

    if (pathname === '/privacy-policy.html') {
      url = 'privacyPolicy'
    }
    return new Promise((resolve, reject) => {
      aboutStore.getAbout({ url }).then(() => {
        resolve()
      }).catch(err => {
        reject(err)
      });
    })
  }

  render() {
    const { aboutStore } = this.props;
    // console.log(loading) // eslint-disable-line

    // const { current } = this.state;
    return (
      <BaseLayout {...this.props}>
        <Helmet>
          <title>{aboutStore.data.title?aboutStore.data.title+'_艾拓思' : '正在加载中...'}</title>
          <meta name="description" content={aboutStore.data.title} />
          <meta name="keywords" content={aboutStore.data.title} />
        </Helmet>
        <AboutBanner title="领先技术、专业分析、优质服务" content="一站式的金融投资咨询服务平台">
          <img src="/public/images/about-bn-img.png" alt="关于我们" />
        </AboutBanner>
        <Breadcrumb data={[].concat(this.breadcrumb,[{txt:aboutStore.data.title,key:'loading'}])} />
        <AboutContent {...aboutStore} />
      </BaseLayout>
    );
  }
}

export default About;
