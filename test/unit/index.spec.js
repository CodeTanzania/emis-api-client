import { expect } from 'chai';
import * as Client from '../../src/index';

describe('EMIS Client Index', () => {
  it('should expose all Activity API methods', () => {
    expect(Client.getActivitySchema).to.exist.and.to.be.a('function');
    expect(Client.getActivities).to.exist.and.to.be.a('function');
    expect(Client.getActivity).to.exist.and.to.be.a('function');
    expect(Client.postActivity).to.exist.and.to.be.a('function');
    expect(Client.putActivity).to.exist.and.to.be.a('function');
    expect(Client.patchActivity).to.exist.and.to.be.a('function');
    expect(Client.deleteActivity).to.exist.and.to.be.a('function');
  });

  it('should expose all Alert API methods', () => {
    expect(Client.getAlertSchema).to.exist.and.to.be.a('function');
    expect(Client.getAlerts).to.exist.and.to.be.a('function');
    expect(Client.getAlert).to.exist.and.to.be.a('function');
    expect(Client.postAlert).to.exist.and.to.be.a('function');
    expect(Client.putAlert).to.exist.and.to.be.a('function');
    expect(Client.patchAlert).to.exist.and.to.be.a('function');
    expect(Client.deleteAlert).to.exist.and.to.be.a('function');
  });

  it('should expose all Adjustment API methods', () => {
    expect(Client.getAdjustmentSchema).to.exist.and.to.be.a('function');
    expect(Client.getAdjustments).to.exist.and.to.be.a('function');
    expect(Client.getAdjustment).to.exist.and.to.be.a('function');
    expect(Client.postAdjustment).to.exist.and.to.be.a('function');
    expect(Client.putAdjustment).to.exist.and.to.be.a('function');
    expect(Client.patchAdjustment).to.exist.and.to.be.a('function');
    expect(Client.deleteAdjustment).to.exist.and.to.be.a('function');
  });

  it('should expose all Assessment API methods', () => {
    expect(Client.getAssessmentSchema).to.exist.and.to.be.a('function');
    expect(Client.getAssessments).to.exist.and.to.be.a('function');
    expect(Client.getAssessment).to.exist.and.to.be.a('function');
    expect(Client.postAssessment).to.exist.and.to.be.a('function');
    expect(Client.putAssessment).to.exist.and.to.be.a('function');
    expect(Client.patchAssessment).to.exist.and.to.be.a('function');
    expect(Client.deleteAssessment).to.exist.and.to.be.a('function');
  });

  it('should expose all Feature API methods', () => {
    expect(Client.getFeatureSchema).to.exist.and.to.be.a('function');
    expect(Client.getFeatures).to.exist.and.to.be.a('function');
    expect(Client.getFeature).to.exist.and.to.be.a('function');
    expect(Client.postFeature).to.exist.and.to.be.a('function');
    expect(Client.putFeature).to.exist.and.to.be.a('function');
    expect(Client.patchFeature).to.exist.and.to.be.a('function');
    expect(Client.deleteFeature).to.exist.and.to.be.a('function');
  });

  it('should expose all IncidentType API methods', () => {
    expect(Client.getIncidentTypeSchema).to.exist.and.to.be.a('function');
    expect(Client.getIncidentTypes).to.exist.and.to.be.a('function');
    expect(Client.getIncidentType).to.exist.and.to.be.a('function');
    expect(Client.postIncidentType).to.exist.and.to.be.a('function');
    expect(Client.putIncidentType).to.exist.and.to.be.a('function');
    expect(Client.patchIncidentType).to.exist.and.to.be.a('function');
    expect(Client.deleteIncidentType).to.exist.and.to.be.a('function');
  });

  it('should expose all Indicator API methods', () => {
    expect(Client.getIndicatorSchema).to.exist.and.to.be.a('function');
    expect(Client.getIndicators).to.exist.and.to.be.a('function');
    expect(Client.getIndicator).to.exist.and.to.be.a('function');
    expect(Client.postIndicator).to.exist.and.to.be.a('function');
    expect(Client.putIndicator).to.exist.and.to.be.a('function');
    expect(Client.patchIndicator).to.exist.and.to.be.a('function');
    expect(Client.deleteIndicator).to.exist.and.to.be.a('function');
  });

  it('should expose all Item API methods', () => {
    expect(Client.getItemSchema).to.exist.and.to.be.a('function');
    expect(Client.getItems).to.exist.and.to.be.a('function');
    expect(Client.getItem).to.exist.and.to.be.a('function');
    expect(Client.postItem).to.exist.and.to.be.a('function');
    expect(Client.putItem).to.exist.and.to.be.a('function');
    expect(Client.patchItem).to.exist.and.to.be.a('function');
    expect(Client.deleteItem).to.exist.and.to.be.a('function');
  });

  it('should expose all Party API methods', () => {
    expect(Client.getPartySchema).to.exist.and.to.be.a('function');
    expect(Client.getParties).to.exist.and.to.be.a('function');
    expect(Client.getParty).to.exist.and.to.be.a('function');
    expect(Client.postParty).to.exist.and.to.be.a('function');
    expect(Client.putParty).to.exist.and.to.be.a('function');
    expect(Client.patchParty).to.exist.and.to.be.a('function');
    expect(Client.deleteParty).to.exist.and.to.be.a('function');
  });

  it('should expose all Permission API methods', () => {
    expect(Client.getPermissionSchema).to.exist.and.to.be.a('function');
    expect(Client.getPermissions).to.exist.and.to.be.a('function');
    expect(Client.getPermission).to.exist.and.to.be.a('function');
    expect(Client.postPermission).to.exist.and.to.be.a('function');
    expect(Client.putPermission).to.exist.and.to.be.a('function');
    expect(Client.patchPermission).to.exist.and.to.be.a('function');
    expect(Client.deletePermission).to.exist.and.to.be.a('function');
  });

  it('should expose all Permission API methods', () => {
    expect(Client.getPermissionSchema).to.exist.and.to.be.a('function');
    expect(Client.getPermissions).to.exist.and.to.be.a('function');
    expect(Client.getPermission).to.exist.and.to.be.a('function');
    expect(Client.postPermission).to.exist.and.to.be.a('function');
    expect(Client.putPermission).to.exist.and.to.be.a('function');
    expect(Client.patchPermission).to.exist.and.to.be.a('function');
    expect(Client.deletePermission).to.exist.and.to.be.a('function');
  });

  it('should expose all Plan API methods', () => {
    expect(Client.getPlanSchema).to.exist.and.to.be.a('function');
    expect(Client.getPlans).to.exist.and.to.be.a('function');
    expect(Client.getPlan).to.exist.and.to.be.a('function');
    expect(Client.postPlan).to.exist.and.to.be.a('function');
    expect(Client.putPlan).to.exist.and.to.be.a('function');
    expect(Client.patchPlan).to.exist.and.to.be.a('function');
    expect(Client.deletePlan).to.exist.and.to.be.a('function');
  });

  it('should expose all Procedure API methods', () => {
    expect(Client.getProcedureSchema).to.exist.and.to.be.a('function');
    expect(Client.getProcedures).to.exist.and.to.be.a('function');
    expect(Client.getProcedure).to.exist.and.to.be.a('function');
    expect(Client.postProcedure).to.exist.and.to.be.a('function');
    expect(Client.putProcedure).to.exist.and.to.be.a('function');
    expect(Client.patchProcedure).to.exist.and.to.be.a('function');
    expect(Client.deleteProcedure).to.exist.and.to.be.a('function');
  });

  it('should expose all Question API methods', () => {
    expect(Client.getQuestionSchema).to.exist.and.to.be.a('function');
    expect(Client.getQuestions).to.exist.and.to.be.a('function');
    expect(Client.getQuestion).to.exist.and.to.be.a('function');
    expect(Client.postQuestion).to.exist.and.to.be.a('function');
    expect(Client.putQuestion).to.exist.and.to.be.a('function');
    expect(Client.patchQuestion).to.exist.and.to.be.a('function');
    expect(Client.deleteQuestion).to.exist.and.to.be.a('function');
  });

  it('should expose all Questionnaire API methods', () => {
    expect(Client.getQuestionnaireSchema).to.exist.and.to.be.a('function');
    expect(Client.getQuestionnaires).to.exist.and.to.be.a('function');
    expect(Client.getQuestionnaire).to.exist.and.to.be.a('function');
    expect(Client.postQuestionnaire).to.exist.and.to.be.a('function');
    expect(Client.putQuestionnaire).to.exist.and.to.be.a('function');
    expect(Client.patchQuestionnaire).to.exist.and.to.be.a('function');
    expect(Client.deleteQuestionnaire).to.exist.and.to.be.a('function');
  });

  it('should expose all Role API methods', () => {
    expect(Client.getRoleSchema).to.exist.and.to.be.a('function');
    expect(Client.getRoles).to.exist.and.to.be.a('function');
    expect(Client.getRole).to.exist.and.to.be.a('function');
    expect(Client.postRole).to.exist.and.to.be.a('function');
    expect(Client.putRole).to.exist.and.to.be.a('function');
    expect(Client.patchRole).to.exist.and.to.be.a('function');
    expect(Client.deleteRole).to.exist.and.to.be.a('function');
  });

  it('should expose all Stakeholder API methods', () => {
    expect(Client.getStakeholderSchema).to.exist.and.to.be.a('function');
    expect(Client.getStakeholders).to.exist.and.to.be.a('function');
    expect(Client.getStakeholder).to.exist.and.to.be.a('function');
    expect(Client.postStakeholder).to.exist.and.to.be.a('function');
    expect(Client.putStakeholder).to.exist.and.to.be.a('function');
    expect(Client.patchStakeholder).to.exist.and.to.be.a('function');
    expect(Client.deleteStakeholder).to.exist.and.to.be.a('function');
  });

  it('should expose all Stock API methods', () => {
    expect(Client.getStockSchema).to.exist.and.to.be.a('function');
    expect(Client.getStocks).to.exist.and.to.be.a('function');
    expect(Client.getStock).to.exist.and.to.be.a('function');
    expect(Client.postStock).to.exist.and.to.be.a('function');
    expect(Client.putStock).to.exist.and.to.be.a('function');
    expect(Client.patchStock).to.exist.and.to.be.a('function');
    expect(Client.deleteStock).to.exist.and.to.be.a('function');
  });

  it('should expose all Warehouse API methods', () => {
    expect(Client.getWarehouseSchema).to.exist.and.to.be.a('function');
    expect(Client.getWarehouses).to.exist.and.to.be.a('function');
    expect(Client.getWarehouse).to.exist.and.to.be.a('function');
    expect(Client.postWarehouse).to.exist.and.to.be.a('function');
    expect(Client.putWarehouse).to.exist.and.to.be.a('function');
    expect(Client.patchWarehouse).to.exist.and.to.be.a('function');
    expect(Client.deleteWarehouse).to.exist.and.to.be.a('function');
  });
});
