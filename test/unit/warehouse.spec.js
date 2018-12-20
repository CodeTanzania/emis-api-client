import { expect } from 'chai';
import nock from 'nock';
import * as Warehouse from '../../src/warehouse';
import defaultOptions from '../helpers/nock';

describe('Warehouse API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let warehouseID = null;
  let _warehouse = null;

  it('should be able to GET warehouses when given params', () =>
    nock
      .back('/warehouse/get-warehouses-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Warehouse.getWarehouses({ limit: 5 })
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

            warehouseID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET warehouses given no params', () =>
    nock
      .back('/warehouse/get-warehouses-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Warehouse.getWarehouses()
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist;
            expect(data.data).to.exist.and.to.be.an('array');
            expect(data.total).to.exist.and.to.be.a('number');
            expect(data.size).to.exist;
            expect(data.limit).to.exist;
            expect(data.skip).to.exist.and.to.be.a('number');
            expect(data.page).to.exist.and.to.be.a('number');
            expect(data.pages).to.exist.and.be.a('number');
            expect(data.lastModified).to.exist;
          })
          .then(nockDone)
      ));

  it('should be able to GET a single warehouse given warehouse ID', () =>
    nock
      .back('/warehouse/get-warehouse-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Warehouse.getWarehouse(warehouseID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(warehouseID);
            _warehouse = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Warehouse', () =>
    nock
      .back('/warehouse/post-warehouse-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const warehouse = {
          ..._warehouse,
        };
        delete warehouse._id;

        warehouse.name = 'Test Warehouse';

        return Warehouse.postWarehouse(warehouse)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT  existing warehouse', () =>
    nock
      .back('/warehouse/put-warehouse-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _warehouse.description = 'This is the updated Warehouse';

        return Warehouse.putWarehouse(_warehouse)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.name).to.be.eql(_warehouse.name);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing warehouse', () =>
    nock
      .back('/warehouse/patch-warehouse-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _warehouse.description = 'This is the patched Warehouse';

        return Warehouse.putWarehouse(_warehouse)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.name).to.be.eql(_warehouse.name);
          })
          .then(nockDone);
      }));
});
