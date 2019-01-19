import React from 'react';
// import PropTypes from 'prop-types';
import { Grid, Tab } from 'semantic-ui-react';
import './css/styles.css';
import Events from './subPages/Events/index';
import Services from './subPages/Services/index';
import Posts from './subPages/Posts/index';
// import CustomGrid from '../../../components/CustomGrid';
class HomeTab extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      activeIndex: 0,
      activeName: 'Viet Ngu',
      isReloadList: false,
      listItemDemo: [
        { key: 1, id: 1, name: 'one' },
        { key: 2, id: 2, name: 'two' },
        { key: 3, id: 3, name: 'three' },
        { key: 4, id: 4, name: 'four' },
        { key: 5, id: 5, name: 'five' },
      ],
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
    const { activeIndex } = this.state;
    const panes = [
      {
        menuItem: 'Events',
        render: () => (
          <Tab.Pane>
            <Events />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Services',
        render: () => (
          <Tab.Pane>
            <Services />
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Posts',
        render: () => (
          <Tab.Pane>
            <Posts />
          </Tab.Pane>
        ),
      },
    ];

    return (
      <div>
        <Grid className="header-list">
          <Grid.Row>
            {/* <Grid.Column computer={2} tablet={2} largeScreen={1} mobile={2}>
              <Icon name="id card" size="huge" />
            </Grid.Column> */}
            {/* <Grid.Column computer={16} tablet={16} largeScreen={16} mobile={16}> */}
            {/* <h2>HSC {activeName}</h2>
              <span>Test HSC {activeName}</span> */}
            {/* </Grid.Column> */}
          </Grid.Row>
        </Grid>
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={panes}
          activeIndex={activeIndex}
          onTabChange={this.handleTabChange}
        />
      </div>
    );
  }
}

HomeTab.propTypes = {
  // elementId: PropTypes.string,
};

export default HomeTab;
