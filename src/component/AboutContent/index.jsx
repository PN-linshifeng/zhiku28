import React, { Fragment } from 'react';
import Loading from '../Loading';

export default (props) => {
  const { data, loading } = props;
  return loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className="container about-title bfc">
        <h1 className="f-l">{data.title}</h1>
        <div className="f-r" />
      </div>
      <div className="container content-box margin-block" dangerouslySetInnerHTML={{ __html: data.content }} />{/*eslint-disable-line*/}
    </Fragment>
  );
};
