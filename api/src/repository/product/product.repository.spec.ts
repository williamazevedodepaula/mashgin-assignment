import 'mocha';
import 'chai/register-should';
import { IMongoDBConnectionFactory, ProductRepository } from '..';
import * as sinon from 'sinon';
import { assert } from 'chai';

describe('ProductRepository', () => {
  let getConnectionSpy: sinon.SinonSpy;
  let collectionSpy: sinon.SinonSpy;

  let productRepository: ProductRepository;
  let connectionFacotryMock: IMongoDBConnectionFactory = {
    async getConnection() {
      return this as any;
    },
    collection(name: string) {
      return this;
    },
    find() {
      return this;
    },
    async toArray() {
      return [
        {
          "_id": 1,
          "category_id": 1,
          "image_id": "293202f9d9f7f4",
          "name": "Bagel",
          "price": 2.0
        },
        {
          "id": 2,
          "category_id": 1,
          "image_id": "808916fd5ddf96",
          "name": "Croissant",
          "price": 1.0
        },
      ];
    }
  } as IMongoDBConnectionFactory;

  beforeEach('prepare the repository and create the mocks', () => {
    productRepository = new ProductRepository(connectionFacotryMock);
  })

  beforeEach('prepare the stubs', () => {
    collectionSpy = sinon.spy(<any>connectionFacotryMock, 'collection');
  })

  afterEach(() => {
    sinon.restore();
  })

  describe('Testing list categories method', () => {
    it('Should use connection to list the documents from Products collection', async () => {
      const result = await productRepository.listProducts();
      assert(collectionSpy.calledWith('Products'), 'Should have connected to the correct collection');
    })

    it('Should convert the products returned from database to the format defined in model', async () => {
      const result = await productRepository.listProducts();
      assert(collectionSpy.calledWith('Products'), 'Should have connected to the correct collection');
      result.should.deep.equal([
        {
          "id": 1,
          "category_id": 1,
          "image_id": "293202f9d9f7f4",
          "name": "Bagel",
          "price": 2.0
        },
        {
          "id": 2,
          "category_id": 1,
          "image_id": "808916fd5ddf96",
          "name": "Croissant",
          "price": 1.0
        },
      ])
    })
  })
})