import { expect } from 'chai';
import nock from 'nock';
import * as Feature from '../../src/feature';
import defaultOptions from '../helpers/nock';

describe('Feature API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let featureID = null;
  let _feature = null;

  it('should be able to GET features when given params', () =>
    nock
      .back('/feature/get-features-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Feature.getFeatures({ limit: 5 })
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

            featureID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET features given no params', () =>
    nock
      .back('/feature/get-features-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Feature.getFeatures()
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

  it('should be able to GET a single feature given feature ID', () =>
    nock
      .back('/feature/get-feature-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Feature.getFeature(featureID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(featureID);
            _feature = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Feature', () =>
    nock
      .back('/feature/post-feature-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const feature = _feature;

        delete feature._id;

        return Feature.postFeature(feature)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
            _feature = data;
          })
          .then(nockDone);
      }));

  it('should be able to PUT existing feature', () =>
    nock
      .back('/feature/put-feature-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _feature.name = 'This is the updated Feature';

        return Feature.putFeature(_feature)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.name).to.be.eql(_feature.name);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing feature', () =>
    nock
      .back('/feature/patch-feature-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _feature.name = 'This is the patched Feature';

        return Feature.putFeature(_feature)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.name).to.be.eql(_feature.name);
          })
          .then(nockDone);
      }));
});
