import React from 'react';
// import PropTypes from 'prop-types';

import { Grid, Table, Button, Icon } from 'semantic-ui-react';
import EditorPopup from 'components/Forms/UI/Popup';
import FlashMessage from 'components/Forms/UI/FlashMessage';
import moment from 'moment';
import CustomModal from './Modal/index';
import HomeService from '../../../../../shared/services/api/home/index';
import FullModal from '../../../../../components/Modal/index';
import { formatMessage } from '../../../../../containers/TextProvider';
import { handleErrorMessage } from '../../../../../shared/lib/msgFormatter';

let showFlashMessage = false;

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      activeIndex: 0,
      activeName: 'Viet Ngu',
      isReloadList: false,
      openModal: false,
      openDeleteModal: false,
      tmpData: [
        { key: '1', name: 'Event 1', host: 'Xeo', date: '2019-01-12T06:00:00Z' },
        { key: '2', name: 'Event 2', host: 'BaoCH', date: '2019-01-09T06:00:00Z' },
        { key: '3', name: 'Event 3', host: 'Hoang Quoc Viet', date: '2019-01-30T06:00:00Z' },
        { key: '4', name: 'Event 4', host: 'Diec Tin Toan', date: '2019-02-28T06:00:00Z' },
        { key: '5', name: 'Event 5', host: 'Pham Duc Minh Tan', date: '2019-03-20T06:00:00Z' },
        { key: '6', name: 'Event 6', host: 'Nguyen Sy Hien', date: '2019-06-22T06:00:00Z' },
      ],
    };
  }

  componentWillMount() {
    // const eventsArray = this.formatedDataTable(this.state.tmpData);
    // this.setState({
    //   eventsArray,
    // });
    this.loadingDataTable();
  }

  onError = (errors) => {
    const msg = handleErrorMessage(errors);

    this.setState({
      msgAlert: msg,
    }, this.handleShowFlashMessage());
  };

  loadingDataTable = () => {
    HomeService.getList({}).then((res) => {
      const listItems = _.get(res, 'results', []);
      this.setState({
        eventsArray: this.formatedDataTable(listItems),
      });
    }).catch((error) => {
      this.onError(error);
    });
  }

  handleTabChange = (e, { activeIndex }) => {
    this.setState({
      activeIndex,
      activeName: this.capitalizeFirstLetter(e.target.text),
      isReloadList: true,
    });
  };

  handleOpenModal = (typeForm, item) => {
    this.setState({
      openModal: true,
      eventItem: item,
      typeForm,
    });
  }

  handleCLoseModal = () => {
    this.setState({
      openModal: false,
      openDeleteModal: false,
    }, () => this.loadingDataTable());
  }


  capitalizeFirstLetter = (str) => {
    const temp = str.toLowerCase();
    return temp[0].toUpperCase() + temp.slice(1);
  };

  handleDisableReloadList = () => {
    this.setState({
      isReloadList: false,
    });
  };

  handleOpenDeleteModal = (item) => {
    this.setState({
      openDeleteModal: true,
      eventItem: item,
      messageAlert: formatMessage('confirm', 'Event', 'delete'),
    });
  }

  handleConfirm = () => {
    const { eventItem } = this.state;
    if (eventItem && eventItem !== null) {
      HomeService.deleteById(eventItem.pk).then((res) => {
        console.log(res);
        this.handleCLoseModal();
        this.loadingDataTable();
      }).catch((errors) => {
        this.onError(errors);
      });
    }
  }

  handleShowFlashMessage = () => {
    showFlashMessage = true;
    setTimeout(() => {
      showFlashMessage = false;
      this.forceUpdate();
    }, 6000);
  };

  formatedDataTable = (data) => {
    const tableRows = [];
    if (data && data.length > 0) {
      data.forEach((item) => {
        const name = item.name;
        const host = item.host.name;
        const date = item.date ? moment(item.date).format('DD/MM/YYYY') : '';
        const actions = (<EditorPopup
          hasEdit
          hasView
          hasRemove
          actionEdit={() => this.handleOpenModal('edit', item)}
          actionView={() => this.handleOpenModal('view', item)}
          actionRemove={() => this.handleOpenDeleteModal(item)}
          position="bottom"
          triggerItem={<Icon name="setting" className="tbl-action-icon" circular size="large" />}
        />);
        const row = (
          <Table.Row key={item.key}>
            <Table.Cell>{name}</Table.Cell>
            <Table.Cell>{host}</Table.Cell>
            <Table.Cell>{date}</Table.Cell>
            <Table.Cell>{actions}</Table.Cell>
          </Table.Row>
        );
        tableRows.push(row);
      });
    }
    return tableRows;
  }

  render() {
    const { openModal, openDeleteModal, eventsArray, eventItem, typeForm } = this.state;
    return (
      <div>
        <Grid className="header-list">
          {showFlashMessage ? <FlashMessage info={msgAlert} /> : null}

          <Grid.Row>
            <Grid.Column computer={4} tablet={4} largeScreen={4} mobile={2}>
              <h2>List Events</h2>
            </Grid.Column>
            <Grid.Column computer={8} tablet={8} largeScreen={8} mobile={8}>
            </Grid.Column>
            <Grid.Column computer={4} tablet={4} largeScreen={4} mobile={6}>
              <Button
                color="blue"
                onClick={() => this.handleOpenModal('add')}
                content="Add new event"
                floated="right"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Host</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {eventsArray}
          </Table.Body>
        </Table>
        {openModal ? <CustomModal
          ref={(el) => { this.form = el; }}
          handleOpenModal={this.handleOpenModal}
          closeModal={this.handleCLoseModal}
          openModal={openModal}
          eventItem={eventItem}
          typeForm={typeForm}
          handleReloadList={this.loadingDataTable}
        /> : null}
        {openDeleteModal ? <FullModal
          title="Warning"
          open={openDeleteModal}
          childrens={this.state.messageAlert}
          onConfirm={this.handleConfirm}
          onClose={this.handleCLoseModal}
        /> : null}
        {/* <iframe title="facebook test" src="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FHSC.DCGTeamjoy%2Fvideos%2F536792843472616%2F&show_text=0&width=100" width="100%" height="800px" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder="0" allowTransparency="true" allowFullScreen="true"></iframe> */}
      </div>
    );
  }
}

Services.propTypes = {
  // elementId: PropTypes.string,
};

export default Services;
