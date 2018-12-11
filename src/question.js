import Axios from './client';

export function getQuestionSchema() {
  return Axios.get('/questions/schema');
}

export function getQuestions(params) {
  return Axios.get('/questions', params);
}

export function getQuestion(questionID) {
  return Axios.get(`/questions/${questionID}`);
}

export function postQuestion(question) {
  return Axios.post('/questions', question);
}

export function putQuestion(question) {
  return Axios.put(`/questions/${question._id}`, question); // eslint-disable-line
}

export function patchQuestion(question) {
  return Axios.patch(`/questions/${question._id}`, question); //eslint-disable-line
}

export function deleteQuestion(questionID) {
  return Axios.delete(`/questions/${questionID}`);
}
