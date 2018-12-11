import Axios from './client';

export function getAdjustmentSchema() {
  return Axios.get('/adjustments/schema');
}

export function getAdjustments(params) {
  return Axios.get('/adjustments', params);
}

export function getAdjustment(adjustmentID) {
  return Axios.get(`/adjustments/${adjustmentID}`);
}

export function postAdjustment(adjustment) {
  return Axios.post('/adjustments', adjustment);
}

export function putAdjustment(adjustment) {
  return Axios.put(`/adjustments/${adjustment._id}`, adjustment); //eslint-disable-line
}

export function patchAdjustment() {
  return Axios.patch(`/adjustments/${adjustment._id}`, adjustment); //eslint-disable-line
}

export function deleteAdjustment(adjustmentID) {
  return Axios.delete(`/adjustments/${adjustmentID}`);
}
