import { expect } from 'chai';
import nock from 'nock';
import * as Activity from '../../src/activity';
import defaultOptions from '../helpers/nock';

describe('Activity API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let activityID = null;
  let _activity = null;

  it('should be able to GET activities when given params', () =>
    nock
      .back('/activity/get-activities-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Activity.getActivities({ limit: 5 })
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist;
            expect(data.data).to.exist.and.to.be.an('array');
            expect(data.total).to.exist.and.to.be.a('number');
            expect(data.size).to.exist.and.to.be.eq(5);
            expect(data.limit).to.exist.to.be.eq(5);
            expect(data.skip).to.exist.and.to.be.a('number');
            expect(data.page).to.exist.and.to.be.a('number');
            expect(data.pages).to.exist.and.be.a('number');
            expect(data.lastModified).to.exist;

            activityID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET activities given no params', () =>
    nock
      .back('/activity/get-activities-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Activity.getActivities()
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist;
            expect(data.data).to.exist.and.to.be.an('array');
            expect(data.total).to.exist.and.to.be.a('number');
            expect(data.size).to.exist.and.to.be.eq(10);
            expect(data.limit).to.exist.to.be.eq(10);
            expect(data.skip).to.exist.and.to.be.a('number');
            expect(data.page).to.exist.and.to.be.a('number');
            expect(data.pages).to.exist.and.be.a('number');
            expect(data.lastModified).to.exist;
          })
          .then(nockDone)
      ));

  it('should be able to GET a single activity given activity ID', () =>
    nock
      .back('/activity/get-activity-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Activity.getActivity(activityID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(activityID);
            _activity = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Activity', () =>
    nock
      .back('/activity/post-activity-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const activity = {
          plan: _activity.plan._id,
          incidentType: _activity.incidentType._id,
          name: 'Test Incident',
          description: 'Ut harum eveniet ipsa a quod dolores vel quas enim.',
        };

        return Activity.postActivity(activity)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT existing activity', () =>
    nock
      .back('/activity/put-activity-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _activity.description = 'This is the updated Activity';

        return Activity.putActivity(_activity)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_activity.description);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing activity', () =>
    nock
      .back('/activity/patch-activity-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _activity.description = 'This is the patched Activity';

        return Activity.putActivity(_activity)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_activity.description);
          })
          .then(nockDone);
      }));
});
