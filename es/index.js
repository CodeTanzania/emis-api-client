import axios from 'axios';
import { singularize, pluralize } from 'inflection';
import moment from 'moment';
import { merge, forEach, isEmpty, camelCase, toLower, isArray, isPlainObject, uniq, compact, first, max, min } from 'lodash';

// default http client
let client;

// create duplicate free array of values
const distinct = (...values) => uniq(compact([...values]));

// create dynamic camelized function name
const fn = (...name) => camelCase([...name].join(' '));

// get resource id from payload
const idOf = data => (data ? data._id || data.id : undefined); // eslint-disable-line

/**
 * @function mapIn
 * @name mapIn
 * @description map array values to params
 * @param {...Object} values values for in query
 * @returns {Object} in query options
 * @since 0.4.0
 * @version 0.1.0
 * @private
 */
const mapIn = (...values) => {
  let params = distinct(...values);
  params = params.length > 1 ? { $in: params } : first(params);
  return params;
};

/**
 * @function mapBetween
 * @name mapBetween
 * @description map date range values to params
 * @param {Object} between valid date range options
 * @param {Date} between.from min date value
 * @param {Date} between.to max date value
 * @returns {Object} between query options
 * @since 0.4.0
 * @version 0.1.0
 * @private
 */
const mapBetween = between => {
  const isBetween = between && (between.from || between.to);
  if (isBetween) {
    const span = merge({}, between);
    let upper = max(distinct(span.to, span.from));
    let lower = min(distinct(span.from, span.to));
    upper = moment(upper)
      .utc()
      .endOf('date')
      .toDate();
    lower = moment(lower)
      .utc()
      .startOf('date')
      .toDate();
    return {
      $gte: lower,
      $lte: upper,
    };
  }
  return between;
};

/**
 * @function mapRange
 * @name mapRange
 * @description map range(int, float, decimal) values to params
 * @param {Object} range valid range options
 * @param {Number} range.min range minimum value
 * @param {Number} range.max range maximum value
 * @returns {Object} range query options
 * @since 0.4.0
 * @version 0.1.0
 * @private
 */
const mapRange = range => {
  const isRange = (range && range.min) || range.max;
  if (isRange) {
    const span = merge({}, range);
    const upper = max(distinct(span.max, span.min));
    const lower = min(distinct(span.min, span.max));
    return {
      $gte: lower,
      $lte: upper,
    };
  }
  return range;
};

// supported content type
const CONTENT_TYPE = 'application/json';

// default http headers
const HEADERS = {
  Accept: CONTENT_TYPE,
  'Content-Type': CONTENT_TYPE,
};

/**
 * @function prepareParams
 * @name prepareParams
 * @description convert api query params as per API filtering specifications
 * @param {Object} params api call query params
 * @since 0.4.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * import { prepareParams } from 'emis-api-client';
 *
 * // array
 * const filters = prepareFilter({ filter: {name: ['Joe', 'Doe']} });
 * // => { filter: {name: {$in: ['Joe', 'Doe'] } } }
 *
 * // date
 * let filters = { filter: { createdAt: { from: '2019-01-01', to: '2019-01-02' } } };
 * filters = prepareFilter(filters);
 * // => { filter: { createdAt: { $gte: '2019-01-01', $lte: '2019-01-02' } } }
 */
const prepareParams = params => {
  // clone params
  const options = merge({}, params);

  // transform filters
  if (options.filter) {
    const transformFilter = (val, key) => {
      // array
      if (isArray(val)) {
        options.filter[key] = mapIn(...val);
      }
      // date between
      if (isPlainObject(val) && (val.from || val.to)) {
        options.filter[key] = mapBetween(val);
      }
      // range between
      if (isPlainObject(val) && (val.min || val.max)) {
        options.filter[key] = mapRange(val);
      }
    };
    forEach(options.filter, transformFilter);
  }

  // return params
  return options;
};

/**
 * @function createHttpClient
 * @name createHttpClient
 * @description create an http client if not exists
 * @param {String} API_URL base url to use to api calls
 * @return {Axios} A new instance of Axios
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * import { createHttpClient } from 'emis-api-client';
 * const httpClient = createHttpClient();
 */
