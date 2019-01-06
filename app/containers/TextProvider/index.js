/**
 * Generate a text message and response to the function
 *
 * @param {string} type
 *  Type of message: 'error' or 'text'.
 *
 * @param {string} name
 *  name of entity: 'customer' or 'contati' ....
 *
 * * @param {string} action
 *  action for getting this message: 'require', 'invalid', 'add', ....
 *
 * * @param {object} customObj
 *   custom for more value input....
 */
export const formatMessage = (type, name, action, customObj) => {
  let msg = '';
  if (type === 'err') {
    switch (action) {
      case 'authorization':
        msg = 'Non autorizzato';
        break;
      case 'invalid':
        msg = `${name} non è valido`;
        break;
      case 'length':
        msg = `${name} deve avere ${customObj.rqLength} caratteri`;
        break;
      case 'between':
        msg = `${name} deve avere tra ${customObj.min} e ${customObj.max} caratteri`;
        break;
      case 'minLength':
        msg = `${name} deve avere almeno ${customObj.minLength} caratteri`;
        break;
      case 'maxLength':
        msg = `${name} deve avere al massimo ${customObj.maxLength} caratteri`;
        break;
      default:
        msg = `${name} è richiesto`;
        break;
    }
  } else if (type === 'confirm') {
    switch (action) {
      case 'add':
        msg = ` Sei sicuro di voler aggiungere questo ${name}?`;
        break;
      case 'edit':
        msg = ` Sei sicuro di voler modificare questo ${name}?`;
        break;
      default:
        msg = ` Sei sicuro di voler cancellare questo ${name}?`;
        break;
    }
  } else {
    switch (action) {
      case 'add':
        msg = `${name} è stato aggiunto con successo`;
        break;
      case 'edit':
        msg = `${name} è stato aggiornato con successo`;
        break;
      case 'load':
        msg = `${name} è stato caricato con successo`;
        break;
      default:
        msg = `${name} è stato cancellato con successo`;
        break;
    }
  }
  return msg;
};
