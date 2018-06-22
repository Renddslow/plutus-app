import React from 'react';
import PropTypes from 'prop-types';

import './Sheet.css';

const Sheet = (props) => {
  const takeAction = (action) => () => {
    props.onAction({
      id: props.id,
      type: props.type,
      action,
    });
  };

  return (
    <div className="sheet">
      <div className="sheet-header">
        <button onClick={props.onClose}>
          <i className="material-icons">keyboard_arrow_down</i>
        </button>
      </div>
      <div className="sheet-body">
        <button onClick={takeAction('edit')}>
          <i className="material-icons">edit</i>
          <span>Edit</span>
        </button>
        <button onClick={takeAction('delete')}>
          <i className="material-icons">delete</i>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

Sheet.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sheet;