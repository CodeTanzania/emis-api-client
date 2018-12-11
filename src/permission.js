import Axios from './client';

export function getPermissionSchema() {
  return Axios.get('/permissions/schema');
}

export function getPermissions(params) {
  return Axios.get('/permissions', params);
}

export function getPermission(permissionID) {
  return Axios.get(`/permissions/${permissionID}`);
}

export function postPermission(permission) {
  return Axios.post('/permissions', permission);
}

export function putPermission(permission) {
  return Axios.put(`/permissions/${permission._id}`, permission); //eslint-disable-line
}

export function patchPermission(permission) {
  return Axios.patch(`/permissions/${permission._id}`, permission); //eslint-disable-line
}

export function deletePermission(permissionID) {
  return Axios.delete(`/permissions/${permissionID}`);
}
