import Axios from './client';

/**
 * @function
 * @name getPermissionSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getPermissionSchema() {
  return Axios.get('/permissions/schema');
}

/**
 * @function
 * @name getPermissions
 *
 * @param params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getPermissions(params) {
  return Axios.get('/permissions', params);
}

/**
 * @function
 * @name getPermission
 *
 * @param permissionID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getPermission(permissionID) {
  return Axios.get(`/permissions/${permissionID}`);
}

/**
 * @function
 * @name postPermission
 *
 * @param permission
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postPermission(permission) {
  return Axios.post('/permissions', permission);
}

/**
 * @function
 * @name putPermission
 *
 * @param permission
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putPermission(permission) {
  return Axios.put(`/permissions/${permission._id}`, permission); //eslint-disable-line
}

/**
 * @function
 * @name patchPermission
 *
 * @param permission
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchPermission(permission) {
  return Axios.patch(`/permissions/${permission._id}`, permission); //eslint-disable-line
}

/**
 * @function
 * @name deletePermission
 *
 * @param permissionID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deletePermission(permissionID) {
  return Axios.delete(`/permissions/${permissionID}`);
}
