import React from 'react';
import './style.scss';
export default props => {
  const { className } = props;
  return <div className={`loading ${className}`} />;
};
