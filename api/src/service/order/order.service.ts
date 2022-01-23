import { ApplicationException } from '../../exception';
import { Order, OrderItem } from '../../model';
import { IOrderRepository } from '../../repository';
import { IOrderService } from './order.service.interface';

export class OrderService implements IOrderService{
  constructor(private orderRepository:IOrderRepository){}

  async createNewOrder(order:Omit<Order,'total'|'id'>):Promise<Order>{
    order.items?.forEach(this.validateItem);

    const total = order.items?.reduce((sum,it)=>sum+(it.price||0),0)
    return this.orderRepository.create({...order, total});
  }

  private validateItem(item:OrderItem){
    if(item.price < 0){
      throw new ApplicationException('negativePrice','The field "price" should have a positive value');
    }
  }
}