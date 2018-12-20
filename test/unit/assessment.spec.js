import { expect } from 'chai';
import nock from 'nock';
import * as Assessment from '../../src/assessment';
import defaultOptions from '../helpers/nock';

describe.skip('Assessment API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let assessmentID = null;
  let _assessment = null;

  it('should be able to GET assessments when given params', () =>
    nock
      .back('/assessment/get-assessments-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Assessment.getAssessments({ limit: 5 })
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

            assessmentID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET assessments given no params', () =>
    nock
      .back('/assessment/get-assessments-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Assessment.getAssessments()
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist;
            expect(data.data).to.exist.and.to.be.an('array');
            expect(data.total).to.exist.and.to.be.a('number');
            expect(data.size).to.exist.and.to.be.eq(10);
            expect(data.limit).to.exist.to.be.eq(10);
            expect(data.skip).to.exist.and.to.be.a('number');
            expect(data.page).to.exist.and.to.be.a('number');
            expect(data.pages).to.exist.and.be.a('number');
            expect(data.lastModified).to.exist;
          })
          .then(nockDone)
      ));

  it('should be able to GET a single assessment given assessment ID', () =>
    nock
      .back('/assessment/get-assessment-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Assessment.getAssessment(assessmentID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(assessmentID);
            _assessment = data;
          })
          .then(nockDone)
      ));

  it.skip('should be able to POST new Assessment', () =>
    nock
      .back('/assessment/post-assessment-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const assessment = {
          incidentType: '5be5733a266f3200041c7382',
          boundary: '5bf93f39ef046000044ec8b5',
          owner: '5bea4b2a90a10a0004573f25',
          description: 'Ut harum eveniet ipsa a quod dolores vel quas enim.',
        };

        return Assessment.postAssessment(assessment)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT existing assessment', () =>
    nock
      .back('/assessment/put-assessment-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _assessment.description = 'This is the updated Assessment';

        return Assessment.putAssessment(_assessment)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_assessment.description);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing assessment', () =>
    nock
      .back('/assessment/patch-assessment-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _assessment.description = 'This is the patched Assessment';

        return Assessment.putAssessment(_assessment)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_assessment.description);
          })
          .then(nockDone);
      }));
});
