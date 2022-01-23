import { Order } from '../../model';

export interface IOrderService{
  createNewOrder(data:Partial<Order>):Promise<Order>
}