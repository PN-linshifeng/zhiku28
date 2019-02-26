import React from 'react';
import Loading from '@component/Loading';

class Table extends React.PureComponent {
  state = {
    cur: 0,
    isPhone: false,
  };
  componentDidMount() {
    this.setState({
      isPhone: document.documentElement.clientWidth <= 573 ? true : false,
    })
  }

  componentDidUpdate() {
    const { onChangeImg, charts } = this.props
    const { cur } = this.state;
    if (charts.length <= 0) return;
    if (onChangeImg && Object.prototype.toString.call(onChangeImg) === '[object Function]') {
      onChangeImg(`https://static.aetoscg.info/MT4/${charts[cur].p}1_409x286x2.gif`)
    }
  }

  handleClick = (name, index) => {
    const { cur } = this.state;
    const { onChangeImg } = this.props
    if (cur === index) return;
    if (onChangeImg && Object.prototype.toString.call(onChangeImg) === '[object Function]') {
      onChangeImg(`https://static.aetoscg.info/MT4/${name}1_409x286x2.gif`)
    }
    this.setState({
      cur: index,
    });
  };

  render() {
    const { charts, onChangeImg } = this.props;
    const { cur, isPhone } = this.state;
    console.log(isPhone)
    const Item =
      charts && charts.length > 0 ? (
        charts.map((item, index) => {
          const style =
            index === cur ? {
              background: '#e2e2e2',
            } : {};
          return (
            <tr
              name={item.p}
              key={item.p}
              style={style}
              onClick={this.handleClick.bind(this, item.p, index)}
            >
              <td width="20%">{item.p}</td>
              <td width="20%" className={item.u}>
                {item.b}
              </td>
              <td width="20%" className={item.u}>
                {item.s}
              </td>
              <td width="20%">{item.h}</td>
              <td width="20%" className={item.u}>
                {item.l}
                <span className={item.u} />
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td colSpan="5">
            <Loading />
          </td>
        </tr>
      );

    if (charts && charts.length > 0 && !onChangeImg || isPhone && charts && charts.length > 0) {
      const time = new Date().getTime();
      const Tr = (
        <tr key='tr'>
          <td colSpan="5" style={{ position: 'relative' }}>
            <div className="loading absolute" />
            <img
              src={`https://static.aetoscg.asia/MT4/${charts[cur].p}1_409x286x2.gif?radom=${time}`}
              alt=""
              width="409"
              height="286"
              style={{position:'relative',zIndex:2,margin:'10px 0 0 0'}}
            />
          </td>
        </tr>
      );
      Item.splice(cur + 1, 0, Tr);
    }
    return (
      <table className="market-trend-tbody table-body">
        <tbody>{Item}</tbody>
      </table>
    );
  }
}

export default Table;
