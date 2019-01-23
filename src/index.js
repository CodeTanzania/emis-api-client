import { createHttpActionsFor } from './client';

export * from './client';

export const {
  getActivitySchema,
  getActivities,
  getActivity,
  postActivity,
  putActivity,
  patchActivity,
  deleteActivity,
} = createHttpActionsFor('activity');

export const {
  getAdjustmentSchema,
  getAdjustments,
  getAdjustment,
  postAdjustment,
  putAdjustment,
  patchAdjustment,
  deleteAdjustment,
} = createHttpActionsFor('adjustment');

export const {
  getAlertSchema,
  getAlerts,
  getAlert,
  postAlert,
  putAlert,
  patchAlert,
  deleteAlert,
} = createHttpActionsFor('alert');

export const {
  getAssessmentSchema,
  getAssessments,
  getAssessment,
  postAssessment,
  putAssessment,
  patchAssessment,
  deleteAssessment,
} = createHttpActionsFor('assessment');

export const {
  getFeatureSchema,
  getFeatures,
  getFeature,
  postFeature,
  putFeature,
  patchFeature,
  deleteFeature,
} = createHttpActionsFor('feature');

export const {
  getIncidentTypeSchema,
  getIncidentTypes,
  getIncidentType,
  postIncidentType,
  putIncidentType,
  patchIncidentType,
  deleteIncidentType,
} = createHttpActionsFor('incidentType');

export const {
  getIndicatorSchema,
  getIndicators,
  getIndicator,
  postIndicator,
  putIndicator,
  patchIndicator,
  deleteIndicator,
} = createHttpActionsFor('indicator');

export const {
  getItemSchema,
  getItems,
  getItem,
  postItem,
  putItem,
  patchItem,
  deleteItem,
} = createHttpActionsFor('item');

export const {
  getPartySchema,
  getParties,
  getParty,
  postParty,
  putParty,
  patchParty,
  deleteParty,
} = createHttpActionsFor('party');

export const {
  getPermissionSchema,
  getPermissions,
  getPermission,
  postPermission,
  putPermission,
  patchPermission,
  deletePermission,
} = createHttpActionsFor('permission');

export const {
  getPlanSchema,
  getPlans,
  getPlan,
  postPlan,
  putPlan,
  patchPlan,
  deletePlan,
} = createHttpActionsFor('plan');

export const {
  getProcedureSchema,
  getProcedures,
  getProcedure,
  postProcedure,
  putProcedure,
  patchProcedure,
  deleteProcedure,
} = createHttpActionsFor('procedure');

export const {
  getQuestionSchema,
  getQuestions,
  getQuestion,
  postQuestion,
  putQuestion,
  patchQuestion,
  deleteQuestion,
} = createHttpActionsFor('question');

export const {
  getQuestionnaireSchema,
  getQuestionnaires,
  getQuestionnaire,
  postQuestionnaire,
  putQuestionnaire,
  patchQuestionnaire,
  deleteQuestionnaire,
} = createHttpActionsFor('questionnaire');

export const {
  getRoleSchema,
  getRoles,
  getRole,
  postRole,
  putRole,
  patchRole,
  deleteRole,
} = createHttpActionsFor('role');

export const {
  getStockSchema,
  getStocks,
  getStock,
  postStock,
  putStock,
  patchStock,
  deleteStock,
} = createHttpActionsFor('stock');

export const {
  getWarehouseSchema,
  getWarehouses,
  getWarehouse,
  postWarehouse,
  putWarehouse,
  patchWarehouse,
  deleteWarehouse,
} = createHttpActionsFor('warehouse');

export {
  getPartySchema as getStakeholderSchema,
  getParties as getStakeholders,
  getParty as getStakeholder,
  postParty as postStakeholder,
  putParty as putStakeholder,
  patchParty as patchStakeholder,
  deleteParty as deleteStakeholder,
};
