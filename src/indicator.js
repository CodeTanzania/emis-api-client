import Axios from './client';

export function getIndicatorSchema() {
  return Axios.get('/indicators/schema');
}

export function getIndicators(params) {
  return Axios.get('/indicators', params);
}

export function getIndicator(indicatorID) {
  return Axios.get(`/indicators/${indicatorID}`);
}

export function postIndicator(indicator) {
  return Axios.post('/indicators', indicator);
}

export function putIndicator(indicator) {
  return Axios.put(`/indicators/${indicator._id}`, indicator); // eslint-disable-line
}

export function patchIndicator(indicator) {
  return Axios.patch(`/indicators/${indicator._id}`, indicator); //eslint-disable-line
}

export function deleteIndicator(indicatorID) {
  return Axios.delete(`/indicators/${indicatorID}`);
}
