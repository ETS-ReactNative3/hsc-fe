import React from 'react';
import HomeTab from './components/HomeTab';
export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <HomeTab />
    );
  }
}
