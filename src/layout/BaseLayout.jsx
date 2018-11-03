import React from 'react';
import Header from '@component/Header';
import Footer from '@component/Footer';
import '../static/scss/style.scss';
class BaseLayout extends React.Component {
  componentDidMount() {
    this.node.scrollIntoView();
  }
  render() {
    const { children } = this.props;
    return (
      <div ref={node => (this.node = node)}>
        <Header />
        {children ? children : ''}
        <Footer />
      </div>
    );
  }
}
export default BaseLayout;
