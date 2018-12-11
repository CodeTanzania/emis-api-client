import Axios from './client';

export function getStockSchema() {
  return Axios.get('/stocks/schema');
}

export function getStocks(params) {
  return Axios.get('/stocks', params);
}

export function getStock(stockID) {
  return Axios.get(`/stocks/${stockID}`);
}

export function postStock(stock) {
  return Axios.post('/stocks', stock);
}

export function putStock(stock) {
  return Axios.put(`/stocks/${stock._id}`, stock); //eslint-disable-line
}

export function patchStock() {
  return Axios.patch(`/stocks/${stock._id}`, stock); //eslint-disable-line
}

export function deleteStock(stockID) {
  return Axios.delete(`/stocks/${stockID}`);
}
