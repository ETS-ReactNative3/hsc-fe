import React from 'react';
// import PropTypes from 'prop-types';
import { Icon, Grid, Tab } from 'semantic-ui-react';
import './css/styles.css';

class AnagraficheTab extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      activeIndex: 0,
      activeName: 'Liste',
      isReloadList: false,
    };
  }

  handleTabChange = (e, { activeIndex }) => {
    this.setState({
      activeIndex,
      activeName: this.capitalizeFirstLetter(e.target.text),
      isReloadList: true,
    });
  };

  capitalizeFirstLetter = (str) => {
    const temp = str.toLowerCase();
    return temp[0].toUpperCase() + temp.slice(1);
  };

  handleDisableReloadList = () => {
    this.setState({
      isReloadList: false,
    });
  };
  render() {
    const { activeIndex, activeName } = this.state;
    const panes = [
      {
        menuItem: 'Home',
        render: () => (
          <Tab.Pane>
            <h1>Home</h1>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Features',
        render: () => (
          <Tab.Pane>
            <h1>Features</h1>
          </Tab.Pane>
        ),
      },
    ];

    return (
      <div>
        <Grid className="header-list">
          <Grid.Row>
            <Grid.Column computer={2} tablet={2} largeScreen={1} mobile={2}>
              <Icon name="id card" size="huge" />
            </Grid.Column>
            <Grid.Column computer={14} tablet={14} largeScreen={15} mobile={14}>
              <h2>HSC {activeName}</h2>
              <span>Test HSC {activeName}</span>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Tab panes={panes} activeIndex={activeIndex} onTabChange={this.handleTabChange} />
      </div>
    );
  }
}

AnagraficheTab.propTypes = {
  // elementId: PropTypes.string,
};

export default AnagraficheTab;