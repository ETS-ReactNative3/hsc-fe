export const currencyFormatter = new Intl.NumberFormat('it-IT', {
  style: 'currency',
  currency: 'EUR',
});

export const numberFormatter = new Intl.NumberFormat('it-IT');

export default currencyFormatter;
