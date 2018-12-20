import { expect } from 'chai';
import nock from 'nock';
import * as Alert from '../../src/alert';
import defaultOptions from '../helpers/nock';

describe('Alert API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let alertID = null;
  let _alert = null;

  it('should be able to GET alerts when given params', () =>
    nock
      .back('/alert/get-alerts-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Alert.getAlerts({ limit: 5 })
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

            alertID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET alerts given no params', () =>
    nock
      .back('/alert/get-alerts-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Alert.getAlerts()
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

  it('should be able to GET a single alert given alert ID', () =>
    nock
      .back('/alert/get-alert-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Alert.getAlert(alertID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(alertID);
            _alert = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Alert', () =>
    nock
      .back('/alert/post-alert-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const alert = {
          source: _alert.source,
          number: _alert.number,
          event: _alert.event,
          area: _alert.area,
          reportedAt: _alert.reportedAt,
        };

        return Alert.postAlert(alert)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT existing alert', () =>
    nock
      .back('/alert/put-alert-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _alert.description = 'This is the updated Alert';

        return Alert.putAlert(_alert)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_alert.description);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing alert', () =>
    nock
      .back('/alert/patch-alert-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _alert.description = 'This is the patched Alert';

        return Alert.putAlert(_alert)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_alert.description);
          })
          .then(nockDone);
      }));
});
