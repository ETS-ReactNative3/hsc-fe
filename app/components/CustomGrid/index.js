import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image } from 'semantic-ui-react';
// import styled from 'styled-components';

// import custom column to render
// const CusColumn = styled(Grid.Column)`
//   border: 1px solid black;
// `;

export class CustomGrid extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      activeIndex: 0,
      gridData: [],
    };
  }

  componentWillMount() {
    this.setState({
      gridData: this.props.listItem,
    });
    this.prepareDataToRender();
  }

  prepareDataToRender = () => {
    const gridData = this.props.listItem;
    const arrData = [];
    gridData.forEach((item, idx) => {
      const columnGrid = (
        <Grid columns={1} celled>
          <Grid.Row key={item.key ? item.key : idx}>
            <Grid.Column width={4}>
              <Image src="https://react.semantic-ui.com/images/wireframe/image.png" />
            </Grid.Column>
            <Grid.Column width={9}>
              {item.name}
            </Grid.Column>
            <Grid.Column width={3}>
              <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
      arrData.push(columnGrid);
    });
    return arrData;
  }

  render() {
    // const { gridData } = this.state;
    const tableList = this.prepareDataToRender();
    return (
      <div>
        {tableList}
      </div>
    );
  }
}

CustomGrid.propTypes = {
  listItem: PropTypes.any,
};

export default CustomGrid;
