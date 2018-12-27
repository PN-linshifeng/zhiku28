import React from 'react';

export default props => {
  const { children, title, content, className } = props;
  return (
    <div className={`container-full about-banner news-banner margin-block ${className}`}>
      <div className="container flex-center-left">
        <div className="txt ">
          <h2>{title}</h2>
          <p>{content}</p>
        </div>
        <div className="img">
          {
            children?children:null
          }
        </div>
      </div>
    </div>
  );
};
