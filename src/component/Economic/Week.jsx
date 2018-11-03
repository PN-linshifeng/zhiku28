import React from 'react';
import moment from 'moment';
export default props => {
  const { eventDate, onHandleQuery } = props;
  const week = [
    { week: '星期日', day: false, date: '', fullDate: '' },

    { week: '星期一', day: false, date: '', fullDate: '' },
    { week: '星期二', day: false, date: '', fullDate: '' },
    { week: '星期三', day: false, date: '', fullDate: '' },
    { week: '星期四', day: false, date: '', fullDate: '' },
    { week: '星期五', day: false, date: '', fullDate: '' },
    { week: '星期六', day: false, date: '', fullDate: '' },
    { week: '星期日', day: false, date: '', fullDate: '' },
  ];
  let Item = null;
  if (eventDate) {
    const day = new Date(eventDate).getDay() == 0 ? 7 : new Date(eventDate).getDay();
    const curDate = new Date(eventDate).getDate();
    for (let i = 0; i < 8; i += 1) {
      let date = new Date(eventDate);
      const _date = new Date(date.setDate(curDate + i - day))
      // if (day !== i) {
      //   week[i].date = _date.getDate();
      // } else {
      //   week[i].date = date.getDate();
      //   week[i].day = true;
      // }
      week[i].fullDate = moment(_date).format('YYYY-MM-DD');
      week[i].date = _date.getDate();
      if (week[i].fullDate === eventDate) {
        week[i].day = true;
      }

    }
    week.shift()
    Item = week.map(item => {
      return (
        <li key={item.date} className={item.day ? 'hover' : ''}>
          <a href="javascript:void(0)" data={item.fullDate} onClick={()=>{onHandleQuery(item.fullDate)}}>
            <span className="week-con">{item.week}</span>
            <b className="date-con">{item.date}</b>
          </a>
        </li>
      );
    });
    // Item.shift();
    // Item.push(shift);

  }
  // const DD = <div>666</div>
  return (
    <div className="week">
      <ul>{Item}</ul>
    </div>
  );
};
