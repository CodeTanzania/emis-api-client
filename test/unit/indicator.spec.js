import { expect } from 'chai';
import nock from 'nock';
import * as Indicator from '../../src/indicator';
import defaultOptions from '../helpers/nock';

describe('Indicator API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let indicatorID = null;
  let _indicator = null;

  it('should be able to GET indicators when given params', () =>
    nock
      .back('/indicator/get-indicators-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Indicator.getIndicators({ limit: 5 })
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

            indicatorID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET indicators given no params', () =>
    nock
      .back('/indicator/get-indicators-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Indicator.getIndicators()
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist;
            expect(data.data).to.exist.and.to.be.an('array');
            expect(data.total).to.exist.and.to.be.a('number');
            expect(data.size).to.exist.and.to.be.gt(1);
            expect(data.limit).to.exist.to.be.eq(10);
            expect(data.skip).to.exist.and.to.be.a('number');
            expect(data.page).to.exist.and.to.be.a('number');
            expect(data.pages).to.exist.and.be.a('number');
            expect(data.lastModified).to.exist;
          })
          .then(nockDone)
      ));

  it('should be able to GET a single indicator given indicator ID', () =>
    nock
      .back('/indicator/get-indicator-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Indicator.getIndicator(indicatorID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(indicatorID);
            _indicator = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Indicator', () =>
    nock
      .back('/indicator/post-indicator-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const indicator = {
          subject: 'Processor Test',
          topic: 'Test',
        };

        return Indicator.postIndicator(indicator)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT existing indicator', () =>
    nock
      .back('/indicator/put-indicator-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _indicator.description = 'This is the updated Indicator';

        return Indicator.putIndicator(_indicator)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_indicator.description);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing indicator', () =>
    nock
      .back('/indicator/patch-indicator-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _indicator.description = 'This is the patched Indicator';

        return Indicator.putIndicator(_indicator)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_indicator.description);
          })
          .then(nockDone);
      }));
});
