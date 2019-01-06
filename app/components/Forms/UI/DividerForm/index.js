import React from 'react';
import { Grid, Divider } from 'semantic-ui-react';
import styled from 'styled-components';

const Column = styled(Grid.Column) `
  padding-top:5px!important;
  padding-bottom:5px!important;
`;

export default () => (
  <Column width={16}>
    <Divider fitted style={{ marginLeft: -20, marginRight: -20 }} />
  </Column>
);
