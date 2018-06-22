import React from 'react';
import PropTypes from 'prop-types';
import currencyFormatter from 'currency-formatter';

export default class Currency extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = ({ target, nativeEvent }) => {
    if (!Number.isNaN(parseInt(nativeEvent.data, 10))) {
      const value = currencyFormatter.unformat(target.value, { code: 'USD' });
      this.setState({
        value: value * 1000
      });
      this.props.onChange({ [this.props.name]: this.state.value });
    } else if (nativeEvent.data === null) {
      this.setState((prevState) => ({
        value: prevState.value / 10,
      }));
      this.props.onChange({ [this.props.name]: this.state.value });
    }
  };

  render() {
    return (
      <div className="form-row">
        <label htmlFor={this.props.id}>{this.props.label}</label>
        <input
          type="text"
          id={this.props.id}
          value={currencyFormatter.format(
            this.state.value / 100,
            { code: 'USD' },
          )}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}