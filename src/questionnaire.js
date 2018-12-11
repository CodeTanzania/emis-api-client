import Axios from './client';

export function getQuestionnaireSchema() {
  return Axios.get('/questionnaires/schema');
}

export function getQuestionnaires(params) {
  return Axios.get('/questionnaires', params);
}

export function getQuestionnaire(questionnaireID) {
  return Axios.get(`/questionnaires/${questionnaireID}`);
}

export function postQuestionnaire(questionnaire) {
  return Axios.post('/questionnaires', questionnaire);
}

export function putQuestionnaire(questionnaire) {
  return Axios.put(`/questionnaires/${questionnaire._id}`, questionnaire); // eslint-disable-line
}

export function patchQuestionnaire(questionnaire) {
  return Axios.patch(`/questionnaires/${questionnaire._id}`, questionnaire); // eslint-disable-line
}

export function deleteQuestionnaire(questionnaireID) {
  return Axios.delete(`/questionnaires/${questionnaireID}`);
}
