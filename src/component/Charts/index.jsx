import React from 'react';
import Table from './table.jsx';
// import PerfectScrollbar from '../../static/js/perfect-scrollbar.min.js';
import './style.scss';

class Charts extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   src: ''
    // }
  }
  componentDidMount() {}

  render() {
    return (
      <div className="charts-component table-box">
        <table className="table-thead">
          <thead>
            <tr>
              <th valign="middle" width="20%">
                产品
              </th>
              <th valign="middle" width="20%">
                买价
              </th>
              <th valign="middle" width="20%">
                卖价
              </th>
              <th valign="middle" width="20%">
                最高{' '}
              </th>
              <th valign="middle" width="20%">
                最低
              </th>
            </tr>
          </thead>
        </table>
        <div className="border">
          <div className="scroll scroll-charts ">
            <Table {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default Charts;
