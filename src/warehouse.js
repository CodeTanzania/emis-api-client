import Axios from './client';

export function getWarehouseSchema() {
  return Axios.get('/warehouses/schema');
}

export function getWarehouses(params) {
  return Axios.get('/warehouses', params);
}

export function getWarehouse(warehouseID) {
  return Axios.get(`/warehouses/${warehouseID}`);
}

export function postWarehouse(warehouse) {
  return Axios.post('/warehouses', warehouse);
}

export function putWarehouse(warehouse) {
  return Axios.put(`/warehouses/${warehouse._id}`, warehouse); //eslint-disable-line
}

export function patchWarehouse() {
  return Axios.patch(`/warehouses/${warehouse._id}`, warehouse); //eslint-disable-line
}

export function deleteWarehouse(warehouseID) {
  return Axios.delete(`/warehouses/${warehouseID}`);
}
