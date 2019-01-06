import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Dropdown, Icon } from 'semantic-ui-react';

const StyledContainer = styled.div`
   position: relative;
   & .dropdown > .icon {
    padding: 18px 17px;
    position: relative;
    left: -5px;
    top: -7px;
   }
`;

export const ContextMenu = (props) => {
  const { icon } = props;
  return (
    <StyledContainer>
      <Dropdown icon={icon} simple floating>
        <Dropdown.Menu style={{ right: 0, left: 'auto' }}>
          <Dropdown.Item><Icon name="upload" />Carica</Dropdown.Item>
          <Dropdown.Item><Icon name="download" />Scarica</Dropdown.Item>
          <Dropdown.Item><Icon name="eye" />Vedi Online</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Header>Altre azioni</Dropdown.Header>
          <Dropdown.Item><Icon name="delete" />Cancella</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </StyledContainer>
  );
};

export const MenuActions = (props) => {
  const { icon, actions, otherActions } = props;
  return (
    <StyledContainer>
      <Dropdown icon={icon}>
        <Dropdown.Menu style={{ right: 0, left: 'auto' }}>
          { actions.map((action) => <Dropdown.Item key={action.label} onClick={action.action}><Icon name={action.icon} />{action.label}</Dropdown.Item>)}
          { otherActions.length > 0 && [
            <Dropdown.Divider key="divider" />,
            <Dropdown.Header key="actions">Altre azioni</Dropdown.Header>,
          ]}
          { otherActions.map((action) => <Dropdown.Item key={action.label} onClick={action.action}><Icon name={action.icon} />{action.label}</Dropdown.Item>)}
        </Dropdown.Menu>
      </Dropdown>
    </StyledContainer>
  );
};


export default ContextMenu;

ContextMenu.propTypes = {
  icon: PropTypes.string,
};


MenuActions.propTypes = {
  icon: PropTypes.string,
  actions: PropTypes.array,
  otherActions: PropTypes.array,
};
