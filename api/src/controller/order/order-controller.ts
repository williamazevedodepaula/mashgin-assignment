import { RequiredFieldException } from '../../exception';
import { Order, OrderItem, Payment } from '../../model';
import { IOrderService } from '../../service/order/order.service.interface';
import { IOrderController } from './order-controller.interface';

export class OrderController implements IOrderController{

  constructor(private orderService:IOrderService){}

  public async createNewOrder(data:any){
    const order:Order = this.validateOrder(data);
    return this.orderService.createNewOrder(order);
  }

  private validateOrder(data:any){
    if(!data.payment) throw new RequiredFieldException('payment');
    if(!data.items) throw new RequiredFieldException('items');

    return <Order>{
      payment: this.validatePayment(data.payment),
      items: data.items.map?.((it:any)=>this.validateItem(it)),
    }
  }

  private validateItem(data:any){
    if(!data.product_id) throw new RequiredFieldException('items.product_id');
    if(!data.price) throw new RequiredFieldException('items.price');

    return <OrderItem>{
      price: data.price,
      product_id: data.product_id,
    }
  }

  private validatePayment(data:any){
    if(!data.value) throw new RequiredFieldException('payment.value');
    if(!data.network) throw new RequiredFieldException('payment.network');
    if(!data.paymentMethod) throw new RequiredFieldException('payment.paymentMethod');

    return <Payment>{
      value: data.value,
      network: data.network,
      paymentMethod: data.paymentMethod,
    }
  }
}