import { IOrderService } from '../../service/order/order.service.interface';
import { OrderController } from './order-controller';
import { IOrderController } from './order-controller.interface';
import * as sinon from 'sinon';
import { assert } from 'chai';
import { Order } from '../../model';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import { RequiredFieldException } from '../../exception';
chai.use(<any>chaiAsPromised);

describe('OrderController', () => {

  let orderMock: Order;
  let orderPayload: any;

  let createnewOrderSpy: sinon.SinonSpy;

  let orderServiceMock: IOrderService = {
    createNewOrder: async () => (orderMock)
  };

  let orderController: IOrderController;

  beforeEach('prepare the controller and create the mocks', () => {
    orderMock = {
      id: '1',
      total: 15,
      payment: {
        network: 'visa',
        paymentMethod: 'card',
      },
      items: [
        {
          price: 10,
          product_id: 1
        },
        {
          price: 5,
          product_id: 2
        }
      ]
    }
    orderPayload = {
      payment: orderMock.payment,
      items: orderMock.items,
    }
    orderController = new OrderController(orderServiceMock);
  })

  beforeEach('prepare the spyes', () => {
    createnewOrderSpy = sinon.spy(orderServiceMock, 'createNewOrder');
  })

  afterEach(() => {
    sinon.restore();
  })

  describe('Testing createNewOrder method', () => {
    it('Should call service`s createNewOrder method', async () => {
      const order = await orderController.createNewOrder(orderPayload);
      assert(createnewOrderSpy.calledWith(orderPayload), 'Should have passed payload to the createOrder method');
      order.should.deep.equal(orderMock)
    })

    it('exceeding properties passed to the controller should not be passed to the service', async () => {
      const order = await orderController.createNewOrder(
        {
          items: orderPayload.items.map(
            (it:any) => ({
              ...it,
              new_property: 'test',
            })
          ),
          payment: {
            ...orderPayload.payment,
            new_property: 'test',
          },
          new_property: 'test',
        }
      );
      assert(createnewOrderSpy.calledWith(orderPayload), 'Should have passed payload to the createOrder method');
      order.should.deep.equal(orderMock)
    })

    describe('if mandatory field is not informed, an exception should be thrown', () => {
      it('Should check if payment is informed', async () => {
        const _orderPayload: any = { ...orderPayload };
        delete _orderPayload.payment;

        await orderController.createNewOrder(_orderPayload).should.eventually.be.rejectedWith(RequiredFieldException).and.to.include({ field: 'payment' });
      })

      it('Should check if the order items are informed', async () => {
        const _orderPayload: any = { ...orderPayload };
        delete _orderPayload.items;

        await orderController.createNewOrder(_orderPayload).should.eventually.be.rejectedWith(RequiredFieldException).and.to.include({ field: 'items' });
      })

      it('Should check if the item`s product_id is informed', async () => {
        const _orderPayload: any = { ...orderPayload };
        delete _orderPayload.items[1].product_id;

        await orderController.createNewOrder(_orderPayload).should.eventually.be.rejectedWith(RequiredFieldException).and.to.include({ field: 'items.product_id' });
      })

      it('Should check if the item`s price is informed', async () => {
        const _orderPayload: any = { ...orderPayload };
        delete _orderPayload.items[1].price;

        await orderController.createNewOrder(_orderPayload).should.eventually.be.rejectedWith(RequiredFieldException).and.to.include({ field: 'items.price' });
      })

      it('Should check if the payment`s network is informed', async () => {
        const _orderPayload: any = { ...orderPayload };
        delete _orderPayload.payment.network;

        await orderController.createNewOrder(_orderPayload).should.eventually.be.rejectedWith(RequiredFieldException).and.to.include({ field: 'payment.network' });
      })

      it('Should check if the payment`s paymentMethod is informed', async () => {
        const _orderPayload: any = { ...orderPayload };
        delete _orderPayload.payment.paymentMethod;

        await orderController.createNewOrder(_orderPayload).should.eventually.be.rejectedWith(RequiredFieldException).and.to.include({ field: 'payment.paymentMethod' });
      })
    })
  })
})