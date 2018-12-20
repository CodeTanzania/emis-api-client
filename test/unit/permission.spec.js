import { expect } from 'chai';
import nock from 'nock';
import * as Permission from '../../src/permission';
import defaultOptions from '../helpers/nock';

describe('Permission API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let permissionID = null;
  let _permission = null;

  it('should be able to GET permissions when given params', () =>
    nock
      .back('/permission/get-permissions-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Permission.getPermissions({ limit: 5 })
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

            permissionID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET permissions given no params', () =>
    nock
      .back('/permission/get-permissions-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Permission.getPermissions()
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

  it('should be able to GET a single permission given permission ID', () =>
    nock
      .back('/permission/get-permission-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Permission.getPermission(permissionID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(permissionID);
            _permission = data;
          })
          .then(nockDone)
      ));

  it('should be able to PUT existing permission', () =>
    nock
      .back('/permission/put-permission-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _permission.description = 'This is the updated Permission';

        return Permission.putPermission(_permission)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_permission.description);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing permission', () =>
    nock
      .back('/permission/patch-permission-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _permission.description = 'This is the patched Permission';

        return Permission.putPermission(_permission)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_permission.description);
          })
          .then(nockDone);
      }));
});