const createHttpClient = API_BASE_URL => {
  if (!client) {
    // Dont destructure: Fix:ReferenceError: process is not defined in react
    const env = process.env; // eslint-disable-line
    const { EMIS_API_URL, REACT_APP_EMIS_API_URL } = env;
    const BASE_URL = API_BASE_URL || EMIS_API_URL || REACT_APP_EMIS_API_URL;
    const options = { baseURL: BASE_URL, headers: HEADERS };
    client = axios.create(options);
    client.id = Date.now();
  }
  return client;
};

/**
 * @function disposeHttpClient
 * @name disposeHttpClient
 * @description reset current http client in use.
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * import { disposeHttpClient } from 'emis-api-client';
 * disposeHttpClient();
 */
const disposeHttpClient = () => {
  client = null;
  return client;
};

/**
 * @function all
 * @name all
 * @description performing multiple concurrent requests.
 * @since 0.2.0
 * @version 0.1.0
 * @example
 * import { all, spread } from 'emis-api-client';
 * const request = all(getIncidentTypes(), getPlans());
 * request.then(spread((incidentTypes, plans) => { ... }));
 */
const all = (...promises) => axios.all([...promises]);

/**
 * @function spread
 * @name spread
 * @description Flattened array fullfillment to the formal parameters of the
 * fulfillment handler.
 * @since 0.2.0
 * @version 0.1.0
 * @example
 * import { all, spread } from 'emis-api-client';
 * const request = all(getIncidentTypes(), getPlans());
 * request.then(spread((incidentTypes, plans) => { ... }));
 */
const spread = axios.spread; // eslint-disable-line

/**
 * @function get
 * @name get
 * @description issue http get request to specified url.
 * @param {String} url valid http path.
 * @param {Object} [params] params that will be encoded into url query params.
 * @return {Promise} promise resolve with data on success or error on failure.
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * import { get } from 'emis-api-client';
 *
 * // list
 * const getUsers = get('/users', { age: { $in: [1, 2] } });
 * getUsers.then(users => { ... }).catch(error => { ... });
 *
 * // single
 * const getUser = get('/users/12');
 * getUser.then(user => { ... }).catch(error => { ... });
 */
const get = (url, params) => {
  const httpClient = createHttpClient();
  const options = prepareParams(params);
  return httpClient.get(url, { params: options });
};

/**
 * @function post
 * @name post
 * @description issue http post request to specified url.
 * @param {String} url valid http path.
 * @param {Object} data request payload to be encoded on http request body
 * @return {Promise} promise resolve with data on success or error on failure.
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * import { post } from 'emis-api-client';
 *
 * const postUser = post('/users', { age: 14 });
 * postUser.then(user => { ... }).catch(error => { ... });
 */
const post = (url, data) => {
  if (isEmpty(data)) {
    return Promise.reject(new Error('Missing Payload'));
  }
  const httpClient = createHttpClient();
  return httpClient.post(url, data);
};

/**
 * @function put
 * @name put
 * @description issue http put request to specified url.
 * @param {String} url valid http path.
 * @param {Object} data request payload to be encoded on http request body
 * @return {Promise} promise resolve with data on success or error on failure.
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * import { put } from 'emis-api-client';
 *
 * const putUser = put('/users/5c1766243c9d520004e2b542', { age: 11 });
 * putUser.then(user => { ... }).catch(error => { ... });
 */
const put = (url, data) => {
  if (isEmpty(data)) {
    return Promise.reject(new Error('Missing Payload'));
  }
  const httpClient = createHttpClient();
  return httpClient.put(url, data);
};

/**
 * @function patch
 * @name patch
 * @description issue http patch request to specified url.
 * @param {String} url valid http path.
 * @param {Object} data request payload to be encoded on http request body
 * @return {Promise} promise resolve with data on success or error on failure.
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * import { patch } from 'emis-api-client';
 *
 * const patchUser = patch('/users/5c1766243c9d520004e2b542', { age: 10 });
 * patchUser.then(user => { ... }).catch(error => { ... });
 */
const patch = (url, data) => {
  if (isEmpty(data)) {
    return Promise.reject(new Error('Missing Payload'));
  }
  const httpClient = createHttpClient();
  return httpClient.patch(url, data);
};

