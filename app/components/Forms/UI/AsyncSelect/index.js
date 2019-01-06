import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';
import { style } from './style';
import ErrorMessage from '../ErrorMessage';
import Required from '../Required';

const StyledSelect = styled(Select.Async)`${style}`;

export class AsyncSelect extends React.Component {
  handleChange = (value) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange(this.props.name, value);
  };

  handleBlur = () => {
    // this is going to call setFieldTouched and manually update touched.topcis
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <Form.Field style={this.props.style} className={this.props.error ? 'error' : ''}>
        <label htmlFor={this.props.name}>
          {this.props.label}<Required required={this.props.required} />
        </label>
        <StyledSelect
          name={this.props.name}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
          loadOptions={this.props.loadOptions}
          multi={this.props.multi}
        />
        { Boolean(this.props.error) && <ErrorMessage>{this.props.error}</ErrorMessage>}
      </Form.Field>
    );
  }
}

AsyncSelect.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  multi: PropTypes.bool,
  loadOptions: PropTypes.func,
  required: PropTypes.bool,
  style: PropTypes.object,
};

export default AsyncSelect;
