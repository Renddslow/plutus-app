import React from 'react';
import PropTypes from 'prop-types';

export default class Input extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    }
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
        <input
          type="text"
          id={this.props.id}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}