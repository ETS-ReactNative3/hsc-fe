import React from 'react';
import PropTypes from 'prop-types';
import { Form, TextArea } from 'semantic-ui-react';
import ErrorMessage from '../ErrorMessage';
import Required from '../Required';

export class CustomTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.initialValue,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.initialValue !== this.props.initialValue) {
      this.setState({
        value: nextProps.initialValue,
      });
    }
  }
  handleChange = (element, info) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.setState({
      value: info.value,
    });
    this.props.onChange(this.props.name, info.value);
  };

  render() {
    return (
      <Form.Field className={this.props.className}>
        { this.props.label && <label htmlFor={this.props.name}>
          {this.props.label}<Required required={this.props.required} />
        </label> }
        <TextArea
          onFocus={(e) => e.target.setAttribute('autocomplete', 'off')}
          name={this.props.name}
          onChange={this.handleChange}
          value={this.state.value}
        />
        { Boolean(this.props.touched && this.props.touched[this.props.name]) && <ErrorMessage>{this.props.errors[this.props.name]}</ErrorMessage>}
      </Form.Field>
    );
  }
}

CustomTextArea.propTypes = {
  onChange: PropTypes.func,
  // onBlur: PropTypes.func,
  // value: PropTypes.oneOfType([
  //   PropTypes.any,
  // ]),
  label: PropTypes.string,
  name: PropTypes.string,
  errors: PropTypes.object,
  touched: PropTypes.object,
  required: PropTypes.bool,
  className: PropTypes.string,

  initialValue: PropTypes.string,
};

export default CustomTextArea;
