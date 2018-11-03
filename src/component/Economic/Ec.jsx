import React from 'react';
import EcData from './EcData'
export default (props) => {
  return (
    <table className="economic-thead">
      <thead>
        <tr>
          <th width="60" valign="middle">
            GMT
          </th>
          <th width="86" valign="middle">
            国家
          </th>
          <th valign="middle">事件</th>
          <th width="85" valign="middle">
            重要性
          </th>
          <th width="85" valign="middle">
            前值
          </th>
          <th width="85" valign="middle">
            预计值
          </th>
          <th width="85" valign="middle">
            实际值
          </th>
        </tr>
      </thead>
      <EcData {...props} />
    </table>
  );
};
