import React from 'react';
import PropTypes from 'prop-types';

import Item from '../Item/index';
import './Tab.css';

const Tab = (props) => {
  return (
    <div className="item-container">
      {
        props.items.length ?
          props.items.map(item => {
            const category = props.isTransaction ?
              props.categoryMap[item.attributes.categoryId] :
              { name: 'generic', display: { icon: 'dollar' }};
            return (<Item
              isIncome={props.isIncome}
              amount={item.attributes.amount}
              name={item.attributes.name}
              icon={category.display.icon}
              category={category.name.toLowerCase()}
              key={item.id}
              id={item.id}
              type={item.type}
              onMenu={props.onMenu}
            />);
          }) :
          <div className="empty-state">
            <p>
              No items yet. Why don't you add some?
              <span role="img" aria-label="unicorn emoji">&#129412;</span>
            </p>
          </div>
      }
    </div>
  );
};

Tab.propTypes = {
  categoryMap: PropTypes.object,
  isIncome: PropTypes.bool,
  isTransaction: PropTypes.bool,
  items: PropTypes.array,
  onMenu: PropTypes.func.isRequired,
};

Tab.defaultProps = {
  categoryMap: {},
  isIncome: false,
  isTransaction: false,
  items: [],
};

export default Tab;