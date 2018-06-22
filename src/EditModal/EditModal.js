import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { get, isEqual } from 'lodash-es';

import './EditModal.css';
import Input from '../Input';
import Currency from '../Currency';
import Date from '../Date';
import Select from '../Select';

const getTitle = ({ type, id }) => {
  const title = [ id ? 'Edit' : 'Add' ];
  switch(type) {
    case 'expense':
      title.push('Recurring Bill');
      break;
    case 'income':
      title.push('Income');
      break;
    default:
      title.push('Transaction');
  }
  return title.join(' ');
};

export default class EditModal extends React.Component {
  static propTypes = {
    active: PropTypes.bool,
    categories: PropTypes.object,
    data: PropTypes.object.isRequired,
    onExit: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
  };

  static defaultProps = {
    active: false,
    categories: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      attributes: get(props, 'data.attributes', {}),
    };
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.data, this.props.data)) {
      this.setState({
        attributes: get(this.props, 'data.attributes', {}),
      });
    }
  }

  handleChange = (value) => {
    this.setState((prevState) => ({
      attributes: {
        ...prevState.attributes,
        ...value,
      },
    }));
  };

  handleSave = () => {
    if (this.props.data.id) {

    } else {
      const data = {
        type: this.props.data.type,
        attributes: this.state.attributes,
      };
      this.props.onSave(data);
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className={cx('modal-overlay', { 'active': this.props.active })} />
        <div className={cx('modal', { 'active': this.props.active })}>
          <div className="modal-header">
            <h2>{getTitle(this.props.data)}</h2>
            <div className="spacer" />
            <button
              className="close-button"
              onClick={this.props.onExit}
            >
              <i className="material-icons">close</i>
            </button>
          </div>
          <div className="modal-body">
            <Input
              id={`form-${this.props.data.type}-name`}
              label="Name"
              value={this.state.attributes.name}
              name="name"
              onChange={this.handleChange}
            />
            <Currency
              id={`form-${this.props.data.type}-amount`}
              label="Amount"
              value={this.state.attributes.amount}
              name="amount"
              onChange={this.handleChange}
            />
            {
              this.props.data.type && this.props.data.type === 'transaction' &&
                <React.Fragment>
                  <Select
                    id={`form-${this.props.data.type}-categoryId`}
                    label="Category"
                    name="categoryId"
                    onChange={this.handleChange}
                    value={this.state.attributes.categoryId}
                    options={Object.keys(this.props.categories).map(key => ({
                      value: key,
                      name: this.props.categories[key].name,
                    }))}
                  />
                  {
                    this.state.attributes.date &&
                      <Date
                        id={`form-${this.props.data.type}-date`}
                        value={this.state.attributes.date}
                        onChange={this.handleChange}
                        label="Date"
                        name="date"
                      />
                  }
                </React.Fragment>
            }
            {
              this.props.data.type && this.props.data.type === 'expense' &&
                <React.Fragment>
                  <Input
                    id={`form-${this.props.data.type}-recurrenceDays`}
                    label="Recurring Days (comma delimitted days of the month)"
                    value={this.state.attributes.recurrenceDays.join(',')}
                    name="recurrenceDays"
                    onChange={(e) => this.handleChange({
                      recurrenceDays: e.recurrenceDays
                        .split(',')
                        .filter(d => d)
                        .map(d => parseInt(d, 10)),
                    })}
                  />
                </React.Fragment>
            }
          </div>
          <div className="modal-footer">
            <button onClick={this.handleSave}>Save</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}