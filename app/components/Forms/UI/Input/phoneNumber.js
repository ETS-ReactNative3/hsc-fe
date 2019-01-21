import React from 'react';
import { Form, Popup, Icon } from 'semantic-ui-react/dist/commonjs';
import Cleave from 'cleave.js/react';
import PropTypes from 'prop-types';
import Required from '../Required';
import ErrorMessage from '../ErrorMessage';

export default class PhoneNumberInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cleave: {},
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { name } = this.props;
    const { values } = nextProps;
    if (this.props.values[name] !== values[name]) {
      if (this.state.cleave.setRawValue) {
        this.state.cleave.setRawValue(values[name]);
      }
    }
  };

  onValueInit = (cleave) => {
    this.setState({ cleave });
    const { values, name, defaultValue } = this.props;
    if (defaultValue) cleave.setRawValue(defaultValue);
    else cleave.setRawValue(values[name]);
  };

  cleave = null;

  render(
    {
      setFieldValue,
      touched,
      errors,
      type,
      name,
      label,
      disabled,
      required,
      style,
      placeholder,
      blurCallback,
      className,
    } = this.props
  ) {
    return (
      <Form.Field
        error={Boolean(touched[name] && errors[name])}
        style={style}
        className="relative"
      >
        {label ? (
          <label htmlFor={name}>
            {label}
            <Required required={required} />
            {this.props.tooltip ? (
              <Popup
                className="fieldTooltip"
                style={{ backgroundColor: '#333d68' }}
                inverted
                trigger={<Icon size="small" circular name="question" />}
              >
                {this.props.tooltip}
              </Popup>
            ) : ''}
          </label>
        ) : null}
        <Cleave
          type={type}
          name={name}
          disabled={disabled}
          placeholder={placeholder}
          onInit={this.onValueInit}
          className={className}
          options={{
            numeral: true,
            numeralDecimalMark: ',',
            delimiter: '.',
            rawValueTrimPrefix: false,
            numeralDecimalScale: 2,
          }}
          onChange={(e) => {
            setFieldValue(name, e.target.rawValue);
            if (this.props.onChange) {
              this.props.onChange(name, e.target.rawValue);
            }
          }}
          onBlur={(e) => {
            setFieldValue(name, e.target.rawValue);
            if (blurCallback && typeof blurCallback === 'function') blurCallback(e);
          }}
        />
        {touched[name] &&
          errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
      </Form.Field>
    );
  }
}

PhoneNumberInput.propTypes = {
  onChange: PropTypes.any,
  values: PropTypes.object,
  name: PropTypes.string,
  tooltip: PropTypes.string,
  defaultValue: PropTypes.string,
};
