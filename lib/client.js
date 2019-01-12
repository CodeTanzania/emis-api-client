"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createHttpActionsFor = exports.del = exports.patch = exports.put = exports.post = exports.get = exports.disposeHttpClient = exports.createHttpClient = exports.HEADERS = exports.CONTENT_TYPE = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _lodash = require("lodash");

var _inflection = require("inflection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// default http client
let client; // supported content type

const CONTENT_TYPE = 'application/json'; // default http headers

exports.CONTENT_TYPE = CONTENT_TYPE;
const HEADERS = {
  Accept: CONTENT_TYPE,
  'Content-Type': CONTENT_TYPE
};
/**
 * @function createHttpClient
 * @name createHttpClient
 * @description create an http client if not exists
 * @param  {String} API_URL base url to use to api calls
 * @return {Axios} A new instance of Axios
 * @since 0.1.0
 * @version 0.1.0
 * @static
 * @public
 * @example
 * import { createHttpClient } from 'emis-api-client';
 * const httpClient = createHttpClient();
 */

exports.HEADERS = HEADERS;

const createHttpClient = API_BASE_URL => {
  if (!client) {
    const {
      env
    } = process;
    const {
      EMIS_API_URL,
      REACT_APP_EMIS_API_URL
    } = env;
    const BASE_URL = API_BASE_URL || EMIS_API_URL || REACT_APP_EMIS_API_URL;
    const options = {
      baseURL: BASE_URL,
      headers: HEADERS
    };
    client = _axios.default.create(options);
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


exports.createHttpClient = createHttpClient;

const disposeHttpClient = () => {
  client = null;
  return client;
};
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


exports.disposeHttpClient = disposeHttpClient;

const get = (url, params) => {
  const httpClient = createHttpClient();
  return httpClient.get(url, {
    params
  });
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


exports.get = get;

const post = (url, data) => {
  if ((0, _lodash.isEmpty)(data)) {
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


exports.post = post;

const put = (url, data) => {
  if ((0, _lodash.isEmpty)(data)) {
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


exports.put = put;

const patch = (url, data) => {
  if ((0, _lodash.isEmpty)(data)) {
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


exports.patch = patch;

const del = url => {
  const httpClient = createHttpClient();
  return httpClient.delete(url);
}; // create dynamic camelized function name


exports.del = del;

const fn = (...name) => (0, _lodash.camelCase)([...name].join(' ')); // get resource id from payload


const idOf = data => (0, _lodash.get)(data, '_id') || (0, _lodash.get)(data, 'id');
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
  const singular = (0, _inflection.singularize)(resource);
  const plural = (0, _inflection.pluralize)(resource);
  const httpActions = {
    [fn('get', singular, 'Schema')]: () => get(`/${(0, _lodash.toLower)(plural)}/schema`).then(response => response.data),
    [fn('get', plural)]: params => get(`/${(0, _lodash.toLower)(plural)}`, params).then(response => response.data),
    [fn('get', singular)]: id => get(`/${(0, _lodash.toLower)(plural)}/${id}`).then(response => response.data),
    [fn('post', singular)]: data => post(`/${(0, _lodash.toLower)(plural)}`, data).then(response => response.data),
    [fn('put', singular)]: data => put(`/${(0, _lodash.toLower)(plural)}/${idOf(data)}`, data).then(response => response.data),
    [fn('patch', singular)]: data => patch(`/${(0, _lodash.toLower)(plural)}/${idOf(data)}`, data).then(response => response.data),
    [fn('delete', singular)]: id => del(`/${(0, _lodash.toLower)(plural)}/${id}`).then(response => response.data)
  };
  return httpActions;
};

exports.createHttpActionsFor = createHttpActionsFor;