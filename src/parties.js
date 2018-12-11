import Axios from './client';

export function getPartySchema() {
  return Axios.get('/parties/schema');
}

export function getParties(params) {
  return Axios.get('/parties', params);
}

export function getParty(partyID) {
  return Axios.get(`/parties/${partyID}`);
}

export function postParty(party) {
  return Axios.post('/parties', party);
}

export function putParty(party) {
  return Axios.put(`/parties/${party._id}`, party); //eslint-disable-line
}

export function patchParty() {
  return Axios.patch(`/parties/${party._id}`, party); //eslint-disable-line
}

export function deleteParty(partyID) {
  return Axios.delete(`/parties/${partyID}`);
}
