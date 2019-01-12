// jest: see https://flaviocopes.com/jest/
import nock from 'nock';
import { expect } from 'chai';
import {
  CONTENT_TYPE,
  createHttpClient,
  disposeHttpClient,
  get,
  post,
  put,
  patch,
  del
} from '../../src/client';

describe('http client', () => {

  beforeEach(() => {
    delete process.env.EMIS_API_URL;
    delete process.env.REACT_APP_EMIS_API_URL;
    disposeHttpClient();
  });

  it('should export create client factory', () => {
    expect(createHttpClient).to.exist;
    expect(createHttpClient).to.exist.and.to.be.a('function');
    expect(createHttpClient.name).to.be.equal('createHttpClient');
    expect(createHttpClient.length).to.be.equal(1);
  });

  it('should create http client use `env.EMIS_API_URL`', () => {
    const baseUrl = 'https://api.emis.app';
    process.env.EMIS_API_URL = baseUrl;
    const client = createHttpClient(baseUrl);
    expect(client).to.exist;
    expect(client.defaults.headers.Accept).to.be.equal(CONTENT_TYPE);
    expect(client.defaults.headers['Content-Type']).to.be.equal(CONTENT_TYPE);
    expect(client.defaults.baseURL).to.be.equal(baseUrl);
  });

  it('should create http client use `env.REACT_APP_EMIS_API_URL`', () => {
    const baseUrl = 'https://api.emis.dev';
    process.env.REACT_APP_EMIS_API_URL = baseUrl;
    const client = createHttpClient(baseUrl);
    expect(client).to.exist;
    expect(client.defaults.headers.Accept).to.be.equal(CONTENT_TYPE);
    expect(client.defaults.headers['Content-Type']).to.be.equal(CONTENT_TYPE);
    expect(client.defaults.baseURL).to.be.equal(baseUrl);
  });

  it('should create http client from params', () => {
    const baseUrl = 'https://api.emis.io';
    const client = createHttpClient(baseUrl);
    expect(client).to.exist;
    expect(client.defaults.headers.Accept).to.be.equal(CONTENT_TYPE);
    expect(client.defaults.headers['Content-Type']).to.be.equal(CONTENT_TYPE);
    expect(client.defaults.baseURL).to.be.equal(baseUrl);
  });

  it('should not re-create http client', () => {
    const baseUrl = 'https://api.emis.io';
    const first = createHttpClient(baseUrl);
    const second = createHttpClient(baseUrl);
    expect(first).to.exist;
    expect(second).to.exist;
    expect(first.id === second.id).to.be.true;
  });

  it('should dispose the client', () => {
    const baseUrl = 'https://api.emis.io';
    const created = createHttpClient(baseUrl);
    expect(created).to.exist;
    const disposed = disposeHttpClient();
    expect(disposed).to.not.exist;
  });

  it('should export http actions shortcuts', () => {
    expect(get).to.exist;
    expect(get).to.exist.and.to.be.a('function');
    expect(get.name).to.be.equal('get');
    expect(get.length).to.be.equal(2);

    expect(post).to.exist;
    expect(post).to.exist.and.to.be.a('function');
    expect(post.name).to.be.equal('post');
    expect(post.length).to.be.equal(2);

    expect(put).to.exist;
    expect(put).to.exist.and.to.be.a('function');
    expect(put.name).to.be.equal('put');
    expect(put.length).to.be.equal(2);

    expect(patch).to.exist;
    expect(patch).to.exist.and.to.be.a('function');
    expect(patch.name).to.be.equal('patch');
    expect(patch.length).to.be.equal(2);

    expect(del).to.exist;
    expect(del).to.exist.and.to.be.a('function');
    expect(del.name).to.be.equal('del');
    expect(del.length).to.be.equal(1);
  });

  it('should handle http get on /resource', (done) => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = { data: [] };
    nock(baseUrl).get('/users').reply(200, data);

    get('/users')
      .then(response => {
        expect(response).to.exist;
        expect(response.data).to.exist;
        expect(response.data).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should handle http get on /resource/:id', (done) => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl).get('/users/5c1766243c9d520004e2b542').reply(200, data);

    get('/users/5c1766243c9d520004e2b542')
      .then(response => {
        expect(response).to.exist;
        expect(response.data).to.exist;
        expect(response.data).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should handle http post on /resource', (done) => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl).post('/users').reply(201, data);

    post('/users', { age: 11 })
      .then(response => {
        expect(response).to.exist;
        expect(response.data).to.exist;
        expect(response.data).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should reject http post on /resource if no payload', (done) => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl).post('/users').reply(201, data);

    post('/users', {})
      .catch(error => {
        expect(error).to.exist;
        expect(error.message).to.be.equal('Missing Payload');
        done();
      });
  });

  it('should handle http put on /resource/:id', (done) => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl).put('/users/5c1766243c9d520004e2b542').reply(200, data);

    put('/users/5c1766243c9d520004e2b542', { age: 11 })
      .then(response => {
        expect(response).to.exist;
        expect(response.data).to.exist;
        expect(response.data).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should reject http put on /resource/:id if no payload', (done) => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl).put('/users/5c1766243c9d520004e2b542').reply(200, data);

    put('/users/5c1766243c9d520004e2b542', {})
      .catch(error => {
        expect(error).to.exist;
        expect(error.message).to.be.equal('Missing Payload');
        done();
      });
  });

  it('should handle http patch on /resource/:id', (done) => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl).patch('/users/5c1766243c9d520004e2b542').reply(200, data);

    patch('/users/5c1766243c9d520004e2b542', { age: 11 })
      .then(response => {
        expect(response).to.exist;
        expect(response.data).to.exist;
        expect(response.data).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should reject http patch on /resource/:id if no payload', (done) => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl).patch('/users/5c1766243c9d520004e2b542').reply(200, data);

    patch('/users/5c1766243c9d520004e2b542', {})
      .catch(error => {
        expect(error).to.exist;
        expect(error.message).to.be.equal('Missing Payload');
        done();
      });
  });

  beforeEach(() => {
    delete process.env.EMIS_API_URL;
    delete process.env.REACT_APP_EMIS_API_URL;
    disposeHttpClient();
  });

});
