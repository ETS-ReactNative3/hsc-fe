import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import FlashMessage from 'components/Forms/UI/FlashMessage';

import Validation from './validation';
import BaseForm from './baseForm';
import { mapToInitialValues } from './initialValues';
import { execAuthenticate } from '../../actions';
import Auth from '../../index';
import './css/styles.css';

export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowResetPassword: false,
      isLogin: false,
      actionsOfForm: null,
      showError: false,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.status && nextProps.auth !== this.props.auth) {
      if (nextProps.auth.status === 200) {
        this.setState({ isLogin: true });
      } else {
        this.setState({ showError: true });
      }
      if (this.state.actionsOfForm) {
        this.state.actionsOfForm.setSubmitting(false);
      }
    }
  }

  onSubmit = () => {
    this.baseForm.submitForm();
  };

  onBaseSubmit = (values, actions) => {
    this.setState({
      actionsOfForm: actions,
    });
    this.props.authenticate(values);
  };

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.baseForm.submitForm();
    }
  }
  render() {
    const { showError } = this.state;
    let contentMsg = {};
    const getError = this.props.auth.data ? this.props.auth.data.detail : '';
    if (getError) {
      contentMsg = {
        content: getError,
        icon: 'remove',
        isSuccess: false,
      };
    }
    const LoginLayout = (
      <Grid className="container-login">
        <Grid.Row className="main-form">
          <Grid.Column width={16} className="logo">
            <img src="/logoteamjoy.png" width={150} height={90} alt={''} style={{ margin: '5px' }} />
          </Grid.Column>
          <Grid.Column width={16}>
            <Formik
              ref={(c) => { this.baseForm = c; }}
              initialValues={this.props.initialValues ? mapToInitialValues(this.props.initialValues) : mapToInitialValues({})}
              onSubmit={this.onBaseSubmit}
              validate={Validation}
              render={(props) => (
                <BaseForm
                  handleKeyPress={this.handleKeyPress}
                  {...props}
                />
              )}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
    return (
      <div>
        {showError ? <FlashMessage info={contentMsg} /> : null}
        {this.state.isLogin ? <Auth isLogin={this.state.isLogin} /> : LoginLayout}
      </div>
    );
  }
}
Login.propTypes = {
  authenticate: PropTypes.func,
  auth: PropTypes.object,
  initialValues: PropTypes.object,
};

const mapStateToProps = (state) => {
  const authObj = state.get('auth').toJS();
  return {
    auth: authObj.authenticate,
  };
};
const mapDispatchToProps = (dispatch) => ({
  authenticate: (data) => {
    dispatch(execAuthenticate(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
