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
      tikerData: [],
    };
  }
  componentWillMount() {
    this.getDataForTicker();
  }

  getDataForTicker = () => {
    const tickerData = [
      { key: 1, name: 'VIC', value: '7.6' },
      { key: 2, name: 'VNM', value: '8.1' },
      { key: 3, name: 'VCB', value: '7.6' },
      { key: 4, name: 'GAS', value: '6.5' },
      { key: 5, name: 'SAB', value: '6.7' },
      { key: 6, name: 'MSN', value: '6.8' },
      { key: 7, name: 'CTG', value: '5.2' },
      { key: 8, name: 'VRE', value: '5.7' },
      { key: 9, name: 'PLX', value: '5.8' },
      { key: 10, name: 'HPG', value: '5.5' },
      { key: 11, name: 'VJC', value: '5.9' },
      { key: 12, name: 'NVL', value: '8.1' },
      { key: 13, name: 'VPB', value: '7.6' },
      { key: 14, name: 'MBB', value: '6.5' },
      { key: 15, name: 'MWG', value: '6.7' },
      { key: 16, name: 'FPT', value: '6.8' },
      { key: 17, name: 'STB', value: '5.2' },
      { key: 18, name: 'ROS', value: '5.7' },
      { key: 19, name: 'PNJ', value: '5.8' },
      { key: 20, name: 'SSI', value: '5.5' },
      { key: 21, name: 'SBT', value: '5.9' },
      { key: 22, name: 'DHG', value: '8.1' },
      { key: 23, name: 'REE', value: '7.6' },
      { key: 24, name: 'DPM', value: '6.5' },
      { key: 25, name: 'GMD', value: '6.7' },
      { key: 26, name: 'CII', value: '6.8' },
      { key: 27, name: 'KDC', value: '5.2' },
      { key: 28, name: 'BMP', value: '5.7' },
      { key: 29, name: 'HSG', value: '5.8' },
      { key: 30, name: 'CHB', value: '9.9' },
    ];
    this.setState({
      tickerData,
    });
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
    const { tickerData } = this.state;
    const isLoginPage = Object.keys(this.props.authenticate).length > 0 && this.props.authenticate.data.access_token ? 0 : 1;
    // const userName = localStorage.getItem('username');
    // const userRole = 'Admin';
    const listItem = [
      { key: '/', active: true, name: 'Stock Market', icon: 'chart bar' },
      { key: 'home', name: 'Events', icon: 'calendar alternate' },
      { key: 'features', name: 'Upcoming Events', icon: 'chart line' },
    ];
    const userName = 'Diec Tin Toan';
    const userRole = 'Admin';

    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - HSC"
          defaultTitle="HSC"
        >
          <meta name="description" content="HSC Application" />
        </Helmet>
        <div className={!isLoginPage ? 'body-content' : 'body-content-login'}>
          <Grid style={{ background: '#e9ebee' }}>
            <Grid.Row width={16}>
              {
                this.props.location.pathname !== '/login' ?
                  // <div style={{ width: 150, position: 'fixed', zIndex: '100', left: 0 }} className="left-block-content">
                  <div style={{ width: '100%', position: 'fixed', zIndex: '100', left: 0 }}>
                    <CustomMenu listItem={listItem} userName={userName} userRole={userRole} location={this.props.location} history={history} />
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
              <PureTicker tickerData={tickerData} />
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
