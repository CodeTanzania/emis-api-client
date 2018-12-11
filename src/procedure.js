import Axios from './client';

export function getProcedureSchema() {
  return Axios.get('/procedures/schema');
}

export function getProcedures(params) {
  return Axios.get('/procedures', params);
}

export function getProcedure(procedureID) {
  return Axios.get(`/procedures/${procedureID}`);
}

export function postProcedure(procedure) {
  return Axios.post('/procedures', procedure);
}

export function putProcedure(procedure) {
  return Axios.put(`/procedures/${procedure._id}`, procedure); // eslint-disable-line
}

export function patchProcedure(procedure) {
  return Axios.patch(`/procedures/${procedure._id}`, procedure); //eslint-disable-line
}

export function deleteProcedure(procedureID) {
  return Axios.delete(`/procedures/${procedureID}`);
}
