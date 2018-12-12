import Axios from './client';

/**
 * @function
 * @name getActivitySchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getActivitySchema() {
  return Axios.get('/activities/schema');
}

/**
 * @function
 * @name getActivities
 *
 * @param params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getActivities(params) {
  return Axios.get('/activities', params);
}

/**
 * @function
 * @name getActivity
 *
 * @param activityID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getActivity(activityID) {
  return Axios.get(`/activities/${activityID}`);
}

/**
 * @function
 * @name postActivity
 *
 * @param activity
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postActivity(activity) {
  return Axios.post('/activities', activity);
}

/**
 * @function
 * @name putActivity
 *
 * @param activity
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putActivity(activity) {
  return Axios.put(`/activities/${activity._id}`, activity); // eslint-disable-line
}

/**
 * @function
 * @name patchActivity
 *
 * @param activity
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchActivity(activity) {
  return Axios.patch(`/activities/${activity._id}`, activity); //eslint-disable-line
}

/**
 * @function
 * @name deleteActivity
 *
 * @param activityID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteActivity(activityID) {
  return Axios.delete(`/activities/${activityID}`);
}
