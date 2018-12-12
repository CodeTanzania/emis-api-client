/**
 * A representation of geographical feature of interest(i.e mapped physical
 * element with their attributes in landscape e.g. administrative boundaries,
 * roads, buildings etc) both natural and man made used in emergency(or disaster)
 * management(or event).
 *
 * This module covers all the endpoints exposed by Emergency Information
 * Management System(EMIS) Feature API
 */

import Axios from './client';

/**
 * @function
 * @name getFeatureSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getFeatureSchema() {
  return Axios.get('/features/schema');
}

/**
 * @function
 * @name getFeatures
 *
 * @param {Object} params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getFeatures(params) {
  return Axios.get('/features', params);
}

/**
 * @function
 * @name getFeature
 *
 * @param {string} featureID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getFeature(featureID) {
  return Axios.get(`/features/${featureID}`);
}

/**
 * @function
 * @name postFeature
 *
 * @param {Object} feature
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postFeature(feature) {
  return Axios.post('/features', feature);
}

/**
 * @function
 * @name putFeature
 *
 * @param {Object} feature
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putFeature(feature) {
  return Axios.put(`/features/${feature._id}`, feature); //eslint-disable-line
}

/**
 * @function
 * @name patchFeature
 *
 * @param {Object} feature
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchFeature(feature) {
  return Axios.patch(`/features/${feature._id}`, feature); //eslint-disable-line
}

/**
 * @function
 * @name deleteFeature
 *
 * @param {Object} featureID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteFeature(featureID) {
  return Axios.delete(`/features/${featureID}`);
}
