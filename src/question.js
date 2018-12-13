import { Axios } from './client';

/**
 * @function
 * @name getQuestionSchema
 *
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getQuestionSchema() {
  return Axios.get('/questions/schema');
}

/**
 * @function
 * @name getQuestions
 *
 * @param params
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getQuestions(params) {
  return Axios.get('/questions', params);
}

/**
 * @function
 * @name getQuestion
 *
 * @param questionID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function getQuestion(questionID) {
  return Axios.get(`/questions/${questionID}`);
}

/**
 * @function
 * @name postQuestion
 *
 * @param question
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function postQuestion(question) {
  return Axios.post('/questions', question);
}

/**
 * @function
 * @name putQuestion
 *
 * @param question
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function putQuestion(question) {
  return Axios.put(`/questions/${question._id}`, question); // eslint-disable-line
}

/**
 * @function
 * @name patchQuestion
 *
 * @param question
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function patchQuestion(question) {
  return Axios.patch(`/questions/${question._id}`, question); //eslint-disable-line
}

/**
 * @function
 * @name deleteQuestion
 *
 * @param questionID
 * @returns {Promise}
 *
 * @version 0.1.0
 * @since 0.1.0
 */
export function deleteQuestion(questionID) {
  return Axios.delete(`/questions/${questionID}`);
}
