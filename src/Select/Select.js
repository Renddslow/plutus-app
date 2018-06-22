import React from 'react';
import PropTypes from 'prop-types';

export default class Select extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    options: PropTypes.array,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    options: [],
    value: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      value: target.value,
    });
    this.props.onChange({ [this.props.name]: this.state.value });
  };

  render() {
    return (
      <div className="form-row">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <select
          id={this.props.id}
          onChange={this.handleChange}
          value={this.state.value}
        >
          {
            this.props.options.map(option => (
              <option
                value={option.value}
                key={option.value}
              >
                {option.name}
              </option>
            ))
          }
        </select>
        <i className="material-icons">arrow_drop_down</i>
      </div>
    );
  }
}