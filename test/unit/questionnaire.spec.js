import { expect } from 'chai';
import nock from 'nock';
import * as Questionnaire from '../../src/questionnaire';
import defaultOptions from '../helpers/nock';

describe('Questionnaire API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let questionnaireID = null;
  let _questionnaire = null;

  it('should be able to GET questionnaires when given params', () =>
    nock
      .back('/questionnaire/get-questionnaires-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Questionnaire.getQuestionnaires({ limit: 5 })
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

            questionnaireID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET questionnaires given no params', () =>
    nock
      .back(
        '/questionnaire/get-questionnaires-promise-no-param.json',
        defaultOptions
      )
      .then(({ nockDone }) =>
        Questionnaire.getQuestionnaires()
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

  it('should be able to GET a single questionnaire given questionnaire ID', () =>
    nock
      .back('/questionnaire/get-questionnaire-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Questionnaire.getQuestionnaire(questionnaireID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(questionnaireID);
            _questionnaire = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Questionnaire', () =>
    nock
      .back('/questionnaire/post-questionnaire-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const questionnaire = {
          ..._questionnaire,
        };

        delete questionnaire._id;
        questionnaire.title = 'Test questionnare';

        return Questionnaire.postQuestionnaire(questionnaire)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT  existing questionnaire', () =>
    nock
      .back('/questionnaire/put-questionnaire-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _questionnaire.description = 'This is the updated Questionnaire';

        return Questionnaire.putQuestionnaire(_questionnaire)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_questionnaire.description);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing questionnaire', () =>
    nock
      .back('/questionnaire/patch-questionnaire-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _questionnaire.description = 'This is the patched Questionnaire';

        return Questionnaire.putQuestionnaire(_questionnaire)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_questionnaire.description);
          })
          .then(nockDone);
      }));
});
