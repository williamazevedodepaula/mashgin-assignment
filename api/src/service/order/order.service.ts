import { Order } from '../../model';
import { IOrderService } from './order.service.interface';

export class OrderService implements IOrderService{
  async createNewOrder(data:Omit<Order,'total'|'id'>):Promise<Order>{
    return {} as Order;
  }
}