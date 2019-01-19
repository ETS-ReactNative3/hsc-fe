export const validate = (values) => {
  const arrKey = Object.keys(values);
  const errors = {};
  arrKey.forEach((key) => {
    if (typeof (values[key]) === 'string' && values[key] === '' && key.indexOf('rq_') !== -1) {
      errors[key] = `${key.slice(3)} \u00e0 richiesto`;
    }
  });
  return errors;
};
export default validate;
