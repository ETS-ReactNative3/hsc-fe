import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// import ErrorMessage from '../ErrorMessage';

export default class CheckboxBtn extends React.Component {
  constructor(
    props /* { touched, errors, type, name, elements, checked, disabled  } */,
  ) {
    super(props);
    this.state = {
      elements: props.elements,
      currentValue: props.value,
    };
  }

  setValue = value => {
    this.setState({ currentValue: value }, () =>
      this.props.onChange(this.props.name, this.state.currentValue),
    );
  };

  render() {
    return (
      <Form.Field>
        <Button.Group>
          {this.state.elements.map(({ label, value }) => (
            <Button
              type="button"
              key={value}
              className={this.state.currentValue === value ? 'primary' : ''}
              onClick={() => this.setValue(value)}
            >
              {label}
            </Button>
          ))}
        </Button.Group>
        {/* {this.props.touched[name] &&
          this.props.errors[name] && (
            <ErrorMessage>{this.props.errors[name]}</ErrorMessage>
          )} */}
      </Form.Field>
    );
  }
}

CheckboxBtn.propTypes = {
  // touched: PropTypes.object,
  // errors: PropTypes.object,
  name: PropTypes.string,
  elements: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
