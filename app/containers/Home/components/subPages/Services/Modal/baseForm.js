// import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Form, Dropdown, TextArea } from 'semantic-ui-react';
// import { CustomRadio } from 'components/Forms/UI/Radio';
import { Input } from 'components/Forms/UI/Input';
import DatePicker from 'react-datepicker';
// import { moment } from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomUpload } from 'components/Forms/UI/Input/uploadFile';

// import { CustomDropdown } from 'components/Forms/UI/Dropdown';
// import { handleErrorMessage } from '../../../../../../shared/lib/msgFormatter';
import jenny from 'images/jenny.jpg';
import elliot from 'images/elliot.jpg';
// import './../../../css/styles.css';
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
      eventDate: '',
      optionsHost: [
        { text: 'Diec Tin Toan', value: 'Admin Joy', image: { avatar: true, src: jenny } },
        { text: 'Nguyen Duc Phi', value: 'Admin Joy1', image: { avatar: true, src: elliot } },
      ],
      imageEvent: '',
    };
  }

  componentWillMount() {
  }

  handleChangeDateTime = (date) => {
    this.setState({
      eventDate: date,
    });
  }

  handleSelectFile = (name, file) => {
    this.setState({
      [name]: file.name,
    });
    this.props.setFieldValue(name, file);
  };

  render() {
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
                name="name"
                label="First name"
                required
              />
            </ColumnCod>
            <ColumnCod computer={16} tablet={16} largeScreen={16} mobile={16}>
              <label htmlFor style={{ fontWeight: 501 }}>Description</label>
              <TextArea
                autoHeight
                placeholder=""
                name="description"
                style={{ minHeight: 100 }}
                value={this.state.description}
                required
              />
            </ColumnCod>
            <ColumnCod computer={4} tablet={4} largeScreen={4} mobile={8}>
              <label htmlFor style={{ fontWeight: 501 }}>Image Description:</label>
              {/* <Button content="Upload" icon="upload" labelPosition="left" /> */}
              <CustomUpload
                {...this.props}
                name="imageEvent"
                onChange={(name, file) => this.handleSelectFile(name, file)}
                fileName={this.state.imageEvent}
                // selectedType="document"
              />
            </ColumnCod>
            <ColumnCod computer={4} tablet={4} largeScreen={4} mobile={8}>
            </ColumnCod>
            <ColumnCod computer={4} tablet={4} largeScreen={4} mobile={8}>
              <label htmlFor style={{ fontWeight: 501 }}>Date</label>
              <DatePicker
                name="eventDate"
                dateFormat="DD/MM/YYYY"
                selected={this.state.eventDate}
                onChange={(date) => this.handleChangeDateTime(date)}
              />
            </ColumnCod>
            <ColumnCod computer={16} tablet={16} largeScreen={16} mobile={16}>
              <label htmlFor style={{ fontWeight: 501 }}>Choose Host:</label>
              <Dropdown
                name="eventHost"
                placeholder="Select Host"
                fluid
                selection
                options={this.state.optionsHost}
                value={this.state.eventHost}
                required
              />
            </ColumnCod>
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
