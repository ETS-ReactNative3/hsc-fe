import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'semantic-ui-react';
import ErrorMessage from '../ErrorMessage';
import Required from '../Required';

export class CustomRadio extends React.Component {
  handleChange = (e, value) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange(this.props.name, value.checked);
  };

  handleBlur = (e, value) => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.name, value.checked);
  };

  render() {
    return (
      <Form.Field>
        { this.props.label && <label htmlFor={this.props.name}>
          {this.props.label}<Required required={this.props.required} />
        </label> }
        <Radio
          slider={this.props.slider}
          toggle={this.props.isToggle}
          checked={this.props.checked ? this.props.checked : false}
          name={this.props.name}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          className={this.props.className}
          style={this.props.style}
          defaultChecked={this.props.defaultChecked}
        />
        {Boolean(this.props.touched) && Boolean(this.props.error) && <ErrorMessage>{this.props.error}</ErrorMessage>}
      </Form.Field>
    );
  }
}

CustomRadio.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  required: PropTypes.bool,
  isToggle: PropTypes.bool,
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  style: PropTypes.any,
  className: PropTypes.string,
  slider: PropTypes.any,
};

export default CustomRadio;
