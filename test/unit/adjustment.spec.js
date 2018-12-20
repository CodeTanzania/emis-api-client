import { expect } from 'chai';
import nock from 'nock';
import * as Adjustment from '../../src/adjustment';
import defaultOptions from '../helpers/nock';

describe('Adjustment API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let adjustmentID = null;
  let _adjustment = null;

  it('should be able to GET adjustments when given params', () =>
    nock
      .back('/adjustment/get-adjustments-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Adjustment.getAdjustments({ limit: 5 })
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

            adjustmentID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET adjustments given no params', () =>
    nock
      .back('/adjustment/get-adjustments-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Adjustment.getAdjustments()
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

  it('should be able to GET a single adjustment given adjustment ID', () =>
    nock
      .back('/adjustment/get-adjustment-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Adjustment.getAdjustment(adjustmentID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(adjustmentID);
            _adjustment = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Adjustment', () =>
    nock
      .back('/adjustment/post-adjustment-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const adjustment = {
          ..._adjustment,
        };

        delete adjustment._id;

        return Adjustment.postAdjustment(adjustment)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT existing adjustment', () =>
    nock
      .back('/adjustment/put-adjustment-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _adjustment.quantity = 100;

        return Adjustment.putAdjustment(_adjustment)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.quantity).to.be.eql(_adjustment.quantity);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing adjustment', () =>
    nock
      .back('/adjustment/patch-adjustment-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _adjustment.quantity = 100;

        return Adjustment.putAdjustment(_adjustment)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.quantity).to.be.eql(_adjustment.quantity);
          })
          .then(nockDone);
      }));
});
