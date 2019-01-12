"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  getActivitySchema: true,
  getActivities: true,
  getActivity: true,
  postActivity: true,
  putActivity: true,
  patchActivity: true,
  deleteActivity: true,
  getAdjustmentSchema: true,
  getAdjustments: true,
  getAdjustment: true,
  postAdjustment: true,
  putAdjustment: true,
  patchAdjustment: true,
  deleteAdjustment: true,
  getAlertSchema: true,
  getAlerts: true,
  getAlert: true,
  postAlert: true,
  putAlert: true,
  patchAlert: true,
  deleteAlert: true,
  getAssessmentSchema: true,
  getAssessments: true,
  getAssessment: true,
  postAssessment: true,
  putAssessment: true,
  patchAssessment: true,
  deleteAssessment: true,
  getFeatureSchema: true,
  getFeatures: true,
  getFeature: true,
  postFeature: true,
  putFeature: true,
  patchFeature: true,
  deleteFeature: true,
  getIncidentTypeSchema: true,
  getIncidentTypes: true,
  getIncidentType: true,
  postIncidentType: true,
  putIncidentType: true,
  patchIncidentType: true,
  deleteIncidentType: true,
  getIndicatorSchema: true,
  getIndicators: true,
  getIndicator: true,
  postIndicator: true,
  putIndicator: true,
  patchIndicator: true,
  deleteIndicator: true,
  getItemSchema: true,
  getItems: true,
  getItem: true,
  postItem: true,
  putItem: true,
  patchItem: true,
  deleteItem: true,
  getPartySchema: true,
  getParties: true,
  getParty: true,
  postParty: true,
  putParty: true,
  patchParty: true,
  deleteParty: true,
  getPermissionSchema: true,
  getPermissions: true,
  getPermission: true,
  postPermission: true,
  putPermission: true,
  patchPermission: true,
  deletePermission: true,
  getPlanSchema: true,
  getPlans: true,
  getPlan: true,
  postPlan: true,
  putPlan: true,
  patchPlan: true,
  deletePlan: true,
  getProcedureSchema: true,
  getProcedures: true,
  getProcedure: true,
  postProcedure: true,
  putProcedure: true,
  patchProcedure: true,
  deleteProcedure: true,
  getQuestionSchema: true,
  getQuestions: true,
  getQuestion: true,
  postQuestion: true,
  putQuestion: true,
  patchQuestion: true,
  deleteQuestion: true,
  getQuestionnaireSchema: true,
  getQuestionnaires: true,
  getQuestionnaire: true,
  postQuestionnaire: true,
  putQuestionnaire: true,
  patchQuestionnaire: true,
  deleteQuestionnaire: true,
  getRoleSchema: true,
  getRoles: true,
  getRole: true,
  postRole: true,
  putRole: true,
  patchRole: true,
  deleteRole: true,
  getStockSchema: true,
  getStocks: true,
  getStock: true,
  postStock: true,
  putStock: true,
  patchStock: true,
  deleteStock: true,
  getWarehouseSchema: true,
  getWarehouses: true,
  getWarehouse: true,
  postWarehouse: true,
  putWarehouse: true,
  patchWarehouse: true,
  deleteWarehouse: true
};
exports.getRoles = exports.getRoleSchema = exports.deleteQuestionnaire = exports.patchQuestionnaire = exports.putQuestionnaire = exports.postQuestionnaire = exports.getQuestionnaire = exports.getQuestionnaires = exports.getQuestionnaireSchema = exports.deleteQuestion = exports.patchQuestion = exports.putQuestion = exports.postQuestion = exports.getQuestion = exports.getQuestions = exports.getQuestionSchema = exports.deleteProcedure = exports.patchProcedure = exports.putProcedure = exports.postProcedure = exports.getProcedure = exports.getProcedures = exports.getProcedureSchema = exports.deletePlan = exports.patchPlan = exports.putPlan = exports.postPlan = exports.getPlan = exports.getPlans = exports.getPlanSchema = exports.deletePermission = exports.patchPermission = exports.putPermission = exports.postPermission = exports.getPermission = exports.getPermissions = exports.getPermissionSchema = exports.deleteParty = exports.patchParty = exports.putParty = exports.postParty = exports.getParty = exports.getParties = exports.getPartySchema = exports.deleteItem = exports.patchItem = exports.putItem = exports.postItem = exports.getItem = exports.getItems = exports.getItemSchema = exports.deleteIndicator = exports.patchIndicator = exports.putIndicator = exports.postIndicator = exports.getIndicator = exports.getIndicators = exports.getIndicatorSchema = exports.deleteIncidentType = exports.patchIncidentType = exports.putIncidentType = exports.postIncidentType = exports.getIncidentType = exports.getIncidentTypes = exports.getIncidentTypeSchema = exports.deleteFeature = exports.patchFeature = exports.putFeature = exports.postFeature = exports.getFeature = exports.getFeatures = exports.getFeatureSchema = exports.deleteAssessment = exports.patchAssessment = exports.putAssessment = exports.postAssessment = exports.getAssessment = exports.getAssessments = exports.getAssessmentSchema = exports.deleteAlert = exports.patchAlert = exports.putAlert = exports.postAlert = exports.getAlert = exports.getAlerts = exports.getAlertSchema = exports.deleteAdjustment = exports.patchAdjustment = exports.putAdjustment = exports.postAdjustment = exports.getAdjustment = exports.getAdjustments = exports.getAdjustmentSchema = exports.deleteActivity = exports.patchActivity = exports.putActivity = exports.postActivity = exports.getActivity = exports.getActivities = exports.getActivitySchema = void 0;
exports.deleteWarehouse = exports.patchWarehouse = exports.putWarehouse = exports.postWarehouse = exports.getWarehouse = exports.getWarehouses = exports.getWarehouseSchema = exports.deleteStock = exports.patchStock = exports.putStock = exports.postStock = exports.getStock = exports.getStocks = exports.getStockSchema = exports.deleteRole = exports.patchRole = exports.putRole = exports.postRole = exports.getRole = void 0;

