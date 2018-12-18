import React, { PureComponent } from 'react';
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';

class Swipers extends PureComponent {
  componentDidMount() {
    new Swiper(this.swiperID, {
      observer: true,
      pagination: {
        el: this.paginateID,
        clickable: true,
      },
    });
  }
  render() {
    const { data = [] } = this.props;
    const items = data.map(item => (
      <div key={item.link} className='swiper-slide'>
        <a href={item.link} target="_blank" rel="noreferrer noopener">
          <img src={item.image} alt={item.title} />
        </a>
      </div>
    ));

    return (
      <div
        className="new_custom swiper-container index_tab_con"
        ref={self => (this.swiperID = self)}
      >
        <div className="swiper-wrapper">{items}</div>
        <div
          className="swiper-pagination banner-pagination"
          ref={self => (this.paginateID = self)}
        />
      </div>
    );
  }
}
export default Swipers;
