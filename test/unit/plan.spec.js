import nock from 'nock';
import * as Plan from '../../lib/plan';
import defaultOptions from '../helpers/nock';

describe('Plan API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  it('should return plans', () =>
    nock.back('plans-promise.json', defaultOptions).then(({ nockDone }) =>
      Plan.getPlans({})
        .then(res => res.data)
        .then(nockDone)
    ));

  it('should be able to GET plans given no params', () => {
    nock
      .back('plans-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Plan.getPlans({})
          .then(res => res.data)
          .then(nockDone)
      );
  });

  it('should be able to GET plans given params', () => {});

  it('should be able to GET plan given Plan ID', () => {});
});
