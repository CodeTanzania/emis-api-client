/**
 * Collective tools for performing assessment prior, during and after
 * emergency(or disaster) event.
 *
 * This module covers all the endpoints exposed by Emergency Information
 * Management System(EMIS) Assessment API
 */

import Axios from './client';

/**
 * @function
 * @name getAssessmentSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAssessmentSchema() {
  return Axios.get('/assessments/schema');
}

/**
 * @function
 * @name getAssessments
 *
 * @param {Object} params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAssessments(params) {
  return Axios.get('/assessments', params);
}

/**
 * @function
 * @name getAssessment
 *
 * @param {string} assessmentID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getAssessment(assessmentID) {
  return Axios.get(`/assessments/${assessmentID}`);
}

/**
 * @function
 * @name postAssessment
 *
 * @param {Object} assessment
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postAssessment(assessment) {
  return Axios.post('/assessments', assessment);
}

/**
 * @function
 * @name putAssessment
 *
 * @param {Object} assessment
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putAssessment(assessment) {
  return Axios.put(`/assessments/${assessment._id}`, assessment); //eslint-disable-line
}

/**
 * @function
 * @name patchAssessment
 *
 * @param {Object} assessment
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchAssessment(assessment) {
  return Axios.patch(`/assessments/${assessment._id}`, assessment); //eslint-disable-line
}

/**
 * @function
 * @name deleteAssessment
 *
 * @param {Object} assessmentID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteAssessment(assessmentID) {
  return Axios.delete(`/assessments/${assessmentID}`);
}
