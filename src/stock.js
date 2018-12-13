import { Axios } from './client';

/**
 * @function
 * @name getStockSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getStockSchema() {
  return Axios.get('/stocks/schema');
}

/**
 * @function
 * @name getStocks
 *
 * @param params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getStocks(params) {
  return Axios.get('/stocks', params);
}

/**
 * @function
 * @name getStock
 *
 * @param stockID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getStock(stockID) {
  return Axios.get(`/stocks/${stockID}`);
}

/**
 * @function
 * @name postStock
 *
 * @param stock
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postStock(stock) {
  return Axios.post('/stocks', stock);
}

/**
 * @name putStock
 *
 * @param stock
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putStock(stock) {
  return Axios.put(`/stocks/${stock._id}`, stock); //eslint-disable-line
}

/**
 * @function
 * @name patchStock
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchStock() {
  return Axios.patch(`/stocks/${stock._id}`, stock); //eslint-disable-line
}

/**
 * @name deleteStock
 *
 * @param stockID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteStock(stockID) {
  return Axios.delete(`/stocks/${stockID}`);
}
