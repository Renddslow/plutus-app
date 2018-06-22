import React from 'react';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';

import './BudgetBar.css';

const BudgetBar = (props) => (
  <div className="budget-bar">
    <div style={{ width: '100%' }}>
      <h3>{currencyFormatter.format((props.totalBudget - (props.totalSpent + props.totalExpenses)) / 100, { code: 'USD' })}</h3>
      <span className="budget-bar-description">Remaining this month</span>
    </div>
    <div className="budget-bar-card-container">
      <div className="budget-bar-card">
        <h4>{currencyFormatter.format(props.totalBudget / 100, { code: 'USD' })}</h4>
        <span>Total income</span>
      </div>
      <div className="budget-bar-card">
        <h4>{currencyFormatter.format(props.totalSpent / 100, { code: 'USD' })}</h4>
        <span>Total spent</span>
      </div>
    </div>
  </div>
);

BudgetBar.propTypes = {
  totalBudget: PropTypes.number,
  totalExpenses: PropTypes.number,
  totalSpent: PropTypes.number,
};

BudgetBar.defaultProps = {
  totalBudget: 0,
  totalExpenses: 0,
  totalSpent: 0,
};

export default BudgetBar;

