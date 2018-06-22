import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import './MonthPicker.css';

const MonthPicker = (props) => {
  const handleBackButton = () => {
    props.onChange(moment(props.date * 1000).subtract(1, 'month'));
  };

  const handleForwardButton = () => {
    props.onChange(moment(props.date * 1000).add(1, 'month'));
  };

  return (
    <div className="month-picker">
      <button onClick={handleBackButton}>
        <i className="material-icons">keyboard_arrow_left</i>
      </button>
      <span>{moment(props.date * 1000).format('MMMM')}</span>
      <button onClick={handleForwardButton}>
        <i className="material-icons">keyboard_arrow_right</i>
      </button>
    </div>
  );
};

MonthPicker.propTypes = {
  date: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MonthPicker;