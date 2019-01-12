import axios from 'axios';
import { isEmpty, toLower, upperFirst } from 'lodash';
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
    const { env } = process;
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
  const httpClient = createHttpClient();
  if (isEmpty(data)) {
    return Promise.reject(new Error('Missing Payload'));
  }
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
  const httpClient = createHttpClient();
  if (isEmpty(data)) {
    return Promise.reject(new Error('Missing Payload'));
  }
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
  const httpClient = createHttpClient();
  if (isEmpty(data)) {
    return Promise.reject(new Error('Missing Payload'));
  }
  return httpClient.patch(url, data);
};

export const del = url => client.delete(url);

export function createHttpActionsFor(resource) {
  const _upperFirst = v => upperFirst(toLower(v)); //eslint-disable-line
  const singular = singularize(resource);
  const _singular = _upperFirst(singular); //eslint-disable-line 
  const plural = pluralize(resource);
  const _plural = _upperFirst(plural); //eslint-disable-line 
  const _resource = { //eslint-disable-line
    [`get${_singular}Schema`]: () => get(`/${plural}/schema`),
    [`get${_plural}`]: params => get(`/${plural}`, params),
    [`get${_singular}`]: id => get(`/${plural}/${id}`),
    [`post${_singular}`]: data => post(`/${plural}`, data),
    [`put${_singular}`]: data => put(`/${plural}/${data._id}`, data), //eslint-disable-line
    [`patch${_singular}`]: data => patch(`/${plural}/${data._id}`, data), //eslint-disable-line
    [`delete${_singular}`]: _id => del(`/${plural}/${_id}`),
  };
  return _resource; //eslint-disable-line
}
