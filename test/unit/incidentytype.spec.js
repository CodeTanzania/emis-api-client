import { expect } from 'chai';
import nock from 'nock';
import * as IncidentType from '../../src/incidenttype';
import defaultOptions from '../helpers/nock';

describe('IncidentType API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let incidentTypeID = null;
  let _incidentType = null;

  it('should be able to GET incidentTypes when given params', () =>
    nock
      .back('/incidentType/get-incidentTypes-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        IncidentType.getIncidentTypes({ limit: 5 })
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

            incidentTypeID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET incidentTypes given no params', () =>
    nock
      .back(
        '/incidentType/get-incidentTypes-promise-no-param.json',
        defaultOptions
      )
      .then(({ nockDone }) =>
        IncidentType.getIncidentTypes()
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

  it('should be able to GET a single incidentType given incidentType ID', () =>
    nock
      .back('/incidentType/get-incidentType-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        IncidentType.getIncidentType(incidentTypeID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(incidentTypeID);
            _incidentType = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new IncidentType', () =>
    nock
      .back('/incidentType/post-incidentType-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const incidentType = {
          nature: _incidentType.nature,
          family: _incidentType.family,
          code: 'Test 1',
          cap: 'Geo',
          name: 'Test 1',
        };

        return IncidentType.postIncidentType(incidentType)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
            // _incidentType = data;
          })
          .then(nockDone);
      }));

  it('should be able to PUT existing incidentType', () =>
    nock
      .back('/incidentType/put-incidentType-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _incidentType.description = 'This is the updated IncidentType';

        return IncidentType.putIncidentType(_incidentType)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_incidentType.description);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing incidentType', () =>
    nock
      .back('/incidentType/patch-incidentType-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _incidentType.description = 'This is the patched IncidentType';

        return IncidentType.putIncidentType(_incidentType)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_incidentType.description);
          })
          .then(nockDone);
      }));
});
