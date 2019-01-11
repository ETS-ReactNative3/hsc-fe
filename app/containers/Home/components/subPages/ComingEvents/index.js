import React from 'react';
// import PropTypes from 'prop-types';
import { Grid, Table } from 'semantic-ui-react';
class ComingEvent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      activeIndex: 0,
      activeName: 'Viet Ngu',
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
      </div>
    );
  }
}

ComingEvent.propTypes = {
  // elementId: PropTypes.string,
};

export default ComingEvent;
