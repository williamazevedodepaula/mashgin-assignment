import { Order } from '../../model';

export interface IOrderRepository{
  create(data:Partial<Order>):Promise<Order>
}