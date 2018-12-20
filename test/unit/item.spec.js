import { expect } from 'chai';
import nock from 'nock';
import * as Item from '../../src/item';
import defaultOptions from '../helpers/nock';

describe('Item API Client', () => {
  after(nock.restore);

  afterEach(nock.cleanAll);

  let itemID = null;
  let _item = null;

  it('should be able to GET items when given params', () =>
    nock
      .back('/item/get-items-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Item.getItems({ limit: 5 })
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

            itemID = data.data[0]._id;
          })
          .then(nockDone)
      ));

  it('should be able to GET items given no params', () =>
    nock
      .back('/item/get-items-promise-no-param.json', defaultOptions)
      .then(({ nockDone }) =>
        Item.getItems()
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

  it('should be able to GET a single item given item ID', () =>
    nock
      .back('/item/get-item-promise.json', defaultOptions)
      .then(({ nockDone }) =>
        Item.getItem(itemID)
          .then(res => res.data)
          .then(data => {
            expect(data).to.exist.to.be.an('object');
            expect(data._id).to.be.eql(itemID);
            _item = data;
          })
          .then(nockDone)
      ));

  it('should be able to POST new Item', () =>
    nock
      .back('/item/post-item-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        const item = { ..._item };
        item.name = 'TEST ITEM';
        delete item._id;

        return Item.postItem(item)
          .then(response => response.data)
          .then(data => {
            expect(data._id).to.exist;
            expect(data.createdAt).to.exist;
            expect(data.updatedAt).to.exist;
          })
          .then(nockDone);
      }));

  it('should be able to PUT existing item', () =>
    nock
      .back('/item/put-item-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _item.description = 'This is the updated Item';

        return Item.putItem(_item)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_item.description);
          })
          .then(nockDone);
      }));

  it('should be able to PATCH existing item', () =>
    nock
      .back('/item/patch-item-promise.json', defaultOptions)
      .then(({ nockDone }) => {
        _item.description = 'This is the patched Item';

        return Item.putItem(_item)
          .then(response => response.data)
          .then(data => {
            expect(data).to.exist.and.to.be.an('object');
            expect(data.description).to.be.eql(_item.description);
          })
          .then(nockDone);
      }));
});
