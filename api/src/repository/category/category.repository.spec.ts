import 'mocha';
import 'chai/register-should';
import { CategoryRepository, IMongoDBConnectionFactory } from '..';
import { Db } from 'mongodb';
import * as sinon from 'sinon';
import { assert } from 'chai';

describe('Unit tests: CategoryRepository', () => {
  let getConnectionSpy: sinon.SinonSpy;
  let collectionSpy: sinon.SinonSpy;

  let categoryRepository: CategoryRepository;
  let connectionFacotryMock: IMongoDBConnectionFactory = {
    async getConnection(){
      return this as any;
    },
    collection(name:string){
      return this;
    },
    find() {
      return this;
    },
    async toArray() {
      return [
        {
          "_id": 1,
          "image_id": "f3fbf57b118fa9",
          "name": "Bakery"
        },
        {
          "_id": 2,
          "image_id": "b271afbefdc554",
          "name": "Entrees"
        },
      ];
    }
  } as IMongoDBConnectionFactory;

  beforeEach('prepare the repository and create the mocks', () => {
    categoryRepository = new CategoryRepository(connectionFacotryMock);
  })

  beforeEach('prepare the stubs', () => {
    collectionSpy = sinon.spy(<any>connectionFacotryMock,'collection');
  })

  afterEach(() => {
    sinon.restore();
  })

  describe('Testing list categories method', () => {
    it('Should use connection to list the documents from Categories collection', async () => {
      const result = await categoryRepository.listCategories();
      assert(collectionSpy.calledWith('Categories'),'Should have connected to the correct collection');
    })

    it('Should convert the categories returned from database to the format defined in model', async () => {
      const result = await categoryRepository.listCategories();
      assert(collectionSpy.calledWith('Categories'),'Should have connected to the correct collection');
      result.should.deep.equal([
        {
          "id": 1,
          "image_id": "f3fbf57b118fa9",
          "name": "Bakery"
        },
        {
          "id": 2,
          "image_id": "b271afbefdc554",
          "name": "Entrees"
        },
      ])
    })
  })
})