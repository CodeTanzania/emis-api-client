import { expect } from 'chai';
import nock from 'nock';
import * as Role from '../../src/role';
import defaultOptions from '../helpers/nock';

describe('Role API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let roleID = null;
  let _role = null;

  it('should be able to GET roles when given params', () =>
    nock
      .back('/role/get-roles-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Role.getRoles({ limit: 5 })
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

            roleID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET roles given no params', () =>
    nock
      .back('/role/get-roles-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Role.getRoles()
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

  it('should be able to GET a single role given role ID', () =>
    nock
      .back('/role/get-role-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Role.getRole(roleID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(roleID);
            _role = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Role', () =>
    nock
      .back('/role/post-role-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const role = {
          ..._role,
        };
        role.name = 'Test Role';

        delete role._id;

        return Role.postRole(role)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT  existing role', () =>
    nock
      .back('/role/put-role-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _role.description = 'This is the updated Role';

        return Role.putRole(_role)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_role.description);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing role', () =>
    nock
      .back('/role/patch-role-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _role.description = 'This is the patched Role';

        return Role.putRole(_role)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_role.description);
          })
          .then(nockDone);
      }));
});
