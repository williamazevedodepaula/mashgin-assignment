import { Order } from '../../model';

export interface IOrderRepository{
  create(data:Order):Promise<Order>
}