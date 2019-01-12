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
const contentType = 'application/json';

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

  beforeEach(() => {
    delete process.env.EMIS_API_URL;
    delete process.env.REACT_APP_EMIS_API_URL;
    disposeHttpClient();
  });

});
