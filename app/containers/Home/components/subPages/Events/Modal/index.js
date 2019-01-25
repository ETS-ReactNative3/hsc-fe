import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Modal, Image, Label } from 'semantic-ui-react';
// import _ from 'lodash';
import FlashMessage from 'components/Forms/UI/FlashMessage';

// import OfferteService from '../../../../../../shared/services/api/offerte';
import { handleErrorMessage } from '../../../../../../shared/lib/msgFormatter';
import { mapToInitialValues } from './initialValues';
// import Validation from './validation';
import BaseForm from './baseForm';
import HomeService from '../../../../../../shared/services/api/home/index';

let showFlashMessage = false;
class CustomModal extends React.Component {
  constructor(props) {
    super(props);
    this.message = {};
    this.state = {
      openModal: false,
      msgAlert: {},
    };
  }

  componentWillMount() {
    this.setState({
      openModal: this.props.openModal,
    });
    showFlashMessage = false;
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

  onError = (errors) => {
    const msg = handleErrorMessage(errors);

    this.setState({
      msgAlert: msg,
    }, this.handleShowFlashMessage());
  };

  onSwitchTab = (isGenerali) => {
    this.setState({
      tabName: isGenerali ? 'Corporate' : 'Privato',
    });
  };

  handleCallService = (data, actions) => {
    // ToDo
    HomeService.addNewSubcriber(this.props.eventItem.id, data).then((res) => {
      this.props.handleReturnMessage('Subcriber', 'add');
      actions.setSubmitting(false);
      this.handleCloseModal(res);
    }).catch((errors) => {
      this.onError(errors);
      actions.setSubmitting(false);
    });
  };

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
    if (data) {
      formatedData = {
        first_name: data.firstName ? data.firstName : '',
        last_name: data.lastName ? data.lastName : '',
        email: data.email ? data.email : '',
        phone: data.phoneNumber ? `+84${data.phoneNumber}` : '',
        gender: data.subGender ? data.subGender : 'O',
        status: data.status ? data.status : 'P',
        address: data.address ? data.address : 'DEFAULT',
      };
    }
    return formatedData;
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
    setTimeout(() => {
      showFlashMessage = false;
      this.forceUpdate();
    }, 6000);
  };

  splitDescription = (str) => {
    if (str) {
      const arrDes = str.split('.');
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
    const { eventItem } = this.props;
    const name = eventItem.name;
    // const subHeader = eventItem.host ? `Host: ${eventItem.host.name}` : 'Event';
    const arrDes = this.splitDescription(eventItem.description);
    // if (typeForm === 'add') {
    //   name = 'Add event';
    // } else if (typeForm === 'edit') {
    //   name = 'Edit event';
    // } else {
    //   name = 'Event detail';
    // }
    return (
      <div>
        <Modal dimmer="blurring" open={openModal} closeOnDimmerClick={false} onClose={this.handleCloseModal} closeIcon>
          {showFlashMessage ? <FlashMessage info={msgAlert} /> : null}

          <Modal.Header>
            <label htmlFor>{name}</label>
            {/* <h5 className="sub-header">{subHeader}</h5> */}
          </Modal.Header>

          <Modal.Content image scrolling>
            <Image size="big" style={{ margin: '0 auto' }} src={eventItem.imgUrl} wrapped />
            <Modal.Description>
              {/* <Header>{eventItem.name}</Header> */}
              <div className="event-description">
                {/* {eventItem.description} */}
                {arrDes}
                <Label htmlFor="hostname" style={{ display: 'block', float: 'right' }}>Host: {eventItem.host.name}</Label>
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Content>
            <h3>Đăng ký review danh mục và tham gia hệ thống KH Teamjoy</h3>
            <Formik
              ref={(c) => { this.baseForm = c; }}
              onSubmit={this.onBaseSubmit}
              // validate={Validation}
              initialValues={
                this.props.initialValues
                  ? mapToInitialValues(this.props.initialValues)
                  : mapToInitialValues({})
              }
              render={(props) => <BaseForm {...props} onError={this.onError} />
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
            <Button
              className="register-event-action-btn"
              primary
              icon="check"
              labelPosition="right"
              floated="right"
              content="Register"
              onClick={this.onSubmit}
            />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

CustomModal.propTypes = {
  initialValues: PropTypes.object,
  openModal: PropTypes.bool,
  // typeForm: PropTypes.string,
  closeModal: PropTypes.func,
  eventItem: PropTypes.object,
  // selectedId: PropTypes.string,
  handleReturnMessage: PropTypes.func,
  // onError: PropTypes.func,
  // data: PropTypes.object,
  // callServiceDropDownList: PropTypes.func,
};

export default CustomModal;
