import { formatMessage } from '../../../containers/TextProvider';
export const handleErrorMessage = (errors) => {
  const msg = {
    icon: 'remove',
    content: '',
    isSuccess: false,
  };
  let errorMsg = '';
  if (errors.data) {
    if (errors.data.message) {
      errorMsg = errors.data.message;
    } else if (errors.data.validation_messages) {
      const validationMessage = errors.data.validation_messages;
      const arrValidation = Object.getOwnPropertyNames(validationMessage);
      arrValidation.forEach((item, idx) => {
        const arrItem = Object.getOwnPropertyNames(validationMessage[item]);
        if (idx === arrValidation.length - 1) {
          errorMsg += `${item.toUpperCase()}: ${validationMessage[item][arrItem[0]]}.`;
        } else {
          errorMsg += `${item.toUpperCase()}: ${validationMessage[item][arrItem[0]]}.\n`;
        }
      });
    } else {
      errorMsg = errors.data.detail;
    }
  }
  switch (errors.status) {
    case 400:
      msg.content = errorMsg;
      break;
    case 401:
      msg.content = formatMessage('err', null, 'authorization');
      break;
    case 500:
      msg.content = errorMsg;
      break;
    case 422:
      msg.content = errorMsg;
      break;
    default:
      msg.content = 'Error occur!';
      break;
  }
  return msg;
};

export const handleSuccessMessage = (name, typeAction, msgRes) => {
  const msg = {
    icon: 'check',
    content: '',
    isSuccess: true,
  };

  switch (typeAction) {
    case 'add':
      msg.content = formatMessage('text', name, 'add');
      break;
    case 'edit':
      msg.content = formatMessage('text', name, 'edit');
      break;
    case 'load':
      msg.content = formatMessage('text', name, 'load');
      break;
    default:
      msg.content = formatMessage('text', name, 'delete');
      break;
  }

  if (msgRes) {
    msg.content = msgRes;
  }

  return msg;
};
