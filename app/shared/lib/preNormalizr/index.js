import omit from 'lodash/omit';

/*
* data is the json parsed returned from apigility
* look at data.json for an example
*/
const preNormalize = (data) => {
  if (!data._embedded) { // eslint-disable-line
    return {};
  }
  // only one key in _embedded
  const embedded = data._embedded[Object.keys(data._embedded)[0]]; // eslint-disable-line

  if (!embedded) {
    return {};
  }
  // second level
  const embeddedTwice = Object.keys(embedded[0]._embedded); // eslint-disable-line

  const expecteData = embedded.map((current) => {
    const out = Object.assign({}, current);

    embeddedTwice.forEach((et) => {
      out[et] = current._embedded[et]; // eslint-disable-line
    });

    return omit(out, '_embedded');
  });

  return expecteData;
};

export default preNormalize;
