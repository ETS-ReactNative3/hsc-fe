import React from 'react';
// import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { Carousel } from 'react-responsive-carousel';
import { CustomGrid } from 'components/CustomGrid';
import banner1 from 'images/Banner1.jpg';
import banner2 from 'images/banner2.png';
import banner3 from 'images/Banner3.png';
// import banner4 from 'images/Banner4.jpg';
import banner5 from 'images/Banner5.png';
import banner6 from 'images/Banner6.png';
import banner7 from 'images/Banner7.jpg';
import banner8 from 'images/Banner8.jpg';
import banner9 from 'images/Banner9.png';
// import CustomGrid from '../../../components/CustomGrid';
import CustomModal from './Modal/index';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      activeIndex: 0,
      activeName: 'Viet Ngu',
      isReloadList: false,
      listItemDemo: [
        { key: 1, id: 1, name: 'one', imgUrl: banner1 },
        { key: 2, id: 2, name: 'two', imgUrl: banner6 },
        { key: 3, id: 3, name: 'three', imgUrl: banner5 },
        { key: 4, id: 4, name: 'four', imgUrl: banner7 },
        { key: 5, id: 5, name: 'five', imgUrl: banner2 },
      ],
      openModal: false,
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

  handleOpenModal = (item) => {
    this.setState({
      openModal: true,
      eventItem: item,
    });
  }

  handleCLoseModal = () => {
    this.setState({
      openModal: false,
    });
  }

  render() {
    const { openModal, eventItem } = this.state;
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
        <Carousel>
          <div>
            <img alt="car1" src={banner9} />
            {/* <p className="legend">Legend 1</p> */}
          </div>
          <div>
            <img alt="car2" src={banner8} />
            {/* <p className="legend">Legend 2</p> */}
          </div>
          <div>
            <img alt="car3" src={banner3} />
            {/* <p className="legend">Legend 3</p> */}
          </div>
        </Carousel>
        <CustomGrid listItem={this.state.listItemDemo} clickToOpen={this.handleOpenModal} />
        {openModal ? <CustomModal
          ref={(el) => { this.form = el; }}
          handleOpenModal={this.handleOpenModal}
          closeModal={this.handleCLoseModal}
          openModal={openModal}
          eventItem={eventItem}
        /> : null}
      </div>
    );
  }
}

Events.propTypes = {
  // elementId: PropTypes.string,
};

export default Events;
