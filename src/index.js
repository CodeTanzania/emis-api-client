import { forEach, merge } from 'lodash';
import { get, post, put, patch, del, createHttpActionsFor } from './client';

/**
 * @name resources
 * @description list of available api resource(or api endpoints)
 * @type {Array}
 * @version 0.1.0
 * @since 0.1.0
 */
const resources = [
  'activity',
  'adjustment',
  'alert',
  'assessment',
  'feature',
  'incidenttype',
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
  'warehouse',
];

/**
 * @name actions
 * @description resource shortcut actions
 * @type {Object}
 * @version 0.1.0
 * @since 0.1.0
 * @public
 * @example
 * import { getPlans } from 'emis-api-client';
 * getPlans().then(plans => { ... }).catch(error => { ... });
 */
const actions = { get, post, put, patch, del };
forEach(resources, resource => {
  const resourceActions = createHttpActionsFor(resource);
  merge(actions, resourceActions);
});
export default { resources, ...actions };