var _client = require("./client");

Object.keys(_client).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _client[key];
    }
  });
});
const {
  getActivitySchema,
  getActivities,
  getActivity,
  postActivity,
  putActivity,
  patchActivity,
  deleteActivity
} = (0, _client.createHttpActionsFor)('activity');
exports.deleteActivity = deleteActivity;
exports.patchActivity = patchActivity;
exports.putActivity = putActivity;
exports.postActivity = postActivity;
exports.getActivity = getActivity;
exports.getActivities = getActivities;
exports.getActivitySchema = getActivitySchema;
const {
  getAdjustmentSchema,
  getAdjustments,
  getAdjustment,
  postAdjustment,
  putAdjustment,
  patchAdjustment,
  deleteAdjustment
} = (0, _client.createHttpActionsFor)('adjustment');
exports.deleteAdjustment = deleteAdjustment;
exports.patchAdjustment = patchAdjustment;
exports.putAdjustment = putAdjustment;
exports.postAdjustment = postAdjustment;
exports.getAdjustment = getAdjustment;
exports.getAdjustments = getAdjustments;
exports.getAdjustmentSchema = getAdjustmentSchema;
const {
  getAlertSchema,
  getAlerts,
  getAlert,
  postAlert,
  putAlert,
  patchAlert,
  deleteAlert
} = (0, _client.createHttpActionsFor)('alert');
exports.deleteAlert = deleteAlert;
exports.patchAlert = patchAlert;
exports.putAlert = putAlert;
exports.postAlert = postAlert;
exports.getAlert = getAlert;
exports.getAlerts = getAlerts;
exports.getAlertSchema = getAlertSchema;
const {
  getAssessmentSchema,
  getAssessments,
  getAssessment,
  postAssessment,
  putAssessment,
  patchAssessment,
  deleteAssessment
} = (0, _client.createHttpActionsFor)('assessment');
exports.deleteAssessment = deleteAssessment;
exports.patchAssessment = patchAssessment;
exports.putAssessment = putAssessment;
exports.postAssessment = postAssessment;
exports.getAssessment = getAssessment;
exports.getAssessments = getAssessments;
exports.getAssessmentSchema = getAssessmentSchema;
const {
  getFeatureSchema,
  getFeatures,
  getFeature,
  postFeature,
  putFeature,
  patchFeature,
  deleteFeature
} = (0, _client.createHttpActionsFor)('feature');
exports.deleteFeature = deleteFeature;
exports.patchFeature = patchFeature;
exports.putFeature = putFeature;
exports.postFeature = postFeature;
exports.getFeature = getFeature;
exports.getFeatures = getFeatures;
exports.getFeatureSchema = getFeatureSchema;
const {
  getIncidentTypeSchema,
  getIncidentTypes,
  getIncidentType,
  postIncidentType,
  putIncidentType,
  patchIncidentType,
  deleteIncidentType
} = (0, _client.createHttpActionsFor)('incidentType');
exports.deleteIncidentType = deleteIncidentType;
exports.patchIncidentType = patchIncidentType;
exports.putIncidentType = putIncidentType;
exports.postIncidentType = postIncidentType;
exports.getIncidentType = getIncidentType;
exports.getIncidentTypes = getIncidentTypes;
exports.getIncidentTypeSchema = getIncidentTypeSchema;
const {
  getIndicatorSchema,
  getIndicators,
  getIndicator,
  postIndicator,
  putIndicator,
  patchIndicator,
  deleteIndicator
} = (0, _client.createHttpActionsFor)('indicator');
exports.deleteIndicator = deleteIndicator;
exports.patchIndicator = patchIndicator;
exports.putIndicator = putIndicator;
exports.postIndicator = postIndicator;
exports.getIndicator = getIndicator;
exports.getIndicators = getIndicators;
exports.getIndicatorSchema = getIndicatorSchema;
const {
  getItemSchema,
  getItems,
  getItem,
  postItem,
  putItem,
  patchItem,
  deleteItem
} = (0, _client.createHttpActionsFor)('item');
exports.deleteItem = deleteItem;
exports.patchItem = patchItem;
exports.putItem = putItem;
exports.postItem = postItem;
exports.getItem = getItem;
exports.getItems = getItems;
exports.getItemSchema = getItemSchema;
const {
  getPartySchema,
  getParties,
  getParty,
  postParty,
  putParty,
  patchParty,
  deleteParty
} = (0, _client.createHttpActionsFor)('party');
exports.deleteParty = deleteParty;
exports.patchParty = patchParty;
exports.putParty = putParty;
exports.postParty = postParty;
exports.getParty = getParty;
exports.getParties = getParties;
exports.getPartySchema = getPartySchema;
const {
  getPermissionSchema,
  getPermissions,
  getPermission,
  postPermission,
  putPermission,
  patchPermission,
  deletePermission
} = (0, _client.createHttpActionsFor)('permission');
exports.deletePermission = deletePermission;
exports.patchPermission = patchPermission;
exports.putPermission = putPermission;
exports.postPermission = postPermission;
exports.getPermission = getPermission;
exports.getPermissions = getPermissions;
exports.getPermissionSchema = getPermissionSchema;
const {
  getPlanSchema,
  getPlans,
  getPlan,
  postPlan,
  putPlan,
  patchPlan,
  deletePlan
} = (0, _client.createHttpActionsFor)('plan');
exports.deletePlan = deletePlan;
exports.patchPlan = patchPlan;
exports.putPlan = putPlan;
exports.postPlan = postPlan;
exports.getPlan = getPlan;
exports.getPlans = getPlans;
exports.getPlanSchema = getPlanSchema;
const {
  getProcedureSchema,
  getProcedures,
  getProcedure,
  postProcedure,
  putProcedure,
  patchProcedure,
  deleteProcedure
} = (0, _client.createHttpActionsFor)('procedure');
exports.deleteProcedure = deleteProcedure;
exports.patchProcedure = patchProcedure;
exports.putProcedure = putProcedure;
exports.postProcedure = postProcedure;
exports.getProcedure = getProcedure;
exports.getProcedures = getProcedures;
exports.getProcedureSchema = getProcedureSchema;
const {
  getQuestionSchema,
  getQuestions,
  getQuestion,
  postQuestion,
  putQuestion,
  patchQuestion,
  deleteQuestion
} = (0, _client.createHttpActionsFor)('question');
exports.deleteQuestion = deleteQuestion;
exports.patchQuestion = patchQuestion;
exports.putQuestion = putQuestion;
exports.postQuestion = postQuestion;
exports.getQuestion = getQuestion;
exports.getQuestions = getQuestions;
exports.getQuestionSchema = getQuestionSchema;
const {
  getQuestionnaireSchema,
  getQuestionnaires,
  getQuestionnaire,
  postQuestionnaire,
  putQuestionnaire,
  patchQuestionnaire,
  deleteQuestionnaire
} = (0, _client.createHttpActionsFor)('questionnaire');
exports.deleteQuestionnaire = deleteQuestionnaire;
exports.patchQuestionnaire = patchQuestionnaire;
exports.putQuestionnaire = putQuestionnaire;
exports.postQuestionnaire = postQuestionnaire;
exports.getQuestionnaire = getQuestionnaire;
exports.getQuestionnaires = getQuestionnaires;
exports.getQuestionnaireSchema = getQuestionnaireSchema;
const {
  getRoleSchema,
  getRoles,
  getRole,
  postRole,
  putRole,
  patchRole,
  deleteRole
} = (0, _client.createHttpActionsFor)('role');
exports.deleteRole = deleteRole;
exports.patchRole = patchRole;
exports.putRole = putRole;
exports.postRole = postRole;
exports.getRole = getRole;
exports.getRoles = getRoles;
exports.getRoleSchema = getRoleSchema;
const {
  getStockSchema,
  getStocks,
  getStock,
  postStock,
  putStock,
  patchStock,
  deleteStock
} = (0, _client.createHttpActionsFor)('stock');
exports.deleteStock = deleteStock;
exports.patchStock = patchStock;
exports.putStock = putStock;
exports.postStock = postStock;
exports.getStock = getStock;
exports.getStocks = getStocks;
exports.getStockSchema = getStockSchema;
const {
  getWarehouseSchema,
  getWarehouses,
  getWarehouse,
  postWarehouse,
  putWarehouse,
  patchWarehouse,
  deleteWarehouse
} = (0, _client.createHttpActionsFor)('warehouse');
exports.deleteWarehouse = deleteWarehouse;
exports.patchWarehouse = patchWarehouse;
exports.putWarehouse = putWarehouse;
exports.postWarehouse = postWarehouse;
exports.getWarehouse = getWarehouse;
exports.getWarehouses = getWarehouses;
exports.getWarehouseSchema = getWarehouseSchema;