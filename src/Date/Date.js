import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Date extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      value: moment(target.value).unix(),
    });
    this.props.onChange({ [this.props.name]: this.state.value });
  };

  render() {
    return (
      <div className="form-row">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          type="date"
          id={this.props.id}
          value={moment(this.state.value * 1000).format('YYYY-MM-DD')}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}