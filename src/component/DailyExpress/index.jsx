import React, { Fragment } from 'react';
import Loading from '@component/Loading';
import Music from '@component/Music';

class DailyExpress extends React.PureComponent {
  state = {
    current: null,
    btnPlay: 'btn-play',
    pageSize: 9,
    visible: false,
  };
  setBtnPlay = str => {
    this.setState({
      btnPlay: str,
    });
  };
  handleOnChange = index => {
    const { current } = this.state;
    if (current === index) {
      this.music.switch();
      return;
    }
    this.setState({
      current: index,
      visible: true,
    });
  };

  prevNext = num => {
    const { dataList = [] } = this.props;
    const { current, pageSize } = this.state;
    const len = pageSize < dataList.length ? pageSize : dataList.length;
    let index = current + num;
    if (index < 0) {
      index = 0;
    }
    if (index > len - 1) {
      index = len - 1;
    }
    this.setState({
      current: index,
    });
  };

  setPageSize = () => {
    const { pageSize } = this.state;
    this.setState({
      pageSize: pageSize + 3,
    });
  };

  render() {
    const { current, btnPlay, pageSize, visible } = this.state;
    const { dataList = [], loading, children } = this.props;
    const len = pageSize < dataList.length ? pageSize : dataList.length;
    const ItemMap = [];

    if (!loading) {
      for (let i = 0; i < pageSize && i < dataList.length; i += 1) {
        ItemMap.push(
          <li key={dataList[i].key}>
            <div className="box">
              <div className="hd">
                <h3>
                  <p className="big">{dataList[i].title}</p>
                  <p className="min">{dataList[i].subTitle}</p>
                </h3>
                <div className="icon daily-iocn-01" />
              </div>
              <div className="bd">
                <div>
                  <span className="theme">策略微观</span>
                  <span className="time">{dataList[i].time}</span>
                </div>
                <div className="info">{dataList[i].content}</div>
              </div>
              <div
                className={`btn-control ${current === i ? btnPlay : 'btn-play'}`}
                onClick={() => {
                  this.handleOnChange(i);
                }}
              >
                <div className="icon">
                  <span />
                </div>
              </div>
            </div>
          </li>
        );
      }
    }

    return (
      <Fragment>
        <div className="daily-express-list container">
          {loading ? <Loading /> : <ul>{ItemMap}</ul>}
          {pageSize < dataList.length ? (
            <div className="txt-center">
              <a href="javascript:;" className="btn" onClick={this.setPageSize}>
                加载更多
              </a>
            </div>
          ) : (
            ''
          )}
          {
            children
          }
        </div>
        {!visible ? (
          ''
        ) : (
          <Music
            current={current}
            dataList={dataList}
            onSetBtnPlay={this.setBtnPlay}
            onPrevNext={this.prevNext}
            audioLen={len}
            ref={node => (this.music = node)}
          />
        )}
      </Fragment>
    );
  }
}

export default DailyExpress;
