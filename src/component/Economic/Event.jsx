import React from 'react';
import Loading from '@component/Loading';
export default props => {
  const { exDateTime, exDateTimeLoading } = props;
  const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return (
    <div className="time-upcoming ">
      {exDateTimeLoading||!exDateTime.time ? (
        <Loading />
      ) : (
        <div>
          <div>距离下个事件日期</div>
          <div className="time-list">
            <div className="hours1 date date-zero">{exDateTime.time.substr(0, 1)}</div>
            <div className="hours2 date date-zero">{exDateTime.time.substr(1, 1)}</div>
            <div className="dian" />
            <div className="minute1 date date-zero">{exDateTime.time.substr(3, 1)}</div>
            <div className="minute2 date date-zero">{exDateTime.time.substr(4, 1)}</div>
          </div>
          <p className="clear" style={{ paddingTop: 15 }}>
            GMT时间: <span id="GMTTimer">{exDateTime.time}</span>
            <br />
            <span id="GMTDater">{exDateTime.date1}</span>
            &nbsp;&nbsp;
            <span id="GMTWeek">{week[exDateTime.week - 1]}</span>
          </p>
        </div>
      )}
    </div>
  );
};
