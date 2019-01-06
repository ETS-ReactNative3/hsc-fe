import _ from 'lodash';

export const getErrors = (errors) => {
  const validationErrors = _.get(errors, 'data.validation_messages') ? errors.data.validation_messages : {};
  // Iterate over object keys
  _.forOwn(validationErrors, (value, key) => {
    // Simple error: { key: { errorKey: value }} - Nested Error {key: { nestedErrorKey: { errorKey: value }}
    const data = validationErrors[key][Object.keys(validationErrors[key])[0]];
    // Check that content of key is neither null or object (nested validation)
    if (validationErrors[key] !== null && typeof data !== 'object') {
      validationErrors[key] = _.values(value)[0];
    } else if (validationErrors[key] !== null && typeof data === 'object') { // TODO: Recursive approach ?
      // Trasform nested values so obj: { nestedKey: nestedvalue } becomes obj_nestedKey: nestedValue
      _.forOwn(validationErrors[key], (nestedValue, nestedKey) => {
        validationErrors[`${key}_${nestedKey}`] = _.values(nestedValue)[0];
      });
    }
  });
  return validationErrors;
};

export default getErrors;
