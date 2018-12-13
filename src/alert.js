/**
 * A representation of an entity which provides(or receives) disaster
 * notifications to(or from) source(s)
 *
 * This module covers all the endpoints exposed by Emergency Information
 * Management System(EMIS) Alert API
 */

import { Axios } from './client';

/**
 * @function
 * @name getAlertSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAlertSchema() {
  return Axios.get('/alerts/schema');
}

/**
 * @function
 * @name getAlerts
 *
 * @param {Object} params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAlerts(params) {
  return Axios.get('/alerts', { params });
}

/**
 * @function
 * @name getAlert
 *
 * @param {string} alertID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAlert(alertID) {
  return Axios.get(`/alerts/${alertID}`);
}

/**
 * @function
 * @name postAlert
 *
 * @param {Object} alert
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postAlert(alert) {
  return Axios.post('/alerts', alert);
}

/**
 * @function
 * @name putAlert
 *
 * @param {Object} alert
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putAlert(alert) {
  return Axios.put(`/alerts/${alert._id}`, alert); //eslint-disable-line
}

/**
 * @function
 * @name patchAlert
 *
 * @param {Object} alert
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchAlert(alert) {
  return Axios.put(`/alerts/${alert._id}`, alert); //eslint-disable-line
}

/**
 * @function
 * @name deleteAlert
 *
 * @param {Object} alertID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteAlert(alertID) {
  return Axios.delete(`/alerts/${alertID}`);
}
