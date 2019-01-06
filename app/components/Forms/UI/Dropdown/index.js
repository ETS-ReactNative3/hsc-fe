import React from 'react';
import PropTypes from 'prop-types';
import { Form, Dropdown } from 'semantic-ui-react';
import ErrorMessage from '../ErrorMessage';
import Required from '../Required';

// const StyledSelect = styled(Select.Async)`${style}`;

export class CustomDropdown extends React.Component {
  handleChange = (event, element) => {
    // this is going to call setFieldValue and manually update values.topcis
    this.props.onChange(this.props.name, element.value);
  };

  render() {
    return (
      <Form.Field
        error={
          Boolean(this.props.touched && this.props.touched[this.props.name] &&
          this.props.errors[this.props.name])
        }
      >
        {this.props.label ?
          <label htmlFor={this.props.name}>
            {this.props.label}<Required required={this.props.required} />
          </label> : null}
        <Dropdown
          fluid
          id={this.props.id}
          onFocus={(e) => e.target.setAttribute('autocomplete', 'nope')}
          multiple={this.props.multiple}
          selection
          search
          placeholder={this.props.placeholder}
          name={this.props.name}
          onChange={this.handleChange}
          value={this.props.value}
          options={this.props.options}
          style={this.props.style}
          defaultValue={this.props.defaultValue}
          className={!this.props.className ? 'relative' : (`relative ${this.props.className}`)}
          disabled={this.props.disabled}
        />
        { Boolean(this.props.touched && this.props.touched[this.props.name]) && <ErrorMessage>{this.props.errors[this.props.name]}</ErrorMessage>}
      </Form.Field>
    );
  }
}

CustomDropdown.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  errors: PropTypes.object,
  options: PropTypes.array,
  required: PropTypes.bool,
  style: PropTypes.object,
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  touched: PropTypes.object,
  placeholder: PropTypes.string,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.any,
};

export default CustomDropdown;
