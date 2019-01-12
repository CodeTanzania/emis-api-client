import axios from 'axios';
import { toLower, upperFirst } from 'lodash';
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
};

export const get = (url, params) => client.get(url, { params });

export const post = (url, data) => client.post(url, data);

export const put = (url, data) => client.put(url, data);

export const patch = (url, data) => client.patch(url, data);

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
