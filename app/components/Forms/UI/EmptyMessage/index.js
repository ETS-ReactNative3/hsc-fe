import React from 'react';
import PropTypes from 'prop-types';

export const EmptyMessage = ({ color, children }) => {
  const style = {
    color: color || '#ccc',
    textAlign: 'center',
    fontStyle: 'italic',
  };

  return <div style={style}>{children}</div>;
};

export const AddableEmptyMessage = () => <div style={{ textAlign: 'center', color: '#999', fontSize: 12 }}><i>- Nessun elemento presente -</i></div>;

EmptyMessage.propTypes = {
  children: PropTypes.string,
  color: PropTypes.string,
};

export default EmptyMessage;
