import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Table } from 'semantic-ui-react';
import HomeService from '../../../../../../shared/services/api/home/index';

class BaseFormView extends React.Component {
  constructor(props) {
    super(props);
    this.noteForms = [];
    this.state = {
      isLoading: false,
    };
  }

  componentWillMount() {
    this.loadingDataTable();
  }

  loadingDataTable = () => {
    HomeService.getListSubcribers(this.props.eventItem.pk).then((res) => {
      const listSub = _.get(res, 'results', []);
      this.setState({
        subsArray: this.formatDataTable(listSub),
      });
    }).catch((errors) => {
      console.log(errors);
    });
  }

  formatDataTable = (data) => {
    const arrResult = [];
    const switchGender = (sex) => ({
      M: 'Male',
      F: 'Female',
    })[sex] || 'Other';
    if (data && data.length > 0) {
      data.forEach((item) => {
        const fullName = item.first_name || item.last_name ? `${item.first_name} ${item.last_name}` : '';
        const email = item.email ? item.email : '';
        const phoneNum = item.phone ? item.phone : '';
        const gender = switchGender(item.gender);
        const row = (
          <Table.Row key={item.pk}>
            <Table.Cell>{fullName}</Table.Cell>
            <Table.Cell>{email}</Table.Cell>
            <Table.Cell>{phoneNum}</Table.Cell>
            <Table.Cell>{gender}</Table.Cell>
          </Table.Row>
        );
        arrResult.push(row);
      });
    } else {
      const row = (
        <Table.Row textAlign="center"><h4>Empty List</h4></Table.Row>
      );
      arrResult.push(row);
    }
    return arrResult;
  }

  render() {
    const { subsArray } = this.state;
    return (
      <Form
        autoComplete="off"
        onSubmit={this.props.handleSubmit}
        loading={
          this.props.isSubmitting
            ? this.props.isSubmitting
            : this.state.isLoading
        }
      >
        {/* <Grid> */}
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Full Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Phone Number</Table.HeaderCell>
              <Table.HeaderCell>Gender</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {subsArray}
          </Table.Body>
        </Table>
        {/* </Grid> */}
      </Form>
    );
  }
}

BaseFormView.propTypes = {
  isSubmitting: PropTypes.bool,
  handleSubmit: PropTypes.func,
  // setFieldValue: PropTypes.func,
  // onError: PropTypes.func,
  eventItem: PropTypes.object,
};
export default BaseFormView;
