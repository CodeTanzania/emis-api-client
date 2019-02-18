const { expect } = require('chai');
const { DEFAULT_FILTER, DEFAULT_PAGINATION, DEFAULT_SORT } = require('..');
const { WELL_KNOWN } = require('..');

describe.only('emis api client', () => {
  it('should expose default api endpoint filter options', () => {
    expect(DEFAULT_FILTER).to.exist;
    expect(DEFAULT_FILTER).to.be.an('object');
    expect(DEFAULT_FILTER).to.be.eql({ deletedAt: { $eq: null } });
  });

  it('should expose default api endpoint pagination options', () => {
    expect(DEFAULT_PAGINATION).to.exist;
    expect(DEFAULT_PAGINATION).to.be.an('object');
    expect(DEFAULT_PAGINATION).to.be.eql({ limit: 10, skip: 0, page: 1 });
  });

  it('should expose default api endpoint sort order options', () => {
    expect(DEFAULT_SORT).to.exist;
    expect(DEFAULT_SORT).to.be.an('object');
    expect(DEFAULT_SORT).to.be.eql({ updatedAt: -1 });
  });

  it('should expose names of well known api endpoints', () => {
    expect(WELL_KNOWN).to.exist;
    expect(WELL_KNOWN).to.be.an('array');
    expect(WELL_KNOWN).to.be.eql([
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
    ]);
  });
});
