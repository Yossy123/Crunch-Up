const DEFAULT_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbwVgWHqQk9lBUCEWC1H3Zm22rBkZEJJb3MSnjKY54mhhKqRDXtgDgOYGZVl0bKIWv7H/exec';
const SHEETS_URL = import.meta.env.VITE_SHEETS_WEBAPP_URL || DEFAULT_SHEETS_URL;

export const submitOrderToSheet = async (order) => {
  if (!SHEETS_URL) return;
  try {
    await fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(order)
    });
  } catch (err) {
    console.warn('Gagal mencatat pesanan ke Google Sheet:', err);
  }
};
