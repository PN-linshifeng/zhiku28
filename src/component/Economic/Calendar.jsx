/* eslint react/no-multi-comp:0, no-console:0 */

import 'rc-calendar/assets/index.css';
import React from 'react';
import Calendar from 'rc-calendar';
import DatePicker from 'rc-calendar/lib/Picker'; // eslint-disable-line
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import 'rc-time-picker/assets/index.css';
// import TimePickerPanel from 'rc-time-picker/lib/Panel';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
moment.locale('zh-cn');

const format = 'YYYY-MM-DD HH:mm:ss';
const cn = 1 //location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

function getFormat(time) {
  return time ? format : 'YYYY-MM-DD';
}


const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');


// function onStandaloneSelect(value) {
//   console.log(value);
//   const val = (value && value.format("YYYYMMDD"));
//   const { onHandleQuery } = this.props;
//   onHandleQuery(val)
// }



class Rc extends React.Component {
  state = {

  }
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps)
  //   console.log(prevState)
  //   return null
  // }
  componentDidMount() {

  }
  render() {
    const { eventDate } = this.props;
    return (
      <Calendar
        showWeekNumber={false}
        locale={cn ? zhCN : enUS}
        value={moment(eventDate)}
        defaultValue={moment(eventDate)}
        showDateInput={false}
        showToday={false}
        formatter={getFormat(true)}
        showOk={false}
        onSelect={(value)=>{
          const val = (value && value.format("YYYY-MM-DD"));
          const { onHandleQuery } = this.props;
          onHandleQuery(val)
        }}
      />
    )
  }
}

export default Rc;
