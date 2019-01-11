import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Button, Modal, Image, Header } from 'semantic-ui-react';
import _ from 'lodash';
import FlashMessage from 'components/Forms/UI/FlashMessage';

// import OfferteService from '../../../../../../shared/services/api/offerte';
// import { handleErrorMessage } from '../../../../../../shared/lib/msgFormatter';
import { mapToInitialValues } from './initialValues';
import Validation from './validation';
import BaseForm from './baseForm';
// import BaseFormView from './baseFormView';

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

  onError = (msg) => {
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
    console.log(data);
    console.log(actions);
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
    const formatedData = {};
    console.log(data);
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

  render() {
    const { openModal, msgAlert } = this.state;
    const { typeForm, eventItem } = this.props;
    let name = '';
    const subHeader = 'Events';

    if (typeForm === 'add') {
      name = 'Add event';
    } else if (typeForm === 'edit') {
      name = 'Edit event';
    } else {
      name = 'Event detail';
    }

    return (
      <div>
        <Modal dimmer="blurring" open={openModal} closeOnDimmerClick={false} onClose={this.handleCloseModal} closeIcon>
          <Modal.Header>
            <label htmlFor>{name}</label>
            <h5 className="sub-header">{subHeader}</h5>
          </Modal.Header>

          <Modal.Content image scrolling>
            <Image size="medium" src={eventItem.imgUrl} wrapped />
            {showFlashMessage ? <FlashMessage info={msgAlert} /> : null}
            <Modal.Description>
              <Header>Event name</Header>
              {_.times(5, (i) => (
                <Image key={i} src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" style={{ paddingBottom: 5 }} />
              ))}

            </Modal.Description>
          </Modal.Content>
          <Modal.Content>
            <Formik
              ref={(c) => { this.baseForm = c; }}
              onSubmit={this.onBaseSubmit}
              validate={Validation}
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
              content="Save"
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
  typeForm: PropTypes.string,
  closeModal: PropTypes.func,
  eventItem: PropTypes.object,
  // selectedId: PropTypes.string,
  // handleReturnMessage: PropTypes.func,
  // data: PropTypes.object,
  // callServiceDropDownList: PropTypes.func,
};

export default CustomModal;
