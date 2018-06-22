import React from 'react';
import PropTypes from 'prop-types';

const Sheet = (props) => (
  <div className="sheet">
    {
      props.items.map(item => (
        <a
          href={item.link}
          className="sheet-item"
        >
          <i className="material-icons">{item.icon}</i>
          <span>{item.label}</span>
        </a>
      ))
    }
  </div>
);

Sheet.propTypes = {
  items: PropTypes.array,
};

Sheet.defaultProps = {
  items: [],
};

export default Sheet;