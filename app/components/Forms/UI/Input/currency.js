import React from 'react';
import { Form, Popup, Icon } from 'semantic-ui-react';
import Cleave from 'cleave.js/react';
import PropTypes from 'prop-types';

import Required from '../Required';
import ErrorMessage from '../ErrorMessage';

// const CurrencyLabel = () => (
//   <Label
//     basic
//     style={
//     {
//       position: 'absolute',
//       margin: 0,
//       left: 1,
//       borderTop: 0,
//       borderBottom: 0,
//       borderLeft: 0,
//       marginTop: 1,
//       height: 36,
//       paddingTop: 12,
//       width: 38,
//       textAlign: 'center',
//     }
//   }
//   >€</Label>
// );

export default class Currency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cleave: {},
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { name } = this.props;
    const { values } = nextProps;
    if (this.props.values && this.props.values[name] !== values[name]) {
      this.state.cleave.setRawValue(values[name]);
    }
  };

  onValueInit = (cleave) => {
    this.setState({ cleave });
    const { values, name, defaultValue } = this.props;
    if (defaultValue) cleave.setRawValue(defaultValue);
    else if (values) cleave.setRawValue(values[name]);
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
      noEuro,
      className,
    } = this.props
  ) {
    return (
      <Form.Field
        error={Boolean(touched && touched[name] && errors[name])}
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
            ) : (
              ''
            )}
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
            prefix: noEuro ? '' : '€         ',
            rawValueTrimPrefix: true,
          }}
          onBlur={(e) => {
            setFieldValue(name, e.target.rawValue);
            if (blurCallback && typeof blurCallback === 'function') blurCallback(e);
          }}
        />
        {touched && touched[name] &&
          errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
      </Form.Field>
    );
  }
}

Currency.propTypes = {
  values: PropTypes.object,
  name: PropTypes.string,
  tooltip: PropTypes.string,
  defaultValue: PropTypes.string,
};
