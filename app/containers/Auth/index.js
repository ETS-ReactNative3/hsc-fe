/**
 *
 * Auth Component
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import Login from './components/Login';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }
  render() {
    if (this.props.authenticate && this.props.authenticate.data && this.props.authenticate.data.access_token) {
      return <Redirect to="/anagrafiche" />;
    }
    return (
      <div>
        <Login />
      </div>
    );
  }
}

Auth.propTypes = {
  authenticate: PropTypes.object,
};

const mapStateToProps = (state) => {
  const authObj = state.get('auth').toJS();
  return {
    authStatus: authObj.authenticate.status,
    authenticate: authObj.authenticate,
  };
};
const mapDispatchToProps = () => ({

});
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
