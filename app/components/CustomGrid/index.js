import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Button } from 'semantic-ui-react';
import './css/style.css';

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
        <Grid.Column key={item.key ? item.key : idx} className="grid-event-column" width={5}>
          <Image height="220px" src={item.imgUrl} />
          <h5>{item.name}</h5>
          <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" />
          {/* <Image src="https://react.semantic-ui.com/images/wireframe/image.png" /> */}
          <div className="hover-view-event">
            <Button className="btn-action-view" content="View" onClick={() => this.props.clickToOpen(item)} />
          </div>
        </Grid.Column>
      );
      arrData.push(columnGrid);
    });
    const lastColumn = (key) => {
      const tmpKey = `last-column-${key}`;
      return (
        <Grid.Column key={tmpKey} className="last-column-event" width={5}>
        </Grid.Column>
      );
    };
    if (arrData.length % 3 === 2) {
      arrData.push(lastColumn(1));
    } else if (arrData.length % 3 === 1) {
      arrData.push(lastColumn(1));
      arrData.push(lastColumn(2));
    }
    const rowData = (
      <Grid.Row columns={3} width={15}>
        {arrData}
      </Grid.Row>
    );
    return rowData;
  }

  render() {
    const tableList = this.prepareDataToRender();
    return (
      <Grid columns={1}>
        {tableList}
      </Grid>
    );
  }
}

CustomGrid.propTypes = {
  listItem: PropTypes.any,
  clickToOpen: PropTypes.func,
};

export default CustomGrid;
