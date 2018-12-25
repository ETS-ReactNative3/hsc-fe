import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import styled from 'styled-components';
import { Form } from 'semantic-ui-react';
import { style } from './style';
import ErrorMessage from '../ErrorMessage';
import Required from '../Required';

const StyledSelect = styled(Select)`${style}`;

export class SingleSelect extends React.Component {
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
      <Form.Field>
        { this.props.label && <label htmlFor={this.props.name}>
          {this.props.label}<Required required={this.props.required} />
        </label> }
        <StyledSelect
          clearable={false}
          name={this.props.name}
          options={this.props.options}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {Boolean(this.props.touched) && Boolean(this.props.error) && <ErrorMessage>{this.props.error}</ErrorMessage>}
      </Form.Field>
    );
  }
}

SingleSelect.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.number,
  ]),
  label: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  touched: PropTypes.bool,
  required: PropTypes.bool,
};

export default SingleSelect;
