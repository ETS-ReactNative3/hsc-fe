import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const Required = ({ required }) => <span style={{ color: 'red', display: required ? 'inline-block' : 'none', fontSize: 10 }}><sup><Icon name="asterisk" /></sup></span>;

Required.propTypes = {
  required: PropTypes.bool,
};

export default Required;
