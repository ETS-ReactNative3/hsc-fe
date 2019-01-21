import moment from 'moment';

export const formatDataLocation = (data) => {
  const street = data.street && data.street !== '' ? `${data.street}` : '';
  const streetNumber = data.streetNumber && data.streetNumber !== '' ? `, ${data.streetNumber}` : '';
  const cap = data.cap && data.cap !== '' ? `, ${data.cap}` : '';
  const city = data.city && data.city !== '' ? `, ${data.city}` : '';
  const provinceShort = data.provinceShort && data.provinceShort !== '' ? `, ${data.provinceShort}` : '';
  const country = data.country && data.country !== '' ? `, ${data.country}` : '';
  let address = street + streetNumber + cap + city + provinceShort + country;
  if (address[0] === ',') {
    address = address.slice(1, address.length);
  }
  return address;
};

export const formatPlaceData = (place) => {
  const resultPlace = {
    street: place.street,
    streetNumber: place.streetNumber,
    cap: place.cap,
    city: place.city,
    provinceShort: place.provinceShort,
    id: place.id,
    country: place.country,
    countryShort: place.countryShort,
  };
  return resultPlace;
};

// Format Date from DD/MM/YYYY HH:mm:ss to MM/DD/YYYY HH:mm:ss for creating a new Date
export const formatDateTime = (strDate) => {
  if (strDate && strDate !== '') {
    const arr = strDate.split('T');
    const arrDay = arr[0].split('-');
    return `${arrDay[2]}-${arrDay[1]}-${arrDay[0]}`;
  }
  return null;
};

export const formatDateRequest = (strDate) => {
  if (strDate && strDate !== '') {
    const arr = strDate.split('/');
    return `${arr[2]}-${arr[1]}-${arr[0]}`;
  }
  return null;
};

export const formatDateInput = (strNum) => {
  if (strNum) {
    const timestamp = moment.unix(strNum).utc();
    return timestamp.format('DD/MM/YYYY');
  }
  return null;
};

export const formatDateTimeInput = (strNum, isTextView) => {
  if (strNum) {
    const timestamp = moment.unix(strNum).utc();
    const date = new Date(timestamp.format('MM-DD-YYYY hh:mm A'));
    if (isTextView) {
      return timestamp.format('DD/MM/YYYY hh:mm A');
    }
    // Format date in case 00:mm:00. Moment is invalid in this case
    if (date.getHours() === 0) {
      const dateTemp = timestamp.format('DD/MM/YYYY hh:mm:ss');
      const minutes = date.getMinutes();
      return dateTemp.slice(0, 10).concat(` 00:${minutes < 10 ? `0${minutes}` : minutes}:00`);
    }
    return timestamp.format('DD/MM/YYYY hh:mm:ss');
  }
  return null;
};

export const formatDateTimeRequest = (strDateTime) => {
  if (strDateTime && strDateTime !== '') {
    const arr = strDateTime.split(' ');
    const arrDate = arr[0].split('/');
    if (arr[1]) {
      if (arr[1].length === 5) {
        return `${arrDate[2]}-${arrDate[1]}-${arrDate[0]} ${arr[1]}:00`;
      }
    }
    return `${arrDate[2]}-${arrDate[1]}-${arrDate[0]} ${arr[1]}`;
  }
  return null;
};

export const isEmptyLocation = (obj) => {
  if (!obj.street && !obj.streetNumber && !obj.city && !obj.provinceShort && !obj.cap && !obj.country) {
    return true;
  }
  return false;
};

export const formatFileName = (str) => {
  if (str && str !== '') {
    const lastCharacter = str.lastIndexOf('/');
    const name = str.slice(lastCharacter + 1, str.length);
    return name;
  }
  return '';
};
export const formatMoney = (number) => number ? Number(number) : 0;
export const formatNumberView = (number) => number ? Number(number).toLocaleString('de-DE') : '';
export const formatNumberInput = (number) => {
  if (number) {
    const arr = number.split('.');
    return arr[1] === '00' ? arr[0] : number;
  }
  return '';
};
