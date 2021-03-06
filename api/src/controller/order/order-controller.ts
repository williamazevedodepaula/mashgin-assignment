import { EmptyArrayException, RequiredFieldException } from '../../exception';
import { Order, OrderItem, Payment } from '../../model';
import { IOrderService } from '../../service/order/order.service.interface';
import { IOrderController } from './order-controller.interface';

export class OrderController implements IOrderController{

  constructor(private orderService:IOrderService){}

  public async createNewOrder(data:any){
    const order:Order = this.validateOrder(data);
    return this.orderService.createNewOrder(order);
  }

  public async listOrders():Promise<Order[]>{
    return this.orderService.listOrders();
  }

  private validateOrder(data:any){
    if(!data.payment) throw new RequiredFieldException('payment');
    if(!data.items) throw new RequiredFieldException('items');
    if(data.items.length == 0) throw new EmptyArrayException('items');

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

    if(!data.paymentMethod) throw new RequiredFieldException('payment.paymentMethod');

    switch(data.paymentMethod.toUpperCase()){
      case 'PIX':
        if(!data.pixCode) throw new RequiredFieldException('payment.pixCode');
        break;
      case 'CREDIT CARD':
      case 'DEBIT CARD':
        if(!data.network) throw new RequiredFieldException('payment.network');
        if(!data.cardNumber) throw new RequiredFieldException('payment.cardNumber');
        if(!data.cardSecurityCode) throw new RequiredFieldException('payment.cardSecurityCode');
      default:
    }

    return <Payment>{
      network: data.network,
      pixCode: data.pixCode,
      cardNumber: data.cardNumber,
      paymentMethod: data.paymentMethod,
      cardSecurityCode: data.cardSecurityCode,
    }
  }
}