import React from 'react';
import AnagraficheTab from './components/AnagraficheTab';
export default class Anagrafiche extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <AnagraficheTab />
    );
  }
}
