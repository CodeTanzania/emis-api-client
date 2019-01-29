'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var axios = _interopDefault(require('axios'));
var moment = _interopDefault(require('moment'));
var inflection = require('inflection');
var lodash = require('lodash');

// default http client
let client;

// create duplicate free array of values
const distinct = (...values) => lodash.uniq(lodash.compact([...values]));

// create dynamic camelized function name
const fn = (...name) => lodash.camelCase([...name].join(' '));

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
  params = params.length > 1 ? { $in: params } : lodash.first(params);
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
    const { to: upper, from: lower } = lodash.merge({}, between);
    // <= to
    if (upper && !lower) {
      return {
        $lte: moment(upper)
          .utc()
          .endOf('date')
          .toDate(),
      };
    }
    // >= from
    if (!upper && lower) {
      return {
        $gte: moment(lower)
          .utc()
          .startOf('date')
          .toDate(),
      };
    }
    // >= from && <= to
    if (upper && lower) {
      return {
        $gte: moment(lodash.min([upper, lower]))
          .utc()
          .startOf('date')
          .toDate(),
        $lte: moment(lodash.max([upper, lower]))
          .utc()
          .endOf('date')
          .toDate(),
      };
    }
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
    const { max: upper, min: lower } = lodash.merge({}, range);
    // <= max
    if (upper && !lower) {
      return { $lte: upper };
    }
    // >= min
    if (!upper && lower) {
      return { $gte: lower };
    }
    // >= min && <= max
    if (upper && lower) {
      return { $gte: lodash.min([upper, lower]), $lte: lodash.max([upper, lower]) };
    }
  }
  return range;
};

/**
 * @name CONTENT_TYPE
 * @description supported content type
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 */
const CONTENT_TYPE = 'application/json';

/**
 * @name HEADERS
 * @description default http headers
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 */
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
 *
 * // number
 * let filters = { filter: { age: { min: 4, max: 14 } } };
 * filters = prepareFilter(filters);
 * // => { filter: { age: { $gte: 14, $lte: 4 } } }
 */
