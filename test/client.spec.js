import moment from 'moment';
import nock from 'nock';
import { expect } from 'chai';
import {
  CONTENT_TYPE,
  prepareParams,
  createHttpClient,
  disposeHttpClient,
  all,
  spread,
  get,
  post,
  put,
  patch,
  del,
  signin,
  normalizeResource,
  createGetSchemaHttpAction,
  createGetListHttpAction,
  createGetSingleHttpAction,
  createPostHttpAction,
  createPutHttpAction,
  createPatchHttpAction,
  createDeleteHttpAction,
  createHttpActionsFor,
  httpActions,
} from '../src/index';

const {
  getSchemas,
  getActivitySchema,
  getAdjustmentSchema,
  getAlertSchema,
  getAlertSourceSchema,
  getAssessmentSchema,
  getFeatureSchema,
  getIncidentSchema,
  getIncidentTypeSchema,
  getIndicatorSchema,
  getItemSchema,
  getPartySchema,
  getPermissionSchema,
  getPredefineSchema,
  getPlanSchema,
  getProcedureSchema,
  getQuestionSchema,
  getQuestionnaireSchema,
  getRoleSchema,
  getStockSchema,
  getWarehouseSchema,
  getPlans,
  getPlansExportUrl,
  getPlan,
  postPlan,
  putPlan,
  patchPlan,
  deletePlan,
} = httpActions;

