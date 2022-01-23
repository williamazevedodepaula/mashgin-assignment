import { Order } from '../../model';

export interface IOrderService{
  createNewOrder(data:Order):Promise<Order>
}