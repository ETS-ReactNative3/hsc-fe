export const ellipsis = (str, n) => str.length > n ? `${str.substr(0, n - 1)}...` : str;
export const fromCamelToString = (str) => str.replace(/([a-z](?=[A-Z]))/g, '$1 ');
