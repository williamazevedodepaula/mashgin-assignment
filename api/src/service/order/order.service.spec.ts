import 'mocha';
import 'chai/register-should';
import { Order } from '../../model';
import { IOrderRepository } from '../../repository';
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

  let orderService: IOrderService;

  beforeEach('prepare the controller and create the mocks', () => {
    orderService = new OrderService(
      ordersRepositoryMock
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
  })

  describe('Testing listOrders method', () => {
    it('Should return the orders obtained from orderRepository', async () => {
      const orders = await orderService.listOrders();
      assert(listOrdersSpy.calledOnce, 'Should have called repository`s listOrders method once');
      orders.should.deep.equal([{ ...orderMock, total: 25, id: '1' }]);
    })
  })
})