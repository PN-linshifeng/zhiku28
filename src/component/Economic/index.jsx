import React from "react";
import Event from './Event'
import Calendar from './Calendar'
import Week from './Week';
import Ec from './Ec'
// import PerfectScrollbar from '../../static/js/perfect-scrollbar.min.js';
import './style.scss';

// require('jquery');

class Economic extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(function() {
      // new PerfectScrollbar('.scroll-economic');
    }, 0)
  }
  render() {
    const { exDateTime, exDateTimeLoading, eventDate, onHandleQuery } = this.props;

    return (
      <div className="container clearfix">
        <div className="res-time margin-block">
          <Event exDateTime={exDateTime} exDateTimeLoading={exDateTimeLoading} />
          <Week eventDate={eventDate} onHandleQuery={onHandleQuery} />
          <div className="res-time-month"><Calendar eventDate={eventDate} onHandleQuery={onHandleQuery} /></div>
        </div>
        <div className="economic margin-block">
          <Ec {...this.props} />
        </div>
      </div>
    )
  }
}

export default Economic;
