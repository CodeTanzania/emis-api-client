'use strict';

const moment = require('moment');
const axios = require('axios');
const buildURL = require('axios/lib/helpers/buildURL');
const jsonwebtoken = require('jsonwebtoken');
const inflection = require('inflection');
const common = require('@lykmapipo/common');
const env = require('@lykmapipo/env');
const lodash = require('lodash');

// default http client
let client;
let jwtToken;

// client base url
let BASE_URL;

const isBrowser =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'; // eslint-disable-line

/**
 * @function
 * @name getJwtToken
 * @description retrieve jwt token from session storage if not set
 * @return {string| undefined} jwt token
 * @since 0.14.0
 * @version 0.1.0
 */
const getJwtToken = () => {
  if (lodash.isEmpty(jwtToken)) {
    if (isBrowser) {
      jwtToken = sessionStorage.getItem('token'); // eslint-disable-line
    }
  }

  return jwtToken;
};

/**
 * @function isTokenValid
 * @name isTokenValid
 * @description check if jwt token from is valid or not
 * @returns {boolean} check if token is valid or not
 * @since 0.14.0
 * @version 0.1.0
 * @example
 * import { isTokenValid } from 'emis-api-client';
 *
 * const isAuthenticated = isTokenValid();
 */
const isTokenValid = () => {
  const JWT_SECRET = env.getString('REACT_APP_JWT_SECRET');

  jwtToken = getJwtToken(); // ensure token is set

  if (lodash.isEmpty(jwtToken)) {
    return false;
  }

  try {
    jsonwebtoken.verify(jwtToken, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * @function mapResponseToError
 * @name mapResponseToError
 * @description convert axios error to js native error
 * @param {Object} exception axios http error response
 * @returns {Promise} promise rejection
 * @see {@link https://github.com/axios/axios#handling-errors}
 * @since 0.12.0
 * @version 0.1.0
 * @private
 */
const mapResponseToError = exception => {
  // obtain error details
  let { code, status, message, description, stack, errors, data } = exception;
  const { request, response } = exception;

  // handle server response error
  if (response) {
    code = response.code || code;
    status = response.status || status;
    data = response.data || data || {};
    message = data.message || response.statusText || message;
    errors = response.errors || errors || {};
    stack = response.stack || data.stack || stack;
  }

  // handle no server response
  if (request) {
    description = description || 'Server Not Responding';
  }

  // initialize error
  let error = new Error(message);
  error.stack = stack;

  // update error object
  error = lodash.merge(error, { code, status, message, description, errors, ...data });

  // return normalized native error
  return Promise.reject(error);
};

/**
 * @function mapResponseToData
 * @name mapResponseToData
 * @description convert axios http response to data
 * @param {Object} response axios http response
 * @returns {Object} response data
 * @since 0.13.0
 * @version 0.1.0
 * @private
 */
const mapResponseToData = response => response.data;

/**
 * @function wrapRequest
 * @name wrapRequest
 * @description wrap http request and convert response to error or data
 * @param {Promise} request valid axios http request object
 * @returns {Promise} request with normalized response error and data
 * @since 0.13.0
 * @version 0.1.0
 * @private
 */
const wrapRequest = request => {
  return request.then(mapResponseToData).catch(mapResponseToError);
};

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
  let params = common.uniq([...values]);
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
    const { to: upper, from: lower } = common.mergeObjects(between);
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
    const { max: upper, min: lower } = common.mergeObjects(range);
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
  Authorization: `Bearer ${getJwtToken()}`,
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
  const options = common.mergeObjects(defaults, params);

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
    const EMIS_API_URL = env.getString('EMIS_API_URL');
    const REACT_APP_EMIS_API_URL = env.getString('REACT_APP_EMIS_API_URL');
    BASE_URL = API_BASE_URL || EMIS_API_URL || REACT_APP_EMIS_API_URL;
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
  return wrapRequest(httpClient.get(url, { params: options }));
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
  return wrapRequest(httpClient.post(url, data));
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
  return wrapRequest(httpClient.put(url, data));
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
  return wrapRequest(httpClient.patch(url, data));
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
  return wrapRequest(httpClient.delete(url));
};

/**
 * @function singin
 * @name signin
 * @description Signin user with provided credentials
 * @param {object} credentials Username and password
 * @returns {object} Object having party, permission and other meta data
 * @since 0.14.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * import { signin } from 'emis-api-client';
 *
 * signin({ email:'', password:'' }).then(results => {});
 */
const signin = credentials => {
  const defaultCredentials = { email: '', password: '' };
  const payload = lodash.isEmpty(credentials)
    ? defaultCredentials
    : lodash.merge(defaultCredentials, credentials);

  return post('/signin', payload).then(results => {
    if (isBrowser) {
      // persist token and party in session storage
      sessionStorage.setItem('token', results.token); // eslint-disable-line
      sessionStorage.setItem('party', JSON.stringify(results.party)); // eslint-disable-line
      jwtToken = results.token;
    }

    return results;
  });
};

/**
 * @function signout
 * @name signout
 * @description Signout current signin user and clear session Storage
 * @since 0.14.0
 * @version 0.2.0
 * @static
 * @public
 * @example
 * import { signout } from 'emis-api-client';
 *
 * signout();
 */
const signout = () => {
  jwtToken = undefined; // reset instance jwt token

  if (isBrowser) {
    sessionStorage.clear(); // eslint-disable-line
  }
};

/**
 * @function normalizeResource
 * @name normalizeResource
 * @description normalize resource for action http building
 * @param {Object} resource valid http resource definition
 * @return {Object} normalized http resource definition
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
const normalizeResource = resource => {
  // normalize & get copy
  const definition = lodash.isString(resource)
    ? { wellknown: resource }
    : common.mergeObjects(resource);

  // rormalize wellknown
  const { wellknown } = definition;
  let singular = inflection.singularize(wellknown);
  let plural = inflection.pluralize(wellknown);
  definition.wellknown = { singular, plural };

  // rormalize shortcut
  const { shortcut } = definition;
  singular = inflection.singularize(shortcut || wellknown);
  plural = inflection.pluralize(shortcut || wellknown);
  definition.shortcut = { singular, plural };

  // return resource definition
  return definition;
};

/**
 * @function createGetSchemaHttpAction
 * @name createGetSchemaHttpAction
 * @description generate http action to obtain resource schema definition
 * @param {Object} resource valid http resource definition
 * @return {Object} http action to get resource schema
 * @since 0.7.0
 * @version 0.1.0
 * @example
 * import { createGetSchemaHttpAction } from 'emis-api-client';
 *
 * const resource = { wellknown: 'user' };
 * const getUserSchema = createGetSchemaHttpAction(resource);
 * getUserSchema().then(schema => { ... }).catch(error => { ... });
 */
const createGetSchemaHttpAction = resource => {
  // ensure resource
  const {
    shortcut: { singular },
    wellknown: { plural },
    bucket,
  } = normalizeResource(resource);

  // generate method name
  const methodName = common.variableNameFor('get', singular, 'Schema');

  // build action
  const action = {
    [methodName]: () => {
      // derive endpoint
      let endpoint = `/${lodash.toLower(plural)}/schema`;
      if (!lodash.isEmpty(bucket)) {
        endpoint = `/${lodash.toLower(plural)}/${bucket}/schema`;
      }
      // issue http request
      return get(endpoint);
    },
  };

  // return get schema action
  return action;
};

/**
 * @function createExportUrlHttpAction
 * @name createExportUrlHttpAction
 * @description generate http action to generate resource export link
 * @param {Object} resource valid http resource definition
 * @return {Object} http action to get resource list
 * @since 0.9.0
 * @version 0.1.0
 * @example
 * import { createExportUrlHttpAction } from 'emis-api-client';
 *
 * const resource = { wellknown: 'user' };
 * const getUsersExportUrl = createExportUrlHttpAction(resource);
 * getUsersExportUrl(); //=> /users/export
 */
const createExportUrlHttpAction = resource => {
  // ensure resource
  const { shortcut, wellknown, bucket } = normalizeResource(resource);

  // generate method name
  const methodName = common.variableNameFor('get', shortcut.plural, 'export', 'url');

  // build action
  const action = {
    [methodName]: options => {
      // prepare params
      const params = prepareParams(common.mergeObjects(resource.params, options));
      // derive endpoint
      let endpoint = `${BASE_URL}/${lodash.toLower(wellknown.plural)}/export`;
      if (!lodash.isEmpty(bucket)) {
        endpoint = `${BASE_URL}/${lodash.toLower(wellknown.plural)}/${bucket}/export`;
      }
      // build export url
      const url = buildURL(endpoint, params);
      return url;
    },
  };

  // return get resource export url action
  return action;
};

/**
 * @function createGetListHttpAction
 * @name createGetListHttpAction
 * @description generate http action to obtain resource list
 * @param {Object} resource valid http resource definition
 * @return {Object} http action to get resource list
 * @since 0.7.0
 * @version 0.1.0
 * @example
 * import { createGetListHttpAction } from 'emis-api-client';
 *
 * const resource = { wellknown: 'user' };
 * const getUsers = createGetListHttpAction(resource);
 * getUsers().then(users => { ... }).catch(error => { ... });
 */
const createGetListHttpAction = resource => {
  // ensure resource
  const { shortcut, wellknown, bucket } = normalizeResource(resource);

  // generate method name
  const methodName = common.variableNameFor('get', shortcut.plural);

  // build action
  const action = {
    [methodName]: options => {
      // prepare params
      const params = common.mergeObjects(resource.params, options);
      // derive endpoint
      let endpoint = `/${lodash.toLower(wellknown.plural)}`;
      if (!lodash.isEmpty(bucket)) {
        endpoint = `/${lodash.toLower(wellknown.plural)}/${bucket}`;
      }
      // issue http request
      return get(endpoint, params);
    },
  };

  // return get resource list action
  return action;
};

/**
 * @function createGetSingleHttpAction
 * @name createGetSingleHttpAction
 * @description generate http action to obtain single resource
 * @param {Object} resource valid http resource definition
 * @return {Object} http action to get single resource
 * @since 0.7.0
 * @version 0.1.0
 * @example
 * import { createGetSingleHttpAction } from 'emis-api-client';
 *
 * const resource = { wellknown: 'user' };
 * const getUser = createGetSingleHttpAction(resource);
 * getUser('5c176624').then(user => { ... }).catch(error => { ... });
 */
const createGetSingleHttpAction = resource => {
  // ensure resource
  const {
    shortcut: { singular },
    wellknown: { plural },
    bucket,
  } = normalizeResource(resource);

  // generate method name
  const methodName = common.variableNameFor('get', singular);

  // build action
  const action = {
    [methodName]: id => {
      // prepare params
      const params = common.mergeObjects(resource.params);
      // derive endpoint
      let endpoint = `/${lodash.toLower(plural)}/${id}`;
      if (!lodash.isEmpty(bucket)) {
        endpoint = `/${lodash.toLower(plural)}/${bucket}/${id}`;
      }
      // issue http request
      return get(endpoint, params);
    },
  };

  // return get single resource action
  return action;
};

/**
 * @function createPostHttpAction
 * @name createPostHttpAction
 * @description generate http action to obtain single resource
 * @param {Object} resource valid http resource definition
 * @return {Object} http action to get single resource
 * @since 0.7.0
 * @version 0.1.0
 * @example
 * import { createPostHttpAction } from 'emis-api-client';
 *
 * const resource = { wellknown: 'user' };
 * const postUser = createPostHttpAction(resource);
 * postUser({ name: ... }).then(user => { ... }).catch(error => { ... });
 */
const createPostHttpAction = resource => {
  // ensure resource
  const {
    shortcut: { singular },
    wellknown: { plural },
    bucket,
  } = normalizeResource(resource);

  // generate method name
  const methodName = common.variableNameFor('post', singular);

  // build action
  const action = {
    [methodName]: payload => {
      // prepare data
      const defaults = lodash.omit((resource.params || {}).filter, 'deletedAt');
      const data = common.mergeObjects(payload, defaults);
      // derive endpoint
      let endpoint = `/${lodash.toLower(plural)}`;
      if (!lodash.isEmpty(bucket)) {
        endpoint = `/${lodash.toLower(plural)}/${bucket}`;
      }
      // issue http request
      return post(endpoint, data);
    },
  };

  // return post single resource action
  return action;
};

/**
 * @function createPutHttpAction
 * @name createPutHttpAction
 * @description generate http action to obtain single resource
 * @param {Object} resource valid http resource definition
 * @return {Object} http action to get single resource
 * @since 0.7.0
 * @version 0.1.0
 * @example
 * import { createPutHttpAction } from 'emis-api-client';
 *
 * const resource = { wellknown: 'user' };
 * const putUser = createPutHttpAction(resource);
 * putUser({ _id: ..., name: ...}).then(user => { ... }).catch(error => { ... });
 */
const createPutHttpAction = resource => {
  // ensure resource
  const {
    shortcut: { singular },
    wellknown: { plural },
    bucket,
  } = normalizeResource(resource);

  // generate method name
  const methodName = common.variableNameFor('put', singular);

  // build action
  const action = {
    [methodName]: payload => {
      // prepare data
      const defaults = lodash.omit((resource.params || {}).filter, 'deletedAt');
      const data = common.mergeObjects(payload, defaults);
      // derive endpoint
      let endpoint = `/${lodash.toLower(plural)}/${common.idOf(data)}`;
      if (!lodash.isEmpty(bucket)) {
        endpoint = `/${lodash.toLower(plural)}/${bucket}/${common.idOf(data)}`;
      }
      // issue http request
      return put(endpoint, data);
    },
  };

  // return put single resource action
  return action;
};

/**
 * @function createPatchHttpAction
 * @name createPatchHttpAction
 * @description generate http action to obtain single resource
 * @param {Object} resource valid http resource definition
 * @return {Object} http action to get single resource
 * @since 0.7.0
 * @version 0.1.0
 * @example
 * import { createPatchHttpAction } from 'emis-api-client';
 *
 * const resource = { wellknown: 'user' };
 * const patchUser = createPatchHttpAction(resource);
 * patchUser({ _id: ..., name: ...}).then(user => { ... }).catch(error => { ... });
 */
const createPatchHttpAction = resource => {
  // ensure resource
  const {
    shortcut: { singular },
    wellknown: { plural },
    bucket,
  } = normalizeResource(resource);

  // generate method name
  const methodName = common.variableNameFor('patch', singular);

  // build action
  const action = {
    [methodName]: payload => {
      // prepare data
      const defaults = lodash.omit((resource.params || {}).filter, 'deletedAt');
      const data = common.mergeObjects(payload, defaults);
      // derive endpoint
      let endpoint = `/${lodash.toLower(plural)}/${common.idOf(data)}`;
      if (!lodash.isEmpty(bucket)) {
        endpoint = `/${lodash.toLower(plural)}/${bucket}/${common.idOf(data)}`;
      }
      // issue http request
      return patch(endpoint, data);
    },
  };

  // return patch single resource action
  return action;
};

/**
 * @function createDeleteHttpAction
 * @name createDeleteHttpAction
 * @description generate http action to obtain single resource
 * @param {Object} resource valid http resource definition
 * @return {Object} http action to get single resource
 * @since 0.7.0
 * @version 0.1.0
 * @example
 * import { createDeleteHttpAction } from 'emis-api-client';
 *
 * const resource = { wellknown: 'user' };
 * const deleteUser = createDeleteHttpAction(resource);
 * deleteUser('5c176624').then(user => { ... }).catch(error => { ... });
 */
const createDeleteHttpAction = resource => {
  // ensure resource
  const {
    shortcut: { singular },
    wellknown: { plural },
    bucket,
  } = normalizeResource(resource);

  // generate method name
  const methodName = common.variableNameFor('delete', singular);

  // build action
  const action = {
    [methodName]: id => {
      // derive endpoint
      let endpoint = `/${lodash.toLower(plural)}/${id}`;
      if (!lodash.isEmpty(bucket)) {
        endpoint = `/${lodash.toLower(plural)}/${bucket}/${id}`;
      }
      // issue http request
      return del(endpoint);
    },
  };

  // return delete single resource action
  return action;
};

/**
 * @function createHttpActionsFor
 * @name createHttpActionsFor
 * @description generate http actions to interact with resource
 * @param {String} resource valid http resource
 * @return {Object} http actions to interact with a resource
 * @since 0.1.0
 * @version 0.1.0
 * @example
 * import { createHttpActionsFor } from 'emis-api-client';
 *
 * const { deleteUser } = createHttpActionsFor('user');
 * deleteUser('5c176624').then(user => { ... }).catch(error => { ... });
 */
const createHttpActionsFor = resource => {
  // compose resource http actions
  const getSchema = createGetSchemaHttpAction(resource);
  const getExportUrl = createExportUrlHttpAction(resource);
  const getResources = createGetListHttpAction(resource);
  const getResource = createGetSingleHttpAction(resource);
  const postResource = createPostHttpAction(resource);
  const putResource = createPutHttpAction(resource);
  const patchResource = createPatchHttpAction(resource);
  const deleteResource = createDeleteHttpAction(resource);

  // return resource http actions
  const httpActions = common.mergeObjects(
    getSchema,
    getExportUrl,
    getResources,
    getResource,
    postResource,
    putResource,
    patchResource,
    deleteResource
  );
  return httpActions;
};

/**
 * @name DEFAULT_FILTER
 * @description default resource filtering options
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
const DEFAULT_FILTER = { deletedAt: { $eq: null } };

/**
 * @name DEFAULT_PAGINATION
 * @description default resource pagination options
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
const DEFAULT_PAGINATION = { limit: 10, skip: 0, page: 1 };

/**
 * @name DEFAULT_SORT
 * @description default resource sorting order options
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @private
 */
const DEFAULT_SORT = { updatedAt: -1 };

/**
 * @constant
 * @name WELL_KNOWN
 * @description set of well known api endpoints. they must be one-to-one to
 * naked api endpoints exposed by the server and they must presented in
 * camelcase.
 * @type {String[]}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
const WELL_KNOWN = [
  'activity',
  'adjustment',
  'alert',
  'alertSource',
  'assessment',
  'feature',
  'incident',
  'incidentType',
  'indicator',
  'item',
  'party',
  'permission',
  'predefine',
  'plan',
  'procedure',
  'question',
  'questionnaire',
  'role',
  'stock',
];

// default request params
const DEFAULT_PARAMS = {
  filter: DEFAULT_FILTER,
  paginate: DEFAULT_PAGINATION,
  sort: DEFAULT_SORT,
};

// parties shortcuts
const PARTY_SHORTCUTS = {
  focalPerson: {
    shortcut: 'focalPerson',
    wellknown: 'party',
    params: common.mergeObjects(DEFAULT_PARAMS, {
      filter: { type: 'Focal Person' },
    }),
  },
  agency: {
    shortcut: 'agency',
    wellknown: 'party',
    params: common.mergeObjects(DEFAULT_PARAMS, {
      filter: { type: 'Agency' },
    }),
  },
};

// features shortcuts
const FEATURE_SHORTCUTS = {
  region: {
    shortcut: 'region',
    wellknown: 'feature',
    params: common.mergeObjects(DEFAULT_PARAMS, {
      filter: {
        nature: 'Boundary',
        family: 'Administrative',
        type: 'Region',
      },
    }),
  },
  district: {
    shortcut: 'district',
    wellknown: 'feature',
    params: common.mergeObjects(DEFAULT_PARAMS, {
      filter: {
        nature: 'Boundary',
        family: 'Administrative',
        type: 'District',
      },
    }),
  },
  ward: {
    shortcut: 'ward',
    wellknown: 'feature',
    params: common.mergeObjects(DEFAULT_PARAMS, {
      filter: {
        nature: 'Boundary',
        family: 'Administrative',
        type: 'Ward',
      },
    }),
  },
  warehouse: {
    shortcut: 'warehouse',
    wellknown: 'feature',
    params: common.mergeObjects(DEFAULT_PARAMS, {
      filter: {
        nature: 'Building',
        family: 'Warehouse',
      },
    }),
  },
};

// predefine shortcuts
const PREDEFINE_SHORTCUTS = {
  itemUnit: {
    shortcut: 'itemUnit',
    wellknown: 'predefine',
    bucket: 'itemunits',
    params: common.mergeObjects(DEFAULT_PARAMS),
  },
  itemCategory: {
    shortcut: 'itemCategory',
    wellknown: 'predefine',
    bucket: 'itemcategories',
    params: common.mergeObjects(DEFAULT_PARAMS),
  },
};

/**
 * @constant
 * @name SHORTCUTS
 * @description set of applicable api shortcuts.
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
const SHORTCUTS = common.mergeObjects(
  FEATURE_SHORTCUTS,
  PARTY_SHORTCUTS,
  PREDEFINE_SHORTCUTS
);

/**
 * @constant
 * @name RESOURCES
 * @description set of applicable api endpoints including both well-kown and
 * shortcuts. they must presented in camelcase and wellknown key should point
 * back to {@link WELL_KNOWN}.
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
const RESOURCES = common.mergeObjects(SHORTCUTS);

// build wellknown resources
lodash.forEach([...WELL_KNOWN], wellknown => {
  const name = lodash.clone(wellknown);
  const shortcut = lodash.clone(wellknown);
  const params = common.mergeObjects(DEFAULT_PARAMS);
  const resource = { shortcut, wellknown, params };
  RESOURCES[name] = resource;
});

/**
 * @name httpActions
 * @description resource http actions
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
const httpActions = {
  getSchemas: () =>
    get('/schemas').then(response => {
      const schemas = { ...response };
      // expose shortcuts schema
      if (schemas) {
        lodash.forEach(SHORTCUTS, shortcut => {
          const key = lodash.upperFirst(shortcut.shortcut);
          const wellknown = lodash.upperFirst(shortcut.wellknown);
          schemas[key] = schemas[wellknown];
        });
      }
      return schemas;
    }),
};

// build resource http actions
lodash.forEach(RESOURCES, resource => {
  const resourceHttpActions = createHttpActionsFor(resource);
  lodash.merge(httpActions, resourceHttpActions);
});

exports.CONTENT_TYPE = CONTENT_TYPE;
exports.DEFAULT_FILTER = DEFAULT_FILTER;
exports.DEFAULT_PAGINATION = DEFAULT_PAGINATION;
exports.DEFAULT_SORT = DEFAULT_SORT;
exports.HEADERS = HEADERS;
exports.RESOURCES = RESOURCES;
exports.SHORTCUTS = SHORTCUTS;
exports.WELL_KNOWN = WELL_KNOWN;
exports.all = all;
exports.createDeleteHttpAction = createDeleteHttpAction;
exports.createExportUrlHttpAction = createExportUrlHttpAction;
exports.createGetListHttpAction = createGetListHttpAction;
exports.createGetSchemaHttpAction = createGetSchemaHttpAction;
exports.createGetSingleHttpAction = createGetSingleHttpAction;
exports.createHttpActionsFor = createHttpActionsFor;
exports.createHttpClient = createHttpClient;
exports.createPatchHttpAction = createPatchHttpAction;
exports.createPostHttpAction = createPostHttpAction;
exports.createPutHttpAction = createPutHttpAction;
exports.del = del;
exports.disposeHttpClient = disposeHttpClient;
exports.get = get;
exports.httpActions = httpActions;
exports.isTokenValid = isTokenValid;
exports.normalizeResource = normalizeResource;
exports.patch = patch;
exports.post = post;
exports.prepareParams = prepareParams;
exports.put = put;
exports.signin = signin;
exports.signout = signout;
exports.spread = spread;
