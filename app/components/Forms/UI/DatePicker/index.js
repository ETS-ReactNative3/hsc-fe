import React from 'react';
import { Form, Icon, Input, Grid } from 'semantic-ui-react';
import Cleave from 'cleave.js/react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Required from '../Required';
import ErrorMessage from '../ErrorMessage';

const ColumnTime = styled(Grid.Column)`
  padding-left: 0px!important;
`;
const DateLabel = () => (
  <Icon
    name="calendar"
    style={{
      position: 'absolute',
      margin: 0,
      borderTop: 0,
      borderBottom: 0,
      borderLeft: 0,
      marginTop: 1,
      height: 36,
      paddingTop: 8,
      width: 'auto',
      paddingLeft: 12,
      textAlign: 'center',
      background: 'transparent',
      border: '0px solid',
    }}
  />
);

export class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cleave: {},
      dateTimeValue: ' ',
      timeValue: '',
    };
  }

  componentWillReceiveProps = (nextProps) => {
    const { initialValue, isDateTime } = nextProps;
    if (this.props.initialValue !== initialValue) {
      if (isDateTime && initialValue) {
        const time = initialValue.slice(11, 19);
        this.setState({ timeValue: time });
      }
      this.state.cleave.setRawValue(initialValue);
    }
  };

  onValueInit = (cleave) => {
    this.setState({ cleave });
    const { initialValue } = this.props;
    cleave.setRawValue(initialValue);
  };

  handleChangeTime = (event, element) => {
    const { name, values } = this.props;

    this.setState({ timeValue: element.value });
    let date = '';
    if (values[name].indexOf('/') !== -1) { date = values[name].slice(0, 10); }
    if (element.value !== '') {
      this.props.setFieldValue(name, `${date} ${element.value}`);
    } else {
      this.props.setFieldValue(name, date);
    }
  };

  render() {
    const {
      onChange,
      touched,
      errors,
      name,
      label,
      disabled,
      required,
      styles,
      blurCallback,
      className,
      values,
      initialValue,
    } = this.props;
    return (
      <Form.Field
        error={Boolean(touched && touched[name] && errors[name])}
        className="relative"
      >
        {this.props.label ? (
          <label htmlFor={name}>
            {label}
            <Required required={required} />
          </label>
        ) : null}
        {this.props.isDateTime ?
          <Grid>
            <Grid.Row>
              <Grid.Column computer={10} tablet={10} largeScreen={10} mobile={16}>
                <Cleave
                  name={name}
                  disabled={disabled}
                  placeholder={this.props.placeholder ? this.props.placeholder : 'DD/MM/YYYY'}
                  onFocus={(e) => e.target.setAttribute('autocomplete', 'off')}
                  onInit={this.onValueInit}
                  options={{
                    date: true,
                    datePattern: ['d', 'm', 'Y'],
                  }}
                  onBlur={(e) => {
                    if (onChange) {
                      onChange(name, e.target.value);
                    }
                    if (blurCallback && typeof blurCallback === 'function') { blurCallback(e); }
                  }}
                  onChange={(e) => {
                    if (this.props.values[this.props.name] === '') {
                      this.props.setFieldValue(name, initialValue);
                    } else if (this.state.timeValue !== '') {
                      this.props.setFieldValue(name, `${e.target.value} ${this.state.timeValue}`);
                    } else {
                      this.props.setFieldValue(name, e.target.value);
                    }
                  }}
                  style={styles || { paddingLeft: 32, paddingRight: 2 }}
                  className={!className ? 'relative' : `relative ${className}`}
                />
                <DateLabel />
              </Grid.Column>
              <ColumnTime computer={6} tablet={6} largeScreen={6} mobile={16}>
                <Input type="time" onChange={this.handleChangeTime} value={this.state.timeValue} disabled={values[name] === ''} />
              </ColumnTime>
            </Grid.Row>
          </Grid> :
          <div>
            <Cleave
              name={name}
              onFocus={(e) => e.target.setAttribute('autocomplete', 'off')}
              disabled={disabled}
              placeholder={
                this.props.placeholder ? this.props.placeholder : 'DD/MM/YYYY'
              }
              onInit={this.onValueInit}
              options={{
                date: true,
                datePattern: ['d', 'm', 'Y'],
              }}
              onBlur={(e) => {
                if (onChange) {
                  onChange(name, e.target.value);
                }
                if (blurCallback && typeof blurCallback === 'function') { blurCallback(e); }
              }}
              style={styles || { paddingLeft: 32, paddingRight: 2 }}
              className={!className ? 'relative' : `relative ${className}`}
            />
            <DateLabel />
          </div>
        }
        {touched && touched[name] && errors[name] && <ErrorMessage>{errors[name]}</ErrorMessage>}
      </Form.Field>
    );
  }
}

DatePicker.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  touched: PropTypes.object,
  errors: PropTypes.object,
  required: PropTypes.bool,
  styles: PropTypes.object,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  blurCallback: PropTypes.func,
  initialValue: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  values: PropTypes.object,
  setFieldValue: PropTypes.func,
  isDateTime: PropTypes.bool,
};
