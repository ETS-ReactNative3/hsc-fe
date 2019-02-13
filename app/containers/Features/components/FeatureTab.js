import React from 'react';
// import PropTypes from 'prop-types';
import { Grid, Image } from 'semantic-ui-react';
import StockMarket from 'images/Note.jpg';
import './css/styles.css';

class FeatureTab extends React.Component {
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
    return (
      <div>
        <Grid className="header-list">
          <Grid.Row>
            <Grid.Column computer={16} tablet={16} largeScreen={16} mobile={16} style={{ paddingTop: '20px' }}>
              <Image src={StockMarket} size="massive" style={{ width: '100%' }} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

FeatureTab.propTypes = {
  // elementId: PropTypes.string,
};

export default FeatureTab;
