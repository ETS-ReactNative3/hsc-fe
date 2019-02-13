import React from 'react';
import FeatureTab from './components/FeatureTab';
export default class Feature extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <FeatureTab />
    );
  }
}
