import axios from 'axios';
import moment from 'moment';
import { singularize, pluralize } from 'inflection';
import { forEach, isEmpty, isString, camelCase, merge, compact, map, omitBy, isArray, isPlainObject, toLower, omit, uniq, first, min, max, clone, upperFirst } from 'lodash';

// default http client
let client;

// create duplicate free array of values
const distinct = (...values) => uniq(compact([...values]));

// merge list of objects to single object
const mergeObjects = (...objects) => {
  // ensure source objects
  let sources = compact([...objects]);
  sources = map(sources, source => {
    return omitBy(source, val => !val);
  });

  // return merged
  const merged = merge({}, ...sources);
  return merged;
};

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
    const { to: upper, from: lower } = mergeObjects(between);
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
        $gte: moment(min([upper, lower]))
          .utc()
          .startOf('date')
          .toDate(),
        $lte: moment(max([upper, lower]))
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
    const { max: upper, min: lower } = mergeObjects(range);
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
      return { $gte: min([upper, lower]), $lte: max([upper, lower]) };
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
  const options = mergeObjects(defaults, params);

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
  const definition = isString(resource)
    ? { wellknown: resource }
    : mergeObjects(resource);

  // rormalize wellknown
  const { wellknown } = definition;
  let singular = singularize(wellknown);
  let plural = pluralize(wellknown);
  definition.wellknown = { singular, plural };

  // rormalize shortcut
  const { shortcut } = definition;
  singular = singularize(shortcut || wellknown);
  plural = pluralize(shortcut || wellknown);
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
  } = normalizeResource(resource);

  // generate method name
  const methodName = fn('get', singular, 'Schema');

  // build action
  const action = {
    [methodName]: () => {
      const endpoint = `/${toLower(plural)}/schema`;
      return get(endpoint).then(response => response.data);
    },
  };

  // return get schema action
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
  const { shortcut, wellknown } = normalizeResource(resource);

  // generate method name
  const methodName = fn('get', shortcut.plural);

  // build action
  const action = {
    [methodName]: options => {
      // prepare params
      const params = mergeObjects(resource.params, options);
      const endpoint = `/${toLower(wellknown.plural)}`;
      return get(endpoint, params).then(response => response.data);
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
  } = normalizeResource(resource);

  // generate method name
  const methodName = fn('get', singular);

  // build action
  const action = {
    [methodName]: id => {
      // prepare params
      const params = mergeObjects(resource.params);
      const endpoint = `/${toLower(plural)}/${id}`;
      return get(endpoint, params).then(response => response.data);
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
  } = normalizeResource(resource);

  // generate method name
  const methodName = fn('post', singular);

  // build action
  const action = {
    [methodName]: payload => {
      // prepare data
      const defaults = omit((resource.params || {}).filter, 'deletedAt');
      const data = mergeObjects(payload, defaults);
      const endpoint = `/${toLower(plural)}`;
      return post(endpoint, data).then(response => response.data);
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
  } = normalizeResource(resource);

  // generate method name
  const methodName = fn('put', singular);

  // build action
  const action = {
    [methodName]: payload => {
      // prepare data
      const defaults = omit((resource.params || {}).filter, 'deletedAt');
      const data = mergeObjects(payload, defaults);
      const endpoint = `/${toLower(plural)}/${idOf(data)}`;
      return put(endpoint, data).then(response => response.data);
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
  } = normalizeResource(resource);

  // generate method name
  const methodName = fn('patch', singular);

  // build action
  const action = {
    [methodName]: payload => {
      // prepare data
      const defaults = omit((resource.params || {}).filter, 'deletedAt');
      const data = mergeObjects(payload, defaults);
      const endpoint = `/${toLower(plural)}/${idOf(data)}`;
      return patch(endpoint, data).then(response => response.data);
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
  } = normalizeResource(resource);

  // generate method name
  const methodName = fn('delete', singular);

  // build action
  const action = {
    [methodName]: id => {
      // prepare params
      const endpoint = `/${toLower(plural)}/${id}`;
      return del(endpoint).then(response => response.data);
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
  const getResources = createGetListHttpAction(resource);
  const getResource = createGetSingleHttpAction(resource);
  const postResource = createPostHttpAction(resource);
  const putResource = createPutHttpAction(resource);
  const patchResource = createPatchHttpAction(resource);
  const deleteResource = createDeleteHttpAction(resource);

  // return resource http actions
  const httpActions = merge(
    {},
    getSchema,
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
    params: merge({}, DEFAULT_PARAMS, { filter: { type: 'Focal Person' } }),
  },
  agency: {
    shortcut: 'agency',
    wellknown: 'party',
    params: merge({}, DEFAULT_PARAMS, { filter: { type: 'Agency' } }),
  },
};

// features shortcuts
const FEATURE_SHORTCUTS = {
  region: {
    shortcut: 'region',
    wellknown: 'feature',
    params: merge({}, DEFAULT_PARAMS, {
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
    params: merge({}, DEFAULT_PARAMS, {
      filter: {
        nature: 'Boundary',
        family: 'Administrative',
        type: 'District',
      },
    }),
  },
  warehouse: {
    shortcut: 'warehouse',
    wellknown: 'feature',
    params: merge({}, DEFAULT_PARAMS, {
      filter: {
        nature: 'Building',
        family: 'Warehouse',
      },
    }),
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
const SHORTCUTS = merge({}, PARTY_SHORTCUTS, FEATURE_SHORTCUTS);

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
const RESOURCES = merge({}, SHORTCUTS);

// build wellknown resources
forEach([...WELL_KNOWN], wellknown => {
  const name = clone(wellknown);
  const shortcut = clone(wellknown);
  const params = merge({}, DEFAULT_PARAMS);
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
      const schemas = response.data;
      // expose shortcuts schema
      if (schemas) {
        forEach(SHORTCUTS, shortcut => {
          const key = upperFirst(shortcut.shortcut);
          const wellknown = upperFirst(shortcut.wellknown);
          schemas[key] = schemas[wellknown];
        });
      }
      return schemas;
    }),
};

// build resource http actions
forEach(RESOURCES, resource => {
  const resourceHttpActions = createHttpActionsFor(resource);
  merge(httpActions, resourceHttpActions);
});

export { CONTENT_TYPE, HEADERS, prepareParams, createHttpClient, disposeHttpClient, all, spread, get, post, put, patch, del, normalizeResource, createGetSchemaHttpAction, createGetListHttpAction, createGetSingleHttpAction, createPostHttpAction, createPutHttpAction, createPatchHttpAction, createDeleteHttpAction, createHttpActionsFor, DEFAULT_FILTER, DEFAULT_PAGINATION, DEFAULT_SORT, WELL_KNOWN, SHORTCUTS, RESOURCES, httpActions };
