import 'mocha';
import 'chai/register-should';
import { CategoryRepository, IMongoDBConnectionFactory, OrderRepository } from '..';
import { Db } from 'mongodb';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { Order, OrderItem, Payment } from '../../model';

describe('Unit tests: OrderRepository', () => {
  let collectionSpy: sinon.SinonSpy;

  let orderRepository: OrderRepository;
  let orderMock: Order = {
    payment: {} as Payment,
    items:[{} as OrderItem]
  }
  let connectionFacotryMock: IMongoDBConnectionFactory = {
    async getConnection(){
      return this as any;
    },
    collection(name:string){
      return this;
    },
    async insertOne() {
      return {
        insertedId: "1"
      }
    }
  } as IMongoDBConnectionFactory;

  beforeEach('prepare the repository and create the mocks', () => {
    orderRepository = new OrderRepository(connectionFacotryMock);
  })

  beforeEach('prepare the stubs', () => {
    collectionSpy = sinon.spy(<any>connectionFacotryMock,'collection');
  })

  afterEach(() => {
    sinon.restore();
  })

  describe('Testing create order method', () => {
    it('Should use connection to insert the order in the Orders collection', async () => {
      const result = await orderRepository.create(orderMock);
      assert(collectionSpy.calledWith('Orders'),'Should have connected to the correct collection');
      result.should.deep.equal({
        id: "1",
        ...orderMock
      })
    })
  })
})