describe('http client', () => {
  beforeEach(() => {
    delete process.env.EMIS_API_URL;
    delete process.env.REACT_APP_EMIS_API_URL;
    nock.cleanAll();
    disposeHttpClient();
  });

  it('should prepare list array params', () => {
    const filter = { name: ['joe', 'doe'] };
    const params = prepareParams({ filter });
    expect(params).to.exist;
    expect(params.filter).to.exist;
    expect(params.filter.name).to.exist;
    expect(params.filter.name).to.be.eql({ $in: ['joe', 'doe'] });
  });

  it('should prepare single item array params', () => {
    const filter = { name: ['joe'] };
    const params = prepareParams({ filter });
    expect(params).to.exist;
    expect(params.filter).to.exist;
    expect(params.filter.name).to.exist;
    expect(params.filter.name).to.be.equal('joe');
  });

  it('should prepare number range params', () => {
    let filter = { age: { min: 4, max: 5 } };
    let params = prepareParams({ filter });
    expect(params.filter).to.exist;
    expect(params.filter.age).to.be.eql({ $gte: 4, $lte: 5 });

    filter = { age: { min: 5, max: 4 } };
    params = prepareParams({ filter });
    expect(params.filter).to.exist;
    expect(params.filter.age).to.be.eql({ $gte: 4, $lte: 5 });

    filter = { age: { min: 4 } };
    params = prepareParams({ filter });
    expect(params.filter).to.exist;
    expect(params.filter.age).to.be.eql({ $gte: 4 });

    filter = { age: { max: 4 } };
    params = prepareParams({ filter });
    expect(params.filter).to.exist;
    expect(params.filter.age).to.be.eql({ $lte: 4 });
  });

  it('should prepare date between params', () => {
    const start = new Date('2019-01-01');
    const end = new Date('2019-01-03');
    const expected = {
      $gte: moment(start)
        .utc()
        .startOf('date')
        .toDate(),
      $lte: moment(end)
        .utc()
        .endOf('date')
        .toDate(),
    };

    let filter = { createdAt: { from: start, to: end } };
    let params = prepareParams({ filter });
    expect(params.filter).to.exist;
    expect(params.filter.createdAt).to.be.eql(expected);

    filter = { createdAt: { from: end, to: start } };
    params = prepareParams({ filter });
    expect(params.filter).to.exist;
    expect(params.filter.createdAt).to.be.eql(expected);

    filter = { createdAt: { from: start } };
    params = prepareParams({ filter });
    expect(params.filter).to.exist;
    expect(params.filter.createdAt).to.be.eql({ $gte: expected.$gte });

    filter = { createdAt: { to: end } };
    params = prepareParams({ filter });
    expect(params.filter).to.exist;
    expect(params.filter.createdAt).to.be.eql({ $lte: expected.$lte });
  });

  it('should normalize resource', () => {
    const resource = { shortcut: 'agency', wellknown: 'party' };
    const normalized = {
      shortcut: { singular: 'agency', plural: 'agencies' },
      wellknown: { singular: 'party', plural: 'parties' },
    };
    expect(normalizeResource(resource)).to.be.eql(normalized);
  });

  it('should normalize resource', () => {
    const resource = 'party';
    const normalized = {
      shortcut: { singular: 'party', plural: 'parties' },
      wellknown: { singular: 'party', plural: 'parties' },
    };
    expect(normalizeResource(resource)).to.be.eql(normalized);
  });

  it('should create get resource schema http action', () => {
    const resource = { wellknown: 'user' };
    const { getUserSchema } = createGetSchemaHttpAction(resource);
    expect(getUserSchema).to.exist;
    expect(getUserSchema).to.be.a('function');
    expect(getUserSchema.name).to.be.equal('getUserSchema');
    expect(getUserSchema.length).to.be.equal(0);
  });

  it('should create get resource list http action', () => {
    const resource = { wellknown: 'user' };
    const { getUsers } = createGetListHttpAction(resource);
    expect(getUsers).to.exist;
    expect(getUsers).to.be.a('function');
    expect(getUsers.name).to.be.equal('getUsers');
    expect(getUsers.length).to.be.equal(1);
  });

  it('should create get single resource http action', () => {
    const resource = { wellknown: 'user' };
    const { getUser } = createGetSingleHttpAction(resource);
    expect(getUser).to.exist;
    expect(getUser).to.be.a('function');
    expect(getUser.name).to.be.equal('getUser');
    expect(getUser.length).to.be.equal(1);
  });

  it('should create post resource http action', () => {
    const resource = { wellknown: 'user' };
    const { postUser } = createPostHttpAction(resource);
    expect(postUser).to.exist;
    expect(postUser).to.be.a('function');
    expect(postUser.name).to.be.equal('postUser');
    expect(postUser.length).to.be.equal(1);
  });

  it('should create put resource http action', () => {
    const resource = { wellknown: 'user' };
    const { putUser } = createPutHttpAction(resource);
    expect(putUser).to.exist;
    expect(putUser).to.be.a('function');
    expect(putUser.name).to.be.equal('putUser');
    expect(putUser.length).to.be.equal(1);
  });

  it('should create patch resource http action', () => {
    const resource = { wellknown: 'user' };
    const { patchUser } = createPatchHttpAction(resource);
    expect(patchUser).to.exist;
    expect(patchUser).to.be.a('function');
    expect(patchUser.name).to.be.equal('patchUser');
    expect(patchUser.length).to.be.equal(1);
  });

  it('should create delete resource http action', () => {
    const resource = { wellknown: 'user' };
    const { deleteUser } = createDeleteHttpAction(resource);
    expect(deleteUser).to.exist;
    expect(deleteUser).to.be.a('function');
    expect(deleteUser.name).to.be.equal('deleteUser');
    expect(deleteUser.length).to.be.equal(1);
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

  it('should handle http get on /resource', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = { data: [] };
    nock(baseUrl)
      .get('/users')
      .query(true)
      .reply(200, data);

    get('/users')
      .then(response => {
        expect(response).to.exist;
        expect(response.data).to.exist;
        expect(response).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should handle http get on /resource/:id', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .get('/users/5c1766243c9d520004e2b542')
      .query(true)
      .reply(200, data);

    get('/users/5c1766243c9d520004e2b542')
      .then(response => {
        expect(response).to.exist;
        expect(response).to.exist;
        expect(response).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should handle http post on /resource', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .post('/users')
      .query(true)
      .reply(201, data);

    post('/users', { age: 11 })
      .then(response => {
        expect(response).to.exist;
        expect(response).to.exist;
        expect(response).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should reject http post on /resource if no payload', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .post('/users')
      .query(true)
      .reply(201, data);

    post('/users', {}).catch(error => {
      expect(error).to.exist;
      expect(error.message).to.be.equal('Missing Payload');
      done();
    });
  });

  it('should handle http put on /resource/:id', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .put('/users/5c1766243c9d520004e2b542')
      .query(true)
      .reply(200, data);

    put('/users/5c1766243c9d520004e2b542', { age: 11 })
      .then(response => {
        expect(response).to.exist;
        expect(response).to.exist;
        expect(response).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should reject http put on /resource/:id if no payload', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .put('/users/5c1766243c9d520004e2b542')
      .query(true)
      .reply(200, data);

    put('/users/5c1766243c9d520004e2b542', {}).catch(error => {
      expect(error).to.exist;
      expect(error.message).to.be.equal('Missing Payload');
      done();
    });
  });

  it('should handle http patch on /resource/:id', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .patch('/users/5c1766243c9d520004e2b542')
      .query(true)
      .reply(200, data);

    patch('/users/5c1766243c9d520004e2b542', { age: 11 })
      .then(response => {
        expect(response).to.exist;
        expect(response).to.exist;
        expect(response).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should handle http post on /signin', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {
      success: true,
      party: {
        _id: '5cf8e6f37e659b3a1ea6fd4c',
        updatedAt: '2019-06-06T10:18:24.976Z',
        createdAt: '2019-06-06T10:12:03.542Z',
        lockedAt: null,
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    };
    nock(baseUrl)
      .post('/signin')
      .query(true)
      .reply(200, data);

    signin({ email: '', password: '' })
      .then(response => {
        expect(response).to.exist;
        expect(response).to.exist;
        expect(response).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should reject http patch on /resource/:id if no payload', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .patch('/users/5c1766243c9d520004e2b542')
      .query(true)
      .reply(200, data);

    patch('/users/5c1766243c9d520004e2b542', {}).catch(error => {
      expect(error).to.exist;
      expect(error.message).to.be.equal('Missing Payload');
      done();
    });
  });

  it('should handle http delete on /resource/:id', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .delete('/users/5c1766243c9d520004e2b542')
      .query(true)
      .reply(200, data);

    del('/users/5c1766243c9d520004e2b542')
      .then(response => {
        expect(response).to.exist;
        expect(response).to.exist;
        expect(response).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should handle failed request error', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;

    get('/users').catch(error => {
      expect(error).to.exist;
      expect(error.code).to.be.equal('ENOTFOUND');
      done();
    });
  });

  it('should handle http response error', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {
      status: 400,
      code: 400,
      name: 'Error',
      message: 'Bad Request',
      description: 'Bad Request',
      errors: {},
    };
    nock(baseUrl)
      .get('/users')
      .query(true)
      .reply(400, data);

    get('/users').catch(error => {
      expect(error).to.exist;
      expect(error.status).to.be.equal(data.status);
      expect(error.code).to.be.equal(data.code);
      expect(error.name).to.be.equal(data.name);
      expect(error.message).be.equal(data.message);
      expect(error.description).to.be.equal(data.description);
      expect(error.errors).to.be.eql(data.errors);
      done();
    });
  });

  it('should create named http actions for a resource', () => {
    const {
      getUserSchema,
      getUsers,
      getUser,
      postUser,
      putUser,
      patchUser,
      deleteUser,
    } = createHttpActionsFor('user');
    expect(getUserSchema).to.exist;
    expect(getUserSchema).to.be.a('function');
    expect(getUserSchema.name).to.be.equal('getUserSchema');
    expect(getUserSchema.length).to.be.be.equal(0);

    expect(getUsers).to.exist;
    expect(getUsers).to.be.a('function');
    expect(getUsers.name).to.be.equal('getUsers');
    expect(getUsers.length).to.be.be.equal(1);

    expect(getUser).to.exist;
    expect(getUser).to.be.a('function');
    expect(getUser.name).to.be.equal('getUser');
    expect(getUser.length).to.be.be.equal(1);

    expect(postUser).to.exist;
    expect(postUser).to.be.a('function');
    expect(postUser.name).to.be.equal('postUser');
    expect(postUser.length).to.be.be.equal(1);

    expect(putUser).to.exist;
    expect(putUser).to.be.a('function');
    expect(putUser.name).to.be.equal('putUser');
    expect(putUser.length).to.be.be.equal(1);

    expect(patchUser).to.exist;
    expect(patchUser).to.be.a('function');
    expect(patchUser.name).to.be.equal('patchUser');
    expect(patchUser.length).to.be.be.equal(1);

    expect(deleteUser).to.exist;
    expect(deleteUser).to.be.a('function');
    expect(deleteUser.name).to.be.equal('deleteUser');
    expect(deleteUser.length).to.be.be.equal(1);
  });

  it('should export EMIS resource http action shortcuts', () => {
    expect(createHttpActionsFor).to.exist;
    expect(getSchemas).to.exist;
    expect(getActivitySchema).to.exist;
    expect(getAdjustmentSchema).to.exist;
    expect(getAlertSchema).to.exist;
    expect(getAlertSourceSchema).to.exist;
    expect(getAssessmentSchema).to.exist;
    expect(getFeatureSchema).to.exist;
    expect(getIncidentSchema).to.exist;
    expect(getIncidentTypeSchema).to.exist;
    expect(getIndicatorSchema).to.exist;
    expect(getItemSchema).to.exist;
    expect(getPartySchema).to.exist;
    expect(getPermissionSchema).to.exist;
    expect(getPredefineSchema).to.exist;
    expect(getPlanSchema).to.exist;
    expect(getProcedureSchema).to.exist;
    expect(getQuestionSchema).to.exist;
    expect(getQuestionnaireSchema).to.exist;
    expect(getRoleSchema).to.exist;
    expect(getStockSchema).to.exist;
    expect(getWarehouseSchema).to.exist;
  });

  it('should handle http get on /resource use generated actions', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = { data: [] };
    nock(baseUrl)
      .get('/plans')
      .query(true)
      .reply(200, data);

    getPlans()
      .then(plans => {
        expect(plans).to.exist;
        expect(plans).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should generate resource export url', () => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const url = getPlansExportUrl();
    expect(url).to.be.contain(`${baseUrl}/plans/export`);
  });

  it('should handle http get on /resource/:id use generated actions', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .get('/plans/5c1766243c9d520004e2b542')
      .query(true)
      .reply(200, data);

    getPlan('5c1766243c9d520004e2b542')
      .then(plan => {
        expect(plan).to.exist;
        expect(plan).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should handle http post on /resource use generated actions', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .post('/plans')
      .query(true)
      .reply(201, data);

    postPlan({ description: 'Voluptas' })
      .then(plan => {
        expect(plan).to.exist;
        expect(plan).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should handle http put on /resource/:id use generated actions', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .put('/plans/5c1766243c9d520004e2b542')
      .query(true)
      .reply(200, data);

    putPlan({ _id: '5c1766243c9d520004e2b542', description: 'Voluptas' })
      .then(plan => {
        expect(plan).to.exist;
        expect(plan).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should handle http patch on /resource/:id use generated actions', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .patch('/plans/5c1766243c9d520004e2b542')
      .query(true)
      .reply(200, data);

    patchPlan({ _id: '5c1766243c9d520004e2b542', description: 'Voluptas' })
      .then(plan => {
        expect(plan).to.exist;
        expect(plan).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should handle http delete on /resource/:id use generated actions', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = {};
    nock(baseUrl)
      .delete('/plans/5c1766243c9d520004e2b542')
      .query(true)
      .reply(200, data);

    deletePlan('5c1766243c9d520004e2b542')
      .then(plan => {
        expect(plan).to.exist;
        expect(plan).to.be.eql(data);
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  it('should be able to issue request in parallel', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = [{}];
    nock(baseUrl)
      .get('/incidenttypes/schema')
      .query(true)
      .reply(200, data);
    nock(baseUrl)
      .get('/plans/schema')
      .query(true)
      .reply(200, data);

    all(getIncidentTypeSchema(), getPlanSchema())
      .then(
        spread((incidentTypeSchema, planSchema) => {
          expect(incidentTypeSchema).to.exist;
          expect(planSchema).to.exist;
          expect(incidentTypeSchema).to.be.eql(data);
          expect(planSchema).to.be.eql(data);
          done();
        })
      )
      .catch(error => {
        done(error);
      });
  });

  it('should handle http get on /schemas', done => {
    const baseUrl = 'https://api.emis.io/v1';
    process.env.EMIS_API_URL = baseUrl;
    const data = { Plan: {}, Feature: {} };
    nock(baseUrl)
      .get('/schemas')
      .query(true)
      .reply(200, data);

    getSchemas()
      .then(schemas => {
        expect(schemas).to.exist;
        expect(schemas).to.be.an('object');
        expect(schemas.Plan).to.exist;
        expect(schemas.Feature).to.exist;
        expect(schemas.Warehouse).to.exist;
        done(null, data);
      })
      .catch(error => {
        done(error);
      });
  });

  after(() => {
    delete process.env.EMIS_API_URL;
    delete process.env.REACT_APP_EMIS_API_URL;
    nock.cleanAll();
    disposeHttpClient();
  });
});
