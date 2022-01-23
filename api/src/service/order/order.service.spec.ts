import 'mocha';
import 'chai/register-should';
import { Order } from '../../model';
import { IOrderRepository, IProductRepository } from '../../repository';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { IOrderService } from './order.service.interface';
import { OrderService } from './order.service';
import { ApplicationException } from '../../exception';

describe('OrderService', () => {
  let listOrdersSpy: sinon.SinonSpy;
  let createOrderSpy: sinon.SinonSpy;
  let orderMock: Partial<Order>;

  let ordersRepositoryMock: IOrderRepository = {
    listOrders: async () => ([{ ...orderMock as Order, id: '1', total: 25 }]),
    create: async () => ({ ...orderMock as Order, id: '1', total: 25 })
  };
  let productRepositoryMock: IProductRepository = {
    listProducts:async()=>([]),
    findProductById: async(id:string|number)=>({id,name:'product name', image_id:'1',category_id:'1',price:10})
  };

  let orderService: IOrderService;

  beforeEach('prepare the controller and create the mocks', () => {
    orderService = new OrderService(
      ordersRepositoryMock,
      productRepositoryMock,
    );

    orderMock = {
      items: [{ price: 10, product_id: 1 }, { price: 8, product_id: 2 }, { price: 7, product_id: 3 }],
      payment: { network: 'visa', paymentMethod: 'card' },
    }
  })

  beforeEach('prepare the spyes', () => {
    createOrderSpy = sinon.spy(ordersRepositoryMock, 'create');
    listOrdersSpy = sinon.spy(ordersRepositoryMock, 'listOrders');
  })

  afterEach(() => {
    sinon.restore();
  })

  describe('Testing create method', () => {
    it('Should calculate the total value and pass the order to the repository', async () => {
      const order = await orderService.createNewOrder(orderMock);
      assert(createOrderSpy.calledWith({ ...orderMock, total: 25 }), 'Should have called repository`s create method with the orderMock and the total');
      order.should.deep.equal({ ...orderMock, total: 25, id: '1' });
    })

    it('Should validate the value of the order items', async () => {
      orderMock.items![0].price = -20;
      await orderService.createNewOrder(orderMock).should.eventually.be.rejectedWith(ApplicationException).and.to.include({ message: 'The field "price" should have a positive value' });;
    })

    it('Should validate if the product exists', async () => {
      sinon.stub(productRepositoryMock,'findProductById').resolves(undefined);
      orderMock.items![0].product_id = 13;
      await orderService.createNewOrder(orderMock).should.eventually.be.rejectedWith(ApplicationException).and.to.include({ message: 'The product with id "13" does not exist' });;
    })
  })

  describe('Testing listOrders method', () => {
    it('Should return the orders obtained from orderRepository', async () => {
      const orders = await orderService.listOrders();
      assert(listOrdersSpy.calledOnce, 'Should have called repository`s listOrders method once');
      orders.should.deep.equal([{ ...orderMock, total: 25, id: '1' }]);
    })
  })
})