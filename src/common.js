import { clone, forEach, merge, upperFirst } from 'lodash';
import { mergeObjects } from '@lykmapipo/common';
import { get, createHttpActionsFor } from './client';

/**
 * @name DEFAULT_FILTER
 * @description default resource filtering options
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
export const DEFAULT_FILTER = { deletedAt: { $eq: null } };

/**
 * @name DEFAULT_PAGINATION
 * @description default resource pagination options
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @static
 * @public
 */
export const DEFAULT_PAGINATION = { limit: 10, skip: 0, page: 1 };

/**
 * @name DEFAULT_SORT
 * @description default resource sorting order options
 * @type {Object}
 * @since 0.7.0
 * @version 0.1.0
 * @private
 */
export const DEFAULT_SORT = { updatedAt: -1 };

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
export const WELL_KNOWN = [
  'activity',
  'adjustment',
  'alert',
  'alertSource',
  'assessment',
  'campaign',
  'feature',
  'incident',
  'incidentType',
  'indicator',
  'item',
  'message',
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
    params: mergeObjects(DEFAULT_PARAMS, {
      filter: { type: 'Focal Person' },
    }),
  },
  agency: {
    shortcut: 'agency',
    wellknown: 'party',
    params: mergeObjects(DEFAULT_PARAMS, {
      filter: { type: 'Agency' },
    }),
  },
};

// features shortcuts
const FEATURE_SHORTCUTS = {
  region: {
    shortcut: 'region',
    wellknown: 'feature',
    params: mergeObjects(DEFAULT_PARAMS, {
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
    params: mergeObjects(DEFAULT_PARAMS, {
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
    params: mergeObjects(DEFAULT_PARAMS, {
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
    params: mergeObjects(DEFAULT_PARAMS, {
      filter: {
        nature: 'Building',
        family: 'Warehouse',
      },
    }),
  },
  jurisdiction: {
    shortcut: 'jurisdiction',
    wellknown: 'feature',
    params: mergeObjects(DEFAULT_PARAMS, {
      filter: {
        family: 'Administrative',
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
    params: mergeObjects(DEFAULT_PARAMS),
  },
  itemCategory: {
    shortcut: 'itemCategory',
    wellknown: 'predefine',
    bucket: 'itemcategories',
    params: mergeObjects(DEFAULT_PARAMS),
  },
  partyGroup: {
    shortcut: 'partyGroup',
    wellknown: 'predefine',
    bucket: 'partygroups',
    params: mergeObjects(DEFAULT_PARAMS),
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
export const SHORTCUTS = mergeObjects(
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
export const RESOURCES = mergeObjects(SHORTCUTS);

// build wellknown resources
forEach([...WELL_KNOWN], wellknown => {
  const name = clone(wellknown);
  const shortcut = clone(wellknown);
  const params = mergeObjects(DEFAULT_PARAMS);
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
export const httpActions = {
  getSchemas: () =>
    get('/schemas').then(response => {
      const schemas = { ...response };
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
