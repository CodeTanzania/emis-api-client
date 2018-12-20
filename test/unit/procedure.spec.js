import { expect } from 'chai';
import nock from 'nock';
import * as Procedure from '../../src/procedure';
import defaultOptions from '../helpers/nock';

describe('Procedure API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let procedureID = null;
  let _procedure = null;

  it('should be able to GET procedures when given params', () =>
    nock
      .back('/procedure/get-procedures-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Procedure.getProcedures({ limit: 5 })
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

            procedureID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET procedures given no params', () =>
    nock
      .back('/procedure/get-procedures-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Procedure.getProcedures()
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

  it('should be able to GET a single procedure given procedure ID', () =>
    nock
      .back('/procedure/get-procedure-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Procedure.getProcedure(procedureID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(procedureID);
            _procedure = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Procedure', () =>
    nock
      .back('/procedure/post-procedure-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const procedure = {
          plan: _procedure.plan._id,
          incidentType: _procedure.incidentType._id,
          activity: _procedure.activity._id,
          name: 'Test Incident',
          description: 'Ut harum eveniet ipsa a quod dolores vel quas enim.',
        };

        return Procedure.postProcedure(procedure)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT existing procedure', () =>
    nock
      .back('/procedure/put-procedure-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _procedure.description = 'This is the updated Procedure';

        return Procedure.putProcedure(_procedure)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_procedure.description);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing procedure', () =>
    nock
      .back('/procedure/patch-procedure-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _procedure.description = 'This is the patched Procedure';

        return Procedure.putProcedure(_procedure)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_procedure.description);
          })
          .then(nockDone);
      }));
});
