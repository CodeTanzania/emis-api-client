import { expect } from 'chai';
import nock from 'nock';
import * as Party from '../../src/party';
import defaultOptions from '../helpers/nock';

describe('Party API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let partyID = null;
  let _party = null;

  it('should be able to GET parties when given params', () =>
    nock
      .back('/party/get-parties-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Party.getParties({ limit: 5 })
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

            partyID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET parties given no params', () =>
    nock
      .back('/party/get-parties-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Party.getParties()
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
      .back('/party/get-plan-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Party.getParty(partyID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(partyID);
            _party = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Party', () =>
    nock
      .back('/party/post-plan-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const party = {
          name: 'Test Party one',
          email: 'test1@mail.com',
          mobile: '255902213124',
        };

        return Party.postParty(party)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT existing party', () =>
    nock
      .back('/party/put-plan-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _party.name = 'This is the updated Party';

        return Party.putParty(_party)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.name).to.be.eql(_party.name);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing party', () =>
    nock
      .back('/party/patch-plan-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _party.name = 'This is the patched Party';

        return Party.putParty(_party)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.name).to.be.eql(_party.name);
          })
          .then(nockDone);
      }));
});
