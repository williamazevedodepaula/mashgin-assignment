import { ApplicationException } from '../../exception';
import { Order, OrderItem, Payment } from '../../model';
import { IOrderRepository } from '../../repository';
import { IOrderService } from './order.service.interface';

export class OrderService implements IOrderService{
  constructor(private orderRepository:IOrderRepository){}

  async createNewOrder(order:Partial<Order>):Promise<Order>{
    this.validateOrder(order);


    const total = order.items?.reduce((sum,it)=>sum+(it.price||0),0)
    return this.orderRepository.create({...order, total});
  }

  async listOrders():Promise<Order[]>{
    return this.orderRepository.listOrders();
  }

  private validateItem(item:OrderItem){
    if(item.price < 0){
      throw new ApplicationException('negativePrice','The field "price" should have a positive value');
    }
  }

  private validateOrder(order:Partial<Order>){
    order.items?.forEach(this.validateItem);
  }
}