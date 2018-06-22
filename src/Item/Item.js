import React from 'react';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';
import emoji from 'node-emoji';

import './Item.css';

const Item = (props) => (
  <div className="item">
    <span className="emoji" role="img" aria-label={`${props.icon} emoji indicating ${props.category} category`}>
      {emoji.get(props.icon)}
    </span>
    <div className="details">
      <h3 className={props.isIncome ? 'item-amount' : 'item-expense-amount'}>
        {currencyFormatter.format(props.amount / 100, { code: 'USD' })}
      </h3>
      <span>{props.name}</span>
    </div>
    <div className="spacer" />
    <button className="more" aria-label="Open menu for budget item">
      <i className="material-icons">more_horiz</i>
    </button>
  </div>
);

Item.propTypes = {
  amount: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isIncome: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

Item.defaultProps = {
  isIncome: false,
};

export default Item;