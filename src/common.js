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

export const RESOURCES = [
  {
    resource: 'activity',
    wellknown: 'activity',
    preset: {
      filter: DEFAULT_FILTER,
      paginate: DEFAULT_PAGINATION,
      populate: [],
      select: {},
      sort: DEFAULT_SORT,
    },
  },
];
