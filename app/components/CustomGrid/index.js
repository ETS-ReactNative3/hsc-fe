import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import NoImage from 'images/noImage.svg.png';
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
      const date = moment(item.date).format('d MMMM');
      const image = item.imgUrl;
      console.log(image);
      const logo = image !== null ? image : NoImage;
      const styleImage = image === null ? { maxHeight: '250px' } : { maxHeight: '270px' };
      const columnGrid = (
        <Grid.Column key={item.key ? item.key : idx} className="grid-event-column" width={5}>
          <div className="event-card-image border-tlr-radius">
            <Image style={styleImage} src={logo} />
          </div>
          <div className="event-card-content card-padding">
            <div className="event-card-meta">
              <span>By <a href="https://www.google.com/">{item.host.name}</a></span>
              <time>{date}</time>
            </div>
            <article className="event-card-article">
              <h2>{item.name}</h2>
              <p>{item.shortDescription}</p>
              {/* <Image src="https://react.semantic-ui.com/images/wireframe/media-paragraph.png" /> */}
            </article>
          </div>
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
