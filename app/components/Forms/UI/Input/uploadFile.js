import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Form, Input, Grid } from 'semantic-ui-react';
import ErrorMessage from '../ErrorMessage';
import Required from '../Required';
import './css/styles.css';

const CustomeGrid = styled(Grid)`
  margin-left: 0px !important;
`;
export class CustomUpload extends React.Component {
  handleChange = event => {
    this.props.onChange(this.props.name, event.target.files[0]);
  };

  render() {
    return (
      <Form.Field
        error={Boolean(
          this.props.touched[this.props.name] &&
            this.props.errors[this.props.name],
        )}
      >
        {this.props.label ? (
          <label htmlFor={this.props.name}>
            {this.props.label}
            <Required required={this.props.required} />
          </label>
        ) : null}
        <CustomeGrid>
          <Grid.Row columns={2}>
            <Grid.Column
              computer={6}
              tablet={6}
              largeScreen={6}
              mobile={16}
              className="input-file input-file-header"
              onClick={() => {
                document.getElementById(this.props.name).click();
              }}
            >
              <h4>UPLOAD</h4>
            </Grid.Column>
            <Grid.Column
              computer={10}
              tablet={10}
              largeScreen={10}
              mobile={16}
              className="input-file"
            >
              <span>{this.props.fileName}</span>
            </Grid.Column>
          </Grid.Row>
        </CustomeGrid>
        <Input
          id={this.props.name}
          type="file"
          placeholder={this.props.placeholder}
          name={this.props.name}
          onChange={this.handleChange}
          value={this.props.value}
          style={{ display: 'none' }}
        />
        {Boolean(this.props.touched[this.props.name]) && (
          <ErrorMessage>{this.props.errors[this.props.name]}</ErrorMessage>
        )}
      </Form.Field>
    );
  }
}

CustomUpload.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.string,
  ]),
  label: PropTypes.string,
  name: PropTypes.string,
  errors: PropTypes.object,
  required: PropTypes.bool,
  touched: PropTypes.object,
  placeholder: PropTypes.string,
  fileName: PropTypes.string,
  // className: PropTypes.string,
  // defaultValue: PropTypes.string,
};

export default CustomUpload;
