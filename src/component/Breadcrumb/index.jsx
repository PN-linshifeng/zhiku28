import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss'
export default props => {
  const { data } = props;
  const list = data.map(item => {
    return (
      <span key={item.txt}>
        {
          item.link?<Link to={item.link} title={item.txt}>{item.txt}</Link>:item.txt
        }
      </span>
    );
  });
  return <div className="container breadcrumb">{list}</div>;
};
