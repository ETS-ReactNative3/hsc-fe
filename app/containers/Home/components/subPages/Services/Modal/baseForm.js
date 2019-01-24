import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Form } from 'semantic-ui-react';
// import { CustomRadio } from 'components/Forms/UI/Radio';
import { Input } from 'components/Forms/UI/Input';
import { DatePicker } from 'components/Forms/UI/DatePicker';
import { CustomTextArea } from 'components/Forms/UI/TextArea';
import { CustomDropdown } from 'components/Forms/UI/Dropdown';


// import DatePicker from 'react-datepicker';
// import { moment } from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { CustomUpload } from 'components/Forms/UI/Input/uploadFile';

// import { CustomDropdown } from 'components/Forms/UI/Dropdown';
// import { handleErrorMessage } from '../../../../../../shared/lib/msgFormatter';
import jenny from 'images/jenny.jpg';
import elliot from 'images/elliot.jpg';
import HostService from '../../../../../../shared/services/api/home/hosts';
// import './../../../css/styles.css';
import HomeService from '../../../../../../shared/services/api/home/index';


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
    this.callServicesDropdown();
    if (this.props.eventItem && this.props.typeForm === 'edit') {
      HomeService.getById(this.props.eventItem.pk).then((res) => {
        this.formatedObj(res);
      }).catch((error) => {
        console.log(error);
      });
    }
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

  handleDataChange(name, value) {
    this.props.setFieldValue(name, value);
  }

  callServicesDropdown = () => {
    HostService.getList().then((res) => {
      const listHost = _.get(res, 'results', []);
      this.setState({
        optionsHost: this.formatedDataDropdown(listHost),
      });
    }).catch((errors) => {
      this.onError(errors);
      actions.setSubmitting(false);
    });
  }

  formatedObj = (response) => {
    const name = response.name ? response.name : '';
    const description = response.description ? response.description : '';
    const dateRes = response.date ? response.date : null;
    const hostPk = _.get(response, 'host.pk', '');
    const shortDescription = response.short_description ? response.short_description : '';
    this.setState({
      name,
      description,
      shortDescription,
      eventHost: hostPk,
      eventDate: dateRes,
    });
    this.props.setFieldValue('name', name);
    this.props.setFieldValue('description', description);
    this.props.setFieldValue('shortDescription', shortDescription);
    this.props.setFieldValue('eventDate', dateRes);
  }

  handleChangeDropDown = (name, value) => {
    this.setState({
      [name]: value,
    });
    this.props.setFieldValue(name, value);
  };

  formatedDataDropdown = (data) => {
    const arrResult = [];
    if (data && data.length > 0) {
      data.forEach((item) => {
        const rowData = {
          text: item.name ? item.name : item.description,
          value: item.pk ? item.pk : item.name,
          image: { avatar: true, src: elliot },
        };
        arrResult.push(rowData);
      });
    }
    return arrResult;
  }

  render() {
    return (
      <Form
        autoComplete="off"
        onSubmit={this.props.handleSubmit}
        loading={this.props.isSubmitting ? this.props.isSubmitting : this.state.isLoading}
        encType="multipart/form-data"
      >
        <Grid>
          <Grid.Row>
            <ColumnCod computer={16} tablet={16} largeScreen={16} mobile={16}>
              <Input
                {...this.props}
                name="name"
                label="Event name"
                required
              />
            </ColumnCod>
            <ColumnCod computer={16} tablet={16} largeScreen={16} mobile={16}>
              <CustomTextArea
                {...this.props}
                onFocus={(e) => e.target.setAttribute('autocomplete', 'off')}
                name="description"
                label="Description"
                onChange={(name, value) => this.handleDataChange(name, value)}
                onBlur={(name, value) => this.handleDataChange(name, value)}
                initialValue={this.state.description}
                required
              />
            </ColumnCod>
            <ColumnCod computer={16} tablet={16} largeScreen={16} mobile={16}>
              <Input
                {...this.props}
                name="shortDescription"
                label="Short Description"
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
              <DatePicker
                {...this.props}
                onChange={this.props.setFieldValue}
                name="eventDate"
                label="Date"
                initialValue={this.state.eventDate}
                required
              />
              {/* <Input style={{ display: 'none' }} name="eventDate" value={this.state.eventDate} /> */}
            </ColumnCod>
            <ColumnCod computer={16} tablet={16} largeScreen={16} mobile={16}>
              <CustomDropdown
                {...this.props}
                name="eventHost"
                placeholder="Select Host"
                onChange={(name, value) => this.handleChangeDropDown(name, value)}
                options={this.state.optionsHost}
                label="Choose Host"
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
  typeForm: PropTypes.string,
  eventItem: PropTypes.object,
};
export default BaseForm;
