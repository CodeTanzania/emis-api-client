import Axios from './client';

/**
 * @function
 * @name getWarehouseSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getWarehouseSchema() {
  return Axios.get('/warehouses/schema');
}

/**
 * @function
 * @name getWarehouses
 *
 * @param params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getWarehouses(params) {
  return Axios.get('/warehouses', params);
}

/**
 * @function
 * @name getWarehouse
 *
 * @param warehouseID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getWarehouse(warehouseID) {
  return Axios.get(`/warehouses/${warehouseID}`);
}

/**
 * @function
 * @name postWarehouse
 *
 * @param warehouse
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postWarehouse(warehouse) {
  return Axios.post('/warehouses', warehouse);
}

/**
 * @function
 * @name putWarehouse
 *
 * @param warehouse
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putWarehouse(warehouse) {
  return Axios.put(`/warehouses/${warehouse._id}`, warehouse); //eslint-disable-line
}

/**
 * @function
 * @name patchWarehouse
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchWarehouse() {
  return Axios.patch(`/warehouses/${warehouse._id}`, warehouse); //eslint-disable-line
}

/**
 * @function
 * @name deleteWarehouse
 *
 * @param warehouseID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteWarehouse(warehouseID) {
  return Axios.delete(`/warehouses/${warehouseID}`);
}
