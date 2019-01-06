import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import ErrorMessage from '../ErrorMessage';

export const CheckBox = ({ touched, errors, type, name, label, value, checked, disabled, labelRight }) => (
  <Form.Field error={Boolean(touched[name] && errors[name])}>
    <label
      htmlFor={name}
      style={{
        display: labelRight ? 'inline-block' : 'block',
        top: labelRight ? -3 : 0,
        position: labelRight ? 'relative' : 'inherit',
        right: labelRight ? -3 : 0,
      }}
    >{label}</label>
    <Field
      type={type}
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      style={{ float: labelRight ? 'left' : 'none' }}
    />
    {touched[name] && errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
  </Form.Field>
);

CheckBox.propTypes = {
  touched: PropTypes.object,
  errors: PropTypes.object,
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.any,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  labelRight: PropTypes.bool,
};

export default CheckBox;

