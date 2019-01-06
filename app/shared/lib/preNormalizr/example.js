import { normalize, schema } from 'normalizr'; // eslint-disable-line
import preNormalize from './';
import rawData from './data.json';

const preNormalizedData = preNormalize(rawData);

const indirizzoSchema = new schema.Entity('indirizzi', {}, { idAttribute: 'id' });
const recapitoSchema = new schema.Entity('recapiti', {}, { idAttribute: 'id' });

const anagraficaSchema = new schema.Entity('anagrafiche', {
  indirizzi: [indirizzoSchema],
  recapiti: [recapitoSchema],
}, { idAttribute: 'id' });

const normalizedData = normalize(preNormalizedData, [anagraficaSchema]);

console.log(normalizedData); // eslint-disable-line

/*
SOMETHING LIKE THAT
{ entities:
   { recapiti:
      { 'a5fb4639-c93e-11e7-bb98-005056a319f1': [Object],
        'ecfa393b-cb75-11e7-bb98-005056a319f1': [Object],
        'ecfa4af2-cb75-11e7-bb98-005056a319f1': [Object],
        '7912e9d4-c636-11e7-bb98-005056a319f1': [Object],
        '3e82a947-c62e-11e7-bb98-005056a319f1': [Object],
        '3e82b7f1-c62e-11e7-bb98-005056a319f1': [Object],
        'e5ab4008-c941-11e7-bb98-005056a319f1': [Object],
        'e5ab533b-c941-11e7-bb98-005056a319f1': [Object] },
     anagrafiche:
      { '41a554d0-c634-11e7-bb98-005056a319f1': [Object],
        '47bc8741-c62f-11e7-bb98-005056a319f1': [Object],
        '7912d848-c636-11e7-bb98-005056a319f1': [Object],
        '7dc47d68-c62d-11e7-bb98-005056a319f1': [Object],
        '9293034f-c62b-11e7-bb98-005056a319f1': [Object],
        'a20a2dec-c61b-11e7-bb98-005056a319f1': [Object],
        'c1c8c5c8-c946-11e7-bb98-005056a319f1': [Object],
        'd56b5c8f-c941-11e7-bb98-005056a319f1': [Object],
        'e6d82fb8-c61b-11e7-bb98-005056a319f1': [Object] },
     indirizzi:
      { '05df8d2e-c61b-11e7-bb98-005056a319f1': [Object],
        '3e8297b6-c62e-11e7-bb98-005056a319f1': [Object],
        'e5ab2e1e-c941-11e7-bb98-005056a319f1': [Object] } },
  result:
   [ '41a554d0-c634-11e7-bb98-005056a319f1',
     '47bc8741-c62f-11e7-bb98-005056a319f1',
     '7912d848-c636-11e7-bb98-005056a319f1',
     '7dc47d68-c62d-11e7-bb98-005056a319f1',
     '9293034f-c62b-11e7-bb98-005056a319f1',
     'a20a2dec-c61b-11e7-bb98-005056a319f1',
     'c1c8c5c8-c946-11e7-bb98-005056a319f1',
     'd56b5c8f-c941-11e7-bb98-005056a319f1',
     'e6d82fb8-c61b-11e7-bb98-005056a319f1' ] }

*/
