import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon, Popup } from 'semantic-ui-react';

const style = {
  position: 'absolute',
  right: 1,
  marginTop: 1,
  marginRight: 0,
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
};

export const inputBtn = (props) => (<Popup
  trigger={<Button type="button" icon style={style} onClick={props.action} loading={props.loading}><Icon name={props.icon} /></Button>}
  content={props.tooltip}
/>);

inputBtn.propTypes = {
  action: PropTypes.func,
  icon: PropTypes.string,
  tooltip: PropTypes.string,
  loading: PropTypes.bool,
};

export default inputBtn;
