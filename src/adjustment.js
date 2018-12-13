import { Axios } from './client';

/**
 * @function
 * @name getAdjustmentSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAdjustmentSchema() {
  return Axios.get('/adjustments/schema');
}

/**
 * @function
 * @name getAdjustments
 *
 * @param params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAdjustments(params) {
  return Axios.get('/adjustments', { params });
}

/**
 * @function
 * @name getAdjustment
 *
 * @param adjustmentID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAdjustment(adjustmentID) {
  return Axios.get(`/adjustments/${adjustmentID}`);
}

/**
 * @function
 * @name postAdjustment
 *
 * @param adjustment
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postAdjustment(adjustment) {
  return Axios.post('/adjustments', adjustment);
}

/**
 * @function
 * @name putAdjustment
 *
 * @param adjustment
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putAdjustment(adjustment) {
  return Axios.put(`/adjustments/${adjustment._id}`, adjustment); //eslint-disable-line
}

/**
 * @function
 * @name patchAdjustment
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchAdjustment() {
  return Axios.patch(`/adjustments/${adjustment._id}`, adjustment); //eslint-disable-line
}

/**
 * @function
 * @name deleteAdjustment
 *
 * @param adjustmentID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteAdjustment(adjustmentID) {
  return Axios.delete(`/adjustments/${adjustmentID}`);
}
