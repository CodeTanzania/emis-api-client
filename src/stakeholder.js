/**
 * Stakeholder is a representation of an entity (e.g municipal, individual, agency, organization etc)
 * consisting of contact information (e.g. name, e-mail addresses, phone numbers)
 * and other descriptive information of interest in emergency(or disaster) management.
 *
 * This module covers all the endpoints exposed by Emergency Information
 * Management System(EMIS) Stakeholder API
 */

import { Axios } from './client';

/**
 * @function
 * @name getStakeholderSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getStakeholderSchema() {
  return Axios.get('/parties/schema');
}

/**
 * @function
 * @name getStakeholders
 *
 * @param {Object} params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getStakeholders(params) {
  return Axios.get('/parties', { params });
}

/**
 * @function
 * @name getStakeholder
 *
 * @param {string} stakeholderID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getStakeholder(stakeholderID) {
  return Axios.get(`/parties/${stakeholderID}`);
}

/**
 * @function
 * @name postStakeholder
 *
 * @param {Object} stakeholder
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postStakeholder(stakeholder) {
  return Axios.post('/parties', stakeholder);
}

/**
 * @function
 * @name putStakeholder
 *
 * @param {Object} stakeholder
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putStakeholder(stakeholder) {
  return Axios.put(`/parties/${stakeholder._id}`, stakeholder); // eslint-disable-line
}

/**
 * @function
 * @name patchStakeholder
 *
 * @param {Object} stakeholder
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchStakeholder(stakeholder) {
  return Axios.patch(`/parties/${stakeholder._id}`, stakeholder); // eslint-disable-line
}

/**
 * @function
 * @name deleteStakeholder
 *
 * @param {Object} stakeholderID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteStakeholder(stakeholderID) {
  return Axios.delete(`/parties/${stakeholderID}`);
}
