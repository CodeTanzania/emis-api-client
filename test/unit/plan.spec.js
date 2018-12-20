import { expect } from 'chai';
import nock from 'nock';
import * as Plan from '../../src/plan';
import defaultOptions from '../helpers/nock';

describe('Plan API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let planID = null;
  let _plan = null;

  it('should be able to GET plans when given params', () =>
    nock
      .back('/plan/get-plans-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Plan.getPlans({ limit: 5 })
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

            planID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET plans given no params', () =>
    nock
      .back('/plan/get-plans-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Plan.getPlans()
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

  it('should be able to GET a single plan given plan ID', () =>
    nock
      .back('/plan/get-plan-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Plan.getPlan(planID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(planID);
            _plan = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Plan', () =>
    nock
      .back('/plan/post-plan-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const plan = {
          incidentType: _plan.incidentType,
          boundary: _plan.boundary,
          owner: _plan.owner,
          description: 'Ut harum eveniet ipsa a quod dolores vel quas enim.',
        };

        return Plan.postPlan(plan)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT existing plan', () =>
    nock
      .back('/plan/put-plan-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _plan.description = 'This is the updated Plan';

        return Plan.putPlan(_plan)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_plan.description);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing plan', () =>
    nock
      .back('/plan/patch-plan-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _plan.description = 'This is the patched Plan';

        return Plan.putPlan(_plan)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_plan.description);
          })
          .then(nockDone);
      }));
});
