import { expect } from 'chai';
import nock from 'nock';
import * as Question from '../../src/question';
import defaultOptions from '../helpers/nock';

describe('Question API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let questionID = null;
  let _question = null;

  it('should be able to GET questions when given params', () =>
    nock
      .back('/question/get-questions-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Question.getQuestions({ limit: 5 })
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist;
            expect(data.data).to.exist.and.to.be.an('array');
            expect(data.total).to.exist.and.to.be.a('number');
            expect(data.size).to.exist.and.to.be.eq(5);
            expect(data.limit).to.exist.to.be.eq(5);
            expect(data.skip).to.exist.and.to.be.a('number');
            expect(data.page).to.exist.and.to.be.a('number');
            expect(data.pages).to.exist.and.be.a('number');
            expect(data.lastModified).to.exist;

            questionID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET questions given no params', () =>
    nock
      .back('/question/get-questions-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Question.getQuestions()
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist;
            expect(data.data).to.exist.and.to.be.an('array');
            expect(data.total).to.exist.and.to.be.a('number');
            expect(data.size).to.exist;
            expect(data.limit).to.exist;
            expect(data.skip).to.exist.and.to.be.a('number');
            expect(data.page).to.exist.and.to.be.a('number');
            expect(data.pages).to.exist.and.be.a('number');
            expect(data.lastModified).to.exist;
          })
          .then(nockDone)
      ));

  it('should be able to GET a single question given question ID', () =>
    nock
      .back('/question/get-question-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Question.getQuestion(questionID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(questionID);
            _question = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Question', () =>
    nock
      .back('/question/post-question-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const question = { ..._question };

        delete question._id;

        return Question.postQuestion(question)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT  existing question', () =>
    nock
      .back('/question/put-question-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _question.name = 'This is the updated Question';

        return Question.putQuestion(_question)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.name).to.be.eql(_question.name);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing question', () =>
    nock
      .back('/question/patch-question-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _question.name = 'This is the patched Question';

        return Question.putQuestion(_question)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.name).to.be.eql(_question.name);
          })
          .then(nockDone);
      }));
});