/**
 * @function del
 * @name del
 * @description issue http delete request to specified url.
 * @param {String} url valid http path.
 * @return {Promise} promise resolve with data on success or error on failure.
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * import { del } from 'emis-api-client';
 *
 * const deleteUser = del('/users/5c1766243c9d520004e2b542');
 * deleteUser.then(user => { ... }).catch(error => { ... });
 */
const del = url => {
  const httpClient = createHttpClient();
  return httpClient.delete(url);
};

/**
 * @function createHttpActionsFor
 * @name createHttpActionsFor
 * @description generate name http action shortcut to interact with resource
 * @param {String} resource valid http resource.
 * @return {Object} http actions to interact with a resource
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * import { createHttpActionsFor } from 'emis-api-client';
 *
 * const { deleteUser } = createHttpActionsFor('user');
 * const deleteUser = del('/users/5c1766243c9d520004e2b542');
 * deleteUser.then(user => { ... }).catch(error => { ... });
 */
const createHttpActionsFor = resource => {
  const singular = singularize(resource);
  const plural = pluralize(resource);
  const httpActions = {
    [fn('get', singular, 'Schema')]: () =>
      get(`/${toLower(plural)}/schema`).then(response => response.data),
    [fn('get', plural)]: params =>
      get(`/${toLower(plural)}`, params).then(response => response.data),
    [fn('get', singular)]: id =>
      get(`/${toLower(plural)}/${id}`).then(response => response.data),
    [fn('post', singular)]: data =>
      post(`/${toLower(plural)}`, data).then(response => response.data),
    [fn('put', singular)]: data =>
      put(`/${toLower(plural)}/${idOf(data)}`, data).then(
        response => response.data
      ),
    [fn('patch', singular)]: data =>
      patch(`/${toLower(plural)}/${idOf(data)}`, data).then(
        response => response.data
      ),
    [fn('delete', singular)]: id =>
      del(`/${toLower(plural)}/${id}`).then(response => response.data),
  };
  return httpActions;
};

const getSchemas = () =>
  get('/schemas').then(response => {
    const schemas = response.data;
    if (schemas) {
      schemas.Warehouse = schemas.Feature;
    }
    return schemas;
  });

const {
  getActivitySchema,
  getActivities,
  getActivity,
  postActivity,
  putActivity,
  patchActivity,
  deleteActivity,
} = createHttpActionsFor('activity');

const {
  getAdjustmentSchema,
  getAdjustments,
  getAdjustment,
  postAdjustment,
  putAdjustment,
  patchAdjustment,
  deleteAdjustment,
} = createHttpActionsFor('adjustment');

const {
  getAlertSchema,
  getAlerts,
  getAlert,
  postAlert,
  putAlert,
  patchAlert,
  deleteAlert,
} = createHttpActionsFor('alert');

const {
  getAssessmentSchema,
  getAssessments,
  getAssessment,
  postAssessment,
  putAssessment,
  patchAssessment,
  deleteAssessment,
} = createHttpActionsFor('assessment');

const {
  getFeatureSchema,
  getFeatures,
  getFeature,
  postFeature,
  putFeature,
  patchFeature,
  deleteFeature,
} = createHttpActionsFor('feature');

const {
  getIncidentSchema,
  getIncidents,
  getIncident,
  postIncident,
  putIncident,
  patchIncident,
  deleteIncident,
} = createHttpActionsFor('incident');

const {
  getIncidentTypeSchema,
  getIncidentTypes,
  getIncidentType,
  postIncidentType,
  putIncidentType,
  patchIncidentType,
  deleteIncidentType,
} = createHttpActionsFor('incidentType');

const {
  getIndicatorSchema,
  getIndicators,
  getIndicator,
  postIndicator,
  putIndicator,
  patchIndicator,
  deleteIndicator,
} = createHttpActionsFor('indicator');

const {
  getItemSchema,
  getItems,
  getItem,
  postItem,
  putItem,
  patchItem,
  deleteItem,
} = createHttpActionsFor('item');

const {
  getPartySchema,
  getParties,
  getParty,
  postParty,
  putParty,
  patchParty,
  deleteParty,
} = createHttpActionsFor('party');

