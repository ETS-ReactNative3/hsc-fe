import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Modal } from 'semantic-ui-react';
// import _ from 'lodash';
import FlashMessage from 'components/Forms/UI/FlashMessage';
// import moment from 'moment';
// import OfferteService from '../../../../../../shared/services/api/offerte';
import { handleErrorMessage } from '../../../../../../shared/lib/msgFormatter';
import { mapToInitialValues } from './initialValues';
// import Validation from './validation';
import BaseForm from './baseForm';
import BaseFormView from './baseFormView';
// import BaseFormView from './baseFormView';
import { formatDateRequest } from '../../../../../../shared/lib/common';

import HomeService from '../../../../../../shared/services/api/home/index';

let showFlashMessage = false;
class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.message = {};
    this.state = {
      openModal: false,
      msgAlert: {},
      fileUpload: null,
    };
    showFlashMessage = false;
  }

  componentWillMount() {
    this.setState({
      openModal: this.props.openModal,
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      openModal: nextProps.openModal,
    });
  }

  onSubmit = () => {
    this.baseForm.submitForm();
  };

  onBaseSubmit = (values, actions) => {
    const data = this.formatDataRequest(values);
    actions.setSubmitting(true);
    this.handleCallService(data, actions);
  };

  onError = (msg) => {
    const msgAlert = handleErrorMessage(msg);
    this.setState({
      msgAlert,
    }, this.handleShowFlashMessage());
  };

  onSwitchTab = (isGenerali) => {
    this.setState({
      tabName: isGenerali ? 'Corporate' : 'Privato',
    });
  };

  handleCallService = (data, actions) => {
    const formData = new FormData();
    formData.append('event', JSON.stringify(data.event));
    if (data.image && data.image !== null) {
      formData.append('image', data.image);
    }
    if (this.props.typeForm === 'add') {
      this.handleCreateEvent(formData, actions);
    } else if (this.props.typeForm === 'edit' && this.props.eventItem && this.props.eventItem.pk) {
      this.handleUpdateEvent(formData, actions, this.props.eventItem.pk);
    }
  };

  handleCreateEvent = (formData, actions) => {
    HomeService.create(formData).then((res) => {
      actions.setSubmitting(false);
      this.handleCloseModal(res);
      actions.setSubmitting(false);
    }).catch((errors) => {
      this.onError(errors);
      actions.setSubmitting(false);
    });
  }

  handleUpdateEvent = (formData, actions, id) => {
    HomeService.update(formData, id).then((res) => {
      actions.setSubmitting(false);
      this.handleCloseModal(res);
      actions.setSubmitting(false);
    }).catch((errors) => {
      this.onError(errors);
      actions.setSubmitting(false);
    });
  }

  formatTypeRequest = (arrStr) => {
    let strResponse = '';
    arrStr.forEach((type, idx) => {
      if (arrStr[idx] !== '') {
        if (idx === arrStr.length - 1) {
          strResponse += type;
        } else {
          const temp = `${type}, `;
          strResponse += temp;
        }
      }
    });
    return strResponse;
  };

  formatDataRequest = (data) => {
    let formatedData = {};
    let date = data.eventDate ? `${formatDateRequest(data.eventDate)}T10:10:05Z` : '';
    if (this.props.typeForm === 'edit' && data.eventDate && data.eventDate.includes('T10:10:05Z')) {
      date = data.eventDate ? data.eventDate : null;
    }
    if (data) {
      formatedData = {
        name: data.name,
        description: data.description,
        short_description: data.shortDescription,
        date,
        host: data.eventHost,
      };
    }
    const dataReturn = {
      event: formatedData,
      image: data.imageEvent ? data.imageEvent : null,
    };
    this.setState({
      fileUpload: data.imageEvent,
    });
    return dataReturn;
  };

  handleCloseModal = (itemSuccess) => {
    this.setState({ openModal: false });
    if (itemSuccess && itemSuccess.id) {
      this.props.closeModal(itemSuccess);
    } else {
      this.props.closeModal();
    }
  };

  handleShowFlashMessage = () => {
    showFlashMessage = true;
    // setTimeout(() => {
    //   showFlashMessage = false;
    //   this.forceUpdate();
    // }, 6000);
  };

  splitDescription = (str) => {
    if (str) {
      const arrDes = str.split('..');
      const arrResult = [];
      if (arrDes.length > 0) {
        arrDes.forEach((item) => {
          const line = (
            <h5>{item}</h5>
          );
          arrResult.push(line);
        });
      }
      return arrResult;
    }
    return null;
  }

  render() {
    const { openModal, msgAlert } = this.state;
    const { eventItem, typeForm } = this.props;
    let name = 'Add new Event';
    // const subHeader = 'Events';
    // const arrDes = this.splitDescription(eventItem.description);
    if (typeForm === 'add') {
      name = 'Add new event';
    } else if (typeForm === 'edit') {
      name = `Edit ${eventItem.name}`;
    } else {
      name = `${eventItem.name} detail`;
    }
    console.log(showFlashMessage);
    return (
      <div>
        <Modal dimmer="blurring" open={openModal} closeOnDimmerClick={false} onClose={this.handleCloseModal} closeIcon>
          {showFlashMessage ? <FlashMessage info={msgAlert} /> : null}

          <Modal.Header>
            <label htmlFor>{name}</label>
            {/* <h5 className="sub-header">{subHeader}</h5> */}
          </Modal.Header>
          <Modal.Content>

            <Formik
              ref={(c) => { this.baseForm = c; }}
              onSubmit={this.onBaseSubmit}
              // validate={Validation}
              initialValues={
                this.props.initialValues
                  ? mapToInitialValues(this.props.initialValues)
                  : mapToInitialValues({})
              }
              render={(props) =>
                this.props.typeForm !== 'view' ? <BaseForm {...props} onError={this.onError} eventItem={eventItem} typeForm={typeForm} /> : <BaseFormView {...props} onError={this.onError} eventItem={eventItem} typeForm={typeForm} />
              }
            />
          </Modal.Content>
          <Modal.Actions className="register-event-action">
            <Button
              className="register-event-action-btn"
              icon="remove"
              labelPosition="right"
              floated="left"
              onClick={this.handleCloseModal}
              content="Cancel"
            />
            {typeForm !== 'view' ? <Button
              className="register-event-action-btn"
              primary
              icon={typeForm === 'add' ? 'plus' : 'cogs'}
              labelPosition="right"
              floated="right"
              content={typeForm === 'add' ? 'Create' : 'Edit'}
              onClick={this.onSubmit}
            /> : null}
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

CustomModal.propTypes = {
  initialValues: PropTypes.object,
  openModal: PropTypes.bool,
  typeForm: PropTypes.string,
  closeModal: PropTypes.func,
  eventItem: PropTypes.object,
  // selectedId: PropTypes.string,
  // handleReturnMessage: PropTypes.func,
  // data: PropTypes.object,
  // callServiceDropDownList: PropTypes.func,
};

export default CustomModal;
