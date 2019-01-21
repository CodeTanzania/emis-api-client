import axios, { spread as toSimpleArgs } from 'axios';
import { isEmpty, camelCase, toLower as low, get as value } from 'lodash';
import { singularize, pluralize } from 'inflection';

// default http client
let client;

// supported content type
export const CONTENT_TYPE = 'application/json';

// default http headers
export const HEADERS = {
  Accept: CONTENT_TYPE,
  'Content-Type': CONTENT_TYPE,
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
export const createHttpClient = API_BASE_URL => {
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
export const disposeHttpClient = () => {
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
export const all = (...promises) => axios.all([...promises]);

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
export const spread = toSimpleArgs;

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
export const get = (url, params) => {
  const httpClient = createHttpClient();
  return httpClient.get(url, { params });
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
export const post = (url, data) => {
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
export const put = (url, data) => {
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
export const patch = (url, data) => {
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
export const del = url => {
  const httpClient = createHttpClient();
  return httpClient.delete(url);
};

// create dynamic camelized function name
const fn = (...name) => camelCase([...name].join(' '));

// get resource id from payload
const idOf = data => value(data, '_id') || value(data, 'id');

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
export const createHttpActionsFor = resource => {
  const singular = singularize(resource);
  const plural = pluralize(resource);
  const httpActions = {
    [fn('get', singular, 'Schema')]: () =>
      get(`/${low(plural)}/schema`).then(response => response.data),
    [fn('get', plural)]: params =>
      get(`/${low(plural)}`, params).then(response => response.data),
    [fn('get', singular)]: id =>
      get(`/${low(plural)}/${id}`).then(response => response.data),
    [fn('post', singular)]: data =>
      post(`/${low(plural)}`, data).then(response => response.data),
    [fn('put', singular)]: data =>
      put(`/${low(plural)}/${idOf(data)}`, data).then(
        response => response.data
      ),
    [fn('patch', singular)]: data =>
      patch(`/${low(plural)}/${idOf(data)}`, data).then(
        response => response.data
      ),
    [fn('delete', singular)]: id =>
      del(`/${low(plural)}/${id}`).then(response => response.data),
  };
  return httpActions;
};
