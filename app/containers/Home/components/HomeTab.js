import React from 'react';
// import PropTypes from 'prop-types';
import { Grid, Tab, Table } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import './css/styles.css';
import { CustomGrid } from '../../../components/CustomGrid';
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
    const { activeIndex, activeName } = this.state;
    const panes = [
      {
        menuItem: 'Home',
        render: () => (
          <Tab.Pane>
            <CustomGrid listItem={this.state.listItemDemo} />
            <Carousel>
              <div>
                <img alt="car1" src="https://react.semantic-ui.com/images/wireframe/image.png" />
                <p className="legend">Legend 1</p>
              </div>
              <div>
                <img alt="car2" src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
                <p className="legend">Legend 2</p>
              </div>
              <div>
                <img alt="car3" src="https://react.semantic-ui.com/images/wireframe/image.png" />
                <p className="legend">Legend 3</p>
              </div>
            </Carousel>
          </Tab.Pane>
        ),
      },
      {
        menuItem: 'Features',
        render: () => (
          <Tab.Pane>
            <Table celled inverted selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Status</Table.HeaderCell>
                  <Table.HeaderCell>Notes</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>John</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell textAlign="right">None</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jamie</Table.Cell>
                  <Table.Cell>Approved</Table.Cell>
                  <Table.Cell textAlign="right">Requires call</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Jill</Table.Cell>
                  <Table.Cell>Denied</Table.Cell>
                  <Table.Cell textAlign="right">None</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
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
            <Grid.Column computer={16} tablet={16} largeScreen={16} mobile={16}>
              <h2>HSC {activeName}</h2>
              <span>Test HSC {activeName}</span>
            </Grid.Column>
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
