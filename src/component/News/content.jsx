import React from 'react';
import Loading from '@component/Loading';
/* eslint-disable */
export default props => {
  const { title, content, add_time, source, author, newsContentLoading } = props;
  const Item = newsContentLoading ? (
    <Loading />
  ) : (
    <div className="container news-box  margin-block">
      <h1 className="news-title">{title}</h1>
      <div className="others">
        作者：
        <span>{author}</span> 时间：
        <span className="news-time">{add_time}</span>
      </div>

      <div className="news-content content-box" dangerouslySetInnerHTML={{ __html: content }} />

      <div>
        来源：
        <span className="source">{source}</span>
      </div>
    </div>
  );
  return Item;
};
/* eslint-enable */
