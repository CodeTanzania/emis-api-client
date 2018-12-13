/**
 * Plan is a representation of written set of activities and procedures that
 * outlines(or guides) what stakeholders and others should do in
 * emergency(or disaster) event.
 *
 * This module covers all the endpoints exposed by Emergency Information
 * Management System(EMIS) Plan API
 */

import { Axios } from './client';

/**
 * Get plan Schema  from the API
 *
 * @function
 * @name getPlanSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getPlanSchema() {
  return Axios.get('/plans/schema');
}

/**
 * Get plans based on specified params criteria
 *
 * @function
 * @name getPlans
 *
 * @param {Object} params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getPlans(params) {
  return Axios.get('/plans', { params });
}

/**
 * Get as single plan with the specified ID
 *
 * @function
 * @name getPlan
 *
 * @param {string} planID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getPlan(planID) {
  return Axios.get(`/plans/${planID}`);
}

/**
 * Post plan to the API
 *
 * @function
 * @name postPlan
 *
 * @param {Object} plan
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postPlan(plan) {
  return Axios.post('/plans/', plan);
}

/**
 * Put(Update) plan in the API
 *
 * @function
 * @name putPlan
 *
 * @param {Object} plan
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putPlan(plan) {
  return Axios.put(`/plans/${plan._id}`, plan); //eslint-disable-line
}

/**
 * Patch(Update) plan in the API
 *
 * @function
 * @name patchPlan
 *
 * @param {Object} plan
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchPlan(plan) {
  return Axios.patch(`/plans/${plan._id}`, plan); //eslint-disable-line
}

/**
 * Delete plan from the API
 *
 * @function
 * @name deletePlan
 *
 * @param {Object} planID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deletePlan(planID) {
  return Axios.delete(`/plans/${planID}`);
}