const prepareParams = params => {
  // default params
  const defaults = { sort: { updatedAt: -1 } };
  // clone params
  const options = lodash.merge({}, defaults, params);

  // transform filters
  if (options.filter) {
    const transformFilter = (val, key) => {
      // array
      if (lodash.isArray(val)) {
        options.filter[key] = mapIn(...val);
      }
      // date between
      if (lodash.isPlainObject(val) && (val.from || val.to)) {
        options.filter[key] = mapBetween(val);
      }
      // range between
      if (lodash.isPlainObject(val) && (val.min || val.max)) {
        options.filter[key] = mapRange(val);
      }
    };
    lodash.forEach(options.filter, transformFilter);
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
  if (lodash.isEmpty(data)) {
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
  if (lodash.isEmpty(data)) {
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
  if (lodash.isEmpty(data)) {
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
  const singular = inflection.singularize(resource);
  const plural = inflection.pluralize(resource);
  const httpActions = {
    [fn('get', singular, 'Schema')]: () =>
      get(`/${lodash.toLower(plural)}/schema`).then(response => response.data),
    [fn('get', plural)]: params =>
      get(`/${lodash.toLower(plural)}`, params).then(response => response.data),
    [fn('get', singular)]: id =>
      get(`/${lodash.toLower(plural)}/${id}`).then(response => response.data),
    [fn('post', singular)]: data =>
      post(`/${lodash.toLower(plural)}`, data).then(response => response.data),
    [fn('put', singular)]: data =>
      put(`/${lodash.toLower(plural)}/${idOf(data)}`, data).then(
        response => response.data
      ),
    [fn('patch', singular)]: data =>
      patch(`/${lodash.toLower(plural)}/${idOf(data)}`, data).then(
        response => response.data
      ),
    [fn('delete', singular)]: id =>
      del(`/${lodash.toLower(plural)}/${id}`).then(response => response.data),
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
  getAlertSourceSchema,
  getAlertSources,
  getAlertSource,
  postAlertSource,
  putAlertSource,
  patchAlertSource,
  deleteAlertSource,
} = createHttpActionsFor('alertSource');

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

exports.getSchemas = getSchemas;
exports.getActivitySchema = getActivitySchema;
exports.getActivities = getActivities;
exports.getActivity = getActivity;
exports.postActivity = postActivity;
exports.putActivity = putActivity;
exports.patchActivity = patchActivity;
exports.deleteActivity = deleteActivity;
exports.getAdjustmentSchema = getAdjustmentSchema;
exports.getAdjustments = getAdjustments;
exports.getAdjustment = getAdjustment;
exports.postAdjustment = postAdjustment;
exports.putAdjustment = putAdjustment;
exports.patchAdjustment = patchAdjustment;
exports.deleteAdjustment = deleteAdjustment;
exports.getAlertSchema = getAlertSchema;
exports.getAlerts = getAlerts;
exports.getAlert = getAlert;
exports.postAlert = postAlert;
exports.putAlert = putAlert;
exports.patchAlert = patchAlert;
exports.deleteAlert = deleteAlert;
exports.getAlertSourceSchema = getAlertSourceSchema;
exports.getAlertSources = getAlertSources;
exports.getAlertSource = getAlertSource;
exports.postAlertSource = postAlertSource;
exports.putAlertSource = putAlertSource;
exports.patchAlertSource = patchAlertSource;
exports.deleteAlertSource = deleteAlertSource;
exports.getAssessmentSchema = getAssessmentSchema;
exports.getAssessments = getAssessments;
exports.getAssessment = getAssessment;
exports.postAssessment = postAssessment;
exports.putAssessment = putAssessment;
exports.patchAssessment = patchAssessment;
exports.deleteAssessment = deleteAssessment;
exports.getFeatureSchema = getFeatureSchema;
exports.getFeatures = getFeatures;
exports.getFeature = getFeature;
exports.postFeature = postFeature;
exports.putFeature = putFeature;
exports.patchFeature = patchFeature;
exports.deleteFeature = deleteFeature;
exports.getIncidentSchema = getIncidentSchema;
exports.getIncidents = getIncidents;
exports.getIncident = getIncident;
exports.postIncident = postIncident;
exports.putIncident = putIncident;
exports.patchIncident = patchIncident;
exports.deleteIncident = deleteIncident;
exports.getIncidentTypeSchema = getIncidentTypeSchema;
exports.getIncidentTypes = getIncidentTypes;
exports.getIncidentType = getIncidentType;
exports.postIncidentType = postIncidentType;
exports.putIncidentType = putIncidentType;
exports.patchIncidentType = patchIncidentType;
exports.deleteIncidentType = deleteIncidentType;
exports.getIndicatorSchema = getIndicatorSchema;
exports.getIndicators = getIndicators;
exports.getIndicator = getIndicator;
exports.postIndicator = postIndicator;
exports.putIndicator = putIndicator;
exports.patchIndicator = patchIndicator;
exports.deleteIndicator = deleteIndicator;
exports.getItemSchema = getItemSchema;
exports.getItems = getItems;
exports.getItem = getItem;
exports.postItem = postItem;
exports.putItem = putItem;
exports.patchItem = patchItem;
exports.deleteItem = deleteItem;
exports.getPartySchema = getPartySchema;
exports.getStakeholderSchema = getPartySchema;
exports.getParties = getParties;
exports.getStakeholders = getParties;
exports.getParty = getParty;
exports.getStakeholder = getParty;
exports.postParty = postParty;
exports.postStakeholder = postParty;
exports.putParty = putParty;
exports.putStakeholder = putParty;
exports.patchParty = patchParty;
exports.patchStakeholder = patchParty;
exports.deleteParty = deleteParty;
exports.deleteStakeholder = deleteParty;
exports.getPermissionSchema = getPermissionSchema;
exports.getPermissions = getPermissions;
exports.getPermission = getPermission;
exports.postPermission = postPermission;
exports.putPermission = putPermission;
exports.patchPermission = patchPermission;
exports.deletePermission = deletePermission;
exports.getPlanSchema = getPlanSchema;
exports.getPlans = getPlans;
exports.getPlan = getPlan;
exports.postPlan = postPlan;
exports.putPlan = putPlan;
exports.patchPlan = patchPlan;
exports.deletePlan = deletePlan;
exports.getProcedureSchema = getProcedureSchema;
exports.getProcedures = getProcedures;
exports.getProcedure = getProcedure;
exports.postProcedure = postProcedure;
exports.putProcedure = putProcedure;
exports.patchProcedure = patchProcedure;
exports.deleteProcedure = deleteProcedure;
exports.getQuestionSchema = getQuestionSchema;
exports.getQuestions = getQuestions;
exports.getQuestion = getQuestion;
exports.postQuestion = postQuestion;
exports.putQuestion = putQuestion;
exports.patchQuestion = patchQuestion;
exports.deleteQuestion = deleteQuestion;
exports.getQuestionnaireSchema = getQuestionnaireSchema;
exports.getQuestionnaires = getQuestionnaires;
exports.getQuestionnaire = getQuestionnaire;
exports.postQuestionnaire = postQuestionnaire;
exports.putQuestionnaire = putQuestionnaire;
exports.patchQuestionnaire = patchQuestionnaire;
exports.deleteQuestionnaire = deleteQuestionnaire;
exports.getRoleSchema = getRoleSchema;
exports.getRoles = getRoles;
exports.getRole = getRole;
exports.postRole = postRole;
exports.putRole = putRole;
exports.patchRole = patchRole;
exports.deleteRole = deleteRole;
exports.getStockSchema = getStockSchema;
exports.getStocks = getStocks;
exports.getStock = getStock;
exports.postStock = postStock;
exports.putStock = putStock;
exports.patchStock = patchStock;
exports.deleteStock = deleteStock;
exports.getWarehouseSchema = getWarehouseSchema;
exports.getWarehouses = getWarehouses;
exports.getWarehouse = getWarehouse;
exports.postWarehouse = postWarehouse;
exports.putWarehouse = putWarehouse;
exports.patchWarehouse = patchWarehouse;
exports.deleteWarehouse = deleteWarehouse;
exports.CONTENT_TYPE = CONTENT_TYPE;
exports.HEADERS = HEADERS;
exports.prepareParams = prepareParams;
exports.createHttpClient = createHttpClient;
exports.disposeHttpClient = disposeHttpClient;
exports.all = all;
exports.spread = spread;
exports.get = get;
exports.post = post;
exports.put = put;
exports.patch = patch;
exports.del = del;
exports.createHttpActionsFor = createHttpActionsFor;
