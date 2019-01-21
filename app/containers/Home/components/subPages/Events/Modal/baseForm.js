// import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Form } from 'semantic-ui-react';
import { CustomDropdown } from 'components/Forms/UI/Dropdown';

// import { DateTimeInput } from 'semantic-ui-calendar-react';
// import { CustomRadio } from 'components/Forms/UI/Radio';
import { Input, NumberInput } from 'components/Forms/UI/Input';
// import * as moment from 'moment';

// import { CustomDropdown } from 'components/Forms/UI/Dropdown';
// import { handleErrorMessage } from '../../../../../../shared/lib/msgFormatter';
const ColumnCod = styled(Grid.Column)`
  padding-right: 0px!important;
`;


class BaseForm extends React.Component {
  constructor(props) {
    super(props);
    this.noteForms = [];
    this.state = {
      isLoading: false,
      gender: false,
      dateTime: '',
      optionsGender: [
        { text: 'Male', value: 'M', icon: 'male' },
        { text: 'Female', value: 'F', icon: 'woman' },
        { text: 'Other', value: 'O', icon: 'other gender' },
      ],
    };
  }

  componentWillMount() {
    // moment.locale('vi');
  }

  handleChangeDateTime = (event, { name, value }) => {
    if (this.state[name]) {
      this.setState({ [name]: value });
    }
  }
  handleChangeDropDown = (name, value) => {
    this.setState({
      [name]: value,
    });
    this.props.setFieldValue(name, value);
  };

  render() {
    const { subGender } = this.state;
    return (
      <Form
        autoComplete="off"
        onSubmit={this.props.handleSubmit}
        loading={this.props.isSubmitting ? this.props.isSubmitting : this.state.isLoading}
      >
        <Grid>
          <Grid.Row>
            <ColumnCod computer={16} tablet={16} largeScreen={16} mobile={16}>
              <Input
                {...this.props}
                name="firstName"
                label="First name"
                value={this.state.fisrtName}
              />
            </ColumnCod>
            <ColumnCod computer={16} tablet={16} largeScreen={16} mobile={16}>
              <Input
                {...this.props}
                name="lastName"
                label="Last name"
                value={this.state.lastName}
              />
            </ColumnCod>
            <ColumnCod computer={16} tablet={16} largeScreen={16} mobile={16}>
              <Input
                {...this.props}
                name="email"
                label="Email"
                type="email"
              />
            </ColumnCod>
            <ColumnCod computer={16} tablet={16} largeScreen={16} mobile={16}>
              <NumberInput
                {...this.props}
                name="phoneNumber"
                label="Phone"
              />
            </ColumnCod>
            <ColumnCod computer={8} tablet={8} largeScreen={8} mobile={16}>
              {/* <CustomRadio
                label="Gender"
                name="gender"
                isToggle
                checked={this.state.gender}
                onChange={(event, value) => {
                  this.setState({ gender: value });
                  this.props.setFieldValue(gender, value);
                }}
                onBlur={(event, value) => {
                  this.setState({ gender: value });
                  this.props.setFieldValue(gender, value);
                }}
              /> */}
              <CustomDropdown
                {...this.props}
                name="subGender"
                placeholder=""
                onChange={(name, value) => this.handleChangeDropDown(name, value)}
                options={this.state.optionsGender}
                label="Gender"
                value={subGender}
                required
              />
            </ColumnCod>
            <ColumnCod computer={4} tablet={4} largeScreen={4} mobile={8}>
              {/* <Label content={gender ? 'Male' : 'Female'} style={{ padding: '10px', marginTop: '12px' }} /> */}
            </ColumnCod>
            <ColumnCod computer={16} tablet={16} largeScreen={16} mobile={16}>
              {/* <DateTimeInput
                name="birthDay"
                placeholder="Birtday"
                value={this.state.dateTime}
                iconPosition="left"
                onChange={this.handleChangeDateTime}
              /> */}
            </ColumnCod>
            {/* <ColumnCod computer={16} tablet={16} largeScreen={16} mobile={16}>
              <NumberInput
                {...this.props}
                name="phoneNumber"
                label="Phone"
              />
            </ColumnCod> */}
          </Grid.Row>
        </Grid>
      </Form>
    );
  }
}

BaseForm.propTypes = {
  isSubmitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  setFieldValue: PropTypes.func,
  // onError: PropTypes.func,
};
export default BaseForm;
