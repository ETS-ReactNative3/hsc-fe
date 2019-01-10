import React from 'react';
import PropTypes from 'prop-types';
import './css/style.css';

class PureTicker extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      textData: [],
    };
  }

  renderData = () => {
    const data = this.props.tickerData;
    const resultData = [];
    if (data && data.length) {
      data.forEach((item) => {
        const divElement = (
          <div key={item.key} className="ticker__item">{item.name} - {item.value}</div>
        );
        resultData.push(divElement);
      });
    }
    return resultData;
  }

  render() {
    const renderData = this.renderData();
    return (
      <div className="ticker-wrap">
        <div className="ticker">
          {/* <div className="ticker__item">Letterpress chambray brunch.</div>
          <div className="ticker__item">Vice mlkshk crucifix beard chillwave meditation hoodie asymmetrical Helvetica.</div>
          <div className="ticker__item">Ugh PBR&B kale chips Echo Park.</div>
          <div className="ticker__item">Gluten-free mumblecore chambray mixtape food truck. </div> */}
          {renderData}
        </div>
      </div>
    );
  }
}

PureTicker.propTypes = {
  tickerData: PropTypes.array,
};

export default PureTicker;
