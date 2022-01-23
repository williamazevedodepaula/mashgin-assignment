import { IOrderRepository } from '..';
import { Order } from '../../model';

export class OrderRepository implements IOrderRepository{
  async create(order:Partial<Order>):Promise<Order>{
    return {} as Order;
  }
}