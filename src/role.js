/**
 * A representation on how a party(or stakeholder) acts or, in other words,
 * what role party(or stakeholder) plays in event of emergency(or disaster).
 *
 * This module covers all the endpoints exposed by Emergency Information
 * Management System(EMIS) Role API
 */
import { Axios } from './client';

/**
 * @function
 * @name getRoleSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getRoleSchema() {
  return Axios.get('/roles/schema');
}

/**
 * @function
 * @name getRoles
 *
 * @param {Object} params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getRoles(params) {
  return Axios.get('/roles', params);
}

/**
 * @function
 * @name getRole
 *
 * @param {string} roleID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getRole(roleID) {
  return Axios.get(`/roles/${roleID}`);
}

/**
 * @function
 * @name postRole
 *
 * @param {Object} role
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postRole(role) {
  return Axios.post('/roles', role);
}

/**
 * @function
 * @name putRole
 *
 * @param {Object} role
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putRole(role) {
  return Axios.put(`/roles/${role._id}`, role); // eslint-disable-line
}

/**
 * @function
 * @name patchRole
 *
 * @param {Object} role
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchRole(role) {
  return Axios.patch(`/roles/${role._id}`, role); // eslint-disable-line
}

/**
 * @function
 * @name deleteRole
 *
 * @param {Object} roleID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteRole(roleID) {
  return Axios.delete(`/roles/${roleID}`);
}
