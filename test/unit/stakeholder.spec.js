import { expect } from 'chai';
import nock from 'nock';
import * as Stakeholder from '../../src/stakeholder';
import defaultOptions from '../helpers/nock';

describe('Stakeholder API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let stakeholderID = null;
  let _stakeholder = null;

  it('should be able to GET stakeholders when given params', () =>
    nock
      .back('/stakeholder/get-stakeholders-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Stakeholder.getStakeholders({ limit: 5 })
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

            stakeholderID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET stakeholders given no params', () =>
    nock
      .back(
        '/stakeholder/get-stakeholders-promise-no-param.json',
        defaultOptions
      )
      .then(({ nockDone }) =>
        Stakeholder.getStakeholders()
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

  it('should be able to GET a single stakeholder given stakeholder ID', () =>
    nock
      .back('/stakeholder/get-stakeholder-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Stakeholder.getStakeholder(stakeholderID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(stakeholderID);
            _stakeholder = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Stakeholder', () =>
    nock
      .back('/stakeholder/post-stakeholder-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const stakeholder = {
          name: 'John Doe',
          email: 'johndoe1@mail.com',
          mobile: '255902213125',
        };

        return Stakeholder.postStakeholder(stakeholder)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT  existing stakeholder', () =>
    nock
      .back('/stakeholder/put-stakeholder-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _stakeholder.name = 'This is the updated Stakeholder';

        return Stakeholder.putStakeholder(_stakeholder)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.name).to.be.eql(_stakeholder.name);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing stakeholder', () =>
    nock
      .back('/stakeholder/patch-stakeholder-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _stakeholder.name = 'This is the patched Stakeholder';

        return Stakeholder.putStakeholder(_stakeholder)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.name).to.be.eql(_stakeholder.name);
          })
          .then(nockDone);
      }));
});
