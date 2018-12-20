import { expect } from 'chai';
import nock from 'nock';
import * as Stock from '../../src/stock';
import defaultOptions from '../helpers/nock';

describe('Stock API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let stockID = null;
  let _stock = null;

  it('should be able to GET stocks when given params', () =>
    nock
      .back('/stock/get-stocks-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Stock.getStocks({ limit: 5 })
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

            stockID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET stocks given no params', () =>
    nock
      .back('/stock/get-stocks-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Stock.getStocks()
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

  it('should be able to GET a single stock given stock ID', () =>
    nock
      .back('/stock/get-stock-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Stock.getStock(stockID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(stockID);
            _stock = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Stock', () =>
    nock
      .back('/stock/post-stock-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const stock = {
          ..._stock,
        };

        delete stock._id;
        stock.owner = '5c17661e3c9d520004e2b4a2';

        return Stock.postStock(stock)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT  existing stock', () =>
    nock
      .back('/stock/put-stock-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _stock.maxAllowed = 10;

        return Stock.putStock(_stock)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.maxAllowed).to.be.eql(_stock.maxAllowed);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing stock', () =>
    nock
      .back('/stock/patch-stock-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _stock.minAllowed = 10;

        return Stock.putStock(_stock)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.minAllowed).to.be.eql(_stock.minAllowed);
          })
          .then(nockDone);
      }));
});
