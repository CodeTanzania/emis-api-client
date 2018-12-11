/**
 * A representation of item(i.e materials, services, staff, assets etc.) and it
 * stock that may be consumed or made available in emergency(or disaster)
 * management(or event).
 *
 * This module covers all the endpoints exposed by Emergency Information
 * Management System(EMIS) Resource Item API
 */

import Axios from './client';

/**
 * @function
 * @name getItemSchema
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getItemSchema() {
  return Axios.get('/items/schema');
}

/**
 * @function
 * @name getItems
 *
 * @param {Object} params
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getItems(params) {
  return Axios.get('/items', params);
}

/**
 * @function
 * @name getItem
 *
 * @param {string} itemID
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getItem(itemID) {
  return Axios.get(`/items/${itemID}`);
}

/**
 * @function
 * @name postItem
 *
 * @param {Object} item
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postItem(item) {
  return Axios.post(`/items`, item);
}

/**
 * @function
 * @name putItem
 *
 * @param {Object} item
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putItem(item) {
  return Axios.put(`/items/${item._id}`, items); // eslint-disable-line
}

/**
 * @function
 * @name patchItem
 *
 * @param {Object} item
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchItem(item) {
  return Axios.patch(`/items/${item._id}`, items); // eslint-disable-line
}

/**
 * @function
 * @name deleteItem
 *
 * @param {Object} itemID
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteItem(itemID) {
  return Axios.delete(`/items/${itemID}`);
}
