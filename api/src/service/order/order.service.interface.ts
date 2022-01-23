import { Order } from '../../model';

export interface IOrderService{
  listOrders():Promise<Order[]>
  createNewOrder(data:Partial<Order>):Promise<Order>
}