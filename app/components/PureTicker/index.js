import React from 'react';
// import PropTypes from 'prop-types';
import './css/style.css';

class PureTicker extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      textData: [],
    };
  }

  render() {
    const { textData } = this.state;
    console.log(textData);
    return (
      <div className="ticker-wrap">
        <div className="ticker">
          <div className="ticker__item">Letterpress chambray brunch.</div>
          <div className="ticker__item">Vice mlkshk crucifix beard chillwave meditation hoodie asymmetrical Helvetica.</div>
          <div className="ticker__item">Ugh PBR&B kale chips Echo Park.</div>
          <div className="ticker__item">Gluten-free mumblecore chambray mixtape food truck. </div>
        </div>
      </div>
    );
  }
}

PureTicker.propTypes = {};

export default PureTicker;
