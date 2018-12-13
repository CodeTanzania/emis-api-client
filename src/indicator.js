import { Axios } from './client';

/**
 * @function
 * @name getIndicatorSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getIndicatorSchema() {
  return Axios.get('/indicators/schema');
}

/**
 * @function
 * @name getIndicators
 *
 * @param params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getIndicators(params) {
  return Axios.get('/indicators', params);
}

/**
 * @function
 * @name getIndicator
 *
 * @param indicatorID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getIndicator(indicatorID) {
  return Axios.get(`/indicators/${indicatorID}`);
}

/**
 * @function
 * @name postIndicator
 *
 * @param indicator
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postIndicator(indicator) {
  return Axios.post('/indicators', indicator);
}

/**
 * @function
 * @name putIndicator
 *
 * @param indicator
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putIndicator(indicator) {
  return Axios.put(`/indicators/${indicator._id}`, indicator); // eslint-disable-line
}

/**
 * @function
 * @name patchIndicator
 *
 * @param indicator
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchIndicator(indicator) {
  return Axios.patch(`/indicators/${indicator._id}`, indicator); //eslint-disable-line
}

/**
 * @function
 * @name deleteIndicator
 *
 * @param indicatorID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteIndicator(indicatorID) {
  return Axios.delete(`/indicators/${indicatorID}`);
}
