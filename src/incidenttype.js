/**
 * A representation of an entity which classify emergency(or disaster)
 *  from the most generalized (nature and family) to the most specific
 * (main event and peril).A representation of written set of activities and
 *  procedures that outlines(or guides) what stakeholders and others should do in
 * emergency(or disaster) event.
 *
 * This module covers all the endpoints exposed by Emergency Information
 * Management System(EMIS) IncidentType API
 */

import Axios from './client';

/**
 * @function
 * @name getIncidentTypeSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getIncidentTypeSchema() {
  return Axios.get('/incidenttypes/schema');
}

/**
 * @function
 * @name getIncidentTypes
 *
 * @param {Object} params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getIncidentTypes(params) {
  return Axios.get('/incidenttypes', params);
}

/**
 * @function
 * @name getIncidentType
 *
 * @param {string} incidentTypeID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getIncidentType(incidentTypeID) {
  return Axios.get(`/incidenttypes/${incidentTypeID}`);
}

/**
 * @function
 * @name postIncidentType
 *
 * @param {Object} incidentType
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postIncidentType(incidentType) {
  return Axios.post('/incidenttypes', incidentType);
}

/**
 * @function
 * @name putIncidentType
 *
 * @param {Object} incidentType
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putIncidentType(incidentType) {
  return Axios.put(`/incidenttypes/${incidentType._id}`, incidentType); // eslint-disable-line
}

/**
 * @function
 * @name patchIncidentType
 *
 * @param {Object} incidentType
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchIncidentType(incidentType) {
  return Axios.patch(`/incidenttypes/${incidentType._id}`, incidentType); // eslint-disable-line
}

/**
 * @function
 * @name deleteIncidentType
 *
 * @param {Object} incidentTypeID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteIncidentType(incidentTypeID) {
  return Axios.delete(`/incidenttypes/${incidentTypeID}`);
}
