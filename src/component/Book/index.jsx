import React from 'react';
import Loading from '../Loading';

export default prop => {
  const { loading, dataList } = prop;
  const items =
    dataList && dataList.length > 0 ?
    dataList.map(item => {
      return (
        <li
          key={item.key}
          data-id={`book${item.key}`}
          data-src={item.image}
          data-num={item.num}
        >
          <div className="box">
            <div className="img">
              <h3>{item.title}</h3>
              <p>{item.type}</p>
            </div>
            <h4>{item.subTitle}</h4>
          </div>
          <div id={`book${item.key}`} />
        </li>
      );
    }) :
    '';
  return loading ? <Loading /> : <ul>{items}</ul>;
};
