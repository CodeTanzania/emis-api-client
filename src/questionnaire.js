import { Axios } from './client';

/**
 * @function
 * @name getQuestionnaireSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getQuestionnaireSchema() {
  return Axios.get('/questionnaires/schema');
}

/**
 * @function
 * @name getQuestionnaires
 *
 * @param params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getQuestionnaires(params) {
  return Axios.get('/questionnaires', { params });
}

/**
 * @function
 * @name getQuestionnaire
 *
 * @param questionnaireID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getQuestionnaire(questionnaireID) {
  return Axios.get(`/questionnaires/${questionnaireID}`);
}

/**
 * @function
 * @name postQuestionnaire
 *
 * @param questionnaire
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postQuestionnaire(questionnaire) {
  return Axios.post('/questionnaires', questionnaire);
}

/**
 * @function
 * @name putQuestionnaire
 *
 * @param questionnaire
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putQuestionnaire(questionnaire) {
  return Axios.put(`/questionnaires/${questionnaire._id}`, questionnaire); // eslint-disable-line
}

/**
 * @function
 * @name patchQuestionnaire
 *
 * @param questionnaire
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchQuestionnaire(questionnaire) {
  return Axios.patch(`/questionnaires/${questionnaire._id}`, questionnaire); // eslint-disable-line
}

/**
 * @function
 * @name deleteQuestionnaire
 *
 * @param questionnaireID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteQuestionnaire(questionnaireID) {
  return Axios.delete(`/questionnaires/${questionnaireID}`);
}
