/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import styled from 'styled-components';
// import { Redirect } from 'react-router';
import { Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import CustomMenu from 'components/Menu';
import PureTicker from 'components/PureTicker';
// import CustomLogout from 'components/DropdownLogout';
import { execRevokeAuth } from '../Auth/actions';
import Anagrafiche from '../Anagrafiche/Loadable';
import Home from '../Home/Loadable';
// import Auth from '../Auth/Loadable';
import './css/style.css';


const AppWrapper = styled.div`
  // max-width: calc(768px + 156px * 2);
  margin: 0 auto;
  display: flex;
  height: 100vh;
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticate: false,
    };
  }
  componentWillMount() {
  }

  logoutFunc() {
    localStorage.clear();
    window.location.href = '/login';
  }
  selectChild(routeType) {
    // const authToken = localStorage.getItem('authToken');
    if (routeType === '/') {
      return <Anagrafiche />;
    } else if (routeType === '/home') {
      return <Home />;
    }
    return true;
  }
  render() {
    const { history } = this.props;
    const isLoginPage = Object.keys(this.props.authenticate).length > 0 && this.props.authenticate.data.access_token ? 0 : 1;
    // const userName = localStorage.getItem('username');
    // const userRole = 'Admin';
    const listItem = [
      { key: '/', active: true, name: 'Editorials', icon: 'american sign language interpreting' },
      { key: 'home', name: 'Reviews', icon: 'home' },
      { key: 'features', name: 'Upcoming Events', icon: 'code' },
    ];

    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - HSC"
          defaultTitle="HSC"
        >
          <meta name="description" content="HSC Application" />
        </Helmet>
        <div className={!isLoginPage ? 'body-content' : 'body-content-login'}>
          <Grid>
            <Grid.Row width={16}>
              {
                this.props.location.pathname !== '/login' ?
                  // <div style={{ width: 150, position: 'fixed', zIndex: '100', left: 0 }} className="left-block-content">
                  <div style={{ width: '100%', position: 'fixed', zIndex: '100', left: 0 }}>
                    <CustomMenu listItem={listItem} location={this.props.location} history={history} />
                  </div> : null
              }
              <Grid.Column
                // className="right-block-content"
                width={16}
              // style={{ paddingLeft: 164 }}
              >
                {/* <Grid.Row>
                  <Grid.Column> */}
                {/* {
                      this.props.location.pathname !== '/login' ? <div>
                        <CustomLogout user={userName} profile={userRole} onLogout={this.logoutFunc} />
                      </div> : null
                    } */}
                {/* </Grid.Column>
                </Grid.Row> */}
                <Grid.Row columns={3} >
                  <Grid.Column computer={5} tablet={5} largeScreen={5} mobile={5} className="app-left-container">
                  </Grid.Column>
                  <Grid.Column computer={6} tablet={6} largeScreen={6} mobile={6} className="app-center-container">
                    <div style={{ marginTop: '80px', marginBottom: '50px' }}>
                      {
                        this.selectChild(this.props.location.pathname, this.props.authenticate)
                      }
                    </div>
                  </Grid.Column>
                  <Grid.Column computer={5} tablet={5} largeScreen={5} mobile={5} className="app-right-container">
                  </Grid.Column>
                </Grid.Row>
              </Grid.Column>
              <PureTicker />
            </Grid.Row>
          </Grid>
        </div>
      </AppWrapper>
    );
  }
}

App.propTypes = {
  location: PropTypes.object,
  authenticate: PropTypes.object,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  const authObj = state.get('auth').toJS();
  return {
    authStatus: authObj.authenticate.status,
    authenticate: authObj.authenticate,
    statusRevoke: authObj.revoke,
    location: state.toJS().route.location,
  };
};
const mapDispatchToProps = (dispatch) => ({
  logout: (token) => dispatch(execRevokeAuth(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
