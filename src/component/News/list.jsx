import React from 'react';
import Pagination from 'rc-pagination';
import { Link } from 'react-router-dom';
import Loading from '@component/Loading';
import 'rc-pagination/assets/index.css';
import './style.scss';
export default props => {
  const { data, loading, totalRow, num, current, pagination = false } = props;
  const itemRender = (current, type, element) => {
    if (type === 'page') {
      return <Link to={`news.html?page=${current}`}>{current}</Link>;
    }
    if (type === 'prev') {
      return <Link to={`news.html?page=${current}`}>上一页</Link>;
    }
    if (type === 'next') {
      return <Link to={`news.html?page=${current}`}>下一页</Link>;
    }
    return element;
  };
  let Element;
  const Item =
    data && data.length ? (
      data.map(item => {
        return (
          <li key={item.article_id}>
            <Link to={`news-content.html?aid=${item.article_id}`} title={item.title}>
              <span className="time">{item.add_time.substr(0, 10)}</span>
              {item.title}
            </Link>
          </li>
        );
      })
    ) : (
      <div>暂无数据</div>
    );

  const ItemList = (
    <ul key="list" className="item-list">
      {Item}
    </ul>
  );
  const Pages = pagination ? (
    <div className="pagination-box" key="page">
      <Pagination
        className="pagination"
        total={Number(totalRow)*num}
        pageSize={num}
        current={current}
        itemRender={itemRender}

      />
    </div>
  ) : null;
  if (loading) {
    if (data && data.length > 0) {
      Element = [<div className="data-load-box" key='list'>{ItemList}<Loading key="loading" className="absolute" /></div>, Pages];
    } else {
      Element = [<Loading key="loading" />];
    }
  } else {
    Element = [<div className="data-load-box" key='list'>{ItemList}</div>, Pages];
  }

  return <div className="news-list news-all-list">{Element}</div>;
};
