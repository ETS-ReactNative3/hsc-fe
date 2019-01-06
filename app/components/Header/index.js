import React from 'react';
import A from './A';
import Img from './Img';
import Banner from './banner.jpg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div>
        <A href="https://twitter.com/mxstbr">
          <Img src={Banner} alt="react-boilerplate - Logo" />
        </A>
      </div>
    );
  }
}

export default Header;
