import React from 'react';
import Loading from '@component/Loading';
export default props => {
  const { ex, exLoading, substr } = props;
  const importance = {
    L: '低',
    H: '高',
    M: '中',
  };

  const item =
    ex.length > 0 ? (
      ex.map((item, index) => {
        let str = '';
        if (substr) {
          str = item.cn_event.substr(0, substr) + '...';
        } else {
          str = item.cn_event;
        }
        return (
          <tr key={index}>{/*eslint-disable-line*/}
            <td width="60">{item.pub_time}</td>
            <td width="60">{item.region_code}</td>
            <td>{str}</td>
            <td width="70">
              <span className={item.importance}>{importance[item.importance]}</span>
            </td>
            <td width="70">{item.prior}</td>
            <td width="70">{item.forecast}</td>
            <td width="70">{item.actual}</td>
          </tr>
        );
      })
    ) : (
      <tr>
        <td colSpan="7">暂无数据</td>
      </tr>
    );
  return (
    <tbody className="economic-tbody">
      {exLoading ? (
        <tr>
          <td colSpan="7">
            <Loading />
          </td>
        </tr>
      ) : (
        item
      )}
    </tbody>
  );
};
