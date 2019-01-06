/**
*
* Validation Error
*
*/

import React from 'react';
import PropTypes from 'prop-types';

function Validation(props) {
  const messages = [];
  let msg = '';
  props.types.map((type) => {
    switch (type) {
      case 'required':
        if (!props.value || props.value === '') {
          msg = `* ${props.field} is required`;
          messages.push(msg);
        }
        break;
      case 'maxlength':
        if (props.value.length >= 100) {
          msg = `* Max length of ${props.field}is 100 characters`;
          messages.push(msg);
        }
        break;
      default:
        msg = '';
        messages.push(msg);
        break;
    }
    return true;
  });

  // If we have items, render them
  return (
    <div className="container-error">
      {messages.map((msgDisplay) => <span>{msgDisplay}</span>)}
    </div>
  );
}

Validation.propTypes = {
  types: PropTypes.array,
  // value: PropTypes.string,
  // field: PropTypes.string,
};

export default Validation;
