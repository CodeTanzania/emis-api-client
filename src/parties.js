import { Axios } from './client';

/**
 * @function
 * @name getPartySchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getPartySchema() {
  return Axios.get('/parties/schema');
}

/**
 * @function
 * @name getParties
 *
 * @param params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getParties(params) {
  return Axios.get('/parties', params);
}

/**
 * @function
 * @name getParty
 *
 * @param partyID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getParty(partyID) {
  return Axios.get(`/parties/${partyID}`);
}

/**
 * @function
 * @name postParty
 *
 * @param party
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postParty(party) {
  return Axios.post('/parties', party);
}

/**
 * @function
 * @name putParty
 *
 * @param party
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putParty(party) {
  return Axios.put(`/parties/${party._id}`, party); //eslint-disable-line
}

/**
 * @function
 * @name patchParty
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchParty() {
  return Axios.patch(`/parties/${party._id}`, party); //eslint-disable-line
}

/**
 * @function
 * @name deleteParty
 *
 * @param partyID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteParty(partyID) {
  return Axios.delete(`/parties/${partyID}`);
}
