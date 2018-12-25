import React from 'react';
import PropTypes from 'prop-types';

const style = {
  color: 'red',
  position: 'relative',
  fontSize: 10,
  marginTop: 0,
  width: '100%',
};

const styleCentered = Object.assign({}, style);
styleCentered.textAlign = 'center';
styleCentered.marginLeft = -15;

const Error = ({ centered, children }) => (
  <div style={!centered ? style : styleCentered}>{children}</div>
);

Error.propTypes = {
  children: PropTypes.string,
  centered: PropTypes.bool,
};

export default Error;
