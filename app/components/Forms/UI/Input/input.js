import React from 'react';
import { Form } from 'semantic-ui-react';
import { Field } from 'formik';
import PropTypes from 'prop-types';

import Required from '../Required';
import ErrorMessage from '../ErrorMessage';
import InputBtn from './inputBtn';

export const Input = ({ touched, errors, type, name, label, checked, disabled, required, style, placeholder, onBlur, uppercase, btn, className }) => (
  <div>
    <Form.Field error={Boolean(touched[name] && errors[name])} style={style}>
      {label ? <label htmlFor={name}>{label}<Required required={required} /></label> : null}
      <Field
        className={className}
        type={type}
        name={name}
        checked={checked}
        disabled={disabled}
        placeholder={placeholder}
        onFocus={(e) => e.target.setAttribute('autocomplete', 'off')}
        onBlur={onBlur}
        onKeyPress={(event) => {
          if (type && type === 'number' && event.which === 101) {
            event.preventDefault();
          } else if (type && type === 'number' && event.which === 69) {
            event.preventDefault();
          }
        }}
        style={uppercase ? { textTransform: 'uppercase' } : {}}
      />
      {btn && <InputBtn {...btn} />}
      {touched[name] && errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
    </Form.Field>
  </div>
);

Input.propTypes = {
  touched: PropTypes.object,
  errors: PropTypes.object,
  type: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  uppercase: PropTypes.bool,
  btn: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  className: PropTypes.string,
};

export default Input;
