import Axios from './client';

export function getActivitySchema() {
  return Axios.get('/activities/schema');
}

export function getActivities(params) {
  return Axios.get('/activities', params);
}

export function getActivity(activityID) {
  return Axios.get(`/activities/${activityID}`);
}

export function postActivity(activity) {
  return Axios.post('/activities', activity);
}

export function putActivity(activity) {
  return Axios.put(`/activities/${activity._id}`, activity); // eslint-disable-line
}

export function patchActivity(activity) {
  return Axios.patch(`/activities/${activity._id}`, activity); //eslint-disable-line
}

export function deleteActivity(activityID) {
  return Axios.delete(`/activities/${activityID}`);
}
