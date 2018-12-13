import { Axios } from './client';

/**
 * @function
 * @name getProcedureSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getProcedureSchema() {
  return Axios.get('/procedures/schema');
}

/**
 * @function
 * @name getProcedures
 *
 * @param params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */

export function getProcedures(params) {
  return Axios.get('/procedures', { params });
}

/**
 * @function
 * @name getProcedure
 *
 * @param procedureID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getProcedure(procedureID) {
  return Axios.get(`/procedures/${procedureID}`);
}

/**
 * @function
 * @name postProcedure
 *
 * @param procedure
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postProcedure(procedure) {
  return Axios.post('/procedures', procedure);
}

/**
 * @function
 * @name putProcedure
 *
 * @param procedure
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putProcedure(procedure) {
  return Axios.put(`/procedures/${procedure._id}`, procedure); // eslint-disable-line
}

/**
 * @function
 * @name patchProcedure
 *
 * @param procedure
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchProcedure(procedure) {
  return Axios.patch(`/procedures/${procedure._id}`, procedure); //eslint-disable-line
}

/**
 * @function
 * @name deleteProcedure
 *
 * @param procedureID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteProcedure(procedureID) {
  return Axios.delete(`/procedures/${procedureID}`);
}