const {
  getPermissionSchema,
  getPermissions,
  getPermission,
  postPermission,
  putPermission,
  patchPermission,
  deletePermission,
} = createHttpActionsFor('permission');

const {
  getPlanSchema,
  getPlans,
  getPlan,
  postPlan,
  putPlan,
  patchPlan,
  deletePlan,
} = createHttpActionsFor('plan');

const {
  getProcedureSchema,
  getProcedures,
  getProcedure,
  postProcedure,
  putProcedure,
  patchProcedure,
  deleteProcedure,
} = createHttpActionsFor('procedure');

const {
  getQuestionSchema,
  getQuestions,
  getQuestion,
  postQuestion,
  putQuestion,
  patchQuestion,
  deleteQuestion,
} = createHttpActionsFor('question');

const {
  getQuestionnaireSchema,
  getQuestionnaires,
  getQuestionnaire,
  postQuestionnaire,
  putQuestionnaire,
  patchQuestionnaire,
  deleteQuestionnaire,
} = createHttpActionsFor('questionnaire');

const {
  getRoleSchema,
  getRoles,
  getRole,
  postRole,
  putRole,
  patchRole,
  deleteRole,
} = createHttpActionsFor('role');

const {
  getStockSchema,
  getStocks,
  getStock,
  postStock,
  putStock,
  patchStock,
  deleteStock,
} = createHttpActionsFor('stock');

const {
  getWarehouseSchema,
  getWarehouses,
  getWarehouse,
  postWarehouse,
  putWarehouse,
  patchWarehouse,
  deleteWarehouse,
} = createHttpActionsFor('warehouse');

export { getSchemas, getActivitySchema, getActivities, getActivity, postActivity, putActivity, patchActivity, deleteActivity, getAdjustmentSchema, getAdjustments, getAdjustment, postAdjustment, putAdjustment, patchAdjustment, deleteAdjustment, getAlertSchema, getAlerts, getAlert, postAlert, putAlert, patchAlert, deleteAlert, getAssessmentSchema, getAssessments, getAssessment, postAssessment, putAssessment, patchAssessment, deleteAssessment, getFeatureSchema, getFeatures, getFeature, postFeature, putFeature, patchFeature, deleteFeature, getIncidentSchema, getIncidents, getIncident, postIncident, putIncident, patchIncident, deleteIncident, getIncidentTypeSchema, getIncidentTypes, getIncidentType, postIncidentType, putIncidentType, patchIncidentType, deleteIncidentType, getIndicatorSchema, getIndicators, getIndicator, postIndicator, putIndicator, patchIndicator, deleteIndicator, getItemSchema, getItems, getItem, postItem, putItem, patchItem, deleteItem, getPartySchema, getPartySchema as getStakeholderSchema, getParties, getParties as getStakeholders, getParty, getParty as getStakeholder, postParty, postParty as postStakeholder, putParty, putParty as putStakeholder, patchParty, patchParty as patchStakeholder, deleteParty, deleteParty as deleteStakeholder, getPermissionSchema, getPermissions, getPermission, postPermission, putPermission, patchPermission, deletePermission, getPlanSchema, getPlans, getPlan, postPlan, putPlan, patchPlan, deletePlan, getProcedureSchema, getProcedures, getProcedure, postProcedure, putProcedure, patchProcedure, deleteProcedure, getQuestionSchema, getQuestions, getQuestion, postQuestion, putQuestion, patchQuestion, deleteQuestion, getQuestionnaireSchema, getQuestionnaires, getQuestionnaire, postQuestionnaire, putQuestionnaire, patchQuestionnaire, deleteQuestionnaire, getRoleSchema, getRoles, getRole, postRole, putRole, patchRole, deleteRole, getStockSchema, getStocks, getStock, postStock, putStock, patchStock, deleteStock, getWarehouseSchema, getWarehouses, getWarehouse, postWarehouse, putWarehouse, patchWarehouse, deleteWarehouse, CONTENT_TYPE, HEADERS, prepareParams, createHttpClient, disposeHttpClient, all, spread, get, post, put, patch, del, createHttpActionsFor };
